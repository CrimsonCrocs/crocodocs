import { mkdirSync, writeFileSync } from 'node:fs';

// Original explanatory figures. Geometry is illustrative, not a fabrication drawing.
const out = new URL('../public/guides/engineering/', import.meta.url);
mkdirSync(out, { recursive: true });
const ink = '#242424';
const red = '#b42629';
function svg(name, title, description, body, height = 330) {
  writeFileSync(new URL(`${name}.svg`, out), `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="${height}" viewBox="0 0 800 ${height}" role="img" aria-labelledby="title desc">
<title id="title">${title}</title><desc id="desc">${description}</desc>
<defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse"><path d="M0 0L8 4L0 8Z" fill="${red}"/></marker></defs>
<rect width="800" height="${height}" rx="12" fill="#fff"/>
<g fill="${ink}" font-family="Arial, sans-serif" font-size="20">${body}</g>
<text x="24" y="${height - 17}" font-family="Arial, sans-serif" font-size="14" fill="#555">CrocoDocs · Original illustration · Not to scale</text></svg>\n`);
}
const line = (x1, y1, x2, y2, color = ink, arrow = false) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="3" ${arrow ? 'marker-end="url(#arrow)"' : ''}/>`;
const text = (x, y, s, size = 20) => `<text x="${x}" y="${y}" font-size="${size}">${s}</text>`;
svg('arm-load', 'Gravity loads on a horizontal arm', 'A pivot at the left supports a horizontal arm. Arm weight acts at its center, and payload weight acts at the end. Their horizontal distances are the moment arms.', `
${text(24, 36, 'Horizontal arm: two contributions to gravity torque', 23)}
<path d="M75 215L105 155L135 215Z" fill="#e8e8e8" stroke="${ink}" stroke-width="3"/>
<rect x="105" y="143" width="540" height="24" rx="4" fill="#dedede" stroke="${ink}" stroke-width="3"/>
<circle cx="105" cy="155" r="12" fill="#fff" stroke="${ink}" stroke-width="3"/>
<rect x="613" y="105" width="64" height="62" fill="#fbe6e6" stroke="${red}" stroke-width="3"/>
${line(375, 165, 375, 230, red, true)}${line(645, 170, 645, 260, red, true)}
${text(285, 255, 'Arm weight', 18)}${text(552, 285, 'Payload weight', 18)}
${line(105, 75, 375, 75, red)}${line(105, 65, 105, 85, red)}${line(375, 65, 375, 85, red)}
${text(185, 63, 'L / 2', 18)}${text(48, 245, 'Pivot', 18)}
${line(105, 95, 645, 95, red)}${line(645, 85, 645, 105, red)}${text(485, 82, 'L', 18)}
`, 350);
svg('shaft-support', 'Overhung and straddle-supported loads', 'Left: a wheel beyond one bearing creates a bending moment at the support. Right: a wheel between two bearings transfers the applied load into both supports.', `
${text(24, 36, 'Bearing placement changes the load path', 23)}
${text(35, 79, 'Overhung load')}${text(435, 79, 'Load between supports')}
${line(55, 180, 335, 180)}${line(440, 180, 755, 180)}
<rect x="96" y="128" width="30" height="104" fill="#e8e8e8" stroke="${ink}" stroke-width="3"/>
<rect x="475" y="128" width="30" height="104" fill="#e8e8e8" stroke="${ink}" stroke-width="3"/>
<rect x="695" y="128" width="30" height="104" fill="#e8e8e8" stroke="${ink}" stroke-width="3"/>
<rect x="260" y="140" width="44" height="80" rx="8" fill="#fbe6e6" stroke="${red}" stroke-width="3"/>
<rect x="580" y="140" width="44" height="80" rx="8" fill="#fbe6e6" stroke="${red}" stroke-width="3"/>
${line(282, 90, 282, 130, red, true)}${line(602, 90, 602, 130, red, true)}
${text(300, 107, 'F')}${text(620, 107, 'F')}${text(65, 265, 'Moment at support = F × d', 18)}
${line(111, 113, 282, 113, red)}${text(188, 104, 'd', 18)}
${text(452, 265, 'Both supports carry reaction loads', 18)}
`);
const points = Array.from({ length: 61 }, (_, i) => {
  const x = i / 60;
  return `${110 + x * 600},${260 - 155 * 4 * x * (1 - x)}`;
}).join(' ');
svg('motor-model', 'Normalized ideal DC motor torque and power', 'Torque falls linearly from stall to free speed. Mechanical power is zero at both endpoints and peaks at half free speed in this idealized fixed-voltage model.', `
${text(24, 34, 'Ideal DC motor model at fixed voltage', 23)}
${line(110, 260, 730, 260)}${line(110, 260, 110, 75)}
${line(110, 105, 710, 260)}
<polyline points="${points}" fill="none" stroke="${red}" stroke-width="4"/>
${text(30, 74, 'Relative', 16)}${text(30, 94, 'output', 16)}${text(89, 281, '0', 16)}
${text(395, 281, '0.5', 16)}${text(698, 281, '1', 16)}
${text(250, 309, 'Speed / free speed', 18)}
${line(225, 72, 250, 72)}${text(260, 78, 'Torque / stall torque', 18)}
${line(495, 72, 520, 72, red)}${text(530, 78, 'Power / peak power', 18)}
${line(410, 112, 410, 260, '#aaa')}
${text(110, 340, 'Stall: no rotation')}${text(500, 340, 'Free speed: near-zero load')}
`, 385);
svg('transfer-sequence', 'Object control during a handoff', 'Donor holding progresses to shared capture and then receiver holding. If capture is not established, a recovery path returns to donor control rather than releasing the object.', `
${text(24, 36, 'Object handoff', 23)}
<g fill="#f5f5f5" stroke="${ink}" stroke-width="2"><rect x="35" y="95" width="200" height="70" rx="8"/><rect x="295" y="95" width="210" height="70" rx="8"/><rect x="565" y="95" width="200" height="70" rx="8"/></g>
${text(66, 138, 'Donor holds')}${text(327, 138, 'Shared capture')}${text(581, 138, 'Receiver holds')}
${line(240, 130, 285, 130, red, true)}${line(510, 130, 555, 130, red, true)}
${text(190, 195, 'Align and capture', 17)}${text(521, 195, 'Confirm, then release', 17)}
<path d="M400 170V245H135V175" stroke="${red}" stroke-width="3" fill="none" marker-end="url(#arrow)"/>
${text(207, 275, 'Failed capture: recover to a known state', 18)}
`);
svg('tolerance-stack', 'Worst-case spacer tolerance stack', 'Three spacers each nominally 10.0 mm with plus or minus 0.1 mm variation produce a total nominal length of 30.0 mm with worst-case variation of plus or minus 0.3 mm.', `
${text(24, 36, 'Individual variation adds along the functional stack', 23)}
<g stroke="${ink}" stroke-width="3"><rect x="100" y="90" width="200" height="85" fill="#ededed"/><rect x="300" y="90" width="200" height="85" fill="#fbe6e6"/><rect x="500" y="90" width="200" height="85" fill="#ededed"/></g>
${text(125, 141, '10.0 ± 0.1 mm', 18)}${text(325, 141, '10.0 ± 0.1 mm', 18)}${text(525, 141, '10.0 ± 0.1 mm', 18)}
${line(100, 215, 700, 215, red)}${line(100, 200, 100, 230, red)}${line(700, 200, 700, 230, red)}
${text(272, 253, '30.0 ± 0.3 mm total', 23)}
${text(230, 283, 'Worst-case range: 29.7 to 30.3 mm', 18)}
`);
console.log(`Generated 5 original engineering figures in ${out.pathname}`);
