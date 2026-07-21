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
    subjectSlug: "math",
    slug: "math-primary-3",
    name: "3.º grado · Matemática con Paskalito",
    description:
      "Números hasta el 10,000, multiplicación avanzada, fracciones equivalentes, área, perímetro, ángulos y gráficas de barras.",
    level: EducationLevel.PRIMARY,
    grade: 3,
    difficulty: 4,
    isPremium: true,
    order: 5,
  },
  {
    subjectSlug: "math",
    slug: "math-primary-4",
    name: "4.º grado · Matemática con Paskalito",
    description:
      "Números hasta el 100,000, factores y múltiplos, decimales, fracciones mixtas, área, simetría, redes 3D y gráficos de líneas y circulares.",
    level: EducationLevel.PRIMARY,
    grade: 4,
    difficulty: 5,
    isPremium: true,
    order: 6,
  },
  {
    subjectSlug: "math",
    slug: "math-primary-5",
    name: "5.º grado · Matemática con Paskalito",
    description:
      "Números hasta 10 millones, operaciones con fracciones y decimales, porcentajes, tasa, área de triángulos, volumen y ángulos.",
    level: EducationLevel.PRIMARY,
    grade: 5,
    difficulty: 6,
    isPremium: true,
    order: 7,
  },
  {
    subjectSlug: "math",
    slug: "math-primary-6",
    name: "6.º grado · Matemática con Paskalito",
    description:
      "División de fracciones, porcentajes avanzados, razones, álgebra, círculos, volumen y promedios.",
    level: EducationLevel.PRIMARY,
    grade: 6,
    difficulty: 7,
    isPremium: true,
    order: 8,
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
    description:
      "Repartir en grupos iguales y la relación con la multiplicación.",
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
  // ── 3.º GRADO ─────────────────────────────────────────────────────────────
  {
    pathSlug: "math-primary-3",
    slug: "p3-numeros-10000",
    title: "Números hasta el 10,000",
    description: "Contar, leer, comparar y ordenar números hasta el 10,000.",
    order: 1,
    color: "sky",
    icon: "🔢",
  },
  {
    pathSlug: "math-primary-3",
    slug: "p3-suma-resta",
    title: "Suma y resta",
    description: "Algoritmos de 4 dígitos y cálculo mental con 2 dígitos.",
    order: 2,
    color: "mint",
    icon: "➕",
  },
  {
    pathSlug: "math-primary-3",
    slug: "p3-multiplicacion-division",
    title: "Multiplicación y División",
    description: "Tablas del 6 al 9, división con residuo y algoritmos.",
    order: 3,
    color: "sun",
    icon: "✖️",
  },
  {
    pathSlug: "math-primary-3",
    slug: "p3-fracciones",
    title: "Fracciones",
    description: "Fracciones equivalentes, simplificación y operaciones.",
    order: 4,
    color: "lilac",
    icon: "🍕",
  },
  {
    pathSlug: "math-primary-3",
    slug: "p3-dinero",
    title: "Dinero",
    description: "Sumar y restar dinero en notación decimal.",
    order: 5,
    color: "sun",
    icon: "💰",
  },
  {
    pathSlug: "math-primary-3",
    slug: "p3-medicion-tiempo",
    title: "Medición y Tiempo",
    description: "Unidades compuestas, conversión, duración y reloj de 24 h.",
    order: 6,
    color: "mint",
    icon: "📏",
  },
  {
    pathSlug: "math-primary-3",
    slug: "p3-area-perimetro",
    title: "Área y Perímetro",
    description: "Área en cuadrículas y perímetro de rectángulos.",
    order: 7,
    color: "rose",
    icon: "📐",
  },
  {
    pathSlug: "math-primary-3",
    slug: "p3-geometria",
    title: "Geometría",
    description: "Ángulos rectos, agudos, obtusos y líneas paralelas.",
    order: 8,
    color: "peach",
    icon: "🔷",
  },
  {
    pathSlug: "math-primary-3",
    slug: "p3-estadistica",
    title: "Estadística",
    description: "Leer e interpretar gráficos de barras con escala.",
    order: 9,
    color: "sky",
    icon: "📊",
  },
  // ── 4.º GRADO ─────────────────────────────────────────────────────────────
  {
    pathSlug: "math-primary-4",
    slug: "p4-numeros-100000",
    title: "Números hasta el 100,000",
    description: "Valor posicional, comparar, ordenar, patrones y redondeo.",
    order: 1,
    color: "sky",
    icon: "🔢",
  },
  {
    pathSlug: "math-primary-4",
    slug: "p4-factores-multiplos",
    title: "Factores y Múltiplos",
    description: "Encontrar factores, múltiplos y sus valores comunes.",
    order: 2,
    color: "mint",
    icon: "🧩",
  },
  {
    pathSlug: "math-primary-4",
    slug: "p4-operaciones",
    title: "Las cuatro operaciones",
    description: "Multiplicar hasta 4 dígitos y dividir con algoritmos.",
    order: 3,
    color: "sun",
    icon: "✖️",
  },
  {
    pathSlug: "math-primary-4",
    slug: "p4-fracciones",
    title: "Fracciones",
    description: "Números mixtos, fracciones impropias y de un conjunto.",
    order: 4,
    color: "lilac",
    icon: "🍕",
  },
  {
    pathSlug: "math-primary-4",
    slug: "p4-decimales",
    title: "Decimales",
    description: "Notación decimal, comparar, convertir y redondear.",
    order: 5,
    color: "rose",
    icon: "🔟",
  },
  {
    pathSlug: "math-primary-4",
    slug: "p4-decimales-operaciones",
    title: "Operaciones con decimales",
    description: "Sumar, restar, multiplicar y dividir decimales.",
    order: 6,
    color: "peach",
    icon: "➕",
  },
  {
    pathSlug: "math-primary-4",
    slug: "p4-area-perimetro",
    title: "Área y Perímetro",
    description: "Dimensiones, figuras compuestas de rectángulos y cuadrados.",
    order: 7,
    color: "sun",
    icon: "📐",
  },
  {
    pathSlug: "math-primary-4",
    slug: "p4-geometria",
    title: "Geometría",
    description: "Ángulos, simetría, propiedades de figuras y redes 3D.",
    order: 8,
    color: "mint",
    icon: "🔷",
  },
  {
    pathSlug: "math-primary-4",
    slug: "p4-estadistica",
    title: "Estadística",
    description: "Tablas, gráficos de líneas y gráficos circulares.",
    order: 9,
    color: "sky",
    icon: "📊",
  },
  // ── 5.º GRADO ─────────────────────────────────────────────────────────────
  {
    pathSlug: "math-primary-5",
    slug: "p5-numeros-millones",
    title: "Números hasta 10 millones",
    description: "Leer, escribir, comparar y ordenar números muy grandes.",
    order: 1,
    color: "sky",
    icon: "🔢",
  },
  {
    pathSlug: "math-primary-5",
    slug: "p5-operaciones",
    title: "Las cuatro operaciones",
    description: "Multiplicar y dividir por 10, 100, 1000 y orden de operaciones.",
    order: 2,
    color: "mint",
    icon: "✖️",
  },
  {
    pathSlug: "math-primary-5",
    slug: "p5-fracciones",
    title: "Fracciones",
    description: "Fracción como división y operaciones con fracciones.",
    order: 3,
    color: "lilac",
    icon: "🍕",
  },
  {
    pathSlug: "math-primary-5",
    slug: "p5-decimales",
    title: "Decimales",
    description: "Multiplicar y dividir decimales y convertir unidades.",
    order: 4,
    color: "rose",
    icon: "🔟",
  },
  {
    pathSlug: "math-primary-5",
    slug: "p5-porcentaje",
    title: "Porcentaje",
    description: "Expresar y calcular porcentajes, descuentos e intereses.",
    order: 5,
    color: "peach",
    icon: "％",
  },
  {
    pathSlug: "math-primary-5",
    slug: "p5-tasa",
    title: "Tasa",
    description: "Cantidad por unidad y cálculo de tasa, total y unidades.",
    order: 6,
    color: "sun",
    icon: "⚡",
  },
  {
    pathSlug: "math-primary-5",
    slug: "p5-area-volumen",
    title: "Área y Volumen",
    description: "Área de triángulos y volumen de cubos y cuboides.",
    order: 7,
    color: "mint",
    icon: "📐",
  },
  {
    pathSlug: "math-primary-5",
    slug: "p5-geometria",
    title: "Geometría",
    description: "Ángulos, triángulos y cuadriláteros; ángulos desconocidos.",
    order: 8,
    color: "rose",
    icon: "🔷",
  },
  // ── 6.º GRADO ─────────────────────────────────────────────────────────────
  {
    pathSlug: "math-primary-6",
    slug: "p6-fracciones",
    title: "Fracciones",
    description: "Dividir fracciones entre números enteros y otras fracciones.",
    order: 1,
    color: "lilac",
    icon: "🍕",
  },
  {
    pathSlug: "math-primary-6",
    slug: "p6-porcentaje",
    title: "Porcentaje",
    description: "Hallar el total desde una parte y aumentos o descuentos.",
    order: 2,
    color: "peach",
    icon: "％",
  },
  {
    pathSlug: "math-primary-6",
    slug: "p6-razones",
    title: "Razones",
    description: "Notación a:b, razones equivalentes, repartir y simplificar.",
    order: 3,
    color: "sun",
    icon: "⚖️",
  },
  {
    pathSlug: "math-primary-6",
    slug: "p6-algebra",
    title: "Álgebra",
    description: "Letras como incógnitas, expresiones y ecuaciones simples.",
    order: 4,
    color: "sky",
    icon: "🔤",
  },
  {
    pathSlug: "math-primary-6",
    slug: "p6-circulo",
    title: "El círculo",
    description: "Área y circunferencia del círculo, semicírculo y cuarto.",
    order: 5,
    color: "rose",
    icon: "⭕",
  },
  {
    pathSlug: "math-primary-6",
    slug: "p6-volumen",
    title: "Volumen",
    description: "Hallar dimensiones del cubo y cuboide, raíces cuadrada y cúbica.",
    order: 6,
    color: "mint",
    icon: "📦",
  },
  {
    pathSlug: "math-primary-6",
    slug: "p6-geometria",
    title: "Geometría",
    description: "Ángulos desconocidos en cuadriláteros especiales y figuras.",
    order: 7,
    color: "lilac",
    icon: "🔷",
  },
  {
    pathSlug: "math-primary-6",
    slug: "p6-estadistica",
    title: "Estadística",
    description: "El promedio de un conjunto de datos.",
    order: 8,
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
  ["contar-tocando-1-5", "repaso-contar-1-5", "Repaso 1 al 5", 5, 28, 7],
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
  [
    "p1-numeros-hasta-20",
    "contar-hasta-20",
    "Prueba gratis: contar hasta 20",
    1,
    32,
    7,
  ],
  ["p1-numeros-hasta-20", "leer-numeros-20", "Leer números hasta 20", 2, 30, 7],
  ["p1-numeros-hasta-20", "comparar-hasta-20", "Comparar hasta 20", 3, 32, 7],
  [
    "p1-numeros-hasta-20",
    "ordinales-primero-decimo",
    "Primero a décimo",
    4,
    32,
    7,
  ],
  ["p1-decenas-unidades", "hacer-una-decena", "Hacer una decena", 1, 30, 7],
  ["p1-decenas-unidades", "valor-posicional", "Valor posicional", 2, 32, 8],
  ["p1-decenas-unidades", "ordenar-hasta-100", "Ordenar hasta 100", 3, 34, 8],
  ["p1-decenas-unidades", "patrones-numericos", "Patrones numéricos", 4, 34, 8],
  ["p1-sumas-restas", "sumar-hasta-20", "Sumar hasta 20", 1, 34, 8],
  ["p1-sumas-restas", "restar-hasta-20", "Restar hasta 20", 2, 34, 8],
  [
    "p1-sumas-restas",
    "sumar-restar-hasta-100",
    "Sumar y restar decenas",
    3,
    36,
    8,
  ],
  [
    "p1-sumas-restas",
    "familias-de-hechos",
    "Familias de suma y resta",
    4,
    36,
    8,
  ],
  [
    "p1-grupos-iguales",
    "contar-grupos-iguales",
    "Contar grupos iguales",
    1,
    34,
    8,
  ],
  ["p1-grupos-iguales", "arreglos-y-filas", "Filas y columnas", 2, 34, 8],
  [
    "p1-grupos-iguales",
    "repartir-en-partes-iguales",
    "Repartir en partes iguales",
    3,
    36,
    8,
  ],
  ["p1-medicion-tiempo-dinero", "contar-dinero", "Contar dinero", 1, 32, 7],
  [
    "p1-medicion-tiempo-dinero",
    "comparar-longitudes",
    "Comparar longitudes",
    2,
    32,
    7,
  ],
  ["p1-medicion-tiempo-dinero", "leer-horas", "Leer horas", 3, 32, 7],
  ["p1-formas-y-datos", "formas-2d", "Figuras 2D", 1, 32, 7],
  ["p1-formas-y-datos", "crear-figuras", "Crear figuras", 2, 34, 8],
  ["p1-formas-y-datos", "leer-pictogramas", "Leer pictogramas", 3, 34, 8],
  [
    "p1-formas-y-datos",
    "repaso-primer-grado-1",
    "Repaso de 1.º grado",
    4,
    38,
    9,
  ],
  // ── 2.º GRADO ─────────────────────────────────────────────────────────────
  // Unit: p2-numeros-hasta-1000
  [
    "p2-numeros-hasta-1000",
    "prueba-gratis-p2",
    "Prueba gratis: hasta el 1000",
    1,
    34,
    8,
  ],
  [
    "p2-numeros-hasta-1000",
    "contar-decenas-centenas",
    "Contar en decenas y centenas",
    2,
    32,
    7,
  ],
  [
    "p2-numeros-hasta-1000",
    "valor-posicional-1000",
    "Valor posicional hasta 1000",
    3,
    34,
    8,
  ],
  [
    "p2-numeros-hasta-1000",
    "leer-escribir-1000",
    "Leer y escribir hasta 1000",
    4,
    34,
    8,
  ],
  [
    "p2-numeros-hasta-1000",
    "comparar-ordenar-1000",
    "Comparar y ordenar hasta 1000",
    5,
    34,
    8,
  ],
  [
    "p2-numeros-hasta-1000",
    "pares-impares-patrones",
    "Patrones, pares e impares",
    6,
    36,
    8,
  ],
  // Unit: p2-suma-resta
  [
    "p2-suma-resta",
    "algoritmo-3-digitos",
    "Sumar y restar hasta 3 dígitos",
    1,
    36,
    8,
  ],
  [
    "p2-suma-resta",
    "calculo-mental-sr",
    "Cálculo mental con centenas",
    2,
    36,
    9,
  ],
  // Unit: p2-multiplicacion
  [
    "p2-multiplicacion",
    "grupos-iguales-mult",
    "Grupos iguales: la idea de multiplicar",
    1,
    34,
    8,
  ],
  ["p2-multiplicacion", "tablas-2-5-10", "Tablas del 2, 5 y 10", 2, 36, 8],
  ["p2-multiplicacion", "tablas-3-4", "Tablas del 3 y el 4", 3, 36, 8],
  [
    "p2-multiplicacion",
    "arreglos-filas-columnas",
    "Filas y columnas",
    4,
    38,
    9,
  ],
  [
    "p2-multiplicacion",
    "calculo-mental-mult",
    "Cálculo mental: multiplicar",
    5,
    38,
    9,
  ],
  // Unit: p2-division
  [
    "p2-division",
    "repartir-grupos-iguales",
    "Repartir en grupos iguales",
    1,
    34,
    8,
  ],
  [
    "p2-division",
    "mult-y-div-juntas",
    "Multiplicación y división: familia de hechos",
    2,
    36,
    8,
  ],
  ["p2-division", "calculo-mental-div", "Cálculo mental: dividir", 3, 38, 9],
  // Unit: p2-fracciones
  ["p2-fracciones", "parte-de-un-entero", "Fracción de un entero", 1, 34, 7],
  [
    "p2-fracciones",
    "notacion-fracciones",
    "Leer y escribir fracciones",
    2,
    34,
    8,
  ],
  ["p2-fracciones", "comparar-fracciones", "Comparar fracciones", 3, 36, 8],
  [
    "p2-fracciones",
    "sumar-restar-fracciones",
    "Sumar y restar fracciones similares",
    4,
    38,
    9,
  ],
  // Unit: p2-dinero
  ["p2-dinero", "contar-soles-centimos", "Contar soles y céntimos", 1, 32, 7],
  ["p2-dinero", "leer-precios", "Leer y escribir precios", 2, 32, 7],
  ["p2-dinero", "comparar-montos", "Comparar cantidades de dinero", 3, 34, 8],
  [
    "p2-dinero",
    "convertir-soles",
    "Convertir soles a céntimos y viceversa",
    4,
    36,
    8,
  ],
  // Unit: p2-medicion
  [
    "p2-medicion",
    "longitud-masa-volumen",
    "Medir longitud, masa y volumen",
    1,
    32,
    7,
  ],
  ["p2-medicion", "unidades-m-kg-l", "Unidades: m, g, kg y L", 2, 32, 7],
  ["p2-medicion", "comparar-medidas", "Comparar y ordenar medidas", 3, 34, 8],
  // Unit: p2-el-tiempo
  ["p2-el-tiempo", "hora-al-minuto", "La hora al minuto", 1, 32, 7],
  ["p2-el-tiempo", "horas-y-minutos", "Horas y minutos", 2, 32, 7],
  [
    "p2-el-tiempo",
    "convertir-horas-minutos",
    "Convertir horas a minutos y viceversa",
    3,
    34,
    8,
  ],
  // Unit: p2-formas
  ["p2-formas", "patrones-2d",          "Patrones con figuras 2D",    1, 32, 7],
  ["p2-formas", "solidos-3d",           "Sólidos 3D",                  2, 32, 7],
  ["p2-formas", "figuras-2d",           "Figuras 2D",                  3, 32, 7],
  ["p2-formas", "formar-figuras",       "Formar figuras",              4, 32, 7],
  ["p2-formas", "descomponer-figuras",  "¿Qué formas hay?",            5, 32, 7],
  ["p2-formas", "cuadricula-puntos",    "Copiar en cuadrícula",        6, 32, 7],
  // Unit: p2-estadistica
  ["p2-estadistica", "pictogramas-escala", "Pictogramas con escala", 1, 34, 8],
  // ── 3.º grado ─────────────────────────────────────────────────────────────
  // Unit: p3-numeros-10000
  ["p3-numeros-10000", "prueba-gratis-p3",       "Prueba gratis P3",                   0, 26, 6],
  ["p3-numeros-10000", "contar-cientos-miles",   "Contar en cientos y miles",           1, 36, 8],
  ["p3-numeros-10000", "valor-posicional-p3",    "Valor posicional hasta el 10,000",    2, 36, 8],
  ["p3-numeros-10000", "comparar-ordenar-p3",    "Comparar y ordenar hasta el 10,000",  3, 36, 8],
  ["p3-numeros-10000", "patrones-secuencias-p3", "Patrones en secuencias numéricas",    4, 36, 8],
  // Unit: p3-suma-resta
  ["p3-suma-resta", "algoritmo-4-digitos",  "Sumar y restar hasta 4 dígitos",   1, 38, 9],
  ["p3-suma-resta", "calculo-mental-p3",    "Cálculo mental: suma y resta",      2, 38, 9],
  // Unit: p3-multiplicacion-division
  ["p3-multiplicacion-division", "tablas-6-7-8-9",           "Tablas del 6, 7, 8 y 9",              1, 36, 8],
  ["p3-multiplicacion-division", "mult-div-tablas-p3",       "Multiplicar y dividir en las tablas",  2, 36, 8],
  ["p3-multiplicacion-division", "division-con-residuo",     "División con residuo",                 3, 38, 9],
  ["p3-multiplicacion-division", "algoritmo-mult-p3",        "Multiplicar por un dígito",            4, 38, 9],
  ["p3-multiplicacion-division", "calculo-mental-mult-div",  "Cálculo mental: × y ÷",               5, 38, 9],
  // Unit: p3-fracciones
  ["p3-fracciones", "fracciones-equivalentes-p3", "Fracciones equivalentes",            1, 36, 8],
  ["p3-fracciones", "simplificar-fracciones",     "Simplificar fracciones",             2, 36, 8],
  ["p3-fracciones", "comparar-fracciones-p3",     "Comparar fracciones",                3, 36, 8],
  ["p3-fracciones", "sumar-restar-fracciones-p3", "Sumar y restar fracciones",          4, 38, 9],
  // Unit: p3-dinero
  ["p3-dinero", "dinero-decimal-p3", "Dinero en notación decimal", 1, 36, 8],
  // Unit: p3-medicion-tiempo
  ["p3-medicion-tiempo", "longitud-km-volumen-ml",    "Longitud en km y volumen en ml",  1, 34, 8],
  ["p3-medicion-tiempo", "unidades-compuestas-p3",    "Unidades compuestas",             2, 36, 8],
  ["p3-medicion-tiempo", "convertir-unidades-p3",     "Convertir entre unidades",        3, 36, 8],
  ["p3-medicion-tiempo", "duracion-horarios-p3",      "Duración y horarios",             4, 36, 8],
  ["p3-medicion-tiempo", "reloj-24-horas",             "Reloj de 24 horas",              5, 36, 8],
  // Unit: p3-area-perimetro
  ["p3-area-perimetro", "area-cuadricula",       "Área en cuadrículas",              1, 36, 8],
  ["p3-area-perimetro", "perimetro-figuras-p3",  "Perímetro de figuras",             2, 36, 8],
  ["p3-area-perimetro", "area-rectangulo-p3",    "Área del rectángulo y el cuadrado",3, 38, 9],
  // Unit: p3-geometria
  ["p3-geometria", "angulos-p3",                        "Ángulos: recto, agudo y obtuso",      1, 34, 8],
  ["p3-geometria", "lineas-paralelas-perpendiculares",  "Líneas paralelas y perpendiculares",  2, 34, 8],
  // Unit: p3-estadistica
  ["p3-estadistica", "graficos-de-barras", "Gráficos de barras", 1, 36, 8],
  // ── 4.º grado ─────────────────────────────────────────────────────────────
  // Unit: p4-numeros-100000
  ["p4-numeros-100000", "prueba-gratis-p4",        "Prueba gratis P4",                    0, 26, 6],
  ["p4-numeros-100000", "valor-posicional-p4",     "Valor posicional hasta el 100,000",   1, 38, 9],
  ["p4-numeros-100000", "comparar-ordenar-p4",     "Comparar y ordenar hasta el 100,000", 2, 38, 9],
  ["p4-numeros-100000", "patrones-secuencias-p4",  "Patrones en secuencias",              3, 38, 9],
  ["p4-numeros-100000", "redondear-numeros-p4",    "Redondear números",                   4, 38, 9],
  // Unit: p4-factores-multiplos
  ["p4-factores-multiplos", "factores-p4",          "Factores de un número",       1, 36, 8],
  ["p4-factores-multiplos", "multiplos-p4",         "Múltiplos de un número",      2, 36, 8],
  ["p4-factores-multiplos", "factores-comunes-p4",  "Factores comunes",            3, 38, 9],
  ["p4-factores-multiplos", "multiplos-comunes-p4", "Múltiplos comunes",           4, 38, 9],
  // Unit: p4-operaciones
  ["p4-operaciones", "mult-4-por-1",    "Multiplicar hasta 4 dígitos por 1", 1, 38, 9],
  ["p4-operaciones", "mult-3-por-2",    "Multiplicar 3 dígitos por 2",       2, 38, 9],
  ["p4-operaciones", "division-4-por-1","Dividir hasta 4 dígitos por 1",     3, 38, 9],
  // Unit: p4-fracciones
  ["p4-fracciones", "numeros-mixtos-p4",         "Números mixtos",                  1, 36, 8],
  ["p4-fracciones", "fracciones-impropias-p4",   "Fracciones impropias",            2, 36, 8],
  ["p4-fracciones", "fraccion-de-conjunto-p4",   "Fracción de un conjunto",         3, 36, 8],
  ["p4-fracciones", "sumar-restar-fracciones-p4","Sumar y restar fracciones",       4, 38, 9],
  // Unit: p4-decimales
  ["p4-decimales", "decimales-notacion-p4",      "Notación de decimales",           1, 36, 8],
  ["p4-decimales", "comparar-decimales-p4",      "Comparar y ordenar decimales",    2, 36, 8],
  ["p4-decimales", "decimales-fracciones-p4",    "Decimales y fracciones",          3, 38, 9],
  ["p4-decimales", "redondear-decimales-p4",     "Redondear decimales",             4, 38, 9],
  // Unit: p4-decimales-operaciones
  ["p4-decimales-operaciones", "sumar-restar-decimales-p4", "Sumar y restar decimales",     1, 38, 9],
  ["p4-decimales-operaciones", "mult-div-decimales-p4",     "Multiplicar y dividir decimales", 2, 38, 9],
  // Unit: p4-area-perimetro
  ["p4-area-perimetro", "area-perimetro-p4",       "Área y perímetro",             1, 36, 8],
  ["p4-area-perimetro", "encontrar-dimension-p4",  "Encontrar una dimensión",      2, 38, 9],
  ["p4-area-perimetro", "figuras-compuestas-p4",   "Figuras compuestas",           3, 38, 9],
  // Unit: p4-geometria
  ["p4-geometria", "angulos-medir-p4",       "Medir ángulos",                 1, 36, 8],
  ["p4-geometria", "rectangulo-cuadrado-p4", "Rectángulo y cuadrado",         2, 36, 8],
  ["p4-geometria", "simetria-p4",            "Simetría",                      3, 38, 9],
  ["p4-geometria", "redes-solidos-p4",       "Redes de sólidos 3D",           4, 38, 9],
  // Unit: p4-estadistica
  ["p4-estadistica", "tablas-datos-p4",       "Tablas de datos",           1, 36, 8],
  ["p4-estadistica", "graficos-lineales-p4",  "Gráficos de líneas",        2, 38, 9],
  ["p4-estadistica", "graficos-circulares-p4","Gráficos circulares",       3, 38, 9],
  // ── 5.º grado ─────────────────────────────────────────────────────────────
  // Unit: p5-numeros-millones
  ["p5-numeros-millones", "prueba-gratis-p5",     "Prueba gratis P5",                 0, 26, 6],
  ["p5-numeros-millones", "leer-escribir-millones","Leer y escribir hasta 10 millones", 1, 40, 9],
  ["p5-numeros-millones", "comparar-ordenar-p5",   "Comparar y ordenar millones",      2, 40, 9],
  // Unit: p5-operaciones
  ["p5-operaciones", "mult-div-10-100-1000", "Multiplicar y dividir por 10, 100, 1000", 1, 40, 9],
  ["p5-operaciones", "orden-operaciones-p5",  "Orden de operaciones",                    2, 40, 9],
  ["p5-operaciones", "uso-de-parentesis-p5",  "Uso de paréntesis",                       3, 40, 9],
  // Unit: p5-fracciones
  ["p5-fracciones", "fraccion-como-division",    "Fracción como división",          1, 38, 9],
  ["p5-fracciones", "fracciones-a-decimales-p5", "Fracciones como decimales",       2, 38, 9],
  ["p5-fracciones", "sumar-restar-mixtos-p5",    "Sumar y restar números mixtos",   3, 40, 9],
  ["p5-fracciones", "multiplicar-fracciones-p5", "Multiplicar fracciones",          4, 40, 9],
  // Unit: p5-decimales
  ["p5-decimales", "mult-div-decimales-10-100", "Multiplicar y dividir decimales por 10, 100", 1, 40, 9],
  ["p5-decimales", "convertir-unidades-decimal", "Convertir unidades en forma decimal",         2, 40, 9],
  // Unit: p5-porcentaje
  ["p5-porcentaje", "expresar-porcentaje-p5",     "Expresar parte como porcentaje",   1, 38, 9],
  ["p5-porcentaje", "porcentaje-de-un-numero-p5", "Porcentaje de un número",          2, 40, 9],
  ["p5-porcentaje", "descuentos-interes-p5",      "Descuentos, IGV e interés",        3, 40, 9],
  // Unit: p5-tasa
  ["p5-tasa", "tasa-por-unidad-p5",  "Tasa por unidad",                1, 38, 9],
  ["p5-tasa", "calcular-tasa-total-p5","Calcular tasa, total y unidades", 2, 40, 9],
  // Unit: p5-area-volumen
  ["p5-area-volumen", "area-triangulo-p5",     "Área del triángulo",          1, 40, 9],
  ["p5-area-volumen", "figuras-compuestas-p5", "Figuras compuestas",          2, 40, 9],
  ["p5-area-volumen", "volumen-cubos-p5",      "Volumen con cubos unitarios", 3, 40, 9],
  ["p5-area-volumen", "volumen-cuboide-p5",    "Volumen del cubo y cuboide",  4, 40, 9],
  // Unit: p5-geometria
  ["p5-geometria", "angulos-recta-punto-p5",  "Ángulos en recta y en un punto", 1, 40, 9],
  ["p5-geometria", "angulos-opuestos-p5",     "Ángulos opuestos por el vértice", 2, 40, 9],
  ["p5-geometria", "triangulos-propiedades-p5","Propiedades de triángulos",      3, 40, 9],
  ["p5-geometria", "cuadrilateros-p5",        "Paralelogramo, rombo y trapecio", 4, 40, 9],
  // ── 6.º grado ─────────────────────────────────────────────────────────────
  // Unit: p6-fracciones
  ["p6-fracciones", "prueba-gratis-p6",         "Prueba gratis P6",                  0, 26, 6],
  ["p6-fracciones", "dividir-fraccion-entero",  "Dividir una fracción entre un entero", 1, 42, 10],
  ["p6-fracciones", "dividir-entre-fraccion",   "Dividir entre una fracción",        2, 42, 10],
  // Unit: p6-porcentaje
  ["p6-porcentaje", "hallar-el-todo-p6",        "Hallar el todo desde una parte",    1, 42, 10],
  ["p6-porcentaje", "aumento-descuento-p6",     "Aumento y descuento porcentual",    2, 42, 10],
  // Unit: p6-razones
  ["p6-razones", "notacion-razones-p6",     "Notación de razones a:b",         1, 40, 9],
  ["p6-razones", "razones-equivalentes-p6", "Razones equivalentes",            2, 42, 10],
  ["p6-razones", "repartir-en-razon-p6",    "Repartir en una razón dada",      3, 42, 10],
  ["p6-razones", "razon-y-fraccion-p6",     "Razón y fracción",                4, 42, 10],
  // Unit: p6-algebra
  ["p6-algebra", "letras-incognitas-p6",    "Letras como incógnitas",          1, 40, 9],
  ["p6-algebra", "evaluar-expresiones-p6",  "Evaluar expresiones",             2, 42, 10],
  ["p6-algebra", "ecuaciones-simples-p6",   "Ecuaciones simples",              3, 42, 10],
  // Unit: p6-circulo
  ["p6-circulo", "partes-del-circulo-p6",   "Partes del círculo",              1, 40, 9],
  ["p6-circulo", "circunferencia-area-p6",  "Circunferencia y área",           2, 42, 10],
  ["p6-circulo", "figuras-con-circulos-p6", "Figuras con semicírculos",        3, 42, 10],
  // Unit: p6-volumen
  ["p6-volumen", "hallar-dimension-p6",     "Hallar una dimensión",            1, 42, 10],
  ["p6-volumen", "raices-cubo-p6",          "Raíz cuadrada y cúbica",          2, 42, 10],
  // Unit: p6-geometria
  ["p6-geometria", "angulos-cuadrilateros-p6", "Ángulos en cuadriláteros",     1, 42, 10],
  ["p6-geometria", "angulos-compuestos-p6",    "Ángulos en figuras compuestas", 2, 42, 10],
  // Unit: p6-estadistica
  ["p6-estadistica", "promedio-p6",         "El promedio",                     1, 40, 9],
  ["p6-estadistica", "usar-el-promedio-p6", "Usar el promedio",                2, 42, 10],
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
type TryIt = {
  emoji: string;
  count: number;
  text: string;
  successText: string;
};

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
  if (config.hundreds)
    parts.push(`${config.hundreds} centena${config.hundreds > 1 ? "s" : ""}`);
  if (config.tens)
    parts.push(`${config.tens} decena${config.tens > 1 ? "s" : ""}`);
  if ((config.ones ?? 0) > 0)
    parts.push(`${config.ones} unidad${(config.ones ?? 0) > 1 ? "es" : ""}`);
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt,
    payload: {
      visual: "place-value",
      ...config,
      options: opts,
    } as Prisma.InputJsonValue,
    solution: { answer: opts[0] },
    hints: [
      "Cuenta primero las centenas, luego las decenas, luego las unidades.",
      parts.join(" + ") + ".",
    ],
    explanation: `${parts.join(" + ")} = ${opts[0]}.`,
    difficulty: (config.hundreds ?? 0) > 0 ? 2 : 1,
    xpReward: 7,
  };
}

