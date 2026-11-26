# Tux y las letras

Juegos para que un chico de 5 años aprenda letras y números con Tux. Es una **página estática**: HTML, CSS y JavaScript sin dependencias ni servidor. Funciona abriendo `index.html` con doble clic o subiendo la carpeta a cualquier hosting estático.

| Página | Qué es |
|---|---|
| `index.html` | **Menú**: botones grandes hacia cada juego. Los juegos que aparecen salen de `config.js`. |
| `aprender.html` | **Aprender**: aprieta una tecla, Tux dice el sonido y la palabra (aaa, A de Abeja), y después hay que volver a apretarla. Los números se cuentan de a uno. |
| `reconocer.html` | **Reconocer**: Tux pide "¿Dónde está la letra M?" y hay que elegir entre varias tarjetas. |
| `caligrafia.html` | **Caligrafía (beta)**: trazar la letra con el dedo o un lápiz. Pensado para celular y tablet. |

La versión por defecto no tiene botones ni opciones a la vista. Todo se cambia **clonando el repo y editando archivos**, como se explica abajo. Si querés un botón **⚙** para que un adulto cambie opciones desde la página, poné `showOptions: true` en `config.js` (hoy solo hay una opción: contar los números de a uno, en Aprender).

## Estructura

```
index.html                                    menú de juegos
aprender.html  reconocer.html  caligrafia.html   los juegos
common.js                                     lógica compartida (idioma, voz, opciones, pausas)
style.css                                     estilo
config.js                                     configuración (voz, pausas, dificultad...)
lang/es.js                                    todos los textos en español
audio/es/                                     audios de Tux (generados con Piper o grabados)
tools/generate_audio.py                       genera los audios con Piper
check.js                                      chequeo automático de datos (node check.js)
```

## Configuración: `config.js`

Está comentado línea por línea. Lo principal:

- `showOptions`: muestra u oculta el botón ⚙ con opciones para el adulto. Con `false` (por defecto), las opciones se toman de `defaults`.
- `defaults.count`: Aprender cuenta los números de a uno ("uno, dos, tres…").
- `games`: qué juegos aparecen en el menú y en qué orden. Para ocultar uno, sacalo de la lista.
- `voice.engine`: `"browser"` (por defecto) usa la voz del navegador, que cambia según el dispositivo; `"files"` usa los audios de `audio/<idioma>/` (Piper o grabados) y, si falta alguno, la voz del navegador.
- `voice.name`, `voice.rate`, `voice.pitch`: la voz del navegador (con `engine: "files"` solo se usa cuando falta un audio).
- `voice.clipRate`: velocidad de los audios (1 normal, 0.9 un poco más lenta). Solo con `engine: "files"`.
- `findOptions`: cuántas tarjetas se muestran en Reconocer.
- `breaks`: a los 5 y 10 minutos Tux sugiere salir a caminar y luego a jugar o andar en bici. Se pueden cambiar los minutos y las frases.
- `trace`: Caligrafía (beta). `cover` = cuánto de la letra hay que pintar (0,8 = 80 %), `maxOutside` = cuánto del recorrido puede quedar fuera de la letra (0,15 = 15 %; si se pasa, se borra y se empieza de nuevo), `tolerance` = margen en píxeles que cuenta como "adentro" y `brush` = grosor del pincel.

## Textos e idiomas: `lang/<idioma>.js`

Ahí están todas las frases, las palabras de cada letra, los nombres de los números y el teclado. Los nombres de los juegos del menú están en `ui.games`.

- Cada evento (`say.right`, `say.wrong`, `say.ask`…) es una **lista de variantes**: Tux elige una al azar y nunca repite la misma dos veces seguidas. Se pueden agregar o sacar variantes (mínimo 1).
- Las frases usan variables entre llaves: `{{name}}` (nombre de la letra o número), `{{kind}}` ("la letra" / "el número"), `{{sound}}`, `{{word}}`.
- El archivo es JavaScript que contiene un objeto JSON: hay que respetar `window.LANG = { ... };` y las comillas dobles. Es `.js` y no `.json` para que funcione con doble clic (los navegadores bloquean `fetch` de archivos locales).
- **Cambiar de idioma** es por URL: `index.html?lang=en` carga `lang/en.js` (y se recuerda). Sin parámetro usa el idioma del navegador y, si no existe ese archivo, `es`.
- **Agregar un idioma**: copiar `lang/es.js` a `lang/en.js`, traducir (incluidos `meta.lang` y `meta.voiceLangs`), generar los audios (`--lang en`, ver abajo) y agregar la voz de Piper en `VOICES` de `tools/generate_audio.py`.

