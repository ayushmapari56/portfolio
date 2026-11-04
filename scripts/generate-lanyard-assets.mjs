import fs from "fs";
import path from "path";
import sharp from "sharp";

const publicDir = path.resolve("./public");

async function generateAssets() {
  console.log("Generating lanyard card textures...");

  // Load photos of Ayush and Kishori
  const ayushBuf = await sharp(path.join(publicDir, "team/person1.jpg"))
    .resize(340, 420, { fit: "cover", position: "top" })
    .toBuffer();

  const kishoriBuf = await sharp(path.join(publicDir, "team/person2.jpg"))
    .resize(340, 420, { fit: "cover", position: "top" })
    .toBuffer();

  // Create rounded photo overlays
  const roundedCorners = Buffer.from(
    '<svg><rect x="0" y="0" width="340" height="420" rx="20" ry="20"/></svg>'
  );

  const roundedAyush = await sharp(ayushBuf)
    .composite([{ input: roundedCorners, blend: "dest-in" }])
    .png()
    .toBuffer();

  const roundedKishori = await sharp(kishoriBuf)
    .composite([{ input: roundedCorners, blend: "dest-in" }])
    .png()
    .toBuffer();

  // 1. FRONT CARD (width: 900, height: 1300)
  const frontSvg = `
    <svg width="900" height="1300" viewBox="0 0 900 1300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0E0E18" />
          <stop offset="50%" stop-color="#141424" />
          <stop offset="100%" stop-color="#08080E" />
        </linearGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#FF8A00" />
          <stop offset="50%" stop-color="#FFAE42" />
          <stop offset="100%" stop-color="#FF5A1F" />
        </linearGradient>
        <linearGradient id="holo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="rgba(255,138,0,0.15)" />
          <stop offset="50%" stop-color="rgba(56,189,248,0.15)" />
          <stop offset="100%" stop-color="rgba(168,85,247,0.15)" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="900" height="1300" rx="40" fill="url(#bgGrad)" />
      <rect width="900" height="1300" rx="40" fill="url(#holo)" />

      <!-- Outer Rim Border -->
      <rect x="25" y="25" width="850" height="1250" rx="30" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2" />
      <rect x="35" y="35" width="830" height="1230" rx="25" fill="none" stroke="rgba(255,138,0,0.3)" stroke-width="1" />

      <!-- Top Lanyard Slot Guide / Hole representation -->
      <rect x="400" y="55" width="100" height="20" rx="10" fill="#050508" stroke="rgba(255,255,255,0.2)" stroke-width="2" />

      <!-- Header -->
      <text x="450" y="140" font-family="system-ui, sans-serif" font-size="22" font-weight="900" fill="#FF8A00" letter-spacing="8" text-anchor="middle">CREATIVE ENGINEERING DUO</text>
      <text x="450" y="175" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#8E8EA8" letter-spacing="4" text-anchor="middle">OFFICIAL VIP ALL-ACCESS PASS • 2024</text>

      <!-- Subtle separator -->
      <line x1="80" y1="210" x2="820" y2="210" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" />

      <!-- Duo Title -->
      <text x="450" y="270" font-family="system-ui, sans-serif" font-size="44" font-weight="900" fill="#FFFFFF" letter-spacing="-1" text-anchor="middle">AYUSH &amp; KISHORI</text>
      <text x="450" y="310" font-family="monospace" font-size="16" fill="#00E5FF" letter-spacing="3" text-anchor="middle">WEBSITES × AI AUTOMATION</text>

      <!-- Photos Background Cards -->
      <!-- Ayush Frame -->
      <rect x="75" y="360" width="360" height="490" rx="24" fill="#171728" stroke="rgba(255,138,0,0.4)" stroke-width="2" />
      <text x="255" y="810" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="#FFFFFF" text-anchor="middle">AYUSH MAPARI</text>
      <text x="255" y="835" font-family="monospace" font-size="13" font-weight="600" fill="#FF8A00" text-anchor="middle">WEB &amp; SYSTEM ARCHITECT</text>

      <!-- Kishori Frame -->
      <rect x="465" y="360" width="360" height="490" rx="24" fill="#171728" stroke="rgba(56,189,248,0.4)" stroke-width="2" />
      <text x="645" y="810" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="#FFFFFF" text-anchor="middle">KISHORI CHARPE</text>
      <text x="645" y="835" font-family="monospace" font-size="13" font-weight="600" fill="#38BDF8" text-anchor="middle">AI &amp; AUTOMATION LEAD</text>

      <!-- Chip / Security Hologram -->
      <rect x="80" y="885" width="90" height="65" rx="12" fill="url(#gold)" />
      <rect x="86" y="891" width="78" height="53" rx="8" fill="none" stroke="#603000" stroke-width="1.5" />
      <line x1="86" y1="917" x2="164" y2="917" stroke="#603000" stroke-width="1.5" />
      <line x1="125" y1="891" x2="125" y2="944" stroke="#603000" stroke-width="1.5" />

      <!-- Credentials Text -->
      <text x="200" y="915" font-family="monospace" font-size="14" fill="#FFFFFF" font-weight="700">SPEC: NEXT.JS • N8N • WHATSAPP CLOUD API</text>
      <text x="200" y="940" font-family="monospace" font-size="13" fill="#8E8EA8">AUTH ID: DUO-2024-99841-PRODUCTION</text>

      <!-- Bottom Barcode Area -->
      <rect x="75" y="980" width="750" height="230" rx="20" fill="#080810" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />

      <!-- Faux Barcode lines -->
      <g fill="#FFFFFF" transform="translate(110, 1010)">
        <rect x="0" y="0" width="4" height="100" />
        <rect x="8" y="0" width="10" height="100" />
        <rect x="24" y="0" width="4" height="100" />
        <rect x="34" y="0" width="16" height="100" />
        <rect x="56" y="0" width="6" height="100" />
        <rect x="68" y="0" width="12" height="100" />
        <rect x="86" y="0" width="4" height="100" />
        <rect x="96" y="0" width="20" height="100" />
        <rect x="124" y="0" width="6" height="100" />
        <rect x="136" y="0" width="14" height="100" />
        <rect x="156" y="0" width="4" height="100" />
        <rect x="168" y="0" width="8" height="100" />
        <rect x="182" y="0" width="16" height="100" />
        <rect x="204" y="0" width="4" height="100" />
        <rect x="214" y="0" width="12" height="100" />
        <rect x="232" y="0" width="18" height="100" />
        <rect x="256" y="0" width="6" height="100" />
        <rect x="268" y="0" width="10" height="100" />
        <rect x="284" y="0" width="4" height="100" />
        <rect x="294" y="0" width="22" height="100" />
        <rect x="322" y="0" width="8" height="100" />
        <rect x="336" y="0" width="14" height="100" />
        <rect x="356" y="0" width="6" height="100" />
        <rect x="368" y="0" width="18" height="100" />
        <rect x="392" y="0" width="4" height="100" />
        <rect x="402" y="0" width="12" height="100" />
        <rect x="420" y="0" width="8" height="100" />
        <rect x="434" y="0" width="20" height="100" />
        <rect x="460" y="0" width="6" height="100" />
        <rect x="472" y="0" width="14" height="100" />
        <rect x="492" y="0" width="4" height="100" />
        <rect x="502" y="0" width="16" height="100" />
        <rect x="524" y="0" width="8" height="100" />
        <rect x="538" y="0" width="12" height="100" />
        <rect x="556" y="0" width="24" height="100" />
        <rect x="586" y="0" width="6" height="100" />
        <rect x="598" y="0" width="14" height="100" />
        <rect x="618" y="0" width="4" height="100" />
        <rect x="628" y="0" width="18" height="100" />
        <rect x="652" y="0" width="8" height="100" />
        <rect x="666" y="0" width="14" height="100" />
      </g>

      <text x="450" y="1150" font-family="monospace" font-size="18" fill="#FF8A00" font-weight="700" letter-spacing="6" text-anchor="middle">AUTHENTICATED • HIGH IMPACT DELIVERIES</text>
      <text x="450" y="1185" font-family="monospace" font-size="12" fill="#6A6A80" letter-spacing="4" text-anchor="middle">SCAN FOR VERIFICATION // BEYOND THE VISUALS</text>
    </svg>
  `;

  // Composite the front card with both photos in place
  await sharp(Buffer.from(frontSvg))
    .composite([
      { input: roundedAyush, left: 85, top: 375 },
      { input: roundedKishori, left: 475, top: 375 },
    ])
    .png()
    .toFile(path.join(publicDir, "card-front.png"));

  console.log("Saved public/card-front.png");

  // 2. BACK CARD (width: 900, height: 1300)
  const backSvg = `
    <svg width="900" height="1300" viewBox="0 0 900 1300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="backBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0E0E18" />
          <stop offset="100%" stop-color="#08080E" />
        </linearGradient>
      </defs>

      <rect width="900" height="1300" rx="40" fill="url(#backBg)" />
      <rect x="25" y="25" width="850" height="1250" rx="30" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2" />
      <rect x="35" y="35" width="830" height="1230" rx="25" fill="none" stroke="rgba(255,138,0,0.25)" stroke-width="1" />

      <!-- Top Hole -->
      <rect x="400" y="55" width="100" height="20" rx="10" fill="#050508" stroke="rgba(255,255,255,0.2)" stroke-width="2" />

      <!-- Big Branding -->
      <text x="450" y="220" font-family="system-ui, sans-serif" font-size="46" font-weight="900" fill="#FFFFFF" letter-spacing="-1" text-anchor="middle">BEYOND THE VISUALS</text>
      <text x="450" y="260" font-family="monospace" font-size="16" fill="#FF8A00" letter-spacing="4" text-anchor="middle">FULL-STACK &amp; AUTOMATION ARCHITECTURE</text>

      <line x1="120" y1="310" x2="780" y2="310" stroke="rgba(255,255,255,0.15)" stroke-width="1" />

      <!-- Core Pillars -->
      <g transform="translate(100, 360)">
        <rect x="0" y="0" width="700" height="110" rx="18" fill="#141424" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />
        <text x="40" y="48" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#FF8A00">01 / NEXT.JS DIGITAL FLAGSHIPS</text>
        <text x="40" y="82" font-family="system-ui, sans-serif" font-size="14" fill="#A0A0BA">60fps kinetic motion, sub-second LCP, high-conversion landing systems.</text>
      </g>

      <g transform="translate(100, 500)">
        <rect x="0" y="0" width="700" height="110" rx="18" fill="#141424" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />
        <text x="40" y="48" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#38BDF8">02 / AUTONOMOUS N8N WORKFLOWS</text>
        <text x="40" y="82" font-family="system-ui, sans-serif" font-size="14" fill="#A0A0BA">Self-healing pipelines, CRM syncs, automated invoicing, AI lead triage.</text>
      </g>

      <g transform="translate(100, 640)">
        <rect x="0" y="0" width="700" height="110" rx="18" fill="#141424" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />
        <text x="40" y="48" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#10B981">03 / WHATSAPP CLOUD API BOTS</text>
        <text x="40" y="82" font-family="system-ui, sans-serif" font-size="14" fill="#A0A0BA">Direct payment checkouts, dynamic vector search, 24/7 lead closure.</text>
      </g>

      <!-- Contact direct -->
      <g transform="translate(100, 780)">
        <rect x="0" y="0" width="700" height="240" rx="20" fill="#0B0B14" stroke="rgba(255,138,0,0.3)" stroke-width="1.5" />
        <text x="350" y="55" font-family="monospace" font-size="15" fill="#8E8EA8" letter-spacing="4" text-anchor="middle">DIRECT DUO HOTLINE</text>
        <text x="350" y="110" font-family="system-ui, sans-serif" font-size="34" font-weight="900" fill="#FFFFFF" text-anchor="middle">+91 8605081006</text>
        <text x="350" y="155" font-family="monospace" font-size="16" fill="#FF8A00" text-anchor="middle">HELLO@AYUSHANDKISHORI.COM</text>
        <text x="350" y="200" font-family="system-ui, sans-serif" font-size="13" fill="#6A6A80" text-anchor="middle">PUNE / MUMBAI • WORKING GLOBALLY</text>
      </g>

      <!-- Bottom Signature -->
      <text x="450" y="1120" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="#FFFFFF" letter-spacing="3" text-anchor="middle">AYUSH MAPARI × KISHORI CHARPE</text>
      <text x="450" y="1155" font-family="monospace" font-size="13" fill="#666680" letter-spacing="4" text-anchor="middle">ENGINEERED FOR HIGH-VELOCITY PRODUCTION</text>
    </svg>
  `;

  await sharp(Buffer.from(backSvg)).png().toFile(path.join(publicDir, "card-back.png"));
  console.log("Saved public/card-back.png");

  // 3. LANYARD STRAP BAND (width: 256, height: 1024, seamless repeating texture)
  const bandSvg = `
    <svg width="256" height="1024" viewBox="0 0 256 1024" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="weave" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#14141E" />
          <line x1="0" y1="0" x2="16" y2="16" stroke="#1E1E2C" stroke-width="1.5" />
          <line x1="16" y1="0" x2="0" y2="16" stroke="#0D0D14" stroke-width="1.5" />
        </pattern>
      </defs>

      <!-- Background Weave -->
      <rect width="256" height="1024" fill="url(#weave)" />

      <!-- Stitch Lines along edges -->
      <line x1="18" y1="0" x2="18" y2="1024" stroke="#FF8A00" stroke-width="3" stroke-dasharray="8 6" opacity="0.8" />
      <line x1="238" y1="0" x2="238" y2="1024" stroke="#FF8A00" stroke-width="3" stroke-dasharray="8 6" opacity="0.8" />

      <!-- Center Typography repeating vertically -->
      <g transform="rotate(-90 128 512)">
        <text x="-400" y="136" font-family="system-ui, sans-serif" font-weight="900" font-size="32" fill="#FFFFFF" letter-spacing="8">AYUSH &amp; KISHORI</text>
        <text x="-50" y="136" font-family="monospace" font-weight="800" font-size="24" fill="#FF8A00" letter-spacing="6">★ BEYOND THE VISUALS ★</text>
        <text x="380" y="136" font-family="system-ui, sans-serif" font-weight="900" font-size="32" fill="#FFFFFF" letter-spacing="8">AYUSH &amp; KISHORI</text>
        <text x="730" y="136" font-family="monospace" font-weight="800" font-size="24" fill="#FF8A00" letter-spacing="6">★ BEYOND THE VISUALS ★</text>
      </g>
    </svg>
  `;

  await sharp(Buffer.from(bandSvg)).png().toFile(path.join(publicDir, "band.png"));
  console.log("Saved public/band.png");

  console.log("All lanyard assets generated successfully!");
}

generateAssets();

