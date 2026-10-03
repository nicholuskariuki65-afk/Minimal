import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Brand SVG: Minimalist open book / typography M with calm editorial geometric balance
const standardSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="104" fill="#1C1917"/>
  <path d="M140 160h48v192h-48z" fill="#FBF9F5"/>
  <path d="M188 160l68 112 68-112h48v192h-48V236l-68 108-68-108v116h-48z" fill="#FBF9F5"/>
  <circle cx="256" cy="116" r="14" fill="#C2410C"/>
</svg>`;

// Maskable icon with 15% safe margin around edges
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#1C1917"/>
  <g transform="translate(64, 64) scale(0.75)">
    <path d="M140 160h48v192h-48z" fill="#FBF9F5"/>
    <path d="M188 160l68 112 68-112h48v192h-48V236l-68 108-68-108v116h-48z" fill="#FBF9F5"/>
    <circle cx="256" cy="116" r="14" fill="#C2410C"/>
  </g>
</svg>`;

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#1C1917"/>
  <path d="M18 20h6v24h-6z" fill="#FBF9F5"/>
  <path d="M24 20l8 14 8-14h6v24h-6V29.5L32 43l-8-13.5V44h-6z" fill="#FBF9F5"/>
  <circle cx="32" cy="14" r="2.5" fill="#C2410C"/>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'icon.svg'), standardSvg);
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg);

async function generate() {
  const stdBuf = Buffer.from(standardSvg);
  const maskBuf = Buffer.from(maskableSvg);

  await sharp(stdBuf).resize(192, 192).png().toFile(path.join(publicDir, 'pwa-192x192.png'));
  await sharp(stdBuf).resize(512, 512).png().toFile(path.join(publicDir, 'pwa-512x512.png'));
  await sharp(stdBuf).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  await sharp(stdBuf).resize(64, 64).png().toFile(path.join(publicDir, 'favicon.ico'));
  await sharp(maskBuf).resize(512, 512).png().toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));

  console.log('PWA icons generated successfully in public/');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
