/*
 * Меню FRY с ценами. Источник: фото «FRY MENU» с Яндекс Карт (y049, март 2026, самая свежая версия),
 * сверено с крафтовым меню мая 2025 (y050) по составу и описаниям.
 * Где цифру на фото нельзя прочитать уверенно, price = null: на сайте «цена у бара».
 */

export const menuCategories = [
  { id: "fries", label: "Фри и путин" },
  { id: "tortilla", label: "В тортилье" },
  { id: "dogs", label: "Доги и бургер" },
  { id: "snacks", label: "К пиву" },
  { id: "sweet", label: "Чуррос и соусы" },
] as const;

export type MenuCategoryId = (typeof menuCategories)[number]["id"];

/** Ключ фото блюда: только если на фото именно это блюдо */
export type MenuPhotoKey = "fries" | "friesLoaded" | "tacos" | "quesadilla" | "burger" | "corndog";

export type MenuItem = {
  id: string;
  category: MenuCategoryId;
  name: string;
  description?: string;
  price: number | null;
  unit?: string;
  photo?: MenuPhotoKey;
};

export const menu: MenuItem[] = [
  { id: "fri-klassik", category: "fries", name: "Фри классик", description: "Щедрая порция на выбор: с зеленью, сырная или BBQ", price: 290, photo: "fries" },
  { id: "chiz-fri", category: "fries", name: "Чиз фри", description: "Фри с двумя сырными соусами, гаудой и сырными читос", price: 390 },
  { id: "chorizo-fri", category: "fries", name: "Чоризо фри", description: "Фри со слайсами пряных колбасок в сырном соусе", price: 450 },
  { id: "putin-bbq", category: "fries", name: "Путин со свининой BBQ", description: "Фри, рваная свинина, халапеньо, соус BBQ и соус FRY", price: 450, photo: "friesLoaded" },
  { id: "putin-bekon", category: "fries", name: "Путин с беконом", description: "Фри, копчёная грудинка, коул слоу, сырный соус и сыр", price: 490 },

  { id: "burrito-vurst", category: "tortilla", name: "Буррито вурст", description: "Две сочные колбаски, сыр, фри и фирменный соус", price: 530 },
  { id: "pleskavica", category: "tortilla", name: "Плескавица", description: "Почти как та самая, но в тортилье", price: 450 },
  { id: "kesadilya", category: "tortilla", name: "Кесадилья с курицей и грибами", description: "Лепёшка с гриля, копчёная курица, шампиньоны и сыр в пикантном соусе", price: 390, photo: "quesadilla" },
  { id: "chiken-roll", category: "tortilla", name: "Чикен ролл", description: "Шава с копчёной курицей, сыром, фирменным соусом и коул слоу", price: 350 },
  { id: "tako-bbq", category: "tortilla", name: "Тако BBQ", description: "Подкопчённая рваная свинина, соус FRY, красная фасоль, маринованный и жареный лук", price: null, photo: "tacos" },

  { id: "frayburger", category: "dogs", name: "Фрайбургер", description: "Рваная свинина, криспи бекон, томат и маринованный огурчик", price: 550, photo: "burger" },
  { id: "chiken-strips", category: "dogs", name: "Чикен стрипс", description: "Куриные стрипсы с чесночной фри и соусом FRY", price: 590 },
  { id: "grand-master-dog", category: "dogs", name: "Гранд мастер-дог", description: "Фирменная колбаска, морковь по-корейски и огурчики под сырной шапкой", price: 430 },
  { id: "korn-dog", category: "dogs", name: "Корн дог", description: "Сосиска с тянущимся сыром в хрустящей панировке", price: 230, photo: "corndog" },

  { id: "syrnye-palochki", category: "snacks", name: "Сырные палочки", description: "Моцарелла в панировке", price: 350 },
  { id: "lukovye-kolca", category: "snacks", name: "Луковые кольца", description: "В панировке", price: 250 },
  { id: "chechil-fri", category: "snacks", name: "Чечил фри", description: "Сыр-косичка из пивнухи, только моднее", price: 190 },
  { id: "grenki", category: "snacks", name: "Чесночные гренки", description: "Чесночный бро для твоего пивка", price: 150 },
  { id: "myasnye-sneki", category: "snacks", name: "Мясные снеки", description: "Свинина", price: 250, unit: "50\u00a0г" },
  { id: "arahis", category: "snacks", name: "Арахис", description: "С солью или перцем чили", price: 150 },
  { id: "fraychips", category: "snacks", name: "Фрайчипс", description: "BBQ или сырные", price: null, unit: "30\u00a0г" },

  { id: "sladkiy-churros", category: "sweet", name: "Сладкий чуррос", description: "Заварное тесто во фритюре с домашним шоколадным соусом", price: 290 },
  { id: "churros-karri", category: "sweet", name: "Чуррос с карри", description: "Заварное тесто во фритюре с сырным соусом", price: 230 },
  { id: "sousy", category: "sweet", name: "Соус на выбор", description: "BBQ, сеульский с арахисом, FRY-1, сырный, тар-тар, томатный карри, чесночный, шрирача, шоколадный", price: 50, unit: "30\u00a0г" },
];

/** Соусы для облака на лотке «К пиву» */
export const sauces = ["BBQ", "Сеульский с арахисом", "FRY-1", "Сырный", "Тар-тар", "Томатный карри", "Чесночный", "Шрирача", "Шоколадный"] as const;

/** Настойки: крафтовое меню напитков (y025, май 2025). Вкусы меняются, цену не пишем: не подтверждена на 2026 год */
export const nastoyki = {
  sweet: ["Облепиха", "Смородина", "Малина-мята", "Лимончелло", "Сливочный лимончелло", "Вишня", "Солёная карамель"],
  dry: ["Томат", "Клюква", "Лайм-зелёное яблоко"],
} as const;

export function formatMenuPrice(price: number | null) {
  return price === null ? "цена у бара" : `${price}\u00a0₽`;
}
