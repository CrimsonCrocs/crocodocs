import { mkdirSync, writeFileSync } from 'node:fs';

// Original teaching geometry. This writes SVG text; it runs no CAD or raster renderer.
const out = new URL('../public/guides/design/', import.meta.url);
mkdirSync(out, { recursive: true });
const ink = '#292927', muted = '#77766f', red = '#b82730', paper = '#faf9f6';
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;');
const t = (x, y, value, size = 21, anchor = 'start', extra = '') =>
  `<text x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}" ${extra}>${esc(value)}</text>`;
const l = (x1, y1, x2, y2, color = muted, extra = '') =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2" ${extra}/>`;
const r = (x, y, width, height, fill = '#e6e2db', extra = '') =>
  `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${fill}" stroke="${muted}" stroke-width="1.5" ${extra}/>`;
const c = (x, y, radius, fill = paper, color = red) =>
  `<circle cx="${x}" cy="${y}" r="${radius}" fill="${fill}" stroke="${color}" stroke-width="2"/>`;
const dim = (x1, x2, y, label) => l(x1,y,x2,y)+l(x1,y-6,x1,y+6)+l(x2,y-6,x2,y+6)+
  `<rect x="${(x1+x2)/2-48}" y="${y-15}" width="96" height="30" fill="${paper}"/>`+t((x1+x2)/2,y+7,label,21,'middle');
function save(name, title, description, height, body) {
  writeFileSync(new URL(name+'.svg',out),`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="${height}" viewBox="0 0 600 ${height}" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(description)}</desc><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="${red}"/></marker></defs><rect width="600" height="${height}" rx="14" fill="${paper}"/><g font-family="Arial, sans-serif" fill="${ink}">${body}</g></svg>\n`);
}

// Slot dimensions: a 20 mm center path plus a 4.5 mm width.
{
  const x1=160, x2=440, cy=205, radius=31.5;
  let b=t(30,38,'Slot length and adjustment',25,'start','font-weight="700"')+t(30,76,'Practice geometry · dimensions in mm',19);
  b+=r(x1-radius,cy-radius,x2-x1+2*radius,2*radius,'#f4e5e4',`rx="${radius}"`);
  b+=l(x1-radius-15,cy,x2+radius+15,cy,muted,'stroke-dasharray="6 5"')+c(x1,cy,4,red)+c(x2,cy,4,red);
  b+=l(x1,cy-8,x1,126)+l(x2,cy-8,x2,126)+dim(x1,x2,120,'20');
  b+=l(x1-radius,cy+radius+6,x1-radius,311)+l(x2+radius,cy+radius+6,x2+radius,311)+dim(x1-radius,x2+radius,305,'24.5');
  b+=l(510,cy-radius,510,cy+radius)+l(503,cy-radius,517,cy-radius)+l(503,cy+radius,517,cy+radius)+t(527,cy+7,'4.5');
  b+=t(30,370,'Center travel: 20 mm',22)+t(30,408,'Overall length: 20 + 4.5 = 24.5 mm',22);
  save('slot-dimensions','Slot center travel and overall length','The end-circle centers are 20 mm apart. A 4.5 mm width makes the full slot 24.5 mm long.',440,b);
}

// L profile: 60 by 40, both legs 4, extruded a total of 30.
{
  let b=t(30,38,'Bracket side profile',25,'start','font-weight="700"')+t(30,76,'Sketch first, then extrude across its width',19);
  b+='<path d="M110 370H470V346H134V130H110Z" fill="#e6e2db" stroke="#77766f" stroke-width="2"/>';
  b+=l(110,377,110,420)+l(470,377,470,420)+dim(110,470,414,'60 mm');
  b+=l(75,130,75,370)+l(68,130,82,130)+l(68,370,82,370)+t(54,250,'40 mm',21,'middle','transform="rotate(-90 54 250)"');
  b+=t(194,166,'4 mm legs',22)+l(183,162,134,151)+l(375,315,425,346)+t(356,302,'4 mm',22);
  b+=t(30,470,'Extrusion width: 30 mm total',22);
  save('bracket-profile','L bracket sketch profile','An L outline is 60 mm long and 40 mm high, with 4 mm legs. Extrude it symmetrically for a total width of 30 mm.',500,b);
}

