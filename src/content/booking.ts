import type { BookingConfig } from "@/lib/booking";

/*
 * Бронь стола в FRY. Часы по Яндексу: пн-чт и вс 14:00-02:00, пт-сб 14:00-04:00 (закрытие после полуночи).
 * Слоты по 30 минут, последний за 90 минут до закрытия, зона Asia/Novosibirsk.
 * Места: зал со стойкой и двор с летней верандой (Яндекс: «летняя веранда»; 2ГИС: «столики на улице»).
 */
export const bookingConfig: BookingConfig = {
  codePrefix: "FRY",
  timeZone: "Asia/Novosibirsk",
  slotMinutes: 30,
  leadMinutes: 60,
  lastSlotBeforeClose: 90,
  daysAhead: 14,
  busyShare: 0.3,
  week: [
    { open: "14:00", close: "02:00" },
    { open: "14:00", close: "02:00" },
    { open: "14:00", close: "02:00" },
    { open: "14:00", close: "02:00" },
    { open: "14:00", close: "02:00" },
    { open: "14:00", close: "04:00" },
    { open: "14:00", close: "04:00" },
  ],
  steps: [
    {
      id: "guests",
      title: "Сколько вас",
      columns: 2,
      options: [
        { id: "2", label: "1-2 гостя" },
        { id: "4", label: "3-4 гостя" },
        { id: "6", label: "5-6 гостей" },
        { id: "8", label: "7 и больше", note: "Перезвоним и сдвинем столы" },
      ],
    },
    {
      id: "place",
      title: "Где сесть",
      options: [
        { id: "hall", label: "В зале", note: "У барной стойки или за столом" },
        { id: "yard", label: "Во дворе", note: "Летняя веранда и столики на улице", badge: "летом" },
      ],
    },
  ],
  phone: "+7 (923) 252-75-51",
};
