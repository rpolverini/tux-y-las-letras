// Chequeo automático: node check.js
// Carga config.js y lang/<idioma>.js como lo hace el navegador y verifica que los datos sean consistentes.
const fs = require('fs'), vm = require('vm'), assert = require('assert');
const dir = process.argv[2] || __dirname;
const code = fs.readFileSync(dir + '/common.js', 'utf8');

const test = `
(async () => {
  await loadLang();

  // teclado: cada tecla es una letra o un dígito, sin repetir, y están todas
  const kb = [...T.keyboard.join('')];
  kb.forEach(k => assert(isKey(k), 'tecla sin datos ' + k));
  assert.strictEqual(kb.length, new Set(kb).size);
  assert.strictEqual(kb.length, Object.keys(T.letters).length + 10);

  // frases: arrays con variantes y solo variables conocidas
  const vars = { letterIntro: ['sound','name','word','kind'], numberIntro: ['kind','name'], numberTotal: ['name'],
    ask: ['kind','name'], wrong: ['kind','name'], findAsk: ['kind','name'], findWrong: ['kind','name'], traceAsk: ['kind','name'] };
  for (const [k, v] of Object.entries(T.say)) {
    assert(Array.isArray(v) && v.length >= 3, k + ' necesita >=3 variantes');
    v.forEach(s => [...s.matchAll(/\\{\\{(\\w+)\\}\\}/g)].forEach(m => assert((vars[k] || []).includes(m[1]), k + ' variable desconocida ' + m[1])));
  }
  C.breaks.forEach(b => assert(T.say[b.say.split('.')[1]], 'pausa sin frase'));

  // menú: cada juego tiene página y nombre
  C.games.forEach(g => {
    assert(T.ui.games[g.id], 'juego sin nombre ' + g.id);
    assert(fs.existsSync(dir + '/' + g.href), 'falta ' + g.href);
  });

  // t(): no repite seguido e interpola
  let prev;
  for (let i = 0; i < 200; i++) { const s = t('say.right'); assert.notStrictEqual(s, prev); prev = s; }
  assert(t('say.ask', { kind: 'la letra', name: 'a' }).includes('la letra a'));

  // opciones: con el panel oculto manda config.js; carga de un idioma inexistente falla en silencio
  if (!C.showOptions) Object.keys(C.defaults).forEach(k => assert.strictEqual(opts[k], C.defaults[k]));
  assert.strictEqual(await loadScript('lang/zz.js'), false);

  // choices / recoPool
  const c = choices('A', 4); assert(c.length === 4 && c.includes('A'));
  assert(recoPool().length >= 3);

  // audios: todo trozo que Tux puede decir tiene clip (si hay manifest) y el archivo existe
  const AUD = window.AUDIO || {};
  if (Object.keys(AUD).length) {
    const Ls = Object.values(T.letters).map(v => ({ sound: v.sound, name: v.name, word: v.word, kind: T.kinds.letter }));
    const Ns = T.numbers.map(n => ({ name: n, kind: T.kinds.number }));
    const only = { letterIntro: Ls, numberIntro: Ns, numberTotal: Ns };
    const missing = new Set(), need = c => AUD[c] || missing.add(c);
    T.numbers.forEach(n => chunksOf(n).forEach(need));
    for (const [key, tpls] of Object.entries(T.say)) for (const tpl of tpls) {
      const vs = tpl.includes('{{name}}') ? (only[key] || [...Ls, ...Ns]) : [{}];
      for (const v of vs) chunksOf(tpl.replace(/\\{\\{(\\w+)\\}\\}/g, (_, k) => v[k] ?? '')).forEach(need);
    }
    assert.strictEqual(missing.size, 0, 'sin audio: ' + [...missing].slice(0, 5));
    Object.values(AUD).forEach(f => assert(fs.existsSync(dir + '/audio/' + T.meta.lang + '/' + f), 'falta ' + f));
    console.log('audios:', Object.keys(AUD).length);
  }
  console.log('OK');
})().catch(e => { console.error(e); process.exit(1); });
`;

// <script> simulado: ejecuta el archivo pedido en el contexto, como haría el navegador
const ctx = {
  assert, console, URLSearchParams, fs, dir, window: {}, location: { search: '?lang=es' }, navigator: { language: 'es-AR' },
  document: {
    head: { append(s) { setImmediate(() => { try { vm.runInContext(fs.readFileSync(dir + '/' + s.src, 'utf8'), ctx); s.onload(); } catch (e) { s.onerror(); } }); } },
    createElement: () => ({}), body: {}
  }
};
vm.createContext(ctx);
new vm.Script(code + test).runInContext(ctx);
