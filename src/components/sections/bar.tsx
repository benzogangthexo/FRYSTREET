import Image from "next/image";

import { Coaster, Sticker } from "@/components/brand/marks";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/eyebrow";
import { Section } from "@/components/layout/section";
import { ScrollRotate } from "@/components/motion/scroll-rotate";
import { nastoyki } from "@/content/menu";
import { photos } from "@/content/photos";
import { site } from "@/content/site";

/** Бар: бирдекель крутится от скролла (паттерн 3), рядом только подтверждённые факты */
export function Bar() {
  return (
    <Section id="bar" labelledBy="bar-title" className="overflow-x-clip">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="relative order-2 lg:order-1 lg:col-span-5">
            <ScrollRotate from={-60} to={150} scaleFrom={0.88} scaleTo={1.04} className="mx-auto w-[min(80vw,30rem)]">
              <Coaster className="h-auto w-full drop-shadow-[0_30px_40px_rgb(0_0_0/0.45)]" />
            </ScrollRotate>
            <Sticker tone="mustard" tilt={8} className="absolute bottom-[4%] right-[2%] text-[clamp(1.1rem,3.4vw,1.6rem)] sm:right-[8%]">
              Бокал {site.beerPrice}
            </Sticker>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <Eyebrow index="04">Бар</Eyebrow>
            <h2 id="bar-title" className="t-h1 mt-6">
              Крафт, сидр
              <br />
              <span className="text-[var(--red-ink)]">и настойки</span>
            </h2>
            <dl className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line sm:grid-cols-2">
              <div className="bg-bg p-5 sm:p-7">
                <dt className="t-h3">Разливное и крафт</dt>
                <dd className="mt-3 text-fg-muted">
                  Светлое, тёмное, нефильтрованное. Сорта на кранах меняются, бармен подскажет, что налито сегодня.
                </dd>
              </div>
              <div className="bg-bg p-5 sm:p-7">
                <dt className="t-h3">Сидры</dt>
                <dd className="mt-3 text-fg-muted">Вишнёвый сидр гости не раз хвалят в отзывах. Есть и другие вкусы, спросите у стойки.</dd>
              </div>
              <div className="bg-bg p-5 sm:col-span-2 sm:p-7">
                <dt className="t-h3">Свои настойки по 30 мл</dt>
                <dd className="mt-4 grid gap-4 sm:grid-cols-2">
                  <p>
                    <span className="t-eyebrow block text-fg-muted">Сладкие</span>
                    <span className="mt-2 block">{nastoyki.sweet.join(", ")}</span>
                  </p>
                  <p>
                    <span className="t-eyebrow block text-fg-muted">Несладкие</span>
                    <span className="mt-2 block">{nastoyki.dry.join(", ")}</span>
                  </p>
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-fg-muted">Вкусы настоек из меню бара, набор иногда меняется.</p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:mt-24 sm:gap-4 lg:grid-cols-12">
          <figure className="photo-frame col-span-2 aspect-[16/11] lg:col-span-6 lg:aspect-auto lg:h-[34rem]">
            <Image src={photos.taps} alt="Красные пивные краны FRY у стойки" fill quality={75} sizes="(min-width: 1024px) 50vw, 94vw" placeholder="blur" />
          </figure>
          <figure className="photo-frame aspect-[4/5] lg:col-span-3 lg:aspect-auto lg:h-[34rem]">
            <Image src={photos.shots} alt="Стопки разноцветных настоек на стойке" fill quality={75} sizes="(min-width: 1024px) 25vw, 47vw" placeholder="blur" />
          </figure>
          <figure className="photo-frame aspect-[4/5] lg:col-span-3 lg:aspect-auto lg:h-[34rem]">
            <Image src={photos.stout} alt="Стакан тёмного пива на подставке" fill quality={75} sizes="(min-width: 1024px) 25vw, 47vw" placeholder="blur" />
          </figure>
        </div>
      </Container>
    </Section>
  );
}
