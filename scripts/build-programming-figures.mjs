import { mkdirSync, writeFileSync } from 'node:fs';

// Original teaching illustrations. Coordinates are illustrative, not field drawings.
const out = new URL('../public/guides/programming/', import.meta.url);
mkdirSync(out, { recursive: true });
const ink = '#242424';
const red = '#b42629';
const muted = '#666';
const text = (x, y, value, size = 20, color = ink) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${color}">${value}</text>`;
const arrow = (x1, y1, x2, y2, color = 'ink') =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color === 'red' ? red : ink}" stroke-width="3" marker-end="url(#${color})"/>`;

function save(name, title, description, height, body) {
  writeFileSync(new URL(`${name}.svg`, out), `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="${height}" viewBox="0 0 800 ${height}" font-family="Arial, sans-serif" role="img" aria-labelledby="title desc">
<title id="title">${title}</title><desc id="desc">${description}</desc>
<defs>${[['ink', ink], ['red', red]].map(([id, color]) => `<marker id="${id}" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7Z" fill="${color}"/></marker>`).join('')}</defs>
<rect width="800" height="${height}" rx="12" fill="#fff"/>
<g font-family="Arial, sans-serif">${body}</g>
${text(24, height - 17, 'CrocoDocs · Original illustration · Top view', 14, muted)}
</svg>\n`);
}

save('field-centric-frames', 'One request, two coordinate frames', 'A robot faces field positive Y, at a heading of 90 degrees. The requested field translation (1, 0) points to robot right and is expressed as (0, -1) in forward-left robot coordinates.', 430, `
${text(24, 34, 'One request, two coordinate frames', 24)}
${text(24, 65, 'Robot heading: +90° · the red arrow keeps the same physical direction', 18)}
${text(65, 109, 'Field coordinates', 21)}
<rect x="135" y="233" width="50" height="74" rx="8" fill="#eee" stroke="#aaa"/>
<path d="M153 248L160 237L167 248" fill="none" stroke="${muted}" stroke-width="2"/>
${arrow(160, 280, 160, 146)}${text(173, 155, '+Y', 20)}
${arrow(160, 280, 316, 280, 'red')}${text(284, 311, '+X', 20)}
${text(91, 350, '(x_f, y_f) = (1, 0)', 22)}
<line x1="400" y1="100" x2="400" y2="371" stroke="#ddd" stroke-width="2"/>
${text(468, 109, 'Robot coordinates', 21)}
<rect x="535" y="233" width="50" height="74" rx="8" fill="#eee" stroke="#aaa"/>
<path d="M553 248L560 237L567 248" fill="none" stroke="${muted}" stroke-width="2"/>
${arrow(560, 280, 560, 146)}${text(578, 155, '+X forward', 18)}
${arrow(560, 280, 432, 280)}${text(421, 253, '+Y left', 18)}
${arrow(560, 280, 716, 280, 'red')}${text(655, 311, 'Right', 18, red)}
${text(489, 350, '(x_r, y_r) = (0, −1)', 22)}
${text(180, 387, 'Same physical direction · rotate the coordinates by −90°', 17)}
`);

save('turret-pivot', 'Aim from the turret pivot', 'The robot reference is (24, 24) inches at a heading of 90 degrees. A robot-relative pivot offset of 6 inches forward and 2 inches left becomes a field pivot at (22, 30). A target at (46, 54) has a 45-degree field bearing, requiring minus 45 degrees relative to the robot nose.', 480, `
${text(24, 34, 'Aim from the turret pivot', 24)}
${text(24, 65, 'Distances in inches · heading is counterclockwise from field +X', 18)}
<rect x="232" y="276" width="96" height="128" rx="12" fill="#eee" stroke="#aaa" stroke-width="2"/>
${arrow(280, 340, 280, 242)}${text(297, 254, 'Robot forward', 17)}
<path d="M280 340L280 292L264 292" fill="none" stroke="${muted}" stroke-width="2" stroke-dasharray="5 4"/>
<circle cx="280" cy="340" r="5" fill="${ink}"/>
${text(294, 362, 'Reference (24, 24)', 18)}
${arrow(264, 292, 456, 100, 'red')}
<circle cx="264" cy="292" r="6" fill="${red}"/>
${text(92, 294, 'Pivot (22, 30)', 18, red)}
<circle cx="456" cy="100" r="6" fill="${red}"/>
${text(475, 106, 'Target (46, 54)', 18, red)}
<line x1="271" y1="292" x2="360" y2="292" stroke="${muted}" stroke-width="2" stroke-dasharray="5 4"/>
<path d="M312 292A48 48 0 0 0 298 258" fill="none" stroke="${red}" stroke-width="2"/>
${text(338, 277, 'β = 45°', 19, red)}
${text(514, 201, 'Pivot offset in robot frame:', 18)}
${text(514, 231, '6 forward, 2 left', 20)}
${text(514, 277, 'Chassis heading: θ = 90°', 18)}
${text(514, 307, 'Turret zero: α₀ = 0°', 18)}
${text(514, 350, 'q = 45° − 90° = −45°', 21, red)}
${text(514, 379, 'Clockwise from the nose', 17)}
${arrow(100, 417, 100, 341)}${text(89, 326, '+Y', 18)}
${arrow(100, 417, 192, 417)}${text(202, 424, '+X', 18)}
`);
