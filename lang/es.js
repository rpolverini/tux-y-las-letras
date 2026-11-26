/* Textos en español. Es JavaScript (no JSON) para que funcione con doble clic, sin servidor.
   Para otro idioma: copiar a lang/en.js, traducir, y abrir la página con ?lang=en */
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
    "start": "Tocá para empezar",
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
      "word": "Abeja",
      "emoji": "🐝"
    },
    "B": {
      "name": "be",
      "word": "Ballena",
      "emoji": "🐳"
    },
    "C": {
      "name": "ce",
      "word": "Casa",
      "emoji": "🏠"
    },
    "D": {
      "name": "de",
      "word": "Dado",
      "emoji": "🎲"
    },
    "E": {
      "name": "e",
      "word": "Elefante",
      "emoji": "🐘"
    },
    "F": {
      "name": "efe",
      "word": "Flor",
      "emoji": "🌸"
    },
    "G": {
      "name": "ge",
      "word": "Gato",
      "emoji": "🐱"
    },
    "H": {
      "name": "hache",
      "word": "Helado",
      "emoji": "🍦"
    },
    "I": {
      "name": "i",
      "word": "Iglesia",
      "emoji": "⛪"
    },
    "J": {
      "name": "jota",
      "word": "Jirafa",
      "emoji": "🦒"
    },
    "K": {
      "name": "ka",
      "word": "Koala",
      "emoji": "🐨"
    },
    "L": {
      "name": "ele",
      "word": "León",
      "emoji": "🦁"
    },
    "M": {
      "name": "eme",
      "word": "Mariposa",
      "emoji": "🦋"
    },
    "N": {
      "name": "ene",
      "word": "Nube",
      "emoji": "☁️"
    },
    "Ñ": {
      "name": "eñe",
      "word": "Ñandú",
      "emoji": "🐦"
    },
    "O": {
      "name": "o",
      "word": "Oso",
      "emoji": "🐻"
    },
    "P": {
      "name": "pe",
      "word": "Perro",
      "emoji": "🐶"
    },
    "Q": {
      "name": "cu",
      "word": "Queso",
      "emoji": "🧀"
    },
    "R": {
      "name": "erre",
      "word": "Ratón",
      "emoji": "🐭"
    },
    "S": {
      "name": "ese",
      "word": "Sol",
      "emoji": "☀️"
    },
    "T": {
      "name": "te",
      "word": "Tortuga",
      "emoji": "🐢"
    },
    "U": {
      "name": "u",
      "word": "Uva",
      "emoji": "🍇"
    },
    "V": {
      "name": "uve",
      "word": "Vaca",
      "emoji": "🐄"
    },
    "W": {
      "name": "doble ve",
      "word": "Waffle",
      "emoji": "🧇"
    },
    "X": {
      "name": "equis",
      "word": "Xilófono",
      "emoji": "🎶"
    },
    "Y": {
      "name": "i griega",
      "word": "Yo-yo",
      "emoji": "🪀"
    },
    "Z": {
      "name": "zeta",
      "word": "Zapato",
      "emoji": "👟"
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
      "{{name}} de {{word}}",
      "Es {{kind}} {{name}}, de {{word}}",
      "Esta es {{kind}} {{name}}, como en {{word}}",
      "Mirá: {{name}} de {{word}}"
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