function placeValueMarket(target: number): ExS {
  const c = Math.floor(target / 100);
  const d = Math.floor((target % 100) / 10);
  const u = target % 10;
  const parts: string[] = [];
  if (c > 0) parts.push(`${c} centena${c > 1 ? "s" : ""}`);
  if (d > 0) parts.push(`${d} decena${d > 1 ? "s" : ""}`);
  if (u > 0) parts.push(`${u} unidad${u > 1 ? "es" : ""}`);
  const partsStr = parts.join(" + ");
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `Arma el número ${target} con bloques`,
    payload: { visual: "place-value-market", target } as Prisma.InputJsonValue,
    solution: { answer: target },
    hints: ["Toca cada columna para agregar bloques.", partsStr || `${target}`],
    explanation: `${target} = ${partsStr || target}.`,
    difficulty: target >= 100 ? 2 : 1,
    xpReward: 8,
  };
}

function columnSub(a: number, b: number): ExS {
  const diff = a - b;
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `¿Cuánto es ${a} − ${b}?`,
    payload: { visual: "column-subtraction", a, b } as Prisma.InputJsonValue,
    solution: { answer: diff },
    hints: [
      "Resta columna por columna, de derecha a izquierda.",
      `${a} − ${b} = ${diff}.`,
    ],
    explanation: `${a} − ${b} = ${diff}.`,
    difficulty: 2,
    xpReward: 9,
  };
}

function columnAdd(a: number, b: number): ExS {
  const sum = a + b;
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `¿Cuánto es ${a} + ${b}?`,
    payload: { visual: "column-addition", a, b } as Prisma.InputJsonValue,
    solution: { answer: sum },
    hints: [
      "Suma columna por columna, de derecha a izquierda.",
      `${a} + ${b} = ${sum}.`,
    ],
    explanation: `${a} + ${b} = ${sum}.`,
    difficulty: 2,
    xpReward: 9,
  };
}

function digitValueQ(number: number, askIndex: number): ExS {
  const str = String(number);
  const len = str.length;
  const digit = Number(str[askIndex]);
  const pIdx = 3 - len + askIndex; // 0=centenas, 1=decenas, 2=unidades
  const power = 2 - pIdx;
  const correct = digit * Math.pow(10, power);
  // Opciones: el dígito en sus tres posibles valores posicionales
  const opts =
    digit === 0
      ? [0, 10, 100]
      : [...new Set([digit * 100, digit * 10, digit])].slice(0, 3);
  // Ordenar de menor a mayor para que el componente los barajeé
  opts.sort((a, b) => a - b);
  const placeNames = ["centenas", "decenas", "unidades"] as const;
  const placeName = placeNames[pIdx] ?? "unidades";
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `¿Cuánto vale el ${digit} en el número ${number}?`,
    payload: {
      visual: "place-value-digit",
      number,
      askIndex,
      choices: opts,
    } as Prisma.InputJsonValue,
    solution: { answer: correct },
    hints: [
      `El ${digit} está en el lugar de las ${placeName}.`,
      `${digit} en las ${placeName} vale ${correct}.`,
    ],
    explanation: `En ${number}, el ${digit} está en ${placeName} y vale ${correct}.`,
    difficulty: number >= 100 ? 2 : 1,
    xpReward: 8,
  };
}

function mentalCalc(start: number, op: "+" | "-", amount: number): ExS {
  const answer = op === "+" ? start + amount : start - amount;
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `${start} ${op} ${amount} = ?`,
    payload: {
      visual: "mental-calc",
      start,
      op,
      amount,
    } as Prisma.InputJsonValue,
    solution: { answer },
    hints: [
      `Mueve ${amount} desde ${start} en la recta numérica.`,
      `${start} ${op} ${amount} = ${answer}.`,
    ],
    explanation: `${start} ${op} ${amount} = ${answer}.`,
    difficulty: 2,
    xpReward: 8,
  };
}

function flashCardMult(a: number, b: number): ExS {
  const answer = a * b;
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `${a} × ${b} = ?`,
    payload: { visual: "flash-card-mult", a, b } as Prisma.InputJsonValue,
    solution: { answer },
    hints: [`${a} grupos de ${b}`, `${a} × ${b} = ${answer}`],
    explanation: `${a} × ${b} = ${answer}.`,
    difficulty: 2,
    xpReward: 8,
  };
}

function arrayPacker(rows: number, cols: number, icon: string): ExS {
  const total = rows * cols;
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `Empaqueta ${rows} filas de ${cols}. ¿Cuántos en total?`,
    payload: {
      visual: "array-packer",
      rows,
      cols,
      icon,
    } as Prisma.InputJsonValue,
    solution: { answer: total },
    hints: [
      `${rows} filas × ${cols} columnas = ?`,
      `${rows} × ${cols} = ${total}`,
    ],
    explanation: `${rows} filas de ${cols} = ${rows} × ${cols} = ${total}.`,
    difficulty: 2,
    xpReward: 8,
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
    payload: {
      visual: "number-line-input",
      sequence,
      choices,
      step,
    } as Prisma.InputJsonValue,
    solution: { answer },
    hints: [
      `La secuencia salta de ${step} en ${step}.`,
      "Mira el número anterior y el siguiente.",
    ],
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
    payload: {
      visual: "pattern",
      visible,
      step,
      options: opts,
    } as Prisma.InputJsonValue,
    solution: { answer },
    hints: [
      "¿De cuánto en cuánto cambia la secuencia?",
      `${last} ${step > 0 ? "+" : "−"} ${absStep} = ?`,
    ],
    explanation: `Sigue el ${answer}. El patrón ${step > 0 ? "suma" : "resta"} ${absStep} cada vez.`,
    difficulty: step < 0 ? 3 : 2,
    xpReward: 7,
  };
}

function compareNums(
  left: number,
  right: number,
  prompt = "Compara los números y elige el símbolo correcto.",
): ExS {
  const answer: "<" | "=" | ">" =
    left === right ? "=" : left < right ? "<" : ">";
  const sameH = Math.floor(left / 100) === Math.floor(right / 100);
  const sameT = Math.floor(left / 10) === Math.floor(right / 10);
  const hints = !sameH
    ? ["Mira las centenas de cada número.", "Mayor centena → mayor número."]
    : !sameT
      ? ["Las centenas son iguales.", "Mira las decenas ahora."]
      : ["Centenas y decenas son iguales.", "Mira las unidades."];
  const bigger = Math.max(left, right);
  const smaller = Math.min(left, right);
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt,
    payload: { visual: "compare", left, right } as Prisma.InputJsonValue,
    solution: { answer },
    hints,
    explanation:
      answer === "="
        ? `${left} = ${right}. Son iguales.`
        : `${bigger} > ${smaller}.`,
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
    hints: [
      "Mira el primer dígito de cada número.",
      "El que tiene menos centenas va primero.",
    ],
    explanation: `En orden: ${sequence.join(", ")}.`,
    difficulty: numbers.length <= 3 ? 2 : 3,
    xpReward: numbers.length <= 3 ? 8 : 10,
  };
}

function parityNum(value: number): ExS {
  const last = value % 10;
  const answer = last % 2 === 0 ? "Par" : "Impar";
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `¿El ${value} es par o impar?`,
    payload: {
      visual: "parity",
      value,
      options: ["Par", "Impar"],
    } as Prisma.InputJsonValue,
    solution: { answer },
    hints: [
      "Mira solo el último dígito.",
      `Termina en ${last} → ${answer.toLowerCase()}.`,
    ],
    explanation: `${value} es ${answer.toLowerCase()} porque termina en ${last}.`,
    difficulty: value < 100 ? 1 : 2,
    xpReward: 6,
  };
}

function digitQuestion(digit: number, prompt: string, opts: number[]): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt,
    payload: {
      visual: "number-card",
      digit,
      options: opts,
    } as Prisma.InputJsonValue,
    solution: { answer: opts[0] },
    hints: [
      "Mira cada dígito del número.",
      "Cuenta la posición desde la izquierda.",
    ],
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
  if (config.hundreds)
    parts.push(`${config.hundreds} centena${config.hundreds > 1 ? "s" : ""}`);
  if (config.tens)
    parts.push(`${config.tens} decena${config.tens > 1 ? "s" : ""}`);
  if ((config.ones ?? 0) > 0)
    parts.push(`${config.ones} unidad${(config.ones ?? 0) > 1 ? "es" : ""}`);
  return {
    kind: ExerciseKind.INPUT,
    prompt: `Escribe el número: ${parts.join(", ")}.`,
    payload: {
      visual: "place-value",
      ...config,
      inputType: "numeric",
    } as Prisma.InputJsonValue,
    solution: { answer },
    hints: [
      parts[0] ?? "Cuenta los bloques.",
      "Centenas + decenas + unidades.",
    ],
    explanation: `${parts.join(" + ")} = ${answer}.`,
    difficulty: 3,
    xpReward: 9,
  };
}

function paritySort(items: { id: string; category: "par" | "impar" }[]): ExS {
  const parIds = items.filter((i) => i.category === "par").map((i) => i.id);
  const imparIds = items.filter((i) => i.category === "impar").map((i) => i.id);
  return {
    kind: ExerciseKind.DRAG_DROP,
    prompt: "Pon cada número en el grupo correcto.",
    payload: {
      visual: "sort-attribute",
      attribute: "parity",
      items: items.map((i) => ({
        id: i.id,
        emoji: i.id,
        category: i.category,
      })),
      categories: [
        { id: "par", label: "Par", emoji: "👥" },
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
  const answer =
    whole === null
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
function balScale(
  left: number | string,
  right: number | string,
  prompt?: string,
): ExS {
  const lv = typeof left === "number" ? left : parseFloat(String(left));
  const rv = typeof right === "number" ? right : parseFloat(String(right));
  const answer =
    !isNaN(lv) && !isNaN(rv) ? (lv < rv ? "<" : lv > rv ? ">" : "=") : "=";
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: prompt ?? `Compara: ${left} ___ ${right}`,
    payload: { visual: "balance-scale", left, right } as Prisma.InputJsonValue,
    solution: { answer },
    hints: [
      "Mira qué lado de la balanza baja más.",
      answer === "="
        ? "Los dos lados son iguales."
        : `El ${answer === "<" ? "izquierdo" : "derecho"} es más pesado.`,
    ],
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
  const payloadParts = parts.map((p) => ({ value: p.v, label: p.label }));
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt:
      prompt ??
      (total === null
        ? `¿Cuánto es en total?`
        : `¿Cuánto mide la parte que falta?`),
    payload: {
      visual: "bar-model",
      total,
      parts: payloadParts,
      options: opts,
    } as Prisma.InputJsonValue,
    solution: { answer },
    hints: [
      total !== null
        ? `Total: ${total}. Suma conocida: ${knownSum}.`
        : `Suma las partes: ${parts.map((p) => p.v ?? "?").join(" + ")}.`,
      `La respuesta es ${answer}.`,
    ],
    explanation:
      total === null
        ? `${parts.map((p) => p.v ?? Number(answer)).join(" + ")} = ${answer}.`
        : `${total} − ${knownSum} = ${answer}.`,
    difficulty: 2,
    xpReward: 8,
  };
}

// ── Comparar fracciones (dos barras lado a lado) ────────────────────────────
function fracCompare(
  n1: number,
  d1: number,
  n2: number,
  d2: number,
  prompt?: string,
): ExS {
  const v1 = n1 / d1;
  const v2 = n2 / d2;
  const answer = v1 < v2 ? "<" : v1 > v2 ? ">" : "=";
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: prompt ?? `Compara: ${n1}/${d1} ___ ${n2}/${d2}`,
    payload: {
      visual: "fraction-compare",
      n1,
      d1,
      n2,
      d2,
    } as Prisma.InputJsonValue,
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

// ── Pastel en gajos interactivo ────────────────────────────────────────────
// El niño toca gajos de un pastel SVG para colorear exactamente target/slices.
function pieFrac(slices: number, target: number, prompt?: string): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: prompt ?? `Colorea ${target}/${slices} del pastel.`,
    payload: { visual: "fraction-pie", slices, target } as Prisma.InputJsonValue,
    solution: { answer: target },
    hints: [
      `El pastel tiene ${slices} partes iguales. Toca ${target} de ellas.`,
      `La fracción ${target}/${slices} significa ${target} parte${target > 1 ? "s" : ""} de ${slices}.`,
    ],
    explanation: `${target}/${slices}: coloreamos ${target} de las ${slices} partes iguales.`,
    difficulty: 1,
    xpReward: 7,
  };
}

// ── Barras de fracciones comparativas interactivas ─────────────────────────
// El niño toca la barra más grande (auto-valida). solution.answer = índice (0 ó 1).
function fracBarsGame(
  n1: number, d1: number,
  n2: number, d2: number,
  prompt?: string,
): ExS {
  const v1 = n1 / d1;
  const v2 = n2 / d2;
  const correctIdx = v1 >= v2 ? 0 : 1;
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: prompt ?? `¿Cuál fracción es mayor: ${n1}/${d1} ó ${n2}/${d2}?`,
    payload: { visual: "fraction-bars", n1, d1, n2, d2 } as Prisma.InputJsonValue,
    solution: { answer: correctIdx },
    hints: [
      `Mira cuántos segmentos coloreados tiene cada barra.`,
      `${n1}/${d1} ${v1 > v2 ? ">" : v1 < v2 ? "<" : "="} ${n2}/${d2}.`,
    ],
    explanation: `${n1}/${d1} = ${v1.toFixed(2)} y ${n2}/${d2} = ${v2.toFixed(2)}.`,
    difficulty: d1 === d2 ? 1 : 2,
    xpReward: 8,
  };
}

// ── Canasta de frutas interactiva ──────────────────────────────────────────
// El niño ajusta el numerador con ▲/▼ para coincidir con target de total frutas.
function fruitFrac(
  total: number, target: number,
  targetIcon: string, otherIcon: string,
  prompt?: string,
): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: prompt ?? `¿Qué fracción de la canasta son ${targetIcon}?`,
    payload: {
      visual: "fruit-fraction", total, target, targetIcon, otherIcon,
    } as Prisma.InputJsonValue,
    solution: { answer: target },
    hints: [
      `Cuenta los ${targetIcon} en la canasta.`,
      `Son ${target} de ${total} frutas: ${target}/${total}.`,
    ],
    explanation: `Hay ${target} ${targetIcon} de ${total} frutas: ${target}/${total}.`,
    difficulty: 1,
    xpReward: 7,
  };
}

// ── Formato de soles (helper local) ────────────────────────────────────────
function fmtS(cents: number): string {
  if (cents % 100 === 0) return `S/ ${cents / 100}.00`;
  return `S/ ${(cents / 100).toFixed(2)}`;
}

// ── Dar cambio (cashier mechanic) ──────────────────────────────────────────
function changeGame(price: number, payment: number, prompt?: string): ExS {
  const change = payment - price;
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: prompt ?? `Precio: ${fmtS(price)} · Pagas con: ${fmtS(payment)} · ¿Cuánto de cambio?`,
    payload: { visual: "change-making", price, payment } as Prisma.InputJsonValue,
    solution: { answer: change },
    hints: [
      `Pagas ${fmtS(payment)} y el precio es ${fmtS(price)}.`,
      `El cambio es ${fmtS(payment)} − ${fmtS(price)} = ${fmtS(change)}.`,
    ],
    explanation: `${fmtS(payment)} − ${fmtS(price)} = ${fmtS(change)}.`,
    difficulty: 2,
    xpReward: 9,
  };
}

// ── Comparar montos: barra proporcional, toca la mayor/menor ───────────────
function moneyCompare(
  a: number, b: number, askLarger = true, prompt?: string,
): ExS {
  const correctIdx = askLarger ? (a >= b ? 0 : 1) : (a <= b ? 0 : 1);
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: prompt ?? `¿Cuál ${askLarger ? "es mayor" : "es menor"}: ${fmtS(a)} o ${fmtS(b)}?`,
    payload: { visual: "money-compare", a, b, askLarger } as Prisma.InputJsonValue,
    solution: { answer: correctIdx },
    hints: [
      "Compara los soles enteros primero.",
      `${fmtS(a)} ${a >= b ? "≥" : "<"} ${fmtS(b)}.`,
    ],
    explanation: `${fmtS(a)} ${a > b ? ">" : a < b ? "<" : "="} ${fmtS(b)}.`,
    difficulty: 2,
    xpReward: 7,
  };
}

// ── Teclado numérico (sin opción múltiple) ─────────────────────────────────
function numPad(prompt: string, answer: number, hints: string[], explanation: string, diff = 2): ExS {
  return {
    kind: ExerciseKind.INPUT,
    prompt,
    payload: { visual: "number-input" } as Prisma.InputJsonValue,
    solution: { answer },
    hints,
    explanation,
    difficulty: diff,
    xpReward: 8,
  };
}

// ── Toca la unidad correcta para el objeto mostrado ────────────────────────
function unitTap(
  emoji: string, prompt: string, units: string[], correct: string,
): ExS {
  const correctIdx = units.indexOf(correct);
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt,
    payload: { visual: "unit-tap", emoji, units, correctIdx } as Prisma.InputJsonValue,
    solution: { answer: correctIdx },
    hints: ["Piensa: ¿es una longitud, masa o volumen?", `La unidad correcta es ${correct}.`],
    explanation: `Se mide en ${correct}.`,
    difficulty: 1,
    xpReward: 6,
  };
}

// ── Comparar medidas con barras proporcionales ──────────────────────────────
function measureCompare(
  aValue: number, aLabel: string,
  bValue: number, bLabel: string,
  askLarger = true, prompt?: string,
): ExS {
  const correctIdx = askLarger ? (aValue >= bValue ? 0 : 1) : (aValue <= bValue ? 0 : 1);
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: prompt ?? `¿Cuál ${askLarger ? "es mayor" : "es menor"}: ${aLabel} o ${bLabel}?`,
    payload: { visual: "measure-compare", aValue, aLabel, bValue, bLabel, askLarger } as Prisma.InputJsonValue,
    solution: { answer: correctIdx },
    hints: ["Convierte a la misma unidad para comparar.", `${aLabel} ${aValue > bValue ? ">" : "<"} ${bLabel}.`],
    explanation: `${aLabel} ${aValue > bValue ? ">" : aValue < bValue ? "<" : "="} ${bLabel}.`,
    difficulty: 2,
    xpReward: 7,
  };
}

// ── Bloques de conversión de unidades ──────────────────────────────────────
function unitBlock(
  n: number, sourceLabel: string, targetFactor: number, targetUnit: string, prompt?: string,
): ExS {
  const answer = n * targetFactor;
  const srcUnit = sourceLabel.split(" ").pop() ?? sourceLabel;
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: prompt ?? `${n} ${srcUnit} = ___ ${targetUnit}. Toca cada bloque.`,
    payload: { visual: "unit-block", n, sourceLabel, targetFactor, targetUnit } as Prisma.InputJsonValue,
    solution: { answer },
    hints: [`1 ${srcUnit} = ${targetFactor} ${targetUnit}.`, `${n} × ${targetFactor} = ?`],
    explanation: `${n} ${srcUnit} = ${answer} ${targetUnit}.`,
    difficulty: 1,
    xpReward: 7,
  };
}

// ── Contar dinero: toca billetes y monedas → total en billetera ────────────
// items se expande desde groups (count repeticiones). answer en céntimos (int).
function moneyCount(
  groups: { label: string; value: number; type: "bill" | "coin"; count?: number }[],
  prompt?: string,
): ExS {
  const items: { label: string; value: number; type: "bill" | "coin" }[] = [];
  for (const g of groups) {
    for (let k = 0; k < (g.count ?? 1); k++) {
      items.push({ label: g.label, value: g.value, type: g.type });
    }
  }
  const totalCents = items.reduce((s, it) => s + it.value, 0);
  const soles = (totalCents / 100).toFixed(2);
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: prompt ?? "¿Cuánto dinero hay en total?",
    payload: { visual: "money-count", items } as Prisma.InputJsonValue,
    solution: { answer: totalCents },
    hints: [
      "Toca cada billete y moneda para ir sumando.",
      `El total es S/ ${soles}.`,
    ],
    explanation:
      groups.map(g => `${g.count ?? 1} × ${g.label}`).join(" + ") +
      ` = S/ ${soles}.`,
    difficulty: 2,
    xpReward: 8,
  };
}

// ── Casillas de fracción (sumar / restar mismo denominador) ────────────────
// El niño toca casillas vacías para sumar, o casillas coloreadas para restar.
function fracTile(a: number, b: number, d: number, op: "+" | "-"): ExS {
  const answer = op === "+" ? a + b : a - b;
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `${a}/${d} ${op} ${b}/${d} = ?`,
    payload: { visual: "fraction-tile", a, b, d, op } as Prisma.InputJsonValue,
    solution: { answer },
    hints: [
      op === "+"
        ? `El denominador no cambia. Solo suma los numeradores: ${a} + ${b}.`
        : `El denominador no cambia. Solo resta los numeradores: ${a} − ${b}.`,
      `La respuesta es ${answer}/${d}.`,
    ],
    explanation: `${a}/${d} ${op} ${b}/${d} = ${answer}/${d}: denominador igual, ${op === "+" ? "suma" : "resta"} los numeradores.`,
    difficulty: 2,
    xpReward: 8,
  };
}

// ── Grupos iguales interactivo (división, estilo Synthesis) ────────────────
// Puntos dispersos en círculo que el niño junta tocándolos: cada `groups`
// puntos se fusionan en una "flor". La cantidad de flores es la respuesta
// (DivisionGroupsGame) — el prompt instruye la acción, no pide marcar.
function divGroups(
  total: number,
  groups: number,
  opts: number[],
  item = "🔵",
  difficulty = 2,
): ExS {
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

// ── Arreglo interactivo (multiplicación) ────────────────────────────────────
// El niño construye el arreglo fila por fila (MultiplicationBuildGame) y ve
// el conteo saltado acumulado — multiplicar como suma de filas iguales.
function multArray(
  rows: number,
  cols: number,
  opts: number[],
  item = "🔵",
): ExS {
  const total = rows * cols;
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `Construye ${rows} filas de ${cols} ${item}`,
    payload: {
      visual: "mult-array-build",
      rows,
      cols,
      item,
      options: opts,
    } as Prisma.InputJsonValue,
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

function fracBar(
  numerator: number,
  denominator: number,
  opts: (number | string)[],
  prompt: string,
): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt,
    payload: {
      visual: "fraction-bar",
      numerator,
      denominator,
      options: opts,
    } as Prisma.InputJsonValue,
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


function clockMC(hours: number, minutes: number, opts: string[]): ExS {
  const h = hours % 12 || 12;
  const m = String(minutes).padStart(2, "0");
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: "¿Qué hora marca el reloj?",
    payload: {
      visual: "clock-face",
      hours,
      minutes,
      options: opts,
    } as Prisma.InputJsonValue,
    solution: { answer: opts[0] },
    hints: [
      "La aguja corta (negra) indica las horas.",
      "La aguja larga (azul) indica los minutos.",
    ],
    explanation: `El reloj marca las ${h}:${m}.`,
    difficulty: minutes === 0 ? 1 : minutes % 15 === 0 ? 2 : 3,
    xpReward: minutes === 0 ? 6 : 7,
  };
}

// ── Contar partes de un sólido: toca cada cara/vértice/arista para contar ─
function shapeCount(
  total: number,
  feature: string,
  noun: string,
  solidEmoji: string,
  solidName: string,
  prompt?: string,
): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: prompt ?? `¿Cuántas ${noun} tiene ${solidName.startsWith("el") || solidName.startsWith("la") ? "" : "el "}${solidName}? Toca cada una para contar.`,
    payload: { visual: "shape-count", total, feature, noun, solidEmoji } as Prisma.InputJsonValue,
    solution: { answer: total },
    hints: [`Un ${solidName} tiene ${total} ${noun}.`],
    explanation: `El ${solidName} tiene ${total} ${noun}.`,
    difficulty: 1,
    xpReward: 8,
  };
}

// ── Reloj interactivo: el niño arrastra el minutero hasta la hora objetivo ─
function clockSet(h: number, m: number, prompt?: string): ExS {
  const label = `${h}:${String(m).padStart(2, "0")}`;
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: prompt ?? `Mueve la aguja azul para marcar las ${label}`,
    payload: { visual: "clock-set", hour: h, minute: m } as Prisma.InputJsonValue,
    solution: { answer: h * 100 + m },
    hints: [
      "La aguja azul larga marca los minutos.",
      `Arrastra hasta el punto dorado — ahí están las ${m} minutos.`,
    ],
    explanation: `Las ${label}: la aguja azul apunta a las ${m} minutos.`,
    difficulty: m === 0 ? 1 : m % 15 === 0 ? 2 : 3,
    xpReward: m === 0 ? 6 : 7,
  };
}

// ── Pictograma con escala: toca los símbolos del renglón para contar ────────
function pictoRead(
  symbol: string,
  scale: number,
  scaleUnit: string,
  rows: { label: string; count: number }[],
  targetLabel: string,
): ExS {
  const targetRow = rows.find((r) => r.label === targetLabel)!;
  const answer    = targetRow.count * scale;
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `¿Cuántos ${scaleUnit} tiene "${targetLabel}"? Toca cada ${symbol}.`,
    payload: { visual: "pictogram-read", symbol, scale, scaleUnit, rows, targetLabel, answer } as Prisma.InputJsonValue,
    solution: { answer },
    hints: [`Cuenta los ${symbol} de "${targetLabel}" y multiplica por ${scale}.`],
    explanation: `${targetLabel}: ${targetRow.count} × ${scale} = ${answer} ${scaleUnit}.`,
    difficulty: 2,
    xpReward: 8,
  };
}

// ── 1.1 Tap all shapes of a given type ─────────────────────────────────────
function tapAllShapes(
  target: string,
  targetLabel: string,
  shapes: { type: string; color: string }[],
): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `Toca todos los ${targetLabel}s`,
    payload: { visual: "tap-shapes", target, shapes } as Prisma.InputJsonValue,
    solution: { answer: 1 },
    hints: [`Busca la figura con forma de ${targetLabel}.`],
    explanation: `Un ${targetLabel} tiene su forma característica.`,
    difficulty: 1,
    xpReward: 7,
  };
}

// ── 1.2 Fill a compound figure region by region ─────────────────────────────
function shapeCompose(figureName: string, prompt: string): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt,
    payload: { visual: "shape-compose", figureName } as Prisma.InputJsonValue,
    solution: { answer: 1 },
    hints: ["Mira cada parte de la figura y piensa qué forma tiene."],
    explanation: "Las figuras se forman combinando formas básicas.",
    difficulty: 2,
    xpReward: 9,
  };
}

// ── 1.3 Identify regions of a complete compound figure ──────────────────────
function shapeDecompose(figureName: string, prompt: string): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt,
    payload: { visual: "shape-decompose", figureName } as Prisma.InputJsonValue,
    solution: { answer: 1 },
    hints: ["Toca cada parte iluminada y elige su figura."],
    explanation: "Las figuras compuestas tienen varias formas básicas en su interior.",
    difficulty: 2,
    xpReward: 9,
  };
}

// ── 1.4 Connect-the-dots on a 5×5 grid ─────────────────────────────────────
function gridTrace(shapeLabel: string, vertices: number[]): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `Copia ${shapeLabel} en la cuadrícula de puntos`,
    payload: { visual: "grid-trace", shapeLabel, vertices } as Prisma.InputJsonValue,
    solution: { answer: 1 },
    hints: ["Sigue el orden del modelo, punto por punto."],
    explanation: `Así se dibuja ${shapeLabel} en una cuadrícula de puntos.`,
    difficulty: 2,
    xpReward: 9,
  };
}

function shapePattern(
  sequence: string[],
  _options: string[],
  answer: string,
  difficulty = 1,
): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: "¿Qué figura sigue?",
    payload: {
      visual: "pattern-continue",
      sequence,
    } as Prisma.InputJsonValue,
    solution: { answer },
    hints: ["Di el patrón en voz baja.", "Busca qué parte se repite."],
    explanation: `El patrón se repite. Sigue ${answer}.`,
    difficulty,
    xpReward: difficulty === 1 ? 6 : 8,
  };
}

// ─── P1 helpers ──────────────────────────────────────────────────────────────

function countGame(count: number, item: string, prompt?: string): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: prompt ?? "Toca cada uno y cuenta. ¿Cuántos hay?",
    payload: { visual: "count", count, item } as Prisma.InputJsonValue,
    solution: { answer: count },
    hints: ["Toca uno por uno sin saltarte ninguno.", `Hay ${count} en total.`],
    explanation: `Hay ${count}. El último número que dices indica cuántos hay.`,
    difficulty: count <= 10 ? 1 : count <= 15 ? 2 : 3,
    xpReward: count <= 10 ? 5 : 7,
  };
}

function subtractGame(total: number, removed: number, item: string, prompt?: string): ExS {
  const answer = total - removed;
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: prompt ?? `Hay ${total} ${item}. Se van ${removed}. ¿Cuántos quedan? Toca los que se van.`,
    payload: { visual: "subtract", total, removed, item } as Prisma.InputJsonValue,
    solution: { answer },
    hints: [`Quita ${removed} tocándolos.`, `${total} − ${removed} = ?`],
    explanation: `${total} − ${removed} = ${answer}.`,
    difficulty: total <= 10 ? 1 : 2,
    xpReward: 7,
  };
}

function compareGroups(
  left: { count: number; item: string },
  right: { count: number; item: string },
  prompt?: string,
): ExS {
  const answer: "izquierda" | "derecha" | "igual" =
    left.count === right.count ? "igual"
    : left.count > right.count ? "izquierda"
    : "derecha";
  const bigger  = Math.max(left.count, right.count);
  const smaller = Math.min(left.count, right.count);
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: prompt ?? "¿En qué lado hay más?",
    payload: {
      visual: "compare-groups",
      left:  { count: left.count,  item: left.item  },
      right: { count: right.count, item: right.item },
    } as Prisma.InputJsonValue,
    solution: { answer },
    hints: [
      "Toca y cuenta los dos grupos.",
      answer === "igual"
        ? `Ambos tienen ${left.count}.`
        : `El lado ${answer === "izquierda" ? "izquierdo" : "derecho"} tiene ${bigger}, el otro ${smaller}.`,
    ],
    explanation:
      answer === "igual"
        ? `Ambos tienen ${left.count}. Son iguales.`
        : `${bigger} > ${smaller}. Hay más en la ${answer === "izquierda" ? "izquierda" : "derecha"}.`,
    difficulty: 1,
    xpReward: 6,
  };
}

