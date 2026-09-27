"use client";

import { useSyncExternalStore } from "react";

import { bookingConfig } from "@/content/booking";
import { toMinutes, weekday, zonedNow } from "@/lib/booking";
import { cn } from "@/lib/utils";

/** «Открыто до 02:00» по часам заведения (Asia/Novosibirsk), с учётом закрытия после полуночи */
function computeStatus(): string {
  const { date, minutes } = zonedNow(bookingConfig.timeZone);
  const wd = weekday(date);
  const today = bookingConfig.week[wd];
  const prev = bookingConfig.week[(wd + 6) % 7];
  if (prev && toMinutes(prev.close) <= toMinutes(prev.open) && minutes < toMinutes(prev.close)) {
    return `open|Открыто до ${prev.close}`;
  }
  if (today) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);
    if (minutes >= open && (close <= open || minutes < close)) return `open|Открыто до ${today.close}`;
    if (minutes < open) return `closed|Откроемся в ${today.open}`;
  }
  return "closed|Сейчас закрыто";
}

const subscribe = (cb: () => void) => {
  const t = window.setInterval(cb, 60_000);
  return () => window.clearInterval(t);
};

const serverStatus = () => "idle|Каждый день с 14:00";

export function OpenStatus({ className }: { className?: string }) {
  const [state, text] = useSyncExternalStore(subscribe, computeStatus, serverStatus).split("|");
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "size-2 rounded-full",
          state === "open" ? "bg-ok shadow-[0_0_0_4px_color-mix(in_oklab,var(--ok)_22%,transparent)]" : "bg-fg-muted",
        )}
      />
      {text}
    </span>
  );
}
