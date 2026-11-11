// Cloudflare Pages Function: /api/contact
// Handles POST requests from Vellett.com intake forms

export async function onRequestPost(context) {
  try {
    const contentType = context.request.headers.get("content-type") || "";
    let data = {};

    if (contentType.includes("application/json")) {
      data = await context.request.json();
    } else if (contentType.includes("form")) {
      const formData = await context.request.formData();
      data = Object.fromEntries(formData.entries());
    } else {
      data = { raw: await context.request.text() };
    }

    if (!data.name || !data.email) {
      return new Response(JSON.stringify({
        success: false,
        error: "Missing required fields: Name and Email are required."
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    console.log("[VELLETT LEAD DISPATCHED TO AYUSH BIJALWAN]", {
      timestamp: new Date().toISOString(),
      name: data.name,
      email: data.email,
      phone: data.phone || "Not provided",
      company: data.company || "Not provided",
      erp: data.erp || "Not specified",
      catalog: data.catalog || "Not specified",
      project_type: data.project_type || "Pilot Audit",
      notes: data.notes || ""
    });

    return new Response(JSON.stringify({
      success: true,
      message: "Catalog intake request logged successfully. Ayush Bijalwan will respond within 2 business hours.",
      reference_id: "VEL-" + Date.now().toString(36).toUpperCase()
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (error) {
    console.error("[VELLETT LEAD DISPATCH ERROR]", error);
    return new Response(JSON.stringify({
      success: false,
      error: "Internal dispatch error. Please call direct at (919) 339-1208 or email ayush@vellett.com."
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