function clockRead(
  hour: number,
  minute: number,
  options: { hour: number; minute: number }[],
  correctIdx: number,
  prompt?: string,
): ExS {
  const fmtT = (h: number, m: number) => `${h}:${String(m).padStart(2, "0")}`;
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: prompt ?? "¿Qué hora marca el reloj?",
    payload: { visual: "clock-read", hour, minute, options, correctIdx } as Prisma.InputJsonValue,
    solution: { answer: correctIdx },
    hints: [
      "La aguja corta señala las horas, la larga los minutos.",
      `El reloj marca las ${fmtT(hour, minute)}.`,
    ],
    explanation: `Son las ${fmtT(hour, minute)}.`,
    difficulty: minute === 0 ? 1 : 2,
    xpReward: 6,
  };
}

function ordinalTap(items: string[], targetPos: number, prompt: string): ExS {
  const ORDS = ["","1.º","2.º","3.º","4.º","5.º","6.º","7.º","8.º","9.º","10.º"];
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt,
    payload: { visual: "ordinal-tap", items, targetPos } as Prisma.InputJsonValue,
    solution: { answer: 1 },
    hints: [
      `Cuenta desde la izquierda hasta el ${ORDS[targetPos] ?? `${targetPos}.º`}.`,
      `El ${ORDS[targetPos] ?? `${targetPos}.º`} está en la posición ${targetPos}.`,
    ],
    explanation: `El elemento en la posición ${targetPos} es el ${ORDS[targetPos] ?? `${targetPos}.º`}.`,
    difficulty: targetPos <= 3 ? 1 : targetPos <= 6 ? 2 : 3,
    xpReward: 6,
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
    solution: {
      pairs: [
        [0, 2],
        [1, 0],
        [2, 1],
      ],
    },
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
    hints: [
      "Mira una característica a la vez.",
      "Si se parece a la canasta, va ahí.",
    ],
    explanation:
      "Clasificar es juntar las cosas que comparten una característica.",
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
    hints: [
      "Empieza por el más pequeño o corto.",
      "Después busca el que sigue.",
    ],
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
    explanation:
      "Ese es el número 0. Primero lo reconocemos, después lo trazamos.",
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
    payload: {
      visual: "count",
      item: "⭐",
      count: 12,
    } as Prisma.InputJsonValue,
    solution: { answer: 12 },
    hints: [
      "Cuenta primero diez y después dos más.",
      "Toca uno por uno, sin saltarte ninguno.",
    ],
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
    hints: [
      "La secuencia avanza de 1 en 1.",
      "Mira el número anterior y el siguiente.",
    ],
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

// ═══════════════════════════════════════════════════════════════════════════
// ║  1.º GRADO — ejercicios por lección                                    ║
// ═══════════════════════════════════════════════════════════════════════════

// ── Unit: p1-numeros-hasta-20 ────────────────────────────────────────────
const p1LeerNumeros20: ExerciseSeed[] = [
  { ...lumi([{emoji:"🔢",text:"Vamos a contar y leer números hasta el 20. ¡Señala cada uno mientras cuentas!"}],{emoji:"⭐",count:5,text:"Toca cinco estrellas para empezar.",successText:"¡A contar!"}), order:0 },
  { ...countGame(11, "🍎"), order:1 },
  { ...countGame(14, "⭐"), order:2 },
  { ...countGame(17, "🌸"), order:3 },
  { ...numberLineGap([13, 14, null, 16, 17], [15, 12, 18], 1, "¿Qué número falta en la recta?"), order:4 },
  { ...sortNums([8, 14, 11], "Ordena de menor a mayor."), order:5 },
];

const p1CompararHasta20: ExerciseSeed[] = [
  { ...lumi([{emoji:"⚖️",text:"Comparamos dos grupos para saber cuál tiene más, menos o si son iguales."}],{emoji:"⭐",count:5,text:"Toca cinco estrellas.",successText:"¡A comparar!"}), order:0 },
  { ...compareGroups({count:7,item:"🍎"},{count:9,item:"🍎"},"¿En qué lado hay más 🍎?"), order:1 },
  { ...compareGroups({count:12,item:"⭐"},{count:8,item:"⭐"},"¿Dónde hay más ⭐?"), order:2 },
  { ...compareGroups({count:10,item:"🐣"},{count:10,item:"🐣"},"¿Son iguales o hay más en algún lado?"), order:3 },
  { ...compareNums(11, 15, "¿Cuál símbolo va entre 11 y 15?"), order:4 },
  { ...compareNums(18, 13, "¿Cuál símbolo va entre 18 y 13?"), order:5 },
];

const p1OrdinalesPrimeroDecimo: ExerciseSeed[] = [
  { ...lumi([{emoji:"🏁",text:"Los ordinales dicen la posición: 1.º primero, 2.º segundo, 3.º tercero..."}],{emoji:"🌟",count:5,text:"Toca cinco estrellas.",successText:"¡A aprender posiciones!"}), order:0 },
  { ...ordinalTap(["🐱","🐶","🐸","🦊","🐹"], 3, "¿Cuál es el 3.º?"), order:1 },
  { ...ordinalTap(["🌟","🍎","🎈","🎀","🌈"], 1, "¿Cuál es el 1.º?"), order:2 },
  { ...ordinalTap(["🚗","🚕","🚙","🚌","🚎","🚐","🚑"], 5, "¿Cuál es el 5.º?"), order:3 },
  { ...ordinalTap(["🦁","🐯","🐻","🐼","🐨","🐸","🦊","🐹"], 7, "¿Cuál es el 7.º?"), order:4 },
  { ...ordinalTap(["🍕","🍔","🍟","🌮","🌯","🍜","🍝","🍣","🍤","🍦"], 10, "¿Cuál es el 10.º?"), order:5 },
];

// ── Unit: p1-decenas-unidades ────────────────────────────────────────────
const p1HacerUnaDecena: ExerciseSeed[] = [
  { ...lumi([{emoji:"🔟",text:"Una decena son 10 objetos juntos. Completar hasta 10 nos ayuda a sumar más fácil."}],{emoji:"⭐",count:5,text:"Toca cinco estrellas.",successText:"¡A hacer decenas!"}), order:0 },
  { ...countGame(10, "🟡", "¡Toca todos los círculos para completar una decena!"), order:1 },
  { ...subtractGame(10, 7, "🌟", "Hay 10 🌟. Se van 7. ¿Cuántas quedan para llegar a 10?"), order:2 },
  { ...subtractGame(10, 4, "🍎", "Hay 10 🍎. Se van 4. ¿Cuántas quedan para llegar a 10?"), order:3 },
  { ...subtractGame(10, 3, "⭐", "Hay 10 ⭐. Se van 3. ¿Cuántas quedan?"), order:4 },
  { ...subtractGame(10, 8, "🔵", "Hay 10 🔵. Se van 8. ¿Cuántas quedan para llegar a 10?"), order:5 },
];

const p1ValorPosicionalP1: ExerciseSeed[] = [
  { ...lumi([{emoji:"🏗️",text:"Cada número hasta 100 tiene decenas y unidades. ¡Construye el número con bloques!"}],{emoji:"⭐",count:5,text:"Toca cinco estrellas.",successText:"¡Construyamos!"}), order:0 },
  { ...placeValueMarket(13), order:1 },
  { ...placeValueMarket(27), order:2 },
  { ...placeValueMarket(56), order:3 },
  { ...placeValueMarket(34), order:4 },
  { ...placeValueMarket(93), order:5 },
];

const p1OrdenarHasta100: ExerciseSeed[] = [
  { ...lumi([{emoji:"📊",text:"Para comparar números hasta 100, miramos primero las decenas y luego las unidades."}],{emoji:"⭐",count:5,text:"Toca cinco estrellas.",successText:"¡A ordenar!"}), order:0 },
  { ...compareNums(24, 42, "¿Cuál símbolo va entre 24 y 42?"), order:1 },
  { ...compareNums(87, 73, "¿Cuál símbolo va entre 87 y 73?"), order:2 },
  { ...compareNums(50, 50, "¿Cuál símbolo va entre 50 y 50?"), order:3 },
  { ...numberLineGap([20, 30, null, 50, 60], [40, 35, 45], 10, "¿Qué número falta en la recta?"), order:4 },
  { ...sortNums([47, 32, 68, 15], "Ordena de menor a mayor."), order:5 },
];

const p1PatronesNumericos: ExerciseSeed[] = [
  { ...lumi([{emoji:"🔁",text:"Los patrones numéricos suman o restan el mismo número cada vez. ¡Encuentra el salto!"}],{emoji:"⭐",count:5,text:"Toca cinco estrellas.",successText:"¡A descubrir patrones!"}), order:0 },
  { ...numberLineGap([2, 4, null, 8, 10], [6, 5, 7], 2, "La secuencia va de 2 en 2. ¿Qué número falta?"), order:1 },
  { ...numberLineGap([5, 10, null, 20, 25], [15, 12, 18], 5, "¿Qué número falta? El salto es de 5."), order:2 },
  { ...mentalCalc(10, "+", 10), order:3 },
  { ...numberLineGap([10, 20, null, 40, 50], [30, 25, 35], 10, "¿Qué número falta? El salto es de 10."), order:4 },
  { ...mentalCalc(30, "+", 5), order:5 },
];

// ── Unit: p1-sumas-restas ────────────────────────────────────────────────
const p1SumarHasta20: ExerciseSeed[] = [
  { ...lumi([{emoji:"➕",text:"Sumamos para juntar grupos. Cuenta todos juntos: los del primero y los del segundo."}],{emoji:"⭐",count:5,text:"Toca cinco estrellas.",successText:"¡A sumar!"}), order:0 },
  { ...countGame(9, "🍎", "Toca los 🍎 para contar cuántos hay."), order:1 },
  { ...mentalCalc(7, "+", 5), order:2 },
  { ...mentalCalc(5, "+", 8), order:3 },
  { ...mentalCalc(9, "+", 4), order:4 },
  { ...mentalCalc(6, "+", 7), order:5 },
];

const p1RestarHasta20: ExerciseSeed[] = [
  { ...lumi([{emoji:"➖",text:"Restamos para saber cuánto queda después de quitar algunos. ¡Toca los que se van!"}],{emoji:"⭐",count:5,text:"Toca cinco estrellas.",successText:"¡A restar!"}), order:0 },
  { ...subtractGame(12, 5, "🍎", "Hay 12 🍎. Se van 5. ¿Cuántas quedan? Toca las que se van."), order:1 },
  { ...subtractGame(15, 8, "⭐", "Hay 15 ⭐. Se van 8. ¿Cuántas quedan?"), order:2 },
  { ...mentalCalc(18, "-", 9), order:3 },
  { ...subtractGame(11, 4, "🌸", "Hay 11 🌸. Se van 4. ¿Cuántas quedan?"), order:4 },
  { ...mentalCalc(16, "-", 7), order:5 },
];

const p1SumarRestarHasta100: ExerciseSeed[] = [
  { ...lumi([{emoji:"💯",text:"Ahora sumamos y restamos números más grandes. Primero las decenas, luego las unidades."}],{emoji:"⭐",count:5,text:"Toca cinco estrellas.",successText:"¡A calcular!"}), order:0 },
  { ...mentalCalc(30, "+", 20), order:1 },
  { ...mentalCalc(70, "-", 30), order:2 },
  { ...mentalCalc(45, "+", 30), order:3 },
  { ...columnAdd(23, 45), order:4 },
  { ...columnSub(73, 28), order:5 },
];

const p1FamiliasDeHechos: ExerciseSeed[] = [
  { ...lumi([{emoji:"🔄",text:"Una suma y dos restas forman una familia de hechos. ¡Usan los mismos tres números!"}],{emoji:"⭐",count:5,text:"Toca cinco estrellas.",successText:"¡A conocer familias!"}), order:0 },
  { ...mentalCalc(6, "+", 7), order:1 },
  { ...mentalCalc(7, "+", 6), order:2 },
  { ...mentalCalc(13, "-", 7), order:3 },
  { ...mentalCalc(13, "-", 6), order:4 },
  { ...mentalCalc(8, "+", 5), order:5 },
];

// ── Unit: p1-grupos-iguales ──────────────────────────────────────────────
const p1ContarGruposIguales: ExerciseSeed[] = [
  { ...lumi([{emoji:"👥",text:"Cuando los grupos tienen el mismo número de objetos, podemos contar saltando o multiplicar."}],{emoji:"⭐",count:5,text:"Toca cinco estrellas.",successText:"¡A contar grupos!"}), order:0 },
  { ...arrayPacker(2, 3, "🍎"), order:1 },
  { ...multArray(3, 4, [12, 9, 15]), order:2 },
  { ...arrayPacker(3, 4, "🌟"), order:3 },
  { ...arrayPacker(4, 2, "🐝"), order:4 },
  { ...divGroups(12, 4, [3, 2, 4]), order:5 },
];

const p1ArreglosYFilas: ExerciseSeed[] = [
  { ...lumi([{emoji:"🗃️",text:"Un arreglo tiene filas y columnas. Filas × columnas = total de objetos."}],{emoji:"⭐",count:5,text:"Toca cinco estrellas.",successText:"¡A construir arreglos!"}), order:0 },
  { ...arrayPacker(3, 5, "🌟"), order:1 },
  { ...multArray(4, 3, [12, 10, 15]), order:2 },
  { ...arrayPacker(5, 3, "🎈"), order:3 },
  { ...arrayPacker(2, 6, "⭐"), order:4 },
  { ...multArray(3, 3, [9, 6, 12]), order:5 },
];

const p1RepartirPartes: ExerciseSeed[] = [
  { ...lumi([{emoji:"🍰",text:"Repartir en partes iguales significa que cada grupo recibe exactamente lo mismo."}],{emoji:"⭐",count:5,text:"Toca cinco estrellas.",successText:"¡A repartir!"}), order:0 },
  { ...divGroups(12, 3, [4, 3, 5]), order:1 },
  { ...divGroups(15, 5, [3, 2, 4]), order:2 },
  { ...divGroups(8, 4, [2, 1, 3]), order:3 },
  { ...divGroups(15, 3, [5, 4, 6]), order:4 },
  { ...divGroups(20, 4, [5, 4, 6]), order:5 },
];

// ── Unit: p1-medicion-tiempo-dinero ─────────────────────────────────────
const p1ContarDinero: ExerciseSeed[] = [
  { ...lumi([{emoji:"💰",text:"Contamos monedas y billetes para saber el total. ¡Toca cada uno para sumar!"}],{emoji:"⭐",count:5,text:"Toca cinco estrellas.",successText:"¡A contar dinero!"}), order:0 },
  { ...moneyCount([{label:"5¢",value:5,type:"coin",count:4}], "¿Cuánto hay en total? Toca cada moneda."), order:1 },
  { ...moneyCount([{label:"10¢",value:10,type:"coin",count:3},{label:"5¢",value:5,type:"coin",count:2}], "¿Cuánto hay en total?"), order:2 },
  { ...moneyCount([{label:"50¢",value:50,type:"coin",count:2}], "¿Cuánto hay en total?"), order:3 },
  { ...moneyCount([{label:"S/1",value:100,type:"bill",count:3},{label:"50¢",value:50,type:"coin",count:1}], "¿Cuánto hay en total?"), order:4 },
  { ...moneyCount([{label:"S/5",value:500,type:"bill",count:2}], "¿Cuánto hay en total?"), order:5 },
];

const p1CompararLongitudes: ExerciseSeed[] = [
  { ...lumi([{emoji:"📏",text:"Comparamos longitudes para saber cuál es más largo, más corto o si son iguales."}],{emoji:"⭐",count:5,text:"Toca cinco estrellas.",successText:"¡A comparar longitudes!"}), order:0 },
  { ...measureCompare(12, "lápiz", 18, "regla", true), order:1 },
  { ...measureCompare(25, "mesa", 30, "pupitre", false, "¿Cuál es más corto: la mesa o el pupitre?"), order:2 },
  { ...measureCompare(8, "goma", 15, "libro", true), order:3 },
  { ...measureCompare(20, "cuaderno", 14, "cartuchera", true), order:4 },
  { ...measureCompare(7, "crayón", 14, "regla", false, "¿Cuál es más corto: el crayón o la regla?"), order:5 },
];

const p1LeerHoras: ExerciseSeed[] = [
  { ...lumi([{emoji:"🕒",text:"Las agujas del reloj nos dicen la hora. La corta marca las horas, la larga los minutos."}],{emoji:"⭐",count:5,text:"Toca cinco estrellas.",successText:"¡A leer el reloj!"}), order:0 },
  { ...clockSet(3, 0, "Mueve la aguja azul para marcar las 3:00"), order:1 },
  { ...clockRead(7, 0, [{hour:7,minute:0},{hour:1,minute:0},{hour:5,minute:0}], 0), order:2 },
  { ...clockSet(5, 30, "Mueve la aguja azul para marcar las 5:30"), order:3 },
  { ...clockRead(10, 30, [{hour:10,minute:30},{hour:10,minute:0},{hour:4,minute:30}], 0), order:4 },
  { ...clockSet(12, 0, "Mueve la aguja azul para marcar las 12:00"), order:5 },
];

// ── Unit: p1-formas-y-datos ──────────────────────────────────────────────
const p1Formas2D: ExerciseSeed[] = [
  { ...lumi([{emoji:"🔷",text:"Las figuras 2D son planas: triángulo, cuadrado, rectángulo y círculo."}],{emoji:"⭐",count:3,text:"Toca 3 estrellas.",successText:"¡A identificar figuras!"}), order:0 },
  { ...tapAllShapes("triangle", "triángulo", [
    {type:"triangle",color:"#f87171"},{type:"circle",color:"#60a5fa"},{type:"square",color:"#4ade80"},
    {type:"triangle",color:"#fbbf24"},{type:"rectangle",color:"#a78bfa"},{type:"triangle",color:"#34d399"},
    {type:"circle",color:"#f472b6"},{type:"square",color:"#fb923c"},
  ]), order:1 },
  { ...tapAllShapes("circle", "círculo", [
    {type:"square",color:"#f87171"},{type:"circle",color:"#60a5fa"},{type:"triangle",color:"#4ade80"},
    {type:"circle",color:"#fbbf24"},{type:"rectangle",color:"#a78bfa"},{type:"square",color:"#34d399"},
    {type:"circle",color:"#f472b6"},{type:"triangle",color:"#fb923c"},
  ]), order:2 },
  { ...tapAllShapes("square", "cuadrado", [
    {type:"square",color:"#f87171"},{type:"rectangle",color:"#60a5fa"},{type:"circle",color:"#4ade80"},
    {type:"square",color:"#fbbf24"},{type:"triangle",color:"#a78bfa"},{type:"rectangle",color:"#34d399"},
    {type:"square",color:"#f472b6"},{type:"circle",color:"#fb923c"},
  ]), order:3 },
  { ...gridTrace("un cuadrado", [0,4,24,20,0]), order:4 },
  { ...gridTrace("un triángulo", [2,20,24,2]), order:5 },
];

const p1CrearFiguras: ExerciseSeed[] = [
  { ...lumi([{emoji:"🏠",text:"Combinamos figuras básicas para crear nuevas figuras. ¡Elige la forma correcta para cada parte!"}],{emoji:"⭐",count:3,text:"Toca 3 estrellas.",successText:"¡A crear figuras!"}), order:0 },
  { ...shapeCompose("casa", "¿Con qué figuras se forma una casa? Toca cada parte y elige."), order:1 },
  { ...shapeCompose("helado", "¿Con qué figuras se forma un helado?"), order:2 },
  { ...shapeDecompose("seta", "¿Qué figura es cada parte de la seta?"), order:3 },
  { ...shapeDecompose("cohete", "¿Qué figura es cada parte del cohete?"), order:4 },
  { ...gridTrace("un rectángulo", [0,3,18,15,0]), order:5 },
];

const p1LeerPictogramas: ExerciseSeed[] = [
  { ...lumi([{emoji:"📊",text:"En un pictograma sencillo, cada símbolo vale 1. Cuenta los símbolos del renglón."}],{emoji:"⭐",count:3,text:"Toca 3 estrellas.",successText:"¡A leer gráficos!"}), order:0 },
  { ...pictoRead("🍎", 1, "manzana", [{label:"Lunes",count:3},{label:"Martes",count:5},{label:"Miércoles",count:2}], "Martes"), order:1 },
  { ...pictoRead("📚", 1, "libro", [{label:"Ana",count:4},{label:"Luis",count:2},{label:"Mia",count:6}], "Mia"), order:2 },
  { ...pictoRead("⭐", 1, "estrella", [{label:"Verde",count:3},{label:"Rojo",count:5},{label:"Azul",count:4}], "Rojo"), order:3 },
  { ...pictoRead("🐟", 1, "pez", [{label:"Lunes",count:2},{label:"Martes",count:4},{label:"Jueves",count:3}], "Martes"), order:4 },
];

const p1RepasoP1: ExerciseSeed[] = [
  { ...lumi([{emoji:"🎓",text:"¡Repasamos todo lo de 1.º grado! Números, sumas, restas, figuras y más."}],{emoji:"⭐",count:5,text:"Toca cinco estrellas.",successText:"¡A repasar!"}), order:0 },
  { ...countGame(16, "🌟", "Toca y cuenta todos los 🌟"), order:1 },
  { ...compareNums(38, 52, "¿Cuál símbolo va entre 38 y 52?"), order:2 },
  { ...mentalCalc(8, "+", 7), order:3 },
  { ...subtractGame(14, 6, "🍎", "Hay 14 🍎. Se van 6. ¿Cuántas quedan?"), order:4 },
  { ...clockSet(4, 30, "Mueve la aguja azul para marcar las 4:30"), order:5 },
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
    hints: [
      "La secuencia avanza de 100 en 100.",
      "Mira el número anterior y el siguiente.",
    ],
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
    hints: [
      "Mira el primer dígito de cada número.",
      "El más chiquito va primero.",
    ],
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
    [
      {
        emoji: "🔟",
        repeat: 1,
        text: "Ya sabes contar de uno en uno. Ahora vamos a contar de 10 en 10 y de 100 en 100. ¡Es mucho más rápido!",
      },
    ],
    {
      emoji: "💯",
      count: 2,
      text: "Toca dos centenas para empezar.",
      successText: "¡Vamos a contar en grupos!",
    },
  ),
  placeValueMarket(30),
  numberLineGap([10, 20, null, 40, 50], [30, 25, 35, 45], 10),
  placeValueMarket(200),
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
    [
      {
        emoji: "🧱",
        repeat: 1,
        text: "Cada dígito tiene su lugar: centenas, decenas, unidades.",
      },
    ],
    {
      emoji: "🧱",
      count: 3,
      text: "Toca tres bloques.",
      successText: "¡Ahora a leer números!",
    },
  ),
  digitValueQ(135, 0),
  digitValueQ(241, 1),
  digitValueQ(307, 2),
  digitValueQ(542, 0),
  digitValueQ(386, 1),
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
    [
      {
        emoji: "📖",
        repeat: 1,
        text: "Aprendemos a leer y escribir números grandes. 356 se lee: trescientos cincuenta y seis.",
      },
    ],
    {
      emoji: "⭐",
      count: 5,
      text: "Toca 5 estrellas.",
      successText: "¡A leer números!",
    },
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
    [
      {
        emoji: "⚖️",
        repeat: 1,
        text: "Para comparar, mira centenas primero. Si son iguales, mira decenas. Si también son iguales, mira unidades.",
      },
    ],
    {
      emoji: "⭐",
      count: 3,
      text: "Toca 3 estrellas.",
      successText: "¡A comparar!",
    },
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
      {
        emoji: "👥",
        repeat: 1,
        text: "Los números pares se pueden repartir en dos grupos iguales. Los impares siempre dejan uno solo.",
      },
      {
        emoji: "🔢",
        repeat: 1,
        text: "Termina en 0,2,4,6,8 → par.   Termina en 1,3,5,7,9 → impar.",
      },
    ],
    {
      emoji: "👥",
      count: 4,
      text: "Toca 4 objetos (un número par).",
      successText: "¡4 es par!",
    },
  ),
  parityNum(48),
  parityNum(75),
  parityNum(326),
  paritySort([
    { id: "342", category: "par" },
    { id: "517", category: "impar" },
    { id: "800", category: "par" },
    { id: "99", category: "impar" },
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
    [
      {
        emoji: "📐",
        repeat: 1,
        text: "Para sumar o restar números de 3 dígitos alineamos centenas, decenas y unidades, y operamos columna por columna.",
      },
    ],
    {
      emoji: "⭐",
      count: 3,
      text: "Toca 3 estrellas.",
      successText: "¡A calcular!",
    },
  ),
  columnAdd(153, 199),
  columnAdd(256, 437),
  columnAdd(357, 486),
  columnSub(873, 428),
  columnSub(703, 258),
  columnSub(903, 528),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-suma-resta · ➕ "Suma y resta"  [mint] ║
// ║  desc: Algoritmos y cálculo mental con números de hasta 3 dígitos.      ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 2/2 · calculo-mental-sr · "Cálculo mental: suma y resta"        ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2CalculoMentalSR: ExS[] = [
  lumi(
    [
      {
        emoji: "🧠",
        repeat: 1,
        text: "El cálculo mental usa trucos: sumar centenas, decenas o unidades de golpe, sin papel.",
      },
    ],
    {
      emoji: "💡",
      count: 3,
      text: "Toca 3 luces.",
      successText: "¡Mente lista!",
    },
  ),
  mentalCalc(300, "+", 200),
  mentalCalc(700, "-", 300),
  mentalCalc(400, "+", 100),
  mentalCalc(600, "-", 200),
  mentalCalc(100, "+", 400),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-multiplicacion · ✖️ "Multiplicación"  ║
// ║  [sun] · desc: Tablas del 2 al 10 y el significado de multiplicar.      ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 1/5 · grupos-iguales-mult · "Grupos iguales: la idea de ×"      ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2GruposIgualesMult: ExS[] = [
  lumi(
    [
      {
        emoji: "🍎",
        repeat: 3,
        text: "Cuando tenemos grupos del mismo tamaño, podemos multiplicar en vez de contar uno por uno.",
      },
    ],
    {
      emoji: "🍎",
      count: 6,
      text: "Toca 6 manzanas (2 grupos de 3).",
      successText: "¡2 × 3 = 6!",
    },
  ),
  multArray(2, 3, [6, 5, 7], "🍎"),
  multArray(3, 4, [12, 10, 14], "🔵"),
  multArray(2, 5, [10, 8, 12], "⭐"),
  multArray(4, 3, [12, 9, 15], "🟡"),
  multArray(2, 6, [12, 10, 14], "🍓"),
  multArray(3, 3, [9, 6, 12], "🐟"),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-multiplicacion · ✖️ "Multiplicación"  ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 2/5 · tablas-2-5-10 · "Tablas del 2, 5 y 10"                   ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2Tablas2510: ExS[] = [
  lumi(
    [
      {
        emoji: "✖️",
        repeat: 1,
        text: "Las tablas del 2, 5 y 10 son las más fáciles. El 2 va de 2 en 2, el 5 de 5 en 5, el 10 de 10 en 10.",
      },
    ],
    {
      emoji: "⭐",
      count: 5,
      text: "Toca 5 estrellas.",
      successText: "¡A practicar tablas!",
    },
  ),
  // Filas orientadas para contar saltado el número de la tabla (cols = tabla).
  multArray(3, 2, [6, 4, 8], "⭐"),
  multArray(4, 5, [20, 15, 25], "🟡"),
  multArray(7, 10, [70, 60, 80], "🔵"),
  multArray(8, 2, [16, 14, 18], "🍓"),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-multiplicacion · ✖️ "Multiplicación"  ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 3/5 · tablas-3-4 · "Tablas del 3 y del 4"                       ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2Tablas34: ExS[] = [
  lumi(
    [
      {
        emoji: "✖️",
        repeat: 1,
        text: "Ahora el 3 y el 4. Puedes contar de 3 en 3 o de 4 en 4 para descubrir los resultados.",
      },
    ],
    {
      emoji: "⭐",
      count: 4,
      text: "Toca 4 estrellas.",
      successText: "¡Tablas del 3 y 4!",
    },
  ),
  // Filas orientadas para contar saltado el número de la tabla (cols = tabla).
  multArray(3, 3, [9, 6, 12], "🟢"),
  multArray(6, 3, [18, 15, 21], "⭐"),
  multArray(4, 4, [16, 12, 20], "🍎"),
  multArray(7, 4, [28, 24, 32], "🐟"),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-multiplicacion · ✖️ "Multiplicación"  ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 4/5 · arreglos-filas-columnas · "Arreglos: filas y columnas"    ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2ArreglosFilasColumnas: ExS[] = [
  lumi(
    [
      {
        emoji: "📐",
        repeat: 1,
        text: "Un arreglo organiza objetos en filas y columnas. Filas × Columnas = total.",
      },
    ],
    {
      emoji: "🔵",
      count: 6,
      text: "Toca 6 puntos (2 filas de 3).",
      successText: "¡2 × 3 = 6!",
    },
  ),
  arrayPacker(3, 5, "🟡"),
  arrayPacker(4, 5, "🔵"),
  arrayPacker(3, 6, "⭐"),
  arrayPacker(4, 6, "🍎"),
  arrayPacker(5, 5, "🟢"),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-multiplicacion · ✖️ "Multiplicación"  ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 5/5 · calculo-mental-mult · "Cálculo mental: multiplicación"    ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2CalculoMentalMult: ExS[] = [
  lumi(
    [
      {
        emoji: "🧠",
        repeat: 1,
        text: "Podemos multiplicar mentalmente por 2, 5 o 10 muy rápido. ¡Inténtalo!",
      },
    ],
    {
      emoji: "💡",
      count: 3,
      text: "Toca 3 luces.",
      successText: "¡Mente lista!",
    },
  ),
  flashCardMult(2, 15),
  flashCardMult(5, 12),
  flashCardMult(10, 9),
  flashCardMult(3, 8),
  flashCardMult(4, 9),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-division · ➗ "División"  [peach]      ║
// ║  desc: Repartir en grupos iguales y la relación con la multiplicación.  ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 1/3 · repartir-grupos-iguales · "Repartir en grupos iguales"    ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2RepartirGruposIguales: ExS[] = [
  lumi(
    [
      {
        emoji: "🍕",
        repeat: 1,
        text: "Dividir es repartir en grupos iguales. Si tienes 12 y quieres 3 grupos iguales, ¿cuánto va en cada uno?",
      },
    ],
    {
      emoji: "⭐",
      count: 6,
      text: "Toca 6 estrellas.",
      successText: "¡A repartir!",
    },
  ),
  divGroups(12, 3, [4, 3, 6], "🍎"),
  divGroups(10, 2, [5, 4, 6], "⭐"),
  divGroups(20, 4, [5, 4, 6], "🔵"),
  divGroups(15, 5, [3, 2, 4], "🟡"),
  divGroups(18, 3, [6, 5, 7], "🐟"),
  divGroups(24, 4, [6, 5, 8], "🍓"),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-division · ➗ "División"  [peach]      ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 2/3 · mult-y-div-juntas · "Multiplicación y división juntas"    ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2MultYDivJuntas: ExS[] = [
  lumi(
    [
      {
        emoji: "🔄",
        repeat: 1,
        text: "La multiplicación y la división son opuestos. 3 × 4 = 12 → 12 ÷ 3 = 4 y 12 ÷ 4 = 3.",
      },
    ],
    {
      emoji: "⭐",
      count: 4,
      text: "Toca 4 estrellas.",
      successText: "¡Las dos juntas!",
    },
  ),
  flashCardMult(5, 4),
  divGroups(21, 3, [7, 6, 8], "🔵"),
  flashCardMult(2, 10),
  divGroups(32, 4, [8, 7, 9], "⭐"),
  flashCardMult(2, 8),
  divGroups(30, 5, [6, 5, 7], "🟡"),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-division · ➗ "División"  [peach]      ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 3/3 · calculo-mental-div · "Cálculo mental: división"           ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2CalculoMentalDiv: ExS[] = [
  lumi(
    [
      {
        emoji: "🧠",
        repeat: 1,
        text: "Para dividir mentalmente piensa: ¿por qué número multiplico para llegar al total?",
      },
    ],
    {
      emoji: "💡",
      count: 3,
      text: "Toca 3 luces.",
      successText: "¡División mental!",
    },
  ),
  divGroups(40, 4, [10, 8, 12], "🔵", 2),
  divGroups(50, 5, [10, 8, 12], "⭐", 1),
  divGroups(60, 10, [6, 5, 7], "🟡", 1),
  divGroups(36, 4, [9, 8, 10], "🍎", 3),
  divGroups(45, 5, [9, 8, 10], "🐟", 2),
  divGroups(28, 4, [7, 6, 8], "🍓", 3),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-fracciones · 🍕 "Fracciones" [lilac]  ║
// ║  desc: Partes de un entero, notación y operaciones con fracciones.      ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 1/4 · parte-de-un-entero · "Parte de un entero"                 ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2ParteDeUnEntero: ExS[] = [
  lumi(
    [
      {
        emoji: "🍕",
        repeat: 1,
        text: "Una fracción es una parte de un entero. Si divides una pizza en 4 partes iguales y tomas 1, tienes 1/4.",
      },
    ],
    {
      emoji: "🍕",
      count: 4,
      text: "Toca las 4 partes de la pizza.",
      successText: "¡4 partes iguales!",
    },
  ),
  pieFrac(4, 1, "Colorea 1/4 del pastel. Toca 1 gajo."),
  pieFrac(4, 2, "Colorea 2/4 del pastel. Toca 2 gajos."),
  pieFrac(4, 3, "Colorea 3/4 del pastel. Toca 3 gajos."),
  pieFrac(3, 1, "Colorea 1/3 del pastel. Toca 1 gajo."),
  pieFrac(3, 2, "Colorea 2/3 del pastel. Toca 2 gajos."),
  pieFrac(6, 2, "Colorea 2/6 del pastel. Toca 2 gajos."),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-fracciones · 🍕 "Fracciones" [lilac]  ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 2/4 · notacion-fracciones · "Notación de fracciones"            ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2NotacionFracciones: ExS[] = [
  lumi(
    [
      {
        emoji: "📝",
        repeat: 1,
        text: "Numerador (arriba) = partes que tomamos. Denominador (abajo) = total de partes iguales.",
      },
    ],
    {
      emoji: "⭐",
      count: 3,
      text: "Toca 3 estrellas.",
      successText: "¡A escribir fracciones!",
    },
  ),
  fruitFrac(6, 2, "🍎", "🍋", "¿Cuántas manzanas hay de 6 frutas? Ajusta el numerador."),
  fruitFrac(8, 3, "🍓", "🍊", "¿Cuántas fresas hay de 8 frutas? Ajusta el numerador."),
  fruitFrac(4, 1, "🫐", "🍇", "¿Cuántos arándanos hay de 4 frutas? Ajusta el numerador."),
  fruitFrac(10, 4, "🥝", "🍍", "¿Cuántos kiwis hay de 10 frutas? Ajusta el numerador."),
  fruitFrac(6, 5, "🍑", "🍒", "¿Cuántos duraznos hay de 6 frutas? Ajusta el numerador."),
  fruitFrac(8, 6, "🍌", "🍈", "¿Cuántos plátanos hay de 8 frutas? Ajusta el numerador."),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-fracciones · 🍕 "Fracciones" [lilac]  ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 3/4 · comparar-fracciones · "Comparar fracciones"               ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2CompararFracciones: ExS[] = [
  lumi(
    [
      {
        emoji: "⚖️",
        repeat: 1,
        text: "Con el mismo denominador: más numerador = mayor. Con el mismo numerador: menos denominador = mayor (partes más grandes).",
      },
    ],
    {
      emoji: "⭐",
      count: 3,
      text: "Toca 3 estrellas.",
      successText: "¡A comparar fracciones!",
    },
  ),
  fracBarsGame(1, 2, 1, 4, "¿Cuál es mayor: 1/2 ó 1/4?"),
  fracBarsGame(3, 4, 1, 4, "¿Cuál es mayor: 3/4 ó 1/4?"),
  fracBarsGame(2, 3, 2, 4, "¿Cuál es mayor: 2/3 ó 2/4?"),
  fracBarsGame(1, 2, 1, 3, "¿Cuál es mayor: 1/2 ó 1/3?"),
  fracBarsGame(5, 6, 3, 6, "¿Cuál es mayor: 5/6 ó 3/6?"),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-fracciones · 🍕 "Fracciones" [lilac]  ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 4/4 · sumar-restar-fracciones · "Sumar y restar fracciones"     ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2SumarRestarFracciones: ExS[] = [
  lumi(
    [
      {
        emoji: "➕",
        repeat: 1,
        text: "Para sumar o restar fracciones con el mismo denominador, solo operamos el numerador. El denominador no cambia.",
      },
    ],
    {
      emoji: "⭐",
      count: 4,
      text: "Toca 4 estrellas.",
      successText: "¡A operar fracciones!",
    },
  ),
  fracTile(1, 2, 4, "+"),
  fracTile(2, 1, 5, "+"),
  fracTile(3, 1, 4, "-"),
  fracTile(4, 2, 5, "-"),
  fracTile(1, 3, 6, "+"),
  fracTile(5, 2, 6, "-"),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-dinero · 💰 "Dinero"  [sun]           ║
// ║  desc: Contar soles y céntimos, leer precios y hacer cambios.           ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 1/4 · contar-soles-centimos · "Contar soles y céntimos"         ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2ContarSolesCentimos: ExS[] = [
  lumi(
    [
      {
        emoji: "💰",
        repeat: 1,
        text: "En el Perú usamos soles (S/) y céntimos. 100 céntimos = 1 sol.",
      },
    ],
    {
      emoji: "🪙",
      count: 4,
      text: "Toca 4 monedas.",
      successText: "¡A contar dinero!",
    },
  ),
  moneyCount([
    { label: "S/1",  value: 100, type: "bill", count: 3 },
    { label: "50c",  value: 50,  type: "coin", count: 2 },
  ]),
  moneyCount([
    { label: "S/5",  value: 500, type: "bill", count: 2 },
  ]),
  moneyCount([
    { label: "S/10", value: 1000, type: "bill", count: 1 },
    { label: "S/1",  value: 100,  type: "coin", count: 3 },
  ]),
  moneyCount([
    { label: "25c",  value: 25,  type: "coin", count: 4 },
  ]),
  moneyCount([
    { label: "S/20", value: 2000, type: "bill", count: 1 },
    { label: "S/2",  value: 200,  type: "coin", count: 2 },
  ]),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-dinero · 💰 "Dinero"  [sun]           ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 2/4 · leer-precios · "Leer precios"                             ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2LeerPrecios: ExS[] = [
  lumi(
    [
      {
        emoji: "🏷️",
        repeat: 1,
        text: "Un precio nos dice cuánto cuesta algo. Si el precio es S/ 8.50 y pagas con S/ 10, recibes cambio.",
      },
    ],
    {
      emoji: "⭐",
      count: 3,
      text: "Toca 3 estrellas.",
      successText: "¡A leer precios!",
    },
  ),
  changeGame(850, 1000, "Una pelota cuesta S/8.50. Pagas con S/10. ¿Cuánto de cambio?"),
  moneyCount([
    { label: "S/3.50", value: 350, type: "bill" },
    { label: "S/1.50", value: 150, type: "bill" },
  ], "Un jugo (S/3.50) y un pan (S/1.50). Toca los dos para sumar el total."),
  moneyCompare(120, 90, true, "¿Cuál cuesta más: el lápiz (S/1.20) o el borrador (S/0.90)?"),
  numPad(
    "Un plátano cuesta S/0.50. ¿Cuántos puedes comprar con S/2.00?",
    4,
    ["2.00 ÷ 0.50 = ?", "Cuenta de 50 en 50: 50, 100, 150, 200."],
    "S/2.00 ÷ S/0.50 = 4 plátanos.",
  ),
  changeGame(675, 1000, "Compras algo de S/6.75. Pagas con S/10. ¿Cuánto de cambio?"),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-dinero · 💰 "Dinero"  [sun]           ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 3/4 · comparar-montos · "Comparar montos"                       ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2CompararMontos: ExS[] = [
  lumi(
    [
      {
        emoji: "⚖️",
        repeat: 1,
        text: "Para comparar montos, mira primero los soles enteros. Si son iguales, mira los céntimos.",
      },
    ],
    {
      emoji: "⭐",
      count: 3,
      text: "Toca 3 estrellas.",
      successText: "¡A comparar precios!",
    },
  ),
  moneyCompare(375, 350, true),
  moneyCompare(950, 1200, false, "¿Cuál es menor: S/9.50 o S/12.00?"),
  moneyCompare(2000, 2500, false, "¿Cuál monto es menor: S/20.00 o S/25.00?"),
  moneyCompare(250, 175, true, "¿Cuál es mayor: S/2.50 o S/1.75?"),
  changeGame(400, 750, "¿Cuánto más cuesta S/7.50 que S/4.00? Usa monedas para encontrar la diferencia."),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-dinero · 💰 "Dinero"  [sun]           ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 4/4 · convertir-soles · "Convertir soles y céntimos"            ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2ConvertirSoles: ExS[] = [
  lumi(
    [
      {
        emoji: "🔄",
        repeat: 1,
        text: "1 sol = 100 céntimos. Para convertir soles a céntimos multiplicamos por 100; para lo contrario, dividimos.",
      },
    ],
    {
      emoji: "🪙",
      count: 5,
      text: "Toca 5 monedas.",
      successText: "¡A convertir!",
    },
  ),
  moneyCount([
    { label: "S/1", value: 100, type: "coin", count: 2 },
    { label: "50c", value: 50,  type: "coin", count: 1 },
  ], "¿Cuántos céntimos hay en S/2.50? Toca cada moneda y suma."),
  moneyCount([
    { label: "S/1", value: 100, type: "coin", count: 3 },
    { label: "50c", value: 50,  type: "coin", count: 1 },
  ], "¿Cuántos céntimos hay en S/3.50? Toca cada moneda y suma."),
  moneyCount([
    { label: "S/1", value: 100, type: "coin", count: 1 },
    { label: "50c", value: 50,  type: "coin", count: 1 },
    { label: "25c", value: 25,  type: "coin", count: 1 },
  ], "¿Cuántos céntimos hay en S/1.75? Toca cada moneda y suma."),
  moneyCount([
    { label: "25c", value: 25, type: "coin", count: 5 },
  ], "5 monedas de 25c. ¿Cuántos céntimos hacen? Toca todas."),
  moneyCount([
    { label: "50c", value: 50, type: "coin", count: 6 },
  ], "6 monedas de 50c. ¿Cuántos céntimos hacen S/3.00? Toca todas."),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-medicion · 📏 "Medición"  [mint]      ║
// ║  desc: Longitud, masa y volumen con unidades del sistema métrico.       ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 1/3 · longitud-masa-volumen · "Longitud, masa y volumen"        ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2LongitudMasaVolumen: ExS[] = [
  lumi(
    [
      {
        emoji: "📏",
        repeat: 1,
        text: "Medimos longitudes en metros (m), masas en kilogramos (kg) y volúmenes en litros (L).",
      },
    ],
    {
      emoji: "⭐",
      count: 3,
      text: "Toca 3 estrellas.",
      successText: "¡A medir!",
    },
  ),
  unitTap("👤", "¿Qué unidad usamos para medir la altura de una persona?", ["metros", "kilogramos", "litros"], "metros"),
  unitTap("🍎", "¿Qué unidad usamos para medir el peso de una manzana?", ["metros", "gramos", "litros"], "gramos"),
  unitTap("🥤", "¿Qué unidad usamos para medir el agua en un vaso?", ["mililitros", "kilogramos", "metros"], "mililitros"),
  measureCompare(1000, "1 kg", 500, "500 g", true, "¿Qué es más pesado: 1 kg o 500 g?"),
  measureCompare(1000, "1 L", 800, "800 mL", true, "¿Qué mide más: 1 L o 800 mL?"),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-medicion · 📏 "Medición"  [mint]      ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 2/3 · unidades-m-kg-l · "Unidades: m, kg y L"                   ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2UnidadesMKgL: ExS[] = [
  lumi(
    [
      {
        emoji: "🔢",
        repeat: 1,
        text: "1 m = 100 cm. 1 kg = 1000 g. 1 L = 1000 mL. Estos son los saltos más importantes de medición.",
      },
    ],
    {
      emoji: "⭐",
      count: 3,
      text: "Toca 3 estrellas.",
      successText: "¡A convertir unidades!",
    },
  ),
  unitBlock(1, "1 m",  100,  "cm", "¿Cuántos centímetros hay en 1 metro? Toca el bloque."),
  unitBlock(1, "1 kg", 1000, "g",  "¿Cuántos gramos hay en 1 kilogramo? Toca el bloque."),
  unitBlock(1, "1 L",  1000, "mL", "¿Cuántos mililitros hay en 1 litro? Toca el bloque."),
  measureCompare(200,  "2 m",    180,   "180 cm",   true, "¿Qué es más largo: 2 m o 180 cm?"),
  measureCompare(2000, "2 kg",   1500,  "1500 g",   true, "¿Qué pesa más: 2 kg o 1500 g?"),
  measureCompare(3000, "3 L",    2800,  "2800 mL",  true, "¿Qué contiene más: 3 L o 2800 mL?"),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-medicion · 📏 "Medición"  [mint]      ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 3/3 · comparar-medidas · "Comparar medidas"                     ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2CompararMedidas: ExS[] = [
  lumi(
    [
      {
        emoji: "⚖️",
        repeat: 1,
        text: "Para comparar medidas con distintas unidades, convierte primero a la misma unidad.",
      },
    ],
    {
      emoji: "⭐",
      count: 3,
      text: "Toca 3 estrellas.",
      successText: "¡A comparar medidas!",
    },
  ),
  measureCompare(300,  "3 m",     250,  "250 cm",  true,  "¿Cuál es mayor: 3 m o 250 cm?"),
  measureCompare(1500, "1500 g", 2000,  "2 kg",   false, "¿Cuál es menor: 1500 g o 2 kg?"),
  measureCompare(3500, "3500 mL", 3000, "3 L",    true,  "¿Cuál es mayor: 3500 mL o 3 L?"),
  measureCompare(150,  "150 cm",  200,  "2 m",    false, "¿Cuál cuerda es más corta: 150 cm o 2 m?"),
  measureCompare(500,  "500 g",  1000,  "1 kg",   false, "¿Qué pesa menos: 500 g o 1 kg?"),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-el-tiempo · 🕐 "El tiempo"  [sky]     ║
// ║  desc: Leer el reloj al minuto y convertir horas a minutos.             ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 1/3 · hora-al-minuto · "La hora al minuto"                      ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2HoraAlMinuto: ExS[] = [
  lumi(
    [
      {
        emoji: "🕐",
        repeat: 1,
        text: "La aguja corta (negra) marca las horas. La aguja larga (azul) marca los minutos. ¡Cada raya son 5 minutos!",
      },
    ],
    {
      emoji: "⭐",
      count: 3,
      text: "Toca 3 estrellas.",
      successText: "¡A leer el reloj!",
    },
  ),
  clockSet(3,  0),
  clockSet(7,  0),
  clockSet(10, 30),
  clockSet(1,  15),
  clockSet(4,  45),
  clockSet(11, 20),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-el-tiempo · 🕐 "El tiempo"  [sky]     ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 2/3 · horas-y-minutos · "Horas y minutos"                       ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2HorasYMinutos: ExS[] = [
  lumi(
    [
      {
        emoji: "⏱️",
        repeat: 1,
        text: "Hay 60 minutos en una hora. El minutero da una vuelta completa cada hora.",
      },
    ],
    {
      emoji: "⭐",
      count: 3,
      text: "Toca 3 estrellas.",
      successText: "¡A practicar!",
    },
  ),
  clockSet(6,  5),
  clockSet(9,  25),
  clockSet(2,  40),
  clockSet(12, 55),
  clockSet(8,  10),
  unitBlock(1, "½ hora", 30, "min", "¿Cuántos minutos hay en media hora? Toca el bloque."),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-el-tiempo · 🕐 "El tiempo"  [sky]     ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 3/3 · convertir-horas-minutos · "Convertir horas y minutos"     ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2ConvertirHorasMinutos: ExS[] = [
  lumi(
    [
      {
        emoji: "🔄",
        repeat: 1,
        text: "1 hora = 60 minutos. Para convertir horas a minutos multiplicamos por 60.",
      },
    ],
    {
      emoji: "⭐",
      count: 3,
      text: "Toca 3 estrellas.",
      successText: "¡A convertir tiempo!",
    },
  ),
  clockSet(1, 0,  "Son las 12:00. ¿Qué hora es exactamente 1 hora después?"),
  clockSet(2, 0,  "Son las 12:00. ¿Qué hora son 2 horas después?"),
  clockSet(1, 30, "Son las 12:00. ¿Qué hora es 1 hora y 30 minutos después?"),
  clockSet(3, 45, "Son las 3:00. ¿Qué hora será en 45 minutos?"),
  clockSet(9, 30, "Son las 10:30. ¿Qué hora era hace 1 hora?"),
  clockSet(3, 0,  "Son las 12:00. ¿Qué hora son 3 horas después?"),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-formas · 🔷 "Formas 2D y 3D" [rose]  ║
// ║  desc: Patrones con figuras planas e identificación de sólidos.         ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 1/2 · patrones-2d · "Patrones con figuras 2D"                   ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2Patrones2D: ExS[] = [
  lumi(
    [
      {
        emoji: "🔷",
        repeat: 1,
        text: "Un patrón con figuras se repite una y otra vez. Dilo en voz baja para encontrar lo que sigue.",
      },
    ],
    {
      emoji: "⭐",
      count: 3,
      text: "Toca 3 estrellas.",
      successText: "¡A encontrar patrones!",
    },
  ),
  shapePattern(["🔴", "🔵", "🔴", "🔵", "🔴"], ["🔵", "🔴", "🟡"], "🔵"),
  shapePattern(["🔺", "🔺", "⬛", "🔺", "🔺"], ["⬛", "🔺", "⬜"], "⬛"),
  shapePattern(["🟡", "🟢", "🟡", "🟢", "🟡"], ["🟢", "🟡", "🔵"], "🟢"),
  shapePattern(["🔷", "🔷", "🔶", "🔷", "🔷"], ["🔶", "🔷", "🟡"], "🔶"),
  shapePattern(["🔴", "🔵", "🟡", "🔴", "🔵"], ["🟡", "🔴", "🔵"], "🟡"),
  shapePattern(["⬛", "⬜", "⬛", "⬜", "⬛"], ["⬜", "⬛", "🔵"], "⬜", 2),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-formas · 🔷 "Formas 2D y 3D" [rose]  ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 2/2 · solidos-3d · "Sólidos 3D"                                 ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2Solidos3D: ExS[] = [
  lumi(
    [
      {
        emoji: "🧊",
        repeat: 1,
        text: "Los sólidos 3D tienen caras (superficies), aristas (bordes) y vértices (esquinas).",
      },
    ],
    {
      emoji: "⭐",
      count: 3,
      text: "Toca 3 estrellas.",
      successText: "¡A explorar sólidos!",
    },
  ),
  shapeCount(6,  "cara",           "caras",           "🧊", "cubo"),
  shapeCount(5,  "cara",           "caras",           "🔺", "pirámide cuadrada"),
  shapeCount(8,  "vértice",        "vértices",        "🧊", "cubo"),
  shapeCount(12, "arista",         "aristas",         "🧊", "cubo"),
  shapeCount(2,  "cara circular",  "caras circulares","🥫", "cilindro",
    "¿Cuántas caras circulares tiene el cilindro? Toca cada una para contar."),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-formas · lesson 3/6 · figuras-2d      ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2Figuras2D: ExS[] = [
  lumi(
    [{ emoji: "🔷", repeat: 1, text: "Las figuras 2D son planas: triángulo, cuadrado, rectángulo, círculo, semicírculo y cuarto de círculo." }],
    { emoji: "⭐", count: 3, text: "Toca 3 estrellas.", successText: "¡A identificar figuras!" },
  ),
  tapAllShapes("triangle", "triángulo", [
    { type: "triangle",  color: "#f87171" },
    { type: "circle",    color: "#60a5fa" },
    { type: "square",    color: "#4ade80" },
    { type: "triangle",  color: "#fbbf24" },
    { type: "rectangle", color: "#a78bfa" },
    { type: "triangle",  color: "#34d399" },
    { type: "circle",    color: "#f472b6" },
    { type: "square",    color: "#fb923c" },
  ]),
  tapAllShapes("circle", "círculo", [
    { type: "triangle",  color: "#f87171" },
    { type: "circle",    color: "#60a5fa" },
    { type: "square",    color: "#4ade80" },
    { type: "circle",    color: "#fbbf24" },
    { type: "rectangle", color: "#a78bfa" },
    { type: "triangle",  color: "#34d399" },
    { type: "circle",    color: "#f472b6" },
    { type: "square",    color: "#fb923c" },
  ]),
  tapAllShapes("square", "cuadrado", [
    { type: "square",        color: "#f87171" },
    { type: "circle",        color: "#60a5fa" },
    { type: "square",        color: "#4ade80" },
    { type: "triangle",      color: "#fbbf24" },
    { type: "rectangle",     color: "#a78bfa" },
    { type: "square",        color: "#34d399" },
    { type: "half-circle",   color: "#f472b6" },
    { type: "circle",        color: "#fb923c" },
  ]),
  tapAllShapes("rectangle", "rectángulo", [
    { type: "rectangle",     color: "#f87171" },
    { type: "circle",        color: "#60a5fa" },
    { type: "square",        color: "#4ade80" },
    { type: "rectangle",     color: "#fbbf24" },
    { type: "triangle",      color: "#a78bfa" },
    { type: "rectangle",     color: "#34d399" },
    { type: "half-circle",   color: "#f472b6" },
    { type: "circle",        color: "#fb923c" },
  ]),
  tapAllShapes("half-circle", "semicírculo", [
    { type: "half-circle",    color: "#f87171" },
    { type: "circle",         color: "#60a5fa" },
    { type: "square",         color: "#4ade80" },
    { type: "half-circle",    color: "#fbbf24" },
    { type: "triangle",       color: "#a78bfa" },
    { type: "rectangle",      color: "#34d399" },
    { type: "quarter-circle", color: "#f472b6" },
    { type: "circle",         color: "#fb923c" },
  ]),
  tapAllShapes("quarter-circle", "cuarto de círculo", [
    { type: "quarter-circle", color: "#f87171" },
    { type: "circle",         color: "#60a5fa" },
    { type: "quarter-circle", color: "#4ade80" },
    { type: "triangle",       color: "#fbbf24" },
    { type: "rectangle",      color: "#a78bfa" },
    { type: "half-circle",    color: "#34d399" },
    { type: "square",         color: "#f472b6" },
    { type: "circle",         color: "#fb923c" },
  ]),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-formas · lesson 4/6 · formar-figuras  ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2FormarFiguras: ExS[] = [
  lumi(
    [{ emoji: "🏠", repeat: 1, text: "Con figuras básicas podemos construir imágenes. Toca la figura correcta para completar cada parte." }],
    { emoji: "⭐", count: 3, text: "Toca 3 estrellas.", successText: "¡A construir figuras!" },
  ),
  shapeCompose("casa",   "¿Qué figuras forman esta casa? Completa cada parte."),
  shapeCompose("helado", "¿Qué figuras forman este helado? Completa cada parte."),
  shapeCompose("seta",   "¿Qué figuras forman esta seta? Completa cada parte."),
  shapeCompose("reloj",  "¿Qué figuras forman este reloj? Completa cada parte."),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-formas · lesson 5/6 · descomp-figuras ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2DescomponerFiguras: ExS[] = [
  lumi(
    [{ emoji: "🔍", repeat: 1, text: "Podemos identificar las figuras básicas que hay dentro de una figura compuesta." }],
    { emoji: "⭐", count: 3, text: "Toca 3 estrellas.", successText: "¡A descomponer figuras!" },
  ),
  shapeDecompose("casa",    "¿Qué figura es cada parte de la casa?"),
  shapeDecompose("helado",  "¿Qué figura es cada parte del helado?"),
  shapeDecompose("flecha",  "¿Qué figura es cada parte de la flecha?"),
  shapeDecompose("seta",    "¿Qué figura es cada parte de la seta?"),
  shapeDecompose("cohete",  "¿Qué figura es cada parte del cohete?"),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-formas · lesson 6/6 · cuadricula      ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2CuadriculaPuntos: ExS[] = [
  lumi(
    [{ emoji: "📐", repeat: 1, text: "En una cuadrícula de puntos podemos dibujar figuras conectando los puntos uno a uno." }],
    { emoji: "⭐", count: 3, text: "Toca 3 estrellas.", successText: "¡A copiar figuras!" },
  ),
  // 5×5 grid (indices 0-24). Square corners: 0,4,24,20
  gridTrace("un cuadrado",   [0, 4, 24, 20, 0]),
  // Rectangle 4 wide × 3 tall
  gridTrace("un rectángulo", [0, 3, 18, 15, 0]),
  // Triangle: top-center, bottom-left, bottom-right
  gridTrace("un triángulo",  [2, 20, 24, 2]),
  // Diamond: top, left-mid, bottom, right-mid
  gridTrace("un rombo",      [2, 10, 22, 14, 2]),
];

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  path: math-primary-2 · unit: p2-estadistica · 📊 "Estadística" [peach]║
// ║  desc: Leer e interpretar pictogramas con escala.                       ║
// ╠══════════════════════════════════════════════════════════════════════════╣
// ║  lesson 1/1 · pictogramas-escala · "Pictogramas con escala"             ║
// ╚══════════════════════════════════════════════════════════════════════════╝
const p2PictogramasEscala: ExS[] = [
  lumi(
    [
      {
        emoji: "📊",
        repeat: 1,
        text: "Un pictograma usa símbolos para mostrar datos. La escala dice cuánto vale cada símbolo. Si 🍎 = 5, entonces 3 🍎 = 15.",
      },
    ],
    {
      emoji: "⭐",
      count: 3,
      text: "Toca 3 estrellas.",
      successText: "¡A leer pictogramas!",
    },
  ),
  pictoRead("🍎", 5, "manzanas",
    [{ label: "Peras",    count: 2 },
     { label: "Manzanas", count: 3 },
     { label: "Uvas",     count: 4 }],
    "Manzanas",
  ),
  pictoRead("⭐", 10, "puntos",
    [{ label: "Juan",  count: 4 },
     { label: "Ana",   count: 2 },
     { label: "Luis",  count: 3 }],
    "Juan",
  ),
  pictoRead("📚", 5, "libros",
    [{ label: "Lunes",     count: 3 },
     { label: "Martes",    count: 6 },
     { label: "Miércoles", count: 2 }],
    "Martes",
  ),
  pictoRead("🐟", 3, "peces",
    [{ label: "Río",  count: 4 },
     { label: "Mar",  count: 5 },
     { label: "Lago", count: 2 }],
    "Mar",
  ),
  pictoRead("🍕", 4, "porciones",
    [{ label: "Ana",   count: 3 },
     { label: "Luis",  count: 2 },
     { label: "María", count: 5 }],
    "María",
  ),
  pictoRead("🌸", 2, "flores",
    [{ label: "Rosa",      count: 6 },
     { label: "Tulipán",   count: 3 },
     { label: "Margarita", count: 5 }],
    "Margarita",
  ),
];

// ═══════════════════════════════════════════════════════════════════════════════
// ║  path: math-primary-3 · 3.º GRADO                                          ║
// ═══════════════════════════════════════════════════════════════════════════════

// ── P3 seed helpers ────────────────────────────────────────────────────────────

// Gráfico de barras interactivo: el niño toca la barra que responde la pregunta.
function barGraph(
  bars: { label: string; value: number; color: string }[],
  question: string,
  answerLabel: string,
  scale = 1,
): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: question,
    payload: { visual: "bar-graph", bars, answerLabel, scale } as Prisma.InputJsonValue,
    solution: { answer: 1 },
    hints: ["Mira cuál barra es más alta o más baja.", `La respuesta es: ${answerLabel}.`],
    explanation: `La respuesta correcta es: ${answerLabel}.`,
    difficulty: 2,
    xpReward: 8,
  };
}

// Cuadrícula de área: el niño toca cada casilla para contar el área total.
function areaGrid(rows: number, cols: number, prompt?: string): ExS {
  const area = rows * cols;
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: prompt ?? `Toca todos los cuadrados del rectángulo ${rows}×${cols}.`,
    payload: { visual: "area-grid", rows, cols } as Prisma.InputJsonValue,
    solution: { answer: area },
    hints: [`El rectángulo tiene ${rows} filas y ${cols} columnas.`, `Área = ${rows} × ${cols} = ${area}.`],
    explanation: `Área = ${rows} × ${cols} = ${area} cuadrados.`,
    difficulty: 1,
    xpReward: 8,
  };
}

// Tocar el tipo de ángulo correcto (recto, agudo u obtuso).
type P3AngleType = "right" | "acute" | "obtuse";
function angleTap(
  angles: { degrees: number; id: number }[],
  targetType: P3AngleType,
  prompt: string,
): ExS {
  const names: Record<P3AngleType, string> = {
    right: "ángulo recto",
    acute: "ángulo agudo",
    obtuse: "ángulo obtuso",
  };
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `${prompt} ${names[targetType]}.`,
    payload: { visual: "angle-tap", angles, targetType } as Prisma.InputJsonValue,
    solution: { answer: 1 },
    hints: [
      targetType === "right"
        ? "El ángulo recto mide exactamente 90° y tiene una pequeña cuadrado en la esquina."
        : targetType === "acute"
        ? "Un ángulo agudo mide menos de 90°: las dos líneas están más juntas."
        : "Un ángulo obtuso mide más de 90°: las dos líneas están más abiertas.",
    ],
    explanation: `${names[targetType]}: ${
      targetType === "right" ? "exactamente 90°" : targetType === "acute" ? "menor a 90°" : "mayor a 90°"
    }.`,
    difficulty: 2,
    xpReward: 8,
  };
}

// ── Unit 1: p3-numeros-10000 ──────────────────────────────────────────────────

const primaryThreePreviewExercises: ExerciseSeed[] = [
  {
    kind: ExerciseKind.TEACH,
    order: 0,
    prompt: "",
    payload: {
      teach: {
        beats: [
          { emoji: "🔢", repeat: 1, text: "En 3.º grado exploramos números hasta el 10,000, multiplicación avanzada, fracciones equivalentes, área, perímetro y gráficos. ¡Genial!" },
        ],
        tryIt: { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A empezar 3.º grado!" },
      },
    } as Prisma.InputJsonValue,
    solution: {},
    difficulty: 1,
    xpReward: 0,
  },
  { ...compareNums(3456, 4356, "¿Cuál símbolo va entre 3,456 y 4,356?"), order: 1 },
  { ...flashCardMult(6, 7), order: 2 },
  { ...areaGrid(3, 4, "Toca todos los cuadrados del rectángulo 3×4. ¿Cuántos hay?"), order: 3 },
];

const p3ContarCientosMiles: ExerciseSeed[] = [
  { ...lumi([{ emoji: "💯", text: "Contamos de 100 en 100 hasta 1000, y de 1000 en 1000 hasta 10,000. ¡El patrón siempre suma lo mismo!" }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A contar!" }), order: 0 },
  { ...numberLineGap([100, 200, null, 400, 500], [300, 250, 350], 100, "¿Qué número falta? Va de 100 en 100."), order: 1 },
  { ...numberLineGap([1000, 2000, null, 4000, 5000], [3000, 2500, 3500], 1000, "Va de 1000 en 1000. ¿Qué falta?"), order: 2 },
  { ...numberLineGap([500, 600, null, 800, 900], [700, 650, 750], 100, "¿Qué número falta? El salto es 100."), order: 3 },
  { ...sortNums([300, 100, 500, 200], "Ordena de menor a mayor."), order: 4 },
  { ...numberLineGap([3000, 4000, null, 6000, 7000], [5000, 4500, 5500], 1000, "Va de 1000 en 1000. ¿Qué falta?"), order: 5 },
];

const p3ValorPosP3: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🏗️", text: "Un número de 4 dígitos tiene millares, centenas, decenas y unidades. Ejemplo: 3,456 = 3 mil + 4 cientos + 5 decenas + 6 unidades." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A construir números!" }), order: 0 },
  { ...placeValueMarket(523), order: 1 },
  { ...placeValueMarket(841), order: 2 },
  { ...compareNums(3456, 3546, "¿Cuál símbolo va entre 3,456 y 3,546?"), order: 3 },
  { ...sortNums([1234, 2134, 3124, 4213], "Ordena de menor a mayor."), order: 4 },
  { ...compareNums(5008, 5080, "¿Cuál símbolo va entre 5,008 y 5,080?"), order: 5 },
];

const p3CompararOrdenarP3: ExerciseSeed[] = [
  { ...lumi([{ emoji: "⚖️", text: "Para comparar números de 4 dígitos: primero mira los millares, luego las centenas, después las decenas y por último las unidades." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A comparar!" }), order: 0 },
  { ...compareNums(4321, 4231, "¿Cuál símbolo va entre 4,321 y 4,231?"), order: 1 },
  { ...compareNums(7890, 7809, "¿Cuál símbolo va entre 7,890 y 7,809?"), order: 2 },
  { ...compareNums(9999, 9000, "¿Cuál símbolo va entre 9,999 y 9,000?"), order: 3 },
  { ...sortNums([3215, 5213, 2315, 5132], "Ordena de menor a mayor."), order: 4 },
  { ...compareNums(6050, 6005, "¿Cuál símbolo va entre 6,050 y 6,005?"), order: 5 },
];

const p3PatronesSecP3: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔁", text: "Las secuencias numéricas siguen un patrón: pueden sumar o restar la misma cantidad cada vez. ¡Encuentra el salto!" }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A descubrir patrones!" }), order: 0 },
  { ...numberLineGap([100, 200, null, 400, 500], [300, 250, 350], 100, "¿Qué falta? El patrón suma 100."), order: 1 },
  { ...numberLineGap([1000, 1500, null, 2500, 3000], [2000, 1750, 2250], 500, "El salto es 500. ¿Qué número falta?"), order: 2 },
  { ...numberLineGap([9000, null, 7000, 6000, 5000], [8000, 8500, 7500], -1000, "Va bajando de 1000 en 1000. ¿Qué falta?"), order: 3 },
  { ...numberLineGap([2000, 4000, null, 8000, 10000], [6000, 5000, 7000], 2000, "El salto es 2000. ¿Qué falta?"), order: 4 },
  { ...sortNums([1250, 1000, 1500, 750], "Ordena de menor a mayor."), order: 5 },
];

// ── Unit 2: p3-suma-resta ──────────────────────────────────────────────────────

const p3Algoritmo4D: ExerciseSeed[] = [
  { ...lumi([{ emoji: "➕", text: "Para sumar o restar números de 4 dígitos, alineamos en columnas y empezamos por las unidades. ¡Si hay que llevar, sumamos a la siguiente columna!" }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A calcular!" }), order: 0 },
  { ...columnAdd(2345, 1234), order: 1 },
  { ...columnAdd(3456, 2345), order: 2 },
  { ...columnSub(6789, 2345), order: 3 },
  { ...columnSub(5000, 1234), order: 4 },
  { ...columnAdd(4567, 3456), order: 5 },
];

const p3CalcMentalP3: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🧠", text: "En el cálculo mental sumamos y restamos 2 dígitos sin papel. Un truco: descompón los números en decenas y unidades." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Mente lista!" }), order: 0 },
  { ...mentalCalc(34, "+", 58), order: 1 },
  { ...mentalCalc(75, "-", 38), order: 2 },
  { ...mentalCalc(47, "+", 36), order: 3 },
  { ...mentalCalc(82, "-", 45), order: 4 },
  { ...mentalCalc(58, "+", 27), order: 5 },
];

// ── Unit 3: p3-multiplicacion-division ────────────────────────────────────────

const p3Tablas6789: ExerciseSeed[] = [
  { ...lumi([{ emoji: "✖️", text: "Las tablas del 6, 7, 8 y 9 completan las multiplicaciones hasta el 10×10. ¡Practica cada una y verás que se aprenden rápido!" }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A multiplicar!" }), order: 0 },
  { ...flashCardMult(6, 7), order: 1 },
  { ...flashCardMult(8, 6), order: 2 },
  { ...flashCardMult(9, 7), order: 3 },
  { ...flashCardMult(7, 8), order: 4 },
  { ...flashCardMult(9, 9), order: 5 },
];

const p3MultDivTablas: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔄", text: "Multiplicación y división son operaciones inversas. Si 6×8=48, entonces 48÷6=8 y 48÷8=6." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Son opuestos!" }), order: 0 },
  { ...flashCardMult(6, 8), order: 1 },
  { ...divGroups(56, 7, [8, 7, 9]), order: 2 },
  { ...flashCardMult(9, 6), order: 3 },
  { ...divGroups(72, 9, [8, 7, 9]), order: 4 },
  { ...divGroups(63, 7, [9, 8, 10]), order: 5 },
];

const p3DivisionResiduoP3: ExerciseSeed[] = [
  { ...lumi([{ emoji: "➗", text: "A veces al dividir sobran objetos: eso es el residuo. Ejemplo: 17 ÷ 3 = 5 grupos de 3 y sobran 2." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A repartir!" }), order: 0 },
  { ...flashCardMult(3, 5), order: 1 },
  { ...mentalCalc(17, "-", 15), order: 2 },
  { ...divGroups(20, 4, [5, 4, 6]), order: 3 },
  { ...flashCardMult(4, 4), order: 4 },
  { ...mentalCalc(19, "-", 16), order: 5 },
];

const p3AlgoritmoMultP3: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🧮", text: "Para multiplicar un número grande por 1 dígito, multiplica columna por columna empezando por las unidades." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A multiplicar!" }), order: 0 },
  { ...multArray(4, 6, [24, 20, 28]), order: 1 },
  { ...multArray(7, 5, [35, 30, 40]), order: 2 },
  { ...flashCardMult(8, 7), order: 3 },
  { ...flashCardMult(9, 8), order: 4 },
  { ...arrayPacker(6, 7, "⭐"), order: 5 },
];

const p3CalcMentalMultDiv: ExerciseSeed[] = [
  { ...lumi([{ emoji: "⚡", text: "Los cálculos mentales de × y ÷ son más rápidos cuando recuerdas bien las tablas. ¡Practica y verás!" }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Rápido!" }), order: 0 },
  { ...flashCardMult(6, 6), order: 1 },
  { ...divGroups(48, 6, [8, 7, 9]), order: 2 },
  { ...flashCardMult(7, 7), order: 3 },
  { ...divGroups(81, 9, [9, 8, 10]), order: 4 },
  { ...flashCardMult(8, 8), order: 5 },
];

// ── Unit 4: p3-fracciones ──────────────────────────────────────────────────────

const p3FracEquivalentes: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🍕", text: "Fracciones equivalentes representan la misma parte del entero. 1/2 = 2/4 = 3/6. ¡El pastel es el mismo aunque lo corten diferente!" }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Son iguales!" }), order: 0 },
  { ...pieFrac(2, 1, "Colorea 1/2 del pastel."), order: 1 },
  { ...pieFrac(4, 2, "Colorea 2/4. ¿Ves que es lo mismo que 1/2?"), order: 2 },
  { ...pieFrac(6, 3, "Colorea 3/6. ¿Es también la mitad del pastel?"), order: 3 },
  { ...fracBarsGame(1, 2, 2, 4, "¿Cuál fracción es mayor o igual: 1/2 o 2/4?"), order: 4 },
  { ...fracBarsGame(1, 3, 2, 6, "¿Cuál fracción es mayor o igual: 1/3 o 2/6?"), order: 5 },
];

const p3SimplificarFrac: ExerciseSeed[] = [
  { ...lumi([{ emoji: "✂️", text: "Simplificar una fracción significa encontrar la fracción equivalente más sencilla. 4/8 = 1/2, porque ambas dividen el entero en la misma proporción." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Más simple!" }), order: 0 },
  { ...pieFrac(4, 2, "Colorea 2/4 del pastel (que es lo mismo que 1/2)."), order: 1 },
  { ...pieFrac(6, 3, "3/6 = 1/2. Colorea los gajos."), order: 2 },
  { ...fruitFrac(6, 2, "🍎", "🍊", "¿Qué fracción de la canasta son las 🍎?"), order: 3 },
  { ...fracBarsGame(4, 8, 1, 2, "¿Cuál es mayor: 4/8 o 1/2?"), order: 4 },
  { ...fruitFrac(8, 4, "🍇", "🍋", "¿Qué fracción de la canasta son las 🍇?"), order: 5 },
];

const p3CompararFracP3: ExerciseSeed[] = [
  { ...lumi([{ emoji: "⚖️", text: "Para comparar fracciones distintas, buscamos cuál ocupa más del entero. Las barras nos ayudan a verlo." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A comparar fracciones!" }), order: 0 },
  { ...fracBarsGame(1, 2, 1, 3, "¿Cuál es mayor: 1/2 o 1/3?"), order: 1 },
  { ...fracBarsGame(2, 3, 3, 4, "¿Cuál es mayor: 2/3 o 3/4?"), order: 2 },
  { ...fracBarsGame(3, 5, 2, 5, "¿Cuál es mayor: 3/5 o 2/5?"), order: 3 },
  { ...fracBarsGame(5, 6, 7, 8, "¿Cuál es mayor: 5/6 o 7/8?"), order: 4 },
  { ...fracBarsGame(1, 4, 1, 6, "¿Cuál es mayor: 1/4 o 1/6?"), order: 5 },
];

const p3SumarRestarFracP3: ExerciseSeed[] = [
  { ...lumi([{ emoji: "➕", text: "Para sumar y restar fracciones con igual denominador, solo operamos los numeradores. El denominador no cambia. Ejemplo: 2/5 + 1/5 = 3/5." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A operar fracciones!" }), order: 0 },
  { ...fracTile(1, 2, 4, "+"), order: 1 },
  { ...fracTile(3, 1, 6, "-"), order: 2 },
  { ...fracTile(2, 3, 8, "+"), order: 3 },
  { ...fracTile(4, 2, 6, "-"), order: 4 },
  { ...fracTile(1, 3, 5, "+"), order: 5 },
];

// ── Unit 5: p3-dinero ─────────────────────────────────────────────────────────

const p3DineroDecimalP3: ExerciseSeed[] = [
  { ...lumi([{ emoji: "💰", text: "El dinero usa notación decimal: S/ 3.75 significa 3 soles y 75 céntimos. Al sumar o restar, alineamos el punto decimal." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A contar dinero!" }), order: 0 },
  { ...moneyCount([{ label: "S/1", value: 100, type: "bill", count: 2 }, { label: "50¢", value: 50, type: "coin" }, { label: "25¢", value: 25, type: "coin" }], "¿Cuánto dinero hay en total?"), order: 1 },
  { ...moneyCount([{ label: "S/5", value: 500, type: "bill" }, { label: "S/1", value: 100, type: "bill", count: 3 }, { label: "50¢", value: 50, type: "coin" }], "¿Cuánto hay en total?"), order: 2 },
  { ...changeGame(150, 200, "Precio: S/ 1.50. Pagas con S/ 2.00. ¿Cuánto es el cambio?"), order: 3 },
  { ...changeGame(275, 500, "Precio: S/ 2.75. Pagas con S/ 5.00. ¿Cuánto es el cambio?"), order: 4 },
  { ...moneyCompare(350, 275, true, "¿Cuál cantidad es mayor: S/ 3.50 o S/ 2.75?"), order: 5 },
];

// ── Unit 6: p3-medicion-tiempo ────────────────────────────────────────────────

const p3LongitudKmVolMl: ExerciseSeed[] = [
  { ...lumi([{ emoji: "📏", text: "Usamos km para medir distancias largas como carreteras, y ml para volúmenes pequeños como medicina en un gotero." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A medir!" }), order: 0 },
  { ...unitTap("🏃", "¿En qué unidad medirías la distancia de un maratón?", ["km", "m", "cm"], "km"), order: 1 },
  { ...unitTap("💧", "¿En qué unidad medirías el agua en un gotero?", ["L", "ml", "m"], "ml"), order: 2 },
  { ...unitTap("🏠", "¿En qué unidad medirías la altura de una casa?", ["km", "m", "cm"], "m"), order: 3 },
  { ...unitTap("🚂", "¿En qué unidad medirías el largo de una carretera?", ["km", "m", "cm"], "km"), order: 4 },
  { ...measureCompare(1000, "1 km", 1000, "1000 m", true, "¿Cuál es mayor: 1 km o 1000 m?"), order: 5 },
];

const p3UnidadesCompuestasP3: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔢", text: "Las unidades compuestas combinan dos unidades. Ejemplo: 2 km 500 m = 2500 m. Las unidades compuestas facilitan leer medidas grandes." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Unidades combinadas!" }), order: 0 },
  { ...unitBlock(3, "3 km", 1000, "m", "3 km = ___ m. Toca cada bloque de 1000 m."), order: 1 },
  { ...unitBlock(2, "2 kg", 1000, "g", "2 kg = ___ g. Toca cada bloque de 1000 g."), order: 2 },
  { ...unitBlock(5, "5 L", 1000, "ml", "5 L = ___ ml. Toca cada bloque de 1000 ml."), order: 3 },
  { ...measureCompare(2500, "2 km 500 m", 2500, "2500 m", true, "¿Qué es mayor: 2 km 500 m o 2500 m?"), order: 4 },
  { ...unitBlock(4, "4 kg", 1000, "g", "4 kg = ___ g."), order: 5 },
];

const p3ConvertirUnidadesP3: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔄", text: "Convertir entre unidades: 1 km = 1000 m, 1 kg = 1000 g, 1 L = 1000 ml. Multiplica la cantidad por 1000." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A convertir!" }), order: 0 },
  { ...unitBlock(4, "4 km", 1000, "m"), order: 1 },
  { ...unitBlock(3, "3 kg", 1000, "g"), order: 2 },
  { ...unitBlock(2, "2 L", 1000, "ml"), order: 3 },
  { ...measureCompare(3000, "3 km", 2000, "2000 m", true, "¿Cuál es mayor: 3 km o 2000 m?"), order: 4 },
  { ...unitBlock(6, "6 L", 1000, "ml"), order: 5 },
];

const p3DuracionHorarios: ExerciseSeed[] = [
  { ...lumi([{ emoji: "⏱️", text: "La duración es el tiempo que pasa entre el inicio y el fin. Para calcularla, restamos la hora de inicio de la hora de fin." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A medir el tiempo!" }), order: 0 },
  { ...clockSet(9, 0, "La clase empieza a las 9:00. Marca la hora."), order: 1 },
  { ...clockSet(9, 45, "La clase termina a las 9:45. Marca la hora."), order: 2 },
  { ...mentalCalc(45, "+", 15), order: 3 },
  { ...clockRead(10, 30, [{ hour: 10, minute: 30 }, { hour: 10, minute: 0 }, { hour: 11, minute: 30 }], 0, "¿Cuál reloj muestra las 10:30?"), order: 4 },
  { ...mentalCalc(60, "-", 25), order: 5 },
];

const p3Reloj24H: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🕐", text: "El reloj de 24 horas: de 0:00 a 11:59 es AM (igual al reloj de 12 h). De 12:00 a 23:59 es PM: para convertir, sumamos 12 a la hora PM. Ejemplo: 3 p.m. = 12 + 3 = 15:00." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡24 horas!" }), order: 0 },
  { ...clockSet(8, 0, "Las 8 a.m. En formato 24 h también es 8:00. Marca la hora."), order: 1 },
  { ...mentalCalc(12, "+", 3), order: 2 },
  { ...mentalCalc(12, "+", 6), order: 3 },
  { ...mentalCalc(12, "+", 9), order: 4 },
  { ...mentalCalc(12, "+", 11), order: 5 },
];

// ── Unit 7: p3-area-perimetro ─────────────────────────────────────────────────

const p3AreaCuadricula: ExerciseSeed[] = [
  { ...lumi([{ emoji: "📐", text: "El área es el espacio que ocupa una figura. La medimos contando cuadritos. Un cuadrito = 1 unidad cuadrada." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A contar cuadritos!" }), order: 0 },
  { ...areaGrid(3, 4, "Toca todos los cuadrados del rectángulo 3×4."), order: 1 },
  { ...areaGrid(4, 5, "Toca todos los cuadrados del rectángulo 4×5."), order: 2 },
  { ...areaGrid(2, 6, "Toca todos los cuadrados del rectángulo 2×6."), order: 3 },
  { ...areaGrid(5, 3, "Toca todos los cuadrados del rectángulo 5×3."), order: 4 },
  { ...areaGrid(4, 4, "Toca todos los cuadrados del cuadrado 4×4."), order: 5 },
];

const p3PerimetroFigurasP3: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔲", text: "El perímetro es la distancia total alrededor de una figura. Para un rectángulo: P = 2 × (largo + ancho). Para un cuadrado: P = 4 × lado." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A medir el borde!" }), order: 0 },
  { ...mentalCalc(5, "+", 3), order: 1 },
  { ...flashCardMult(2, 8), order: 2 },
  { ...mentalCalc(4, "+", 6), order: 3 },
  { ...flashCardMult(2, 10), order: 4 },
  { ...flashCardMult(4, 7), order: 5 },
];

const p3AreaRectanguloP3: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🧮", text: "Área del rectángulo = largo × ancho. Área del cuadrado = lado × lado. ¡Multiplicar es más rápido que contar cuadrito por cuadrito!" }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Área = largo × ancho!" }), order: 0 },
  { ...flashCardMult(6, 4), order: 1 },
  { ...areaGrid(5, 4, "Cuenta todos los cuadrados del rectángulo 5×4."), order: 2 },
  { ...flashCardMult(7, 3), order: 3 },
  { ...areaGrid(6, 3, "Cuenta todos los cuadrados del rectángulo 6×3."), order: 4 },
  { ...flashCardMult(8, 5), order: 5 },
];

// ── Unit 8: p3-geometria ──────────────────────────────────────────────────────

const p3AngulosP3: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔷", text: "Un ángulo es la abertura entre dos líneas que se juntan en un punto. Ángulo recto = 90° (como la esquina de un cuadrado). Agudo < 90°. Obtuso > 90°." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A identificar ángulos!" }), order: 0 },
  { ...angleTap([{ degrees: 90, id: 0 }, { degrees: 45, id: 1 }, { degrees: 120, id: 2 }, { degrees: 30, id: 3 }], "right", "Toca el"), order: 1 },
  { ...angleTap([{ degrees: 60, id: 0 }, { degrees: 90, id: 1 }, { degrees: 150, id: 2 }, { degrees: 35, id: 3 }], "right", "Toca el"), order: 2 },
  { ...angleTap([{ degrees: 40, id: 0 }, { degrees: 55, id: 1 }, { degrees: 120, id: 2 }, { degrees: 90, id: 3 }], "acute", "Toca un"), order: 3 },
  { ...angleTap([{ degrees: 110, id: 0 }, { degrees: 90, id: 1 }, { degrees: 50, id: 2 }, { degrees: 145, id: 3 }], "obtuse", "Toca un"), order: 4 },
  { ...angleTap([{ degrees: 90, id: 0 }, { degrees: 35, id: 1 }, { degrees: 125, id: 2 }, { degrees: 65, id: 3 }], "right", "Identifica el"), order: 5 },
];

const p3LineasParalelasPerp: ExerciseSeed[] = [
  { ...lumi([{ emoji: "📏", text: "Líneas paralelas nunca se cruzan (como los rieles del tren). Líneas perpendiculares se cruzan formando un ángulo recto de 90°." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Paralelas y perpendiculares!" }), order: 0 },
  { ...angleTap([{ degrees: 90, id: 0 }, { degrees: 60, id: 1 }, { degrees: 120, id: 2 }, { degrees: 45, id: 3 }], "right", "Las líneas perpendiculares forman ángulos rectos. Toca el"), order: 1 },
  { ...gridTrace("ángulo recto (líneas perpendiculares)", [0, 20, 24]), order: 2 },
  { ...angleTap([{ degrees: 90, id: 0 }, { degrees: 55, id: 1 }, { degrees: 130, id: 2 }, { degrees: 30, id: 3 }], "right", "Toca el"), order: 3 },
  { ...gridTrace("cuadrado con 4 ángulos rectos", [0, 4, 24, 20, 0]), order: 4 },
  { ...angleTap([{ degrees: 70, id: 0 }, { degrees: 90, id: 1 }, { degrees: 140, id: 2 }, { degrees: 50, id: 3 }], "right", "Identifica el"), order: 5 },
];

// ── Unit 9: p3-estadistica ────────────────────────────────────────────────────

const FRUIT_COLORS = { lunes: "#60a5fa", martes: "#f472b6", miercoles: "#4ade80", jueves: "#fb923c" };

const p3GraficosDeBarras: ExerciseSeed[] = [
  { ...lumi([{ emoji: "📊", text: "Un gráfico de barras usa barras de distinta altura para comparar cantidades. Cuanto más alta la barra, mayor es la cantidad. ¡Toca la barra correcta!" }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A leer gráficos!" }), order: 0 },
  { ...barGraph(
    [{ label: "Lunes", value: 5, color: FRUIT_COLORS.lunes }, { label: "Martes", value: 8, color: FRUIT_COLORS.martes }, { label: "Miércoles", value: 3, color: FRUIT_COLORS.miercoles }, { label: "Jueves", value: 6, color: FRUIT_COLORS.jueves }],
    "¿Qué día se vendieron más manzanas?", "Martes", 1,
  ), order: 1 },
  { ...barGraph(
    [{ label: "Lunes", value: 5, color: FRUIT_COLORS.lunes }, { label: "Martes", value: 8, color: FRUIT_COLORS.martes }, { label: "Miércoles", value: 3, color: FRUIT_COLORS.miercoles }, { label: "Jueves", value: 6, color: FRUIT_COLORS.jueves }],
    "¿Qué día se vendieron menos manzanas?", "Miércoles", 1,
  ), order: 2 },
  { ...barGraph(
    [{ label: "Ana", value: 4, color: "#a78bfa" }, { label: "Luis", value: 7, color: "#f59e0b" }, { label: "Mia", value: 6, color: "#34d399" }],
    "¿Quién leyó más libros?", "Luis", 1,
  ), order: 3 },
  { ...barGraph(
    [{ label: "Gatos", value: 10, color: "#60a5fa" }, { label: "Perros", value: 15, color: "#f472b6" }, { label: "Peces", value: 5, color: "#4ade80" }, { label: "Aves", value: 10, color: "#fb923c" }],
    "¿Cuántos peces hay? Toca la barra de los peces.", "Peces", 5,
  ), order: 4 },
  { ...barGraph(
    [{ label: "Rojo", value: 4, color: "#f87171" }, { label: "Azul", value: 6, color: "#60a5fa" }, { label: "Verde", value: 2, color: "#4ade80" }, { label: "Amarillo", value: 5, color: "#fbbf24" }],
    "¿Qué color tiene más votos?", "Azul", 1,
  ), order: 5 },
];

// ═══════════════════════════════════════════════════════════════════════════════
// ║  path: math-primary-4 · 4.º GRADO                                          ║
// ═══════════════════════════════════════════════════════════════════════════════

// ── P4 seed helpers ────────────────────────────────────────────────────────────

// Redondeo en recta numérica: el niño toca la decena/centena/millar más cercana.
function rounding(value: number, roundTo: number): ExS {
  const nearest = Math.round(value / roundTo) * roundTo;
  const unit = roundTo === 10 ? "decena" : roundTo === 100 ? "centena" : "millar";
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `¿A qué ${unit} está más cerca ${value.toLocaleString("es")}?`,
    payload: { visual: "rounding", value, roundTo } as Prisma.InputJsonValue,
    solution: { answer: 1 },
    hints: [
      `Mira si ${value.toLocaleString("es")} pasó de la mitad entre las dos ${unit}s.`,
      `${value.toLocaleString("es")} ≈ ${nearest.toLocaleString("es")}.`,
    ],
    explanation: `${value.toLocaleString("es")} redondeado a la ${unit} más cercana es ${nearest.toLocaleString("es")}.`,
    difficulty: 2,
    xpReward: 8,
  };
}

// Factores / múltiplos: toca todos los factores o múltiplos del número objetivo.
function factorTap(
  target: number,
  candidates: number[],
  mode: "factor" | "multiple",
): ExS {
  const correct = candidates.filter((n) =>
    mode === "factor" ? target % n === 0 : n % target === 0,
  );
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `Toca todos los ${mode === "factor" ? "factores" : "múltiplos"} de ${target}.`,
    payload: { visual: "factor-tap", target, candidates, mode } as Prisma.InputJsonValue,
    solution: { answer: 1 },
    hints: [
      mode === "factor"
        ? `Un factor divide exactamente a ${target} sin dejar residuo.`
        : `Un múltiplo de ${target} es ${target} × 1, ${target} × 2, ${target} × 3...`,
      `Los correctos son: ${correct.join(", ")}.`,
    ],
    explanation: `${mode === "factor" ? "Factores" : "Múltiplos"} de ${target}: ${correct.join(", ")}.`,
    difficulty: 2,
    xpReward: 9,
  };
}

// Barra de décimos: el niño colorea el decimal indicado (0.1 a 1.0).
function decimalBar(tenths: number): ExS {
  const dec = (tenths / 10).toFixed(1);
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `Colorea ${dec} de la barra.`,
    payload: { visual: "decimal-bar", tenths } as Prisma.InputJsonValue,
    solution: { answer: tenths },
    hints: [`${dec} significa ${tenths} de 10 partes.`, `${dec} = ${tenths}/10.`],
    explanation: `${dec} = ${tenths}/10: coloreas ${tenths} de los 10 décimos.`,
    difficulty: 1,
    xpReward: 7,
  };
}

// Simetría: el niño refleja la figura del lado izquierdo tocando el lado derecho.
function symmetryGrid(
  rows: number,
  cols: number,
  leftCells: [number, number][],
): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: "Completa el reflejo para que la figura sea simétrica.",
    payload: { visual: "symmetry-grid", rows, cols, leftCells } as Prisma.InputJsonValue,
    solution: { answer: 1 },
    hints: [
      "Cada cuadrado tiene su reflejo al otro lado de la línea punteada.",
      "La misma distancia a la izquierda debe repetirse a la derecha.",
    ],
    explanation: "Una figura es simétrica cuando un lado es el reflejo exacto del otro.",
    difficulty: 2,
    xpReward: 9,
  };
}

// Redes (nets): el niño toca la plantilla que forma el sólido mostrado.
function netMatch(
  solidName: string,
  solidEmoji: string,
  nets: { id: number; type: "cube" | "cuboid" | "pyramid" | "cylinder" | "cone" }[],
  correctType: "cube" | "cuboid" | "pyramid" | "cylinder" | "cone",
): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `¿Qué red se dobla para formar un ${solidName}?`,
    payload: { visual: "net-match", solidName, solidEmoji, nets, correctType } as Prisma.InputJsonValue,
    solution: { answer: 1 },
    hints: [
      `Imagina doblar cada plantilla. ¿Cuál forma un ${solidName}?`,
      `El ${solidName} se forma con la red correcta.`,
    ],
    explanation: `La red correcta, al doblarse, forma un ${solidName}.`,
    difficulty: 2,
    xpReward: 9,
  };
}

// Gráfico de líneas: el niño toca el punto que responde la pregunta.
function lineGraph(
  points: { label: string; value: number }[],
  question: string,
  answerLabel: string,
  scale = 1,
): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: question,
    payload: { visual: "line-graph", points, answerLabel, scale } as Prisma.InputJsonValue,
    solution: { answer: 1 },
    hints: ["Sigue la línea: sube cuando crece y baja cuando disminuye.", `La respuesta es: ${answerLabel}.`],
    explanation: `La respuesta correcta es: ${answerLabel}.`,
    difficulty: 2,
    xpReward: 8,
  };
}

// Gráfico circular: el niño toca la porción correcta del pastel.
function pieChart(
  slices: { label: string; value: number; color: string }[],
  question: string,
  answerLabel: string,
): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: question,
    payload: { visual: "pie-chart", slices, answerLabel } as Prisma.InputJsonValue,
    solution: { answer: 1 },
    hints: ["La porción más grande ocupa más del círculo.", `La respuesta es: ${answerLabel}.`],
    explanation: `La respuesta correcta es: ${answerLabel}.`,
    difficulty: 2,
    xpReward: 8,
  };
}

// ── Unit 1: p4-numeros-100000 ──────────────────────────────────────────────────

const primaryFourPreviewExercises: ExerciseSeed[] = [
  {
    kind: ExerciseKind.TEACH,
    order: 0,
    prompt: "",
    payload: {
      teach: {
        beats: [
          { emoji: "🔢", repeat: 1, text: "En 4.º grado dominamos números hasta 100,000, factores, múltiplos, decimales, simetría, redes 3D y gráficos. ¡Aventura total!" },
        ],
        tryIt: { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A empezar 4.º grado!" },
      },
    } as Prisma.InputJsonValue,
    solution: {},
    difficulty: 1,
    xpReward: 0,
  },
  { ...rounding(47, 10), order: 1 },
  { ...factorTap(12, [2, 5, 3, 7, 4, 9, 6, 8], "factor"), order: 2 },
  { ...compareNums(34567, 34657, "¿Cuál símbolo va entre 34,567 y 34,657?"), order: 3 },
];

const p4ValorPosicionalP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🏗️", text: "Un número de 5 dígitos tiene decenas de millar, unidades de millar, centenas, decenas y unidades. Ejemplo: 34,567 = 3 decenas de millar + 4 millares + 5 centenas + 6 decenas + 7 unidades." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A construir números!" }), order: 0 },
  { ...placeValueMarket(742), order: 1 },
  { ...compareNums(12345, 12354, "¿Cuál símbolo va entre 12,345 y 12,354?"), order: 2 },
  { ...sortNums([23451, 32145, 21345, 34512], "Ordena de menor a mayor."), order: 3 },
  { ...compareNums(50000, 49999, "¿Cuál símbolo va entre 50,000 y 49,999?"), order: 4 },
  { ...compareNums(67890, 67809, "¿Cuál símbolo va entre 67,890 y 67,809?"), order: 5 },
];

const p4CompararOrdenarP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "⚖️", text: "Para comparar números grandes, alinea los dígitos y compara de izquierda a derecha: primero las decenas de millar, luego los millares, y así hasta las unidades." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A comparar!" }), order: 0 },
  { ...compareNums(45678, 45876, "¿Cuál símbolo va entre 45,678 y 45,876?"), order: 1 },
  { ...compareNums(90000, 89999, "¿Cuál símbolo va entre 90,000 y 89,999?"), order: 2 },
  { ...sortNums([54321, 45321, 53421, 43521], "Ordena de menor a mayor."), order: 3 },
  { ...compareNums(33333, 33330, "¿Cuál símbolo va entre 33,333 y 33,330?"), order: 4 },
  { ...sortNums([10500, 15000, 10050, 51000], "Ordena de menor a mayor."), order: 5 },
];

const p4PatronesSecP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔁", text: "Las secuencias numéricas siguen un patrón constante. Busca la regla: ¿suma o resta la misma cantidad cada vez?" }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A descubrir patrones!" }), order: 0 },
  { ...numberLineGap([1000, 2000, null, 4000, 5000], [3000, 2500, 3500], 1000, "El salto es 1000. ¿Qué falta?"), order: 1 },
  { ...numberLineGap([5000, 10000, null, 20000, 25000], [15000, 12000, 18000], 5000, "El salto es 5000. ¿Qué falta?"), order: 2 },
  { ...numberLineGap([10000, 20000, null, 40000, 50000], [30000, 25000, 35000], 10000, "El salto es 10,000. ¿Qué falta?"), order: 3 },
  { ...numberLineGap([50000, null, 30000, 20000, 10000], [40000, 45000, 35000], -10000, "Va bajando de 10,000. ¿Qué falta?"), order: 4 },
  { ...sortNums([12500, 12000, 13000, 11500], "Ordena de menor a mayor."), order: 5 },
];

const p4RedondearNumerosP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "📍", text: "Redondear es reemplazar un número por el más cercano y sencillo. Si el dígito siguiente es 5 o más, subimos; si es menos de 5, bajamos. El símbolo ≈ significa 'aproximadamente igual'." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A redondear!" }), order: 0 },
  { ...rounding(47, 10), order: 1 },
  { ...rounding(83, 10), order: 2 },
  { ...rounding(340, 100), order: 3 },
  { ...rounding(672, 100), order: 4 },
  { ...rounding(4200, 1000), order: 5 },
];

// ── Unit 2: p4-factores-multiplos ──────────────────────────────────────────────

const p4FactoresP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🧩", text: "Los factores de un número son los que lo dividen exactamente sin dejar residuo. Por ejemplo, los factores de 12 son 1, 2, 3, 4, 6 y 12." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A buscar factores!" }), order: 0 },
  { ...factorTap(12, [2, 5, 3, 7, 4, 9, 6, 8], "factor"), order: 1 },
  { ...factorTap(18, [2, 3, 4, 5, 6, 7, 9, 8], "factor"), order: 2 },
  { ...factorTap(20, [2, 3, 4, 5, 6, 7, 10, 8], "factor"), order: 3 },
  { ...factorTap(24, [2, 3, 4, 5, 6, 8, 7, 12], "factor"), order: 4 },
  { ...factorTap(15, [1, 3, 4, 5, 6, 7, 15, 9], "factor"), order: 5 },
];

const p4MultiplosP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔢", text: "Los múltiplos de un número son el resultado de multiplicarlo por 1, 2, 3, 4... Los múltiplos de 3 son 3, 6, 9, 12, 15..." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A buscar múltiplos!" }), order: 0 },
  { ...factorTap(3, [6, 7, 9, 10, 12, 14, 15, 20], "multiple"), order: 1 },
  { ...factorTap(4, [8, 9, 12, 14, 16, 18, 20, 22], "multiple"), order: 2 },
  { ...factorTap(5, [10, 12, 15, 18, 20, 22, 25, 30], "multiple"), order: 3 },
  { ...factorTap(6, [12, 15, 18, 20, 24, 28, 30, 32], "multiple"), order: 4 },
  { ...factorTap(2, [4, 5, 6, 7, 8, 9, 10, 11], "multiple"), order: 5 },
];

