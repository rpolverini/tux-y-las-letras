/* Textos en español. Es JavaScript (no JSON) para que funcione con doble clic, sin servidor.
   Para otro idioma: copiar a lang/en.js, traducir, y abrir la página con ?lang=en
   "phonemes" (opcional) lo usa solo tools/generate_audio.py para sintetizar el sonido de la letra con Piper. */
window.LANG = {
  "meta": {
    "lang": "es",
    "voiceLangs": [
      "es-AR",
      "es-US",
      "es-MX",
      "es-419"
    ]
  },
  "ui": {
    "title": "Tux y las letras",
    "home": "Inicio",
    "beta": "beta",
    "games": {
      "learn": "Aprender",
      "find": "Reconocer",
      "trace": "Caligrafía"
    },
    "opts": {
      "title": "Opciones",
      "count": "Contar los números de a uno"
    },
    "tagLetter": "LETRA",
    "tagNumber": "NÚMERO",
    "nothing": "(nada)",
    "clear": "Borrar",
    "skip": "Otra"
  },
  "kinds": {
    "letter": "la letra",
    "number": "el número"
  },
  "keyboard": [
    "1234567890",
    "QWERTYUIOP",
    "ASDFGHJKLÑ",
    "ZXCVBNM"
  ],
  "numbers": [
    "cero",
    "uno",
    "dos",
    "tres",
    "cuatro",
    "cinco",
    "seis",
    "siete",
    "ocho",
    "nueve"
  ],
  "letters": {
    "A": {
      "name": "a",
      "sound": "aaa",
      "word": "Abeja",
      "emoji": "🐝",
      "phonemes": "aː"
    },
    "B": {
      "name": "be",
      "sound": "ba",
      "word": "Ballena",
      "emoji": "🐳"
    },
    "C": {
      "name": "ce",
      "sound": "ka",
      "word": "Casa",
      "emoji": "🏠"
    },
    "D": {
      "name": "de",
      "sound": "da",
      "word": "Dado",
      "emoji": "🎲"
    },
    "E": {
      "name": "e",
      "sound": "eee",
      "word": "Elefante",
      "emoji": "🐘",
      "phonemes": "eː"
    },
    "F": {
      "name": "efe",
      "sound": "fff",
      "word": "Flor",
      "emoji": "🌸",
      "phonemes": "fː"
    },
    "G": {
      "name": "ge",
      "sound": "ga",
      "word": "Gato",
      "emoji": "🐱"
    },
    "H": {
      "name": "hache",
      "sound": "shhh",
      "word": "Helado",
      "emoji": "🍦",
      "phonemes": "ʃː"
    },
    "I": {
      "name": "i",
      "sound": "iii",
      "word": "Iglesia",
      "emoji": "⛪",
      "phonemes": "iː"
    },
    "J": {
      "name": "jota",
      "sound": "ja",
      "word": "Jirafa",
      "emoji": "🦒"
    },
    "K": {
      "name": "ka",
      "sound": "ka",
      "word": "Koala",
      "emoji": "🐨"
    },
    "L": {
      "name": "ele",
      "sound": "lll",
      "word": "León",
      "emoji": "🦁",
      "phonemes": "lː"
    },
    "M": {
      "name": "eme",
      "sound": "mmm",
      "word": "Mariposa",
      "emoji": "🦋",
      "phonemes": "mː"
    },
    "N": {
      "name": "ene",
      "sound": "nnn",
      "word": "Nube",
      "emoji": "☁️",
      "phonemes": "nː"
    },
    "Ñ": {
      "name": "eñe",
      "sound": "ña",
      "word": "Ñandú",
      "emoji": "🐦"
    },
    "O": {
      "name": "o",
      "sound": "ooo",
      "word": "Oso",
      "emoji": "🐻",
      "phonemes": "oː"
    },
    "P": {
      "name": "pe",
      "sound": "pa",
      "word": "Perro",
      "emoji": "🐶"
    },
    "Q": {
      "name": "cu",
      "sound": "ka",
      "word": "Queso",
      "emoji": "🧀"
    },
    "R": {
      "name": "erre",
      "sound": "rrr",
      "word": "Ratón",
      "emoji": "🐭",
      "phonemes": "r"
    },
    "S": {
      "name": "ese",
      "sound": "sss",
      "word": "Sol",
      "emoji": "☀️",
      "phonemes": "sː"
    },
    "T": {
      "name": "te",
      "sound": "ta",
      "word": "Tortuga",
      "emoji": "🐢"
    },
    "U": {
      "name": "u",
      "sound": "uuu",
      "word": "Uva",
      "emoji": "🍇",
      "phonemes": "uː"
    },
    "V": {
      "name": "uve",
      "sound": "va",
      "word": "Vaca",
      "emoji": "🐄"
    },
    "W": {
      "name": "doble ve",
      "sound": "gua",
      "word": "Waffle",
      "emoji": "🧇"
    },
    "X": {
      "name": "equis",
      "sound": "ks",
      "word": "Xilófono",
      "emoji": "🎶",
      "phonemes": "ks"
    },
    "Y": {
      "name": "i griega",
      "sound": "ya",
      "word": "Yo-yo",
      "emoji": "🪀"
    },
    "Z": {
      "name": "zeta",
      "sound": "sss",
      "word": "Zapato",
      "emoji": "👟",
      "phonemes": "sː"
    }
  },
  "say": {
    "menu": [
      "¡Hola! Soy Tux. ¿A qué querés jugar?",
      "¡Qué lindo verte! Elegí un juego",
      "¡Hola, amigo! Tocá el juego que quieras",
      "Vamos a jugar. ¿Cuál elegís?"
    ],
    "hello": [
      "¡Hola! Soy Tux. Apretá cualquier tecla",
      "¡Hola, amigo! Apretá una tecla y jugamos",
      "¡Qué alegría verte! Apretá una tecla para empezar",
      "¡Hola! Vamos a jugar. Apretá una tecla"
    ],
    "idle": [
      "Apretá otra tecla",
      "¿Probamos con otra?",
      "Elegí otra tecla",
      "Tu turno, apretá una tecla",
      "¿Cuál sigue?"
    ],
    "letterIntro": [
      "{{sound}}, {{sound}}, {{sound}}. {{name}} de {{word}}",
      "{{sound}}, {{sound}}. Es {{kind}} {{name}}, de {{word}}",
      "Escuchá: {{sound}}, {{sound}}. {{name}} de {{word}}",
      "{{sound}}, {{sound}}, {{sound}}. Esta es {{kind}} {{name}}, como en {{word}}"
    ],
    "numberIntro": [
      "Este es {{kind}} {{name}}",
      "Mirá, {{kind}} {{name}}",
      "Apretaste {{kind}} {{name}}",
      "Ese es {{kind}} {{name}}"
    ],
    "numberCount": [
      "Contemos juntos",
      "¡Vamos a contar!",
      "Contemos las estrellas",
      "Cuento con vos"
    ],
    "numberTotal": [
      "En total, {{name}}",
      "Son {{name}}",
      "{{name}} en total",
      "Entonces, {{name}}"
    ],
    "numberZero": [
      "No hay ninguna estrella. Cero es nada",
      "Cero: ¡no hay nada!",
      "Cero quiere decir que no hay ninguna",
      "Mirá, no hay estrellas. Eso es cero"
    ],
    "ask": [
      "Ahora apretá {{kind}} {{name}}",
      "Tu turno: buscá {{kind}} {{name}}",
      "¿Me ayudás a apretar {{kind}} {{name}}?",
      "Buscá {{kind}} {{name}} en el teclado",
      "Ahora vos: apretá {{kind}} {{name}}"
    ],
    "wrong": [
      "Probemos juntos. Buscá {{kind}} {{name}}",
      "Casi. Buscá {{kind}} {{name}}",
      "No pasa nada. Probá de nuevo con {{kind}} {{name}}",
      "¡Uy! Esa es otra. Buscá {{kind}} {{name}}",
      "Seguí buscando, ya casi. Es {{kind}} {{name}}"
    ],
    "wrongHint": [
      "Te ayudo: es la tecla que quedó marcada",
      "Mirá, te dejo una sola tecla. Apretala",
      "Es esta que quedó. Apretala vos",
      "Ahora sí, hay una sola. Probá con esa"
    ],
    "right": [
      "¡Buenísimo! Ahora sigamos",
      "¡Muy bien! ¡Eso es! Sigamos",
      "¡Genial! Vamos por otra",
      "¡Lo lograste! Sigamos jugando",
      "¡Excelente! Otra más"
    ],
    "findAsk": [
      "¿Dónde está {{kind}} {{name}}?",
      "Mostrame {{kind}} {{name}}",
      "¿Me ayudás a encontrar {{kind}} {{name}}?",
      "Buscá {{kind}} {{name}}",
      "A ver, ¿cuál es {{kind}} {{name}}?"
    ],
    "findWrong": [
      "Esa no es. Probemos de nuevo: {{kind}} {{name}}",
      "Casi. Buscá {{kind}} {{name}}",
      "¡Uy! Mirá bien: {{kind}} {{name}}",
      "Tranquilo, probá otra vez: {{kind}} {{name}}",
      "Seguí buscando. Es {{kind}} {{name}}"
    ],
    "traceAsk": [
      "Vamos a dibujar {{kind}} {{name}} con el dedo",
      "Seguí con el dedo {{kind}} {{name}}",
      "Pintá {{kind}} {{name}} despacito",
      "Dibujemos juntos {{kind}} {{name}}"
    ],
    "traceKeepGoing": [
      "Despacito, por encima de la forma. Probemos de nuevo",
      "Casi. Pintemos solo arriba de la forma",
      "Empecemos de nuevo, con calma",
      "Sin apuro. Otra vez, siguiendo la forma"
    ],
    "breakWalk": [
      "Ya jugamos un ratito. ¿Salimos a caminar un poco para despejarnos?",
      "¡Qué bien jugás! Es un buen momento para dar una vuelta caminando",
      "Descansemos la vista. ¿Una caminata cortita?"
    ],
    "breakPlay": [
      "¡Jugamos un montón! Ahora andá a jugar con tus muñecos o a pasear en bici. ¡Hasta luego!",
      "¡Terminamos por hoy! Salí a andar en bici o jugá con tus muñecos. ¡Hasta mañana!",
      "¡Qué lindo rato! Ahora es hora de moverse: bici, muñecos o lo que más te guste. ¡Chau!"
    ]
  }
};
