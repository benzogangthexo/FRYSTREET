import { Spark } from "@/components/brand/marks";
import { ScrollMarquee } from "@/components/motion/scroll-marquee";

const top = ["Пиво", "Сидр", "Настойки", "Тако", "Буррито", "Фри"];
const bottom = ["Корн-доги", "Путин", "Чуррос", "Кесадилья", "Двор", "До 04:00"];

/** Две ленты навстречу: двигаются только от скролла */
export function Ribbons() {
  return (
    <section aria-label="Коротко о баре" className="relative overflow-x-clip py-10 sm:py-16">
      <div className="-mx-[4%] -rotate-[2.5deg] bg-brand py-2 text-brand-ink shadow-[var(--shadow-soft)] sm:py-3">
        <ScrollMarquee
          items={top}
          direction={-1}
          distance={28}
          separator={<Spark className="mx-[0.35em] text-brand-2" />}
          itemClassName="font-display text-[clamp(2.6rem,9vw,7rem)] font-black uppercase leading-[1.05]"
        />
      </div>
      <div className="kraft -mx-[4%] -mt-2 rotate-[1.5deg] py-2 sm:-mt-3 sm:py-3">
        <ScrollMarquee
          items={bottom}
          direction={1}
          distance={24}
          separator={<Spark className="mx-[0.35em] text-[var(--red-deep)]" />}
          itemClassName="font-display text-[clamp(2.1rem,7vw,5.25rem)] font-black uppercase leading-[1.05]"
        />
      </div>
    </section>
  );
}
