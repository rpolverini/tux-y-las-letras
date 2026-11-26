/* Medición de la caligrafía, sin DOM para poder probarla con `node check.js`. Todo en un lienzo de S x S.
   Un píxel está "dentro" si su alpha > 128. */
const S = 600;
const inside = (a, x, y) => { x = Math.floor(x); y = Math.floor(y); return x >= 0 && y >= 0 && x < S && y < S && a[(y * S + x) * 4 + 3] > 128; };

// Grosor del trazo de la letra en píxeles: 2 * área / perímetro (sirve con cualquier tipografía).
// Es exacto para trazos largos y subestima ~20% en trazos cortos; config.trace.brush lo compensa.
function strokeWidth(a) {
  let area = 0, per = 0;
  for (let y = 1; y < S - 1; y++) for (let x = 1; x < S - 1; x++) {
    if (!inside(a, x, y)) continue;
    area++;
    if (!inside(a, x - 1, y) || !inside(a, x + 1, y) || !inside(a, x, y - 1) || !inside(a, x, y + 1)) per++;
  }
  return per ? 2 * area / per : 0;
}

// mask: la letra; near: la letra engrosada por la tolerancia; ink: lo pintado; pts: puntos del recorrido.
// cov = fracción de la letra pintada; off = fracción del recorrido que quedó fuera de near.
function traceScore(mask, near, ink, pts) {
  let area = 0, cov = 0;
  for (let i = 3; i < mask.length; i += 4) if (mask[i] > 128) { area++; if (ink[i] > 128) cov++; }
  const off = pts.filter(([x, y]) => !inside(near, x, y)).length;
  return { cov: area ? cov / area : 0, off: pts.length ? off / pts.length : 1 };
}

if (typeof module !== 'undefined') module.exports = { S, inside, strokeWidth, traceScore };
