/* Compartido por las tres páginas: idioma, voz, Tux, opciones, progreso y pausas. */
const $ = id => document.getElementById(id);

const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sin storage: todo sigue andando */ } }
};

const opts = {};   // se completa en loadLang desde CONFIG.defaults (y lo guardado por el adulto si showOptions es true)
const progress = store.get('progress', {});   // { tecla: veces confirmada }

let T = {}, C = {}, lastSaid = '';
const lastPick = {};

// --- config e idioma ------------------------------------------------------
// Los archivos son .js (window.CONFIG / window.LANG) y se cargan con <script>: así andan con doble clic y en hosting estático.
// fetch() de un .json local lo bloquea el navegador en file://.
const loadScript = src => new Promise(r => {
  const s = document.createElement('script');
  s.src = src; s.onload = () => r(true); s.onerror = () => r(false);
  document.head.append(s);
});

// shortcut: formato de i18next (claves anidadas, {{var}}) pero con loader propio;
// i18next no sortea variantes al azar, así que igual habría que escribir esto encima. Migrar si se necesita plural/ICU.
// Idioma por URL: ?lang=en carga lang/en.js (se recuerda); sin parámetro usa el del navegador y, si no existe, es.
async function loadLang() {
  if (await loadScript('config.js')) C = window.CONFIG;
  const q = new URLSearchParams(location.search).get('lang');
  if (q) store.set('lang', q);
  for (const l of [q || store.get('lang', null) || navigator.language.slice(0, 2), 'es']) {
    if (/^[\w-]+$/.test(l) && await loadScript(`lang/${l}.js`) && window.LANG) { T = window.LANG; break; }
  }
  if (!C.voice || !T.keyboard) {
    document.body.textContent = 'No pude cargar config.js o lang/es.js. Revisá que estén junto a la página.';
    throw new Error('load');
  }
  for (const k in C.defaults) opts[k] = C.showOptions ? store.get('opt.' + k, C.defaults[k]) : C.defaults[k];
  window.AUDIO = undefined;
  await loadScript(`audio/${T.meta.lang}/manifest.js`);   // opcional: sin manifest, todo se dice con la voz del navegador
}

// Una clave puede ser un texto o un array de variantes; con array sortea una distinta de la anterior.
function t(key, v = {}) {
  let s = key.split('.').reduce((o, k) => o?.[k], T);
  if (s === undefined) return key;
  if (Array.isArray(s)) {
    let i;
    do i = Math.floor(Math.random() * s.length); while (s.length > 1 && i === lastPick[key]);
    lastPick[key] = i; s = s[i];
  }
  return s.replace(/\{\{(\w+)\}\}/g, (_, k) => v[k] ?? '');
}

// --- teclas y progreso ------------------------------------------
const isLetter = k => !!T.letters[k];
const isKey = k => isLetter(k) || /^\d$/.test(k);
const nameOf = k => T.letters[k]?.name ?? T.numbers[k];
const kindOf = k => isLetter(k) ? T.kinds.letter : T.kinds.number;
const allKeys = () => [...T.keyboard.join('')];
const bump = k => { progress[k] = (progress[k] || 0) + 1; store.set('progress', progress); };

const shuffle = a => [...a].sort(() => Math.random() - .5);
const choices = (target, n, pool = allKeys()) => shuffle([target, ...shuffle(pool.filter(k => k !== target)).slice(0, n - 1)]);
// Para "Reconocer": prioriza lo que ya practicó en Aprender; si practicó poco, usa todas las teclas.
const recoPool = () => { const l = allKeys().filter(k => progress[k]); return l.length >= 3 ? l : allKeys(); };

// --- voz ----------------------------------------------------------------
// Cada frase se corta en trozos por la puntuación (tiene que ser IGUAL a SPLIT en tools/generate_audio.py).
// Cada trozo se reproduce con su clip de audio/<idioma>/ (Piper o grabado) y, si no hay clip, con la voz del navegador.
const chunksOf = text => text.split(/[.,;:!?¡¿…]+/).map(s => s.trim()).filter(Boolean);

let sayId = 0, stopClip = () => {};

const clip = url => new Promise(r => {
  const a = new Audio(url);
  a.playbackRate = C.voice.clipRate;
  stopClip = () => { a.pause(); r(false); };
  a.onended = () => r(true);
  a.onerror = () => r(false);
  a.play().catch(() => r(false));
});

