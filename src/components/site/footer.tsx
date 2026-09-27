import { Container } from "@/components/layout/container";
import { GiantWordmark } from "@/components/motion/giant-wordmark";
import { site } from "@/content/site";
import { telHref } from "@/lib/utils";

const link = "inline-flex min-h-11 min-w-11 items-center underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg hover:decoration-fg";

/** Футер: огромное FRY (буквы выезжают от скролла), адрес, часы, связь */
export function Footer() {
  return (
    <footer className="relative overflow-x-clip border-t border-line pb-[calc(var(--mobile-cta-h)+env(safe-area-inset-bottom)+2rem)] pt-16 md:pb-10 lg:pt-24">
      <Container>
        <h2 className="sr-only">Контакты FRY Street Food Pub</h2>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <GiantWordmark text="FRY" ratio={0.5} className="font-display font-black text-[var(--brand-3)]" />
            <p className="t-eyebrow mt-4 text-fg">Street. Food. Pub. · Support your local pub</p>
          </div>

          <div className="grid gap-10 text-fg-muted sm:grid-cols-3 lg:col-span-5 lg:grid-cols-2">
            <div>
              <h3 className="t-eyebrow text-fg">Адрес</h3>
              <p className="mt-3 text-fg">{site.addressFull}</p>
              <p className="mt-1">м. {site.metro}, {site.metroWalk}</p>
              <ul className="mt-2">
                <li>
                  <a href={site.links.yandex} target="_blank" rel="noopener noreferrer" className={link}>
                    Яндекс Карты
                  </a>
                </li>
                <li>
                  <a href={site.links.twoGis} target="_blank" rel="noopener noreferrer" className={link}>
                    2ГИС
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="t-eyebrow text-fg">Часы</h3>
              <dl className="mt-3 grid gap-1.5">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4">
                    <dt>{h.days}</dt>
                    <dd className="tabular text-fg">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="t-eyebrow text-fg">Связь</h3>
              <ul className="mt-2">
                <li>
                  <a href={telHref(site.phone)} className={`${link} tabular text-fg`}>
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a href={site.links.whatsapp} target="_blank" rel="noopener noreferrer" className={link}>
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={site.links.vk} target="_blank" rel="noopener noreferrer" className={link}>
                    ВКонтакте
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-sm text-fg-muted md:flex-row md:justify-between">
          <p>© 2026 FRY Street Food Pub, Новосибирск</p>
          <p>18+ · Чрезмерное употребление алкоголя вредит вашему здоровью</p>
        </div>
      </Container>
    </footer>
  );
}
