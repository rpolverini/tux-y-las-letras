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
    engine: "browser", // "browser" = voz del navegador (varía según el dispositivo) | "files" = audios de audio/<idioma>/ (Piper o grabados; si falta uno, usa la voz del navegador)
    // Solo para engine "browser" (y para los audios que falten en "files"):
    name: "",          // nombre (o parte) de una voz instalada, ej. "Paulina" o "Google español". Vacío = elige por idioma
    rate: 0.8,         // velocidad: 0.5 muy lenta, 1 normal
    pitch: 1.2,        // tono: 1 normal, más alto = más agudo
    // Solo para engine "files":
    clipRate: 1        // velocidad de los audios: 1 normal, 0.9 un poco más lenta (no cambia el tono)
  },
  findOptions: 3,      // Reconocer: cuántas tarjetas se muestran
  sessionGapMin: 30,   // minutos sin jugar para empezar una sesión nueva (reinicia las pausas)
  breaks: [            // pausas: a los N minutos Tux dice esa frase (clave de lang/<idioma>.js)
    { min: 5, say: "say.breakWalk" },
    { min: 10, say: "say.breakPlay" }
  ],
  trace: {             // Caligrafía (beta)
    brush: 1.2,        // grosor del pincel respecto del grosor medido del trazo de la letra (se adapta a cualquier tipografía)
    cover: 0.8,        // cuánto de la letra hay que pintar para darla por buena (0 a 1)
    maxOutside: 0.15,  // cuánto del recorrido puede quedar fuera de la letra (0.15 = 15%); si se pasa, se borra y se empieza de nuevo
    tolerance: 14      // margen en px alrededor de la letra que todavía cuenta como "adentro" (de 600)
  }
};
