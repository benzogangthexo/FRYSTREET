"use client";

import { RotateCw, Search, X } from "lucide-react";
import { useEffect, useId, useMemo, useState, type ReactNode } from "react";

import { HoverImageList, type HoverImageItem } from "@/components/motion/hover-image-list";
import { Button } from "@/components/ui/button";
import { FilterChips } from "@/components/ui/filter-chips";
import { formatMenuPrice, menuCategories, type MenuItem } from "@/content/menu";
import { menuPhotos } from "@/content/photos";
import { useResource } from "@/hooks/use-resource";
import type { MenuResponse } from "@/lib/api/schemas";
import { filterMenu, menuKey, type MenuFilter } from "@/lib/menu";
import { cn } from "@/lib/utils";

const ROW = "min-h-[5.5rem] items-center gap-4 py-4 sm:gap-6";

const Disk = () => (
  <span className="fry-disk grid size-full place-items-center rounded-[calc(var(--radius)-4px)] bg-brand font-display text-lg font-black text-brand-ink">
    FRY
  </span>
);

function Title({ item }: { item: MenuItem }) {
  return (
    <span className="font-display text-[clamp(1.35rem,1.1rem+0.9vw,1.9rem)] font-extrabold uppercase leading-none">
      {item.name}
      {item.unit ? <span className="ml-2 align-middle font-sans text-xs font-semibold normal-case text-fg-muted">{item.unit}</span> : null}
    </span>
  );
}

function Price({ price }: { price: number | null }) {
  return price === null ? (
    <span className="text-sm text-fg-muted">{formatMenuPrice(price)}</span>
  ) : (
    <span className="price text-[clamp(1.5rem,1.2rem+1vw,2.1rem)] leading-none text-[var(--red-ink)]">{formatMenuPrice(price)}</span>
  );
}

const toRows = (items: MenuItem[]): HoverImageItem[] =>
  items.map((item) => {
    const photo = item.photo ? menuPhotos[item.photo] : undefined;
    return {
      id: item.id,
      title: <Title item={item} />,
      meta: <span className="line-clamp-2 text-[0.92rem] leading-snug">{item.description}</span>,
      aside: <Price price={item.price} />,
      image: photo?.src,
      alt: photo?.alt,
      cursorLabel: "Фото",
    };
  });

