import Image from "next/image";
import type { CSSProperties } from "react";

import { BottleCap, Sticker } from "@/components/brand/marks";
import { Container } from "@/components/layout/container";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { Parallax } from "@/components/motion/parallax";
import { OpenStatus } from "@/components/site/open-status";
import { Button } from "@/components/ui/button";
import { photos } from "@/content/photos";
import { site } from "@/content/site";
import { telHref } from "@/lib/utils";

const delay = (d: string) => ({ "--d": d }) as CSSProperties;

/** Hero: оффер слева сверху, коллаж в 3 плана справа (паттерн 1: слоёный параллакс) */
export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative isolate overflow-x-clip pb-[calc(var(--section-y)*0.55)] pt-6 sm:pt-10">
      <Container className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-12">
        <div className="lg:col-span-7 lg:row-start-1 lg:pt-4">
          <p className="fade-immediate t-eyebrow flex items-center gap-3 text-fg-muted" style={delay("0.05s")}>
            <span aria-hidden="true" className="size-2 rounded-full bg-[var(--red-ink)]" />
            Бар уличной еды · Новосибирск
          </p>
          <MaskReveal
            as="h1"
            id="hero-title"
            immediate
            className="t-hero hero-title mt-5"
            lines={[
              "Тако, фри",
              <>
                и пиво <span className="accent">до</span>
              </>,
              <span key="l3" className="accent">
                двух ночи
              </span>,
            ]}
          />
        </div>

        <div className="relative lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
          <div className="relative mx-auto aspect-[20/21] w-full max-w-[36rem] lg:aspect-auto lg:h-full lg:min-h-[40rem]">
            <Parallax speed={0.3} className="absolute right-0 top-0 h-[82%] w-[70%]">
              <div className="photo-frame h-full rotate-[2.5deg] border-[5px] border-fg shadow-[var(--shadow-lift)] sm:border-[7px]">
                <Image
                  src={photos.heroWall}
                  alt="Стена из плакатов и живых растений в зале FRY"
                  fill
                  preload
                  quality={75}
                  sizes="(min-width: 1440px) 420px, (min-width: 1024px) 29vw, (min-width: 576px) 400px, 70vw"
                  placeholder="blur"
                />
              </div>
            </Parallax>

            <div className="absolute bottom-[3%] left-0 w-[53%]">
              <figure className="kraft -rotate-[5deg] rounded-[var(--radius)] p-2 pb-2.5 shadow-[var(--shadow-lift)] sm:p-3">
                <div className="photo-frame aspect-[4/5] rounded-[calc(var(--radius)-3px)]">
                  <Image
                    src={photos.heroTacos}
                    alt="Три тако с рваной свининой на фирменной бумаге FRY и стакан тёмного пива"
                    fill
                    quality={75}
                    sizes="(min-width: 1440px) 300px, (min-width: 1024px) 21vw, (min-width: 576px) 290px, 52vw"
                    placeholder="blur"
                  />
                </div>
                <figcaption className="mt-2 flex items-baseline justify-between gap-2 font-display text-[clamp(1rem,3.6vw,1.45rem)] font-black uppercase leading-none">
                  <span>Тако BBQ</span>
                  <span className="text-[var(--red-deep)]">FRY</span>
                </figcaption>
              </figure>
            </div>

            <Parallax speed={-0.4} className="pointer-events-none absolute inset-0">
              <Sticker
                tone="mustard"
                shape="circle"
                tilt={-12}
                className="absolute left-[4%] top-[2%] w-[27%] text-[clamp(1.05rem,4.6vw,1.9rem)]"
              >
                Пт-сб
                <br />
                до 04:00
              </Sticker>
              <Sticker tone="red" tilt={7} className="absolute right-[1%] top-[70%] text-[clamp(0.95rem,3.8vw,1.45rem)]">
                Можно с собакой
              </Sticker>
              <BottleCap className="absolute bottom-[1%] right-[22%] w-[18%] rotate-[18deg] drop-shadow-[0_10px_16px_rgb(0_0_0/0.55)]" />
            </Parallax>
          </div>
        </div>

        <div className="lg:col-span-7 lg:row-start-2">
          <p className="fade-immediate t-lead max-w-[36ch]" style={delay("0.35s")}>
            Бар во дворе на Ленина, 6. Пиво с кранов, сидр, свои настойки, корн-доги и фри в фирменной бумаге.
          </p>
          <div className="fade-immediate mt-8 flex flex-wrap items-center gap-3" style={delay("0.45s")}>
            <MagneticButton asChild size="lg">
              <a href="#booking">Забронировать стол</a>
            </MagneticButton>
            <Button asChild variant="outline" size="lg">
              <a href="#menu">Меню и цены</a>
            </Button>
          </div>
          <dl className="fade-immediate mt-10 grid grid-cols-1 gap-5 border-t border-line pt-6 text-[0.95rem] min-[480px]:grid-cols-2 xl:grid-cols-3" style={delay("0.55s")}>
            <div>
              <dt className="t-eyebrow text-fg-muted">Адрес</dt>
              <dd className="mt-2">
                <a href={site.links.yandex} target="_blank" rel="noopener noreferrer" className="underline decoration-line-strong underline-offset-4 hover:decoration-fg">
                  ул. Ленина, 6 к1
                </a>
                <span className="block text-fg-muted">м. Площадь Ленина, 2 минуты</span>
              </dd>
            </div>
            <div>
              <dt className="t-eyebrow text-fg-muted">Сегодня</dt>
              <dd className="mt-2">
                <OpenStatus />
                <span className="block text-fg-muted">Пт и сб до 04:00</span>
              </dd>
            </div>
            <div>
              <dt className="t-eyebrow text-fg-muted">Телефон</dt>
              <dd className="mt-2">
                <a href={telHref(site.phone)} className="tabular underline decoration-line-strong underline-offset-4 hover:decoration-fg">
                  {site.phone}
                </a>
                <span className="block text-fg-muted">Бронь и вопросы</span>
              </dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}