// A and B are fixed 80 apart; the equal 120 arms are shown at 30 and 90 degrees.
{
  const A=[90,385], B=[250,385], C=[90+240*Math.cos(Math.PI/6),265], D=[250+240*Math.cos(Math.PI/6),265];
  let b=t(30,38,'Parallelogram linkage',25,'start','font-weight="700"')+t(30,76,'Pivot-center layout · two poses',19);
  const dashed='stroke-dasharray="7 5"';
  b+=l(...A,90,145,muted,dashed)+l(...B,250,145,muted,dashed)+l(90,145,250,145,muted,dashed);
  b+=l(...A,...B,ink)+l(...A,...C,red)+l(...B,...D,red)+l(...C,...D,red);
  for(const p of [A,B,C,D])b+=c(...p,6,paper,ink);
  b+=t(65,413,'A',21)+t(260,413,'B',21)+t(C[0]-3,C[1]-20,'C',21)+t(D[0]+5,D[1]-20,'D',21);
  b+=t(270,151,'90° pose',21)+t(390,355,'30° pose',21);
  b+=l(90,420,90,441)+l(250,420,250,441)+dim(90,250,438,'80 mm');
  b+=t(30,483,'Both arms: 120 mm',21)+t(30,517,'Fixed link and coupler: 80 mm each',21);
  save('four-bar-layout','Parallelogram at thirty and ninety degrees','Fixed pivots A and B are 80 mm apart. Equal 120 mm arms keep an 80 mm coupler parallel while moving it upward and backward.',550,b);
}

// One-dimensional worst-case clearance, in mm.
{
  let b=t(30,38,'Nominal clearance can disappear',25,'start','font-weight="700"');
  b+=t(30,93,'Opening: 10.00 ± 0.15 mm',22)+t(30,130,'Tab: 9.80 ± 0.15 mm',22);
  b+=l(90,267,550,267,muted)+l(110,267,170,267,red,'style="stroke-width:9"')+l(170,267,470,267,muted,'style="stroke-width:9"');
  for(const x of [110,170,470])b+=l(x,255,x,280);
  b+=c(110,267,6,red,red)+c(470,267,6,muted,muted);
  b+=t(110,310,'−0.10',22,'middle')+t(170,310,'0',22,'middle')+t(470,310,'+0.50',22,'middle');
  b+=t(30,205,'Tightest: interference',21)+l(110,219,110,249);
  b+=t(340,205,'Loosest: clearance',21)+l(470,219,470,249);
  b+=t(30,373,'9.85 − 9.95 = −0.10 mm',22)+t(30,416,'10.15 − 9.65 = +0.50 mm',22);
  save('clearance-range','A nominal clearance with possible interference','An opening of 10.00 plus or minus 0.15 mm and a tab of 9.80 plus or minus 0.15 mm can have clearance from minus 0.10 to plus 0.50 mm.',450,b);
}

// Static arm example. Given mass centers are 100 and 250 mm from the pivot.
{
  let b=t(30,38,'Gravity load on a horizontal arm',25,'start','font-weight="700"')+t(30,76,'Use each mass and its center of mass',19);
  b+=r(95,170,400,20)+c(95,180,8,paper,ink)+r(477,157,36,46,'#f4e5e4');
  b+=t(255,127,'Arm: 0.4 kg',21,'middle')+t(470,127,'Payload: 0.2 kg',21,'middle');
  b+=l(255,185,255,266,red,'marker-end="url(#arrow)"')+l(495,185,495,266,red,'marker-end="url(#arrow)"');
  b+=t(255,299,'3.92 N',21,'middle')+t(495,299,'1.96 N',21,'middle');
  b+=l(95,203,95,397)+l(255,307,255,347)+l(495,307,495,397)+dim(95,255,342,'100 mm')+dim(95,495,392,'250 mm');
  b+=t(30,455,'Gravity torque: 0.392 + 0.491 = 0.883 N·m',22);
  save('arm-gravity-load','Two gravity loads on an arm','A 0.4 kg arm has its center of mass 100 mm from the pivot. A 0.2 kg payload is 250 mm from it. Total static horizontal gravity torque is 0.883 newton meters.',490,b);
}