const p4FactoresComunesP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🤝", text: "Los factores comunes de dos números son los que dividen a ambos. Ejemplo: los factores comunes de 12 y 18 son 1, 2, 3 y 6." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Factores en común!" }), order: 0 },
  { ...factorTap(12, [2, 5, 3, 7, 4, 9, 6, 11], "factor"), order: 1 },
  { ...factorTap(18, [2, 3, 5, 6, 7, 9, 11, 13], "factor"), order: 2 },
  { ...factorTap(6, [1, 2, 3, 4, 5, 6, 7, 8], "factor"), order: 3 },
  { ...factorTap(16, [2, 3, 4, 5, 6, 8, 7, 16], "factor"), order: 4 },
  { ...factorTap(9, [1, 3, 4, 5, 6, 7, 9, 8], "factor"), order: 5 },
];

const p4MultiplosComunesP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔗", text: "Los múltiplos comunes de dos números aparecen en las dos tablas. Ejemplo: 12 es múltiplo común de 3 y 4, porque 3×4=12 y 4×3=12." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Múltiplos en común!" }), order: 0 },
  { ...factorTap(3, [6, 7, 9, 11, 12, 13, 15, 16], "multiple"), order: 1 },
  { ...factorTap(4, [8, 10, 12, 14, 16, 18, 20, 22], "multiple"), order: 2 },
  { ...factorTap(6, [12, 13, 18, 20, 24, 25, 30, 32], "multiple"), order: 3 },
  { ...factorTap(5, [10, 12, 15, 18, 20, 24, 25, 28], "multiple"), order: 4 },
  { ...factorTap(2, [12, 13, 14, 15, 16, 17, 18, 19], "multiple"), order: 5 },
];

