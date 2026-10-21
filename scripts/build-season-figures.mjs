import { mkdirSync, writeFileSync } from 'node:fs';

// Original explanatory drawings; neither is a field or fabrication drawing.
const out = new URL('../public/guides/season-topics/', import.meta.url);
mkdirSync(out, { recursive: true });
const ink = '#242424';
const red = '#b42629';
const muted = '#777';
const text = (x, y, value, size = 20) => `<text x="${x}" y="${y}" font-size="${size}">${value}</text>`;
const line = (x1, y1, x2, y2, color = ink, marker = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="3"${marker ? ` marker-end="url(#${marker})"` : ''}/>`;

function save(name, title, description, height, body) {
  writeFileSync(new URL(`${name}.svg`, out), `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="${height}" viewBox="0 0 800 ${height}" role="img" aria-labelledby="title desc">
<title id="title">${title}</title><desc id="desc">${description}</desc>
<defs>${[['ink', ink], ['red', red], ['muted', muted]].map(([id, color]) => `<marker id="${id}" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7Z" fill="${color}"/></marker>`).join('')}</defs>
<rect width="800" height="${height}" rx="12" fill="#fff"/>
<g font-family="Arial, sans-serif" fill="${ink}">${body}</g>
<text x="24" y="${height - 17}" font-family="Arial, sans-serif" font-size="14" fill="#555">CrocoDocs · Original illustration · Not a field drawing</text>
</svg>\n`);
}

const theta = 50 * Math.PI / 180;
const d = 2.4;
const h = 0.7;
const speed = Math.sqrt(9.81 * d * d / (2 * Math.cos(theta) ** 2 * (d * Math.tan(theta) - h)));
const duration = d / (speed * Math.cos(theta));
const scale = 520 / d;
const path = Array.from({ length: 81 }, (_, i) => {
  const t = duration * i / 80;
  return `${130 + scale * speed * Math.cos(theta) * t},${292 - scale * (speed * Math.sin(theta) * t - 9.81 * t * t / 2)}`;
}).join(' ');

save('projectile-geometry', 'Projectile measurements', 'Side view of an illustrative stationary shot. Horizontal distance d and height difference h are measured from release to target. The launch direction makes angle theta above horizontal.', 430, `
${text(24, 34, 'Projectile measurements', 24)}
${text(24, 64, 'Stationary shot · side view', 17)}
${line(130, 292, 650, 292, '#bbb')}
<polyline points="${path}" fill="none" stroke="${red}" stroke-width="4"/>
${line(130, 292, 193, 217, ink, 'ink')}
<path d="M170 292A40 40 0 0 0 155.7 261.4" fill="none" stroke="${ink}" stroke-width="2"/>
${text(184, 284, 'θ', 22)}
<circle cx="130" cy="292" r="6" fill="${ink}"/>
<circle cx="650" cy="140.33" r="6" fill="${red}"/>
${text(35, 319, 'Release point', 18)}
${text(627, 111, 'Target', 18)}
${line(130, 342, 650, 342, muted)}
${line(130, 334, 130, 350, muted)}${line(650, 334, 650, 350, muted)}
${text(288, 369, 'd · horizontal distance', 18)}
${line(715, 140.33, 715, 292, muted)}
${line(707, 140.33, 723, 140.33, muted)}${line(707, 292, 723, 292, muted)}
${text(734, 224, 'h', 22)}
${line(130, 391, 160, 391, red)}${text(171, 397, 'Ball path', 16)}
${line(410, 391, 440, 391, ink, 'ink')}${text(452, 397, 'Launch direction', 16)}
`);

save('moving-shot-vectors', 'Horizontal velocity compensation', 'Top-down velocity triangle. Launcher-relative ball velocity q points forward and against sideways launcher motion u. Adding u produces field-relative ball velocity directly toward the target.', 420, `
${text(24, 34, 'Horizontal velocities', 24)}
${text(24, 64, 'Top view · the ball inherits launcher motion', 17)}
${line(60, 106, 92, 106, red)}${text(104, 112, 'Launcher-relative q', 18)}
${line(370, 106, 402, 106, ink)}${text(414, 112, 'Field velocity q + u', 18)}
${line(150, 180, 590, 180, ink, 'ink')}
${line(150, 180, 590, 300, red, 'red')}
${line(590, 300, 590, 190, muted, 'muted')}
<circle cx="150" cy="180" r="6" fill="${ink}"/>
${text(45, 175, 'Release', 18)}
${text(622, 176, 'To target', 18)}
${text(622, 242, 'Launcher', 18)}${text(622, 266, 'motion u', 18)}
${text(150, 351, 'Aim against sideways motion.', 19)}
${text(150, 378, 'Choose pitch and speed for the same flight time.', 19)}
`);

console.log('Generated 2 original shooting diagrams.');
