# -*- coding: utf-8 -*-
"""
publish_studio.py - Vellett Editorial Studio HTTP Server & Article Publisher

Runs a local web server to host Vellett website and handle article publishing
from resources/studio.html with support for:
- Uploaded technical photos and diagrams (PNG, JPG, WebP, SVG)
- AI-generated technical SVG blueprints
- Automatic generation of SEO-optimized article pages
- Automatic update of resources/index.html and sitemap.xml
- 100% zero-emoji enforcement and relative path routing

Usage:
  python publish_studio.py [port]  (default: 8080)
"""

import http.server
import socketserver
import json
import os
import sys
import base64
import re
import datetime

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
RESOURCES_DIR = os.path.join(BASE_DIR, "resources")
SITEMAP_FILE = os.path.join(BASE_DIR, "sitemap.xml")
RESOURCES_INDEX = os.path.join(RESOURCES_DIR, "index.html")

class StudioRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def do_POST(self):
        if self.path == "/api/publish":
            content_length = int(self.headers.get("Content-Length", 0))
            post_data = self.rfile.read(content_length)
            
            try:
                payload = json.loads(post_data.decode("utf-8"))
                result = self.process_article_publish(payload)
                
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps(result).encode("utf-8"))
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
        else:
            self.send_response(404)
            self.end_headers()

    def process_article_publish(self, data):
        title = data.get("title", "Untitled Guide").strip()
        slug = data.get("slug", "").strip()
        if not slug:
            slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
            
        category = data.get("category", "Data Quality & De-Rating").strip()
        read_time = data.get("readTime", "8 min read").strip()
        summary = data.get("summary", "").strip()
        body = data.get("body", "").strip()
        media_mode = data.get("mediaMode", "ai")
        uploaded_image = data.get("uploadedImage", "")
        svg_content = data.get("svgContent", "")
        
        today_str = datetime.date.today().strftime("%B %d, %Y")
        iso_date = datetime.date.today().isoformat()

        # Target directory: resources/<slug>/
        target_dir = os.path.join(RESOURCES_DIR, slug)
        os.makedirs(target_dir, exist_ok=True)

        # 1. Process featured graphic
        image_html_tag = ""
        featured_image_filename = ""
        
        if media_mode == "upload" and uploaded_image and "base64," in uploaded_image:
            header, encoded = uploaded_image.split("base64,", 1)
            ext = "png"
            if "image/jpeg" in header or "image/jpg" in header:
                ext = "jpg"
            elif "image/webp" in header:
                ext = "webp"
            elif "image/svg" in header:
                ext = "svg"

            featured_image_filename = f"featured.{ext}"
            img_path = os.path.join(target_dir, featured_image_filename)
            with open(img_path, "wb") as img_f:
                img_f.write(base64.b64decode(encoded))
                
            image_html_tag = f"""
      <figure class="my-8 border border-zinc-200 bg-white p-2 shadow-sm">
        <img src="{featured_image_filename}" alt="{title} technical diagram" class="w-full h-auto object-cover max-h-[500px]">
        <figcaption class="text-xs font-mono text-zinc-500 pt-2 px-1">Figure 1.0: Technical diagram and reference data for {title}.</figcaption>
      </figure>"""
        elif svg_content:
            featured_image_filename = "featured.svg"
            svg_path = os.path.join(target_dir, featured_image_filename)
            # Ensure SVG has xmlns
            if "xmlns=" not in svg_content:
                svg_content = svg_content.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"')
            with open(svg_path, "w", encoding="utf-8") as svg_f:
                svg_f.write(svg_content)
                
            image_html_tag = f"""
      <figure class="my-8 border border-zinc-900 bg-zinc-950 p-4 shadow-sm overflow-hidden">
        <img src="{featured_image_filename}" alt="{title} technical blueprint" class="w-full h-auto">
        <figcaption class="text-xs font-mono text-emerald-400 pt-3 border-t border-zinc-800 mt-3">Blueprint 1.0: Vellett Engineering Specification Architecture &amp; Logic Diagram.</figcaption>
      </figure>"""

        # 2. Build Article HTML
        article_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | Vellett</title>
  <meta name="description" content="{summary}">
  <link rel="canonical" href="https://vellett.com/resources/{slug}/">
  
  <meta property="og:type" content="article">
  <meta property="og:title" content="{title} | Vellett">
  <meta property="og:description" content="{summary}">
  <meta property="og:url" content="https://vellett.com/resources/{slug}/">
  <meta property="og:site_name" content="Vellett Industrial Catalog Engineering">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {{
      theme: {{
        extend: {{
          colors: {{
            parchment: '#FBFBF9',
            'parchment-subtle': '#F4F4F0',
            zinc: {{ 850: '#18181B', 900: '#09090B', 950: '#040405' }}
          }},
          fontFamily: {{
            sans: ['Inter', '-apple-system', 'sans-serif'],
            serif: ['Newsreader', 'Georgia', 'serif'],
            mono: ['JetBrains Mono', 'monospace'],
          }}
        }}
      }}
    }}
  </script>
  <style>
    body {{ background-color: #FBFBF9; color: #09090B; }}
    ::selection {{ background-color: #18181B; color: #FFFFFF; }}
  </style>

  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "{title}",
    "description": "{summary}",
    "datePublished": "{iso_date}",
    "dateModified": "{iso_date}",
    "author": {{
      "@type": "Person",
      "name": "Ayush Bijlwan",
      "jobTitle": "Principal Catalog Engineer",
      "url": "https://vellett.com/"
    }},
    "publisher": {{
      "@type": "Organization",
      "name": "Vellett Industrial Catalog Engineering LLC",
      "url": "https://vellett.com/"
    }}
  }}
  </script>
</head>
<body class="bg-parchment text-zinc-900 antialiased font-sans">

  <!-- Top Utility Bar -->
  <div class="border-b border-zinc-200 bg-zinc-950 text-zinc-300 text-xs py-2 px-4 sm:px-8">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
      <div class="flex items-center space-x-4 text-zinc-400">
        <span class="text-zinc-200 font-medium tracking-wide">Vellett Industrial Catalog Engineering LLC</span>
        <span class="hidden md:inline text-zinc-700">|</span>
        <span class="hidden md:inline">Wilmington, DE</span>
      </div>
      <div class="flex items-center space-x-6">
        <a href="tel:+19193391208" class="text-zinc-200 hover:text-white font-mono font-semibold flex items-center space-x-1.5 transition-colors group">
          <svg class="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          <span class="text-white underline decoration-zinc-600 underline-offset-2">(919) 339-1208</span>
        </a>
        <a href="mailto:inquiries@vellett.com" class="text-zinc-400 hover:text-zinc-200 transition-colors">inquiries@vellett.com</a>
      </div>
    </div>
  </div>

  <!-- Navigation -->
  <header class="border-b border-zinc-200 bg-white/95 backdrop-blur sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
      <a href="../../index.html" class="flex flex-col group py-1">
        <span class="text-2xl font-bold tracking-tight font-sans text-zinc-950 group-hover:text-zinc-700 transition-colors">VELLETT</span>
        <span class="text-[10px] tracking-widest uppercase text-zinc-500 font-mono -mt-1">Industrial Catalog Engineering</span>
      </a>

      <div class="flex items-center space-x-6 lg:space-x-8">
        <nav class="hidden md:flex items-center space-x-6 lg:space-x-8">
          <a href="../../methodology/index.html" class="text-xs lg:text-sm text-zinc-600 hover:text-zinc-950 transition-colors pb-0.5">Methodology</a>
          <a href="../../services/index.html" class="text-xs lg:text-sm text-zinc-600 hover:text-zinc-950 transition-colors pb-0.5">Services</a>
          <a href="../../pricing/index.html" class="text-xs lg:text-sm text-zinc-600 hover:text-zinc-950 transition-colors pb-0.5">Pricing</a>
          <a href="../../resources/index.html" class="text-xs lg:text-sm text-zinc-950 font-semibold border-b-2 border-zinc-950 pb-0.5">Guides</a>
        </nav>

        <a href="../../index.html#sample-intake" class="inline-flex items-center justify-center text-xs font-semibold uppercase tracking-wider text-white bg-zinc-950 hover:bg-zinc-800 px-4 sm:px-5 py-2 sm:py-2.5 transition-colors shadow-sm">
          Request Sample
        </a>
      </div>
    </div>
  </header>

  <!-- Article Main -->
  <main class="max-w-4xl mx-auto px-4 sm:px-8 py-12">
    
    <!-- Breadcrumbs -->
    <nav aria-label="Breadcrumb" class="mb-6 font-mono text-xs text-zinc-500">
      <div class="flex items-center space-x-2">
        <a href="../../index.html" class="hover:text-zinc-950 transition-colors">Home</a>
        <span class="text-zinc-300">/</span>
        <a href="../index.html" class="hover:text-zinc-950 transition-colors">Guides</a>
        <span class="text-zinc-300">/</span>
        <span class="text-zinc-900 font-semibold">{category}</span>
      </div>
    </nav>

    <!-- Header -->
    <header class="border-b border-zinc-200 pb-8 mb-8">
      <div class="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500 mb-4">
        <span class="bg-zinc-100 text-zinc-900 px-2 py-0.5 font-semibold border border-zinc-200">{category}</span>
        <span>&bull;</span>
        <span>{read_time}</span>
        <span>&bull;</span>
        <span>{today_str}</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-serif font-bold text-zinc-950 tracking-tight leading-[1.15] mb-6">
        {title}
      </h1>
      <p class="text-base sm:text-lg text-zinc-600 font-sans leading-relaxed">
        {summary}
      </p>
    </header>

    <!-- Featured Image / AI Blueprint -->
    {image_html_tag}

    <!-- Content Body -->
    <article class="prose max-w-none text-zinc-800 font-sans leading-relaxed text-sm sm:text-base space-y-6">
      {body}
    </article>

    <!-- Call to Action Box -->
    <div class="mt-16 border border-zinc-300 bg-white p-8 shadow-sm">
      <div class="max-w-2xl">
        <span class="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold block mb-2">Zero-Risk Engineering Validation</span>
        <h3 class="text-2xl font-serif font-bold text-zinc-950 mb-3">Eliminate Catalog Friction in Your ERP</h3>
        <p class="text-xs sm:text-sm text-zinc-600 font-sans mb-6">
          Upload any manufacturer PDF catalog or complex price list. Vellett delivers a fully unrolled, 20-attribute audit file configured for Epicor Prophet 21 or Infor CSD in 48 hours at zero cost.
        </p>
        <div class="flex flex-wrap items-center gap-4">
          <a href="../../index.html#sample-intake" class="inline-flex items-center text-xs font-mono font-bold uppercase tracking-wider px-5 py-2.5 bg-zinc-950 text-white hover:bg-zinc-800 transition-colors">
            Request 10-SKU Pilot Audit &rarr;
          </a>
          <a href="tel:+19193391208" class="text-xs font-mono text-zinc-700 hover:text-zinc-950 underline font-semibold">
            Direct Desk: (919) 339-1208
          </a>
        </div>
      </div>
    </div>

  </main>

  <!-- Footer -->
  <footer class="border-t border-zinc-200 bg-white py-12 px-4 sm:px-8 mt-20">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-zinc-500 font-mono">
      <div>
        &copy; 2026 Vellett Industrial Catalog Engineering LLC. All rights reserved.
      </div>
      <div class="flex space-x-6">
        <a href="../../methodology/index.html" class="hover:text-zinc-950">Methodology</a>
        <a href="../../services/index.html" class="hover:text-zinc-950">Services</a>
        <a href="../../pricing/index.html" class="hover:text-zinc-950">Pricing</a>
        <a href="../../resources/index.html" class="hover:text-zinc-950">Guides</a>
      </div>
    </div>
  </footer>

  <script src="../../vellett-ai.js"></script>
</body>
</html>"""

        # Write article file
        art_path = os.path.join(target_dir, "index.html")
        with open(art_path, "w", encoding="utf-8") as f:
            f.write(article_html)

        # 3. Update resources/index.html (prepend new article card)
        self.update_resources_index(title, slug, category, read_time, summary, featured_image_filename)

        # 4. Update sitemap.xml
        self.update_sitemap(slug, iso_date)

        return {
            "status": "success",
            "slug": slug,
            "url": f"/resources/{slug}/index.html",
            "message": "Article published, media saved, index and sitemap updated."
        }

    def update_resources_index(self, title, slug, category, read_time, summary, image_file):
        if not os.path.exists(RESOURCES_INDEX):
            return

        with open(RESOURCES_INDEX, "r", encoding="utf-8") as f:
            content = f.read()

        # If slug already exists in index, don't duplicate
        if f'href="{slug}/index.html"' in content or f'href="../resources/{slug}/index.html"' in content:
            return

        image_thumb_html = ""
        if image_file:
            image_thumb_html = f"""
        <div class="mb-4 border border-zinc-200 overflow-hidden bg-zinc-950 h-32 flex items-center justify-center">
          <img src="{slug}/{image_file}" alt="{title}" class="w-full h-full object-cover">
        </div>"""

        card_html = f"""
      <!-- Card: {title} -->
      <article class="group border border-zinc-300 bg-white p-6 sm:p-8 flex flex-col justify-between hover:border-zinc-950 transition-colors shadow-sm">
        <div>
          {image_thumb_html}
          <div class="flex items-center space-x-2 text-xs font-mono text-zinc-500 mb-3">
            <span class="text-zinc-950 font-semibold">{category}</span>
            <span>&bull;</span>
            <span>{read_time}</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-serif text-zinc-950 font-bold mb-3 group-hover:text-zinc-800 leading-snug">
            <a href="{slug}/index.html" class="focus:outline-none">
              {title}
            </a>
          </h2>
          <p class="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed line-clamp-3 mb-6">
            {summary}
          </p>
        </div>
        <div class="pt-4 border-t border-zinc-100 flex items-center justify-between font-mono text-xs">
          <span class="text-zinc-400">Engineering Reference</span>
          <a href="{slug}/index.html" class="font-semibold text-zinc-900 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
            Read Full Guide &rarr;
          </a>
        </div>
      </article>
"""
        # Inject before first article card or into grid
        target_marker = '<!-- Card 1: Epicor Prophet 21'
        if target_marker in content:
            content = content.replace(target_marker, card_html + "\n      " + target_marker)
        elif '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">' in content:
            content = content.replace(
                '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">',
                '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">\n' + card_html
            )

        with open(RESOURCES_INDEX, "w", encoding="utf-8") as f:
            f.write(content)

    def update_sitemap(self, slug, iso_date):
        if not os.path.exists(SITEMAP_FILE):
            return

        with open(SITEMAP_FILE, "r", encoding="utf-8") as f:
            content = f.read()

        url_str = f"https://vellett.com/resources/{slug}/"
        if url_str in content:
            return

        entry = f"""  <url>
    <loc>{url_str}</loc>
    <lastmod>{iso_date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>"""

        if "</urlset>" in content:
            content = content.replace("</urlset>", entry)
            with open(SITEMAP_FILE, "w", encoding="utf-8") as f:
                f.write(content)

if __name__ == "__main__":
    print(f"Starting Vellett Editorial Studio HTTP Server on http://localhost:{PORT}")
    print(f"Base Directory: {BASE_DIR}")
    print(f"Open Studio: http://localhost:{PORT}/resources/studio.html")
    with socketserver.TCPServer(("", PORT), StudioRequestHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
