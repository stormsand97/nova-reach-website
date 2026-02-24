import fs from 'fs';
import { execSync } from 'child_process';

const NETLIFY_TOKEN = "nfp_x9FX16UJUeHWDQ4cpwhduYbdhaihL8zube90";
const CLOUDFLARE_TOKEN = "Basfyfl-Xus3YNub0PvWmT75RxakJuhb1kdaJA6E";
const DOMAIN = "getnovareach.com";
const SUBDOMAIN = "www.getnovareach.com";

async function run() {
    const headers = {
        "Authorization": `Bearer ${NETLIFY_TOKEN}`,
        "Content-Type": "application/json"
    };

    // 1. Create Netlify site
    console.log("Creating Netlify site...");
    let siteName = "novareach-" + Math.floor(Math.random() * 100000);
    let res = await fetch("https://api.netlify.com/api/v1/sites", {
        method: "POST",
        headers,
        body: JSON.stringify({ name: siteName })
    });

    if (!res.ok) {
        console.error("Failed to create site", await res.text());
        return;
    }

    let siteData = await res.json();
    const siteId = siteData.site_id;
    const siteUrl = siteData.ssl_url.replace("https://", "");
    console.log(`Site created: ${siteData.name} (ID: ${siteId}, URL: ${siteUrl})`);

    // 2. Deploy using Netlify CLI
    console.log("Deploying via CLI...");
    try {
        execSync(`npx netlify-cli deploy --prod --dir=dist`, {
            env: { ...process.env, NETLIFY_AUTH_TOKEN: NETLIFY_TOKEN, NETLIFY_SITE_ID: siteId },
            stdio: 'inherit'
        });
    } catch (e) {
        console.error("Deploy failed", e);
        return;
    }

    // 3. Add Custom Domain to Netlify
    console.log("Adding Custom Domain to Netlify...");
    res = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ custom_domain: DOMAIN })
    });
    if (!res.ok) {
        console.error("Failed domain update", await res.text());
    }

    // 4. Update Cloudflare DNS
    console.log("Updating Cloudflare DNS...");
    const cfHeaders = {
        "Authorization": `Bearer ${CLOUDFLARE_TOKEN}`,
        "Content-Type": "application/json"
    };

    res = await fetch(`https://api.cloudflare.com/client/v4/zones?name=${DOMAIN}`, { headers: cfHeaders });
    const zonesData = await res.json();
    if (!zonesData.success || zonesData.result.length === 0) {
        console.error(`Zone not found for ${DOMAIN}`);
        return;
    }
    const zoneId = zonesData.result[0].id;

    res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, { headers: cfHeaders });
    const cfRecords = (await res.json()).result;

    const targets = [
        { type: "A", name: DOMAIN, content: "75.2.60.5" },
        { type: "CNAME", name: SUBDOMAIN, content: siteUrl }
    ];

    for (let target of targets) {
        const existing = cfRecords.find(r => r.name === target.name && r.type === target.type);
        const conflicts = cfRecords.filter(r => r.name === target.name && r.type !== target.type && (r.type === 'A' || r.type === 'CNAME'));

        // delete conflicts
        for (let c of conflicts) {
            console.log(`Deleting conflicting ${c.type} record for ${c.name}...`);
            await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${c.id}`, {
                method: "DELETE",
                headers: cfHeaders
            });
        }

        if (existing) {
            console.log(`Updating ${target.type} record for ${target.name}...`);
            await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${existing.id}`, {
                method: "PUT",
                headers: cfHeaders,
                body: JSON.stringify({ type: target.type, name: target.name, content: target.content, proxied: false, ttl: 1 })
            });
        } else {
            console.log(`Creating ${target.type} record for ${target.name}...`);
            await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
                method: "POST",
                headers: cfHeaders,
                body: JSON.stringify({ type: target.type, name: target.name, content: target.content, proxied: false, ttl: 1 })
            });
        }
    }

    console.log("All done!");
}

run();
