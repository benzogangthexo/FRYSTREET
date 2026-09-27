"use client";

import { Menu, Phone } from "lucide-react";
import { useState } from "react";

import { scrollToTarget } from "@/components/motion/smooth-scroll";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { nav, site } from "@/content/site";
import { telHref } from "@/lib/utils";

/** Меню-шторка на телефоне и планшете: красная плоскость, крупные пункты */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    window.setTimeout(() => scrollToTarget(href.slice(1)), 320);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        aria-label="Открыть меню разделов"
        className="grid size-12 place-items-center rounded-full border border-line-strong text-fg transition-colors hover:border-fg lg:hidden"
      >
        <Menu aria-hidden="true" className="size-5" />
      </DialogTrigger>
      <DialogContent className="bg-brand text-brand-ink">
        <DialogTitle className="t-eyebrow">Разделы</DialogTitle>
        <DialogDescription className="sr-only">Навигация по сайту FRY Street Food Pub</DialogDescription>
        <nav aria-label="Разделы сайта" className="mt-6">
          <ul className="grid gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => go(e, item.href)}
                  className="block py-1 font-display text-[clamp(3rem,15vw,5.5rem)] font-black uppercase leading-[0.9] transition-transform duration-500 ease-[var(--ease-out-expo)] hover:translate-x-2"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={telHref(site.phone)}
          className="mt-8 inline-flex h-12 items-center gap-3 rounded-[var(--radius-pill)] bg-brand-ink px-6 font-semibold text-paper-ink"
        >
          <Phone aria-hidden="true" className="size-4" />
          {site.phone}
        </a>
      </DialogContent>
    </Dialog>
  );
}