## Audio

Cada juego arranca con una pantalla con un botón ▶: los navegadores no dejan reproducir sonido hasta que alguien toca la pantalla o aprieta una tecla, y así Tux puede saludar con voz.

Para usar los audios generados hay que poner `voice.engine: "files"` en `config.js`. Con `engine: "files"`, cada frase se corta en trozos por la puntuación (`.` `,` `:` `;` `?` `!`) y cada trozo tiene su clip: `"sss, sss, sss. ese de Sol"` se reproduce como `sss` + `sss` + `sss` + `ese de Sol`. Si falta el clip de un trozo, ese trozo se dice con la voz del navegador, así que el juego funciona aunque falte algo.

```
audio/es/manifest.js     texto -> archivo (lo escribe el script)
audio/es/sounds/         los sonidos de las letras: sss.m4a, mmm.m4a, ba.m4a...
audio/es/phrases/        el resto de las frases: ahora-aprieta-la-letra-a.m4a...
```

### Generar los audios con Piper (voz es_AR-daniela-high)

Piper necesita **Python 3.9 a 3.12**. Con [uv](https://docs.astral.sh/uv/):

```sh
uv venv --python 3.12 .venv
uv pip install --python .venv/bin/python -r tools/requirements.txt
.venv/bin/python tools/generate_audio.py
```

La primera vez baja la voz (unos 115 MB) a `tools/voices/`, que no se versiona. Genera cerca de 900 clips en unos 6 minutos. Para comprimirlos usa `ffmpeg` (mp3) si está instalado, o `afconvert` (m4a) en macOS. Sin ninguno de los dos, el script se detiene.

- Los clips que **ya existen no se pisan**, así que se pueden correr de nuevo sin perder grabaciones. Regenerar todo: `--force`.
- Si agregás o cambiás frases en `lang/es.js`, volvé a correr el script: genera solo lo que falta y actualiza `manifest.js`. Con `--prune` borra además los clips que ninguna frase usa (cuidado: también borra grabaciones propias que ya no se usen).
- Otra voz: `--voice <nombre de Piper>`. Otro idioma: `--lang en`.
- La velocidad de las frases (`PHRASE_STRETCH`) y cuánto se estiran los sonidos sostenidos (`SOUND_STRETCH`) son constantes al principio de `tools/generate_audio.py`.

### Reemplazar un audio por una grabación

Es la forma recomendada para los sonidos de las letras (sobre todo b, p, t, k, d, g), que ninguna voz sintética pronuncia bien suelta.

1. Grabá el sonido (mono, 0,5 a 1 s, sin silencio al principio ni al final, volumen parejo) y exportalo a `.m4a`, `.mp3`, `.ogg` o `.wav`.
2. Guardalo en la carpeta con **el mismo nombre** que el clip actual. Para saber cuál es, buscá el texto en `audio/es/manifest.js`.
3. Si el formato es distinto al que ya había, corré `.venv/bin/python tools/generate_audio.py`: reconoce el archivo nuevo, no genera nada más y actualiza el manifest.

Los sonidos de las letras salen de los campos `sound` y `phonemes` de `lang/es.js`. `phonemes` (opcional) son fonemas IPA que Piper pronuncia con `[[ ]]` y estira; sin él, Piper lee el texto de `sound` (por ejemplo "ba"). Si querés otro sonido sintético, cambiá `phonemes` y regenerá con `--force`.

## Chequeo

```sh
node check.js
```

Verifica que el teclado y las frases sean consistentes, que cada juego del menú tenga su página, que todas las frases posibles tengan su audio y que los archivos existan.

## Licencias y créditos

- **Voz (carpeta `audio/`)**: generada con Piper usando la voz `es_AR-daniela-high`, entrenada con el dataset [OpenSLR 61](https://www.openslr.org/61/) (español de Argentina), licencia **[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.es)**. Modelo entrenado por [larcanio](https://huggingface.co/larcanio/piper-voices). Los audios generados se publican con la misma licencia (atribución y compartir igual).
- **Piper** (`piper-tts`, usado solo por `tools/generate_audio.py`) tiene su propia licencia: revisala si vas a redistribuir esa herramienta.
- **Tux** es la mascota de Linux, creada por Larry Ewing; acá está redibujado como SVG simple.
- **Código**: todavía sin licencia elegida. Si querés que otros lo reutilicen, agregá un archivo `LICENSE`.
