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

    console.log("Setting SSL mode to Full...");
    const res2 = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/settings/ssl`, {
        method: "PATCH",
        headers: cfHeaders,
        body: JSON.stringify({ value: "full" })
    });
    console.log(await res2.json());
}
run();
