// lib/practice-topics.ts
// Configuración de los temas de Práctica libre.
// unitSlugs: qué unidades del curriculum se usan como pool de ejercicios.

export type PracticeTopic = {
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  color: "sky" | "mint" | "sun" | "peach" | "lilac" | "pink";
  unitSlugs: string[];
};

export const PRACTICE_TOPICS: PracticeTopic[] = [
  {
    slug: "numeros",
    title: "Números",
    subtitle: "Hasta el 1000",
    icon: "🔢",
    color: "sky",
    unitSlugs: ["p2-numeros-hasta-1000"],
  },
  {
    slug: "suma-resta",
    title: "Suma y Resta",
    subtitle: "Hasta 3 dígitos",
    icon: "➕",
    color: "mint",
    unitSlugs: ["p2-suma-resta"],
  },
  {
    slug: "multiplicacion",
    title: "Multiplicación",
    subtitle: "Tablas del 2 al 10",
    icon: "✖️",
    color: "sun",
    unitSlugs: ["p2-multiplicacion"],
  },
  {
    slug: "division",
    title: "División",
    subtitle: "Grupos iguales",
    icon: "➗",
    color: "peach",
    unitSlugs: ["p2-division"],
  },
  {
    slug: "fracciones",
    title: "Fracciones",
    subtitle: "Partes del entero",
    icon: "🍕",
    color: "lilac",
    unitSlugs: ["p2-fracciones"],
  },
  {
    slug: "dinero",
    title: "Dinero",
    subtitle: "Soles y céntimos",
    icon: "💰",
    color: "sun",
    unitSlugs: ["p2-dinero"],
  },
  {
    slug: "medicion",
    title: "Medición",
    subtitle: "m, kg y L",
    icon: "📏",
    color: "mint",
    unitSlugs: ["p2-medicion"],
  },
  {
    slug: "tiempo",
    title: "El Tiempo",
    subtitle: "Horas y minutos",
    icon: "🕐",
    color: "sky",
    unitSlugs: ["p2-el-tiempo"],
  },
  {
    slug: "formas",
    title: "Formas",
    subtitle: "2D y 3D",
    icon: "🔷",
    color: "pink",
    unitSlugs: ["p2-formas"],
  },
  {
    slug: "estadistica",
    title: "Estadística",
    subtitle: "Pictogramas",
    icon: "📊",
    color: "peach",
    unitSlugs: ["p2-estadistica"],
  },
];
