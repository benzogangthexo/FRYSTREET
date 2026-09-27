import type { StaticImageData } from "next/image";
import Image from "next/image";

import { Sticker } from "@/components/brand/marks";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/eyebrow";
import { Section } from "@/components/layout/section";
import { DrawOnScroll } from "@/components/motion/draw-path";
import { Reveal } from "@/components/motion/reveal";
import { photos } from "@/content/photos";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type Tile = { src: StaticImageData; alt: string; label: string; className: string; sizes: string; position?: string };

const tiles: Tile[] = [
  {
    src: photos.yardCrowd,
    alt: "Двор FRY днём: круглая вывеска Street Food Pub и гости у высоких столов",
    label: "Двор днём",
    className: "row-span-2 lg:col-span-4",
    sizes: "(min-width: 1024px) 33vw, 47vw",
  },
  {
    src: photos.veranda,
    alt: "Павильон FRY с граффити и красными бочками-столами во дворе",
    label: "Веранда",
    className: "lg:col-span-5",
    sizes: "(min-width: 1024px) 42vw, 47vw",
  },
  {
    src: photos.corndogYard,
    alt: "Корн-дог в руке на фоне павильона и гирлянд",
    label: "Навынос",
    className: "lg:col-span-3 lg:row-span-2",
    sizes: "(min-width: 1024px) 25vw, 47vw",
    position: "50% 35%",
  },
  {
    src: photos.gig,
    alt: "Живой концерт во дворе FRY: вокалист и толпа гостей",
    label: "Живой звук",
    className: "col-span-2 lg:col-span-5",
    sizes: "(min-width: 1024px) 42vw, 94vw",
    position: "50% 30%",
  },
  {
    src: photos.hall,
    alt: "Зал FRY вечером: барная стойка, столы и экраны с меню",
    label: "Зал",
    className: "lg:col-span-6",
    sizes: "(min-width: 1024px) 50vw, 47vw",
  },
  {
    src: photos.yardNight,
    alt: "Двор FRY ночью: гости у павильона под синей подсветкой",
    label: "После полуночи",
    className: "lg:col-span-6",
    sizes: "(min-width: 1024px) 50vw, 47vw",
  },
];

const badges = ["Летняя веранда", "Можно с собакой", "Еда навынос", "Диджеи и живой звук", "Wi-Fi"];

/** Двор: мозаика фото (референс tender) и схема-чертёж от метро (линии дорисовываются от скролла) */
export function Yard() {
  return (
    <Section id="yard" labelledBy="yard-title" className="bg-bg-2">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Eyebrow index="05">Двор</Eyebrow>
            <h2 id="yard-title" className="t-h1 mt-6">
              Двор
              <br />
              с верандой
            </h2>
            <p className="t-lead mt-6 max-w-[40ch] text-fg-muted">
              Павильон FRY стоит во дворе на Ленина, 6, от метро две минуты. Летом столы выносим на улицу, по вечерам диджеи, бывает живой звук. Внутри стойка, несколько столов и стена плакатов.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Что есть в FRY">
              {badges.map((b, i) => (
                <li key={b}>
                  <Sticker tone={i === 1 ? "red" : i === 0 ? "mustard" : "ink"} tilt={i % 2 ? 3 : -3} className="text-[1.15rem] sm:text-[1.3rem]">
                    {b}
                  </Sticker>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <DrawOnScroll offset={["start 0.95", "end 0.55"]}>
              <svg viewBox="0 0 360 290" className="h-auto w-full" role="img" aria-label="Схема: от метро Площадь Ленина 200 метров до двора на Ленина, 6 к1">
                <defs>
                  <pattern id="yard-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M20 0H0V20" fill="none" stroke="var(--line)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="360" height="290" fill="url(#yard-grid)" />
                <path data-draw d="M10 70H350" stroke="var(--fg)" strokeWidth="3" fill="none" />
                <path data-draw d="M10 84H350" stroke="var(--fg-muted)" strokeWidth="1" fill="none" />
                <text x="236" y="58" fill="var(--fg-muted)" fontSize="13" fontWeight="600" letterSpacing="2">
                  УЛ. ЛЕНИНА
                </text>
                <circle cx="62" cy="77" r="17" fill="var(--bg-2)" stroke="var(--red-ink)" strokeWidth="2.5" />
                <text x="62" y="83" textAnchor="middle" fill="var(--red-ink)" fontSize="17" fontWeight="700">
                  М
                </text>
                <text x="20" y="40" fill="var(--fg)" fontSize="14" fontWeight="600">
                  Площадь Ленина
                </text>
                <path
                  data-draw
                  d="M62 96V160Q62 176 78 176H232Q248 176 248 192V204"
                  stroke="var(--brand-2)"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                  fill="none"
                  strokeLinecap="round"
                />
                <text x="84" y="166" fill="var(--brand-2)" fontSize="14" fontWeight="600">
                  200 м · 2 минуты
                </text>
                <path data-draw d="M178 206H318V272H178Z" stroke="var(--fg)" strokeWidth="2" fill="none" />
                <path data-draw d="M186 214H310V264H186Z" stroke="var(--line-strong)" strokeWidth="1" fill="none" />
                <text x="248" y="248" textAnchor="middle" className="font-display" fontSize="34" fontWeight="900" fill="var(--red-ink)">
                  FRY
                </text>
                <text x="20" y="232" fill="var(--fg-muted)" fontSize="13">
                  Ленина, 6 к1
                </text>
                <text x="20" y="252" fill="var(--fg-muted)" fontSize="13">
                  павильон во дворе
                </text>
              </svg>
            </DrawOnScroll>
            <a
              href={site.links.route}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex h-11 items-center gap-2 text-sm font-semibold text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg"
            >
              Построить маршрут в Яндекс Картах
            </a>
          </div>
        </div>

        <ul className="mt-14 grid auto-rows-[9.5rem] grid-cols-2 gap-2.5 sm:mt-20 sm:auto-rows-[13rem] sm:gap-4 lg:auto-rows-[15rem] lg:grid-cols-12">
          {tiles.map((t, i) => (
            <li key={t.label} className={cn("relative", t.className)}>
              <Reveal delay={(i % 3) * 0.08} className="photo-frame h-full">
                <Image
                  src={t.src}
                  alt={t.alt}
                  fill
                  quality={75}
                  sizes={t.sizes}
                  placeholder="blur"
                  style={t.position ? { objectPosition: t.position } : undefined}
                />
                <span className="t-eyebrow absolute bottom-2 left-2 rounded-full bg-bg px-3 py-1.5 text-fg sm:bottom-3 sm:left-3">{t.label}</span>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
