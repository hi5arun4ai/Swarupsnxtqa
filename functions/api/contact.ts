// This function handles the POST request to /api/contact on the Cloudflare Edge
interface Env {
  RESEND_API_KEY?: string;
  OWNER_EMAIL?: string;
}

export const onRequestPost = async ({ request, env }: { request: Request, env: Env }) => {
  try {
    const data = await request.json() as {
      name: string;
      email: string;
      phone?: string;
      subject: string;
      message: string;
    };

    // Basic server-side validation
    if (!data.name || !data.email || !data.message) {
      return new Response(JSON.stringify({ error: "Required fields are missing." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 1. Check for API Key. If missing, we log and return a "Success (Dev)" response to avoid breaking the UI.
    if (!env.RESEND_API_KEY) {
      console.warn("Cloudflare environment variable RESEND_API_KEY is not set. Lead received but not sent via email.");
      console.log("Lead Data:", data);
      return new Response(JSON.stringify({ 
        success: true, 
        message: "Demo Mode: Lead logged to console. (Set RESEND_API_KEY in Cloudflare Pages settings to enable emails)" 
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 2. Prepare the email HTML with a professional theme
    const emailHtml = `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
        <div style="background: #1e266e; padding: 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: -0.025em;">New Opportunity Detected</h1>
          <p style="color: #94a3b8; margin-top: 5px; font-size: 14px;">Incoming transmission from Swarups NXT</p>
        </div>
        <div style="padding: 30px; color: #1e293b;">
          <h2 style="font-size: 18px; margin-top: 0; color: #1e266e;">Transmission Details</h2>
          <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0;">
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 120px; font-weight: 600;">Identity:</td>
              <td style="padding: 8px 0; font-weight: 700;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email Uplink:</td>
              <td style="padding: 8px 0; font-weight: 700;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone:</td>
              <td style="padding: 8px 0; font-weight: 700;">${data.phone || 'Not Provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Protocol:</td>
              <td style="padding: 8px 0; font-weight: 700; color: #2BB6C6;">${data.subject}</td>
            </tr>
          </table>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #f1f5f9;">
            <p style="margin: 0; font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px;">Message Payload:</p>
            <p style="margin: 0; line-height: 1.6; color: #334155; white-space: pre-wrap;">${data.message}</p>
          </div>
        </div>
        <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #f1f5f9;">
          <p style="font-size: 12px; color: #94a3b8; margin: 0;">&copy; 2025 Swarups NXT Intelligence. Automated lead routing.</p>
        </div>
      </div>
    `;

    // 3. Dispatch to Resend API
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Swarups NXT Leads <leads@swarupsnxt.com>', // Ensure this domain is verified in your Resend account
        to: env.OWNER_EMAIL || data.email, // Defaults to owner if set, else bounces back to sender for testing
        reply_to: data.email,
        subject: `[LEAD] ${data.subject}: ${data.name}`,
        html: emailHtml
      })
    });

    if (!res.ok) {
      const errorMsg = await res.text();
      throw new Error(`Resend API Error: ${errorMsg}`);
    }

    return new Response(JSON.stringify({ success: true, message: "Signal delivered to HQ." }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err: any) {
    console.error("Cloudflare Function Routing Error:", err);
    return new Response(JSON.stringify({ error: err.message || "Encryption bridge failure." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};