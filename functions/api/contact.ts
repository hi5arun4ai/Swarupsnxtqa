// This function handles the POST request to /api/contact
// You can expand this to send emails using SendGrid, Resend, or Discord Webhooks.

interface Env {
  // Add environment variables here (e.g., API keys) from Cloudflare Dashboard
  // DISCORD_WEBHOOK_URL?: string;
}

export const onRequestPost = async ({ request, env }: { request: Request, env: Env }) => {
  try {
    const data = await request.json() as any;

    // Basic Validation
    if (!data.name || !data.email || !data.message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // --- EXAMPLE: Log to console (Visible in Cloudflare Dashboard Logs) ---
    console.log(`Received inquiry from ${data.email}: ${data.subject}`);

    // --- OPTIONAL: Send to Discord (Unlock by adding DISCORD_WEBHOOK_URL to env vars) ---
    /*
    if (env.DISCORD_WEBHOOK_URL) {
      await fetch(env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `**New Lead!**\n**Name:** ${data.name}\n**Email:** ${data.email}\n**Phone:** ${data.phone}\n**Subject:** ${data.subject}\n**Message:** ${data.message}`
        })
      });
    }
    */

    // Return success to frontend
    return new Response(JSON.stringify({ success: true, message: "Inquiry received" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};