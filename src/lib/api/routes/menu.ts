import { fail, flaky, invalid, latency, ok } from "@/lib/api/http";
import { MENU_CATEGORY_IDS, MenuQuerySchema, type MenuResponse } from "@/lib/api/schemas";
import { filterMenu, type MenuFilter } from "@/lib/menu";

const isFilter = (v: string): v is MenuFilter => v === "all" || (MENU_CATEGORY_IDS as readonly string[]).includes(v);

/** GET /api/menu?category=fries&q=сыр : 200 со списком (в том числе пустым), 404 нет категории, 422 кривой запрос, 503 сбой */
export async function GET(req: Request) {
  const params = Object.fromEntries(new URL(req.url).searchParams);
  const parsed = MenuQuerySchema.safeParse(params);
  if (!parsed.success) return invalid(parsed.error);
  const { category, q } = parsed.data;

  await latency(320, 820);
  if (flaky(req)) return fail(503, "unavailable", "Меню не загрузилось");
  if (!isFilter(category)) return fail(404, "unknown_category", "Такого раздела в меню нет");

  const items = filterMenu(category, q);
  const body: MenuResponse = { category, query: q, total: items.length, items };
  return ok(body);
}
