// Vellett Industrial Catalog Engineering - AI Helpdesk & Concierge
// Multi-Tiered Interactive Decision Engine & 2-Field Direct Lead Intake

(function () {
  'use strict';

  // 1. Multi-Tiered Helpdesk Knowledge Tree
  const HELPDESK = {
    root: {
      message: '<strong>Vellett Catalog Engineering Helpdesk</strong><br>We help industrial distributors unroll complex manufacturer PDFs into verified ERP item masters (P21, Infor, NetSuite).<br><br>What area can we assist you with today?',
      chips: [
        { label: 'Catalog PDF & Matrix Issues', next: 'catalog_issues' },
        { label: 'ERP Integration (P21, Infor)', next: 'erp_integration' },
        { label: 'Pricing & Free 10-SKU Pilot', next: 'pricing_pilot' },
        { label: 'Speak with Engineering Desk', next: 'lead_capture' }
      ]
    },
    catalog_issues: {
      message: '<strong>Manufacturer Catalog & Matrix Engineering:</strong><br>Distributors lose sales when supplier product lines sit trapped in 80-page engineering PDFs. Which specific challenge are you looking to resolve?',
      chips: [
        { label: 'Unrolling Dense Part Matrices', next: 'matrix_unrolling' },
        { label: 'Footnote De-Rating Auditing', next: 'footnote_auditing' },
        { label: '5-Day Turnaround SLA', next: 'sla_turnaround' },
        { label: 'Request Free 10-SKU Sample', next: 'lead_capture' },
        { label: 'Back to Main Menu', next: 'root' }
      ]
    },
    matrix_unrolling: {
      message: '<strong>Unrolling Part Number Matrices:</strong><br>Lines like <strong>Ashcroft 1009</strong> gauges or <strong>Swagelok 60 Series</strong> valves pack up to 40,000 permutations across dial sizes, wetted metallurgies, connection types, and pressure ranges. We programmatically unpack every valid combination into clean, individual ERP records with 20 normalized technical attributes.<br><br>Would you like to test our accuracy on 10 SKUs from your PDF at no cost?',
      chips: [
        { label: 'Yes, Request 10-SKU Pilot ($0)', next: 'lead_capture' },
        { label: 'Footnote De-Rating Questions', next: 'footnote_auditing' },
        { label: 'Back to Catalog Issues', next: 'catalog_issues' }
      ]
    },
    footnote_auditing: {
      message: '<strong>Footnote Exception & De-Rating Audits:</strong><br>A valve rated at 2,200 PSI at ambient temperature often de-rates to 100 PSI at 400&deg;F steam. If an ERP clerk only logs 2,200 PSI, the wrong valve gets installed in a refinery, causing catastrophic failure and returns. Our engineering team audits every footnote and creates dedicated temperature/pressure de-rating tables.<br><br>Ready to audit a complex supplier line?',
      chips: [
        { label: 'Request Free 10-SKU Pilot Audit', next: 'lead_capture' },
        { label: 'How 5-Day Delivery Works', next: 'sla_turnaround' },
        { label: 'Back to Catalog Issues', next: 'catalog_issues' }
      ]
    },
    sla_turnaround: {
      message: '<strong>Guaranteed 5-Day Sprint Delivery:</strong><br>We deliver complete manufacturer catalog series in <strong>5 business days</strong>. Your team receives 5 verified sheets ready for one-click upload into Prophet 21 or Infor CSD. No more 6-month internal data entry delays.',
      chips: [
        { label: 'Request 10-SKU Pilot Audit ($0)', next: 'lead_capture' },
        { label: 'Explore Pricing Retainers', next: 'pricing_pilot' },
        { label: 'Back to Main Menu', next: 'root' }
      ]
    },
    erp_integration: {
      message: '<strong>ERP Item Master Integration:</strong><br>We build native import files specifically formatted for industrial ERP systems with zero manual re-typing. Which platform does your distribution business run?',
      chips: [
        { label: 'Epicor Prophet 21 (P21)', next: 'p21_details' },
        { label: 'Infor CloudSuite Distribution (CSD)', next: 'infor_details' },
        { label: 'Oracle NetSuite / SAP Business One', next: 'netsuite_details' },
        { label: 'Item Master Deduplication', next: 'dedup_details' },
        { label: 'Back to Main Menu', next: 'root' }
      ]
    },
    p21_details: {
      message: '<strong>Epicor Prophet 21 (P21) Formatting:</strong><br>We deliver validated import files mapped directly to P21 Item Master tables: Item ID, Extended Descriptions, 20 Technical Item Attributes, Item Pricing Multipliers, and UOM schedules. Ready for DynaChange or standard P21 import utility.',
      chips: [
        { label: 'Request 10-SKU P21 Sample File', next: 'lead_capture' },
        { label: 'Item Master Deduplication', next: 'dedup_details' },
        { label: 'Back to ERP Systems', next: 'erp_integration' }
      ]
    },
    infor_details: {
      message: '<strong>Infor CSD & SX.e Item Masters:</strong><br>Formatted directly for Infor CloudSuite Distribution (ICSP, ICSPU tables) with clean product hierarchies, search keywords, and supplier cross-references.',
      chips: [
        { label: 'Request 10-SKU Infor Sample File', next: 'lead_capture' },
        { label: 'Pricing & Turnarounds', next: 'pricing_pilot' },
        { label: 'Back to ERP Systems', next: 'erp_integration' }
      ]
    },
    netsuite_details: {
      message: '<strong>NetSuite & SAP Business One:</strong><br>We construct parent-child matrix items with normalized option drop-downs (materials, sizes, pressure ratings) tailored for industrial distribution.',
      chips: [
        { label: 'Request 10-SKU Sample File', next: 'lead_capture' },
        { label: 'Back to ERP Systems', next: 'erp_integration' }
      ]
    },
    dedup_details: {
      message: '<strong>ERP Item Master Deduplication:</strong><br>Decades of manual entry create massive SKU duplication (e.g. "SS-62TS8" vs "SS62TS8" vs "SWG-SS-62TS8"). We audit and merge duplicate records, preserving historical order history and preventing redundant warehouse re-orders.',
      chips: [
        { label: 'Request Deduplication Assessment', next: 'lead_capture' },
        { label: 'Back to ERP Systems', next: 'erp_integration' }
      ]
    },
    pricing_pilot: {
      message: '<strong>Transparent Capacity Retainers:</strong><br>&bull; <strong>Proof of Concept Pilot:</strong> $0 / 100% Free for 10-15 real SKUs from your PDF.<br>&bull; <strong>Starter Retainer:</strong> $1,500/mo (1-2 lines/mo, 750 SKUs, 5-day sprints).<br>&bull; <strong>Growth Retainer:</strong> $4,200/mo (up to 4 complete manufacturer lines/mo, price updates, priority desk).<br>&bull; <strong>Enterprise Clearing:</strong> $12,000/mo for massive legacy catalog backlogs.<br><br>All retainers are month-to-month with zero long-term lock-in.',
      chips: [
        { label: 'Request $0 Pilot Audit', next: 'lead_capture' },
        { label: 'Speak with Engineering Desk', next: 'lead_capture' },
        { label: 'Back to Main Menu', next: 'root' }
      ]
    }
  };

  // 2. High-Visibility Eye-Catching CSS Styles
  const style = document.createElement('style');
  style.id = 'vellett-ai-styles-v5';
  style.textContent = `
    @keyframes aiGlow {
      0%, 100% { box-shadow: 0 0 15px rgba(16, 185, 129, 0.4), 0 10px 25px rgba(0, 0, 0, 0.5); }
      50% { box-shadow: 0 0 25px rgba(16, 185, 129, 0.8), 0 15px 35px rgba(0, 0, 0, 0.6); }
    }
    @keyframes badgeFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }
    #vellett-ai-widget {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99999;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    #vellett-ai-bubble-callout {
      position: absolute;
      bottom: calc(100% + 12px);
      right: 0;
      background: #09090B;
      color: #FFFFFF;
      border: 1px solid #10B981;
      padding: 8px 12px;
      font-size: 11px;
      font-family: "JetBrains Mono", monospace;
      white-space: nowrap;
      box-shadow: 0 10px 20px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      gap: 6px;
      border-radius: 2px;
      cursor: pointer;
      animation: badgeFloat 3s ease-in-out infinite;
    }
    #vellett-ai-bubble-callout::after {
      content: '';
      position: absolute;
      top: 100%;
      right: 24px;
      border-width: 6px;
      border-style: solid;
      border-color: #09090B transparent transparent transparent;
    }
    #vellett-ai-badge {
      display: flex;
      align-items: center;
      gap: 10px;
      background: #09090B;
      color: #FFFFFF;
      padding: 12px 20px;
      border: 1.5px solid #10B981;
      animation: aiGlow 3s infinite ease-in-out;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 12px;
      font-family: "JetBrains Mono", monospace;
      border-radius: 2px;
    }
    #vellett-ai-badge:hover {
      background: #18181B;
      transform: scale(1.03);
    }
    #vellett-ai-panel {
      display: none;
      width: 400px;
      max-width: calc(100vw - 32px);
      height: 560px;
      max-height: calc(100vh - 100px);
      background: #FBFBF9;
      border: 1.5px solid #18181B;
      box-shadow: 0 25px 50px rgba(0,0,0,0.4);
      flex-direction: column;
      overflow: hidden;
      margin-bottom: 12px;
      border-radius: 2px;
    }
    #vellett-ai-panel.open {
      display: flex !important;
    }
    .vellett-ai-header {
      background: #09090B;
      color: #FFFFFF;
      padding: 14px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #27272A;
    }
    .vellett-ai-messages {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
      font-size: 13px;
      line-height: 1.5;
      background: #FBFBF9;
    }
    .vellett-msg {
      max-width: 90%;
      padding: 12px 14px;
      word-wrap: break-word;
      font-size: 13px;
      border-radius: 2px;
    }
    .vellett-msg.bot {
      background: #FFFFFF;
      color: #18181B;
      border: 1px solid #E4E4E7;
      align-self: flex-start;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .vellett-msg.user {
      background: #09090B;
      color: #FFFFFF;
      align-self: flex-end;
    }
    .vellett-ai-chips {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 10px;
    }
    .vellett-chip {
      background: #FFFFFF;
      color: #18181B;
      border: 1px solid #D4D4D8;
      padding: 8px 12px;
      font-size: 12px;
      font-family: "Inter", sans-serif;
      font-weight: 500;
      text-align: left;
      cursor: pointer;
      transition: all 0.15s ease;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .vellett-chip:hover {
      background: #09090B;
      color: #FFFFFF;
      border-color: #09090B;
      padding-left: 15px;
    }
    .vellett-ai-input-row {
      display: flex;
      border-top: 1px solid #E4E4E7;
      background: #FFFFFF;
      padding: 10px;
      gap: 8px;
    }
    .vellett-ai-input-row input {
      flex: 1;
      border: 1px solid #D4D4D8;
      padding: 9px 12px;
      font-size: 13px;
      outline: none;
      background: #FBFBF9;
      color: #09090B;
    }
    .vellett-ai-input-row input:focus {
      border-color: #09090B;
    }
    .vellett-ai-input-row button {
      background: #09090B;
      color: #FFFFFF;
      border: none;
      padding: 9px 16px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .vellett-ai-input-row button:hover {
      background: #27272A;
    }
    .vellett-fast-lead {
      background: #F4F4F0;
      border: 1.5px solid #18181B;
      padding: 14px;
      margin-top: 8px;
    }
    .vellett-fast-lead input {
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 8px;
      padding: 8px 12px;
      border: 1px solid #D4D4D8;
      font-size: 13px;
      background: #FFFFFF;
      outline: none;
    }
    .vellett-fast-lead button {
      width: 100%;
      background: #09090B;
      color: #FFFFFF;
      border: none;
      padding: 11px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .vellett-fast-lead button:hover {
      background: #27272A;
    }
  `;
  document.head.appendChild(style);

  // 3. Inject Widget DOM
  let existingWidget = document.getElementById('vellett-ai-widget');
  if (existingWidget) {
    existingWidget.remove();
  }

  const widget = document.createElement('div');
  widget.id = 'vellett-ai-widget';
  widget.innerHTML = `
    <div id="vellett-ai-bubble-callout" title="Ask Vellett Catalog AI Helpdesk">
      <span style="width:6px;height:6px;background:#10B981;border-radius:50%;display:inline-block;"></span>
      <span>Have a messy catalog? Ask Vellett AI &rarr;</span>
    </div>

    <div id="vellett-ai-panel">
      <div class="vellett-ai-header">
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="width:8px;height:8px;background:#10B981;border-radius:50%;display:inline-block;"></span>
          <span style="font-size:12px;font-family:'JetBrains Mono',monospace;font-weight:700;letter-spacing:0.5px;">VELLETT CATALOG AI HELPDESK</span>
        </div>
        <button id="vellett-ai-close" style="background:none;border:none;color:#A1A1AA;cursor:pointer;font-size:20px;line-height:1;" title="Close">&times;</button>
      </div>
      <div class="vellett-ai-messages" id="vellett-msg-list"></div>
      <form class="vellett-ai-input-row" id="vellett-ai-form">
        <input type="text" id="vellett-user-input" placeholder="Type a question or select an option..." autocomplete="off">
        <button type="submit">Ask</button>
      </form>
    </div>

    <div id="vellett-ai-badge" title="Open Vellett Catalog AI Helpdesk">
      <span style="width:8px;height:8px;background:#10B981;border-radius:50%;display:inline-block;"></span>
      <span style="font-weight:700;letter-spacing:0.5px;">Catalog AI Helpdesk</span>
      <svg style="width:15px;height:15px;margin-left:4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
    </div>
  `;
  document.body.appendChild(widget);

  const panel = document.getElementById('vellett-ai-panel');
  const badge = document.getElementById('vellett-ai-badge');
  const callout = document.getElementById('vellett-ai-bubble-callout');
  const closeBtn = document.getElementById('vellett-ai-close');
  const msgList = document.getElementById('vellett-msg-list');
  const form = document.getElementById('vellett-ai-form');
  const input = document.getElementById('vellett-user-input');

  let hasGreeted = false;

  function togglePanel(open) {
    if (open === undefined) {
      panel.classList.toggle('open');
    } else if (open) {
      panel.classList.add('open');
    } else {
      panel.classList.remove('open');
    }

    if (panel.classList.contains('open')) {
      if (callout) callout.style.display = 'none';
      if (!hasGreeted) {
        showHelpdeskNode('root');
        hasGreeted = true;
      }
    }
  }

  window.toggleAIPanel = togglePanel;
  window.openSampleIntake = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    togglePanel(true);
    setTimeout(() => {
      showHelpdeskNode('lead_capture');
    }, 200);
  };

  badge.onclick = () => togglePanel();
  if (callout) callout.onclick = () => togglePanel(true);
  closeBtn.onclick = () => togglePanel(false);

  function appendBotMessage(html, chips = null) {
    const div = document.createElement('div');
    div.className = 'vellett-msg bot';
    div.innerHTML = html;

    if (chips && chips.length > 0) {
      const chipContainer = document.createElement('div');
      chipContainer.className = 'vellett-ai-chips';
      chips.forEach(c => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'vellett-chip';
        btn.innerHTML = `<span>${c.label}</span><span style="opacity:0.5;font-size:10px;">&rarr;</span>`;
        btn.onclick = () => {
          appendUserMessage(c.label);
          setTimeout(() => {
            showHelpdeskNode(c.next);
          }, 250);
        };
        chipContainer.appendChild(btn);
      });
      div.appendChild(chipContainer);
    }

    msgList.appendChild(div);
    msgList.scrollTop = msgList.scrollHeight;
  }

  function appendUserMessage(text) {
    const div = document.createElement('div');
    div.className = 'vellett-msg user';
    div.textContent = text;
    msgList.appendChild(div);
    msgList.scrollTop = msgList.scrollHeight;
  }

  function showHelpdeskNode(key) {
    if (key === 'lead_capture') {
      renderSimpleLeadCapture();
      return;
    }

    const node = HELPDESK[key];
    if (node) {
      appendBotMessage(node.message, node.chips);
    } else {
      showHelpdeskNode('root');
    }
  }

  // ULTRA-SIMPLE 2-FIELD LEAD CAPTURE (NO MASSIVE FORM)
  function renderSimpleLeadCapture() {
    const div = document.createElement('div');
    div.className = 'vellett-msg bot';
    div.style.width = '94%';
    div.innerHTML = `
      <strong>Direct Intake: 10-SKU Pilot Audit</strong><br>
      <span style="font-size:12px;color:#52525B;">Where should our catalog engineering desk send your 10-SKU audit deliverable? Enter your contact details below:</span>
      <form class="vellett-fast-lead" id="fast-lead-form">
        <input type="text" id="lead-name" placeholder="Your Name / Title *" required>
        <input type="tel" id="lead-phone" placeholder="Direct Phone Number *" required>
        <input type="text" id="lead-company" placeholder="Company Name &amp; Catalog Line (Optional)">
        <button type="submit">Submit for 2-Hour Review</button>
      </form>
      <div style="margin-top:8px;font-size:11px;color:#71717A;text-align:center;">
        Need to speak right now? Call: <a href="tel:+19193391208" style="color:#09090B;font-weight:bold;text-decoration:underline;">(919) 339-1208</a>
      </div>
    `;
    msgList.appendChild(div);
    msgList.scrollTop = msgList.scrollHeight;

    const leadForm = div.querySelector('#fast-lead-form');
    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const payload = {
        name: div.querySelector('#lead-name').value.trim(),
        phone: div.querySelector('#lead-phone').value.trim(),
        company: div.querySelector('#lead-company').value.trim() || 'Industrial Distributor',
        timestamp: new Date().toISOString(),
        source: 'AI Helpdesk Chatbot'
      };

      div.innerHTML = `
        <div style="padding:12px;background:#F4F4F0;border:1.5px solid #10B981;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:bold;color:#047857;margin-bottom:4px;">
            INTAKE DISPATCHED TO ENGINEERING DESK
          </div>
          <p style="margin:0 0 8px 0;font-size:12px;color:#18181B;">
            Thank you, <strong>${payload.name}</strong>. Your number (<strong>${payload.phone}</strong>) has been queued for review by our catalog engineering desk.
          </p>
          <div style="font-size:11px;color:#52525B;margin-bottom:8px;">
            A catalog engineer will review your PDF specifications within 2 business hours.
          </div>
          <a href="tel:+19193391208" style="display:block;padding:8px;background:#09090B;color:#FFFFFF;text-align:center;font-weight:bold;text-decoration:none;font-size:11px;font-family:'JetBrains Mono',monospace;">
            Call Direct Now: (919) 339-1208
          </a>
        </div>
      `;

      // Save locally & dispatch to email
      try {
        const stored = JSON.parse(localStorage.getItem('vellett_leads') || '[]');
        stored.push(payload);
        localStorage.setItem('vellett_leads', JSON.stringify(stored));
      } catch (err) {}

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: '64696b99-e6c1-4b10-8b1b-2ce8288544e3',
          subject: `[VELLETT AI LEAD] ${payload.name} - ${payload.phone}`,
          to: 'inquiries@vellett.com',
          ...payload
        })
      }).catch(() => {});
    });
  }

  // Free-text natural language parser
  function handleFreeText(text) {
    if (!text || !text.trim()) return;
    const clean = text.trim();
    appendUserMessage(clean);
    input.value = '';

    const lower = clean.toLowerCase();

    if (lower.includes('price') || lower.includes('cost') || lower.includes('retainer') || lower.includes('rate')) {
      setTimeout(() => showHelpdeskNode('pricing_pilot'), 300);
    } else if (lower.includes('p21') || lower.includes('prophet') || lower.includes('epicor')) {
      setTimeout(() => showHelpdeskNode('p21_details'), 300);
    } else if (lower.includes('infor') || lower.includes('csd') || lower.includes('sx.e')) {
      setTimeout(() => showHelpdeskNode('infor_details'), 300);
    } else if (lower.includes('matrix') || lower.includes('ashcroft') || lower.includes('swagelok') || lower.includes('gauge') || lower.includes('valve')) {
      setTimeout(() => showHelpdeskNode('matrix_unrolling'), 300);
    } else if (lower.includes('footnote') || lower.includes('derating') || lower.includes('de-rating') || lower.includes('temperature')) {
      setTimeout(() => showHelpdeskNode('footnote_auditing'), 300);
    } else if (lower.includes('sample') || lower.includes('pilot') || lower.includes('free') || lower.includes('audit')) {
      setTimeout(() => showHelpdeskNode('lead_capture'), 300);
    } else if (lower.includes('call') || lower.includes('phone') || lower.includes('human') || lower.includes('speak') || lower.includes('talk')) {
      setTimeout(() => {
        appendBotMessage(
          'You can call our direct catalog engineering desk right now at <a href="tel:+19193391208" style="font-weight:bold;text-decoration:underline;">(919) 339-1208</a>.<br><br>Or leave your name and phone number below for an immediate callback:',
          [{ label: 'Request Immediate Callback', next: 'lead_capture' }]
        );
      }, 300);
    } else {
      setTimeout(() => {
        appendBotMessage(
          'Our catalog engineering desk handles complex manufacturer PDF unrolling, 20-attribute ERP formatting (Prophet 21, Infor CSD), and footnote de-rating audits.<br><br>Please choose an area to explore:',
          [
            { label: 'Catalog PDF & Matrix Issues', next: 'catalog_issues' },
            { label: 'ERP Integration (P21, Infor)', next: 'erp_integration' },
            { label: 'Pricing & Free 10-SKU Pilot', next: 'pricing_pilot' },
            { label: 'Speak with Engineering Desk', next: 'lead_capture' }
          ]
        );
      }, 300);
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    handleFreeText(input.value);
  });

})();