const speak = text => new Promise(r => {
  if (!window.speechSynthesis) return setTimeout(r, 400 + text.length * 50);
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text), v = speechSynthesis.getVoices();
  const byName = C.voice.name && v.find(x => x.name.toLowerCase().includes(C.voice.name.toLowerCase()));
  const vo = byName || T.meta.voiceLangs.map(l => v.find(x => x.lang.replace('_', '-') === l)).find(Boolean)
    || v.find(x => x.lang.startsWith(T.meta.lang));
  if (vo) u.voice = vo;
  u.lang = vo ? vo.lang : T.meta.voiceLangs[0]; u.rate = C.voice.rate; u.pitch = C.voice.pitch;
  u.onend = u.onerror = r;
  speechSynthesis.speak(u);
});

// Una llamada nueva corta la anterior (el id descarta los trozos que quedaban pendientes).
async function say(text) {
  const id = ++sayId;
  stopClip();
  if (window.speechSynthesis) speechSynthesis.cancel();
  for (const p of chunksOf(text)) {
    if (id !== sayId) return;
    const f = C.voice.useClips && (window.AUDIO || {})[p];
    if (f && await clip(`audio/${T.meta.lang}/${f}`)) continue;
    if (id !== sayId) return;
    await speak(p);
  }
}

async function talk(text) {
  lastSaid = text; $('bubble').textContent = text; $('tux').classList.add('talk');
  await say(text);
  $('tux').classList.remove('talk');
}

// --- pausas: a los 5 y 10 minutos Tux sugiere salir a moverse ------------
function startBreaks(idle) {
  if (startBreaks.on) return;
  startBreaks.on = true;
  let s = store.get('sess', { last: 0 });
  if (Date.now() - s.last > C.sessionGapMin * 6e4) s = { start: Date.now(), done: [] };   // sesión nueva tras un rato sin jugar
  setInterval(() => {
    s.last = Date.now();
    for (const b of C.breaks) {
      if (!s.done.includes(b.min) && (s.last - s.start) / 6e4 >= b.min && idle()) { s.done.push(b.min); talk(t(b.say)); }
    }
    store.set('sess', s);
  }, 3000);
}

// --- página: navegación, opciones, Tux ------------------------------------
const TUX = `<svg viewBox="0 0 100 120">
  <ellipse cx="30" cy="112" rx="16" ry="6" fill="#e8a33d"/><ellipse cx="70" cy="112" rx="16" ry="6" fill="#e8a33d"/>
  <ellipse cx="50" cy="65" rx="38" ry="48" fill="#2f3a4a"/><ellipse cx="50" cy="75" rx="25" ry="35" fill="#fff"/>
  <ellipse cx="38" cy="38" rx="9" ry="11" fill="#fff"/><ellipse cx="62" cy="38" rx="9" ry="11" fill="#fff"/>
  <circle cx="40" cy="40" r="4" fill="#000"/><circle cx="60" cy="40" r="4" fill="#000"/>
  <path d="M36 52 Q50 46 64 52 Q50 68 36 52Z" fill="#e8a33d"/></svg>`;

// cur: 'home' | 'learn' | 'find' | 'trace'. optionKeys: opciones de CONFIG.defaults que esa página permite cambiar desde ⚙.
function initPage(cur, optionKeys = []) {
  document.title = T.ui.title;
  document.documentElement.lang = T.meta.lang;
  const home = cur === 'home' ? '' : `<a href="index.html">🏠 ${T.ui.home}</a>`;
  const panel = C.showOptions && optionKeys.length
    ? `<details><summary>⚙ ${T.ui.opts.title}</summary><div class="panel">${optionKeys.map(k =>
        `<label><input type="checkbox" data-o="${k}"${opts[k] ? ' checked' : ''}> ${T.ui.opts[k]}</label>`).join('')}</div></details>`
    : '';
  $('top').innerHTML = home + panel;
  // Cambiar una opción recarga la página: es una acción de adulto y evita estados a medias.
  $('top').querySelectorAll('[data-o]').forEach(i => i.onchange = () => {
    store.set('opt.' + i.dataset.o, i.checked);
    location.reload();
  });
  $('tux').innerHTML = TUX;
  $('tux').onclick = () => lastSaid && talk(lastSaid);
}

function onKey(fn) {
  addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey || e.altKey || e.repeat || /INPUT|SELECT/.test(e.target.tagName)) return;
    if (e.key.length === 1) e.preventDefault();   // evita atajos del navegador (ej. "/" abre búsqueda)
    fn(e.key.toUpperCase());
  });
}
