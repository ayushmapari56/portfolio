import fs from "fs";
import path from "path";
import sharp from "sharp";

const cardsDir = path.resolve("./public/cards");
fs.mkdirSync(cardsDir, { recursive: true });

async function generateSilverCards() {
  console.log("Generating realistic silver card textures...");

  // Load photos of Ayush and Kishori
  const ayushBuf = await sharp(path.resolve("./public/team/person1.jpg"))
    .resize(400, 480, { fit: "cover", position: "top" })
    .toBuffer();

  const kishoriBuf = await sharp(path.resolve("./public/team/person2.jpg"))
    .resize(400, 480, { fit: "cover", position: "top" })
    .toBuffer();

  const roundedCorners = Buffer.from(
    '<svg><rect x="0" y="0" width="400" height="480" rx="20" ry="20"/></svg>'
  );

  const roundedAyush = await sharp(ayushBuf)
    .composite([{ input: roundedCorners, blend: "dest-in" }])
    .png()
    .toBuffer();

  const roundedKishori = await sharp(kishoriBuf)
    .composite([{ input: roundedCorners, blend: "dest-in" }])
    .png()
    .toBuffer();

  // Helper for generating realistic Barcode SVG
  const generateBarcode = (w, h) => `
    <g fill="#1A1A24">
      ${Array.from({ length: 42 })
        .map((_, i) => {
          const x = i * 16 + (i % 3 === 0 ? 3 : 0);
          const width = (i % 4 === 0 ? 8 : i % 2 === 0 ? 4 : 2);
          return `<rect x="${x}" y="0" width="${width}" height="${h}" />`;
        })
        .join("")}
    </g>
  `;

  // 1. AYUSH MAPARI - FRONT CARD (SILVER LUXURY)
  const ayushFrontSvg = `
    <svg width="800" height="1200" viewBox="0 0 800 1200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Brushed Silver Platinum Gradient -->
        <linearGradient id="silverBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="25%" stop-color="#E8E8EE" />
          <stop offset="50%" stop-color="#DCDCE5" />
          <stop offset="75%" stop-color="#F2F2F6" />
          <stop offset="100%" stop-color="#E0E0E8" />
        </linearGradient>

        <!-- Chrome metallic stroke -->
        <linearGradient id="chrome" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#D0D0DC" />
          <stop offset="50%" stop-color="#FFFFFF" />
          <stop offset="100%" stop-color="#B8B8C6" />
        </linearGradient>

        <linearGradient id="hologram" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="rgba(255,110,16,0.18)" />
          <stop offset="35%" stop-color="rgba(56,189,248,0.22)" />
          <stop offset="70%" stop-color="rgba(168,85,247,0.18)" />
          <stop offset="100%" stop-color="rgba(16,185,129,0.15)" />
        </linearGradient>
      </defs>

      <!-- Card Base -->
      <rect width="800" height="1200" rx="36" fill="url(#silverBg)" />
      <rect width="800" height="1200" rx="36" fill="url(#hologram)" />

      <!-- Metallic Chrome Inset Borders -->
      <rect x="22" y="22" width="756" height="1156" rx="28" fill="none" stroke="url(#chrome)" stroke-width="2.5" />
      <rect x="32" y="32" width="736" height="1136" rx="22" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" />

      <!-- Top Lanyard Slot / Hole -->
      <rect x="350" y="50" width="100" height="18" rx="9" fill="#C8C8D4" stroke="#9E9EB0" stroke-width="1.5" />

      <!-- Top Header / Organization -->
      <text x="400" y="125" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="900" fill="#3A3A4A" letter-spacing="6" text-anchor="middle">ENGINEERING DUO • VIP ALL ACCESS</text>
      <text x="400" y="152" font-family="monospace" font-size="12" font-weight="700" fill="#717184" letter-spacing="4" text-anchor="middle">SECURITY LEVEL: ALPHA-01 // PRODUCTION</text>

      <line x1="60" y1="180" x2="740" y2="180" stroke="#CBCBD8" stroke-width="1.5" />

      <!-- Photo Frame with Chrome Bevel -->
      <rect x="190" y="210" width="420" height="500" rx="24" fill="#F0F0F5" stroke="url(#chrome)" stroke-width="3" />
      <rect x="195" y="215" width="410" height="490" rx="20" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="1" />

      <!-- Identity Details Below Photo -->
      <text x="400" y="765" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="900" fill="#12121A" letter-spacing="-0.5" text-anchor="middle">AYUSH MAPARI</text>
      <text x="400" y="800" font-family="monospace" font-size="15" font-weight="800" fill="#E65100" letter-spacing="3" text-anchor="middle">WEBSITE &amp; PRODUCT ARCHITECT</text>
      <text x="400" y="828" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#6B6B7C" text-anchor="middle">NEXT.JS 15 • 60FPS KINETIC MOTION • 3D SHADERS</text>

      <line x1="80" y1="855" x2="720" y2="855" stroke="#CBCBD8" stroke-width="1.5" />

      <!-- Security Chip & Specs -->
      <!-- Silver Holographic Chip -->
      <g transform="translate(90, 880)">
        <rect width="90" height="65" rx="10" fill="#E4E4EE" stroke="#A8A8BA" stroke-width="1.5" />
        <rect x="8" y="8" width="74" height="49" rx="6" fill="#D4D4E2" stroke="#8A8A9E" stroke-width="1" />
        <line x1="8" y1="32" x2="82" y2="32" stroke="#8A8A9E" stroke-width="1" />
        <line x1="45" y1="8" x2="45" y2="57" stroke="#8A8A9E" stroke-width="1" />
      </g>

      <text x="210" y="908" font-family="monospace" font-size="13" font-weight="800" fill="#20202E">ISSUED: 2024 / PASS #AM-8841</text>
      <text x="210" y="930" font-family="monospace" font-size="12" fill="#5A5A6E">CORE: REACT 19 • TAILWIND • LENIS • TYPESCRIPT</text>

      <!-- Bottom Barcode Strip -->
      <g transform="translate(60, 970)">
        <rect width="680" height="175" rx="16" fill="#FFFFFF" stroke="#D8D8E2" stroke-width="1.5" />
        <g transform="translate(25, 25)">
          ${generateBarcode(630, 80)}
        </g>
        <text x="340" y="138" font-family="monospace" font-size="14" font-weight="800" fill="#E65100" letter-spacing="4" text-anchor="middle">AYUSH MAPARI • CERTIFIED SYSTEM PASS</text>
        <text x="340" y="158" font-family="monospace" font-size="11" fill="#78788C" letter-spacing="2" text-anchor="middle">VERIFIED // BEYOND THE VISUALS LAB</text>
      </g>
    </svg>
  `;

  await sharp(Buffer.from(ayushFrontSvg))
    .composite([{ input: roundedAyush, left: 200, top: 220 }])
    .png()
    .toFile(path.join(cardsDir, "ayush-front.png"));
  console.log("Saved cards/ayush-front.png");

  // 2. AYUSH MAPARI - BACK CARD (SILVER)
  const ayushBackSvg = `
    <svg width="800" height="1200" viewBox="0 0 800 1200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="silverBack" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#F8F8FA" />
          <stop offset="50%" stop-color="#E8E8EE" />
          <stop offset="100%" stop-color="#DADAE5" />
        </linearGradient>
      </defs>

      <rect width="800" height="1200" rx="36" fill="url(#silverBack)" />
      <rect x="22" y="22" width="756" height="1156" rx="28" fill="none" stroke="#CBCBD8" stroke-width="2" />

      <!-- Top Slot -->
      <rect x="350" y="50" width="100" height="18" rx="9" fill="#C8C8D4" stroke="#9E9EB0" stroke-width="1.5" />

      <text x="400" y="170" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="900" fill="#12121A" letter-spacing="-0.5" text-anchor="middle">AYUSH MAPARI</text>
      <text x="400" y="205" font-family="monospace" font-size="14" font-weight="800" fill="#E65100" letter-spacing="4" text-anchor="middle">LEAD FRONTEND ARCHITECTURE</text>

      <line x1="80" y1="240" x2="720" y2="240" stroke="#CBCBD8" stroke-width="1.5" />

      <!-- Key Focus Areas -->
      <g transform="translate(80, 280)">
        <rect width="640" height="115" rx="18" fill="#FFFFFF" stroke="#D8D8E4" stroke-width="1.5" />
        <text x="35" y="46" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="#12121A">High-Converting Digital Flagships</text>
        <text x="35" y="78" font-family="system-ui, sans-serif" font-size="13.5" fill="#58586A">Next.js 15 App Router, edge caching, responsive micro-animations &amp; 99 Core Web Vitals.</text>
      </g>

      <g transform="translate(80, 420)">
        <rect width="640" height="115" rx="18" fill="#FFFFFF" stroke="#D8D8E4" stroke-width="1.5" />
        <text x="35" y="46" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="#12121A">3D WebGL &amp; Canvas Physics</text>
        <text x="35" y="78" font-family="system-ui, sans-serif" font-size="13.5" fill="#58586A">Tactile physics engines, Matter.js gravity matrices, interactive lanyards &amp; shaders.</text>
      </g>

      <g transform="translate(80, 560)">
        <rect width="640" height="115" rx="18" fill="#FFFFFF" stroke="#D8D8E4" stroke-width="1.5" />
        <text x="35" y="46" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="#12121A">Design Systems &amp; Identity</text>
        <text x="35" y="78" font-family="system-ui, sans-serif" font-size="13.5" fill="#58586A">Tactile typography, bespoke motion curves, and luxury editorial layouts.</text>
      </g>

      <!-- Contact direct -->
      <g transform="translate(80, 720)">
        <rect width="640" height="230" rx="20" fill="#FFFFFF" stroke="#D8D8E4" stroke-width="1.5" />
        <text x="320" y="55" font-family="monospace" font-size="14" fill="#717184" letter-spacing="4" text-anchor="middle">DIRECT LINE &amp; WHATSAPP</text>
        <text x="320" y="110" font-family="system-ui, sans-serif" font-size="34" font-weight="900" fill="#12121A" text-anchor="middle">+91 8605081006</text>
        <text x="320" y="152" font-family="monospace" font-size="15" font-weight="700" fill="#E65100" text-anchor="middle">AYUSH@BEYONDTHEVISUALS.COM</text>
        <text x="320" y="190" font-family="system-ui, sans-serif" font-size="13" fill="#606072" text-anchor="middle">AVAILABLE FOR Q2/Q3 ENTERPRISE SPRINTS</text>
      </g>

      <!-- Signature -->
      <text x="400" y="1060" font-family="system-ui, sans-serif" font-size="18" font-weight="800" fill="#3A3A4A" letter-spacing="3" text-anchor="middle">AYUSH MAPARI • PASS NO. 01</text>
      <text x="400" y="1090" font-family="monospace" font-size="12" fill="#7A7A8E" letter-spacing="3" text-anchor="middle">BEYOND THE VISUALS STUDIO</text>
    </svg>
  `;

  await sharp(Buffer.from(ayushBackSvg)).png().toFile(path.join(cardsDir, "ayush-back.png"));
  console.log("Saved cards/ayush-back.png");

  // 3. KISHORI CHARPE - FRONT CARD (SILVER LUXURY)
  const kishoriFrontSvg = `
    <svg width="800" height="1200" viewBox="0 0 800 1200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="silverBg2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="25%" stop-color="#E8EEF4" />
          <stop offset="50%" stop-color="#DCDCE5" />
          <stop offset="75%" stop-color="#F2F2F6" />
          <stop offset="100%" stop-color="#E0E0E8" />
        </linearGradient>

        <linearGradient id="chrome2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#D0D0DC" />
          <stop offset="50%" stop-color="#FFFFFF" />
          <stop offset="100%" stop-color="#B8B8C6" />
        </linearGradient>

        <linearGradient id="hologram2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="rgba(2,132,199,0.18)" />
          <stop offset="35%" stop-color="rgba(16,185,129,0.18)" />
          <stop offset="70%" stop-color="rgba(168,85,247,0.18)" />
          <stop offset="100%" stop-color="rgba(255,138,0,0.15)" />
        </linearGradient>
      </defs>

      <!-- Base -->
      <rect width="800" height="1200" rx="36" fill="url(#silverBg2)" />
      <rect width="800" height="1200" rx="36" fill="url(#hologram2)" />

      <!-- Metallic Chrome Inset Borders -->
      <rect x="22" y="22" width="756" height="1156" rx="28" fill="none" stroke="url(#chrome2)" stroke-width="2.5" />
      <rect x="32" y="32" width="736" height="1136" rx="22" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" />

      <!-- Top Slot -->
      <rect x="350" y="50" width="100" height="18" rx="9" fill="#C8C8D4" stroke="#9E9EB0" stroke-width="1.5" />

      <!-- Top Header -->
      <text x="400" y="125" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="900" fill="#3A3A4A" letter-spacing="6" text-anchor="middle">ENGINEERING DUO • VIP ALL ACCESS</text>
      <text x="400" y="152" font-family="monospace" font-size="12" font-weight="700" fill="#717184" letter-spacing="4" text-anchor="middle">SECURITY LEVEL: ALPHA-02 // SYSTEMS</text>

      <line x1="60" y1="180" x2="740" y2="180" stroke="#CBCBD8" stroke-width="1.5" />

      <!-- Photo Frame with Chrome Bevel -->
      <rect x="190" y="210" width="420" height="500" rx="24" fill="#F0F0F5" stroke="url(#chrome2)" stroke-width="3" />
      <rect x="195" y="215" width="410" height="490" rx="20" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="1" />

      <!-- Identity Details -->
      <text x="400" y="765" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="900" fill="#12121A" letter-spacing="-0.5" text-anchor="middle">KISHORI CHARPE</text>
      <text x="400" y="800" font-family="monospace" font-size="15" font-weight="800" fill="#0284C7" letter-spacing="3" text-anchor="middle">AI &amp; AUTOMATION SYSTEMS LEAD</text>
      <text x="400" y="828" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#6B6B7C" text-anchor="middle">N8N WORKFLOWS • WHATSAPP CLOUD API • LLM AGENTS</text>

      <line x1="80" y1="855" x2="720" y2="855" stroke="#CBCBD8" stroke-width="1.5" />

      <!-- Security Chip & Specs -->
      <g transform="translate(90, 880)">
        <rect width="90" height="65" rx="10" fill="#E4E4EE" stroke="#A8A8BA" stroke-width="1.5" />
        <rect x="8" y="8" width="74" height="49" rx="6" fill="#D4D4E2" stroke="#8A8A9E" stroke-width="1" />
        <line x1="8" y1="32" x2="82" y2="32" stroke="#8A8A9E" stroke-width="1" />
        <line x1="45" y1="8" x2="45" y2="57" stroke="#8A8A9E" stroke-width="1" />
      </g>

      <text x="210" y="908" font-family="monospace" font-size="13" font-weight="800" fill="#20202E">ISSUED: 2024 / PASS #KC-8842</text>
      <text x="210" y="930" font-family="monospace" font-size="12" fill="#5A5A6E">CORE: META CLOUD API • POSTGRES • WEBHOOK HUBS</text>

      <!-- Bottom Barcode Strip -->
      <g transform="translate(60, 970)">
        <rect width="680" height="175" rx="16" fill="#FFFFFF" stroke="#D8D8E2" stroke-width="1.5" />
        <g transform="translate(25, 25)">
          ${generateBarcode(630, 80)}
        </g>
        <text x="340" y="138" font-family="monospace" font-size="14" font-weight="800" fill="#0284C7" letter-spacing="4" text-anchor="middle">KISHORI CHARPE • CERTIFIED SYSTEM PASS</text>
        <text x="340" y="158" font-family="monospace" font-size="11" fill="#78788C" letter-spacing="2" text-anchor="middle">VERIFIED // BEYOND THE VISUALS LAB</text>
      </g>
    </svg>
  `;

  await sharp(Buffer.from(kishoriFrontSvg))
    .composite([{ input: roundedKishori, left: 200, top: 220 }])
    .png()
    .toFile(path.join(cardsDir, "kishori-front.png"));
  console.log("Saved cards/kishori-front.png");

  // 4. KISHORI CHARPE - BACK CARD (SILVER)
  const kishoriBackSvg = `
    <svg width="800" height="1200" viewBox="0 0 800 1200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="silverBack2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#F8F8FA" />
          <stop offset="50%" stop-color="#E8E8EE" />
          <stop offset="100%" stop-color="#DADAE5" />
        </linearGradient>
      </defs>

      <rect width="800" height="1200" rx="36" fill="url(#silverBack2)" />
      <rect x="22" y="22" width="756" height="1156" rx="28" fill="none" stroke="#CBCBD8" stroke-width="2" />

      <!-- Top Slot -->
      <rect x="350" y="50" width="100" height="18" rx="9" fill="#C8C8D4" stroke="#9E9EB0" stroke-width="1.5" />

      <text x="400" y="170" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="900" fill="#12121A" letter-spacing="-0.5" text-anchor="middle">KISHORI CHARPE</text>
      <text x="400" y="205" font-family="monospace" font-size="14" font-weight="800" fill="#0284C7" letter-spacing="4" text-anchor="middle">AI &amp; AUTOMATION PIPELINES</text>

      <line x1="80" y1="240" x2="720" y2="240" stroke="#CBCBD8" stroke-width="1.5" />

      <!-- Key Focus Areas -->
      <g transform="translate(80, 280)">
        <rect width="640" height="115" rx="18" fill="#FFFFFF" stroke="#D8D8E4" stroke-width="1.5" />
        <text x="35" y="46" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="#12121A">WhatsApp Cloud Business API</text>
        <text x="35" y="78" font-family="system-ui, sans-serif" font-size="13.5" fill="#58586A">Conversational fee checkouts, Razorpay/Stripe links, automated brochure delivery.</text>
      </g>

      <g transform="translate(80, 420)">
        <rect width="640" height="115" rx="18" fill="#FFFFFF" stroke="#D8D8E4" stroke-width="1.5" />
        <text x="35" y="46" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="#12121A">n8n Orchestration Architecture</text>
        <text x="35" y="78" font-family="system-ui, sans-serif" font-size="13.5" fill="#58586A">Self-healing pipelines, multi-app database synchronization, zero manual data entry.</text>
      </g>

      <g transform="translate(80, 560)">
        <rect width="640" height="115" rx="18" fill="#FFFFFF" stroke="#D8D8E4" stroke-width="1.5" />
        <text x="35" y="46" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="#12121A">Autonomous LLM Reasoning Agents</text>
        <text x="35" y="78" font-family="system-ui, sans-serif" font-size="13.5" fill="#58586A">OpenAI &amp; Claude 3.5 pipelines for CRM triage, lead qualification, and customer support.</text>
      </g>

      <!-- Contact direct -->
      <g transform="translate(80, 720)">
        <rect width="640" height="230" rx="20" fill="#FFFFFF" stroke="#D8D8E4" stroke-width="1.5" />
        <text x="320" y="55" font-family="monospace" font-size="14" fill="#717184" letter-spacing="4" text-anchor="middle">DIRECT LINE &amp; WHATSAPP</text>
        <text x="320" y="110" font-family="system-ui, sans-serif" font-size="34" font-weight="900" fill="#12121A" text-anchor="middle">+91 8605081006</text>
        <text x="320" y="152" font-family="monospace" font-size="15" font-weight="700" fill="#0284C7" text-anchor="middle">KISHORI@BEYONDTHEVISUALS.COM</text>
        <text x="320" y="190" font-family="system-ui, sans-serif" font-size="13" fill="#606072" text-anchor="middle">OPERATING 24/7 AUTOMATED ARCHITECTURES</text>
      </g>

      <!-- Signature -->
      <text x="400" y="1060" font-family="system-ui, sans-serif" font-size="18" font-weight="800" fill="#3A3A4A" letter-spacing="3" text-anchor="middle">KISHORI CHARPE • PASS NO. 02</text>
      <text x="400" y="1090" font-family="monospace" font-size="12" fill="#7A7A8E" letter-spacing="3" text-anchor="middle">BEYOND THE VISUALS STUDIO</text>
    </svg>
  `;

  await sharp(Buffer.from(kishoriBackSvg)).png().toFile(path.join(cardsDir, "kishori-back.png"));
  console.log("Saved cards/kishori-back.png");

  // 5. SILVER LANYARD STRAP BAND (clean platinum/silver weave with stitch lines)
  const silverBandSvg = `
    <svg width="256" height="1024" viewBox="0 0 256 1024" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="silverStrapBg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#DCDCE6" />
          <stop offset="50%" stop-color="#F2F2F8" />
          <stop offset="100%" stop-color="#D4D4E0" />
        </linearGradient>
        <pattern id="silverWeave" width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="12" height="12" fill="#E4E4EE" />
          <line x1="0" y1="0" x2="12" y2="12" stroke="#D0D0DC" stroke-width="1.2" />
          <line x1="12" y1="0" x2="0" y2="12" stroke="#F5F5FA" stroke-width="1.2" />
        </pattern>
      </defs>

      <rect width="256" height="1024" fill="url(#silverStrapBg)" />
      <rect width="256" height="1024" fill="url(#silverWeave)" opacity="0.65" />

      <!-- Silver & Orange/Sky Stitches -->
      <line x1="16" y1="0" x2="16" y2="1024" stroke="#9A9AA8" stroke-width="2.5" stroke-dasharray="6 5" />
      <line x1="240" y1="0" x2="240" y2="1024" stroke="#9A9AA8" stroke-width="2.5" stroke-dasharray="6 5" />

      <!-- Typography -->
      <g transform="rotate(-90 128 512)">
        <text x="-400" y="136" font-family="system-ui, sans-serif" font-weight="900" font-size="28" fill="#1C1C28" letter-spacing="7">AYUSH MAPARI × KISHORI CHARPE</text>
        <text x="-30" y="136" font-family="monospace" font-weight="800" font-size="22" fill="#E65100" letter-spacing="5">★ VIP ACCESS ★</text>
        <text x="350" y="136" font-family="system-ui, sans-serif" font-weight="900" font-size="28" fill="#1C1C28" letter-spacing="7">BEYOND THE VISUALS</text>
        <text x="730" y="136" font-family="monospace" font-weight="800" font-size="22" fill="#0284C7" letter-spacing="5">★ VIP ACCESS ★</text>
      </g>
    </svg>
  `;

  await sharp(Buffer.from(silverBandSvg)).png().toFile(path.join(cardsDir, "strap-silver.png"));
  console.log("Saved cards/strap-silver.png");

  console.log("All silver VIP textures generated successfully!");
}

generateSilverCards();
