import { MessageCircle, Phone } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { telHref } from "@/lib/utils";

/** Бронь: финальный фокус страницы. Мастер из шаблона, конфиг в content/booking.ts */
export function Booking() {
  return (
    <Section id="booking" labelledBy="booking-title" className="overflow-x-clip bg-brand text-brand-ink">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="t-eyebrow flex items-center gap-3">
            <span className="tabular">07</span>
            <span>Бронь</span>
            <span aria-hidden="true" className="h-px min-w-8 flex-1 bg-[color-mix(in_oklab,var(--brand-ink)_35%,transparent)]" />
          </p>
          <h2 id="booking-title" className="t-h1 mt-6">
            Займём
            <br />
            вам стол
          </h2>
          <p className="t-lead mt-6 max-w-[34ch]">
            Выберите, сколько вас и где сесть, потом день и время. Мы перезвоним и подтвердим. В пятницу и субботу вечером лучше бронировать заранее.
          </p>

          <dl className="mt-10 grid gap-2 border-t border-[color-mix(in_oklab,var(--brand-ink)_30%,transparent)] pt-6">
            {site.hours.map((h) => (
              <div key={h.days} className="flex items-baseline justify-between gap-4">
                <dt className="font-semibold">{h.days}</dt>
                <dd className="font-display text-[1.7rem] font-black tabular leading-none">{h.time}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="paper" size="lg">
              <a href={telHref(site.phone)}>
                <Phone aria-hidden="true" />
                {site.phone}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-[color-mix(in_oklab,var(--brand-ink)_45%,transparent)] text-brand-ink hover:border-brand-ink hover:bg-[color-mix(in_oklab,var(--brand-ink)_12%,transparent)]">
              <a href={site.links.whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden="true" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <BookingWizard
            className="booking-card rounded-[var(--radius)] bg-bg p-5 text-fg shadow-[var(--shadow-lift)] sm:p-8"
            successNote={<>Перезвоним с номера {site.phone}, чтобы подтвердить стол. Если планы поменяются, просто скажите бармену.</>}
          />
        </div>
      </Container>
    </Section>
  );
}
