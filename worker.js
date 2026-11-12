// Cloudflare Worker: Handles /api/contact and serves all static assets

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Handle API Route: /api/contact
    if (url.pathname === '/api/contact') {
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        });
      }

      if (request.method === 'POST') {
        try {
          const contentType = request.headers.get('content-type') || '';
          let data = {};

          if (contentType.includes('application/json')) {
            data = await request.json();
          } else if (contentType.includes('form')) {
            const formData = await request.formData();
            data = Object.fromEntries(formData.entries());
          } else {
            data = { raw: await request.text() };
          }

          if (!data.name || !data.email) {
            return new Response(JSON.stringify({
              success: false,
              error: 'Missing required fields: Name and Email are required.'
            }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            });
          }

          // Forward to Web3Forms for email delivery to inquiries@vellett.com
          try {
            await fetch('https://api.web3forms.com/submit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
              body: JSON.stringify({
                access_key: '64696b99-e6c1-4b10-8b1b-2ce8288544e3',
                subject: `[VELLETT NEW LEAD] ${data.name} - ${data.company || 'Distributor'} (${data.phone || 'No phone'})`,
                to: 'inquiries@vellett.com',
                ...data
              })
            });
          } catch (e) {
            // Non-blocking forward
          }

          return new Response(JSON.stringify({
            success: true,
            message: 'Catalog intake request logged successfully. Our engineering desk will respond within 2 business hours.',
            reference_id: 'VEL-' + Date.now().toString(36).toUpperCase()
          }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
        } catch (error) {
          return new Response(JSON.stringify({
            success: false,
            error: 'Internal dispatch error. Please call direct at (919) 339-1208 or email inquiries@vellett.com.'
          }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }

      return new Response('Method Not Allowed', { status: 405 });
    }

    // 2. Fallback: Serve Static Assets from env.ASSETS
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  }
};
