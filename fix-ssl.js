const NETLIFY_TOKEN = "nfp_x9FX16UJUeHWDQ4cpwhduYbdhaihL8zube90";
const siteId = "af3c1515-ce9d-4d3e-be6f-07781f9732fc";

async function run() {
    console.log("Checking site status...");
    let res = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}`, {
        headers: { "Authorization": `Bearer ${NETLIFY_TOKEN}` }
    });
    let site = await res.json();
    // console.log("Current SSL status:", site.ssl_url);

    console.log("Triggering SSL provisioning...");
    res = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/ssl`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${NETLIFY_TOKEN}` },
        body: JSON.stringify({ certificate: null, key: null })
    });
    console.log("Provision result:", res.status, await res.text());
}
run();
