"use client";

import { useState } from "react";

type Stat = { icon: string; value: string | number; label: string };

interface Props {
  childName: string;
  stats: Stat[];
  message: string;
}

export function WeeklyReportCard({ childName, stats, message }: Props) {
  const [copied, setCopied] = useState(false);

  async function share() {
    // En móvil, el selector nativo permite mandar el reporte a WhatsApp.
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text: message });
        return;
      } catch {
        // El usuario canceló o falló → caemos al copiado.
      }
    }
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  // Fallback directo a WhatsApp Web/app con el texto ya cargado.
  const whatsappHref = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

  return (
    <div
      className="bg-white rounded-2xl p-4 md:p-6"
      style={{ boxShadow: "var(--shadow-chunky)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs font-black text-ink-soft tracking-wider">
          📊 REPORTE SEMANAL
        </div>
        <div className="text-[10px] font-bold text-ink-mute">últimos 7 días</div>
      </div>

      <p className="text-sm font-bold text-ink-soft mb-4">
        Comparte el avance de {childName} con la familia. 💬
      </p>

      <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-cream p-3 text-center">
            <div className="text-xl md:text-2xl">{s.icon}</div>
            <div className="font-fredoka text-xl md:text-2xl font-bold text-ink">
              {s.value}
            </div>
            <div className="text-[9px] md:text-[10px] font-bold text-ink-soft uppercase leading-tight">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={share}
          className="btn-chunky flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25d366] px-5 py-3.5 text-sm font-black text-white"
          style={{ boxShadow: "0 4px 0 #128c3e" }}
        >
          {copied ? "✓ Copiado al portapapeles" : "💬 Compartir por WhatsApp"}
        </button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-chunky inline-flex items-center justify-center rounded-2xl bg-white border border-slate-200 px-5 py-3.5 text-sm font-black text-[#128c3e]"
          style={{ boxShadow: "var(--shadow-chunky-sm)" }}
        >
          Abrir WhatsApp
        </a>
      </div>
    </div>
  );
}
