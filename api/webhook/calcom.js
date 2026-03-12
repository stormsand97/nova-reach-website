/**
 * Cal.com → GoHighLevel Webhook Bridge
 * 
 * Vercel Serverless Function
 * Endpoint: POST /api/webhook/calcom
 * 
 * Receives Cal.com webhook events (BOOKING_CREATED, etc.)
 * and forwards the lead data to GoHighLevel's Inbound Webhook.
 * 
 * Required Environment Variables (set in Vercel Dashboard):
 *   GHL_WEBHOOK_URL  – Your GoHighLevel Inbound Webhook URL
 *                       (from GHL → Automations → Workflows → Inbound Webhook trigger)
 * 
 * Optional Environment Variables:
 *   CALCOM_WEBHOOK_SECRET – The signing secret from Cal.com webhook settings
 *                            (used to verify payload authenticity)
 */

import crypto from "crypto";

export default async function handler(req, res) {
    // ── Only accept POST ──────────────────────────────────────────────
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // ── Read env vars ─────────────────────────────────────────────────
    const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL;
    const CALCOM_SECRET = process.env.CALCOM_WEBHOOK_SECRET;

    if (!GHL_WEBHOOK_URL) {
        console.error("❌ GHL_WEBHOOK_URL environment variable is not set");
        return res.status(500).json({ error: "Server misconfigured – GHL_WEBHOOK_URL missing" });
    }

    // ── Verify Cal.com signature (if secret is configured) ────────────
    if (CALCOM_SECRET) {
        const signature = req.headers["x-cal-signature-256"];
        if (!signature) {
            console.warn("⚠️  Missing Cal.com signature header");
            return res.status(401).json({ error: "Missing signature" });
        }

        const rawBody = JSON.stringify(req.body);
        const expectedSig = crypto
            .createHmac("sha256", CALCOM_SECRET)
            .update(rawBody)
            .digest("hex");

        if (signature !== expectedSig) {
            console.warn("⚠️  Invalid Cal.com signature");
            return res.status(401).json({ error: "Invalid signature" });
        }
    }

    // ── Parse the Cal.com payload ─────────────────────────────────────
    const { triggerEvent, payload } = req.body;

    console.log(`📥 Received Cal.com event: ${triggerEvent}`);

    // Only process booking-created events (ignore cancellations, etc.)
    if (triggerEvent !== "BOOKING_CREATED") {
        console.log(`ℹ️  Skipping event type: ${triggerEvent}`);
        return res.status(200).json({ message: `Ignored event: ${triggerEvent}` });
    }

    // ── Extract attendee info from Cal.com payload ────────────────────
    const attendee = payload.attendees?.[0] || {};
    const responses = payload.responses || {};

    // Cal.com provides name split or as a full string
    const fullName = attendee.name || responses.name?.value || "";
    const firstName = attendee.firstName || fullName.split(" ")[0] || "";
    const lastName = attendee.lastName || fullName.split(" ").slice(1).join(" ") || "";
    const email = attendee.email || responses.email?.value || "";
    const phone = responses.attendeePhoneNumber?.value || "";
    const notes = payload.additionalNotes || responses.notes?.value || "";

    // ── Build the GHL payload ─────────────────────────────────────────
    const ghlPayload = {
        // Contact info
        first_name: firstName,
        last_name: lastName,
        full_name: fullName,
        email: email,
        phone: phone,

        // Booking details
        booking_title: payload.title || "",
        booking_start: payload.startTime || "",
        booking_end: payload.endTime || "",
        booking_length: payload.length || "",
        booking_status: payload.status || "",
        booking_uid: payload.uid || "",
        event_type: payload.type || "",
        additional_notes: notes,
        timezone: attendee.timeZone || "",

        // Video call link (if applicable)
        meeting_url: payload.metadata?.videoCallUrl || payload.videoCallData?.url || "",

        // Source tracking
        source: "Cal.com Website Booking",
        cal_event: triggerEvent,
        created_at: new Date().toISOString(),
    };

    console.log(`📤 Forwarding to GHL: ${firstName} ${lastName} (${email})`);

    // ── Forward to GoHighLevel Inbound Webhook ────────────────────────
    try {
        const ghlResponse = await fetch(GHL_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ghlPayload),
        });

        if (!ghlResponse.ok) {
            const errorText = await ghlResponse.text();
            console.error(`❌ GHL responded ${ghlResponse.status}: ${errorText}`);
            return res.status(502).json({
                error: "GHL webhook failed",
                status: ghlResponse.status,
                details: errorText,
            });
        }

        console.log(`✅ Successfully forwarded to GHL`);
        return res.status(200).json({
            success: true,
            message: `Booking for ${fullName} forwarded to GoHighLevel`,
        });
    } catch (err) {
        console.error(`❌ Error forwarding to GHL: ${err.message}`);
        return res.status(500).json({ error: "Failed to forward to GHL", details: err.message });
    }
}
