import {
  EducationLevel,
  ExerciseKind,
  Prisma,
  PrismaClient,
} from "@prisma/client";

const prisma = new PrismaClient();

const subjects = [
  {
    slug: "math",
    name: "Matemáticas",
    description:
      "Clasificar, descubrir patrones, contar, comparar, juntar y sacar — con juegos visuales.",
    icon: "🧮",
    color: "sun",
    order: 1,
    isActive: true,
  },
  {
    slug: "reading",
    name: "Lectura",
    description: "Letras, palabras y comprensión.",
    icon: "📖",
    color: "mint",
    order: 2,
    isActive: true,
  },
  {
    slug: "science",
    name: "Ciencias",
    description: "Naturaleza, espacio y experimentos.",
    icon: "🔬",
    color: "sky",
    order: 3,
    isActive: false,
  },
  {
    slug: "english",
    name: "Inglés",
    description: "Vocabulario, pronunciación y frases.",
    icon: "🗣️",
    color: "lilac",
    order: 4,
    isActive: false,
  },
];

const paths = [
  {
    subjectSlug: "math",
    slug: "math-initial-nel",
    name: "Inicial · Aventura con Paskalito",
    description:
      "Clasificar, descubrir patrones, contar, comparar, juntar y sacar — paso a paso con Paskalito.",
    level: EducationLevel.INITIAL,
    difficulty: 1,
    isPremium: true,
    order: 1,
  },
  {
    subjectSlug: "math",
    slug: "math-number-tracing",
    name: "Trazos de números",
    description: "Practica escribir los números del 0 al 9 con el dedo.",
    level: EducationLevel.INITIAL,
    difficulty: 1,
    isPremium: true,
    order: 2,
  },
  {
    subjectSlug: "math",
    slug: "math-primary-1",
    name: "1.º grado · Matemática con Paskalito",
    description:
      "Números hasta 100, valor posicional, sumar, restar, medir, leer datos y resolver problemas.",
    level: EducationLevel.PRIMARY,
    grade: 1,
    difficulty: 2,
    isPremium: true,
    order: 3,
  },
  {
    subjectSlug: "math",
    slug: "math-primary-2",
    name: "2.º grado · Matemática con Paskalito",
    description:
      "Números hasta 1000, multiplicación, división, fracciones, dinero, medición y estadística.",
    level: EducationLevel.PRIMARY,
    grade: 2,
    difficulty: 3,
    isPremium: true,
    order: 4,
  },
  {
    subjectSlug: "reading",
    slug: "reading-initial",
    name: "Lectura inicial",
    description: "Letras, sonidos y primeras palabras.",
    level: EducationLevel.INITIAL,
    difficulty: 1,
    isPremium: true,
    order: 1,
  },
  {
    subjectSlug: "reading",
    slug: "reading-letter-tracing",
    name: "Trazos de letras",
    description: "Reconoce y traza vocales en imprenta mayúscula con el dedo.",
    level: EducationLevel.INITIAL,
    difficulty: 1,
    isPremium: true,
    order: 2,
  },
];

const units = [
  {
    pathSlug: "math-initial-nel",
    slug: "antes-de-contar",
    title: "Antes de contar",
    description:
      "Emparejar, clasificar, comparar, ordenar y descubrir patrones.",
    order: 1,
    color: "peach",
    icon: "🧩",
  },
  {
    pathSlug: "math-initial-nel",
    slug: "contar-tocando-1-5",
    title: "Contar tocando 1-5",
    description:
      "Contar uno por uno, en orden, y descubrir que el último número dice cuántos hay.",
    order: 2,
    color: "mint",
    icon: "🔢",
  },
  {
    pathSlug: "math-initial-nel",
    slug: "contar-hasta-10",
    title: "Contar hasta 10",
    description: "Seguir contando, reconocer grupos y ordenar hasta 10.",
    order: 3,
    color: "sky",
    icon: "🔟",
  },
  {
    pathSlug: "math-initial-nel",
    slug: "sentido-numerico",
    title: "Sentido numérico",
    description:
      "Ver cantidades, comparar grupos y descubrir partes dentro de un todo.",
    order: 4,
    color: "lilac",
    icon: "🧠",
  },
  {
    pathSlug: "math-initial-nel",
    slug: "primeras-sumas",
    title: "Primeras sumas",
    description: "Juntar grupos para descubrir cuántos hay en total.",
    order: 5,
    color: "sun",
    icon: "➕",
  },
  {
    pathSlug: "math-initial-nel",
    slug: "primeras-restas",
    title: "Primeras restas",
    description: "Sacar objetos de un grupo y contar los que quedan.",
    order: 6,
    color: "rose",
    icon: "➖",
  },
  {
    pathSlug: "math-number-tracing",
    slug: "conocer-el-cero",
    title: "Conocer el 0",
    description:
      "Descubrir que cero significa que no hay nada y practicar su trazo redondo.",
    order: 1,
    color: "mint",
    icon: "0️⃣",
  },
  {
    pathSlug: "math-number-tracing",
    slug: "trazos-1-3",
    title: "Trazar 1, 2 y 3",
    description: "Números pequeños con líneas y curvas simples.",
    order: 2,
    color: "sky",
    icon: "✏️",
  },
  {
    pathSlug: "math-number-tracing",
    slug: "trazos-4-5",
    title: "Trazar 4 y 5",
    description: "Practicar cambios de dirección y curvas cortas.",
    order: 3,
    color: "sun",
    icon: "4️⃣",
  },
  {
    pathSlug: "math-number-tracing",
    slug: "trazos-6-7",
    title: "Trazar 6 y 7",
    description: "Unir curvas y líneas largas con control del dedo.",
    order: 4,
    color: "peach",
    icon: "6️⃣",
  },
  {
    pathSlug: "math-number-tracing",
    slug: "trazos-8-9",
    title: "Trazar 8 y 9",
    description: "Números con curvas más retadoras para practicar despacio.",
    order: 5,
    color: "lilac",
    icon: "8️⃣",
  },
  {
    pathSlug: "math-primary-1",
    slug: "p1-numeros-hasta-20",
    title: "Números hasta 20",
    description: "Contar, leer, comparar, ordenar y ubicar números hasta 20.",
    order: 1,
    color: "sky",
    icon: "🔢",
  },
  {
    pathSlug: "math-primary-1",
    slug: "p1-decenas-unidades",
    title: "Decenas y unidades",
    description: "Formar números hasta 100 con grupos de diez y unidades.",
    order: 2,
    color: "mint",
    icon: "🧱",
  },
  {
    pathSlug: "math-primary-1",
    slug: "p1-sumas-restas",
    title: "Sumar y restar",
    description: "Juntar, sacar y ver la relación entre suma y resta.",
    order: 3,
    color: "sun",
    icon: "➕",
  },
  {
    pathSlug: "math-primary-1",
    slug: "p1-grupos-iguales",
    title: "Grupos iguales",
    description: "Primeras ideas de multiplicar y dividir con objetos.",
    order: 4,
    color: "peach",
    icon: "🧺",
  },
  {
    pathSlug: "math-primary-1",
    slug: "p1-medicion-tiempo-dinero",
    title: "Medir, tiempo y dinero",
    description: "Comparar longitudes, leer horas y contar monedas.",
    order: 5,
    color: "lilac",
    icon: "📏",
  },
  {
    pathSlug: "math-primary-1",
    slug: "p1-formas-y-datos",
    title: "Formas y datos",
    description: "Reconocer figuras, construir dibujos y leer pictogramas.",
    order: 6,
    color: "rose",
    icon: "🔷",
  },
  // ── 2.º GRADO ────────────────────────────────────────────────────────────
  {
    pathSlug: "math-primary-2",
    slug: "p2-numeros-hasta-1000",
    title: "Números hasta el 1000",
    description: "Contar, leer, comparar y ordenar números hasta el 1000.",
    order: 1,
    color: "sky",
    icon: "🔢",
  },
  {
    pathSlug: "math-primary-2",
    slug: "p2-suma-resta",
    title: "Suma y resta",
    description: "Algoritmos y cálculo mental con números de hasta 3 dígitos.",
    order: 2,
    color: "mint",
    icon: "➕",
  },
  {
    pathSlug: "math-primary-2",
    slug: "p2-multiplicacion",
    title: "Multiplicación",
    description: "Tablas del 2 al 10 y el significado de multiplicar.",
    order: 3,
    color: "sun",
    icon: "✖️",
  },
  {
    pathSlug: "math-primary-2",
    slug: "p2-division",
    title: "División",
    description: "Repartir en grupos iguales y la relación con la multiplicación.",
    order: 4,
    color: "peach",
    icon: "➗",
  },
  {
    pathSlug: "math-primary-2",
    slug: "p2-fracciones",
    title: "Fracciones",
    description: "Partes de un entero, notación y operaciones con fracciones.",
    order: 5,
    color: "lilac",
    icon: "🍕",
  },
  {
    pathSlug: "math-primary-2",
    slug: "p2-dinero",
    title: "Dinero",
    description: "Contar soles y céntimos, leer precios y hacer cambios.",
    order: 6,
    color: "sun",
    icon: "💰",
  },
  {
    pathSlug: "math-primary-2",
    slug: "p2-medicion",
    title: "Medición",
    description: "Longitud, masa y volumen con unidades del sistema métrico.",
    order: 7,
    color: "mint",
    icon: "📏",
  },
  {
    pathSlug: "math-primary-2",
    slug: "p2-el-tiempo",
    title: "El tiempo",
    description: "Leer el reloj al minuto y convertir horas a minutos.",
    order: 8,
    color: "sky",
    icon: "🕐",
  },
  {
    pathSlug: "math-primary-2",
    slug: "p2-formas",
    title: "Formas 2D y 3D",
    description: "Patrones con figuras planas e identificación de sólidos.",
    order: 9,
    color: "rose",
    icon: "🔷",
  },
  {
    pathSlug: "math-primary-2",
    slug: "p2-estadistica",
    title: "Estadística",
    description: "Leer e interpretar pictogramas con escala.",
    order: 10,
    color: "peach",
    icon: "📊",
  },
  // ─────────────────────────────────────────────────────────────────────────
  {
    pathSlug: "reading-initial",
    slug: "letras-sonidos",
    title: "Letras y sonidos",
    description: "Reconocé las letras y los sonidos de cada una",
    order: 1,
    color: "mint",
    icon: "🔤",
  },
  {
    pathSlug: "reading-initial",
    slug: "primeras-palabras",
    title: "Primeras palabras",
    description: "Identifica palabras simples y sus imágenes",
    order: 2,
    color: "lilac",
    icon: "📚",
  },
  {
    pathSlug: "reading-letter-tracing",
    slug: "vocales-mayusculas",
    title: "Vocales mayúsculas",
    description: "Trazar A, E, I, O y U en imprenta mayúscula.",
    order: 1,
    color: "mint",
    icon: "✏️",
  },
];