// ── Unit 3: p4-operaciones ──────────────────────────────────────────────────────

const p4Mult4Por1: ExerciseSeed[] = [
  { ...lumi([{ emoji: "✖️", text: "Para multiplicar un número grande por un dígito, multiplicamos cada cifra empezando por las unidades y llevamos cuando pasa de 9." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A multiplicar!" }), order: 0 },
  { ...multArray(6, 8, [48, 42, 54]), order: 1 },
  { ...flashCardMult(7, 9), order: 2 },
  { ...flashCardMult(8, 8), order: 3 },
  { ...arrayPacker(9, 6, "⭐"), order: 4 },
  { ...flashCardMult(9, 7), order: 5 },
];

const p4Mult3Por2: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🧮", text: "Para multiplicar por 2 dígitos, multiplicamos primero por las unidades, luego por las decenas, y sumamos los resultados." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A multiplicar en grande!" }), order: 0 },
  { ...flashCardMult(12, 4), order: 1 },
  { ...flashCardMult(15, 3), order: 2 },
  { ...multArray(6, 7, [42, 36, 48]), order: 3 },
  { ...flashCardMult(11, 5), order: 4 },
  { ...flashCardMult(13, 3), order: 5 },
];

const p4Division4Por1: ExerciseSeed[] = [
  { ...lumi([{ emoji: "➗", text: "Para dividir un número grande entre un dígito, repartimos cifra por cifra de izquierda a derecha. A veces sobra un residuo." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A dividir!" }), order: 0 },
  { ...divGroups(48, 6, [8, 7, 9]), order: 1 },
  { ...divGroups(63, 9, [7, 6, 8]), order: 2 },
  { ...divGroups(72, 8, [9, 8, 10]), order: 3 },
  { ...divGroups(56, 7, [8, 7, 9]), order: 4 },
  { ...divGroups(81, 9, [9, 8, 10]), order: 5 },
];

// ── Unit 4: p4-fracciones ──────────────────────────────────────────────────────

const p4NumerosMixtosP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🍕", text: "Un número mixto tiene una parte entera y una fracción, como 1 1/2 (un pastel entero y medio). Es más grande que 1 pero menor que 2." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Enteros y partes!" }), order: 0 },
  { ...pieFrac(4, 3, "Colorea 3/4 del pastel."), order: 1 },
  { ...pieFrac(2, 1, "Colorea 1/2 del pastel (medio)."), order: 2 },
  { ...pieFrac(4, 2, "Colorea 2/4 del pastel."), order: 3 },
  { ...fracBarsGame(3, 4, 1, 2, "¿Cuál es mayor: 3/4 o 1/2?"), order: 4 },
  { ...pieFrac(3, 2, "Colorea 2/3 del pastel."), order: 5 },
];

