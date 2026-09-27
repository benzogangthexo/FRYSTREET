# FRY Street Food Pub

Сайт бара уличной еды FRY (Новосибирск, ул. Ленина, 6 к1). Концепция «Улица внутри»: почти чёрный фон, красный FRY плоскостями, крафт лотков, огромная узкая типографика, стикеры.

Next.js 16 (App Router, Turbopack) · TypeScript strict · Tailwind v4 · shadcn/ui · motion · Lenis · zod.

## Запуск

```bash
pnpm i
pnpm dev                     # http://localhost:3000
pnpm build && pnpm start     # прод-сборка
pnpm lint
```

Переменные окружения: скопируйте `.env.example` в `.env.local` и укажите `NEXT_PUBLIC_SITE_URL` (canonical, Open Graph, JSON-LD).

Если pnpm пытается скачать свою версию из `packageManager` и нет сети, добавьте `npm_config_manage_package_manager_versions=false` перед командой.

## Где что лежит

```
src/
  app/
    page.tsx               страница: прелоадер, шапка, секции, футер, нижняя панель брони
    layout.tsx             шрифты (next/font/local), метаданные, JSON-LD BarOrPub
    globals.css            токены бренда (:root), типографика, стикеры, прелоадер
    icon.svg, opengraph-image.jpg
    api/menu               GET ?category=&q= : zod, задержка, 200/404/422/503
    api/slots, api/slots/hold, api/booking   бронь (шаблон)
  content/                 ВЕСЬ КОНТЕНТ: правьте здесь
    site.ts                адрес, телефон, часы, ссылки, рейтинги
    menu.ts                меню и цены, соусы, настойки
    reviews.ts             отзывы
    booking.ts             часы брони, зона Asia/Novosibirsk, шаги мастера
    photos.ts              фото и подписи
  components/
    sections/              hero, ribbons, manifesto, menu-trays, menu-list, full-menu, bar, yard, reviews, booking
    site/                  шапка, меню-шторка, футер, статус «Открыто до»
    brand/marks.tsx        вордмарк FRY, стикеры, бирдекель, крышка
    motion/                параллакс, проявление слов, вращение, sticky-stack, превью за курсором и др.
    booking/               мастер брони и его ленивая загрузка
  lib/                     menu.ts (общий фильтр), booking.ts (слоты), api/ (DTO, клиент, http)
  assets/photos/           обработанные фото (scripts/photos.py)
```

- Цены меню: `src/content/menu.ts`. `price: null` показывает «цена у бара».
- Часы работы: `src/content/site.ts` (витрина) и `src/content/booking.ts` (слоты брони), меняйте вместе.
- Фото: исходники и оценки в `PHOTOS.md`, обработка `python3 scripts/photos.py`.
- Решения и спорные факты: `DECISIONS.md`.

## Проверка

```bash
pnpm build && pnpm start -p 3103
node scripts/qa.mjs http://localhost:3103 --shots=375,1440 --frames=8   # 10 ширин: скролл, наложения, тач-таргеты, обрезка
node scripts/qa.mjs http://localhost:3103 --reduced                     # без анимаций
node scripts/qa.mjs http://localhost:3103 --nojs                        # без JS
```

`?chaos=1` в адресе страницы включает случайные сбои API, чтобы увидеть состояния ошибки и повтора в меню и брони.

## GitHub Pages (статическая версия, бесплатный хостинг)
- Адрес: https://benzogangthexo.github.io/FRYSTREET/
- Собрать заново: `pnpm build:pages` (результат в `docs/`, закоммитить и запушить). Запись, фильтры и меню работают прямо в браузере теми же обработчиками API (`src/lib/api/local.ts`), фото заранее нарезаны в WebP под все ширины экрана.
- Включить один раз: Settings -> Pages -> Build and deployment: Deploy from a branch -> ветка `claude/sleepy-brahmagupta-jy6nfi` (или `main` после слияния PR) -> папка `/docs` -> Save.
- Полная версия с сервером (заявки уходят на бэкенд): `pnpm build && pnpm start` или Vercel.