const lessons = [
  [
    "antes-de-contar",
    "emparejar-iguales",
    "Prueba gratis con Paskalito",
    1,
    26,
    6,
  ],
  ["antes-de-contar", "clasificar-por-color", "Canastas de colores", 2, 24, 6],
  [
    "antes-de-contar",
    "clasificar-por-tamano-forma",
    "Pequeños, grandes y formas",
    3,
    24,
    6,
  ],
  ["antes-de-contar", "ordenar-objetos", "El tren de los tamaños", 4, 26, 6],
  [
    "antes-de-contar",
    "detectives-de-patrones",
    "Detectives de patrones",
    5,
    28,
    7,
  ],
  ["contar-tocando-1-5", "uno-a-uno", "Un toque, un número", 1, 22, 5],
  [
    "contar-tocando-1-5",
    "orden-estable",
    "La canción de los números",
    2,
    22,
    5,
  ],
  ["contar-tocando-1-5", "cardinalidad", "El último dice cuántos", 3, 24, 6],
  [
    "contar-tocando-1-5",
    "contar-desde-cualquier-lado",
    "Contar desde cualquier lado",
    4,
    24,
    6,
  ],
  [
    "contar-tocando-1-5",
    "repaso-contar-1-5",
    "Repaso 1 al 5",
    5,
    28,
    7,
  ],
  ["contar-hasta-10", "contar-6-7-8", "Contar 6, 7, 8", 1, 26, 6],
  ["contar-hasta-10", "contar-9-10", "Contar 9 y 10", 2, 26, 6],
  ["contar-hasta-10", "ordenar-hasta-10", "Ordenar hasta 10", 3, 28, 7],
  ["contar-hasta-10", "tarjetas-de-puntos", "Tarjetas de puntos", 4, 30, 7],
  ["contar-hasta-10", "repaso-hasta-10", "Repaso hasta 10", 5, 32, 8],
  ["sentido-numerico", "cuantos-viste", "¿Cuántos viste?", 1, 30, 7],
  ["sentido-numerico", "dados-y-dominos", "Dados y dominós", 2, 30, 7],
  [
    "sentido-numerico",
    "mago-de-las-cantidades",
    "El mago de las cantidades",
    3,
    30,
    7,
  ],
  ["sentido-numerico", "donde-hay-mas", "¿Dónde hay más?", 4, 30, 7],
  ["sentido-numerico", "maquina-de-partes", "La máquina de partes", 5, 32, 8],
  ["primeras-sumas", "juntar-grupos", "Juntar grupos", 1, 28, 7],
  ["primeras-sumas", "sumar-hasta-5", "Sumar hasta 5", 2, 30, 7],
  ["primeras-sumas", "sumar-hasta-10", "Sumar hasta 10", 3, 32, 8],
  ["primeras-sumas", "repaso-sumas", "Repaso de sumas", 4, 34, 8],
  ["primeras-restas", "sacar-cosas", "Saca y cuenta", 1, 30, 7],
  ["primeras-restas", "restar-hasta-10", "Restar hasta 10", 2, 32, 8],
  ["primeras-restas", "repaso-restas", "Repaso de restas", 3, 36, 8],
  ["conocer-el-cero", "trazar-0", "Trazar 0", 1, 24, 6],
  ["trazos-1-3", "trazar-1", "Trazar 1", 1, 24, 6],
  ["trazos-1-3", "trazar-2", "Trazar 2", 2, 24, 6],
  ["trazos-1-3", "trazar-3", "Trazar 3", 3, 24, 6],
  ["trazos-4-5", "trazar-4", "Trazar 4", 1, 24, 6],
  ["trazos-4-5", "trazar-5", "Trazar 5", 2, 24, 6],
  ["trazos-6-7", "trazar-6", "Trazar 6", 1, 26, 6],
  ["trazos-6-7", "trazar-7", "Trazar 7", 2, 26, 6],
  ["trazos-8-9", "trazar-8", "Trazar 8", 1, 26, 6],
  ["trazos-8-9", "trazar-9", "Trazar 9", 2, 26, 6],
  ["p1-numeros-hasta-20", "contar-hasta-20", "Prueba gratis: contar hasta 20", 1, 32, 7],
  ["p1-numeros-hasta-20", "leer-numeros-20", "Leer números hasta 20", 2, 30, 7],
  ["p1-numeros-hasta-20", "comparar-hasta-20", "Comparar hasta 20", 3, 32, 7],
  ["p1-numeros-hasta-20", "ordinales-primero-decimo", "Primero a décimo", 4, 32, 7],
  ["p1-decenas-unidades", "hacer-una-decena", "Hacer una decena", 1, 30, 7],
  ["p1-decenas-unidades", "valor-posicional", "Valor posicional", 2, 32, 8],
  ["p1-decenas-unidades", "ordenar-hasta-100", "Ordenar hasta 100", 3, 34, 8],
  ["p1-decenas-unidades", "patrones-numericos", "Patrones numéricos", 4, 34, 8],
  ["p1-sumas-restas", "sumar-hasta-20", "Sumar hasta 20", 1, 34, 8],
  ["p1-sumas-restas", "restar-hasta-20", "Restar hasta 20", 2, 34, 8],
  ["p1-sumas-restas", "sumar-restar-hasta-100", "Sumar y restar decenas", 3, 36, 8],
  ["p1-sumas-restas", "familias-de-hechos", "Familias de suma y resta", 4, 36, 8],
  ["p1-grupos-iguales", "contar-grupos-iguales", "Contar grupos iguales", 1, 34, 8],
  ["p1-grupos-iguales", "arreglos-y-filas", "Filas y columnas", 2, 34, 8],
  ["p1-grupos-iguales", "repartir-en-partes-iguales", "Repartir en partes iguales", 3, 36, 8],
  ["p1-medicion-tiempo-dinero", "contar-dinero", "Contar dinero", 1, 32, 7],
  ["p1-medicion-tiempo-dinero", "comparar-longitudes", "Comparar longitudes", 2, 32, 7],
  ["p1-medicion-tiempo-dinero", "leer-horas", "Leer horas", 3, 32, 7],
  ["p1-formas-y-datos", "formas-2d", "Figuras 2D", 1, 32, 7],
  ["p1-formas-y-datos", "crear-figuras", "Crear figuras", 2, 34, 8],
  ["p1-formas-y-datos", "leer-pictogramas", "Leer pictogramas", 3, 34, 8],
  ["p1-formas-y-datos", "repaso-primer-grado-1", "Repaso de 1.º grado", 4, 38, 9],
  // ── 2.º GRADO ─────────────────────────────────────────────────────────────
  // Unit: p2-numeros-hasta-1000
  ["p2-numeros-hasta-1000", "prueba-gratis-p2",        "Prueba gratis: hasta el 1000",        1, 34, 8],
  ["p2-numeros-hasta-1000", "contar-decenas-centenas",  "Contar en decenas y centenas",        2, 32, 7],
  ["p2-numeros-hasta-1000", "valor-posicional-1000",    "Valor posicional hasta 1000",         3, 34, 8],
  ["p2-numeros-hasta-1000", "leer-escribir-1000",       "Leer y escribir hasta 1000",          4, 34, 8],
  ["p2-numeros-hasta-1000", "comparar-ordenar-1000",    "Comparar y ordenar hasta 1000",       5, 34, 8],
  ["p2-numeros-hasta-1000", "pares-impares-patrones",   "Patrones, pares e impares",           6, 36, 8],
  // Unit: p2-suma-resta
  ["p2-suma-resta", "algoritmo-3-digitos",    "Sumar y restar hasta 3 dígitos",    1, 36, 8],
  ["p2-suma-resta", "calculo-mental-sr",      "Cálculo mental con centenas",       2, 36, 9],
  // Unit: p2-multiplicacion
  ["p2-multiplicacion", "grupos-iguales-mult",     "Grupos iguales: la idea de multiplicar", 1, 34, 8],
  ["p2-multiplicacion", "tablas-2-5-10",           "Tablas del 2, 5 y 10",                   2, 36, 8],
  ["p2-multiplicacion", "tablas-3-4",              "Tablas del 3 y el 4",                    3, 36, 8],
  ["p2-multiplicacion", "arreglos-filas-columnas", "Filas y columnas",                       4, 38, 9],
  ["p2-multiplicacion", "calculo-mental-mult",     "Cálculo mental: multiplicar",            5, 38, 9],
  // Unit: p2-division
  ["p2-division", "repartir-grupos-iguales", "Repartir en grupos iguales",                        1, 34, 8],
  ["p2-division", "mult-y-div-juntas",       "Multiplicación y división: familia de hechos",      2, 36, 8],
  ["p2-division", "calculo-mental-div",      "Cálculo mental: dividir",                           3, 38, 9],
  // Unit: p2-fracciones
  ["p2-fracciones", "parte-de-un-entero",      "Fracción de un entero",               1, 34, 7],
  ["p2-fracciones", "notacion-fracciones",     "Leer y escribir fracciones",          2, 34, 8],
  ["p2-fracciones", "comparar-fracciones",     "Comparar fracciones",                 3, 36, 8],
  ["p2-fracciones", "sumar-restar-fracciones", "Sumar y restar fracciones similares", 4, 38, 9],
  // Unit: p2-dinero
  ["p2-dinero", "contar-soles-centimos",  "Contar soles y céntimos",              1, 32, 7],
  ["p2-dinero", "leer-precios",           "Leer y escribir precios",              2, 32, 7],
  ["p2-dinero", "comparar-montos",        "Comparar cantidades de dinero",        3, 34, 8],
  ["p2-dinero", "convertir-soles",        "Convertir soles a céntimos y viceversa", 4, 36, 8],
  // Unit: p2-medicion
  ["p2-medicion", "longitud-masa-volumen", "Medir longitud, masa y volumen", 1, 32, 7],
  ["p2-medicion", "unidades-m-kg-l",       "Unidades: m, g, kg y L",         2, 32, 7],
  ["p2-medicion", "comparar-medidas",      "Comparar y ordenar medidas",     3, 34, 8],
  // Unit: p2-el-tiempo
  ["p2-el-tiempo", "hora-al-minuto",         "La hora al minuto",                      1, 32, 7],
  ["p2-el-tiempo", "horas-y-minutos",        "Horas y minutos",                        2, 32, 7],
  ["p2-el-tiempo", "convertir-horas-minutos","Convertir horas a minutos y viceversa",  3, 34, 8],
  // Unit: p2-formas
  ["p2-formas", "patrones-2d", "Patrones con figuras 2D",        1, 32, 7],
  ["p2-formas", "solidos-3d",  "Sólidos 3D: identificar y clasificar", 2, 32, 7],
  // Unit: p2-estadistica
  ["p2-estadistica", "pictogramas-escala", "Pictogramas con escala", 1, 34, 8],
  // ─────────────────────────────────────────────────────────────────────────
  ["letras-sonidos", "reconocer-vocales", "Prueba gratis: vocales", 1, 26, 6],
  ["letras-sonidos", "contar-letras", "Contar letras", 2, 25, 6],
  ["primeras-palabras", "imagen-palabra", "¿Qué dice la imagen?", 1, 25, 6],
  ["vocales-mayusculas", "trazar-a", "Trazar A", 1, 24, 6],
  ["vocales-mayusculas", "trazar-e", "Trazar E", 2, 24, 6],
  ["vocales-mayusculas", "trazar-i", "Trazar I", 3, 24, 6],
  ["vocales-mayusculas", "trazar-o", "Trazar O", 4, 24, 6],
  ["vocales-mayusculas", "trazar-u", "Trazar U", 5, 24, 6],
] as const;

type ExerciseSeed = Omit<Prisma.ExerciseCreateManyInput, "lessonId">;
type ExS = Omit<ExerciseSeed, "order">;
type Beat = { emoji: string; repeat?: number; text: string };
type TryIt = { emoji: string; count: number; text: string; successText: string };

// ─── Builders (mismo estilo que seed.ts, para seed-content no-destructivo) ───

function lumi(beats: Beat[], tryIt?: TryIt): ExS {
  return {
    kind: ExerciseKind.TEACH,
    prompt: "",
    payload: { teach: { beats, tryIt } } as Prisma.InputJsonValue,
    solution: {},
    difficulty: 1,
    xpReward: 0,
  };
}

function placeValue(
  config: { hundreds?: number; tens?: number; ones?: number },
  opts: number[],
  prompt = "¿Cuánto vale este número?",
): ExS {
  const parts: string[] = [];
  if (config.hundreds) parts.push(`${config.hundreds} centena${config.hundreds > 1 ? "s" : ""}`);
  if (config.tens)     parts.push(`${config.tens} decena${config.tens > 1 ? "s" : ""}`);
  if ((config.ones ?? 0) > 0) parts.push(`${config.ones} unidad${(config.ones ?? 0) > 1 ? "es" : ""}`);
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt,
    payload: { visual: "place-value", ...config, options: opts } as Prisma.InputJsonValue,
    solution: { answer: opts[0] },
    hints: ["Cuenta primero las centenas, luego las decenas, luego las unidades.", parts.join(" + ") + "."],
    explanation: `${parts.join(" + ")} = ${opts[0]}.`,
    difficulty: (config.hundreds ?? 0) > 0 ? 2 : 1,
    xpReward: 7,
  };
}

function numberLineGap(
  sequence: (number | null)[],
  choices: number[],
  step: number,
  prompt = "Pon el número que falta en la recta.",
): ExS {
  const answer = choices[0];
  return {
    kind: ExerciseKind.DRAG_DROP,
    prompt,
    payload: { visual: "number-line-input", sequence, choices, step } as Prisma.InputJsonValue,
    solution: { answer },
    hints: [`La secuencia salta de ${step} en ${step}.`, "Mira el número anterior y el siguiente."],
    explanation: `Falta el ${answer}. La recta avanza de ${step} en ${step}.`,
    difficulty: step >= 100 ? 2 : 1,
    xpReward: 7,
  };
}

function numPattern(visible: number[], step: number, opts: number[]): ExS {
  const answer = opts[0];
  const absStep = Math.abs(step);
  const last = visible[visible.length - 1];
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: "¿Qué número sigue?",
    payload: { visual: "pattern", visible, step, options: opts } as Prisma.InputJsonValue,
    solution: { answer },
    hints: ["¿De cuánto en cuánto cambia la secuencia?", `${last} ${step > 0 ? "+" : "−"} ${absStep} = ?`],
    explanation: `Sigue el ${answer}. El patrón ${step > 0 ? "suma" : "resta"} ${absStep} cada vez.`,
    difficulty: step < 0 ? 3 : 2,
    xpReward: 7,
  };
}

function compareNums(left: number, right: number, prompt = "¿Cuál es mayor?"): ExS {
  const answer: "izquierda" | "derecha" | "igual" =
    left === right ? "igual" : left > right ? "izquierda" : "derecha";
  const sameH = Math.floor(left / 100) === Math.floor(right / 100);
  const sameT = Math.floor(left / 10)  === Math.floor(right / 10);
  const hints = !sameH
    ? ["Mira las centenas de cada número.", "Mayor centena → mayor número."]
    : !sameT
      ? ["Las centenas son iguales.", "Mira las decenas ahora."]
      : ["Centenas y decenas son iguales.", "Mira las unidades."];
  const bigger  = Math.max(left, right);
  const smaller = Math.min(left, right);
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt,
    payload: { visual: "compare", left, right, options: ["izquierda", "derecha", "igual"] } as Prisma.InputJsonValue,
    solution: { answer },
    hints,
    explanation: answer === "igual" ? `${left} y ${right} son iguales.` : `${bigger} > ${smaller}.`,
    difficulty: !sameH ? 1 : !sameT ? 2 : 3,
    xpReward: 7,
  };
}

function sortNums(numbers: number[], prompt = "Ordena de menor a mayor."): ExS {
  const sequence = [...numbers].sort((a, b) => a - b);
  return {
    kind: ExerciseKind.SORT,
    prompt,
    payload: { numbers } as Prisma.InputJsonValue,
    solution: { sequence },
    hints: ["Mira el primer dígito de cada número.", "El que tiene menos centenas va primero."],
    explanation: `En orden: ${sequence.join(", ")}.`,
    difficulty: numbers.length <= 3 ? 2 : 3,
    xpReward: numbers.length <= 3 ? 8 : 10,
  };
}

function parityNum(value: number): ExS {
  const last   = value % 10;
  const answer = last % 2 === 0 ? "Par" : "Impar";
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `¿El ${value} es par o impar?`,
    payload: { visual: "parity", value, options: ["Par", "Impar"] } as Prisma.InputJsonValue,
    solution: { answer },
    hints: ["Mira solo el último dígito.", `Termina en ${last} → ${answer.toLowerCase()}.`],
    explanation: `${value} es ${answer.toLowerCase()} porque termina en ${last}.`,
    difficulty: value < 100 ? 1 : 2,
    xpReward: 6,
  };
}

function digitQuestion(digit: number, prompt: string, opts: number[]): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt,
    payload: { visual: "number-card", digit, options: opts } as Prisma.InputJsonValue,
    solution: { answer: opts[0] },
    hints: ["Mira cada dígito del número.", "Cuenta la posición desde la izquierda."],
    explanation: `En ${digit}, la respuesta es ${opts[0]}.`,
    difficulty: 2,
    xpReward: 7,
  };
}

