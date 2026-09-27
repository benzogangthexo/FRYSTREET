import type { CSSProperties } from "react";

import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/eyebrow";
import { Section } from "@/components/layout/section";
import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { reviews } from "@/content/reviews";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const looks = [
  "kraft",
  "bg-fg text-bg",
  "bg-brand text-brand-ink",
  "bg-surface-2 text-fg ring-1 ring-line",
] as const;
const tilts = [-2.2, 1.6, -1.2, 2.4, -1.8, 1.1, -2.6, 1.9];

/** Отзывы: реальные цитаты стикерами под разными углами, рейтинги Яндекса и 2ГИС */
export function Reviews() {
  return (
    <Section id="reviews" labelledBy="reviews-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Eyebrow index="06">Отзывы</Eyebrow>
            <h2 id="reviews-title" className="t-h1 mt-6">
              Что пишут
              <br />
              гости
            </h2>
          </div>
          <dl className="grid grid-cols-2 gap-4 lg:col-span-6">
            <Rating label="Яндекс Карты" href={site.links.yandex} value={site.ratings.yandex.value} count={site.ratings.yandex.count} />
            <Rating label="2ГИС" href={site.links.twoGis} value={site.ratings.twoGis.value} count={site.ratings.twoGis.count} />
          </dl>
        </div>

        <ul className="mt-14 columns-1 gap-5 sm:mt-20 sm:columns-2 lg:columns-3 lg:gap-7">
          {reviews.map((r, i) => (
            <li key={r.id} className="mb-5 break-inside-avoid px-1 py-2 lg:mb-7">
              <Reveal delay={(i % 3) * 0.06}>
                <figure
                  className={cn("rotate-[var(--tilt)] rounded-[var(--radius)] p-6 shadow-[var(--shadow-sticker)] sm:p-7", looks[i % looks.length])}
                  style={{ "--tilt": `${tilts[i % tilts.length]}deg` } as CSSProperties}
                >
                  <blockquote className={cn(r.text.length < 40 ? "font-display text-[2.6rem] font-black uppercase leading-[0.9]" : "text-[1.05rem] leading-relaxed")}>
                    <p>{r.text}</p>
                  </blockquote>
                  <figcaption className="mt-5 flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold">{r.author}</span>
                    <span className="opacity-80">
                      {r.source}, {r.date}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function Rating({ label, href, value, count }: { label: string; href: string; value: number; count: number }) {
  return (
    <div className="rounded-[var(--radius)] border border-line bg-surface p-5 sm:p-6">
      <dt className="t-eyebrow text-fg-muted">{label}</dt>
      <dd className="mt-3">
        <span className="block font-display text-[clamp(3.6rem,2.4rem+5vw,6.5rem)] font-black leading-[0.8] text-fg">
          <Counter value={value} decimals={1} />
        </span>
        <a href={href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center text-sm text-fg-muted underline decoration-line-strong underline-offset-4 hover:text-fg">
          {count} оценок
        </a>
      </dd>
    </div>
  );
}
