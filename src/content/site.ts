/* Факты о FRY: только из meta/facts.json (Яндекс Карты, 2ГИС, VK). Источник у каждого поля в комментарии. */

export const site = {
  name: "FRY Street Food Pub",
  short: "FRY",
  tagline: "Street. Food. Pub.",
  city: "Новосибирск",
  /** Яндекс: «ул. Ленина, 6, корп. 1, этаж 1» */
  address: "ул. Ленина, 6 к1",
  addressFull: "Новосибирск, ул. Ленина, 6 к1",
  postalCity: "Новосибирск",
  /** 2ГИС: «Площадь Ленина, 2 мин, 200 м» */
  metro: "Площадь Ленина",
  metroWalk: "2 минуты пешком",
  phone: "+7 (923) 252-75-51",
  phoneE164: "+79232527551",
  links: {
    vk: "https://vk.com/street_food_pub",
    whatsapp: "https://wa.me/79232527551",
    yandex: "https://yandex.ru/maps/org/fry/85009102432/",
    twoGis: "https://2gis.ru/novosibirsk/firm/70000001032413907",
    route: "https://yandex.ru/maps/?rtext=~55.030186,82.917307&rtt=pd",
  },
  coords: { lat: 55.030186, lon: 82.917307 },
  /** Яндекс: пн-чт 14:00-02:00, пт-сб 14:00-04:00, вс 14:00-02:00 */
  hours: [
    { days: "Пн-чт", time: "14:00-02:00" },
    { days: "Пт-сб", time: "14:00-04:00" },
    { days: "Вс", time: "14:00-02:00" },
  ],
  ratings: {
    yandex: { value: 4.8, count: 839, reviews: 229 },
    twoGis: { value: 4.9, count: 1307, reviews: 528 },
  },
  /** Яндекс: цена бокала пива 250-400 ₽ */
  beerPrice: "250-400\u00a0₽",
  /** 2ГИС: «Премия 2ГИС 2019», «Премия 2ГИС 2018»; VK: призёр 2019 в номинации «Пивные бары» */
  awards: ["2018", "2019"],
} as const;

export const nav = [
  { href: "#menu", label: "Меню" },
  { href: "#bar", label: "Бар" },
  { href: "#yard", label: "Двор" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#booking", label: "Бронь" },
] as const;