function inputPlaceValue(
  config: { hundreds?: number; tens?: number; ones?: number },
  answer: number,
): ExS {
  const parts: string[] = [];
  if (config.hundreds) parts.push(`${config.hundreds} centena${config.hundreds > 1 ? "s" : ""}`);
  if (config.tens)     parts.push(`${config.tens} decena${config.tens > 1 ? "s" : ""}`);
  if ((config.ones ?? 0) > 0) parts.push(`${config.ones} unidad${(config.ones ?? 0) > 1 ? "es" : ""}`);
  return {
    kind: ExerciseKind.INPUT,
    prompt: `Escribe el número: ${parts.join(", ")}.`,
    payload: { visual: "place-value", ...config, inputType: "numeric" } as Prisma.InputJsonValue,
    solution: { answer },
    hints: [parts[0] ?? "Cuenta los bloques.", "Centenas + decenas + unidades."],
    explanation: `${parts.join(" + ")} = ${answer}.`,
    difficulty: 3,
    xpReward: 9,
  };
}

function paritySort(items: { id: string; category: "par" | "impar" }[]): ExS {
  const parIds   = items.filter(i => i.category === "par").map(i => i.id);
  const imparIds = items.filter(i => i.category === "impar").map(i => i.id);
  return {
    kind: ExerciseKind.DRAG_DROP,
    prompt: "Pon cada número en el grupo correcto.",
    payload: {
      visual: "sort-attribute",
      attribute: "parity",
      items: items.map(i => ({ id: i.id, emoji: i.id, category: i.category })),
      categories: [
        { id: "par",   label: "Par",   emoji: "👥" },
        { id: "impar", label: "Impar", emoji: "1️⃣" },
      ],
    } as Prisma.InputJsonValue,
    solution: { groups: { par: parIds, impar: imparIds } },
    hints: ["Mira solo el último dígito.", "Par: termina en 0,2,4,6,8."],
    explanation: `Pares: ${parIds.join(", ")}. Impares: ${imparIds.join(", ")}.`,
    difficulty: 3,
    xpReward: 10,
  };
}

// ─── Builders adicionales (Unidades 2-10) ────────────────────────────────────

// ── Vínculo numérico (Singapore Math number bond) ──────────────────────────
// partA / partB / whole = null → es el "?" que el niño debe encontrar.
// opts: las 3 opciones que se muestran como botones (strings para la interfaz).
function numBond(
  whole: number | null,
  partA: number | null,
  partB: number | null,
  opts: string[],
  prompt?: string,
): ExS {
  const answer = whole === null
    ? String((partA ?? 0) + (partB ?? 0))
    : partA === null
    ? String(whole - (partB ?? 0))
    : String(whole - (partA ?? 0));
  const knownA = partA ?? Number(answer);
  const knownB = partB ?? Number(answer);
  const knownW = whole ?? Number(answer);
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: prompt ?? `Completa el vínculo numérico.`,
    payload: {
      visual: "number-bond",
      whole,
      partA,
      partB,
      options: opts,
    } as Prisma.InputJsonValue,
    solution: { answer },
    hints: [
      whole === null
        ? `${knownA} + ${knownB} = ?`
        : `${knownW} − ${partB ?? knownB} = ?`,
      `La respuesta es ${answer}.`,
    ],
    explanation: `${knownA} + ${knownB} = ${knownW}.`,
    difficulty: 2,
    xpReward: 8,
  };
}

// ── Balanza (comparación visual) ────────────────────────────────────────────
// La balanza se inclina hacia el lado más pesado. El niño elige <, =, o >.
function balScale(left: number | string, right: number | string, prompt?: string): ExS {
  const lv = typeof left === "number" ? left : parseFloat(String(left));
  const rv = typeof right === "number" ? right : parseFloat(String(right));
  const answer = !isNaN(lv) && !isNaN(rv) ? (lv < rv ? "<" : lv > rv ? ">" : "=") : "=";
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: prompt ?? `Compara: ${left} ___ ${right}`,
    payload: { visual: "balance-scale", left, right } as Prisma.InputJsonValue,
    solution: { answer },
    hints: ["Mira qué lado de la balanza baja más.", answer === "=" ? "Los dos lados son iguales." : `El ${answer === "<" ? "izquierdo" : "derecho"} es más pesado.`],
    explanation: `${left} ${answer} ${right}.`,
    difficulty: 2,
    xpReward: 7,
  };
}

// ── Modelo de barra (Singapore tape diagram) ────────────────────────────────
// total = null → el niño busca el total. Una part con value=null → esa es la incógnita.
// opts: opciones de respuesta como strings.
function barModel(
  total: number | null,
  parts: { v: number | null; label?: string }[],
  opts: string[],
  prompt?: string,
): ExS {
  const answer = opts[0];
  const knownSum = parts.reduce((s, p) => s + (p.v ?? 0), 0);
  const payloadParts = parts.map(p => ({ value: p.v, label: p.label }));
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: prompt ?? (total === null ? `¿Cuánto es en total?` : `¿Cuánto mide la parte que falta?`),
    payload: { visual: "bar-model", total, parts: payloadParts, options: opts } as Prisma.InputJsonValue,
    solution: { answer },
    hints: [
      total !== null ? `Total: ${total}. Suma conocida: ${knownSum}.` : `Suma las partes: ${parts.map(p => p.v ?? "?").join(" + ")}.`,
      `La respuesta es ${answer}.`,
    ],
    explanation: total === null
      ? `${parts.map(p => p.v ?? Number(answer)).join(" + ")} = ${answer}.`
      : `${total} − ${knownSum} = ${answer}.`,
    difficulty: 2,
    xpReward: 8,
  };
}

// ── Comparar fracciones (dos barras lado a lado) ────────────────────────────
function fracCompare(n1: number, d1: number, n2: number, d2: number, prompt?: string): ExS {
  const v1 = n1 / d1;
  const v2 = n2 / d2;
  const answer = v1 < v2 ? "<" : v1 > v2 ? ">" : "=";
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: prompt ?? `Compara: ${n1}/${d1} ___ ${n2}/${d2}`,
    payload: { visual: "fraction-compare", n1, d1, n2, d2 } as Prisma.InputJsonValue,
    solution: { answer },
    hints: [
      `Mira qué barra tiene más área sombreada.`,
      `${n1}/${d1} ${answer} ${n2}/${d2}.`,
    ],
    explanation: `${n1}/${d1} = ${v1.toFixed(2)} y ${n2}/${d2} = ${v2.toFixed(2)}, entonces ${n1}/${d1} ${answer} ${n2}/${d2}.`,
    difficulty: d1 === d2 ? 1 : 2,
    xpReward: 7,
  };
}

// ── Grupos iguales interactivo (división, estilo Synthesis) ────────────────
// Puntos dispersos en círculo que el niño junta tocándolos: cada `groups`
// puntos se fusionan en una "flor". La cantidad de flores es la respuesta
// (DivisionGroupsGame) — el prompt instruye la acción, no pide marcar.
function divGroups(total: number, groups: number, opts: number[], item = "🔵", difficulty = 2): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `¿Cuántos grupos de ${groups} puedes formar con ${total} puntos?`,
    payload: {
      visual: "division-groups",
      total,
      groups,
      item,
      options: opts,
    } as Prisma.InputJsonValue,
    solution: { answer: total / groups },
    hints: [
      `Toca ${groups} puntos y se juntan solos en un grupo 🌸`,
      `${groups} × ? = ${total}`,
    ],
    explanation: `${total} ÷ ${groups} = ${total / groups}: se forman ${total / groups} grupos de ${groups}.`,
    difficulty,
    xpReward: difficulty <= 2 ? 7 : 9,
  };
}

function addQ(a: number, b: number, opts: number[], difficulty = 2): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `¿Cuánto es ${a} + ${b}?`,
    payload: { options: opts } as Prisma.InputJsonValue,
    solution: { answer: a + b },
    hints: ["Suma las unidades primero.", "Lleva si necesitas."],
    explanation: `${a} + ${b} = ${a + b}.`,
    difficulty,
    xpReward: difficulty <= 2 ? 7 : 9,
  };
}

function subQ(a: number, b: number, opts: number[], difficulty = 2): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `¿Cuánto es ${a} − ${b}?`,
    payload: { options: opts } as Prisma.InputJsonValue,
    solution: { answer: a - b },
    hints: ["Resta las unidades primero.", "Pide prestado si necesitas."],
    explanation: `${a} − ${b} = ${a - b}.`,
    difficulty,
    xpReward: difficulty <= 2 ? 7 : 9,
  };
}

// ── Arreglo interactivo (multiplicación) ────────────────────────────────────
// El niño construye el arreglo fila por fila (MultiplicationBuildGame) y ve
// el conteo saltado acumulado — multiplicar como suma de filas iguales.
function multArray(rows: number, cols: number, opts: number[], item = "🔵"): ExS {
  const total = rows * cols;
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `Construye ${rows} filas de ${cols} ${item}`,
    payload: { visual: "mult-array-build", rows, cols, item, options: opts } as Prisma.InputJsonValue,
    solution: { answer: total },
    hints: [
      `Cada fila suma ${cols} más: cuenta de ${cols} en ${cols}.`,
      `${rows} × ${cols} = ?`,
    ],
    explanation: `${rows} filas de ${cols} = ${total}. ¡${rows} × ${cols} = ${total}!`,
    difficulty: total > 20 ? 2 : 1,
    xpReward: 7,
  };
}

function multQ(a: number, b: number, opts: number[], difficulty = 2): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `¿Cuánto es ${a} × ${b}?`,
    payload: { options: opts } as Prisma.InputJsonValue,
    solution: { answer: a * b },
    hints: [`${a} grupos de ${b}.`, `Cuenta de ${b} en ${b}, ${a} veces.`],
    explanation: `${a} × ${b} = ${a * b}.`,
    difficulty,
    xpReward: 7,
  };
}


function fracBar(numerator: number, denominator: number, opts: (number | string)[], prompt: string): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt,
    payload: { visual: "fraction-bar", numerator, denominator, options: opts } as Prisma.InputJsonValue,
    solution: { answer: opts[0] },
    hints: [
      `La barra está dividida en ${denominator} partes iguales.`,
      `${numerator} de ${denominator} partes están sombreadas.`,
    ],
    explanation: `${numerator} parte${numerator > 1 ? "s" : ""} de ${denominator} → ${numerator}/${denominator}.`,
    difficulty: 2,
    xpReward: 7,
  };
}

function addFrac(n1: number, n2: number, den: number, opts: string[]): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `¿Cuánto es ${n1}/${den} + ${n2}/${den}?`,
    payload: { options: opts } as Prisma.InputJsonValue,
    solution: { answer: opts[0] },
    hints: ["El denominador no cambia al sumar.", `${n1} + ${n2} = ? partes de ${den}.`],
    explanation: `${n1}/${den} + ${n2}/${den} = ${n1 + n2}/${den}.`,
    difficulty: 2,
    xpReward: 8,
  };
}

function subFrac(n1: number, n2: number, den: number, opts: string[]): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `¿Cuánto es ${n1}/${den} − ${n2}/${den}?`,
    payload: { options: opts } as Prisma.InputJsonValue,
    solution: { answer: opts[0] },
    hints: ["El denominador no cambia al restar.", `${n1} − ${n2} = ? partes de ${den}.`],
    explanation: `${n1}/${den} − ${n2}/${den} = ${n1 - n2}/${den}.`,
    difficulty: 2,
    xpReward: 8,
  };
}

function clockMC(hours: number, minutes: number, opts: string[]): ExS {
  const h = hours % 12 || 12;
  const m = String(minutes).padStart(2, "0");
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: "¿Qué hora marca el reloj?",
    payload: { visual: "clock-face", hours, minutes, options: opts } as Prisma.InputJsonValue,
    solution: { answer: opts[0] },
    hints: ["La aguja corta (negra) indica las horas.", "La aguja larga (azul) indica los minutos."],
    explanation: `El reloj marca las ${h}:${m}.`,
    difficulty: minutes === 0 ? 1 : minutes % 15 === 0 ? 2 : 3,
    xpReward: minutes === 0 ? 6 : 7,
  };
}

function shapePattern(sequence: string[], options: string[], answer: string, difficulty = 1): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: "¿Qué sigue en el patrón?",
    payload: { visual: "pattern-next", sequence, options } as Prisma.InputJsonValue,
    solution: { answer },
    hints: ["Di el patrón en voz baja.", "Busca qué parte se repite."],
    explanation: `El patrón se repite. Sigue ${answer}.`,
    difficulty,
    xpReward: difficulty === 1 ? 6 : 8,
  };
}

function mc(prompt: string, opts: (number | string)[], answer: number | string, hints: [string, string], explanation: string, difficulty = 2): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt,
    payload: { options: opts } as Prisma.InputJsonValue,
    solution: { answer },
    hints,
    explanation,
    difficulty,
    xpReward: difficulty <= 1 ? 6 : difficulty <= 2 ? 7 : 9,
  };
}

// ─────────────────────────────────────────────────────────────────────────────

