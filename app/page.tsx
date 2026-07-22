import Image from "next/image";
import Link from "next/link";
import {
  Target,
  Gamepad2,
  LineChart,
  Flame,
  ShieldCheck,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { brand } from "@/lib/brand";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { LandingNav } from "./LandingNav";

/* ------------------------------------------------------------------ */
/*  Landing de venta — estructura inspirada en Synthesis, marca Paskalito
    Server Component. El FAQ usa <details> nativo (sin JS de cliente).
    Las <MediaSketch> son bocetos: reemplaza el placeholder por una foto
    o captura real cuando la tengas (mira el label de cada una).          */
/* ------------------------------------------------------------------ */

function landingWhatsappHref() {
  const text = [
    "Hola, quiero conocer Paskalito.",
    "Me interesa información sobre los cursos y Premium.",
  ].join("\n");
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/** Ilustraciones CSS idénticas a las de la página de materias. */
type IllustrationVariant = "grid" | "palette" | "blocks" | "book" | "spark" | "artboard";

function PathIllustration({ variant }: { variant: IllustrationVariant }) {
  if (variant === "grid") {
    return (
      <div className="relative h-16 w-16 rounded-[18px] bg-[#86a0ff] shadow-[0_6px_0_#dfe5ff]">
        <div className="absolute inset-2.5 rounded-md border-2 border-white/70" />
        <div className="absolute left-4 top-4 h-6 w-6 rounded-md border-2 border-[#ffd95c] bg-white/20" />
        <div className="absolute left-8 top-2 h-12 w-1 rotate-45 rounded-full bg-[#173bba]" />
        <div className="absolute bottom-3 right-2 h-5 w-1 -rotate-45 rounded-full bg-[#173bba]" />
      </div>
    );
  }
  if (variant === "palette") {
    return (
      <div className="relative h-16 w-16 rounded-full bg-[#6f87ff] shadow-[0_6px_0_#dfe5ff]">
        <div className="absolute left-4 top-4 h-3 w-3 rounded-full bg-[#ffd95c]" />
        <div className="absolute left-7 top-2.5 h-3 w-3 rounded-full bg-[#ffd95c]" />
        <div className="absolute left-6 top-8 h-5 w-6 rounded-full bg-[#ffe58a]" />
        <div className="absolute right-0 top-1.5 h-12 w-1.5 rotate-45 rounded-full bg-[#173bba]" />
      </div>
    );
  }
  if (variant === "blocks") {
    return (
      <div className="relative h-16 w-16">
        {[
          "left-1 top-8 bg-[#173bba]",
          "left-5 top-8 bg-[#4867f5]",
          "left-9 top-8 bg-[#4867f5]",
          "left-5 top-4 bg-[#6f87ff]",
          "left-9 top-4 bg-[#d7a900]",
          "left-9 top-0 bg-[#ffd95c]",
        ].map((cls) => (
          <div key={cls} className={`absolute h-5 w-5 rotate-45 rounded-md ${cls}`} />
        ))}
      </div>
    );
  }
  if (variant === "book") {
    return (
      <div className="relative h-16 w-16 rounded-[18px] bg-[#b088db] shadow-[0_6px_0_#eadcff]">
        <div className="absolute left-3 top-3 h-10 w-7 rounded-lg bg-white/75" />
        <div className="absolute right-3 top-3 h-10 w-7 rounded-lg bg-white/55" />
        <div className="absolute left-1/2 top-2.5 h-11 w-1 -translate-x-1/2 rounded-full bg-[#3d2e4f]/30" />
      </div>
    );
  }
  if (variant === "spark") {
    return (
      <div className="relative h-16 w-16">
        <div className="absolute left-4 top-5 h-9 w-9 rotate-45 rounded-2xl bg-[#ff8fb1]" />
        <div className="absolute left-2 top-2.5 h-6 w-6 rounded-full bg-[#ffc94a]" />
        <div className="absolute right-1.5 top-1 h-8 w-1.5 rotate-45 rounded-full bg-[#173bba]" />
        <div className="absolute bottom-1.5 left-6 h-2.5 w-2.5 rounded-full bg-white" />
      </div>
    );
  }
  // artboard (fallback)
  return (
    <div className="relative h-16 w-16">
      <div className="absolute left-4 top-3 h-12 w-9 rounded-sm bg-[#4867f5]" />
      <div className="absolute left-1 top-7 h-9 w-3 -rotate-45 rounded-sm bg-[#173bba]" />
      <div className="absolute right-1.5 top-6 h-7 w-7 rounded-sm bg-[#6f87ff]" />
      <div className="absolute left-1.5 top-1.5 h-6 w-6 rounded-full bg-[#86a0ff] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.28)]" />
    </div>
  );
}

/** Placeholder/boceto para una imagen o captura pendiente. */
function MediaSketch({
  label,
  hint,
  className = "",
  emoji = "🖼️",
}: {
  label: string;
  hint?: string;
  className?: string;
  emoji?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-sky/30 bg-sky-soft/60 p-6 text-center ${className}`}
    >
      <div className="text-4xl">{emoji}</div>
      <div className="mt-3 text-sm font-black text-sky">{label}</div>
      {hint ? (
        <div className="mt-1 max-w-xs text-xs font-bold text-ink-mute">
          {hint}
        </div>
      ) : null}
    </div>
  );
}

/* -------- Datos de secciones -------- */

const heroStats = [
  { value: "100%", label: "juegos, cero fichas" },
  { value: "P1–P6", label: "primaria completa" },
  { value: "7 días", label: "prueba gratis" },
];

const testimonials = [
  {
    quote:
      "Mi hija de 7 años pide practicar sola. Antes las tareas eran una pelea, ahora es su juego favorito.",
    author: "Mamá de Valentina",
    place: "Lima",
    emoji: "📸",
  },
  {
    quote:
      "Como maestra lo uso para reforzar. Los chicos no sienten que están estudiando, sienten que juegan.",
    author: "Profesora Rosa",
    place: "Arequipa",
    emoji: "📸",
  },
  {
    quote:
      "El reporte semanal me llega al WhatsApp y sé exactamente en qué anda flojo mi hijo. Impagable.",
    author: "Papá de Mateo",
    place: "Trujillo",
    emoji: "📸",
  },
  {
    quote:
      "Pasó de odiar las fracciones a explicármelas a mí. La forma visual le hizo clic.",
    author: "Mamá de Luana",
    place: "Cusco",
    emoji: "📸",
  },
];

const tintClasses: Record<string, string> = {
  sky: "bg-sky-soft text-sky",
  lilac: "bg-lilac-soft text-lilac",
  mint: "bg-mint-soft text-mint",
  pink: "bg-peach-soft text-pink",
  sun: "bg-sun-soft text-sun-deep",
};

const features: {
  Icon: LucideIcon;
  tint: keyof typeof tintClasses;
  title: string;
  body: string;
}[] = [
  { Icon: Target, tint: "sky", title: "Se adapta a su nivel", body: "Repetición espaciada (SM-2): repasa justo lo que está por olvidar." },
  { Icon: Gamepad2, tint: "lilac", title: "Todo es un juego", body: "Nada de marcar respuestas. Toca, arrastra, construye y descubre." },
  { Icon: LineChart, tint: "mint", title: "Reporte para padres", body: "Progreso semanal al WhatsApp: lecciones, aciertos y puntos débiles." },
  { Icon: Flame, tint: "pink", title: "Rachas y recompensas", body: "Gemas, niveles y logros que lo hacen volver cada día." },
  { Icon: ShieldCheck, tint: "sky", title: "Sin distracciones", body: "Sin anuncios, sin chats, sin compras dentro del juego. Solo aprender." },
  { Icon: Heart, tint: "sun", title: "Pensado para Perú", body: "Currículo de primaria y pago fácil por Yape/WhatsApp." },
];

const topics: { grade: string; label: string; illustration: IllustrationVariant | "p1" }[] = [
  { grade: "1.º", label: "Contar y comparar hasta 100",    illustration: "p1" },
  { grade: "2.º", label: "Sumas, restas y valor posicional", illustration: "palette" },
  { grade: "3.º", label: "Multiplicar, dividir y fracciones", illustration: "blocks" },
  { grade: "4.º", label: "Decimales, área y geometría",    illustration: "spark" },
  { grade: "5.º", label: "Porcentajes, volumen y datos",   illustration: "grid" },
  { grade: "6.º", label: "Razones, álgebra y círculo",     illustration: "artboard" },
];

const plans = [
  {
    id: "month",
    label: "1 mes",
    price: 30,
    regular: 54,
    helper: "Acceso mensual completo",
    highlight: false,
  },
  {
    id: "launch",
    label: "2 meses",
    price: 34,
    regular: 108,
    helper: "Paga 1 mes y recibe 1 gratis",
    badge: "Más popular",
    highlight: true,
  },
  {
    id: "year",
    label: "12 meses",
    price: 199,
    regular: 648,
    helper: "Todo el año escolar",
    badge: "Mayor ahorro",
    highlight: false,
  },
];

const faqs = [
  {
    q: "¿Para qué edades es Paskalito?",
    a: "Desde inicial (4 años) hasta 6.º de primaria. Cada grado tiene su propio camino de lecciones con juegos adaptados a su edad.",
  },
  {
    q: "¿Necesito tarjeta para la prueba gratis?",
    a: "No. La prueba de 7 días se activa con un clic, sin tarjeta ni datos de pago. Al terminar, tú decides si continúas.",
  },
  {
    q: "¿Cómo pago si quiero Premium?",
    a: "Por Yape o transferencia, coordinado por WhatsApp. Activamos tu cuenta de forma manual y segura en minutos.",
  },
  {
    q: "¿Funciona en celular y tablet?",
    a: "Sí. Paskalito funciona en cualquier navegador y se puede instalar como app en el celular o tablet del niño.",
  },
  {
    q: "¿Puedo ver el progreso de mi hijo?",
    a: "Sí. El panel de padres muestra minutos de práctica, aciertos, temas dominados y puntos débiles, más un reporte semanal listo para compartir por WhatsApp.",
  },
  {
    q: "¿Habrá tutor con inteligencia artificial?",
    a: "Está en camino. Estamos integrando IA que explicará cada error con un ejemplo y recomendará qué practicar, sin reemplazar los juegos que ya conoces.",
  },
];

/* -------- Página -------- */

export default function Index() {
  const whatsappHref = landingWhatsappHref();

  return (
    <>
    <LandingNav />
    <main className="min-h-screen overflow-x-hidden bg-cream text-ink">
      {/* Botón flotante WhatsApp */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_8px_0_#128c3e,0_18px_40px_rgba(18,140,62,0.28)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#b8f5cd] md:h-auto md:w-auto md:gap-2 md:px-5 md:py-4"
      >
        <WhatsAppIcon className="h-7 w-7" />
        <span className="hidden text-sm font-black md:inline">WhatsApp</span>
      </a>

      {/* HERO — pt-16 compensa el nav fixed */}
      <section className="relative overflow-hidden bg-white pt-16">
        {/* mesh gradient moderno: glows difuminados sobre blanco */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-sky/25 blur-[110px]" />
          <div className="absolute -right-16 -top-10 h-[460px] w-[460px] rounded-full bg-lilac/20 blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 h-[320px] w-[320px] rounded-full bg-mint/15 blur-[110px]" />
        </div>
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-soft bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-sky shadow-[0_8px_24px_rgba(72,103,245,0.08)]">
              🎮 100% juegos · nada de marcar
            </div>
            <h1 className="font-fredoka text-[clamp(2.6rem,6.5vw,4.6rem)] font-bold leading-[0.95] tracking-tight text-ink">
              El tutor de mate personal de tu hijo.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg font-bold leading-8 text-ink-soft">
              Paskalito convierte las matemáticas de primaria en juegos donde los
              niños tocan, construyen y descubren. Aprenden más rápido porque
              <span className="text-sky"> creen que están jugando.</span>
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth/signup"
                className="btn-chunky inline-flex min-w-[240px] items-center justify-center rounded-2xl bg-sky px-7 py-4 text-base font-black text-white shadow-[0_5px_0_#2445d8] transition-transform hover:-translate-y-0.5"
              >
                Empieza tu prueba gratis de 7 días
              </Link>
              <Link
                href="#como-funciona"
                className="btn-chunky inline-flex min-w-[180px] items-center justify-center rounded-2xl border-2 border-sky-soft bg-white px-7 py-4 text-base font-black text-ink shadow-[0_5px_0_rgba(72,103,245,0.12)] transition-transform hover:-translate-y-0.5"
              >
                Ver cómo funciona
              </Link>
            </div>
            <p className="mt-3 text-sm font-bold text-ink-mute">
              Sin tarjeta. Sin anuncios. Cancela cuando quieras.
            </p>

            <div className="mt-8 grid max-w-lg grid-cols-3 gap-3">
              {heroStats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-sky-soft bg-white px-4 py-4 shadow-[0_10px_26px_rgba(72,103,245,0.07)]"
                >
                  <div className="text-xl font-black tracking-tight text-sky">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs font-bold text-ink-soft">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mockup del juego (CSS, no imagen) — muestra el estilo real */}
          <div className="relative mx-auto w-full max-w-[500px]">
            <div className="animate-bob rounded-[2rem] border border-sky-soft bg-white p-6 shadow-[0_24px_80px_rgba(72,103,245,0.16)]">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-mint-soft px-3 py-1 text-xs font-black text-mint">
                  Lección 3 · Sumas
                </span>
                <span className="text-sm font-black text-ink-mute">⭐ 240 XP</span>
              </div>
              <p className="mt-4 text-center text-lg font-black text-ink">
                Arrastra los bloques y arma el número
              </p>
              {/* Suma en columna estilizada */}
              <div className="mt-5 rounded-3xl bg-sky-soft/60 p-6">
                <div className="mx-auto max-w-[220px] font-fredoka text-5xl font-bold text-ink">
                  <div className="flex justify-end gap-2">
                    <span>1</span><span>4</span><span>8</span>
                  </div>
                  <div className="mt-1 flex items-center justify-end gap-2">
                    <span className="text-sky">+</span><span>3</span><span>6</span>
                  </div>
                  <div className="mt-2 border-t-4 border-ink/20" />
                  <div className="mt-2 flex justify-end gap-2">
                    <span className="rounded-lg bg-sun px-2 text-white shadow-[0_3px_0_#d99a00]">1</span>
                    <span className="rounded-lg bg-mint px-2 text-white shadow-[0_3px_0_#1f9e42]">8</span>
                    <span className="rounded-lg bg-mint px-2 text-white shadow-[0_3px_0_#1f9e42]">4</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <img
                  src={brand.assets.mascotHappy}
                  alt={brand.mascotName}
                  className="h-14 w-14 object-contain"
                />
                <div className="rounded-2xl bg-lilac-soft px-4 py-2 text-sm font-black text-lilac">
                  ¡Muy bien! Llevas 3 seguidas 🎉
                </div>
              </div>
            </div>
            {/* Placeholder alterno por si prefieres captura real */}
            <p className="mt-3 text-center text-xs font-bold text-ink-mute">
              (Boceto en vivo — aquí puedes poner una captura real del juego)
            </p>
          </div>
        </div>
      </section>

      {/* A DIFERENCIA DE OTRAS APPS */}
      <section
        id="como-funciona"
        className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-10"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-sky">
            A diferencia de cualquier otra app
          </p>
          <h2 className="mt-2 font-fredoka text-4xl font-bold text-ink">
            No es una app de tareas. Es un compañero de juego.
          </h2>
          <p className="mt-4 text-lg font-bold text-ink-soft">
            Las apps tradicionales digitalizan la hoja de ejercicios. Paskalito
            reemplaza el "marca la respuesta correcta" por juegos donde el niño
            manipula, prueba y entiende.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <MediaSketch
            emoji="📱"
            label="Captura / video del juego en acción"
            hint="Sugerencia: grabación de pantalla de un niño arrastrando fichas de fracciones o armando una suma."
            className="min-h-[320px]"
          />
          <div className="flex flex-col justify-center gap-5">
            {[
              { n: "01", t: "Aprende haciendo", d: "Cada concepto empieza con una acción física en pantalla, no con una definición." },
              { n: "02", t: "Se equivoca sin miedo", d: "El error es parte del juego: prueba de nuevo al instante, sin castigo." },
              { n: "03", t: "Domina y avanza", d: "Cuando lo entiende, el sistema lo lleva al siguiente reto automáticamente." },
            ].map((step) => (
              <div key={step.n} className="flex gap-4">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-sky text-lg font-black text-white shadow-[0_4px_0_#2445d8]">
                  {step.n}
                </div>
                <div>
                  <h3 className="text-lg font-black text-ink">{step.t}</h3>
                  <p className="mt-1 font-bold text-ink-soft">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-16">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-fredoka text-4xl font-bold text-ink">
              Pensado para que aprenda de verdad.
            </h2>
            <p className="mt-3 text-lg font-bold text-ink-soft">
              Cada detalle está diseñado para que el niño vuelva y el padre
              confíe.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-3xl border border-sky-soft bg-cream p-6 shadow-[0_10px_30px_rgba(72,103,245,0.06)] transition-transform hover:-translate-y-1"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tintClasses[f.tint]}`}
                >
                  <f.Icon className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <h3 className="mt-4 text-lg font-black text-ink">{f.title}</h3>
                <p className="mt-2 font-bold leading-6 text-ink-soft">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-sky">
            Familias que ya juegan
          </p>
          <h2 className="mt-2 font-fredoka text-4xl font-bold text-ink">
            Aprender mate dejó de ser una pelea.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.author}
              className="flex flex-col gap-4 rounded-3xl border border-sky-soft bg-white p-6 shadow-[0_10px_30px_rgba(72,103,245,0.06)]"
            >
              <blockquote className="text-lg font-bold leading-7 text-ink">
                “{t.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl border-2 border-dashed border-sky/30 bg-sky-soft text-xl">
                  {t.emoji}
                </div>
                <div>
                  <div className="text-sm font-black text-ink">{t.author}</div>
                  <div className="text-xs font-bold text-ink-mute">{t.place}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-center text-xs font-bold text-ink-mute">
          (Los recuadros 📸 son bocetos: reemplázalos por fotos reales de las
          familias cuando las tengas.)
        </p>
      </section>

      {/* TEMAS */}
      <section id="temas" className="bg-white py-16">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-fredoka text-4xl font-bold text-ink">
              Domina las bases. Luego ve más allá.
            </h2>
            <p className="mt-3 text-lg font-bold text-ink-soft">
              Un camino completo de 1.º a 6.º de primaria. Todo en juegos, todo
              conectado.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((t) => (
              <div
                key={t.grade}
                className="flex items-center gap-4 rounded-3xl border border-sky-soft bg-cream p-5 shadow-[0_10px_30px_rgba(72,103,245,0.06)] transition-transform hover:-translate-y-1"
              >
                <div className="flex-none">
                  {t.illustration === "p1" ? (
                    <Image
                      src={brand.assets.pathMathPrimary1}
                      alt=""
                      width={64}
                      height={64}
                      className="h-16 w-16 object-contain"
                      aria-hidden
                    />
                  ) : (
                    <PathIllustration variant={t.illustration} />
                  )}
                </div>
                <div>
                  <div className="text-sm font-black uppercase tracking-wider text-sky">
                    {t.grade} grado
                  </div>
                  <div className="font-black text-ink">{t.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IA PRÓXIMAMENTE */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-10">
        <div className="overflow-hidden rounded-[2.5rem] border border-lilac/20 bg-linear-to-br from-lilac-soft via-white to-sky-soft p-8 sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <div className="inline-flex rounded-full bg-lilac px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white">
                🤖 Próximamente
              </div>
              <h2 className="mt-4 font-fredoka text-4xl font-bold text-ink">
                Un tutor con IA, dentro de los juegos.
              </h2>
              <p className="mt-4 text-lg font-bold text-ink-soft">
                Estamos integrando inteligencia artificial que explica cada error
                con un ejemplo claro y recomienda qué practicar según cómo juega
                cada niño. La calidez de un tutor, la paciencia de una máquina.
              </p>
              <ul className="mt-5 space-y-2 font-bold text-ink">
                <li>✅ Explica el "por qué" de cada error, no solo "incorrecto".</li>
                <li>✅ Detecta puntos débiles y arma la práctica ideal.</li>
                <li>✅ Ajusta la dificultad en tiempo real.</li>
              </ul>
            </div>
            <MediaSketch
              emoji="💬"
              label="Boceto: chat del tutor IA explicando un error"
              hint="Ej: 'Dividiste entre 2, pero eran 3 grupos. Mira…' con un mini-diagrama."
              className="min-h-[260px] bg-white/70"
            />
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" className="bg-white py-16">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-fredoka text-4xl font-bold text-ink">
              Para toda la familia.
            </h2>
            <p className="mt-3 text-lg font-bold text-ink-soft">
              Empieza con 7 días gratis. Luego elige el plan que te convenga. Un
              solo pago, todos los grados incluidos.
            </p>
          </div>

          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
            {plans.map((p) => {
              const discount = Math.round(((p.regular - p.price) / p.regular) * 100);
              return (
                <div
                  key={p.id}
                  className={`relative flex flex-col rounded-[2rem] border-2 p-7 ${
                    p.highlight
                      ? "border-sky bg-sky-soft shadow-[0_18px_50px_rgba(72,103,245,0.18)]"
                      : "border-sky-soft bg-cream shadow-[0_10px_30px_rgba(72,103,245,0.06)]"
                  }`}
                >
                  {p.badge ? (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sky px-4 py-1 text-xs font-black text-white shadow-[0_4px_0_#2445d8]">
                      {p.badge}
                    </span>
                  ) : null}
                  <div className="text-sm font-black uppercase tracking-wider text-ink-soft">
                    {p.label}
                  </div>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="font-fredoka text-5xl font-bold text-ink">
                      S/{p.price}
                    </span>
                    <span className="mb-1 text-sm font-black text-ink-mute line-through">
                      S/{p.regular}
                    </span>
                  </div>
                  <div className="mt-1 inline-flex w-fit rounded-full bg-mint-soft px-2.5 py-0.5 text-xs font-black text-mint">
                    -{discount}% de descuento
                  </div>
                  <p className="mt-3 font-bold text-ink-soft">{p.helper}</p>
                  <Link
                    href="/auth/signup"
                    className={`btn-chunky mt-6 inline-flex items-center justify-center rounded-2xl px-6 py-3.5 text-base font-black transition-transform hover:-translate-y-0.5 ${
                      p.highlight
                        ? "bg-sky text-white shadow-[0_5px_0_#2445d8]"
                        : "border-2 border-sky-soft bg-white text-ink shadow-[0_5px_0_rgba(72,103,245,0.12)]"
                    }`}
                  >
                    Empezar gratis
                  </Link>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-center text-sm font-bold text-ink-mute">
            ¿Solo quieres probar? Activa la{" "}
            <Link href="/premium" className="text-sky underline underline-offset-4">
              prueba de 7 días
            </Link>{" "}
            o pide 1 día por S/1. Pago por Yape / WhatsApp.
          </p>
        </div>
      </section>

      {/* LECCIÓN EN ACCIÓN */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-fredoka text-4xl font-bold text-ink">
            Ve una lección real en acción.
          </h2>
          <p className="mt-3 text-lg font-bold text-ink-soft">
            Así se ve un niño aprendiendo fracciones con Paskalito.
          </p>
        </div>
        <MediaSketch
          emoji="🎬"
          label="Video demo de una lección completa"
          hint="Sugerencia: 20-30s mostrando entrar a una lección, resolver 2-3 juegos y la pantalla de victoria con confeti."
          className="mt-10 min-h-[380px]"
        />
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white py-16">
        <div className="mx-auto w-full max-w-3xl px-6 sm:px-10">
          <h2 className="text-center font-fredoka text-4xl font-bold text-ink">
            Preguntas comunes
          </h2>
          <div className="mt-10 space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-sky-soft bg-cream p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-black text-ink">
                  {f.q}
                  <span className="flex-none text-sky transition-transform group-open:rotate-45">
                    ＋
                  </span>
                </summary>
                <p className="mt-3 font-bold leading-7 text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-10">
        <div className="overflow-hidden rounded-[2.5rem] bg-sky p-10 text-center shadow-[0_24px_80px_rgba(72,103,245,0.24)] sm:p-14">
          <img
            src={brand.assets.mascotCelebrate}
            alt={brand.mascotName}
            className="mx-auto h-28 w-28 object-contain"
          />
          <h2 className="mt-4 font-fredoka text-4xl font-bold text-white sm:text-5xl">
            Que las matemáticas sean su juego favorito.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg font-bold text-white/90">
            Prueba Paskalito gratis por 7 días. Sin tarjeta, sin riesgo.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/auth/signup"
              className="btn-chunky inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-base font-black text-sky shadow-[0_5px_0_rgba(255,255,255,0.5)] transition-transform hover:-translate-y-0.5"
            >
              Empezar gratis ahora
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-chunky inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25d366] px-8 py-4 text-base font-black text-white shadow-[0_5px_0_#128c3e] transition-transform hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Escríbenos
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-sky-soft bg-cream">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row sm:px-10">
          <div className="flex items-center gap-3">
            <img src={brand.assets.mark} alt="" className="h-8 w-8 rounded-xl" />
            <span className="font-black text-ink">{brand.appName}</span>
            <span className="text-sm font-bold text-ink-mute">
              · {brand.tagline}
            </span>
          </div>
          <div className="flex items-center gap-5 text-sm font-black text-ink-soft">
            <Link href="/auth/login" className="hover:text-sky">Entrar</Link>
            <Link href="/parental" className="hover:text-sky">Padres</Link>
            <a href={`mailto:${brand.supportEmail}`} className="hover:text-sky">
              Soporte
            </a>
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}
