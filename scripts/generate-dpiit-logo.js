const fs = require('fs');

const emblemRaw = fs.readFileSync('public/images/emblem-india.svg', 'utf8');

// Extract the path elements from emblem-india.svg
const pathRegex = /<path\b[^>]*d="([^"]*)"[^>]*>/g;
let match;
const paths = [];
while ((match = pathRegex.exec(emblemRaw)) !== null) {
    paths.push(match[1]);
}

console.log('Found paths:', paths.length);

// The original emblem has viewBox "0 0 145.52 231.92"
// We want to scale it to fit within a height of 72 in a 440x90 canvas, or 380x80 canvas.
// Scale factor: 72 / 231.92 = 0.31045
// Width when scaled: 145.52 * 0.31045 = 45.18

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 90" width="420" height="90">
  <defs>
    <style>
      .emblem-path { fill: #111827; }
      .text-hindi { font-family: 'Noto Sans Devanagari', 'Mangal', 'Nirmala UI', sans-serif; font-size: 13px; font-weight: 700; fill: #0f172a; }
      .text-dept { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif; font-size: 10px; font-weight: 800; fill: #0f172a; letter-spacing: 0.03em; }
      .text-sub-hi { font-family: 'Noto Sans Devanagari', 'Mangal', 'Nirmala UI', sans-serif; font-size: 9.5px; font-weight: 500; fill: #475569; }
      .text-sub-en { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif; font-size: 8px; font-weight: 700; fill: #1e3a8a; letter-spacing: 0.05em; }
      .dpiit-badge { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif; font-size: 11px; font-weight: 900; fill: #ffffff; letter-spacing: 0.08em; }
    </style>
    <linearGradient id="dpiitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#034ea1" />
    </linearGradient>
  </defs>

  <!-- Left: State Emblem of India -->
  <g transform="translate(12, 8) scale(0.318)" class="emblem-path">
    ${paths.map(d => `<path d="${d}" />`).join('\n    ')}
  </g>

  <!-- Divider Line -->
  <line x1="68" y1="12" x2="68" y2="78" stroke="#cbd5e1" stroke-width="1.2" stroke-linecap="round" />

  <!-- Right: Official Typography -->
  <!-- Line 1: Hindi Department Name -->
  <text x="80" y="25" class="text-hindi">उद्योग संवर्धन और आंतरिक व्यापार विभाग</text>

  <!-- Line 2: English Department Name -->
  <text x="80" y="41" class="text-dept">DEPARTMENT FOR PROMOTION OF INDUSTRY AND INTERNAL TRADE</text>

  <!-- Line 3: Hindi Ministry & Government -->
  <text x="80" y="55" class="text-sub-hi">वाणिज्य और उद्योग मंत्रालय, भारत सरकार</text>

  <!-- Line 4: English Ministry & Government + DPIIT Badge -->
  <text x="80" y="70" class="text-sub-en">MINISTRY OF COMMERCE &amp; INDUSTRY • GOVERNMENT OF INDIA</text>

  <!-- Subtle Indian Tricolor bar below header text -->
  <rect x="80" y="77" width="50" height="3" fill="#ff9933" rx="1.5" />
  <rect x="133" y="77" width="50" height="3" fill="#0f172a" rx="1.5" />
  <rect x="186" y="77" width="50" height="3" fill="#138808" rx="1.5" />

  <!-- Bold DPIIT Tag pill on the right -->
  <rect x="340" y="24" width="68" height="26" rx="5" fill="url(#dpiitGrad)" />
  <text x="374" y="41" class="dpiit-badge" text-anchor="middle">DPIIT</text>
  <text x="374" y="60" font-family="'Segoe UI', sans-serif" font-size="7.5" font-weight="700" fill="#64748b" text-anchor="middle">RECOGNIZED</text>
</svg>`;

fs.writeFileSync('public/images/dpiit-logo.svg', svgContent, 'utf8');
console.log('Successfully written public/images/dpiit-logo.svg');