const p4FraccionesImpropiasP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔢", text: "Una fracción impropia tiene el numerador mayor o igual que el denominador, como 5/4. Equivale a un número mixto: 5/4 = 1 1/4." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Fracciones impropias!" }), order: 0 },
  { ...fracTile(2, 3, 4, "+"), order: 1 },
  { ...fracTile(3, 2, 4, "+"), order: 2 },
  { ...fracTile(4, 2, 5, "+"), order: 3 },
  { ...fracBarsGame(5, 4, 1, 1, "¿Cuál es mayor: 5/4 o 1 entero (4/4)?"), order: 4 },
  { ...fracTile(3, 3, 5, "+"), order: 5 },
];

const p4FraccionDeConjuntoP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🧺", text: "Una fracción de un conjunto es una parte de un grupo. Si hay 6 frutas y 2 son manzanas, entonces 2/6 del conjunto son manzanas." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Fracción del grupo!" }), order: 0 },
  { ...fruitFrac(6, 2, "🍎", "🍊", "¿Qué fracción de la canasta son las 🍎?"), order: 1 },
  { ...fruitFrac(8, 3, "🍇", "🍋", "¿Qué fracción de la canasta son las 🍇?"), order: 2 },
  { ...fruitFrac(10, 4, "🍓", "🫐", "¿Qué fracción de la canasta son las 🍓?"), order: 3 },
  { ...fruitFrac(9, 3, "🍒", "🍏", "¿Qué fracción de la canasta son las 🍒?"), order: 4 },
  { ...fruitFrac(12, 5, "🍊", "🍎", "¿Qué fracción de la canasta son las 🍊?"), order: 5 },
];

const p4SumarRestarFraccionesP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "➕", text: "Para sumar o restar fracciones con el mismo denominador, operamos solo los numeradores. El denominador se mantiene. Ejemplo: 3/8 + 2/8 = 5/8." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A operar fracciones!" }), order: 0 },
  { ...fracTile(3, 2, 8, "+"), order: 1 },
  { ...fracTile(5, 2, 6, "-"), order: 2 },
  { ...fracTile(4, 3, 10, "+"), order: 3 },
  { ...fracTile(7, 3, 9, "-"), order: 4 },
  { ...fracTile(2, 4, 7, "+"), order: 5 },
];

// ── Unit 5: p4-decimales ────────────────────────────────────────────────────────

const p4DecimalesNotacionP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔟", text: "Un decimal muestra partes de un entero. 0.1 es un décimo (1 de 10 partes). El punto separa los enteros de las partes decimales." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A colorear decimales!" }), order: 0 },
  { ...decimalBar(3), order: 1 },
  { ...decimalBar(5), order: 2 },
  { ...decimalBar(7), order: 3 },
  { ...decimalBar(4), order: 4 },
  { ...decimalBar(9), order: 5 },
];

const p4CompararDecimalesP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "⚖️", text: "Para comparar decimales, mira primero los enteros, luego los décimos y después los centésimos. 0.7 es mayor que 0.5 porque 7 décimos > 5 décimos." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A comparar decimales!" }), order: 0 },
  { ...measureCompare(7, "0.7", 5, "0.5", true, "¿Cuál es mayor: 0.7 o 0.5?"), order: 1 },
  { ...measureCompare(3, "0.3", 8, "0.8", true, "¿Cuál es mayor: 0.3 o 0.8?"), order: 2 },
  { ...measureCompare(6, "0.6", 4, "0.4", false, "¿Cuál es menor: 0.6 o 0.4?"), order: 3 },
  { ...measureCompare(9, "0.9", 2, "0.2", true, "¿Cuál es mayor: 0.9 o 0.2?"), order: 4 },
  { ...measureCompare(5, "0.5", 7, "0.7", false, "¿Cuál es menor: 0.5 o 0.7?"), order: 5 },
];

const p4DecimalesFraccionesP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔄", text: "Los decimales y las fracciones son dos formas de escribir lo mismo. 0.5 = 5/10 = 1/2. La barra de décimos ayuda a verlo." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Decimal = fracción!" }), order: 0 },
  { ...decimalBar(5), order: 1 },
  { ...decimalBar(2), order: 2 },
  { ...pieFrac(10, 5, "Colorea 5/10 del pastel (que es 0.5)."), order: 3 },
  { ...decimalBar(8), order: 4 },
  { ...pieFrac(10, 3, "Colorea 3/10 del pastel (que es 0.3)."), order: 5 },
];

const p4RedondearDecimalesP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "📍", text: "Para redondear un decimal al entero más cercano, miramos los décimos: si son 5 o más, subimos; si son menos de 5, bajamos. Ejemplo: 3.7 ≈ 4." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A redondear decimales!" }), order: 0 },
  { ...rounding(37, 10), order: 1 },
  { ...rounding(52, 10), order: 2 },
  { ...decimalBar(6), order: 3 },
  { ...rounding(48, 10), order: 4 },
  { ...decimalBar(4), order: 5 },
];

// ── Unit 6: p4-decimales-operaciones ────────────────────────────────────────────

const p4SumarRestarDecimalesP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "➕", text: "Para sumar o restar decimales, alineamos el punto decimal y operamos como con números normales. ¡El punto siempre en su columna!" }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A calcular decimales!" }), order: 0 },
  { ...decimalBar(3), order: 1 },
  { ...decimalBar(4), order: 2 },
  { ...mentalCalc(30, "+", 40), order: 3 },
  { ...mentalCalc(90, "-", 35), order: 4 },
  { ...mentalCalc(25, "+", 45), order: 5 },
];

const p4MultDivDecimalesP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "✖️", text: "Para multiplicar un decimal por un número entero, multiplicamos como siempre y colocamos el punto decimal contando los lugares. 0.3 × 2 = 0.6." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Decimales por enteros!" }), order: 0 },
  { ...decimalBar(6), order: 1 },
  { ...flashCardMult(3, 2), order: 2 },
  { ...decimalBar(8), order: 3 },
  { ...flashCardMult(4, 2), order: 4 },
  { ...divGroups(8, 2, [4, 3, 5]), order: 5 },
];

// ── Unit 7: p4-area-perimetro ────────────────────────────────────────────────────

const p4AreaPerimetroP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "📐", text: "El área es el espacio dentro de la figura (se mide en unidades cuadradas). El perímetro es la distancia alrededor. ¡Son diferentes!" }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Área y perímetro!" }), order: 0 },
  { ...areaGrid(4, 5, "Cuenta el área del rectángulo 4×5 (toca cada cuadrado)."), order: 1 },
  { ...areaGrid(3, 6, "Cuenta el área del rectángulo 3×6."), order: 2 },
  { ...flashCardMult(2, 9), order: 3 },
  { ...areaGrid(5, 5, "Cuenta el área del cuadrado 5×5."), order: 4 },
  { ...mentalCalc(6, "+", 4), order: 5 },
];

const p4EncontrarDimensionP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔍", text: "Si conoces el área y un lado, puedes encontrar el otro lado dividiendo. Si el área es 12 y un lado es 3, el otro lado es 12 ÷ 3 = 4." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A encontrar el lado!" }), order: 0 },
  { ...divGroups(12, 3, [4, 3, 5]), order: 1 },
  { ...divGroups(20, 4, [5, 4, 6]), order: 2 },
  { ...divGroups(24, 6, [4, 3, 5]), order: 3 },
  { ...areaGrid(4, 4, "Comprueba: un cuadrado de área 16 tiene lados de 4. Cuenta."), order: 4 },
  { ...divGroups(18, 3, [6, 5, 7]), order: 5 },
];

const p4FigurasCompuestasP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🧱", text: "Una figura compuesta se forma con rectángulos y cuadrados. Para su área, la dividimos en partes, calculamos cada una y sumamos." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Figuras compuestas!" }), order: 0 },
  { ...areaGrid(2, 3, "Parte 1: cuenta el área del rectángulo 2×3."), order: 1 },
  { ...areaGrid(2, 2, "Parte 2: cuenta el área del cuadrado 2×2."), order: 2 },
  { ...mentalCalc(6, "+", 4), order: 3 },
  { ...areaGrid(3, 4, "Otra parte: cuenta el área del rectángulo 3×4."), order: 4 },
  { ...mentalCalc(12, "+", 8), order: 5 },
];

// ── Unit 8: p4-geometria ────────────────────────────────────────────────────────

const p4AngulosMedirP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "📐", text: "Los ángulos se miden en grados (°). El ángulo recto mide 90°, el llano 180°. Nombramos ángulos con notación como ∠ABC." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A medir ángulos!" }), order: 0 },
  { ...angleTap([{ degrees: 90, id: 0 }, { degrees: 45, id: 1 }, { degrees: 130, id: 2 }, { degrees: 30, id: 3 }], "right", "Toca el ángulo de 90°, el"), order: 1 },
  { ...angleTap([{ degrees: 40, id: 0 }, { degrees: 90, id: 1 }, { degrees: 120, id: 2 }, { degrees: 60, id: 3 }], "acute", "Toca un ángulo menor a 90°, un"), order: 2 },
  { ...angleTap([{ degrees: 100, id: 0 }, { degrees: 90, id: 1 }, { degrees: 45, id: 2 }, { degrees: 135, id: 3 }], "obtuse", "Toca un ángulo mayor a 90°, un"), order: 3 },
  { ...angleTap([{ degrees: 90, id: 0 }, { degrees: 55, id: 1 }, { degrees: 125, id: 2 }, { degrees: 70, id: 3 }], "right", "Identifica el"), order: 4 },
  { ...angleTap([{ degrees: 35, id: 0 }, { degrees: 90, id: 1 }, { degrees: 150, id: 2 }, { degrees: 80, id: 3 }], "obtuse", "Toca el ángulo más abierto, un"), order: 5 },
];

const p4RectanguloCuadradoP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🟦", text: "El rectángulo tiene 4 ángulos rectos y lados opuestos iguales. El cuadrado es un rectángulo especial: sus 4 lados son iguales." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Rectángulo y cuadrado!" }), order: 0 },
  { ...angleTap([{ degrees: 90, id: 0 }, { degrees: 60, id: 1 }, { degrees: 120, id: 2 }, { degrees: 45, id: 3 }], "right", "Los rectángulos tienen ángulos rectos. Toca el"), order: 1 },
  { ...gridTrace("un rectángulo", [0, 3, 18, 15, 0]), order: 2 },
  { ...gridTrace("un cuadrado", [0, 4, 24, 20, 0]), order: 3 },
  { ...tapAllShapes("square", "cuadrado", [
    { type: "square", color: "#f87171" }, { type: "rectangle", color: "#60a5fa" }, { type: "circle", color: "#4ade80" },
    { type: "square", color: "#fbbf24" }, { type: "triangle", color: "#a78bfa" }, { type: "square", color: "#34d399" },
    { type: "rectangle", color: "#f472b6" }, { type: "square", color: "#fb923c" },
  ]), order: 4 },
  { ...angleTap([{ degrees: 90, id: 0 }, { degrees: 50, id: 1 }, { degrees: 140, id: 2 }, { degrees: 65, id: 3 }], "right", "Identifica el ángulo recto del cuadrado, el"), order: 5 },
];

const p4SimetriaP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🦋", text: "Una figura tiene simetría si una línea la divide en dos mitades que son reflejo exacto una de la otra, como las alas de una mariposa." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A crear simetría!" }), order: 0 },
  { ...symmetryGrid(4, 6, [[0, 2], [1, 1], [1, 2], [2, 2]]), order: 1 },
  { ...symmetryGrid(4, 6, [[0, 1], [0, 2], [1, 2], [2, 1], [2, 2]]), order: 2 },
  { ...symmetryGrid(5, 6, [[0, 2], [1, 2], [2, 1], [2, 2], [3, 2], [4, 2]]), order: 3 },
  { ...symmetryGrid(4, 6, [[0, 0], [1, 1], [2, 2]]), order: 4 },
  { ...symmetryGrid(5, 6, [[0, 2], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]]), order: 5 },
];

const p4RedesSolidosP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "📦", text: "Una red (net) es la plantilla plana que, al doblarse, forma un sólido 3D. Un cubo se forma con 6 cuadrados en forma de cruz." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A doblar redes!" }), order: 0 },
  { ...netMatch("cubo", "🧊", [{ id: 0, type: "cube" }, { id: 1, type: "pyramid" }, { id: 2, type: "cylinder" }, { id: 3, type: "cone" }], "cube"), order: 1 },
  { ...netMatch("cilindro", "🥫", [{ id: 0, type: "cube" }, { id: 1, type: "cylinder" }, { id: 2, type: "pyramid" }, { id: 3, type: "cuboid" }], "cylinder"), order: 2 },
  { ...netMatch("pirámide", "🔺", [{ id: 0, type: "cone" }, { id: 1, type: "cube" }, { id: 2, type: "pyramid" }, { id: 3, type: "cylinder" }], "pyramid"), order: 3 },
  { ...netMatch("cono", "🍦", [{ id: 0, type: "cone" }, { id: 1, type: "cylinder" }, { id: 2, type: "cube" }, { id: 3, type: "pyramid" }], "cone"), order: 4 },
  { ...netMatch("caja (cuboide)", "📦", [{ id: 0, type: "pyramid" }, { id: 1, type: "cuboid" }, { id: 2, type: "cone" }, { id: 3, type: "cylinder" }], "cuboid"), order: 5 },
];

// ── Unit 9: p4-estadistica ──────────────────────────────────────────────────────

const p4TablasDatosP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "📋", text: "Una tabla organiza datos en filas y columnas. Para leerla, buscamos la fila y la columna correctas y vemos dónde se cruzan." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A leer tablas!" }), order: 0 },
  { ...barGraph(
    [{ label: "Lun", value: 4, color: "#60a5fa" }, { label: "Mar", value: 6, color: "#f472b6" }, { label: "Mié", value: 3, color: "#4ade80" }, { label: "Jue", value: 7, color: "#fb923c" }],
    "La tabla muestra libros leídos. ¿Qué día se leyeron más?", "Jue", 1,
  ), order: 1 },
  { ...barGraph(
    [{ label: "Ana", value: 8, color: "#a78bfa" }, { label: "Beto", value: 5, color: "#f59e0b" }, { label: "Cami", value: 6, color: "#34d399" }],
    "¿Quién tiene menos puntos en la tabla?", "Beto", 1,
  ), order: 2 },
  { ...barGraph(
    [{ label: "Rojo", value: 10, color: "#f87171" }, { label: "Azul", value: 20, color: "#60a5fa" }, { label: "Verde", value: 15, color: "#4ade80" }],
    "¿Qué color tiene 20 votos? Toca su barra.", "Azul", 5,
  ), order: 3 },
  { ...lineGraph(
    [{ label: "Ene", value: 2 }, { label: "Feb", value: 5 }, { label: "Mar", value: 4 }, { label: "Abr", value: 8 }],
    "En la tabla de temperatura, ¿qué mes fue el más alto?", "Abr", 2,
  ), order: 4 },
  { ...barGraph(
    [{ label: "Perro", value: 12, color: "#60a5fa" }, { label: "Gato", value: 8, color: "#f472b6" }, { label: "Ave", value: 4, color: "#4ade80" }],
    "¿Qué mascota es la más popular?", "Perro", 2,
  ), order: 5 },
];

const p4GraficosLinealesP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "📈", text: "Un gráfico de líneas muestra cómo cambia algo con el tiempo. La línea sube cuando crece y baja cuando disminuye. ¡Toca el punto correcto!" }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A leer líneas!" }), order: 0 },
  { ...lineGraph(
    [{ label: "Lun", value: 3 }, { label: "Mar", value: 6 }, { label: "Mié", value: 4 }, { label: "Jue", value: 9 }, { label: "Vie", value: 5 }],
    "¿Qué día la línea llegó más alto?", "Jue", 3,
  ), order: 1 },
  { ...lineGraph(
    [{ label: "Ene", value: 8 }, { label: "Feb", value: 5 }, { label: "Mar", value: 3 }, { label: "Abr", value: 6 }],
    "¿Qué mes tuvo el valor más bajo?", "Mar", 2,
  ), order: 2 },
  { ...lineGraph(
    [{ label: "1", value: 2 }, { label: "2", value: 4 }, { label: "3", value: 6 }, { label: "4", value: 8 }],
    "La línea sube siempre. ¿Dónde está el valor más alto?", "4", 2,
  ), order: 3 },
  { ...lineGraph(
    [{ label: "9h", value: 10 }, { label: "12h", value: 25 }, { label: "15h", value: 20 }, { label: "18h", value: 12 }],
    "¿A qué hora hubo más visitantes?", "12h", 5,
  ), order: 4 },
  { ...lineGraph(
    [{ label: "S1", value: 5 }, { label: "S2", value: 7 }, { label: "S3", value: 7 }, { label: "S4", value: 3 }],
    "¿En qué semana bajaron más las ventas?", "S4", 2,
  ), order: 5 },
];

const p4GraficosCircularesP4: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🥧", text: "Un gráfico circular (de pastel) muestra las partes de un todo. Cada porción representa una fracción del total. La porción más grande es la mayor." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A leer el pastel!" }), order: 0 },
  { ...pieChart(
    [{ label: "Fútbol", value: 50, color: "#60a5fa" }, { label: "Vóley", value: 30, color: "#f472b6" }, { label: "Tenis", value: 20, color: "#4ade80" }],
    "¿Qué deporte prefieren más niños? Toca su porción.", "Fútbol",
  ), order: 1 },
  { ...pieChart(
    [{ label: "Rojo", value: 25, color: "#f87171" }, { label: "Azul", value: 25, color: "#60a5fa" }, { label: "Verde", value: 50, color: "#4ade80" }],
    "¿Qué color ocupa la mitad del gráfico?", "Verde",
  ), order: 2 },
  { ...pieChart(
    [{ label: "Perros", value: 40, color: "#a78bfa" }, { label: "Gatos", value: 35, color: "#f59e0b" }, { label: "Peces", value: 25, color: "#34d399" }],
    "¿Qué mascota es la menos elegida?", "Peces",
  ), order: 3 },
  { ...pieChart(
    [{ label: "Mañana", value: 60, color: "#fbbf24" }, { label: "Tarde", value: 40, color: "#8b5cf6" }],
    "¿Cuándo estudia más gente? Toca la porción mayor.", "Mañana",
  ), order: 4 },
  { ...pieChart(
    [{ label: "Pizza", value: 45, color: "#f87171" }, { label: "Tacos", value: 30, color: "#4ade80" }, { label: "Sushi", value: 25, color: "#60a5fa" }],
    "¿Qué comida es la favorita?", "Pizza",
  ), order: 5 },
];

// ═══════════════════════════════════════════════════════════════════════════════
// ║  path: math-primary-5 · 5.º GRADO                                          ║
// ═══════════════════════════════════════════════════════════════════════════════

// ── P5 seed helpers ────────────────────────────────────────────────────────────

// Porcentaje: el niño colorea filas de una cuadrícula de 100 para llegar al %.
function percentGrid(percent: number): ExS {
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `Colorea ${percent}% de la cuadrícula.`,
    payload: { visual: "percent-grid", percent } as Prisma.InputJsonValue,
    solution: { answer: percent },
    hints: [`${percent}% significa ${percent} de cada 100.`, `${percent}% = ${percent}/100.`],
    explanation: `${percent}% = ${percent}/100: coloreas ${percent} de los 100 cuadros.`,
    difficulty: 1,
    xpReward: 8,
  };
}

// Volumen: el niño construye un cuboide con cubos unitarios (l × w × h).
function volumeBuild(length: number, width: number, height: number): ExS {
  const vol = length * width * height;
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `Construye el cuboide de ${length} × ${width} × ${height}. ¿Cuántos cubos?`,
    payload: { visual: "volume-build", length, width, height } as Prisma.InputJsonValue,
    solution: { answer: vol },
    hints: [
      `Cada capa tiene ${length} × ${width} = ${length * width} cubos.`,
      `Volumen = ${length} × ${width} × ${height} = ${vol}.`,
    ],
    explanation: `Volumen = largo × ancho × alto = ${length} × ${width} × ${height} = ${vol} cubos.`,
    difficulty: 2,
    xpReward: 9,
  };
}

// ── Unit 1: p5-numeros-millones ────────────────────────────────────────────────

const primaryFivePreviewExercises: ExerciseSeed[] = [
  {
    kind: ExerciseKind.TEACH,
    order: 0,
    prompt: "",
    payload: {
      teach: {
        beats: [
          { emoji: "🔢", repeat: 1, text: "En 5.º grado exploramos millones, fracciones y decimales avanzados, porcentajes, tasa, volumen y ángulos. ¡El nivel experto!" },
        ],
        tryIt: { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A empezar 5.º grado!" },
      },
    } as Prisma.InputJsonValue,
    solution: {},
    difficulty: 1,
    xpReward: 0,
  },
  { ...percentGrid(30), order: 1 },
  { ...volumeBuild(2, 3, 2), order: 2 },
  { ...compareNums(1250000, 1520000, "¿Cuál símbolo va entre 1,250,000 y 1,520,000?"), order: 3 },
];

const p5LeerEscribirMillones: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔢", text: "Un millón tiene 7 cifras: 1,000,000. Los números grandes se agrupan de 3 en 3 con comas: unidades, miles, millones. ¡Cada grupo se lee por separado!" }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A leer millones!" }), order: 0 },
  { ...compareNums(1000000, 999999, "¿Cuál símbolo va entre 1,000,000 y 999,999?"), order: 1 },
  { ...compareNums(2500000, 2050000, "¿Cuál símbolo va entre 2,500,000 y 2,050,000?"), order: 2 },
  { ...sortNums([1200000, 2100000, 1020000, 2010000], "Ordena de menor a mayor."), order: 3 },
  { ...compareNums(9999999, 10000000, "¿Cuál símbolo va entre 9,999,999 y 10,000,000?"), order: 4 },
  { ...sortNums([500000, 5000000, 50000, 5500000], "Ordena de menor a mayor."), order: 5 },
];

const p5CompararOrdenarP5: ExerciseSeed[] = [
  { ...lumi([{ emoji: "⚖️", text: "Para comparar números de millones, cuenta primero cuántas cifras tiene cada uno. Si tienen las mismas cifras, compara de izquierda a derecha." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A comparar millones!" }), order: 0 },
  { ...compareNums(3400000, 3040000, "¿Cuál símbolo va entre 3,400,000 y 3,040,000?"), order: 1 },
  { ...compareNums(7250000, 7250000, "¿Cuál símbolo va entre 7,250,000 y 7,250,000?"), order: 2 },
  { ...sortNums([4300000, 3400000, 4030000, 3040000], "Ordena de menor a mayor."), order: 3 },
  { ...compareNums(6000000, 5999999, "¿Cuál símbolo va entre 6,000,000 y 5,999,999?"), order: 4 },
  { ...sortNums([1500000, 1050000, 1005000, 1550000], "Ordena de menor a mayor."), order: 5 },
];

// ── Unit 2: p5-operaciones ──────────────────────────────────────────────────────

const p5MultDiv10100: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔟", text: "Multiplicar por 10, 100 o 1000 agrega ceros: 45 × 10 = 450, 45 × 100 = 4500. Dividir hace lo contrario: quita ceros." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Poderes de 10!" }), order: 0 },
  { ...flashCardMult(45, 10), order: 1 },
  { ...flashCardMult(32, 100), order: 2 },
  { ...flashCardMult(7, 1000), order: 3 },
  { ...flashCardMult(60, 10), order: 4 },
  { ...flashCardMult(15, 100), order: 5 },
];

const p5OrdenOperacionesP5: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔢", text: "El orden de operaciones: primero multiplicar y dividir, después sumar y restar. En 2 + 3 × 4, primero 3×4=12, luego 2+12=14." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Orden correcto!" }), order: 0 },
  { ...flashCardMult(3, 4), order: 1 },
  { ...mentalCalc(2, "+", 12), order: 2 },
  { ...flashCardMult(5, 6), order: 3 },
  { ...mentalCalc(30, "-", 12), order: 4 },
  { ...flashCardMult(4, 7), order: 5 },
];

const p5UsoParentesisP5: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔗", text: "Los paréntesis dicen qué hacer primero. En (2 + 3) × 4, primero 2+3=5, luego 5×4=20. ¡Cambian el resultado!" }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Paréntesis primero!" }), order: 0 },
  { ...mentalCalc(2, "+", 3), order: 1 },
  { ...flashCardMult(5, 4), order: 2 },
  { ...mentalCalc(6, "+", 4), order: 3 },
  { ...flashCardMult(10, 3), order: 4 },
  { ...mentalCalc(8, "+", 2), order: 5 },
];

// ── Unit 3: p5-fracciones ──────────────────────────────────────────────────────