const mathInitialPreviewExercises: ExerciseSeed[] = [
  {
    kind: ExerciseKind.TEACH,
    order: 0,
    prompt: "",
    payload: {
      teach: {
        beats: [
          {
            emoji: "🧩",
            repeat: 1,
            text: "Esta es una prueba gratis. Juega un poquito de la aventura con Paskalito.",
          },
        ],
        tryIt: {
          emoji: "⭐",
          count: 2,
          text: "Toca las estrellas para empezar.",
          successText: "¡Vamos a jugar!",
        },
      },
    } as Prisma.InputJsonValue,
    solution: {},
    difficulty: 1,
    xpReward: 0,
  },
  {
    kind: ExerciseKind.MATCH,
    order: 1,
    prompt: "Une cada fruta con su pareja.",
    payload: {
      visual: "same-match",
      left: [
        { id: "apple", emoji: "🍎" },
        { id: "banana", emoji: "🍌" },
        { id: "grape", emoji: "🍇" },
      ],
      right: [
        { id: "banana", emoji: "🍌" },
        { id: "grape", emoji: "🍇" },
        { id: "apple", emoji: "🍎" },
      ],
    } as Prisma.InputJsonValue,
    solution: { pairs: [[0, 2], [1, 0], [2, 1]] },
    hints: ["Busca el mismo dibujo.", "Toca una tarjeta y después su pareja."],
    explanation: "Cada fruta encontró otra igual.",
    difficulty: 1,
    xpReward: 6,
  },
  {
    kind: ExerciseKind.DRAG_DROP,
    order: 2,
    prompt: "Pon frutas con frutas y animales con animales.",
    payload: {
      visual: "sort-attribute",
      attribute: "type",
      items: [
        { id: "apple", emoji: "🍎", category: "fruits" },
        { id: "cat", emoji: "🐱", category: "animals" },
        { id: "banana", emoji: "🍌", category: "fruits" },
        { id: "dog", emoji: "🐶", category: "animals" },
      ],
      categories: [
        { id: "fruits", label: "Frutas", emoji: "🍎" },
        { id: "animals", label: "Animales", emoji: "🐱" },
      ],
    } as Prisma.InputJsonValue,
    solution: {
      groups: {
        fruits: ["apple", "banana"],
        animals: ["cat", "dog"],
      },
    },
    hints: ["Mira una característica a la vez.", "Si se parece a la canasta, va ahí."],
    explanation: "Clasificar es juntar las cosas que comparten una característica.",
    difficulty: 1,
    xpReward: 6,
  },
  {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    order: 3,
    prompt: "¿Qué sigue en el patrón?",
    payload: {
      visual: "pattern-next",
      sequence: ["🍎", "🍌", "🍎", "🍌"],
      options: ["🍎", "🍌", "🍇"],
    } as Prisma.InputJsonValue,
    solution: { answer: "🍎" },
    hints: ["Di el patrón en voz baja.", "Busca qué parte se repite."],
    explanation: "El patrón se repite. Sigue 🍎.",
    difficulty: 1,
    xpReward: 6,
  },
  {
    kind: ExerciseKind.SORT,
    order: 4,
    prompt: "Pon cada círculo en el casillero que encaja.",
    payload: {
      visual: "order-objects",
      attribute: "size",
      objects: [
        { id: "small", emoji: "●", label: "pequeño", size: 1 },
        { id: "big", emoji: "●", label: "grande", size: 3 },
        { id: "medium", emoji: "●", label: "mediano", size: 2 },
      ],
    } as Prisma.InputJsonValue,
    solution: { sequence: ["small", "medium", "big"] },
    hints: ["Empieza por el más pequeño o corto.", "Después busca el que sigue."],
    explanation: "Ordenar es poner las cosas en una secuencia.",
    difficulty: 1,
    xpReward: 7,
  },
];

const numberTracingPreviewExercises: ExerciseSeed[] = [
  {
    kind: ExerciseKind.TEACH,
    order: 0,
    prompt: "",
    payload: {
      teach: {
        beats: [
          {
            emoji: "0️⃣",
            repeat: 1,
            text: "Esta prueba muestra cómo Paskalito ayuda a mirar, contar y trazar números.",
          },
        ],
        tryIt: {
          emoji: "0️⃣",
          count: 1,
          text: "Toca el cero.",
          successText: "¡Listo para trazar!",
        },
      },
    } as Prisma.InputJsonValue,
    solution: {},
    difficulty: 1,
    xpReward: 0,
  },
  {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    order: 1,
    prompt: "Toca el número 0.",
    payload: { visual: "number-card", digit: 0 } as Prisma.InputJsonValue,
    solution: { answer: 0 },
    hints: ["Busca la tarjeta que tiene el 0.", "Mira su forma redonda."],
    explanation: "Ese es el número 0. Primero lo reconocemos, después lo trazamos.",
    difficulty: 1,
    xpReward: 5,
  },
  {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    order: 2,
    prompt: "La caja está vacía. ¿Cuántas cosas hay?",
    payload: { visual: "empty-box", item: "⭐" } as Prisma.InputJsonValue,
    solution: { answer: 0 },
    hints: ["No hay ninguna estrella.", "Cuando no hay nada, usamos cero."],
    explanation: "Cero significa que no hay ninguna cosa.",
    difficulty: 1,
    xpReward: 5,
  },
  {
    kind: ExerciseKind.DRAW,
    order: 3,
    prompt: "Traza el número 0 con el dedo",
    payload: { digit: 0 } as Prisma.InputJsonValue,
    solution: { answer: 0 },
    hints: ["Sigue la guía despacito, sin levantar el dedo si no hace falta."],
    explanation: "Así se escribe el 0. ¡Cada vez te sale mejor!",
    difficulty: 2,
    xpReward: 6,
  },
];

const primaryOnePreviewExercises: ExerciseSeed[] = [
  {
    kind: ExerciseKind.TEACH,
    order: 0,
    prompt: "",
    payload: {
      teach: {
        beats: [
          {
            emoji: "🔢",
            repeat: 1,
            text: "Esta prueba muestra cómo Paskalito ayuda a contar, comparar y ordenar en 1.º grado.",
          },
        ],
        tryIt: {
          emoji: "⭐",
          count: 5,
          text: "Toca cinco estrellas para empezar.",
          successText: "¡Listo para contar!",
        },
      },
    } as Prisma.InputJsonValue,
    solution: {},
    difficulty: 1,
    xpReward: 0,
  },
  {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    order: 1,
    prompt: "Toca cada uno y cuenta. ¿Cuántos hay?",
    payload: { visual: "count", item: "⭐", count: 12 } as Prisma.InputJsonValue,
    solution: { answer: 12 },
    hints: ["Cuenta primero diez y después dos más.", "Toca uno por uno, sin saltarte ninguno."],
    explanation: "Hay 12. El último número que dices indica cuántos hay.",
    difficulty: 2,
    xpReward: 5,
  },
  {
    kind: ExerciseKind.DRAG_DROP,
    order: 2,
    prompt: "Pon el número que falta en la recta.",
    payload: {
      visual: "number-line-input",
      sequence: [10, 11, null, 13, 14],
      choices: [11, 12, 13, 14],
      step: 1,
    } as Prisma.InputJsonValue,
    solution: { answer: 12 },
    hints: ["La secuencia avanza de 1 en 1.", "Mira el número anterior y el siguiente."],
    explanation: "Falta 12. La secuencia mantiene el mismo salto.",
    difficulty: 1,
    xpReward: 8,
  },
  {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    order: 3,
    prompt: "¿Dónde hay más?",
    payload: {
      visual: "compare-groups",
      left: { item: "🍎", count: 9 },
      right: { item: "🍎", count: 12 },
      options: ["izquierda", "derecha", "igual"],
    } as Prisma.InputJsonValue,
    solution: { answer: "derecha" },
    hints: ["Mira los dos grupos.", "Puedes tocar y contar para comprobar."],
    explanation: "Hay más en la derecha.",
    difficulty: 2,
    xpReward: 7,
  },
  {
    kind: ExerciseKind.SORT,
    order: 4,
    prompt: "Ordena de menor a mayor",
    payload: { numbers: [12, 11, 13] } as Prisma.InputJsonValue,
    solution: { sequence: [11, 12, 13] },
    hints: ["Primero el más chiquito.", "Cada número que sigue es uno más."],
    explanation: "En orden: 11, 12, 13.",
    difficulty: 1,
    xpReward: 7,
  },
];

const primaryTwoPreviewExercises: ExerciseSeed[] = [
  {
    kind: ExerciseKind.TEACH,
    order: 0,
    prompt: "",
    payload: {
      teach: {
        beats: [
          {
            emoji: "🔢",
            repeat: 1,
            text: "Esta prueba muestra cómo Paskalito ayuda con números hasta el 1000, la multiplicación y más.",
          },
        ],
        tryIt: {
          emoji: "⭐",
          count: 10,
          text: "Toca diez estrellas para empezar.",
          successText: "¡Listo para el 2.º grado!",
        },
      },
    } as Prisma.InputJsonValue,
    solution: {},
    difficulty: 1,
    xpReward: 0,
  },
  {
    kind: ExerciseKind.DRAG_DROP,
    order: 1,
    prompt: "Pon el número que falta en la recta.",
    payload: {
      visual: "number-line-input",
      sequence: [100, 200, null, 400, 500],
      choices: [300, 350, 250, 450],
      step: 100,
    } as Prisma.InputJsonValue,
    solution: { answer: 300 },
    hints: ["La secuencia avanza de 100 en 100.", "Mira el número anterior y el siguiente."],
    explanation: "Falta 300. La secuencia salta de 100 en 100.",
    difficulty: 2,
    xpReward: 8,
  },
  {
    kind: ExerciseKind.SORT,
    order: 2,
    prompt: "Ordena de menor a mayor.",
    payload: { numbers: [732, 483, 619] } as Prisma.InputJsonValue,
    solution: { sequence: [483, 619, 732] },
    hints: ["Mira el primer dígito de cada número.", "El más chiquito va primero."],
    explanation: "En orden: 483, 619, 732.",
    difficulty: 2,
    xpReward: 8,
  },
  {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    order: 3,
    prompt: "¿Cuántas hay en total?",
    payload: {
      visual: "count",
      item: "🍎",
      count: 12,
    } as Prisma.InputJsonValue,
    solution: { answer: 12 },
    hints: ["Puedes contar de 4 en 4.", "4... 8... 12."],
    explanation: "Hay 12. Eso es como 3 grupos de 4, ¡la idea de multiplicar!",
    difficulty: 2,
    xpReward: 7,
  },
  {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    order: 4,
    prompt: "¿Dónde hay más?",
    payload: {
      visual: "compare-groups",
      left: { item: "🟦", count: 9 },
      right: { item: "🟦", count: 6 },
      options: ["izquierda", "derecha", "igual"],
    } as Prisma.InputJsonValue,
    solution: { answer: "izquierda" },
    hints: ["Mira los dos grupos.", "Puedes tocar y contar."],
    explanation: "Hay más en la izquierda: 9 > 6.",
    difficulty: 1,
    xpReward: 7,
  },
];

// ── P2 · UNIT 1: Números hasta el 1000 ──────────────────────────────────────

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · 2.º grado · Matemática con Paskalito           ║
// ║  unit: p2-numeros-hasta-1000 · 🔢 "Números hasta el 1000"  [sky]       ║
// ║  desc: Contar, leer, comparar y ordenar números hasta el 1000.          ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 2/6 · contar-decenas-centenas · "Contar en decenas y centenas"  ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2ContarDecenasCentenas: ExS[] = [
  lumi(
    [{ emoji: "🔟", repeat: 1, text: "Ya sabes contar de uno en uno. Ahora vamos a contar de 10 en 10 y de 100 en 100. ¡Es mucho más rápido!" }],
    { emoji: "💯", count: 2, text: "Toca dos centenas para empezar.", successText: "¡Vamos a contar en grupos!" },
  ),
  placeValue({ tens: 3 }, [30, 3, 300]),
  numberLineGap([10, 20, null, 40, 50], [30, 25, 35, 45], 10),
  placeValue({ hundreds: 2 }, [200, 20, 2000]),
  numberLineGap([100, 200, null, 400, 500], [300, 250, 350, 450], 100),
  numPattern([100, 200, 300, 400], 100, [500, 450, 600]),
  numberLineGap([40, null, 60, 70, 80], [50, 45, 55, 65], 10),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · 2.º grado · Matemática con Paskalito           ║
// ║  unit: p2-numeros-hasta-1000 · 🔢 "Números hasta el 1000"  [sky]       ║
// ║  desc: Contar, leer, comparar y ordenar números hasta el 1000.          ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 3/6 · valor-posicional-1000 · "Valor posicional hasta 1000"    ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2ValorPosicional1000: ExS[] = [
  lumi(
    [{ emoji: "🧱", repeat: 1, text: "Cada dígito tiene su lugar: centenas, decenas, unidades." }],
    { emoji: "🧱", count: 3, text: "Toca tres bloques.", successText: "¡Ahora a leer números!" },
  ),
  placeValue({ hundreds: 1, tens: 3, ones: 5 }, [135, 315, 153]),
  placeValue({ hundreds: 2, tens: 4, ones: 1 }, [241, 214, 142]),
  placeValue({ hundreds: 3, tens: 0, ones: 7 }, [307, 370, 703]),
  digitQuestion(542, "¿Cuántas centenas hay en el número 542?", [5, 4, 2]),
  digitQuestion(386, "¿Cuántas decenas hay en el número 386?",  [8, 3, 6]),
  sortNums([452, 245, 524]),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · 2.º grado · Matemática con Paskalito           ║
// ║  unit: p2-numeros-hasta-1000 · 🔢 "Números hasta el 1000"  [sky]       ║
// ║  desc: Contar, leer, comparar y ordenar números hasta el 1000.          ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 4/6 · leer-escribir-1000 · "Leer y escribir hasta 1000"        ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2LeerEscribir1000: ExS[] = [
  lumi(
    [{ emoji: "📖", repeat: 1, text: "Aprendemos a leer y escribir números grandes. 356 se lee: trescientos cincuenta y seis." }],
    { emoji: "⭐", count: 5, text: "Toca 5 estrellas.", successText: "¡A leer números!" },
  ),
  placeValue({ hundreds: 4, tens: 2, ones: 6 }, [426, 624, 264]),
  numberLineGap([300, null, 400, 500], [350, 330, 380, 320], 50),
  compareNums(489, 498),
  inputPlaceValue({ hundreds: 5, tens: 1, ones: 3 }, 513),
  digitQuestion(790, "¿Qué número es 10 más que 790?", [800, 791, 700]),
  sortNums([605, 506, 650]),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · 2.º grado · Matemática con Paskalito           ║
