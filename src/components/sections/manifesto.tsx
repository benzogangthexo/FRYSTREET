import Image from "next/image";

import { Sticker } from "@/components/brand/marks";
import { Container } from "@/components/layout/container";
import { GrowMedia } from "@/components/motion/grow-media";
import { WordReveal } from "@/components/motion/word-reveal";
import { photos } from "@/content/photos";

/** Манифест на красной панели (паттерн 2: слова проявляются от скролла) + фото растёт */
export function Manifesto() {
  return (
    <section aria-labelledby="manifesto-title" className="relative overflow-x-clip bg-brand text-brand-ink">
      <Container className="relative pb-[calc(var(--section-y)*0.7)] pt-[var(--section-y)]">
        <h2 id="manifesto-title" className="t-eyebrow flex items-center gap-3">
          <span className="tabular">01</span>
          <span>Что такое FRY</span>
          <span aria-hidden="true" className="h-px min-w-8 flex-1 bg-[color-mix(in_oklab,var(--brand-ink)_35%,transparent)]" />
        </h2>
        <WordReveal
          as="p"
          className="mt-8 max-w-[18ch] font-display text-[clamp(2.6rem,1.4rem+5.6vw,8rem)] font-black uppercase leading-[0.9]"
          text="Бар во дворе на Ленина. Пиво с кранов, сидр, свои настойки и еда, которую едят руками."
          accent={[12, 13, 14, 15]}
          accentClassName="text-paper-ink"
        />
        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <WordReveal
              as="p"
              className="t-lead max-w-[34ch] md:text-[1.35rem]"
              text="Музыка погромче, во дворе людно. Закрываемся в два ночи, по пятницам и субботам в четыре. Support your local pub."
            />
          </div>
          <div className="flex md:col-span-5 md:justify-end">
            <Sticker tone="cream" tilt={-4} shape="tag" className="text-[clamp(1.2rem,3vw,1.7rem)]">
              Премия 2ГИС 2018 и 2019
            </Sticker>
          </div>
        </div>
      </Container>
      <Container className="pb-[var(--section-y)]">
        <GrowMedia from={0.78} className="aspect-[4/5] rounded-[var(--radius)] bg-bg sm:aspect-[16/10] lg:aspect-[16/8]">
          <Image
            src={photos.neon}
            alt="Неоновая вывеска FRY в новогодней гирлянде, под ней плакаты"
            fill
            quality={75}
            sizes="(min-width: 1440px) 1344px, 94vw"
            placeholder="blur"
            className="object-cover object-[50%_30%]"
          />
        </GrowMedia>
      </Container>
    </section>
  );
}