const p5FraccionComoDivision: ExerciseSeed[] = [
  { ...lumi([{ emoji: "➗", text: "Una fracción es una división: 3/4 significa 3 ÷ 4. Si repartimos 3 pizzas entre 4 niños, cada uno recibe 3/4 de pizza." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Fracción = división!" }), order: 0 },
  { ...divGroups(12, 4, [3, 2, 4]), order: 1 },
  { ...pieFrac(4, 3, "Colorea 3/4 (que es 3 ÷ 4)."), order: 2 },
  { ...divGroups(10, 5, [2, 1, 3]), order: 3 },
  { ...pieFrac(3, 2, "Colorea 2/3 del pastel."), order: 4 },
  { ...divGroups(15, 3, [5, 4, 6]), order: 5 },
];

const p5FraccionesADecimalesP5: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔄", text: "Una fracción se puede escribir como decimal dividiendo. 1/2 = 0.5, 1/4 = 0.25, 3/10 = 0.3. La barra de décimos ayuda a verlo." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Fracción a decimal!" }), order: 0 },
  { ...decimalBar(5), order: 1 },
  { ...pieFrac(10, 5, "Colorea 5/10 (que es 0.5)."), order: 2 },
  { ...decimalBar(2), order: 3 },
  { ...decimalBar(8), order: 4 },
  { ...pieFrac(10, 4, "Colorea 4/10 (que es 0.4)."), order: 5 },
];

const p5SumarRestarMixtosP5: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🍕", text: "Para sumar números mixtos, sumamos los enteros por un lado y las fracciones por otro. 1 1/4 + 2 2/4 = 3 3/4." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Números mixtos!" }), order: 0 },
  { ...fracTile(1, 2, 4, "+"), order: 1 },
  { ...fracTile(3, 2, 5, "+"), order: 2 },
  { ...fracTile(5, 2, 6, "-"), order: 3 },
  { ...mentalCalc(1, "+", 2), order: 4 },
  { ...fracTile(4, 3, 8, "+"), order: 5 },
];

const p5MultiplicarFraccionesP5: ExerciseSeed[] = [
  { ...lumi([{ emoji: "✖️", text: "Para multiplicar fracciones, multiplicamos numeradores entre sí y denominadores entre sí. 1/2 × 3/4 = (1×3)/(2×4) = 3/8." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Multiplicar fracciones!" }), order: 0 },
  { ...flashCardMult(1, 3), order: 1 },
  { ...flashCardMult(2, 4), order: 2 },
  { ...pieFrac(8, 3, "Colorea 3/8 (resultado de 1/2 × 3/4)."), order: 3 },
  { ...flashCardMult(2, 3), order: 4 },
  { ...flashCardMult(3, 5), order: 5 },
];

// ── Unit 4: p5-decimales ────────────────────────────────────────────────────────

const p5MultDivDecimales10100: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔟", text: "Al multiplicar un decimal por 10, el punto se mueve un lugar a la derecha: 3.5 × 10 = 35. Al dividir por 10, se mueve a la izquierda: 35 ÷ 10 = 3.5." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Mueve el punto!" }), order: 0 },
  { ...flashCardMult(35, 10), order: 1 },
  { ...decimalBar(5), order: 2 },
  { ...flashCardMult(4, 100), order: 3 },
  { ...divGroups(50, 10, [5, 4, 6]), order: 4 },
  { ...decimalBar(3), order: 5 },
];

const p5ConvertirUnidadesDecimal: ExerciseSeed[] = [
  { ...lumi([{ emoji: "📏", text: "Convertir a una unidad mayor usa decimales: 1500 m = 1.5 km, 250 cm = 2.5 m. Dividimos por el factor y usamos el punto decimal." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Unidades decimales!" }), order: 0 },
  { ...unitBlock(2, "2 km", 1000, "m"), order: 1 },
  { ...unitBlock(3, "3 m", 100, "cm"), order: 2 },
  { ...unitBlock(2, "2 kg", 1000, "g"), order: 3 },
  { ...measureCompare(1500, "1.5 km", 1200, "1200 m", true, "¿Cuál es mayor: 1.5 km o 1200 m?"), order: 4 },
  { ...unitBlock(4, "4 L", 1000, "ml"), order: 5 },
];

// ── Unit 5: p5-porcentaje ────────────────────────────────────────────────────────

const p5ExpresarPorcentajeP5: ExerciseSeed[] = [
  { ...lumi([{ emoji: "％", text: "Porcentaje significa 'de cada 100'. 50% es la mitad, 25% es un cuarto. Coloreamos la cuadrícula de 100 para verlo." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A ver porcentajes!" }), order: 0 },
  { ...percentGrid(50), order: 1 },
  { ...percentGrid(30), order: 2 },
  { ...percentGrid(70), order: 3 },
  { ...percentGrid(20), order: 4 },
  { ...percentGrid(90), order: 5 },
];

const p5PorcentajeDeUnNumeroP5: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🧮", text: "Para hallar el porcentaje de un número: 50% es la mitad, 25% es un cuarto, 10% se obtiene dividiendo entre 10. 20% de 50 = 10." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Porcentaje de un número!" }), order: 0 },
  { ...percentGrid(20), order: 1 },
  { ...divGroups(50, 10, [5, 4, 6]), order: 2 },
  { ...divGroups(40, 4, [10, 8, 12]), order: 3 },
  { ...percentGrid(50), order: 4 },
  { ...divGroups(30, 3, [10, 9, 11]), order: 5 },
];

const p5DescuentosInteresP5: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🏷️", text: "Un descuento resta un porcentaje del precio. El IGV suma un porcentaje. El interés es un porcentaje que gana o cuesta el dinero con el tiempo." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Descuentos e interés!" }), order: 0 },
  { ...percentGrid(10), order: 1 },
  { ...moneyCompare(900, 1000, false, "Con 10% de descuento pagas S/9.00 en vez de S/10.00. ¿Cuál es menor?"), order: 2 },
  { ...changeGame(900, 1000, "Un juguete cuesta S/9.00 con descuento. Pagas con S/10.00. ¿Cuánto de cambio?"), order: 3 },
  { ...percentGrid(20), order: 4 },
  { ...moneyCompare(1180, 1000, true, "Con IGV (18%) pagas S/11.80 en vez de S/10.00. ¿Cuál es mayor?"), order: 5 },
];

// ── Unit 6: p5-tasa ──────────────────────────────────────────────────────────────

const p5TasaPorUnidadP5: ExerciseSeed[] = [
  { ...lumi([{ emoji: "⚡", text: "Una tasa compara dos cantidades: km por hora, soles por kilo, palabras por minuto. Si 3 manzanas cuestan S/6, la tasa es S/2 por manzana." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A calcular tasas!" }), order: 0 },
  { ...divGroups(6, 3, [2, 1, 3]), order: 1 },
  { ...divGroups(12, 4, [3, 2, 4]), order: 2 },
  { ...divGroups(20, 5, [4, 3, 5]), order: 3 },
  { ...divGroups(15, 3, [5, 4, 6]), order: 4 },
  { ...divGroups(24, 6, [4, 3, 5]), order: 5 },
];

const p5CalcularTasaTotalP5: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔢", text: "Con la tasa puedes hallar el total (tasa × unidades) o las unidades (total ÷ tasa). Si un auto va a 60 km/h, en 2 horas recorre 120 km." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Tasa, total y unidades!" }), order: 0 },
  { ...flashCardMult(60, 2), order: 1 },
  { ...flashCardMult(5, 4), order: 2 },
  { ...divGroups(30, 6, [5, 4, 6]), order: 3 },
  { ...flashCardMult(8, 3), order: 4 },
  { ...divGroups(40, 8, [5, 4, 6]), order: 5 },
];

// ── Unit 7: p5-area-volumen ──────────────────────────────────────────────────────

const p5AreaTrianguloP5: ExerciseSeed[] = [
  { ...lumi([{ emoji: "📐", text: "El área del triángulo es la mitad del rectángulo que lo contiene: Área = (base × altura) ÷ 2. Si base=6 y altura=4, área = 24 ÷ 2 = 12." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Área del triángulo!" }), order: 0 },
  { ...areaGrid(6, 4, "Primero cuenta el rectángulo 6×4 que contiene al triángulo."), order: 1 },
  { ...divGroups(24, 2, [12, 11, 13]), order: 2 },
  { ...flashCardMult(8, 3), order: 3 },
  { ...divGroups(12, 2, [6, 5, 7]), order: 4 },
  { ...divGroups(20, 2, [10, 9, 11]), order: 5 },
];

const p5FigurasCompuestasP5: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🧩", text: "Una figura compuesta se divide en rectángulos, cuadrados y triángulos. Calculamos el área de cada parte y sumamos todo." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Figuras compuestas!" }), order: 0 },
  { ...areaGrid(3, 4, "Parte 1: cuenta el rectángulo 3×4."), order: 1 },
  { ...areaGrid(2, 2, "Parte 2: cuenta el cuadrado 2×2."), order: 2 },
  { ...mentalCalc(12, "+", 4), order: 3 },
  { ...divGroups(12, 2, [6, 5, 7]), order: 4 },
  { ...mentalCalc(16, "+", 6), order: 5 },
];

const p5VolumenCubosP5: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🧊", text: "El volumen es el espacio que ocupa un sólido, medido en cubos unitarios (cm³). Contamos los cubos que caben dentro." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A contar cubos!" }), order: 0 },
  { ...volumeBuild(2, 2, 2), order: 1 },
  { ...volumeBuild(3, 2, 2), order: 2 },
  { ...volumeBuild(2, 3, 2), order: 3 },
  { ...volumeBuild(3, 3, 2), order: 4 },
  { ...volumeBuild(2, 2, 3), order: 5 },
];

const p5VolumenCuboideP5: ExerciseSeed[] = [
  { ...lumi([{ emoji: "📦", text: "El volumen del cubo y del cuboide = largo × ancho × alto. Un cuboide de 4×3×2 tiene un volumen de 24 cm³." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Volumen = l×a×h!" }), order: 0 },
  { ...volumeBuild(3, 2, 2), order: 1 },
  { ...flashCardMult(6, 2), order: 2 },
  { ...volumeBuild(2, 2, 3), order: 3 },
  { ...flashCardMult(4, 6), order: 4 },
  { ...volumeBuild(4, 2, 2), order: 5 },
];

// ── Unit 8: p5-geometria ─────────────────────────────────────────────────────────

const p5AngulosRectaPuntoP5: ExerciseSeed[] = [
  { ...lumi([{ emoji: "📐", text: "Los ángulos en una recta suman 180°. Los ángulos alrededor de un punto suman 360°. Con eso puedes hallar ángulos desconocidos." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Ángulos en recta!" }), order: 0 },
  { ...angleTap([{ degrees: 90, id: 0 }, { degrees: 45, id: 1 }, { degrees: 130, id: 2 }, { degrees: 60, id: 3 }], "right", "Toca el ángulo de 90°, el"), order: 1 },
  { ...mentalCalc(180, "-", 60), order: 2 },
  { ...angleTap([{ degrees: 120, id: 0 }, { degrees: 90, id: 1 }, { degrees: 45, id: 2 }, { degrees: 70, id: 3 }], "obtuse", "En la recta falta un ángulo abierto. Toca un"), order: 3 },
  { ...mentalCalc(360, "-", 90), order: 4 },
  { ...mentalCalc(180, "-", 125), order: 5 },
];

const p5AngulosOpuestosP5: ExerciseSeed[] = [
  { ...lumi([{ emoji: "❌", text: "Cuando dos rectas se cruzan, los ángulos opuestos por el vértice son iguales. Si uno mide 70°, el opuesto también mide 70°." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Ángulos opuestos!" }), order: 0 },
  { ...angleTap([{ degrees: 70, id: 0 }, { degrees: 90, id: 1 }, { degrees: 120, id: 2 }, { degrees: 40, id: 3 }], "acute", "Toca un ángulo menor a 90°, un"), order: 1 },
  { ...mentalCalc(180, "-", 70), order: 2 },
  { ...angleTap([{ degrees: 110, id: 0 }, { degrees: 90, id: 1 }, { degrees: 55, id: 2 }, { degrees: 45, id: 3 }], "obtuse", "El ángulo opuesto es igual. Toca un"), order: 3 },
  { ...mentalCalc(180, "-", 110), order: 4 },
  { ...angleTap([{ degrees: 90, id: 0 }, { degrees: 35, id: 1 }, { degrees: 130, id: 2 }, { degrees: 65, id: 3 }], "right", "Toca el ángulo recto, el"), order: 5 },
];

const p5TriangulosPropiedadesP5: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔺", text: "Los ángulos de un triángulo suman 180°. El equilátero tiene 3 lados y 3 ángulos iguales (60° cada uno); el isósceles tiene 2 lados iguales; el rectángulo tiene un ángulo de 90°." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Triángulos!" }), order: 0 },
  { ...angleTap([{ degrees: 90, id: 0 }, { degrees: 45, id: 1 }, { degrees: 120, id: 2 }, { degrees: 60, id: 3 }], "right", "El triángulo rectángulo tiene un ángulo de 90°. Toca el"), order: 1 },
  { ...tapAllShapes("triangle", "triángulo", [
    { type: "triangle", color: "#f87171" }, { type: "circle", color: "#60a5fa" }, { type: "square", color: "#4ade80" },
    { type: "triangle", color: "#fbbf24" }, { type: "rectangle", color: "#a78bfa" }, { type: "triangle", color: "#34d399" },
    { type: "circle", color: "#f472b6" }, { type: "square", color: "#fb923c" },
  ]), order: 2 },
  { ...mentalCalc(180, "-", 90), order: 3 },
  { ...gridTrace("un triángulo", [2, 20, 24, 2]), order: 4 },
  { ...mentalCalc(180, "-", 120), order: 5 },
];

const p5CuadrilaterosP5: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔷", text: "El paralelogramo tiene lados opuestos paralelos e iguales. El rombo tiene 4 lados iguales. El trapecio tiene solo un par de lados paralelos. Sus ángulos suman 360°." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Cuadriláteros!" }), order: 0 },
  { ...angleTap([{ degrees: 90, id: 0 }, { degrees: 60, id: 1 }, { degrees: 120, id: 2 }, { degrees: 45, id: 3 }], "right", "El rectángulo es un paralelogramo con ángulos rectos. Toca el"), order: 1 },
  { ...gridTrace("un rectángulo", [0, 3, 18, 15, 0]), order: 2 },
  { ...mentalCalc(360, "-", 90), order: 3 },
  { ...tapAllShapes("square", "cuadrado", [
    { type: "square", color: "#f87171" }, { type: "rectangle", color: "#60a5fa" }, { type: "circle", color: "#4ade80" },
    { type: "square", color: "#fbbf24" }, { type: "triangle", color: "#a78bfa" }, { type: "square", color: "#34d399" },
    { type: "rectangle", color: "#f472b6" }, { type: "circle", color: "#fb923c" },
  ]), order: 4 },
  { ...mentalCalc(360, "-", 180), order: 5 },
];

// ═══════════════════════════════════════════════════════════════════════════════
// ║  path: math-primary-6 · 6.º GRADO                                          ║
// ═══════════════════════════════════════════════════════════════════════════════

// ── P6 seed helpers ────────────────────────────────────────────────────────────

// Razón: el niño llena canastas para construir la razón indicada (2 o 3 grupos).
function ratioBuild(groups: { label: string; target: number; emoji: string }[]): ExS {
  const ratioLabel = groups.map((g) => g.target).join(":");
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `Construye la razón ${ratioLabel}.`,
    payload: { visual: "ratio-build", groups } as Prisma.InputJsonValue,
    solution: { answer: 1 },
    hints: [
      "Una razón compara cantidades. Llena cada canasta hasta su número.",
      `La razón es ${ratioLabel}.`,
    ],
    explanation: `La razón ${groups.map((g) => `${g.target} ${g.label}`).join(" a ")} se escribe ${ratioLabel}.`,
    difficulty: 2,
    xpReward: 9,
  };
}

// Álgebra: el niño equilibra la balanza para resolver x + b = c.
function algebraScale(known: number, total: number): ExS {
  const answer = total - known;
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `Resuelve: x + ${known} = ${total}`,
    payload: { visual: "algebra-scale", known, total } as Prisma.InputJsonValue,
    solution: { answer },
    hints: [
      "Equilibra la balanza: agrega peras a la caja x hasta que los dos lados pesen igual.",
      `x = ${total} − ${known} = ${answer}.`,
    ],
    explanation: `x + ${known} = ${total}, entonces x = ${total} − ${known} = ${answer}.`,
    difficulty: 2,
    xpReward: 9,
  };
}

// Círculo: el niño toca la parte pedida (centro, radio, diámetro, circunferencia).
function circleParts(targetPart: "center" | "radius" | "diameter" | "circumference"): ExS {
  const names = {
    center: "el centro",
    radius: "el radio",
    diameter: "el diámetro",
    circumference: "la circunferencia",
  };
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: `Toca ${names[targetPart]} del círculo.`,
    payload: { visual: "circle-parts", targetPart } as Prisma.InputJsonValue,
    solution: { answer: 1 },
    hints: [
      "El radio va del centro al borde; el diámetro cruza todo el círculo pasando por el centro.",
      `Busca ${names[targetPart]}.`,
    ],
    explanation:
      targetPart === "radius"
        ? "El radio es la distancia del centro al borde."
        : targetPart === "diameter"
        ? "El diámetro cruza el círculo por el centro y mide el doble del radio."
        : targetPart === "center"
        ? "El centro es el punto en el medio del círculo."
        : "La circunferencia es el borde del círculo.",
    difficulty: 1,
    xpReward: 8,
  };
}

// Promedio: el niño empareja las torres para hallar el promedio.
function averageLevel(values: number[], labels?: string[]): ExS {
  const sum = values.reduce((a, b) => a + b, 0);
  const avg = Math.round(sum / values.length);
  return {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    prompt: "Empareja las torres para hallar el promedio.",
    payload: { visual: "average-level", values, labels } as Prisma.InputJsonValue,
    solution: { answer: avg },
    hints: [
      "El promedio reparte el total en partes iguales entre todas las torres.",
      `Promedio = ${sum} ÷ ${values.length} = ${avg}.`,
    ],
    explanation: `Promedio = total ÷ cantidad = ${sum} ÷ ${values.length} = ${avg}.`,
    difficulty: 2,
    xpReward: 9,
  };
}

// ── Unit 1: p6-fracciones ──────────────────────────────────────────────────────

const primarySixPreviewExercises: ExerciseSeed[] = [
  {
    kind: ExerciseKind.TEACH,
    order: 0,
    prompt: "",
    payload: {
      teach: {
        beats: [
          { emoji: "🎓", repeat: 1, text: "¡6.º grado, el nivel maestro! Aquí dominamos razones, álgebra, círculos, volumen y promedios. ¡A jugar y aprender!" },
        ],
        tryIt: { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A empezar 6.º grado!" },
      },
    } as Prisma.InputJsonValue,
    solution: {},
    difficulty: 1,
    xpReward: 0,
  },
  { ...ratioBuild([{ label: "azules", target: 2, emoji: "🔵" }, { label: "rojas", target: 3, emoji: "🔴" }]), order: 1 },
  { ...algebraScale(3, 7), order: 2 },
  { ...averageLevel([2, 4, 6], ["A", "B", "C"]), order: 3 },
];

const p6DividirFraccionEntero: ExerciseSeed[] = [
  { ...lumi([{ emoji: "➗", text: "Dividir una fracción entre un entero reparte esa fracción en partes iguales. 1/2 ÷ 3 = 1/6: medio pastel repartido entre 3." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A dividir fracciones!" }), order: 0 },
  { ...pieFrac(6, 1, "1/2 ÷ 3 = 1/6. Colorea 1/6 del pastel."), order: 1 },
  { ...divGroups(6, 3, [2, 1, 3]), order: 2 },
  { ...pieFrac(8, 2, "1/4 ÷ 2 = 2/8. Colorea 2/8."), order: 3 },
  { ...divGroups(12, 4, [3, 2, 4]), order: 4 },
  { ...pieFrac(9, 1, "1/3 ÷ 3 = 1/9. Colorea 1/9."), order: 5 },
];

const p6DividirEntreFraccion: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔄", text: "Dividir entre una fracción es multiplicar por su inverso. 2 ÷ 1/3 = 2 × 3 = 6: en 2 enteros caben 6 tercios." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Dividir entre fracción!" }), order: 0 },
  { ...flashCardMult(2, 3), order: 1 },
  { ...pieFrac(3, 1, "En 1 entero caben 3 tercios. Colorea 1/3."), order: 2 },
  { ...flashCardMult(4, 2), order: 3 },
  { ...divGroups(6, 2, [3, 2, 4]), order: 4 },
  { ...flashCardMult(3, 4), order: 5 },
];

// ── Unit 2: p6-porcentaje ──────────────────────────────────────────────────────

const p6HallarElTodoP6: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔍", text: "Si conoces una parte y su porcentaje, puedes hallar el todo. Si 25% es 10, entonces el 100% es 10 × 4 = 40." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A hallar el todo!" }), order: 0 },
  { ...percentGrid(25), order: 1 },
  { ...flashCardMult(10, 4), order: 2 },
  { ...percentGrid(50), order: 3 },
  { ...flashCardMult(15, 2), order: 4 },
  { ...flashCardMult(8, 5), order: 5 },
];

const p6AumentoDescuentoP6: ExerciseSeed[] = [
  { ...lumi([{ emoji: "📈", text: "Un aumento suma un porcentaje al valor; un descuento lo resta. Un 10% de aumento sobre 100 da 110; un 10% de descuento da 90." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Aumento y descuento!" }), order: 0 },
  { ...percentGrid(10), order: 1 },
  { ...mentalCalc(100, "+", 10), order: 2 },
  { ...mentalCalc(100, "-", 20), order: 3 },
  { ...percentGrid(20), order: 4 },
  { ...moneyCompare(1100, 1000, true, "Con 10% de aumento pagas S/11.00 en vez de S/10.00. ¿Cuál es mayor?"), order: 5 },
];

// ── Unit 3: p6-razones ─────────────────────────────────────────────────────────

const p6NotacionRazonesP6: ExerciseSeed[] = [
  { ...lumi([{ emoji: "⚖️", text: "Una razón compara cantidades con dos puntos: 2:3 significa '2 por cada 3'. Puede tener tres términos, como 1:2:3." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A leer razones!" }), order: 0 },
  { ...ratioBuild([{ label: "azules", target: 2, emoji: "🔵" }, { label: "rojas", target: 3, emoji: "🔴" }]), order: 1 },
  { ...ratioBuild([{ label: "manzanas", target: 3, emoji: "🍎" }, { label: "peras", target: 2, emoji: "🍐" }]), order: 2 },
  { ...ratioBuild([{ label: "rojas", target: 1, emoji: "🔴" }, { label: "verdes", target: 2, emoji: "🟢" }, { label: "azules", target: 3, emoji: "🔵" }]), order: 3 },
  { ...ratioBuild([{ label: "gatos", target: 4, emoji: "🐱" }, { label: "perros", target: 2, emoji: "🐶" }]), order: 4 },
  { ...ratioBuild([{ label: "estrellas", target: 3, emoji: "⭐" }, { label: "lunas", target: 3, emoji: "🌙" }]), order: 5 },
];

const p6RazonesEquivalentesP6: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🟰", text: "Las razones equivalentes representan la misma proporción. 1:2 = 2:4 = 3:6. Multiplicamos ambos términos por el mismo número." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Razones equivalentes!" }), order: 0 },
  { ...ratioBuild([{ label: "azules", target: 1, emoji: "🔵" }, { label: "rojas", target: 2, emoji: "🔴" }]), order: 1 },
  { ...ratioBuild([{ label: "azules", target: 2, emoji: "🔵" }, { label: "rojas", target: 4, emoji: "🔴" }]), order: 2 },
  { ...flashCardMult(2, 3), order: 3 },
  { ...ratioBuild([{ label: "verdes", target: 3, emoji: "🟢" }, { label: "amarillas", target: 6, emoji: "🟡" }]), order: 4 },
  { ...flashCardMult(4, 2), order: 5 },
];

const p6RepartirEnRazonP6: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🍰", text: "Para repartir una cantidad en una razón, sumamos los términos y dividimos. Repartir 10 en 2:3 son 5 partes: 4 y 6." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A repartir en razón!" }), order: 0 },
  { ...divGroups(10, 5, [2, 1, 3]), order: 1 },
  { ...ratioBuild([{ label: "para Ana", target: 4, emoji: "🍬" }, { label: "para Beto", target: 6, emoji: "🍬" }]), order: 2 },
  { ...divGroups(12, 4, [3, 2, 4]), order: 3 },
  { ...flashCardMult(2, 4), order: 4 },
  { ...flashCardMult(3, 4), order: 5 },
];

const p6RazonYFraccionP6: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔗", text: "La razón se relaciona con la fracción. Si hay 2 azules y 3 rojas, la razón es 2:3 y las azules son 2/5 del total." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Razón y fracción!" }), order: 0 },
  { ...ratioBuild([{ label: "azules", target: 2, emoji: "🔵" }, { label: "rojas", target: 3, emoji: "🔴" }]), order: 1 },
  { ...fruitFrac(5, 2, "🔵", "🔴", "¿Qué fracción del total son las 🔵?"), order: 2 },
  { ...ratioBuild([{ label: "niños", target: 3, emoji: "👦" }, { label: "niñas", target: 4, emoji: "👧" }]), order: 3 },
  { ...fruitFrac(7, 3, "👦", "👧", "¿Qué fracción del grupo son los 👦?"), order: 4 },
  { ...pieFrac(5, 2, "Colorea 2/5 del pastel (la razón 2:3)."), order: 5 },
];

// ── Unit 4: p6-algebra ─────────────────────────────────────────────────────────

const p6LetrasIncognitasP6: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔤", text: "En álgebra, una letra representa un número desconocido. 'a + 3' significa 'un número más 3'. '3a' significa 'a × 3'." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Letras como números!" }), order: 0 },
  { ...algebraScale(3, 8), order: 1 },
  { ...algebraScale(5, 9), order: 2 },
  { ...algebraScale(2, 6), order: 3 },
  { ...algebraScale(4, 10), order: 4 },
  { ...algebraScale(6, 11), order: 5 },
];

const p6EvaluarExpresionesP6: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🧮", text: "Evaluar una expresión es reemplazar la letra por su valor. Si a = 5, entonces a + 3 = 8 y 3a = 15." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A evaluar!" }), order: 0 },
  { ...mentalCalc(5, "+", 3), order: 1 },
  { ...flashCardMult(3, 5), order: 2 },
  { ...mentalCalc(7, "+", 4), order: 3 },
  { ...flashCardMult(4, 6), order: 4 },
  { ...divGroups(12, 3, [4, 3, 5]), order: 5 },
];

