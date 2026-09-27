import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { Cursor } from "@/components/motion/cursor";
import { headScript } from "@/components/motion/preloader";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/content/site";

import "./globals.css";

/* Заголовки: Sofia Sans Extra Condensed (ближе всего к конденсированному FRY логотипа), текст: Geologica */
const display = localFont({
  src: [
    { path: "../fonts/sofia-sans-extra-condensed-800.woff2", weight: "800", style: "normal" },
    { path: "../fonts/sofia-sans-extra-condensed-900.woff2", weight: "900", style: "normal" },
  ],
  variable: "--ff-display",
  display: "swap",
  adjustFontFallback: "Arial",
});

const body = localFont({
  src: [
    { path: "../fonts/geologica-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/geologica-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--ff-body",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3103";
const description =
  "Бар уличной еды во дворе на Ленина, 6 к1, у метро Площадь Ленина. Пиво с кранов, сидр, свои настойки, тако, фри и корн-доги. Пн-чт и вс 14:00-02:00, пт-сб до 04:00. Бронь стола онлайн.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "FRY Street Food Pub · бар на Ленина, 6 в Новосибирске",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: site.name,
    title: "FRY Street Food Pub · тако, фри и пиво до двух ночи",
    description,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0f0e0d",
  colorScheme: "dark",
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BarOrPub",
  name: site.name,
  url: siteUrl,
  image: `${siteUrl}/opengraph-image.jpg`,
  telephone: site.phoneE164,
  priceRange: "₽₽",
  servesCuisine: ["Мексиканская", "Американская", "Стритфуд"],
  acceptsReservations: true,
  hasMenu: `${siteUrl}/#full-menu`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address,
    addressLocality: site.postalCity,
    addressCountry: "RU",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.coords.lat, longitude: site.coords.lon },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
      opens: "14:00",
      closes: "02:00",
    },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday", "Saturday"], opens: "14:00", closes: "04:00" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.ratings.yandex.value,
    ratingCount: site.ratings.yandex.count,
    reviewCount: site.ratings.yandex.reviews,
    bestRating: 5,
  },
  sameAs: [site.links.vk, site.links.yandex, site.links.twoGis],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="grain">
        <a
          href="#main"
          className="sr-only-focusable fixed left-4 top-4 z-[110] rounded-full bg-brand px-5 py-3 text-brand-ink"
        >
          К содержимому
        </a>
        <Providers>
          <SmoothScroll />
          <Cursor />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
