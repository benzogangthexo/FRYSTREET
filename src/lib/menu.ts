import { menu, type MenuCategoryId, type MenuItem } from "@/content/menu";

/* Фильтр меню: общий для /api/menu и клиента (скелетон строит ровно столько строк, сколько вернёт API) */

export type MenuFilter = "all" | MenuCategoryId;

const normalize = (s: string) => s.toLowerCase().replaceAll("ё", "е").trim();

export function filterMenu(category: MenuFilter, query = ""): MenuItem[] {
  const q = normalize(query);
  return menu.filter((item) => {
    if (category !== "all" && item.category !== category) return false;
    if (!q) return true;
    return normalize(`${item.name} ${item.description ?? ""}`).includes(q);
  });
}

export const menuKey = (category: MenuFilter, query: string) => `${category}|${normalize(query)}`;