// ║  unit: p2-numeros-hasta-1000 · 🔢 "Números hasta el 1000"  [sky]       ║
// ║  desc: Contar, leer, comparar y ordenar números hasta el 1000.          ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 5/6 · comparar-ordenar-1000 · "Comparar y ordenar hasta 1000"  ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2CompararOrdenar1000: ExS[] = [
  lumi(
    [{ emoji: "⚖️", repeat: 1, text: "Para comparar, mira centenas primero. Si son iguales, mira decenas. Si también son iguales, mira unidades." }],
    { emoji: "⭐", count: 3, text: "Toca 3 estrellas.", successText: "¡A comparar!" },
  ),
  compareNums(374, 274),
  compareNums(563, 583),
  compareNums(742, 748),
  sortNums([819, 198, 918]),
  sortNums([435, 534, 453, 345]),
  numberLineGap([400, 450, null, 550, 600], [500, 475, 525, 480], 50),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · 2.º grado · Matemática con Paskalito           ║
// ║  unit: p2-numeros-hasta-1000 · 🔢 "Números hasta el 1000"  [sky]       ║
// ║  desc: Contar, leer, comparar y ordenar números hasta el 1000.          ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 6/6 · pares-impares-patrones · "Patrones, pares e impares"      ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2ParesImparesPatrones: ExS[] = [
  lumi(
    [
      { emoji: "👥", repeat: 1, text: "Los números pares se pueden repartir en dos grupos iguales. Los impares siempre dejan uno solo." },
      { emoji: "🔢", repeat: 1, text: "Termina en 0,2,4,6,8 → par.   Termina en 1,3,5,7,9 → impar." },
    ],
    { emoji: "👥", count: 4, text: "Toca 4 objetos (un número par).", successText: "¡4 es par!" },
  ),
  parityNum(48),
  parityNum(75),
  parityNum(326),
  numPattern([150, 200, 250, 300],  50, [350, 400, 320]),
  numPattern([500, 490, 480, 470], -10, [460, 440, 480]),
  paritySort([
    { id: "342", category: "par"   },
    { id: "517", category: "impar" },
    { id: "800", category: "par"   },
    { id: "99",  category: "impar" },
  ]),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-suma-resta · ➕ "Suma y resta"  [mint] ║
// ║  desc: Algoritmos y cálculo mental con números de hasta 3 dígitos.      ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 1/2 · algoritmo-3-digitos · "Algoritmo de suma y resta"         ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2Algoritmo3Digitos: ExS[] = [
  lumi(
    [{ emoji: "📐", repeat: 1, text: "Para sumar o restar números de 3 dígitos alineamos centenas, decenas y unidades, y operamos columna por columna." }],
    { emoji: "⭐", count: 3, text: "Toca 3 estrellas.", successText: "¡A calcular!" },
  ),
  numBond(386,  234, null, ["152", "162", "142"], "234 + ___ = 386. ¿Cuál es la parte que falta?"),
  barModel(769, [{v: 523}, {v: null}], ["246", "236", "256"],  "___ + 523 = 769. ¿Cuánto falta?"),
  barModel(487, [{v: 234}, {v: null}], ["253", "243", "263"]),
  numBond(635, null, 412, ["223", "213", "233"], "___ + 412 = 635. ¿Cuál es la otra parte?"),
  addQ(357, 486, [843, 833, 853], 3),
  subQ(703, 258, [445, 455, 435], 3),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-suma-resta · ➕ "Suma y resta"  [mint] ║
// ║  desc: Algoritmos y cálculo mental con números de hasta 3 dígitos.      ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 2/2 · calculo-mental-sr · "Cálculo mental: suma y resta"        ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2CalculoMentalSR: ExS[] = [
  lumi(
    [{ emoji: "🧠", repeat: 1, text: "El cálculo mental usa trucos: sumar centenas, decenas o unidades de golpe, sin papel." }],
    { emoji: "💡", count: 3, text: "Toca 3 luces.", successText: "¡Mente lista!" },
  ),
  numBond(800, 500, null, ["300", "200", "400"], "500 + ___ = 800. ¿Qué parte falta?"),
  numBond(700, null, 400, ["300", "200", "400"], "___ + 400 = 700. ¿Qué parte falta?"),
  barModel(700, [{v: 650}, {v: null}], ["50", "40", "60"], "650 + ___ = 700. ¿Cuánto falta?"),
  balScale(650, 500, "¿Qué símbolo va en el medio? 650 ___ 500"),
  numPattern([300, 400, 500, 600], 100, [700, 800, 600]),
  addQ(480, 120, [600, 590, 610], 3),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-multiplicacion · ✖️ "Multiplicación"  ║
