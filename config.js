/* Configuración del juego. Se edita sin tocar código (es JavaScript para que funcione con doble clic).
   Los textos y la voz por idioma (voiceLangs) están en lang/<idioma>.js */
window.CONFIG = {
  showOptions: false,  // true = muestra el botón ⚙ con opciones para el adulto; false = todo se maneja desde este archivo
  defaults: {          // valores de las opciones (si showOptions es true, el adulto puede cambiarlos desde ⚙)
    count: true        // Aprender: contar los números de a uno ("uno, dos, tres...")
  },
  games: [             // juegos que aparecen en el menú (index.html), en este orden. Sacá uno para ocultarlo
    { id: "learn", href: "aprender.html", icon: "🔤" },
    { id: "find", href: "reconocer.html", icon: "🔍" },
    { id: "trace", href: "caligrafia.html", icon: "✏️", beta: true }
  ],
  voice: {
    useClips: true,    // true = usa los audios de audio/<idioma>/ (Piper o grabados) y, si falta alguno, la voz del navegador
    clipRate: 1,       // velocidad de los audios: 1 normal, 0.9 un poco más lenta (no cambia el tono)
    // Lo que sigue solo vale para la voz del navegador (cuando falta un audio o useClips es false):
    name: "",          // nombre (o parte) de una voz instalada, ej. "Paulina" o "Google español". Vacío = elige por idioma
    rate: 0.8,         // velocidad: 0.5 muy lenta, 1 normal
    pitch: 1.2         // tono: 1 normal, más alto = más agudo
  },
  findOptions: 3,      // Reconocer: cuántas tarjetas se muestran
  sessionGapMin: 30,   // minutos sin jugar para empezar una sesión nueva (reinicia las pausas)
  breaks: [            // pausas: a los N minutos Tux dice esa frase (clave de lang/<idioma>.js)
    { min: 5, say: "say.breakWalk" },
    { min: 10, say: "say.breakPlay" }
  ],
  trace: {             // Caligrafía (beta)
    brush: 70,         // grosor del pincel en px (de 600)
    cover: 0.6,        // cuánto de la letra hay que cubrir para darla por buena (0 a 1)
    maxInk: 2.2        // más tinta que esto (x el tamaño de la letra) se toma como garabato
  }
};
