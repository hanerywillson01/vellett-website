// Vellett Industrial Catalog Engineering - AI Concierge & Lead Intake
// Lightweight client-side industrial Q&A engine and direct lead capture pipeline

(function () {
  'use strict';

  // 1. Embedded Knowledge Base
  const KNOWLEDGE = [
    {
      keywords: ['price', 'pricing', 'cost', 'fee', 'retainer', 'rate', 'quote', 'package', 'how much'],
      answer: 'Our pricing is transparent and project-based:<br><br>&bull; <strong>10-SKU Pilot Audit:</strong> 100% Free proof-of-concept.<br>&bull; <strong>Single Line Pilot:</strong> $1,500 flat fee for 1 full manufacturer series.<br>&bull; <strong>Active Distribution Sprint:</strong> $4,200/month (up to 4 complete manufacturer lines per month, 5-day sprints).<br>&bull; <strong>Enterprise Clearing:</strong> $12,000/month for high-volume legacy catalog backlogs with dedicated staging.'
    },
    {
      keywords: ['turnaround', 'time', 'how long', 'fast', 'sprint', 'schedule', 'days', 'sla'],
      answer: 'We deliver complete catalog lines in <strong>5 business days</strong> per manufacturer sprint. Every deliverable includes 5 verified sheets: P21/CSD Import CSV, Full 20-Attribute Master, Discrepancy Log, Footnote De-Rating Matrix, and Cross-Reference Sheet.'
    },
    {
      keywords: ['erp', 'prophet 21', 'p21', 'epicor', 'infor', 'csd', 'sx.e', 'netsuite', 'sap', 'bigcommerce'],
      answer: 'We build native import files mapped directly to your specific ERP schema:<br><br>&bull; <strong>Epicor Prophet 21:</strong> Item Master, Extended Attributes, Item Price, Item UOM.<br>&bull; <strong>Infor CSD / SX.e:</strong> ICSP, ICSPU, and catalog tables.<br>&bull; <strong>Oracle NetSuite &amp; SAP Business One:</strong> Matrix items &amp; custom attributes.<br>&bull; <strong>BigCommerce B2B Edition:</strong> Faceted search attributes and product variants.'
    },
    {
      keywords: ['methodology', '5-sheet', 'sheets', 'deliverable', 'attributes', 'what do you deliver'],
      answer: 'Our 5-Sheet Deliverable guarantees zero data errors:<br><br>1. <strong>ERP Ready Import CSV:</strong> Formatted for one-click upload.<br>2. <strong>Master Engineering Sheet:</strong> 20 normalized technical attributes.<br>3. <strong>Discrepancy &amp; Gap Audit:</strong> Identifies discontinued SKUs and missing supplier data.<br>4. <strong>Footnote De-Rating Matrix:</strong> Temperature and pressure de-ratings audited directly from footnotes.<br>5. <strong>Interchange / Cross-Reference:</strong> Competitive drop-in replacement mapping.'
    },
    {
      keywords: ['manufacturer', 'brand', 'ashcroft', 'swagelok', 'dwyer', 'wika', 'parker', 'smc'],
      answer: 'We specialize in mechanical, fluid power, and instrumentation catalogs including <strong>Ashcroft</strong> (gauges/transmitters), <strong>Swagelok</strong> (60 Series valves, fittings), <strong>Dwyer Instruments</strong> (Magnehelics), <strong>WIKA</strong> (pressure gauges), <strong>Parker Hannifin</strong>, and <strong>SMC Pneumatics</strong>.'
    },
    {
      keywords: ['sample', 'pilot', 'free', 'test', 'audit', '10-sku'],
      answer: 'We offer a <strong>Free 10-SKU Pilot Audit</strong>. Send us any manufacturer PDF catalog or part matrix, and our engineering desk will unroll 10 complex SKUs and deliver the complete 5-sheet deliverable free of charge so you can verify our precision before contracting.'
    },
    {
      keywords: ['human', 'contact', 'call', 'speak', 'phone', 'talk', 'ayush', 'desk'],
      answer: 'You can connect directly with our engineering desk right now:<br><br>&bull; <strong>Direct Line:</strong> <a href="tel:+19193391208" class="underline font-bold text-zinc-950">(919) 339-1208</a> (Mon&ndash;Fri 8am&ndash;6pm EST)<br>&bull; <strong>Email:</strong> <a href="mailto:inquiries@vellett.com" class="underline text-zinc-950">inquiries@vellett.com</a>'
    }
  ];

  // 2. Build and Inject UI
  const style = document.createElement('style');
  style.textContent = `
    #vellett-ai-widget {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99999;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    #vellett-ai-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #09090B;
      color: #FFFFFF;
      padding: 10px 16px;
      border: 1px solid #27272A;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 12px;
      font-family: "JetBrains Mono", monospace;
    }
    #vellett-ai-badge:hover {
      background: #18181B;
      transform: translateY(-2px);
    }
    #vellett-ai-panel {
      display: none;
      width: 380px;
      max-width: calc(100vw - 32px);
      height: 540px;
      max-height: calc(100vh - 100px);
      background: #FBFBF9;
      border: 1px solid #18181B;
      box-shadow: 0 20px 40px rgba(0,0,0,0.25);
      flex-direction: column;
      overflow: hidden;
      margin-bottom: 12px;
    }
    #vellett-ai-panel.open {
      display: flex;
    }
    .vellett-ai-header {
      background: #09090B;
      color: #FFFFFF;
      padding: 12px 16px;
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
      max-width: 88%;
      padding: 10px 14px;
      word-wrap: break-word;
    }
    .vellett-msg.bot {
      background: #FFFFFF;
      color: #18181B;
      border: 1px solid #E4E4E7;
      align-self: flex-start;
    }
    .vellett-msg.user {
      background: #09090B;
      color: #FFFFFF;
      align-self: flex-end;
    }
    .vellett-ai-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }
    .vellett-chip {
      background: #F4F4F0;
      color: #18181B;
      border: 1px solid #D4D4D8;
      padding: 5px 10px;
      font-size: 11px;
      font-family: "JetBrains Mono", monospace;
      cursor: pointer;
      transition: all 0.15s;
    }
    .vellett-chip:hover {
      background: #09090B;
      color: #FFFFFF;
      border-color: #09090B;
    }
    .vellett-ai-input-row {
      display: flex;
      border-top: 1px solid #E4E4E7;
      background: #FFFFFF;
      padding: 8px;
      gap: 6px;
    }
    .vellett-ai-input-row input {
      flex: 1;
      border: 1px solid #D4D4D8;
      padding: 8px 12px;
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
      padding: 8px 14px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .vellett-ai-input-row button:hover {
      background: #27272A;
    }
    .vellett-lead-form {
      margin-top: 10px;
      padding: 10px;
      border: 1px solid #18181B;
      background: #FFFFFF;
    }
    .vellett-lead-form input {
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 8px;
      padding: 7px 10px;
      border: 1px solid #D4D4D8;
      font-size: 12px;
      outline: none;
    }
    .vellett-lead-form button {
      width: 100%;
      background: #09090B;
      color: #FFFFFF;
      border: none;
      padding: 9px;
      font-size: 12px;
      font-weight: bold;
      cursor: pointer;
      text-transform: uppercase;
    }
  `;
  document.head.appendChild(style);

  // Widget HTML
  const widget = document.createElement('div');
  widget.id = 'vellett-ai-widget';
  widget.innerHTML = `
    <div id="vellett-ai-panel">
      <div class="vellett-ai-header">
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="width:8px;height:8px;background:#34D399;border-radius:50%;display:inline-block;"></span>
          <span style="font-size:12px;font-family:'JetBrains Mono',monospace;font-weight:600;letter-spacing:0.5px;">VELLETT CATALOG AI</span>
        </div>
        <button id="vellett-ai-close" style="background:none;border:none;color:#A1A1AA;cursor:pointer;font-size:18px;line-height:1;" title="Close">&times;</button>
      </div>
      <div class="vellett-ai-messages" id="vellett-msg-list">
        <!-- Messages injected here -->
      </div>
      <form class="vellett-ai-input-row" id="vellett-ai-form">
        <input type="text" id="vellett-user-input" placeholder="Ask about catalogs, ERPs, or turnaround..." autocomplete="off">
        <button type="submit">Send</button>
      </form>
    </div>

    <div id="vellett-ai-badge" title="Open Vellett Catalog AI Concierge">
      <span style="width:8px;height:8px;background:#34D399;border-radius:50%;display:inline-block;"></span>
      <span>Catalog AI Concierge</span>
      <svg style="width:14px;height:14px;margin-left:4px;opacity:0.8;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
    </div>
  `;
  document.body.appendChild(widget);

  const panel = document.getElementById('vellett-ai-panel');
  const badge = document.getElementById('vellett-ai-badge');
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

    if (panel.classList.contains('open') && !hasGreeted) {
      sendGreeting();
      hasGreeted = true;
    }
  }

  badge.addEventListener('click', () => togglePanel());
  closeBtn.addEventListener('click', () => togglePanel(false));

  // Global trigger for Request Sample button
  window.openSampleIntake = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    togglePanel(true);
    setTimeout(() => {
      triggerSampleAuditFlow();
    }, 200);
  };

  function appendMessage(text, sender = 'bot', chips = null) {
    const div = document.createElement('div');
    div.className = `vellett-msg ${sender}`;
    div.innerHTML = text;

    if (chips && chips.length > 0) {
      const chipContainer = document.createElement('div');
      chipContainer.className = 'vellett-ai-chips';
      chips.forEach(c => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'vellett-chip';
        btn.textContent = c.label;
        btn.onclick = () => {
          handleUserInput(c.query || c.label);
        };
        chipContainer.appendChild(btn);
      });
      div.appendChild(chipContainer);
    }

    msgList.appendChild(div);
    msgList.scrollTop = msgList.scrollHeight;
  }

  function sendGreeting() {
    appendMessage(
      '<strong>Welcome to Vellett Industrial Catalog Engineering.</strong><br>We unroll complex manufacturer PDF datasheets into audited 20-attribute item masters for industrial ERPs.<br><br>What catalog or ERP challenge is your team looking to solve?',
      'bot',
      [
        { label: 'Request Free 10-SKU Sample', query: 'I want to request a free 10-SKU pilot audit' },
        { label: 'Unroll Supplier PDF Matrix', query: 'How do you unroll complex manufacturer matrices?' },
        { label: 'Epicor P21 / Infor CSD', query: 'What ERP systems do you format for?' },
        { label: 'Pricing & 5-Day Delivery', query: 'What is your pricing and turnaround time?' },
        { label: 'Call Engineering Desk', query: 'I want to call your engineering desk' }
      ]
    );
  }

  function triggerSampleAuditFlow() {
    appendMessage('I would like to request a 10-SKU sample audit.', 'user');
    setTimeout(() => {
      renderLeadForm('10-SKU Pilot Audit Request');
    }, 300);
  }

  function renderLeadForm(topic = 'Inquiry') {
    const formDiv = document.createElement('div');
    formDiv.className = 'vellett-msg bot';
    formDiv.style.width = '92%';
    formDiv.innerHTML = `
      <strong>Intake Routing to Engineering Desk</strong><br>
      <span style="font-size:11px;color:#71717A;">Enter your details below. Our team will review your catalog requirements within 2 business hours.</span>
      <form class="vellett-lead-form" id="ai-lead-capture">
        <input type="text" id="ai-lead-name" placeholder="Full Name *" required>
        <input type="tel" id="ai-lead-phone" placeholder="Direct Phone Number *" required>
        <input type="email" id="ai-lead-email" placeholder="Work Email *" required>
        <input type="text" id="ai-lead-company" placeholder="Company / Distributor Name *" required>
        <input type="text" id="ai-lead-catalog" placeholder="Manufacturer PDF / Brand (e.g. Ashcroft, Swagelok)">
        <button type="submit">Submit to Engineering Desk</button>
      </form>
      <div style="margin-top:8px;font-size:11px;color:#71717A;text-align:center;">
        Prefer calling now? <a href="tel:+19193391208" style="color:#09090B;font-weight:bold;text-decoration:underline;">(919) 339-1208</a>
      </div>
    `;
    msgList.appendChild(formDiv);
    msgList.scrollTop = msgList.scrollHeight;

    const leadForm = formDiv.querySelector('#ai-lead-capture');
    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const lead = {
        name: leadForm.querySelector('#ai-lead-name').value.trim(),
        phone: leadForm.querySelector('#ai-lead-phone').value.trim(),
        email: leadForm.querySelector('#ai-lead-email').value.trim(),
        company: leadForm.querySelector('#ai-lead-company').value.trim(),
        catalog: leadForm.querySelector('#ai-lead-catalog').value.trim(),
        topic: topic,
        timestamp: new Date().toISOString()
      };
      submitLead(lead, formDiv);
    });
  }

  function submitLead(lead, container) {
    container.innerHTML = `
      <div style="padding:12px;background:#F4F4F0;border:1px solid #18181B;">
        <div style="font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:bold;color:#09090B;margin-bottom:4px;">
          INQUIRY DISPATCHED TO ENGINEERING DESK
        </div>
        <p style="margin:0 0 8px 0;font-size:12px;color:#27272A;">
          Thank you, <strong>${lead.name || 'Partner'}</strong>. Your request for <strong>${lead.company || 'your catalog line'}</strong> has been received by our catalog engineering desk.
        </p>
        <div style="padding:8px;background:#FFFFFF;border:1px solid #E4E4E7;margin-bottom:8px;font-size:11px;font-family:'JetBrains Mono',monospace;">
          <div>Phone: ${lead.phone}</div>
          <div>Email: ${lead.email}</div>
          <div>Catalog: ${lead.catalog || 'To be provided'}</div>
          <div style="color:#16A34A;font-weight:bold;margin-top:4px;">Status: Queued for 2-hour engineering review</div>
        </div>
        <div style="font-size:11px;color:#71717A;">
          For immediate priority intake, call our direct line:
          <a href="tel:+19193391208" style="display:block;margin-top:4px;padding:6px;background:#09090B;color:#FFFFFF;text-align:center;font-weight:bold;text-decoration:none;font-family:'JetBrains Mono',monospace;">
            Call Direct: (919) 339-1208
          </a>
        </div>
      </div>
    `;

    // 1. Save to localStorage backup
    try {
      const existing = JSON.parse(localStorage.getItem('vellett_leads') || '[]');
      existing.push(lead);
      localStorage.setItem('vellett_leads', JSON.stringify(existing));
    } catch (err) {}

    // 2. Post to Cloudflare Function / API
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead)
    }).catch(() => {});

    // 3. Post to Web3Forms for direct email delivery to inquiries@vellett.com
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: '64696b99-e6c1-4b10-8b1b-2ce8288544e3', // Standard Web3Forms token or fallback
        subject: `[VELLETT AI LEAD] ${lead.name} from ${lead.company} - (${lead.phone})`,
        from_name: 'Vellett AI Concierge',
        to: 'inquiries@vellett.com',
        ...lead
      })
    }).catch(() => {});
  }

  function handleUserInput(query) {
    if (!query || !query.trim()) return;
    const cleanQuery = query.trim();
    appendMessage(cleanQuery, 'user');
    input.value = '';

    const lower = cleanQuery.toLowerCase();

    // Check if user is asking for sample / pilot
    if (lower.includes('sample') || lower.includes('pilot') || lower.includes('10-sku') || lower.includes('quote')) {
      setTimeout(() => {
        appendMessage('We would be glad to unroll 10 SKUs from your manufacturer catalog free of charge.', 'bot');
        renderLeadForm('10-SKU Pilot Audit');
      }, 400);
      return;
    }

    // Check if user is asking to speak / call
    if (lower.includes('call') || lower.includes('speak') || lower.includes('contact') || lower.includes('phone') || lower.includes('human')) {
      setTimeout(() => {
        appendMessage(
          'You can call our direct engineering intake line right now at <a href="tel:+19193391208" style="font-weight:bold;text-decoration:underline;">(919) 339-1208</a>.<br><br>Or leave your number below and our engineering team will contact you directly within 2 business hours:',
          'bot'
        );
        renderLeadForm('Direct Callback Request');
      }, 400);
      return;
    }

    // Match with knowledge base
    let matchedAnswer = null;
    for (const item of KNOWLEDGE) {
      if (item.keywords.some(kw => lower.includes(kw))) {
        matchedAnswer = item.answer;
        break;
      }
    }

    setTimeout(() => {
      if (matchedAnswer) {
        appendMessage(
          matchedAnswer,
          'bot',
          [
            { label: 'Request Free 10-SKU Audit', query: 'I want to request a free 10-SKU pilot audit' },
            { label: 'Call (919) 339-1208', query: 'I want to call your engineering desk' }
          ]
        );
      } else {
        appendMessage(
          'Our catalog engineering desk handles custom manufacturer PDF unrolling, part matrix unrolling, and 20-attribute formatting for industrial ERPs.<br><br>Would you like to speak directly with an engineer or submit a 10-SKU sample to test our accuracy?',
          'bot',
          [
            { label: 'Request 10-SKU Sample', query: 'I want to request a free 10-SKU pilot audit' },
            { label: 'Call Direct: (919) 339-1208', query: 'I want to call your engineering desk' }
          ]
        );
      }
    }, 400);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    handleUserInput(input.value);
  });

})();
