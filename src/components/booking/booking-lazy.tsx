"use client";

import { Phone } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { site } from "@/content/site";
import { cn, telHref } from "@/lib/utils";

/**
 * Мастер брони грузится и гидрируется только когда секция близко к экрану:
 * на старте страницы ноль JS мастера (TBT и LCP на телефоне). До загрузки и без JS
 * виден спокойный блок с телефоном той же минимальной высоты.
 */
function Fallback({ className }: { className?: string }) {
  return (
    <div className={cn(className, "grid content-start gap-5")}>
      <p className="t-eyebrow text-fg-muted">Бронь стола</p>
      <p className="t-h3">Сколько вас и когда придёте</p>
      <p className="max-w-[40ch] text-fg-muted">Выберите стол онлайн или позвоните, если так привычнее.</p>
      <a
        href={telHref(site.phone)}
        className="inline-flex h-12 items-center gap-2 self-start rounded-[var(--radius-pill)] bg-brand px-6 font-semibold text-brand-ink"
      >
        <Phone aria-hidden="true" className="size-4" />
        {site.phone}
      </a>
    </div>
  );
}

const Wizard = dynamic(() => import("./booking-wizard").then((m) => m.BookingWizard), {
  ssr: false,
  loading: () => <Fallback className="rounded-[var(--radius)] bg-bg p-5 text-fg sm:p-8" />,
});

export function BookingLazy({ className, successNote }: { className?: string; successNote?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        setNear(true);
      },
      { rootMargin: "900px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-[31rem]">
      {near ? <Wizard className={className} successNote={successNote} /> : <Fallback className={className} />}
    </div>
  );
}
