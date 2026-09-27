"use client";

import { animate, inView, scroll } from "motion";
import { useEffect, type RefObject } from "react";

export type ScrollOffset = NonNullable<NonNullable<Parameters<typeof scroll>[1]>["offset"]>;
export type Keyframes = Record<string, string[] | number[]>;

/**
 * Запуск после загрузки, когда поток свободен: скролл-анимации ниже сгиба не нужны
 * в первом кадре, а их настройка (замеры, WAAPI) иначе попадает в TBT на телефоне.
 */
export function onIdle(fn: () => void): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(fn, { timeout: 1500 });
    return () => window.cancelIdleCallback(id);
  }
  const t = window.setTimeout(fn, 300);
  return () => window.clearTimeout(t);
}

export const motionAllowed = () =>
  typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Анимация, привязанная к скроллу (scroll + animate из motion: где можно, идёт через
 * нативный ScrollTimeline на композиторе). SSR и reduced-motion: элемент статичен.
 * keyframes/offset/times сериализуются в ключ, поэтому их можно передавать литералами.
 */
export function useScrollAnim(
  ref: RefObject<Element | null>,
  keyframes: Keyframes | null,
  options: { target?: RefObject<Element | null>; offset?: ScrollOffset; times?: number[]; eager?: boolean } = {},
) {
  const { target, eager = false } = options;
  const key = JSON.stringify([keyframes, options.offset ?? null, options.times ?? null]);
  useEffect(() => {
    const el = ref.current;
    const [frames, offset, times] = JSON.parse(key) as [Keyframes | null, ScrollOffset | null, number[] | null];
    if (!el || !frames || !motionAllowed()) return;
    let controls: ReturnType<typeof animate> | undefined;
    let stop: (() => void) | undefined;
    const start = () => {
      controls = animate(el, frames, { ease: "linear", duration: 1, ...(times ? { times } : {}) });
      stop = scroll(controls, { target: target?.current ?? el, ...(offset ? { offset } : {}) });
    };
    let cancel: (() => void) | undefined;
    if (eager) start();
    else cancel = onIdle(start);
    return () => {
      cancel?.();
      stop?.();
      controls?.stop();
    };
  }, [ref, target, key, eager]);
}

/**
 * Появление при входе в экран, только если элемент изначально ниже сгиба.
 * Сервер и первый кадр: контент видим (без JS, для LCP и SEO).
 */
export function useRevealOnView(
  ref: RefObject<HTMLElement | null>,
  from: Keyframes,
  to: Keyframes,
  options: { delay?: number; duration?: number; amount?: number } = {},
) {
  const { delay = 0, duration = 1.1, amount = 0.25 } = options;
  const key = JSON.stringify([from, to]);
  useEffect(() => {
    const el = ref.current;
    if (!el || !motionAllowed()) return;
    let initial: ReturnType<typeof animate> | undefined;
    let stop: (() => void) | undefined;
    const cancel = onIdle(() => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
      const [start, end] = JSON.parse(key) as [Keyframes, Keyframes];
      initial = animate(el, start, { duration: 0 });
      stop = inView(
        el,
        () => {
          animate(el, end, { duration, delay, ease: [0.16, 1, 0.3, 1] });
        },
        { amount },
      );
    });
    return () => {
      cancel();
      initial?.stop();
      stop?.();
    };
  }, [ref, key, delay, duration, amount]);
}