// Practice module side view, 2 drawing units per mm. Right: separate axial overview.
{
  const shaftY=430-45*2, motorY=430-124.75*2;
  let b=t(30,38,'Bench roller module',25,'start','font-weight="700"')+t(30,76,'Practice layout · dimensions in mm',19);
  b+=r(130,110,160,320,'#e6e2db')+c(210,shaftY,40,'#ece9e3',muted)+c(210,shaftY,16);
  b+=c(210,motorY,38,'none',muted)+c(210,motorY,20);
  for(const x of [186,234])for(const y of [430-112.75*2,430-136.75*2])b+=c(x,y,4.5);
  for(const x of [150,270])for(const y of [140,400])b+=c(x,y,4.5);
  b+=l(90,110,90,430)+l(83,110,97,110)+l(83,430,97,430)+t(68,270,'160',21,'middle','transform="rotate(-90 68 270)"');
  b+=l(318,motorY,318,shaftY)+l(312,motorY,324,motorY)+l(312,shaftY,324,shaftY)+t(338,265,'79.75',21,'middle','transform="rotate(-90 338 265)"');
  b+=l(130,437,130,475)+l(290,437,290,475)+dim(130,290,468,'80');
  b+=t(381,128,'Across the shaft',21);
  b+=r(365,185,4.5,110)+r(549.5,185,4.5,110)+r(384.5,215,150,50,'#f4e5e4')+l(348,240,574,240,red);
  b+=t(459.5,195,'100 roller',20,'middle');
  b+=l(369.5,302,369.5,338)+l(549.5,302,549.5,338)+dim(369.5,549.5,332,'120 gap');
  b+=t(361,384,'Roller axis height: 45',19)+t(361,416,'Motor height: 124.75',19);
  b+=t(30,523,'Add the selected hardware, retention, and adjustment.',20);
  save('roller-module-layout','Bench roller module layout','An 80 by 160 mm side plate has roller axis height 45 mm and motor axis height 124.75 mm. The plates have a 120 mm inner gap around a 100 mm long roller.',555,b);
}

// Conical funnel axial section at a common scale of 3 drawing units per mm.
{
  const offset=2*Math.sqrt(1+.4**2)*3;
  let b=t(30,38,'Loft, then Shell',25,'start','font-weight="700"')+t(30,76,'Axial section · outside profile dimensions',19);
  b+=`<path d="M150 145L210 295L${210+offset} 295L${150+offset} 145Z M450 145L390 295L${390-offset} 295L${450-offset} 145Z" fill="#f4e5e4" stroke="${muted}" stroke-width="1.5"/>`;
  b+=dim(150,450,108,'Ø100')+dim(210,390,348,'Ø60');
  b+=l(500,145,500,295)+l(493,145,507,145)+l(493,295,507,295)+t(523,227,'50');
  b+=t(30,224,'2 mm wall',21)+l(141,220,185,230)+t(30,150,'Inlet',20)+t(30,300,'Outlet',20);
  b+=t(30,407,'Measure the clear outlet after hollowing.',21);
  save('funnel-section','Funnel after lofting and shelling','A funnel is 50 mm high, with outside inlet diameter 100 mm and outside outlet diameter 60 mm. A 2 mm inward shell leaves both ends open.',440,b);
}

// Launcher contact example: wheel R48, ball R35, overlap 5, center path R78.
{
  const scale=1.7, origin=[300,220];
  const point=(radius,degrees)=>[origin[0]+scale*radius*Math.cos(degrees*Math.PI/180),origin[1]-scale*radius*Math.sin(degrees*Math.PI/180)];
  const [sx,sy]=point(78,-150),[ex,ey]=point(78,-60);
  const [isx,isy]=point(113,-150),[iex,iey]=point(113,-60),[osx,osy]=point(116,-150),[oex,oey]=point(116,-60);
  let b=t(30,38,'A wheel, guide, and release path',25,'start','font-weight="700"')+t(30,76,'Side-layout geometry · dimensions in mm',19);
  b+=`<path d="M${osx} ${osy}A${116*scale} ${116*scale} 0 0 0 ${oex} ${oey}L${iex} ${iey}A${113*scale} ${113*scale} 0 0 1 ${isx} ${isy}Z" fill="#deddd7" stroke="${muted}" stroke-width="1.5"/>`;
  b+=c(...origin,48*scale,'#e6e2db',muted)+t(300,182,'Ø96 wheel',21,'middle');
  b+=c(sx,sy,35*scale,'#f4e5e4')+c(ex,ey,35*scale,'#f4e5e4');
  b+=`<path d="M${sx} ${sy}A${78*scale} ${78*scale} 0 0 0 ${ex} ${ey}" fill="none" stroke="${muted}" stroke-width="2" stroke-dasharray="6 5"/>`;
  b+=c(sx,sy,3,ink,ink)+c(ex,ey,3,ink,ink);
  b+=l(ex,ey,ex+145*Math.cos(Math.PI/6),ey-145*Math.sin(Math.PI/6),red,'marker-end="url(#arrow)"')+t(477,245,'30°',23);
  b+=t(30,197,'Ø70 ball',21)+l(133,205,157,239)+t(418,402,'Exit center',20);
  b+=t(30,445,'Path radius: 78 · Guide inside radius: 113',20)+t(30,481,'5 mm nominal overlap · test the real contact',20);
  save('shooter-contact-layout','Shooter contact and tangent release layout','A 96 mm wheel contacts a 70 mm ball with 5 mm nominal overlap. The ball center follows a 78 mm radius and exits at a geometric tangent 30 degrees above horizontal.',510,b);
}

console.log('Wrote 8 original Design teaching figures.');