/** Скелетон строит те же строки из тех же данных: текст прозрачный, геометрия совпадает до пикселя */
function SkeletonList({ items }: { items: MenuItem[] }) {
  return (
    <ul className="border-t border-line" aria-hidden="true">
      {items.map((item) => (
        <li key={item.id} className="border-b border-line">
          <div className={cn("flex w-full", ROW)}>
            <span className="hover-thumb skeleton size-16 shrink-0 sm:size-20" />
            <span className="min-w-0 flex-1">
              <span className="block">
                <span className="skel-text">
                  <Title item={item} />
                </span>
              </span>
              <span className="mt-1 block">
                <span className="skel-text line-clamp-2 text-[0.92rem] leading-snug">{item.description}</span>
              </span>
            </span>
            <span className="shrink-0 text-right">
              <span className="skel-text">
                <Price price={item.price} />
              </span>
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Columns({ items, render }: { items: MenuItem[]; render: (part: MenuItem[]) => ReactNode }) {
  const half = Math.ceil(items.length / 2);
  return (
    <div className="grid gap-x-12 lg:grid-cols-2">
      <div>{render(items.slice(0, half))}</div>
      {items.length > half ? <div className="-mt-px lg:mt-0">{render(items.slice(half))}</div> : null}
    </div>
  );
}

/** Всё меню: /api/menu (zod, задержка), фильтр-чипы, поиск; loading/empty/error+retry; фото за курсором (паттерн 4) */
export function FullMenu({ initial }: { initial: MenuResponse }) {
  const [category, setCategory] = useState<MenuFilter>("all");
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const searchId = useId();

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(query), 280);
    return () => window.clearTimeout(t);
  }, [query]);

  const key = menuKey(category, debounced);
  const expected = useMemo(() => filterMenu(category, debounced), [category, debounced]);

  const res = useResource<MenuResponse>(
    key,
    async (signal) => {
      // zod и API-клиент грузятся при первом запросе: на старте страницы их JS не нужен
      const [{ apiFetch }, { MenuResponseSchema }] = await Promise.all([import("@/lib/api/client"), import("@/lib/api/schemas")]);
      return apiFetch(`/api/menu?category=${category}&q=${encodeURIComponent(debounced)}`, {
        schema: MenuResponseSchema,
        signal,
        retries: 1,
      });
    },
    { initial: { key: menuKey("all", ""), data: initial }, isEmpty: (d) => d.items.length === 0 },
  );

  const options = useMemo(
    () => [
      { id: "all" as MenuFilter, label: "Всё", count: filterMenu("all", debounced).length },
      ...menuCategories.map((c) => ({ id: c.id as MenuFilter, label: c.label, count: filterMenu(c.id, debounced).length })),
    ],
    [debounced],
  );

  const reset = () => {
    setQuery("");
    setDebounced("");
    setCategory("all");
  };

  const statusText =
    res.status === "loading"
      ? "Загружаем меню"
      : res.status === "error"
        ? "Меню не загрузилось"
        : res.status === "empty"
          ? "Ничего не нашли"
          : `Позиций: ${res.data?.items.length ?? 0}`;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <FilterChips options={options} value={category} onChange={setCategory} label="Раздел меню" />
        <div className="relative w-full lg:max-w-xs">
          <label htmlFor={searchId} className="sr-only">
            Найти блюдо
          </label>
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-fg-muted" />
          <input
            id={searchId}
            type="search"
            inputMode="search"
            autoComplete="off"
            maxLength={40}
            placeholder="Найти: сыр, курица, чуррос"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="field h-12 w-full rounded-[var(--radius-pill)] pl-11 pr-12"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Очистить поиск"
              className="absolute right-0.5 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full text-fg-muted hover:text-fg"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          ) : null}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {statusText}
      </p>

      <div className="mt-8" aria-busy={res.status === "loading"}>
        {res.status === "loading" || res.status === "idle" ? (
          <Columns items={expected.length ? expected : filterMenu("all", "").slice(0, 4)} render={(part) => <SkeletonList items={part} />} />
        ) : res.status === "error" ? (
          <div role="alert" className="grid place-items-start gap-4 rounded-[var(--radius)] border border-line-strong bg-surface p-6 sm:p-10">
            <p className="t-h3">Меню не загрузилось</p>
            <p className="max-w-[46ch] text-fg-muted">{res.error?.message ?? "Проверьте интернет и попробуйте ещё раз."} Цены и состав всегда можно спросить у бара.</p>
            <Button onClick={res.retry} variant="primary">
              <RotateCw aria-hidden="true" />
              Повторить
            </Button>
          </div>
        ) : res.status === "empty" ? (
          <div className="grid place-items-start gap-4 rounded-[var(--radius)] border border-dashed border-line-strong p-6 sm:p-10">
            <p className="t-h3">По запросу «{debounced}» ничего</p>
            <p className="max-w-[46ch] text-fg-muted">Попробуйте другое слово или посмотрите меню целиком.</p>
            <Button onClick={reset} variant="outline">
              Показать всё меню
            </Button>
          </div>
        ) : (
          <Columns
            items={res.data?.items ?? []}
            render={(part) => (
              <HoverImageList
                items={toRows(part)}
                rowClassName={ROW}
                placeholder={<Disk />}
                previewClassName="h-[17rem] w-[13.5rem] rounded-[var(--radius)] border-[5px] border-fg"
              />
            )}
          />
        )}
      </div>
      <p className="mt-6 text-sm text-fg-muted">Цены по меню весны 2026 года. Меню иногда меняется, свежее всегда у бара.</p>
    </div>
  );
}
