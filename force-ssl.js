const CLOUDFLARE_TOKEN = "Basfyfl-Xus3YNub0PvWmT75RxakJuhb1kdaJA6E";
const DOMAIN = "getnovareach.com";

async function run() {
    const cfHeaders = {
        "Authorization": `Bearer ${CLOUDFLARE_TOKEN}`,
        "Content-Type": "application/json"
    };

    const res = await fetch(`https://api.cloudflare.com/client/v4/zones?name=${DOMAIN}`, { headers: cfHeaders });
    const zonesData = await res.json();
    const zoneId = zonesData.result[0].id;

    const res2 = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, { headers: cfHeaders });
    const cfRecords = (await res2.json()).result;

    for (let record of cfRecords) {
        if ((record.type === 'A' && record.name === DOMAIN) || (record.type === 'CNAME' && record.name === `www.${DOMAIN}`)) {
            console.log(`Setting ${record.name} to proxied=true...`);
            await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${record.id}`, {
                method: "PUT",
                headers: cfHeaders,
                body: JSON.stringify({
                    type: record.type,
                    name: record.name,
                    content: record.content,
                    proxied: true,
                    ttl: 1
                })
            });
        }
    }

    // Force HTTPS on Cloudflare
    console.log("Enabling Always Use HTTPS...");
    await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/settings/always_use_https`, {
        method: "PATCH",
        headers: cfHeaders,
        body: JSON.stringify({ value: "on" })
    });

    console.log("Done!");
}
run();