// ║  [sun] · desc: Tablas del 2 al 10 y el significado de multiplicar.      ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 1/5 · grupos-iguales-mult · "Grupos iguales: la idea de ×"      ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2GruposIgualesMult: ExS[] = [
  lumi(
    [{ emoji: "🍎", repeat: 3, text: "Cuando tenemos grupos del mismo tamaño, podemos multiplicar en vez de contar uno por uno." }],
    { emoji: "🍎", count: 6, text: "Toca 6 manzanas (2 grupos de 3).", successText: "¡2 × 3 = 6!" },
  ),
  multArray(2, 3, [6, 5, 7],   "🍎"),
  multArray(3, 4, [12, 10, 14], "🔵"),
  multArray(2, 5, [10, 8, 12],  "⭐"),
  multArray(4, 3, [12, 9, 15],  "🟡"),
  multArray(2, 6, [12, 10, 14], "🍓"),
  multArray(3, 3, [9, 6, 12],   "🐟"),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-multiplicacion · ✖️ "Multiplicación"  ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 2/5 · tablas-2-5-10 · "Tablas del 2, 5 y 10"                   ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2Tablas2510: ExS[] = [
  lumi(
    [{ emoji: "✖️", repeat: 1, text: "Las tablas del 2, 5 y 10 son las más fáciles. El 2 va de 2 en 2, el 5 de 5 en 5, el 10 de 10 en 10." }],
    { emoji: "⭐", count: 5, text: "Toca 5 estrellas.", successText: "¡A practicar tablas!" },
  ),
  // Filas orientadas para contar saltado el número de la tabla (cols = tabla).
  multArray(3, 2,  [6, 4, 8],    "⭐"),
  multArray(4, 5,  [20, 15, 25], "🟡"),
  multArray(7, 10, [70, 60, 80], "🔵"),
  multArray(8, 2,  [16, 14, 18], "🍓"),
  numPattern([5, 10, 15, 20], 5,  [25, 30, 20]),
  numPattern([10, 20, 30, 40], 10, [50, 60, 40]),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-multiplicacion · ✖️ "Multiplicación"  ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 3/5 · tablas-3-4 · "Tablas del 3 y del 4"                       ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2Tablas34: ExS[] = [
  lumi(
    [{ emoji: "✖️", repeat: 1, text: "Ahora el 3 y el 4. Puedes contar de 3 en 3 o de 4 en 4 para descubrir los resultados." }],
    { emoji: "⭐", count: 4, text: "Toca 4 estrellas.", successText: "¡Tablas del 3 y 4!" },
  ),
  // Filas orientadas para contar saltado el número de la tabla (cols = tabla).
  multArray(3, 3, [9, 6, 12],   "🟢"),
  multArray(6, 3, [18, 15, 21], "⭐"),
  multArray(4, 4, [16, 12, 20], "🍎"),
  multArray(7, 4, [28, 24, 32], "🐟"),
  numPattern([3, 6, 9, 12],  3, [15, 18, 12]),
  numPattern([4, 8, 12, 16], 4, [20, 24, 16]),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-multiplicacion · ✖️ "Multiplicación"  ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 4/5 · arreglos-filas-columnas · "Arreglos: filas y columnas"    ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2ArreglosFilasColumnas: ExS[] = [
  lumi(
    [{ emoji: "📐", repeat: 1, text: "Un arreglo organiza objetos en filas y columnas. Filas × Columnas = total." }],
    { emoji: "🔵", count: 6, text: "Toca 6 puntos (2 filas de 3).", successText: "¡2 × 3 = 6!" },
  ),
  multArray(3, 5, [15, 12, 18], "🟡"),
  multArray(4, 5, [20, 16, 24], "🔵"),
  multArray(3, 6, [18, 15, 21], "⭐"),
  multArray(4, 6, [24, 20, 28], "🍎"),
  multArray(5, 5, [25, 20, 30], "🟢"),
  sortNums([12, 6, 18, 9]),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-multiplicacion · ✖️ "Multiplicación"  ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 5/5 · calculo-mental-mult · "Cálculo mental: multiplicación"    ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2CalculoMentalMult: ExS[] = [
  lumi(
    [{ emoji: "🧠", repeat: 1, text: "Podemos multiplicar mentalmente por 2, 5 o 10 muy rápido. ¡Inténtalo!" }],
    { emoji: "💡", count: 3, text: "Toca 3 luces.", successText: "¡Mente lista!" },
  ),
  multQ(2,  15, [30, 25, 35], 2),
  multQ(5,  12, [60, 55, 65], 2),
  multQ(10,  9, [90, 80, 100], 1),
  multQ(3,   8, [24, 21, 27], 3),
  multQ(4,   9, [36, 32, 40], 3),
  numPattern([6, 12, 18, 24], 6, [30, 36, 24]),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-division · ➗ "División"  [peach]      ║
// ║  desc: Repartir en grupos iguales y la relación con la multiplicación.  ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 1/3 · repartir-grupos-iguales · "Repartir en grupos iguales"    ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2RepartirGruposIguales: ExS[] = [
  lumi(
    [{ emoji: "🍕", repeat: 1, text: "Dividir es repartir en grupos iguales. Si tienes 12 y quieres 3 grupos iguales, ¿cuánto va en cada uno?" }],
    { emoji: "⭐", count: 6, text: "Toca 6 estrellas.", successText: "¡A repartir!" },
  ),
  divGroups(12, 3, [4, 3, 6],  "🍎"),
  divGroups(10, 2, [5, 4, 6],  "⭐"),
  divGroups(20, 4, [5, 4, 6],  "🔵"),
  divGroups(15, 5, [3, 2, 4],  "🟡"),
  divGroups(18, 3, [6, 5, 7],  "🐟"),
  divGroups(24, 4, [6, 5, 8],  "🍓"),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-division · ➗ "División"  [peach]      ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 2/3 · mult-y-div-juntas · "Multiplicación y división juntas"    ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2MultYDivJuntas: ExS[] = [
  lumi(
    [{ emoji: "🔄", repeat: 1, text: "La multiplicación y la división son opuestos. 3 × 4 = 12 → 12 ÷ 3 = 4 y 12 ÷ 4 = 3." }],
    { emoji: "⭐", count: 4, text: "Toca 4 estrellas.", successText: "¡Las dos juntas!" },
  ),
  multQ(3, 7, [21, 18, 24]),
  divGroups(21, 3, [7, 6, 8],  "🔵"),
  multQ(4, 8, [32, 28, 36]),
  divGroups(32, 4, [8, 7, 9],  "⭐"),
  multQ(5, 6, [30, 25, 35]),
  divGroups(30, 5, [6, 5, 7],  "🟡"),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-division · ➗ "División"  [peach]      ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 3/3 · calculo-mental-div · "Cálculo mental: división"           ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2CalculoMentalDiv: ExS[] = [
  lumi(
    [{ emoji: "🧠", repeat: 1, text: "Para dividir mentalmente piensa: ¿por qué número multiplico para llegar al total?" }],
    { emoji: "💡", count: 3, text: "Toca 3 luces.", successText: "¡División mental!" },
  ),
  divGroups(40,  4, [10, 8, 12], "🔵", 2),
  divGroups(50,  5, [10, 8, 12], "⭐", 1),
  divGroups(60, 10, [6, 5, 7],   "🟡", 1),
  divGroups(36,  4, [9, 8, 10],  "🍎", 3),
  divGroups(45,  5, [9, 8, 10],  "🐟", 2),
  divGroups(28,  4, [7, 6, 8],   "🍓", 3),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-fracciones · 🍕 "Fracciones" [lilac]  ║
// ║  desc: Partes de un entero, notación y operaciones con fracciones.      ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 1/4 · parte-de-un-entero · "Parte de un entero"                 ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2ParteDeUnEntero: ExS[] = [
  lumi(
    [{ emoji: "🍕", repeat: 1, text: "Una fracción es una parte de un entero. Si divides una pizza en 4 partes iguales y tomas 1, tienes 1/4." }],
    { emoji: "🍕", count: 4, text: "Toca las 4 partes de la pizza.", successText: "¡4 partes iguales!" },
  ),
  fracBar(1, 2, ["1/2", "1/3", "1/4"], "¿Qué fracción está sombreada?"),
  fracBar(1, 4, ["1/4", "1/2", "1/3"], "¿Qué fracción está sombreada?"),
  fracBar(1, 3, ["1/3", "1/4", "1/2"], "¿Qué fracción está sombreada?"),
  fracBar(2, 4, ["2/4", "1/4", "3/4"], "¿Qué fracción está sombreada?"),
  fracBar(3, 4, ["3/4", "2/4", "1/4"], "¿Qué fracción está sombreada?"),
  fracBar(2, 3, ["2/3", "1/3", "3/3"], "¿Qué fracción está sombreada?"),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-fracciones · 🍕 "Fracciones" [lilac]  ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 2/4 · notacion-fracciones · "Notación de fracciones"            ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2NotacionFracciones: ExS[] = [
  lumi(
    [{ emoji: "📝", repeat: 1, text: "Numerador (arriba) = partes que tomamos. Denominador (abajo) = total de partes iguales." }],
    { emoji: "⭐", count: 3, text: "Toca 3 estrellas.", successText: "¡A escribir fracciones!" },
  ),
  fracBar(1, 2, [1, 2, 3],             "¿Cuántas partes están sombreadas? (numerador)"),
  fracBar(3, 4, [4, 3, 2],             "¿En cuántas partes está dividido el entero? (denominador)"),
  fracBar(2, 5, ["2/5", "3/5", "1/5"], "¿Qué fracción está sombreada?"),
  fracBar(4, 5, ["4/5", "3/5", "1/5"], "¿Qué fracción está sombreada?"),
  fracBar(1, 6, ["1/6", "2/6", "5/6"], "¿Qué fracción está sombreada?"),
  fracBar(3, 6, ["3/6", "2/6", "4/6"], "¿Qué fracción está sombreada?"),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-fracciones · 🍕 "Fracciones" [lilac]  ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 3/4 · comparar-fracciones · "Comparar fracciones"               ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2CompararFracciones: ExS[] = [
  lumi(
    [{ emoji: "⚖️", repeat: 1, text: "Con el mismo denominador: más numerador = mayor. Con el mismo numerador: menos denominador = mayor (partes más grandes)." }],
    { emoji: "⭐", count: 3, text: "Toca 3 estrellas.", successText: "¡A comparar fracciones!" },
  ),
  fracCompare(1, 2, 1, 4, "¿Cuál es mayor: 1/2 ó 1/4?"),
  fracCompare(3, 4, 1, 4, "¿Cuál es mayor: 3/4 ó 1/4?"),
  fracCompare(2, 3, 2, 4, "¿Cuál es mayor: 2/3 ó 2/4?"),
  fracCompare(1, 3, 1, 2, "¿Cuál es menor: 1/3 ó 1/2?"),
  fracCompare(5, 6, 3, 6, "¿Cuál es mayor: 5/6 ó 3/6?"),
  mc("¿Son iguales 2/4 y 1/2?",
     ["Sí, son iguales", "No, 2/4 es mayor", "No, 1/2 es mayor"], "Sí, son iguales",
     ["Divide la barra en 4 y sombrea 2; divide otra en 2 y sombrea 1.", "El área sombreada es la misma."],
     "2/4 = 1/2. Son la misma cantidad.", 3),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-fracciones · 🍕 "Fracciones" [lilac]  ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 4/4 · sumar-restar-fracciones · "Sumar y restar fracciones"     ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2SumarRestarFracciones: ExS[] = [
  lumi(
    [{ emoji: "➕", repeat: 1, text: "Para sumar o restar fracciones con el mismo denominador, solo operamos el numerador. El denominador no cambia." }],
    { emoji: "⭐", count: 4, text: "Toca 4 estrellas.", successText: "¡A operar fracciones!" },
  ),
  addFrac(1, 2, 4, ["3/4", "2/4", "4/4"]),
  addFrac(2, 1, 5, ["3/5", "2/5", "4/5"]),
  subFrac(3, 1, 4, ["2/4", "1/4", "3/4"]),
  subFrac(4, 2, 5, ["2/5", "1/5", "3/5"]),
  addFrac(1, 3, 6, ["4/6", "3/6", "5/6"]),
  subFrac(5, 2, 6, ["3/6", "2/6", "4/6"]),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-dinero · 💰 "Dinero"  [sun]           ║
// ║  desc: Contar soles y céntimos, leer precios y hacer cambios.           ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 1/4 · contar-soles-centimos · "Contar soles y céntimos"         ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2ContarSolesCentimos: ExS[] = [
  lumi(
    [{ emoji: "💰", repeat: 1, text: "En el Perú usamos soles (S/) y céntimos. 100 céntimos = 1 sol." }],
    { emoji: "🪙", count: 4, text: "Toca 4 monedas.", successText: "¡A contar dinero!" },
  ),
  mc("3 billetes de S/1 y 2 monedas de 50 céntimos. ¿Cuánto hay?",
     ["S/ 4.00", "S/ 3.50", "S/ 4.50"], "S/ 4.00",
     ["3 soles + 50 + 50 céntimos.", "50 + 50 céntimos = 1 sol más."],
     "3 soles + 1 sol (de 100 céntimos) = S/ 4.00."),
  mc("2 billetes de S/5. ¿Cuánto hay?",
     ["S/ 10", "S/ 7", "S/ 12"], "S/ 10",
     ["2 × S/5 = ?", "5 + 5 = 10."],
     "2 × S/5 = S/ 10.", 1),
  mc("1 billete de S/10 y 3 monedas de S/1. ¿Cuánto hay?",
     ["S/ 13", "S/ 10", "S/ 11"], "S/ 13",
     ["10 + 3 = ?", "Suma el billete y las monedas."],
     "S/10 + S/3 = S/ 13."),
  mc("4 monedas de 25 céntimos. ¿Cuánto hay?",
     ["S/ 1.00", "S/ 0.75", "S/ 1.25"], "S/ 1.00",
     ["4 × 25 = ?", "100 céntimos = 1 sol."],
     "4 × 25 céntimos = 100 céntimos = S/ 1.00."),
  mc("1 billete de S/20 y 2 monedas de S/2. ¿Cuánto hay?",
     ["S/ 24", "S/ 22", "S/ 26"], "S/ 24",
     ["20 + 2 + 2 = ?", "Suma las monedas al billete."],
     "S/20 + S/2 + S/2 = S/ 24."),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-dinero · 💰 "Dinero"  [sun]           ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 2/4 · leer-precios · "Leer precios"                             ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2LeerPrecios: ExS[] = [
  lumi(
    [{ emoji: "🏷️", repeat: 1, text: "Un precio nos dice cuánto cuesta algo. Si el precio es S/ 8.50 y pagas con S/ 10, recibes cambio." }],
    { emoji: "⭐", count: 3, text: "Toca 3 estrellas.", successText: "¡A leer precios!" },
  ),
  mc("Una pelota cuesta S/ 8.50. Tienes S/ 10. ¿Cuánto de cambio recibes?",
     ["S/ 1.50", "S/ 1.00", "S/ 2.00"], "S/ 1.50",
     ["10 − 8.50 = ?", "Cuenta hacia arriba desde 8.50."],
     "S/10 − S/8.50 = S/ 1.50."),
  mc("Un jugo cuesta S/ 3.50 y un pan S/ 1.50. ¿Cuánto es en total?",
     ["S/ 5.00", "S/ 4.50", "S/ 5.50"], "S/ 5.00",
     ["3.50 + 1.50 = ?", "50 + 50 céntimos = 1 sol."],
     "S/3.50 + S/1.50 = S/ 5.00."),
  mc("¿Cuál cuesta más: lápiz S/ 1.20 o borrador S/ 0.90?",
     ["Lápiz", "Borrador", "Igual"], "Lápiz",
     ["Compara: 1.20 vs 0.90.", "1 > 0, entonces 1.20 > 0.90."],
     "El lápiz cuesta más: S/1.20 > S/0.90."),
  mc("Un plátano cuesta S/ 0.50. ¿Cuántos puedes comprar con S/ 2.00?",
     [4, 2, 5], 4,
     ["2.00 ÷ 0.50 = ?", "¿Cuántas veces cabe 0.50 en 2.00?"],
     "2.00 ÷ 0.50 = 4 plátanos."),
  mc("Compras algo de S/ 6.75 y pagas con S/ 10. ¿Cuánto de cambio recibes?",
     ["S/ 3.25", "S/ 3.00", "S/ 4.25"], "S/ 3.25",
     ["10 − 6.75 = ?", "10 − 7 = 3, más 25 céntimos."],
     "S/10 − S/6.75 = S/ 3.25.", 3),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-dinero · 💰 "Dinero"  [sun]           ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 3/4 · comparar-montos · "Comparar montos"                       ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2CompararMontos: ExS[] = [
  lumi(
    [{ emoji: "⚖️", repeat: 1, text: "Para comparar montos, mira primero los soles enteros. Si son iguales, mira los céntimos." }],
    { emoji: "⭐", count: 3, text: "Toca 3 estrellas.", successText: "¡A comparar precios!" },
  ),
  mc("¿Cuál es mayor: S/ 3.75 o S/ 3.50?",
     ["S/ 3.75", "S/ 3.50", "Son iguales"], "S/ 3.75",
     ["Los soles enteros son iguales.", "75 céntimos > 50 céntimos."],
     "S/3.75 > S/3.50 porque 75 > 50 céntimos."),
  mc("¿Cuál es menor: S/ 12 o S/ 9.50?",
     ["S/ 9.50", "S/ 12", "Son iguales"], "S/ 9.50",
     ["9 < 12.", "Menos soles enteros → monto menor."],
     "S/9.50 < S/12."),
  mc("¿Puedes comprar un juguete de S/ 25 con S/ 20?",
     ["No, falta dinero", "Sí, alcanza", "Sí, y sobra"], "No, falta dinero",
     ["¿20 ≥ 25?", "20 < 25."],
     "No puedes: S/20 < S/25."),
  mc("Ordena de menor a mayor: S/2.50, S/1.75, S/3.00.",
     ["S/1.75 → S/2.50 → S/3.00", "S/2.50 → S/1.75 → S/3.00", "S/3.00 → S/2.50 → S/1.75"],
     "S/1.75 → S/2.50 → S/3.00",
     ["Mira primero los soles enteros.", "1 < 2 < 3."],
     "S/1.75 < S/2.50 < S/3.00."),
  mc("¿Cuánto más cuesta S/ 7.50 que S/ 4.00?",
     ["S/ 3.50", "S/ 3.00", "S/ 4.50"], "S/ 3.50",
     ["7.50 − 4.00 = ?", "7 − 4 = 3, más los 50 céntimos."],
     "S/7.50 − S/4.00 = S/ 3.50.", 3),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-dinero · 💰 "Dinero"  [sun]           ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 4/4 · convertir-soles · "Convertir soles y céntimos"            ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2ConvertirSoles: ExS[] = [
  lumi(
    [{ emoji: "🔄", repeat: 1, text: "1 sol = 100 céntimos. Para convertir soles a céntimos multiplicamos por 100; para lo contrario, dividimos." }],
    { emoji: "🪙", count: 5, text: "Toca 5 monedas.", successText: "¡A convertir!" },
  ),
  mc("¿Cuántos céntimos hay en S/ 2.50?",
     [250, 200, 150], 250,
     ["1 sol = 100 céntimos.", "2 soles + 50 céntimos = 200 + 50."],
     "S/2.50 = 250 céntimos."),
  mc("¿Cuántos soles son 350 céntimos?",
     ["S/ 3.50", "S/ 3.00", "S/ 4.00"], "S/ 3.50",
     ["100 céntimos = 1 sol.", "350 ÷ 100 = 3 soles y 50 céntimos."],
     "350 céntimos = S/ 3.50."),
  mc("¿Cuántos céntimos hay en S/ 1.75?",
     [175, 150, 200], 175,
     ["1 sol = 100 céntimos.", "100 + 75 = ?"],
     "S/1.75 = 175 céntimos."),
  mc("5 monedas de 25 céntimos. ¿Cuántos soles son?",
     ["S/ 1.25", "S/ 1.00", "S/ 1.50"], "S/ 1.25",
     ["5 × 25 = 125 céntimos.", "125 céntimos = 1 sol y 25 céntimos."],
     "5 × 25 = 125 céntimos = S/ 1.25."),
  mc("¿Cuántas monedas de 50 céntimos hacen S/ 3.00?",
     [6, 4, 5], 6,
     ["3 soles = 300 céntimos.", "300 ÷ 50 = ?"],
     "300 ÷ 50 = 6 monedas.", 3),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-medicion · 📏 "Medición"  [mint]      ║
// ║  desc: Longitud, masa y volumen con unidades del sistema métrico.       ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 1/3 · longitud-masa-volumen · "Longitud, masa y volumen"        ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2LongitudMasaVolumen: ExS[] = [
  lumi(
    [{ emoji: "📏", repeat: 1, text: "Medimos longitudes en metros (m), masas en kilogramos (kg) y volúmenes en litros (L)." }],
    { emoji: "⭐", count: 3, text: "Toca 3 estrellas.", successText: "¡A medir!" },
  ),
  mc("¿Qué unidad usamos para medir la altura de una persona?",
     ["metros (m)", "kilogramos (kg)", "litros (L)"], "metros (m)",
     ["La altura es una longitud.", "Medimos longitudes en metros."],
     "La altura se mide en metros (m).", 1),
  mc("¿Qué unidad usamos para medir el peso de una manzana?",
     ["gramos (g)", "metros (m)", "litros (L)"], "gramos (g)",
     ["El peso es la masa.", "Masas pequeñas se miden en gramos."],
     "El peso de una manzana se mide en gramos (g).", 1),
  mc("¿Qué unidad usamos para medir el agua en un vaso?",
     ["mililitros (mL)", "kilogramos (kg)", "metros (m)"], "mililitros (mL)",
     ["El agua ocupa un volumen.", "Volúmenes pequeños se miden en mL."],
     "El agua en un vaso se mide en mililitros (mL).", 1),
  mc("¿Qué es más pesado: 1 kg o 500 g?",
     ["1 kg", "500 g", "Son iguales"], "1 kg",
     ["1 kg = 1000 g.", "1000 > 500."],
     "1 kg = 1000 g > 500 g."),
  mc("¿Qué mide más: 1 L o 800 mL?",
     ["1 L", "800 mL", "Son iguales"], "1 L",
     ["1 L = 1000 mL.", "1000 > 800."],
     "1 L = 1000 mL > 800 mL."),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-medicion · 📏 "Medición"  [mint]      ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 2/3 · unidades-m-kg-l · "Unidades: m, kg y L"                   ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2UnidadesMKgL: ExS[] = [
  lumi(
    [{ emoji: "🔢", repeat: 1, text: "1 m = 100 cm. 1 kg = 1000 g. 1 L = 1000 mL. Estos son los saltos más importantes de medición." }],
    { emoji: "⭐", count: 3, text: "Toca 3 estrellas.", successText: "¡A convertir unidades!" },
  ),
  mc("1 m = __ cm",
     [100, 10, 1000], 100,
     ["El prefijo 'centi' significa centésima parte.", "1 metro tiene 100 partes iguales."],
     "1 m = 100 cm.", 1),
  mc("1 kg = __ g",
     [1000, 100, 500], 1000,
     ["El prefijo 'kilo' significa mil.", "1 kg = 1000 g."],
     "1 kg = 1000 g.", 1),
  mc("1 L = __ mL",
     [1000, 100, 500], 1000,
     ["El prefijo 'mili' significa milésima parte.", "1 L = 1000 mL."],
     "1 L = 1000 mL.", 1),
  mc("3 m = __ cm",
     [300, 30, 3000], 300,
     ["1 m = 100 cm.", "3 × 100 = ?"],
     "3 m = 300 cm."),
  mc("2 kg = __ g",
     [2000, 200, 20000], 2000,
     ["1 kg = 1000 g.", "2 × 1000 = ?"],
     "2 kg = 2000 g."),
  mc("4 L = __ mL",
     [4000, 400, 40000], 4000,
     ["1 L = 1000 mL.", "4 × 1000 = ?"],
     "4 L = 4000 mL."),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-medicion · 📏 "Medición"  [mint]      ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 3/3 · comparar-medidas · "Comparar medidas"                     ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2CompararMedidas: ExS[] = [
  lumi(
    [{ emoji: "⚖️", repeat: 1, text: "Para comparar medidas con distintas unidades, convierte primero a la misma unidad." }],
    { emoji: "⭐", count: 3, text: "Toca 3 estrellas.", successText: "¡A comparar medidas!" },
  ),
  mc("¿Cuál es mayor: 250 cm o 3 m?",
     ["3 m", "250 cm", "Son iguales"], "3 m",
     ["Convierte: 3 m = 300 cm.", "300 cm > 250 cm."],
     "3 m = 300 cm > 250 cm."),
  mc("¿Cuál es menor: 1500 g o 2 kg?",
     ["1500 g", "2 kg", "Son iguales"], "1500 g",
     ["Convierte: 2 kg = 2000 g.", "1500 < 2000."],
     "1500 g < 2 kg (2000 g)."),
  mc("¿Cuál es mayor: 3500 mL o 3 L?",
     ["3500 mL", "3 L", "Son iguales"], "3500 mL",
     ["Convierte: 3 L = 3000 mL.", "3500 > 3000."],
     "3500 mL > 3 L (3000 mL)."),
  mc("Una cuerda mide 80 cm y otra 45 cm. ¿Cuánto miden juntas?",
     [125, 115, 135], 125,
     ["80 + 45 = ?", "80 + 40 + 5 = 125."],
     "80 + 45 = 125 cm."),
  mc("Un paquete pesa 3 kg y otro 750 g. ¿Cuánto pesan juntos (en gramos)?",
     [3750, 3075, 4000], 3750,
     ["Convierte: 3 kg = 3000 g.", "3000 + 750 = ?"],
     "3 kg + 750 g = 3000 g + 750 g = 3750 g.", 3),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-el-tiempo · 🕐 "El tiempo"  [sky]     ║
// ║  desc: Leer el reloj al minuto y convertir horas a minutos.             ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 1/3 · hora-al-minuto · "La hora al minuto"                      ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2HoraAlMinuto: ExS[] = [
  lumi(
    [{ emoji: "🕐", repeat: 1, text: "La aguja corta (negra) marca las horas. La aguja larga (azul) marca los minutos. ¡Cada raya son 5 minutos!" }],
    { emoji: "⭐", count: 3, text: "Toca 3 estrellas.", successText: "¡A leer el reloj!" },
  ),
  clockMC(3,   0, ["3:00",  "4:00",  "2:00"]),
  clockMC(7,   0, ["7:00",  "8:00",  "6:00"]),
  clockMC(10, 30, ["10:30", "9:30",  "11:30"]),
  clockMC(1,  15, ["1:15",  "1:30",  "2:15"]),
  clockMC(4,  45, ["4:45",  "5:45",  "3:45"]),
  clockMC(11, 20, ["11:20", "10:20", "12:20"]),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-el-tiempo · 🕐 "El tiempo"  [sky]     ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 2/3 · horas-y-minutos · "Horas y minutos"                       ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2HorasYMinutos: ExS[] = [
  lumi(
    [{ emoji: "⏱️", repeat: 1, text: "Hay 60 minutos en una hora. El minutero da una vuelta completa cada hora." }],
    { emoji: "⭐", count: 3, text: "Toca 3 estrellas.", successText: "¡A practicar!" },
  ),
  clockMC(6,  5,  ["6:05",  "6:10",  "5:05"]),
  clockMC(9,  25, ["9:25",  "8:25",  "10:25"]),
  clockMC(2,  40, ["2:40",  "3:40",  "1:40"]),
  clockMC(12, 55, ["12:55", "1:55",  "11:55"]),
  clockMC(8,  10, ["8:10",  "9:10",  "7:10"]),
  mc("¿Cuántos minutos hay en media hora?",
     [30, 15, 60], 30,
     ["Media hora es la mitad de 1 hora.", "1 hora = 60 minutos; 60 ÷ 2 = ?"],
     "30 minutos = media hora.", 1),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-el-tiempo · 🕐 "El tiempo"  [sky]     ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 3/3 · convertir-horas-minutos · "Convertir horas y minutos"     ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2ConvertirHorasMinutos: ExS[] = [
  lumi(
    [{ emoji: "🔄", repeat: 1, text: "1 hora = 60 minutos. Para convertir horas a minutos multiplicamos por 60." }],
    { emoji: "⭐", count: 3, text: "Toca 3 estrellas.", successText: "¡A convertir tiempo!" },
  ),
  mc("¿Cuántos minutos hay en 1 hora?",
     [60, 30, 100], 60,
     ["El minutero da una vuelta completa.", "1 hora = 60 minutos."],
     "1 hora = 60 minutos.", 1),
  mc("¿Cuántos minutos hay en 2 horas?",
     [120, 60, 100], 120,
     ["2 × 60 = ?", "60 + 60 = ?"],
     "2 horas = 120 minutos."),
  mc("¿Cuántos minutos hay en 1 hora y 30 minutos?",
     [90, 60, 120], 90,
     ["1 hora = 60 min.", "60 + 30 = ?"],
     "1 hora 30 min = 90 minutos."),
  mc("Son las 3:00. ¿Qué hora será en 45 minutos?",
     ["3:45", "4:00", "4:45"], "3:45",
     ["Suma 45 minutos a las 3:00.", "3:00 + 45 min = 3:45."],
     "3:00 + 45 min = 3:45."),
  mc("Son las 10:30. ¿Qué hora era hace 1 hora?",
     ["9:30", "10:00", "11:30"], "9:30",
     ["Resta 1 hora a 10:30.", "10 − 1 = 9, mismos minutos."],
     "10:30 − 1 hora = 9:30.", 3),
  mc("¿Cuántos minutos hay en 3 horas?",
     [180, 120, 200], 180,
     ["3 × 60 = ?", "60 + 60 + 60 = ?"],
     "3 horas = 180 minutos."),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-formas · 🔷 "Formas 2D y 3D" [rose]  ║
// ║  desc: Patrones con figuras planas e identificación de sólidos.         ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 1/2 · patrones-2d · "Patrones con figuras 2D"                   ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2Patrones2D: ExS[] = [
  lumi(
    [{ emoji: "🔷", repeat: 1, text: "Un patrón con figuras se repite una y otra vez. Dilo en voz baja para encontrar lo que sigue." }],
    { emoji: "⭐", count: 3, text: "Toca 3 estrellas.", successText: "¡A encontrar patrones!" },
  ),
  shapePattern(["🔴", "🔵", "🔴", "🔵", "🔴"], ["🔵", "🔴", "🟡"], "🔵"),
  shapePattern(["🔺", "🔺", "⬛", "🔺", "🔺"], ["⬛", "🔺", "⬜"], "⬛"),
  shapePattern(["🟡", "🟢", "🟡", "🟢", "🟡"], ["🟢", "🟡", "🔵"], "🟢"),
  shapePattern(["🔷", "🔷", "🔶", "🔷", "🔷"], ["🔶", "🔷", "🟡"], "🔶"),
  shapePattern(["🔴", "🔵", "🟡", "🔴", "🔵"], ["🟡", "🔴", "🔵"], "🟡"),
  shapePattern(["⬛", "⬜", "⬛", "⬜", "⬛"], ["⬜", "⬛", "🔵"],  "⬜", 2),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-formas · 🔷 "Formas 2D y 3D" [rose]  ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 2/2 · solidos-3d · "Sólidos 3D"                                 ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2Solidos3D: ExS[] = [
  lumi(
    [{ emoji: "🧊", repeat: 1, text: "Los sólidos 3D tienen caras (superficies), aristas (bordes) y vértices (esquinas)." }],
    { emoji: "⭐", count: 3, text: "Toca 3 estrellas.", successText: "¡A explorar sólidos!" },
  ),
  mc("¿Cuántas caras tiene un cubo?",
     [6, 4, 8], 6,
     ["Un cubo tiene todas sus caras iguales.", "Cuenta: arriba, abajo, y 4 lados."],
     "Un cubo tiene 6 caras cuadradas.", 1),
  mc("¿Cuántas caras tiene una pirámide cuadrada?",
     [5, 4, 6], 5,
     ["Tiene una base cuadrada.", "Más 4 triángulos en los lados."],
     "Pirámide cuadrada: 1 base + 4 triángulos = 5 caras."),
  mc("¿Cuántos vértices (esquinas) tiene un cubo?",
     [8, 6, 4], 8,
     ["Un vértice es una esquina del sólido.", "Cuenta las 8 esquinas del cubo."],
     "Un cubo tiene 8 vértices."),
  mc("¿Cuántas aristas tiene un cubo?",
     [12, 8, 6], 12,
     ["Una arista es un borde donde se juntan dos caras.", "Cuenta los bordes del cubo."],
     "Un cubo tiene 12 aristas.", 3),
  mc("¿Qué sólido tiene dos caras circulares?",
     ["Cilindro", "Cubo", "Pirámide"], "Cilindro",
     ["El cilindro tiene dos bases circulares.", "Un cubo tiene solo caras cuadradas."],
     "El cilindro tiene dos caras circulares.", 1),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-estadistica · 📊 "Estadística" [peach]║
// ║  desc: Leer e interpretar pictogramas con escala.                       ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 1/1 · pictogramas-escala · "Pictogramas con escala"             ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2PictogramasEscala: ExS[] = [
  lumi(
    [{ emoji: "📊", repeat: 1, text: "Un pictograma usa símbolos para mostrar datos. La escala dice cuánto vale cada símbolo. Si 🍎 = 5, entonces 3 🍎 = 15." }],
    { emoji: "⭐", count: 3, text: "Toca 3 estrellas.", successText: "¡A leer pictogramas!" },
  ),
  mc("En un pictograma 🍎 = 5 frutas. Hay 3 🍎. ¿Cuántas frutas?",
     [15, 3, 10], 15,
     ["3 × 5 = ?", "Cada símbolo vale 5."],
     "3 × 5 = 15 frutas."),
  mc("En un pictograma ⭐ = 10 puntos. Juan tiene 4 ⭐. ¿Cuántos puntos?",
     [40, 4, 14], 40,
     ["4 × 10 = ?", "Cada estrella vale 10 puntos."],
     "4 × 10 = 40 puntos."),
  mc("Pictograma: Lunes 🍎🍎, Martes 🍎🍎🍎 (🍎 = 4). ¿Cuántas más el martes?",
     [4, 3, 8], 4,
     ["Martes: 3×4=12. Lunes: 2×4=8.", "12 − 8 = ?"],
     "12 − 8 = 4 más el martes.", 3),
  mc("Un pictograma usa 🔵 = 2 niños. ¿Cuántos 🔵 necesitas para 10 niños?",
     [5, 10, 2], 5,
     ["10 ÷ 2 = ?", "¿Cuántas veces cabe 2 en 10?"],
     "10 ÷ 2 = 5 símbolos."),
  mc("En un pictograma 📚 = 5 libros. Si hay 7 📚, ¿cuántos libros son?",
     [35, 7, 30], 35,
     ["7 × 5 = ?", "7 grupos de 5."],
     "7 × 5 = 35 libros."),
  mc("¿Para qué sirve la escala en un pictograma?",
     ["Para saber cuánto vale cada símbolo", "Para decorar el gráfico", "Para ordenar los datos"],
     "Para saber cuánto vale cada símbolo",
     ["Sin escala no sabes el valor real.", "La escala convierte símbolos en cantidades."],
     "La escala indica el valor de cada símbolo.", 1),
];

// ─────────────────────────────────────────────────────────────────────────────

const readingInitialPreviewExercises: ExerciseSeed[] = [
  {
    kind: ExerciseKind.TEACH,
    order: 0,
    prompt: "",
    payload: {
      teach: {
        beats: [
          {
            emoji: "🔤",
            repeat: 1,
            text: "Esta prueba muestra cómo Paskalito ayuda a reconocer letras, sonidos y trazos.",
          },
        ],
        tryIt: {
          emoji: "A",
          count: 1,
          text: "Toca la A para empezar.",
          successText: "¡Vamos con las vocales!",
        },
      },
    } as Prisma.InputJsonValue,
    solution: {},
    difficulty: 1,
    xpReward: 0,
  },
  {
    kind: ExerciseKind.MATCH,
    order: 1,
    prompt: "Une cada vocal con su pareja.",
    payload: {
      visual: "same-match",
      left: [
        { id: "A", emoji: "A" },
        { id: "E", emoji: "E" },
        { id: "I", emoji: "I" },
      ],
      right: [
        { id: "E", emoji: "E" },
        { id: "I", emoji: "I" },
        { id: "A", emoji: "A" },
      ],
    } as Prisma.InputJsonValue,
    solution: { pairs: [[0, 2], [1, 0], [2, 1]] },
    hints: ["Busca la misma letra.", "Toca una tarjeta y después su pareja."],
    explanation: "Cada vocal encontró otra igual.",
    difficulty: 1,
    xpReward: 6,
  },
  {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    order: 2,
    prompt: "Toca la letra A.",
    payload: { visual: "letter", letter: "A", options: ["A", "E", "I", "O"] } as Prisma.InputJsonValue,
    solution: { answer: "A" },
    hints: ["Busca la tarjeta que tiene la A.", "Mira su forma antes de tocar."],
    explanation: "Esa es la letra A. Primero la reconocemos, después la trazamos.",
    difficulty: 1,
    xpReward: 5,
  },
  {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    order: 3,
    prompt: "¿Con qué letra empieza abeja?",
    payload: { visual: "emoji-word", emoji: "🐝", label: "abeja", options: ["A", "E", "I", "O"] } as Prisma.InputJsonValue,
    solution: { answer: "A" },
    hints: ["Di la palabra despacio: abeja.", "Escucha el primer sonido: A."],
    explanation: "Abeja empieza con A.",
    difficulty: 1,
    xpReward: 6,
  },
  {
    kind: ExerciseKind.DRAW,
    order: 4,
    prompt: "Traza la letra A con el dedo",
    payload: { letter: "A" } as Prisma.InputJsonValue,
    solution: { answer: "A" },
    hints: ["Sigue la guía despacito.", "Puedes levantar el dedo si la letra tiene más de un trazo."],
    explanation: "Así se escribe la A en imprenta mayúscula.",
    difficulty: 1,
    xpReward: 6,
  },
];

const letterTracingPreviewExercises: ExerciseSeed[] = [
  {
    kind: ExerciseKind.TEACH,
    order: 0,
    prompt: "",
    payload: {
      teach: {
        beats: [
          {
            emoji: "A",
            repeat: 1,
            text: "Esta es la letra A. Primero la miramos, luego la trazamos con el dedo.",
          },
        ],
        tryIt: {
          emoji: "🐝",
          count: 1,
          text: "Abeja empieza con A. Toca la imagen.",
          successText: "¡A de abeja!",
        },
      },
    } as Prisma.InputJsonValue,
    solution: {},
    difficulty: 1,
    xpReward: 0,
  },
  {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    order: 1,
    prompt: "Toca la letra A.",
    payload: { visual: "letter", letter: "A", options: ["A", "E", "I", "O"] } as Prisma.InputJsonValue,
    solution: { answer: "A" },
    hints: ["Busca la tarjeta que tiene la A.", "Mira su forma antes de tocar."],
    explanation: "Esa es la letra A. Primero la reconocemos, después la trazamos.",
    difficulty: 1,
    xpReward: 5,
  },
  {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    order: 2,
    prompt: "¿Con qué letra empieza abeja?",
    payload: { visual: "emoji-word", emoji: "🐝", label: "abeja", options: ["A", "E", "I", "O"] } as Prisma.InputJsonValue,
    solution: { answer: "A" },
    hints: ["Di la palabra despacio: abeja.", "Escucha el primer sonido: A."],
    explanation: "Abeja empieza con A.",
    difficulty: 1,
    xpReward: 5,
  },
  {
    kind: ExerciseKind.DRAW,
    order: 3,
    prompt: "Traza la letra A con el dedo",
    payload: { letter: "A" } as Prisma.InputJsonValue,
    solution: { answer: "A" },
    hints: ["Sigue la guía despacito.", "Puedes levantar el dedo si la letra tiene más de un trazo."],
    explanation: "Así se escribe la A en imprenta mayúscula.",
    difficulty: 1,
    xpReward: 6,
  },
];

const previewExerciseUpdates = [
  {
    unitSlug: "antes-de-contar",
    lessonSlug: "emparejar-iguales",
    exercises: mathInitialPreviewExercises,
  },
  {
    unitSlug: "conocer-el-cero",
    lessonSlug: "trazar-0",
    exercises: numberTracingPreviewExercises,
  },
  {
    unitSlug: "p1-numeros-hasta-20",
    lessonSlug: "contar-hasta-20",
    exercises: primaryOnePreviewExercises,
  },
  {
    unitSlug: "p2-numeros-hasta-1000",
    lessonSlug: "prueba-gratis-p2",
    exercises: primaryTwoPreviewExercises,
  },
  {
    unitSlug: "p2-numeros-hasta-1000",
    lessonSlug: "contar-decenas-centenas",
    exercises: p2ContarDecenasCentenas,
  },
  {
    unitSlug: "p2-numeros-hasta-1000",
    lessonSlug: "valor-posicional-1000",
    exercises: p2ValorPosicional1000,
  },
  {
    unitSlug: "p2-numeros-hasta-1000",
    lessonSlug: "leer-escribir-1000",
    exercises: p2LeerEscribir1000,
  },
  {
    unitSlug: "p2-numeros-hasta-1000",
    lessonSlug: "comparar-ordenar-1000",
    exercises: p2CompararOrdenar1000,
  },
  {
    unitSlug: "p2-numeros-hasta-1000",
    lessonSlug: "pares-impares-patrones",
    exercises: p2ParesImparesPatrones,
  },
  // ── Unit 2: Suma y resta ──────────────────────────────────────────────────
  { unitSlug: "p2-suma-resta", lessonSlug: "algoritmo-3-digitos",    exercises: p2Algoritmo3Digitos    },
  { unitSlug: "p2-suma-resta", lessonSlug: "calculo-mental-sr",      exercises: p2CalculoMentalSR      },
  // ── Unit 3: Multiplicación ────────────────────────────────────────────────
  { unitSlug: "p2-multiplicacion", lessonSlug: "grupos-iguales-mult",     exercises: p2GruposIgualesMult     },
  { unitSlug: "p2-multiplicacion", lessonSlug: "tablas-2-5-10",           exercises: p2Tablas2510            },
  { unitSlug: "p2-multiplicacion", lessonSlug: "tablas-3-4",              exercises: p2Tablas34              },
  { unitSlug: "p2-multiplicacion", lessonSlug: "arreglos-filas-columnas", exercises: p2ArreglosFilasColumnas },
  { unitSlug: "p2-multiplicacion", lessonSlug: "calculo-mental-mult",     exercises: p2CalculoMentalMult     },
  // ── Unit 4: División ──────────────────────────────────────────────────────
  { unitSlug: "p2-division", lessonSlug: "repartir-grupos-iguales", exercises: p2RepartirGruposIguales },
  { unitSlug: "p2-division", lessonSlug: "mult-y-div-juntas",       exercises: p2MultYDivJuntas        },
  { unitSlug: "p2-division", lessonSlug: "calculo-mental-div",      exercises: p2CalculoMentalDiv      },
  // ── Unit 5: Fracciones ────────────────────────────────────────────────────
  { unitSlug: "p2-fracciones", lessonSlug: "parte-de-un-entero",      exercises: p2ParteDeUnEntero      },
  { unitSlug: "p2-fracciones", lessonSlug: "notacion-fracciones",     exercises: p2NotacionFracciones   },
  { unitSlug: "p2-fracciones", lessonSlug: "comparar-fracciones",     exercises: p2CompararFracciones   },
  { unitSlug: "p2-fracciones", lessonSlug: "sumar-restar-fracciones", exercises: p2SumarRestarFracciones },
  // ── Unit 6: Dinero ────────────────────────────────────────────────────────
  { unitSlug: "p2-dinero", lessonSlug: "contar-soles-centimos",  exercises: p2ContarSolesCentimos  },
  { unitSlug: "p2-dinero", lessonSlug: "leer-precios",           exercises: p2LeerPrecios          },
  { unitSlug: "p2-dinero", lessonSlug: "comparar-montos",        exercises: p2CompararMontos       },
  { unitSlug: "p2-dinero", lessonSlug: "convertir-soles",        exercises: p2ConvertirSoles       },
  // ── Unit 7: Medición ──────────────────────────────────────────────────────
  { unitSlug: "p2-medicion", lessonSlug: "longitud-masa-volumen", exercises: p2LongitudMasaVolumen },
  { unitSlug: "p2-medicion", lessonSlug: "unidades-m-kg-l",       exercises: p2UnidadesMKgL        },
  { unitSlug: "p2-medicion", lessonSlug: "comparar-medidas",      exercises: p2CompararMedidas     },
  // ── Unit 8: El tiempo ─────────────────────────────────────────────────────
  { unitSlug: "p2-el-tiempo", lessonSlug: "hora-al-minuto",          exercises: p2HoraAlMinuto          },
  { unitSlug: "p2-el-tiempo", lessonSlug: "horas-y-minutos",         exercises: p2HorasYMinutos         },
  { unitSlug: "p2-el-tiempo", lessonSlug: "convertir-horas-minutos", exercises: p2ConvertirHorasMinutos  },
  // ── Unit 9: Formas 2D y 3D ───────────────────────────────────────────────
  { unitSlug: "p2-formas", lessonSlug: "patrones-2d", exercises: p2Patrones2D },
  { unitSlug: "p2-formas", lessonSlug: "solidos-3d",  exercises: p2Solidos3D  },
  // ── Unit 10: Estadística ─────────────────────────────────────────────────
  { unitSlug: "p2-estadistica", lessonSlug: "pictogramas-escala", exercises: p2PictogramasEscala },
  // ── Lectura ───────────────────────────────────────────────────────────────
  {
    unitSlug: "letras-sonidos",
    lessonSlug: "reconocer-vocales",
    exercises: readingInitialPreviewExercises,
  },
  {
    unitSlug: "vocales-mayusculas",
    lessonSlug: "trazar-a",
    exercises: letterTracingPreviewExercises,
  },
] as const;

const shopItems = [
  { slug: "hat", kind: "ACCESSORY", name: "Sombrero", icon: "🎩", price: 50, rarity: "COMMON" },
  { slug: "crown", kind: "ACCESSORY", name: "Corona", icon: "👑", price: 200, rarity: "EPIC" },
  { slug: "glasses", kind: "ACCESSORY", name: "Anteojos", icon: "🕶️", price: 80, rarity: "RARE" },
  { slug: "bow", kind: "ACCESSORY", name: "Moño", icon: "🎀", price: 40, rarity: "COMMON" },
  { slug: "horn", kind: "ACCESSORY", name: "Cuerno", icon: "🦄", price: 300, rarity: "LEGENDARY" },
  { slug: "backpack", kind: "ACCESSORY", name: "Mochila", icon: "🎒", price: 120, rarity: "RARE" },
  { slug: "gems-100", kind: "GEMS_PACK", name: "100 gemas", icon: "💎", price: 99 },
  { slug: "gems-500", kind: "GEMS_PACK", name: "500 gemas", icon: "💎", price: 399 },
  { slug: "gems-1500", kind: "GEMS_PACK", name: "1500 gemas", icon: "💎", price: 999 },
  { slug: "hearts-5", kind: "HEARTS_REFILL", name: "Recargar 5", icon: "❤️", price: 30 },
] as const;

const achievements = [
  { slug: "first-lesson", name: "Primera lección", description: "Completa 1 lección", icon: "🌟", target: 1, metric: "lessons_completed" },
  { slug: "streak-3", name: "3 días seguidos", description: "Mantén racha", icon: "🔥", target: 3, metric: "streak" },
  { slug: "correct-100", name: "100 aciertos", description: "Suma 100 correctas", icon: "💯", target: 100, metric: "correct_answers" },
  { slug: "lessons-5", name: "5 lecciones", description: "Completa 5 lecciones", icon: "📚", target: 5, metric: "lessons_completed" },
  { slug: "speed-10", name: "Velocista", description: "10 correctas en 1min", icon: "⚡", target: 10, metric: "speed_run" },
] as const;

async function main() {
  console.log("🌱 Upserting content without touching user data...");

  for (const subject of subjects) {
    await prisma.subject.upsert({
      where: { slug: subject.slug },
      update: subject,
      create: subject,
    });
  }

  const subjectIds = Object.fromEntries(
    (await prisma.subject.findMany({ select: { id: true, slug: true } })).map(
      (subject) => [subject.slug, subject.id],
    ),
  );

  for (const path of paths) {
    const { subjectSlug, ...data } = path;
    const subjectId = subjectIds[subjectSlug];
    if (!subjectId) throw new Error(`Missing subject ${subjectSlug}`);
    await prisma.learningPath.upsert({
      where: { slug: data.slug },
      update: { ...data, subjectId },
      create: { ...data, subjectId },
    });
  }

  const pathIds = Object.fromEntries(
    (await prisma.learningPath.findMany({ select: { id: true, slug: true } })).map(
      (path) => [path.slug, path.id],
    ),
  );

  for (const unit of units) {
    const { pathSlug, ...data } = unit;
    const learningPathId = pathIds[pathSlug];
    if (!learningPathId) throw new Error(`Missing path ${pathSlug}`);
    await prisma.unit.upsert({
      where: { learningPathId_slug: { learningPathId, slug: data.slug } },
      update: { ...data, learningPathId },
      create: { ...data, learningPathId },
    });
  }

  const unitRows = await prisma.unit.findMany({
    select: { id: true, slug: true, learningPathId: true },
  });
  const unitBySlug = new Map(unitRows.map((unit) => [unit.slug, unit]));

  for (const [unitSlug, slug, title, order, xpReward, estimatedMinutes] of lessons) {
    const unit = unitBySlug.get(unitSlug);
    if (!unit) throw new Error(`Missing unit ${unitSlug}`);
    await prisma.lesson.upsert({
      where: { unitId_slug: { unitId: unit.id, slug } },
      update: { title, order, xpReward, estimatedMinutes },
      create: { unitId: unit.id, slug, title, order, xpReward, estimatedMinutes },
    });
  }

  for (const preview of previewExerciseUpdates) {
    const previewUnit = unitBySlug.get(preview.unitSlug);
    if (!previewUnit) throw new Error(`Missing preview unit ${preview.unitSlug}`);
    const previewLesson = await prisma.lesson.findUnique({
      where: {
        unitId_slug: {
          unitId: previewUnit.id,
          slug: preview.lessonSlug,
        },
      },
      select: { id: true },
    });
    if (!previewLesson) throw new Error(`Missing preview lesson ${preview.lessonSlug}`);

    const existingPreviewExercises = await prisma.exercise.findMany({
      where: { lessonId: previewLesson.id },
      orderBy: { order: "asc" },
      select: { id: true },
    });

    for (const [index, exercise] of preview.exercises.entries()) {
      const data = { ...exercise, order: index };
      const existing = existingPreviewExercises[index];
      if (existing) {
        await prisma.exercise.update({
          where: { id: existing.id },
          data,
        });
      } else {
        await prisma.exercise.create({
          data: { ...data, lessonId: previewLesson.id },
        });
      }
    }
  }

  for (const item of shopItems) {
    await prisma.shopItem.upsert({
      where: { slug: item.slug },
      update: item,
      create: item,
    });
  }

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { slug: achievement.slug },
      update: achievement,
      create: achievement,
    });
  }

  const counts = {
    subjects: await prisma.subject.count(),
    paths: await prisma.learningPath.count(),
    units: await prisma.unit.count(),
    lessons: await prisma.lesson.count(),
    shopItems: await prisma.shopItem.count(),
    achievements: await prisma.achievement.count(),
  };
  console.log("✅ Content seed listo:", counts);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
