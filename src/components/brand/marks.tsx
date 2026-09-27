import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Вордмарк FRY: набран шрифтом (конденсированный гротеск 900), не трассирован */
export function Wordmark({ className, tagline = true }: { className?: string; tagline?: boolean }) {
  return (
    <span className={cn("inline-flex flex-col items-start leading-none", className)}>
      <span className="font-display text-[2.7em] font-black leading-[0.74] text-[var(--brand-3)]">FRY</span>
      {tagline ? (
        <span className="mt-[0.45em] text-[0.56em] font-semibold uppercase tracking-[0.22em] text-fg">
          Street. Food. Pub.
        </span>
      ) : null}
    </span>
  );
}

type Tone = "red" | "kraft" | "mustard" | "cream" | "ink";

const tones: Record<Tone, string> = {
  red: "bg-brand text-brand-ink",
  kraft: "kraft",
  mustard: "bg-brand-2 text-paper-ink",
  cream: "bg-fg text-bg",
  ink: "bg-bg text-fg ring-1 ring-line-strong",
};

/** Наклейка под наклоном: круг, таблетка или ярлык */
export function Sticker({
  tone = "red",
  tilt = -6,
  shape = "pill",
  className,
  children,
}: {
  tone?: Tone;
  tilt?: number;
  shape?: "circle" | "pill" | "tag";
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "sticker",
        shape === "circle" && "aspect-square rounded-full p-[0.6em]",
        shape === "pill" && "rounded-full px-[0.9em] py-[0.5em]",
        shape === "tag" && "rounded-[var(--radius)] px-[0.8em] py-[0.6em]",
        tones[tone],
        className,
      )}
      style={{ "--tilt": `${tilt}deg` } as CSSProperties}
    >
      {children}
    </span>
  );
}

/** Бирдекель FRY: красный круг с кольцевой надписью (паттерн 3 крутит его от скролла) */
export function Coaster({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Подставка под пиво FRY с надписью Street, Food, Pub">
      <defs>
        <path id="coaster-ring" d="M200,200 m-146,0 a146,146 0 1,1 292,0 a146,146 0 1,1 -292,0" />
      </defs>
      <circle cx="200" cy="200" r="199" fill="var(--brand-3)" />
      <circle cx="200" cy="200" r="187" fill="none" stroke="var(--brand-ink)" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" />
      <text className="font-display" fontWeight="900" fontSize="40" letterSpacing="2" fill="var(--brand-ink)">
        <textPath href="#coaster-ring" textLength="905" lengthAdjust="spacing">
          STREET · FOOD · PUB · STREET · FOOD · PUB ·
        </textPath>
      </text>
      <circle cx="200" cy="200" r="114" fill="none" stroke="var(--brand-ink)" strokeWidth="3" />
      <circle cx="200" cy="200" r="104" fill="none" stroke="var(--brand-ink)" strokeOpacity="0.45" strokeWidth="1.5" />
      <text x="200" y="238" textAnchor="middle" className="font-display" fontWeight="900" fontSize="124" fill="var(--brand-ink)">
        FRY
      </text>
      <text x="200" y="274" textAnchor="middle" fontSize="14" fontWeight="600" letterSpacing="6" fill="var(--brand-ink)">
        НОВОСИБИРСК
      </text>
    </svg>
  );
}

const CAP_POINTS = Array.from({ length: 48 }, (_, i) => {
  const a = (Math.PI * i) / 24;
  const r = i % 2 ? 90 : 98;
  return `${(100 + r * Math.cos(a)).toFixed(1)},${(100 + r * Math.sin(a)).toFixed(1)}`;
}).join(" ");

/** Пивная крышка с FRY: ближний план коллажа hero */
export function BottleCap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <polygon points={CAP_POINTS} fill="var(--brand-2)" stroke="#b9820f" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="100" cy="100" r="78" fill="#e9a91c" />
      <circle cx="100" cy="100" r="68" fill="none" stroke="#1a1411" strokeOpacity="0.28" strokeWidth="2" />
      <text x="100" y="126" textAnchor="middle" className="font-display" fontWeight="900" fontSize="72" fill="#b01f17">
        FRY
      </text>
    </svg>
  );
}

/** Звёздочка-разделитель для бегущих строк */
export function Spark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-[0.5em] shrink-0", className)} aria-hidden="true">
      <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" fill="currentColor" />
    </svg>
  );
}
