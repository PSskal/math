"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { brand } from "@/lib/brand";

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-sky-soft/60 bg-white/80 shadow-[0_2px_20px_rgba(72,103,245,0.08)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 sm:px-10">
        <Link href="/" className="inline-flex items-center gap-3">
          <img
            src={brand.assets.mark}
            alt=""
            className="h-9 w-9 rounded-xl shadow-[0_8px_20px_rgba(72,103,245,0.14)]"
          />
          <span className="text-xl font-black tracking-tight text-ink">
            {brand.appName}
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-black text-ink-soft md:flex">
          <a href="#como-funciona" className="hover:text-sky transition-colors">Cómo funciona</a>
          <a href="#temas" className="hover:text-sky transition-colors">Temas</a>
          <a href="#precios" className="hover:text-sky transition-colors">Precios</a>
          <a href="#faq" className="hover:text-sky transition-colors">Preguntas</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/auth/login"
            className="hidden rounded-full border border-sky-soft bg-white px-4 py-2 text-sm font-black text-sky sm:inline-flex"
          >
            Entrar
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-full bg-sky px-4 py-2 text-sm font-black text-white shadow-[0_4px_0_#2445d8] transition-transform hover:-translate-y-0.5"
          >
            Empezar gratis
          </Link>
        </div>
      </div>
    </header>
  );
}
