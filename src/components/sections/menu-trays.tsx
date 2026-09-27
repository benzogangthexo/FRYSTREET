import type { StaticImageData } from "next/image";
import Image from "next/image";

import { Spark } from "@/components/brand/marks";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/eyebrow";
import { Section } from "@/components/layout/section";
import { StickyStack } from "@/components/motion/sticky-stack";
import { formatMenuPrice, menu, sauces, type MenuItem } from "@/content/menu";
import { photos } from "@/content/photos";
import { cn } from "@/lib/utils";

type Tray = {
  id: string;
  title: string;
  note: string;
  items: string[];
  photo?: { src: StaticImageData; alt: string };
};

const trays: Tray[] = [
  {
    id: "fries",
    title: "Фри и путин",
    note: "Картошка в трёх вкусах и путин с мясом",
    items: ["fri-klassik", "chiz-fri", "putin-bbq", "putin-bekon"],
    photo: { src: photos.friesLoaded, alt: "Фри с мясом, сыром и зеленью в лотке на бумаге FRY" },
  },
  {
    id: "tortilla",
    title: "В тортилье",
    note: "Буррито, плескавица, кесадилья и ролл",
    items: ["burrito-vurst", "pleskavica", "kesadilya", "chiken-roll"],
    photo: { src: photos.heroTacos, alt: "Тако с рваной свининой и зеленью на бумаге FRY" },
  },
  {
    id: "dogs",
    title: "Доги и бургер",
    note: "Фирменная колбаска, стрипсы и Фрайбургер",
    items: ["frayburger", "chiken-strips", "grand-master-dog", "korn-dog"],
    photo: { src: photos.burger, alt: "Фрайбургер с рваной свининой в фирменной обёртке FRY" },
  },
  {
    id: "snacks",
    title: "К пиву",
    note: "Закуски и соусы по 50 ₽",
    items: ["syrnye-palochki", "lukovye-kolca", "chechil-fri", "grenki"],
  },
];

const byId = new Map(menu.map((m) => [m.id, m]));
const pick = (ids: string[]) => ids.map((id) => byId.get(id)).filter((m): m is MenuItem => Boolean(m));

/** Меню-лотки: наезжающие карточки (паттерн 5). Карточка влезает в 100svh минус отступ сверху даже на 320x568 */
export function MenuTrays() {
  return (
    <Section id="menu" labelledBy="menu-title">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow index="02">Меню</Eyebrow>
            <h2 id="menu-title" className="t-h1 mt-6">
              Едят руками,
              <br />
              запивают пивом
            </h2>
          </div>
          <p className="t-lead text-fg-muted lg:col-span-4 lg:col-start-9">
            Всё отдаём в крафтовых лотках на фирменной бумаге FRY. Здесь главное, полный список с ценами ниже.
          </p>
        </div>

        <StickyStack className="mt-12 sm:mt-16" top="clamp(0.75rem, 3svh, 2.5rem)" step={12} shrink={0.04}>
          {trays.map((tray, i) => (
            <TrayCard key={tray.id} tray={tray} index={i} total={trays.length} />
          ))}
        </StickyStack>
      </Container>
    </Section>
  );
}

function TrayCard({ tray, index, total }: { tray: Tray; index: number; total: number }) {
  const items = pick(tray.items);
  const red = !tray.photo;
  return (
    <article
      aria-labelledby={`tray-${tray.id}`}
      className={cn(
        "grid h-[min(40rem,calc(100svh-5.5rem-var(--mobile-cta-h)))] grid-rows-[minmax(0,1fr)_auto] overflow-hidden rounded-[var(--radius)] shadow-[var(--shadow-lift)] md:h-[min(40rem,calc(100svh-5.5rem))] md:grid-cols-12 md:grid-rows-1",
        red ? "bg-brand text-brand-ink" : "kraft",
      )}
    >
      {tray.photo ? (
        <div className="photo-frame m-2 md:col-span-5 md:m-3">
          <Image
            src={tray.photo.src}
            alt={tray.photo.alt}
            fill
            quality={75}
            sizes="(min-width: 1440px) 560px, (min-width: 768px) 40vw, 94vw"
            placeholder="blur"
          />
        </div>
      ) : (
        <div className="m-2 flex min-h-0 flex-col justify-center overflow-hidden rounded-[calc(var(--radius)-2px)] bg-[color-mix(in_oklab,black_16%,var(--brand))] p-4 md:col-span-5 md:m-3 md:p-8">
          <p className="t-eyebrow">Соусы, 30 г</p>
          <ul className="mt-3 flex flex-wrap gap-1.5 md:mt-5 md:gap-2" aria-label="Соусы">
            {sauces.map((s, i) => (
              <li
                key={s}
                className="sticker rounded-full bg-brand-ink px-2.5 py-1 text-[clamp(0.9rem,2.6vw,1.35rem)] text-paper-ink"
                style={{ "--tilt": `${(i % 3) * 3 - 3}deg` } as React.CSSProperties}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex min-h-0 flex-col px-4 pb-3 pt-2 sm:px-7 sm:pb-6 md:col-span-7 md:py-9 md:pl-6 md:pr-10 lg:pl-10">
        <div className="t-eyebrow flex items-center justify-between gap-4 opacity-80">
          <span className="tabular">
            Лоток {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
          <span className="hidden sm:inline">{tray.note}</span>
        </div>
        <h3 id={`tray-${tray.id}`} className="mt-1 font-display text-[clamp(2.4rem,1.6rem+4vw,6rem)] font-black uppercase leading-[0.86] md:mt-4">
          {tray.title}
        </h3>
        <ul className="mt-3 md:mt-auto">
          {items.map((it) => (
            <li
              key={it.id}
              className="flex items-baseline gap-3 border-t border-[color-mix(in_oklab,currentColor_22%,transparent)] py-[clamp(0.3rem,1.1svh,0.85rem)]"
            >
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[clamp(1.2rem,1rem+1vw,1.9rem)] font-extrabold uppercase leading-[1.02]">{it.name}</span>
                <span className="mt-1 hidden text-[0.9rem] leading-snug opacity-80 md:block">{it.description}</span>
              </span>
              <span className={cn("price text-[clamp(1.35rem,1.1rem+1.2vw,2.2rem)] leading-none", !red && "text-[var(--red-deep)]")}>
                {formatMenuPrice(it.price)}
              </span>
            </li>
          ))}
        </ul>
        {red ? null : (
          <a
            href="#full-menu"
            className="mt-2 hidden h-[3.25rem] items-center gap-2 self-start text-sm font-semibold underline decoration-[color-mix(in_oklab,currentColor_35%,transparent)] underline-offset-4 md:inline-flex"
          >
            <Spark className="text-[var(--red-deep)]" />
            Всё меню с ценами
          </a>
        )}
      </div>
    </article>
  );
}
