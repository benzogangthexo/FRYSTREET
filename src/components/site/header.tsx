import { Phone } from "lucide-react";

import { Wordmark } from "@/components/brand/marks";
import { Container } from "@/components/layout/container";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { MobileNav } from "@/components/site/mobile-nav";
import { nav, site } from "@/content/site";
import { telHref } from "@/lib/utils";

/** Шапка не липкая: уезжает со скроллом (на телефоне дальше работает нижняя панель брони) */
export function Header() {
  return (
    <header className="relative z-20">
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-4 pt-2">
        <a href="#hero" aria-label="FRY Street Food Pub, в начало страницы" className="-my-2 inline-flex min-h-11 items-center py-2 text-[13px]">
          <Wordmark />
        </a>

        <nav aria-label="Разделы" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex h-11 items-center rounded-full px-4 text-[0.95rem] text-fg-muted transition-colors duration-300 hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref(site.phone)}
            className="hidden h-11 items-center gap-2 rounded-full px-3 text-[0.95rem] tabular text-fg transition-colors hover:text-[var(--red-ink)] sm:inline-flex"
          >
            <Phone aria-hidden="true" className="size-4 text-[var(--red-ink)]" />
            {site.phone}
          </a>
          <a
            href={telHref(site.phone)}
            aria-label={`Позвонить: ${site.phone}`}
            className="grid size-12 place-items-center rounded-full border border-line-strong text-fg sm:hidden"
          >
            <Phone aria-hidden="true" className="size-5" />
          </a>
          <MagneticButton asChild size="sm" wrapperClassName="hidden md:inline-flex">
            <a href="#booking">Забронировать</a>
          </MagneticButton>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