const p6EcuacionesSimplesP6: ExerciseSeed[] = [
  { ...lumi([{ emoji: "⚖️", text: "Una ecuación es como una balanza: los dos lados son iguales. Para resolver x + 4 = 9, quitamos 4 de ambos lados: x = 5." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A resolver ecuaciones!" }), order: 0 },
  { ...algebraScale(4, 9), order: 1 },
  { ...algebraScale(7, 12), order: 2 },
  { ...algebraScale(3, 10), order: 3 },
  { ...algebraScale(8, 15), order: 4 },
  { ...algebraScale(5, 13), order: 5 },
];

// ── Unit 5: p6-circulo ─────────────────────────────────────────────────────────

const p6PartesDelCirculoP6: ExerciseSeed[] = [
  { ...lumi([{ emoji: "⭕", text: "El círculo tiene: centro (el punto medio), radio (del centro al borde), diámetro (cruza por el centro, el doble del radio) y circunferencia (el borde)." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Partes del círculo!" }), order: 0 },
  { ...circleParts("center"), order: 1 },
  { ...circleParts("radius"), order: 2 },
  { ...circleParts("diameter"), order: 3 },
  { ...circleParts("circumference"), order: 4 },
  { ...circleParts("radius"), order: 5 },
];

const p6CircunferenciaAreaP6: ExerciseSeed[] = [
  { ...lumi([{ emoji: "📏", text: "La circunferencia = π × diámetro (π ≈ 3.14). El área = π × radio × radio. Primero calculamos radio × radio." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Circunferencia y área!" }), order: 0 },
  { ...circleParts("radius"), order: 1 },
  { ...flashCardMult(5, 5), order: 2 },
  { ...circleParts("diameter"), order: 3 },
  { ...flashCardMult(7, 7), order: 4 },
  { ...flashCardMult(4, 4), order: 5 },
];

const p6FigurasConCirculosP6: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🌗", text: "Un semicírculo es medio círculo; un cuarto de círculo es la cuarta parte. Su área es la del círculo dividida entre 2 o entre 4." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Semicírculos!" }), order: 0 },
  { ...circleParts("circumference"), order: 1 },
  { ...divGroups(12, 2, [6, 5, 7]), order: 2 },
  { ...divGroups(16, 4, [4, 3, 5]), order: 3 },
  { ...pieFrac(2, 1, "Colorea 1/2 del pastel (un semicírculo)."), order: 4 },
  { ...pieFrac(4, 1, "Colorea 1/4 del pastel (un cuarto de círculo)."), order: 5 },
];

// ── Unit 6: p6-volumen ─────────────────────────────────────────────────────────

const p6HallarDimensionP6: ExerciseSeed[] = [
  { ...lumi([{ emoji: "📦", text: "Si conoces el volumen y dos dimensiones, hallas la tercera dividiendo. Si V = 24 y la base es 4×3=12, la altura es 24 ÷ 12 = 2." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A hallar dimensiones!" }), order: 0 },
  { ...volumeBuild(4, 3, 2), order: 1 },
  { ...divGroups(24, 12, [2, 1, 3]), order: 2 },
  { ...divGroups(18, 6, [3, 2, 4]), order: 3 },
  { ...flashCardMult(4, 3), order: 4 },
  { ...divGroups(20, 4, [5, 4, 6]), order: 5 },
];

const p6RaicesCuboP6: ExerciseSeed[] = [
  { ...lumi([{ emoji: "√", text: "La raíz cuadrada halla el lado de un cuadrado: √16 = 4 porque 4×4=16. La raíz cúbica halla la arista de un cubo: ∛27 = 3 porque 3×3×3=27." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Raíces!" }), order: 0 },
  { ...flashCardMult(4, 4), order: 1 },
  { ...volumeBuild(3, 3, 3), order: 2 },
  { ...flashCardMult(5, 5), order: 3 },
  { ...volumeBuild(2, 2, 2), order: 4 },
  { ...flashCardMult(6, 6), order: 5 },
];

// ── Unit 7: p6-geometria ───────────────────────────────────────────────────────

const p6AngulosCuadrilaterosP6: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔷", text: "Los ángulos de un cuadrilátero suman 360°. Con eso, y sabiendo que un paralelogramo tiene ángulos opuestos iguales, hallamos ángulos desconocidos." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Ángulos en cuadriláteros!" }), order: 0 },
  { ...angleTap([{ degrees: 90, id: 0 }, { degrees: 60, id: 1 }, { degrees: 120, id: 2 }, { degrees: 45, id: 3 }], "right", "Toca el ángulo recto, el"), order: 1 },
  { ...mentalCalc(360, "-", 90), order: 2 },
  { ...mentalCalc(180, "-", 70), order: 3 },
  { ...angleTap([{ degrees: 110, id: 0 }, { degrees: 90, id: 1 }, { degrees: 55, id: 2 }, { degrees: 40, id: 3 }], "obtuse", "Toca un ángulo mayor a 90°, un"), order: 4 },
  { ...mentalCalc(360, "-", 240), order: 5 },
];

const p6AngulosCompuestosP6: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🧩", text: "En figuras compuestas combinamos reglas: ángulos en recta (180°), en un punto (360°), de triángulo (180°) y de cuadrilátero (360°)." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡Ángulos compuestos!" }), order: 0 },
  { ...angleTap([{ degrees: 90, id: 0 }, { degrees: 45, id: 1 }, { degrees: 130, id: 2 }, { degrees: 65, id: 3 }], "right", "Toca el ángulo recto, el"), order: 1 },
  { ...mentalCalc(180, "-", 55), order: 2 },
  { ...mentalCalc(360, "-", 145), order: 3 },
  { ...angleTap([{ degrees: 35, id: 0 }, { degrees: 90, id: 1 }, { degrees: 120, id: 2 }, { degrees: 70, id: 3 }], "acute", "Toca un ángulo menor a 90°, un"), order: 4 },
  { ...mentalCalc(180, "-", 90), order: 5 },
];

// ── Unit 8: p6-estadistica ─────────────────────────────────────────────────────

const p6PromedioP6: ExerciseSeed[] = [
  { ...lumi([{ emoji: "📊", text: "El promedio (media) reparte el total en partes iguales: promedio = total ÷ cantidad de datos. Emparejar las torres muestra el promedio." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A hallar promedios!" }), order: 0 },
  { ...averageLevel([2, 4, 6], ["A", "B", "C"]), order: 1 },
  { ...averageLevel([1, 3, 5], ["L", "M", "X"]), order: 2 },
  { ...averageLevel([3, 5, 4], ["A", "B", "C"]), order: 3 },
  { ...averageLevel([2, 4, 4, 6], ["1", "2", "3", "4"]), order: 4 },
  { ...averageLevel([6, 2, 4], ["X", "Y", "Z"]), order: 5 },
];

const p6UsarElPromedioP6: ExerciseSeed[] = [
  { ...lumi([{ emoji: "🔢", text: "Con el promedio puedes hallar el total (promedio × cantidad) o un dato que falta. Si el promedio de 3 datos es 5, el total es 15." }], { emoji: "⭐", count: 5, text: "Toca cinco estrellas.", successText: "¡A usar el promedio!" }), order: 0 },
  { ...averageLevel([4, 5, 6], ["A", "B", "C"]), order: 1 },
  { ...flashCardMult(5, 3), order: 2 },
  { ...averageLevel([3, 3, 6], ["X", "Y", "Z"]), order: 3 },
  { ...flashCardMult(4, 4), order: 4 },
  { ...mentalCalc(15, "-", 10), order: 5 },
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
    solution: {
      pairs: [
        [0, 2],
        [1, 0],
        [2, 1],
      ],
    },
    hints: ["Busca la misma letra.", "Toca una tarjeta y después su pareja."],
    explanation: "Cada vocal encontró otra igual.",
    difficulty: 1,
    xpReward: 6,
  },
  {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    order: 2,
    prompt: "Toca la letra A.",
    payload: {
      visual: "letter",
      letter: "A",
      options: ["A", "E", "I", "O"],
    } as Prisma.InputJsonValue,
    solution: { answer: "A" },
    hints: [
      "Busca la tarjeta que tiene la A.",
      "Mira su forma antes de tocar.",
    ],
    explanation:
      "Esa es la letra A. Primero la reconocemos, después la trazamos.",
    difficulty: 1,
    xpReward: 5,
  },
  {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    order: 3,
    prompt: "¿Con qué letra empieza abeja?",
    payload: {
      visual: "emoji-word",
      emoji: "🐝",
      label: "abeja",
      options: ["A", "E", "I", "O"],
    } as Prisma.InputJsonValue,
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
    hints: [
      "Sigue la guía despacito.",
      "Puedes levantar el dedo si la letra tiene más de un trazo.",
    ],
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
    payload: {
      visual: "letter",
      letter: "A",
      options: ["A", "E", "I", "O"],
    } as Prisma.InputJsonValue,
    solution: { answer: "A" },
    hints: [
      "Busca la tarjeta que tiene la A.",
      "Mira su forma antes de tocar.",
    ],
    explanation:
      "Esa es la letra A. Primero la reconocemos, después la trazamos.",
    difficulty: 1,
    xpReward: 5,
  },
  {
    kind: ExerciseKind.MULTIPLE_CHOICE,
    order: 2,
    prompt: "¿Con qué letra empieza abeja?",
    payload: {
      visual: "emoji-word",
      emoji: "🐝",
      label: "abeja",
      options: ["A", "E", "I", "O"],
    } as Prisma.InputJsonValue,
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
    hints: [
      "Sigue la guía despacito.",
      "Puedes levantar el dedo si la letra tiene más de un trazo.",
    ],
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
  // ── 1.º grado — p1-numeros-hasta-20 ──────────────────────────────────────
  { unitSlug: "p1-numeros-hasta-20",    lessonSlug: "leer-numeros-20",           exercises: p1LeerNumeros20 },
  { unitSlug: "p1-numeros-hasta-20",    lessonSlug: "comparar-hasta-20",         exercises: p1CompararHasta20 },
  { unitSlug: "p1-numeros-hasta-20",    lessonSlug: "ordinales-primero-decimo",  exercises: p1OrdinalesPrimeroDecimo },
  // ── 1.º grado — p1-decenas-unidades ──────────────────────────────────────
  { unitSlug: "p1-decenas-unidades",    lessonSlug: "hacer-una-decena",          exercises: p1HacerUnaDecena },
  { unitSlug: "p1-decenas-unidades",    lessonSlug: "valor-posicional",          exercises: p1ValorPosicionalP1 },
  { unitSlug: "p1-decenas-unidades",    lessonSlug: "ordenar-hasta-100",         exercises: p1OrdenarHasta100 },
  { unitSlug: "p1-decenas-unidades",    lessonSlug: "patrones-numericos",        exercises: p1PatronesNumericos },
  // ── 1.º grado — p1-sumas-restas ──────────────────────────────────────────
  { unitSlug: "p1-sumas-restas",        lessonSlug: "sumar-hasta-20",            exercises: p1SumarHasta20 },
  { unitSlug: "p1-sumas-restas",        lessonSlug: "restar-hasta-20",           exercises: p1RestarHasta20 },
  { unitSlug: "p1-sumas-restas",        lessonSlug: "sumar-restar-hasta-100",    exercises: p1SumarRestarHasta100 },
  { unitSlug: "p1-sumas-restas",        lessonSlug: "familias-de-hechos",        exercises: p1FamiliasDeHechos },
  // ── 1.º grado — p1-grupos-iguales ────────────────────────────────────────
  { unitSlug: "p1-grupos-iguales",      lessonSlug: "contar-grupos-iguales",     exercises: p1ContarGruposIguales },
  { unitSlug: "p1-grupos-iguales",      lessonSlug: "arreglos-y-filas",          exercises: p1ArreglosYFilas },
  { unitSlug: "p1-grupos-iguales",      lessonSlug: "repartir-en-partes-iguales",exercises: p1RepartirPartes },
  // ── 1.º grado — p1-medicion-tiempo-dinero ────────────────────────────────
  { unitSlug: "p1-medicion-tiempo-dinero", lessonSlug: "contar-dinero",          exercises: p1ContarDinero },
  { unitSlug: "p1-medicion-tiempo-dinero", lessonSlug: "comparar-longitudes",    exercises: p1CompararLongitudes },
  { unitSlug: "p1-medicion-tiempo-dinero", lessonSlug: "leer-horas",             exercises: p1LeerHoras },
  // ── 1.º grado — p1-formas-y-datos ────────────────────────────────────────
  { unitSlug: "p1-formas-y-datos",      lessonSlug: "formas-2d",                 exercises: p1Formas2D },
  { unitSlug: "p1-formas-y-datos",      lessonSlug: "crear-figuras",             exercises: p1CrearFiguras },
  { unitSlug: "p1-formas-y-datos",      lessonSlug: "leer-pictogramas",          exercises: p1LeerPictogramas },
  { unitSlug: "p1-formas-y-datos",      lessonSlug: "repaso-primer-grado-1",     exercises: p1RepasoP1 },
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
  {
    unitSlug: "p2-suma-resta",
    lessonSlug: "algoritmo-3-digitos",
    exercises: p2Algoritmo3Digitos,
  },
  {
    unitSlug: "p2-suma-resta",
    lessonSlug: "calculo-mental-sr",
    exercises: p2CalculoMentalSR,
  },
  // ── Unit 3: Multiplicación ────────────────────────────────────────────────
  {
    unitSlug: "p2-multiplicacion",
    lessonSlug: "grupos-iguales-mult",
    exercises: p2GruposIgualesMult,
  },
  {
    unitSlug: "p2-multiplicacion",
    lessonSlug: "tablas-2-5-10",
    exercises: p2Tablas2510,
  },
  {
    unitSlug: "p2-multiplicacion",
    lessonSlug: "tablas-3-4",
    exercises: p2Tablas34,
  },
  {
    unitSlug: "p2-multiplicacion",
    lessonSlug: "arreglos-filas-columnas",
    exercises: p2ArreglosFilasColumnas,
  },
  {
    unitSlug: "p2-multiplicacion",
    lessonSlug: "calculo-mental-mult",
    exercises: p2CalculoMentalMult,
  },
  // ── Unit 4: División ──────────────────────────────────────────────────────
  {
    unitSlug: "p2-division",
    lessonSlug: "repartir-grupos-iguales",
    exercises: p2RepartirGruposIguales,
  },
  {
    unitSlug: "p2-division",
    lessonSlug: "mult-y-div-juntas",
    exercises: p2MultYDivJuntas,
  },
  {
    unitSlug: "p2-division",
    lessonSlug: "calculo-mental-div",
    exercises: p2CalculoMentalDiv,
  },
  // ── Unit 5: Fracciones ────────────────────────────────────────────────────
  {
    unitSlug: "p2-fracciones",
    lessonSlug: "parte-de-un-entero",
    exercises: p2ParteDeUnEntero,
  },
  {
    unitSlug: "p2-fracciones",
    lessonSlug: "notacion-fracciones",
    exercises: p2NotacionFracciones,
  },
  {
    unitSlug: "p2-fracciones",
    lessonSlug: "comparar-fracciones",
    exercises: p2CompararFracciones,
  },
  {
    unitSlug: "p2-fracciones",
    lessonSlug: "sumar-restar-fracciones",
    exercises: p2SumarRestarFracciones,
  },
  // ── Unit 6: Dinero ────────────────────────────────────────────────────────
  {
    unitSlug: "p2-dinero",
    lessonSlug: "contar-soles-centimos",
    exercises: p2ContarSolesCentimos,
  },
  {
    unitSlug: "p2-dinero",
    lessonSlug: "leer-precios",
    exercises: p2LeerPrecios,
  },
  {
    unitSlug: "p2-dinero",
    lessonSlug: "comparar-montos",
    exercises: p2CompararMontos,
  },
  {
    unitSlug: "p2-dinero",
    lessonSlug: "convertir-soles",
    exercises: p2ConvertirSoles,
  },
  // ── Unit 7: Medición ──────────────────────────────────────────────────────
  {
    unitSlug: "p2-medicion",
    lessonSlug: "longitud-masa-volumen",
    exercises: p2LongitudMasaVolumen,
  },
  {
    unitSlug: "p2-medicion",
    lessonSlug: "unidades-m-kg-l",
    exercises: p2UnidadesMKgL,
  },
  {
    unitSlug: "p2-medicion",
    lessonSlug: "comparar-medidas",
    exercises: p2CompararMedidas,
  },
  // ── Unit 8: El tiempo ─────────────────────────────────────────────────────
  {
    unitSlug: "p2-el-tiempo",
    lessonSlug: "hora-al-minuto",
    exercises: p2HoraAlMinuto,
  },
  {
    unitSlug: "p2-el-tiempo",
    lessonSlug: "horas-y-minutos",
    exercises: p2HorasYMinutos,
  },
  {
    unitSlug: "p2-el-tiempo",
    lessonSlug: "convertir-horas-minutos",
    exercises: p2ConvertirHorasMinutos,
  },
  // ── Unit 9: Formas 2D y 3D ───────────────────────────────────────────────
  { unitSlug: "p2-formas", lessonSlug: "patrones-2d",         exercises: p2Patrones2D },
  { unitSlug: "p2-formas", lessonSlug: "solidos-3d",          exercises: p2Solidos3D },
  { unitSlug: "p2-formas", lessonSlug: "figuras-2d",          exercises: p2Figuras2D },
  { unitSlug: "p2-formas", lessonSlug: "formar-figuras",      exercises: p2FormarFiguras },
  { unitSlug: "p2-formas", lessonSlug: "descomponer-figuras", exercises: p2DescomponerFiguras },
  { unitSlug: "p2-formas", lessonSlug: "cuadricula-puntos",   exercises: p2CuadriculaPuntos },
  // ── Unit 10: Estadística ─────────────────────────────────────────────────
  {
    unitSlug: "p2-estadistica",
    lessonSlug: "pictogramas-escala",
    exercises: p2PictogramasEscala,
  },
  // ── 3.º grado ─────────────────────────────────────────────────────────────
  // Unit 1: p3-numeros-10000
  { unitSlug: "p3-numeros-10000", lessonSlug: "prueba-gratis-p3",       exercises: primaryThreePreviewExercises },
  { unitSlug: "p3-numeros-10000", lessonSlug: "contar-cientos-miles",   exercises: p3ContarCientosMiles },
  { unitSlug: "p3-numeros-10000", lessonSlug: "valor-posicional-p3",    exercises: p3ValorPosP3 },
  { unitSlug: "p3-numeros-10000", lessonSlug: "comparar-ordenar-p3",    exercises: p3CompararOrdenarP3 },
  { unitSlug: "p3-numeros-10000", lessonSlug: "patrones-secuencias-p3", exercises: p3PatronesSecP3 },
  // Unit 2: p3-suma-resta
  { unitSlug: "p3-suma-resta", lessonSlug: "algoritmo-4-digitos", exercises: p3Algoritmo4D },
  { unitSlug: "p3-suma-resta", lessonSlug: "calculo-mental-p3",   exercises: p3CalcMentalP3 },
  // Unit 3: p3-multiplicacion-division
  { unitSlug: "p3-multiplicacion-division", lessonSlug: "tablas-6-7-8-9",          exercises: p3Tablas6789 },
  { unitSlug: "p3-multiplicacion-division", lessonSlug: "mult-div-tablas-p3",      exercises: p3MultDivTablas },
  { unitSlug: "p3-multiplicacion-division", lessonSlug: "division-con-residuo",    exercises: p3DivisionResiduoP3 },
  { unitSlug: "p3-multiplicacion-division", lessonSlug: "algoritmo-mult-p3",       exercises: p3AlgoritmoMultP3 },
  { unitSlug: "p3-multiplicacion-division", lessonSlug: "calculo-mental-mult-div", exercises: p3CalcMentalMultDiv },
  // Unit 4: p3-fracciones
  { unitSlug: "p3-fracciones", lessonSlug: "fracciones-equivalentes-p3", exercises: p3FracEquivalentes },
  { unitSlug: "p3-fracciones", lessonSlug: "simplificar-fracciones",     exercises: p3SimplificarFrac },
  { unitSlug: "p3-fracciones", lessonSlug: "comparar-fracciones-p3",     exercises: p3CompararFracP3 },
  { unitSlug: "p3-fracciones", lessonSlug: "sumar-restar-fracciones-p3", exercises: p3SumarRestarFracP3 },
  // Unit 5: p3-dinero
  { unitSlug: "p3-dinero", lessonSlug: "dinero-decimal-p3", exercises: p3DineroDecimalP3 },
  // Unit 6: p3-medicion-tiempo
  { unitSlug: "p3-medicion-tiempo", lessonSlug: "longitud-km-volumen-ml",   exercises: p3LongitudKmVolMl },
  { unitSlug: "p3-medicion-tiempo", lessonSlug: "unidades-compuestas-p3",   exercises: p3UnidadesCompuestasP3 },
  { unitSlug: "p3-medicion-tiempo", lessonSlug: "convertir-unidades-p3",    exercises: p3ConvertirUnidadesP3 },
  { unitSlug: "p3-medicion-tiempo", lessonSlug: "duracion-horarios-p3",     exercises: p3DuracionHorarios },
  { unitSlug: "p3-medicion-tiempo", lessonSlug: "reloj-24-horas",           exercises: p3Reloj24H },
  // Unit 7: p3-area-perimetro
  { unitSlug: "p3-area-perimetro", lessonSlug: "area-cuadricula",      exercises: p3AreaCuadricula },
  { unitSlug: "p3-area-perimetro", lessonSlug: "perimetro-figuras-p3", exercises: p3PerimetroFigurasP3 },
  { unitSlug: "p3-area-perimetro", lessonSlug: "area-rectangulo-p3",   exercises: p3AreaRectanguloP3 },
  // Unit 8: p3-geometria
  { unitSlug: "p3-geometria", lessonSlug: "angulos-p3",                       exercises: p3AngulosP3 },
  { unitSlug: "p3-geometria", lessonSlug: "lineas-paralelas-perpendiculares", exercises: p3LineasParalelasPerp },
  // Unit 9: p3-estadistica
  { unitSlug: "p3-estadistica", lessonSlug: "graficos-de-barras", exercises: p3GraficosDeBarras },
  // ── 4.º grado ─────────────────────────────────────────────────────────────
  // Unit 1: p4-numeros-100000
  { unitSlug: "p4-numeros-100000", lessonSlug: "prueba-gratis-p4",       exercises: primaryFourPreviewExercises },
  { unitSlug: "p4-numeros-100000", lessonSlug: "valor-posicional-p4",    exercises: p4ValorPosicionalP4 },
  { unitSlug: "p4-numeros-100000", lessonSlug: "comparar-ordenar-p4",    exercises: p4CompararOrdenarP4 },
  { unitSlug: "p4-numeros-100000", lessonSlug: "patrones-secuencias-p4", exercises: p4PatronesSecP4 },
  { unitSlug: "p4-numeros-100000", lessonSlug: "redondear-numeros-p4",   exercises: p4RedondearNumerosP4 },
  // Unit 2: p4-factores-multiplos
  { unitSlug: "p4-factores-multiplos", lessonSlug: "factores-p4",          exercises: p4FactoresP4 },
  { unitSlug: "p4-factores-multiplos", lessonSlug: "multiplos-p4",         exercises: p4MultiplosP4 },
  { unitSlug: "p4-factores-multiplos", lessonSlug: "factores-comunes-p4",  exercises: p4FactoresComunesP4 },
  { unitSlug: "p4-factores-multiplos", lessonSlug: "multiplos-comunes-p4", exercises: p4MultiplosComunesP4 },
  // Unit 3: p4-operaciones
  { unitSlug: "p4-operaciones", lessonSlug: "mult-4-por-1",     exercises: p4Mult4Por1 },
  { unitSlug: "p4-operaciones", lessonSlug: "mult-3-por-2",     exercises: p4Mult3Por2 },
  { unitSlug: "p4-operaciones", lessonSlug: "division-4-por-1", exercises: p4Division4Por1 },
  // Unit 4: p4-fracciones
  { unitSlug: "p4-fracciones", lessonSlug: "numeros-mixtos-p4",          exercises: p4NumerosMixtosP4 },
  { unitSlug: "p4-fracciones", lessonSlug: "fracciones-impropias-p4",    exercises: p4FraccionesImpropiasP4 },
  { unitSlug: "p4-fracciones", lessonSlug: "fraccion-de-conjunto-p4",    exercises: p4FraccionDeConjuntoP4 },
  { unitSlug: "p4-fracciones", lessonSlug: "sumar-restar-fracciones-p4", exercises: p4SumarRestarFraccionesP4 },
  // Unit 5: p4-decimales
  { unitSlug: "p4-decimales", lessonSlug: "decimales-notacion-p4",   exercises: p4DecimalesNotacionP4 },
  { unitSlug: "p4-decimales", lessonSlug: "comparar-decimales-p4",   exercises: p4CompararDecimalesP4 },
  { unitSlug: "p4-decimales", lessonSlug: "decimales-fracciones-p4", exercises: p4DecimalesFraccionesP4 },
  { unitSlug: "p4-decimales", lessonSlug: "redondear-decimales-p4",  exercises: p4RedondearDecimalesP4 },
  // Unit 6: p4-decimales-operaciones
  { unitSlug: "p4-decimales-operaciones", lessonSlug: "sumar-restar-decimales-p4", exercises: p4SumarRestarDecimalesP4 },
  { unitSlug: "p4-decimales-operaciones", lessonSlug: "mult-div-decimales-p4",     exercises: p4MultDivDecimalesP4 },
  // Unit 7: p4-area-perimetro
  { unitSlug: "p4-area-perimetro", lessonSlug: "area-perimetro-p4",      exercises: p4AreaPerimetroP4 },
  { unitSlug: "p4-area-perimetro", lessonSlug: "encontrar-dimension-p4", exercises: p4EncontrarDimensionP4 },
  { unitSlug: "p4-area-perimetro", lessonSlug: "figuras-compuestas-p4",  exercises: p4FigurasCompuestasP4 },
  // Unit 8: p4-geometria
  { unitSlug: "p4-geometria", lessonSlug: "angulos-medir-p4",       exercises: p4AngulosMedirP4 },
  { unitSlug: "p4-geometria", lessonSlug: "rectangulo-cuadrado-p4", exercises: p4RectanguloCuadradoP4 },
  { unitSlug: "p4-geometria", lessonSlug: "simetria-p4",            exercises: p4SimetriaP4 },
  { unitSlug: "p4-geometria", lessonSlug: "redes-solidos-p4",       exercises: p4RedesSolidosP4 },
  // Unit 9: p4-estadistica
  { unitSlug: "p4-estadistica", lessonSlug: "tablas-datos-p4",        exercises: p4TablasDatosP4 },
  { unitSlug: "p4-estadistica", lessonSlug: "graficos-lineales-p4",   exercises: p4GraficosLinealesP4 },
  { unitSlug: "p4-estadistica", lessonSlug: "graficos-circulares-p4", exercises: p4GraficosCircularesP4 },
  // ── 5.º grado ─────────────────────────────────────────────────────────────
  // Unit 1: p5-numeros-millones
  { unitSlug: "p5-numeros-millones", lessonSlug: "prueba-gratis-p5",       exercises: primaryFivePreviewExercises },
  { unitSlug: "p5-numeros-millones", lessonSlug: "leer-escribir-millones", exercises: p5LeerEscribirMillones },
  { unitSlug: "p5-numeros-millones", lessonSlug: "comparar-ordenar-p5",    exercises: p5CompararOrdenarP5 },
  // Unit 2: p5-operaciones
  { unitSlug: "p5-operaciones", lessonSlug: "mult-div-10-100-1000", exercises: p5MultDiv10100 },
  { unitSlug: "p5-operaciones", lessonSlug: "orden-operaciones-p5",  exercises: p5OrdenOperacionesP5 },
  { unitSlug: "p5-operaciones", lessonSlug: "uso-de-parentesis-p5",  exercises: p5UsoParentesisP5 },
  // Unit 3: p5-fracciones
  { unitSlug: "p5-fracciones", lessonSlug: "fraccion-como-division",    exercises: p5FraccionComoDivision },
  { unitSlug: "p5-fracciones", lessonSlug: "fracciones-a-decimales-p5", exercises: p5FraccionesADecimalesP5 },
  { unitSlug: "p5-fracciones", lessonSlug: "sumar-restar-mixtos-p5",    exercises: p5SumarRestarMixtosP5 },
  { unitSlug: "p5-fracciones", lessonSlug: "multiplicar-fracciones-p5", exercises: p5MultiplicarFraccionesP5 },
  // Unit 4: p5-decimales
  { unitSlug: "p5-decimales", lessonSlug: "mult-div-decimales-10-100",  exercises: p5MultDivDecimales10100 },
  { unitSlug: "p5-decimales", lessonSlug: "convertir-unidades-decimal", exercises: p5ConvertirUnidadesDecimal },
  // Unit 5: p5-porcentaje
  { unitSlug: "p5-porcentaje", lessonSlug: "expresar-porcentaje-p5",     exercises: p5ExpresarPorcentajeP5 },
  { unitSlug: "p5-porcentaje", lessonSlug: "porcentaje-de-un-numero-p5", exercises: p5PorcentajeDeUnNumeroP5 },
  { unitSlug: "p5-porcentaje", lessonSlug: "descuentos-interes-p5",      exercises: p5DescuentosInteresP5 },
  // Unit 6: p5-tasa
  { unitSlug: "p5-tasa", lessonSlug: "tasa-por-unidad-p5",     exercises: p5TasaPorUnidadP5 },
  { unitSlug: "p5-tasa", lessonSlug: "calcular-tasa-total-p5", exercises: p5CalcularTasaTotalP5 },
  // Unit 7: p5-area-volumen
  { unitSlug: "p5-area-volumen", lessonSlug: "area-triangulo-p5",     exercises: p5AreaTrianguloP5 },
  { unitSlug: "p5-area-volumen", lessonSlug: "figuras-compuestas-p5", exercises: p5FigurasCompuestasP5 },
  { unitSlug: "p5-area-volumen", lessonSlug: "volumen-cubos-p5",      exercises: p5VolumenCubosP5 },
  { unitSlug: "p5-area-volumen", lessonSlug: "volumen-cuboide-p5",    exercises: p5VolumenCuboideP5 },
  // Unit 8: p5-geometria
  { unitSlug: "p5-geometria", lessonSlug: "angulos-recta-punto-p5",   exercises: p5AngulosRectaPuntoP5 },
  { unitSlug: "p5-geometria", lessonSlug: "angulos-opuestos-p5",      exercises: p5AngulosOpuestosP5 },
  { unitSlug: "p5-geometria", lessonSlug: "triangulos-propiedades-p5",exercises: p5TriangulosPropiedadesP5 },
  { unitSlug: "p5-geometria", lessonSlug: "cuadrilateros-p5",         exercises: p5CuadrilaterosP5 },
  // ── 6.º grado ─────────────────────────────────────────────────────────────
  // Unit 1: p6-fracciones
  { unitSlug: "p6-fracciones", lessonSlug: "prueba-gratis-p6",        exercises: primarySixPreviewExercises },
  { unitSlug: "p6-fracciones", lessonSlug: "dividir-fraccion-entero", exercises: p6DividirFraccionEntero },
  { unitSlug: "p6-fracciones", lessonSlug: "dividir-entre-fraccion",  exercises: p6DividirEntreFraccion },
  // Unit 2: p6-porcentaje
  { unitSlug: "p6-porcentaje", lessonSlug: "hallar-el-todo-p6",    exercises: p6HallarElTodoP6 },
  { unitSlug: "p6-porcentaje", lessonSlug: "aumento-descuento-p6", exercises: p6AumentoDescuentoP6 },
  // Unit 3: p6-razones
  { unitSlug: "p6-razones", lessonSlug: "notacion-razones-p6",     exercises: p6NotacionRazonesP6 },
  { unitSlug: "p6-razones", lessonSlug: "razones-equivalentes-p6", exercises: p6RazonesEquivalentesP6 },
  { unitSlug: "p6-razones", lessonSlug: "repartir-en-razon-p6",    exercises: p6RepartirEnRazonP6 },
  { unitSlug: "p6-razones", lessonSlug: "razon-y-fraccion-p6",     exercises: p6RazonYFraccionP6 },
  // Unit 4: p6-algebra
  { unitSlug: "p6-algebra", lessonSlug: "letras-incognitas-p6",   exercises: p6LetrasIncognitasP6 },
  { unitSlug: "p6-algebra", lessonSlug: "evaluar-expresiones-p6", exercises: p6EvaluarExpresionesP6 },
  { unitSlug: "p6-algebra", lessonSlug: "ecuaciones-simples-p6",  exercises: p6EcuacionesSimplesP6 },
  // Unit 5: p6-circulo
  { unitSlug: "p6-circulo", lessonSlug: "partes-del-circulo-p6",   exercises: p6PartesDelCirculoP6 },
  { unitSlug: "p6-circulo", lessonSlug: "circunferencia-area-p6",  exercises: p6CircunferenciaAreaP6 },
  { unitSlug: "p6-circulo", lessonSlug: "figuras-con-circulos-p6", exercises: p6FigurasConCirculosP6 },
  // Unit 6: p6-volumen
  { unitSlug: "p6-volumen", lessonSlug: "hallar-dimension-p6", exercises: p6HallarDimensionP6 },
  { unitSlug: "p6-volumen", lessonSlug: "raices-cubo-p6",     exercises: p6RaicesCuboP6 },
  // Unit 7: p6-geometria
  { unitSlug: "p6-geometria", lessonSlug: "angulos-cuadrilateros-p6", exercises: p6AngulosCuadrilaterosP6 },
  { unitSlug: "p6-geometria", lessonSlug: "angulos-compuestos-p6",    exercises: p6AngulosCompuestosP6 },
  // Unit 8: p6-estadistica
  { unitSlug: "p6-estadistica", lessonSlug: "promedio-p6",       exercises: p6PromedioP6 },
  { unitSlug: "p6-estadistica", lessonSlug: "usar-el-promedio-p6", exercises: p6UsarElPromedioP6 },
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
  {
    slug: "hat",
    kind: "ACCESSORY",
    name: "Sombrero",
    icon: "🎩",
    price: 50,
    rarity: "COMMON",
  },
  {
    slug: "crown",
    kind: "ACCESSORY",
    name: "Corona",
    icon: "👑",
    price: 200,
    rarity: "EPIC",
  },
  {
    slug: "glasses",
    kind: "ACCESSORY",
    name: "Anteojos",
    icon: "🕶️",
    price: 80,
    rarity: "RARE",
  },
  {
    slug: "bow",
    kind: "ACCESSORY",
    name: "Moño",
    icon: "🎀",
    price: 40,
    rarity: "COMMON",
  },
  {
    slug: "horn",
    kind: "ACCESSORY",
    name: "Cuerno",
    icon: "🦄",
    price: 300,
    rarity: "LEGENDARY",
  },
  {
    slug: "backpack",
    kind: "ACCESSORY",
    name: "Mochila",
    icon: "🎒",
    price: 120,
    rarity: "RARE",
  },
  {
    slug: "gems-100",
    kind: "GEMS_PACK",
    name: "100 gemas",
    icon: "💎",
    price: 99,
  },
  {
    slug: "gems-500",
    kind: "GEMS_PACK",
    name: "500 gemas",
    icon: "💎",
    price: 399,
  },
  {
    slug: "gems-1500",
    kind: "GEMS_PACK",
    name: "1500 gemas",
    icon: "💎",
    price: 999,
  },
  {
    slug: "hearts-5",
    kind: "HEARTS_REFILL",
    name: "Recargar 5",
    icon: "❤️",
    price: 30,
  },
] as const;

const achievements = [
  {
    slug: "first-lesson",
    name: "Primera lección",
    description: "Completa 1 lección",
    icon: "🌟",
    target: 1,
    metric: "lessons_completed",
  },
  {
    slug: "streak-3",
    name: "3 días seguidos",
    description: "Mantén racha",
    icon: "🔥",
    target: 3,
    metric: "streak",
  },
  {
    slug: "correct-100",
    name: "100 aciertos",
    description: "Suma 100 correctas",
    icon: "💯",
    target: 100,
    metric: "correct_answers",
  },
  {
    slug: "lessons-5",
    name: "5 lecciones",
    description: "Completa 5 lecciones",
    icon: "📚",
    target: 5,
    metric: "lessons_completed",
  },
  {
    slug: "speed-10",
    name: "Velocista",
    description: "10 correctas en 1min",
    icon: "⚡",
    target: 10,
    metric: "speed_run",
  },
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
    (
      await prisma.learningPath.findMany({ select: { id: true, slug: true } })
    ).map((path) => [path.slug, path.id]),
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

  for (const [
    unitSlug,
    slug,
    title,
    order,
    xpReward,
    estimatedMinutes,
  ] of lessons) {
    const unit = unitBySlug.get(unitSlug);
    if (!unit) throw new Error(`Missing unit ${unitSlug}`);
    await prisma.lesson.upsert({
      where: { unitId_slug: { unitId: unit.id, slug } },
      update: { title, order, xpReward, estimatedMinutes },
      create: {
        unitId: unit.id,
        slug,
        title,
        order,
        xpReward,
        estimatedMinutes,
      },
    });
  }

  for (const preview of previewExerciseUpdates) {
    const previewUnit = unitBySlug.get(preview.unitSlug);
    if (!previewUnit)
      throw new Error(`Missing preview unit ${preview.unitSlug}`);
    const previewLesson = await prisma.lesson.findUnique({
      where: {
        unitId_slug: {
          unitId: previewUnit.id,
          slug: preview.lessonSlug,
        },
      },
      select: { id: true },
    });
    if (!previewLesson)
      throw new Error(`Missing preview lesson ${preview.lessonSlug}`);

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
