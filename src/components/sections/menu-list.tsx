import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/eyebrow";
import { Section } from "@/components/layout/section";
import { FullMenu } from "@/components/sections/full-menu";
import type { MenuResponse } from "@/lib/api/schemas";
import { filterMenu } from "@/lib/menu";

/** Всё меню: первый список рендерится на сервере (виден без JS), фильтры и поиск ходят в /api/menu */
export function MenuList() {
  const items = filterMenu("all", "");
  const initial: MenuResponse = { category: "all", query: "", total: items.length, items };
  const prices = items.filter((i) => i.id !== "sousy" && i.price !== null).map((i) => i.price ?? 0);
  const n = items.length;
  const word = n % 10 === 1 && n % 100 !== 11 ? "позиция" : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? "позиции" : "позиций";
  return (
    <Section id="full-menu" labelledBy="full-menu-title" className="bg-bg-2">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow index="03">Всё меню</Eyebrow>
            <h2 id="full-menu-title" className="t-h1 mt-6">
              {n} {word}
              <br />
              <span className="outline-type">
                {Math.min(...prices)}-{Math.max(...prices)} ₽
              </span>
            </h2>
          </div>
          <p className="t-lead text-fg-muted lg:col-span-4 lg:col-start-9">
            Наведите на блюдо, покажем фото, если оно есть. Соусы по 50 ₽ к чему угодно.
          </p>
        </div>
        <div className="mt-12 sm:mt-16">
          <FullMenu initial={initial} />
        </div>
      </Container>
    </Section>
  );
}
