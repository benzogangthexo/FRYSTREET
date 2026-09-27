import { MobileCta } from "@/components/layout/mobile-cta";
import { Preloader } from "@/components/motion/preloader";
import { Bar } from "@/components/sections/bar";
import { Booking } from "@/components/sections/booking";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { MenuList } from "@/components/sections/menu-list";
import { MenuTrays } from "@/components/sections/menu-trays";
import { Reviews } from "@/components/sections/reviews";
import { Ribbons } from "@/components/sections/ribbons";
import { Yard } from "@/components/sections/yard";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <Preloader>
        <span className="pl-mark font-display font-black leading-[0.8]">
          <span className="pl-letter">F</span>
          <span className="pl-letter">R</span>
          <span className="pl-letter">Y</span>
        </span>
        <span className="t-eyebrow tracking-[0.32em]">Street. Food. Pub.</span>
      </Preloader>
      <Header />
      <main id="main">
        <Hero />
        <Ribbons />
        <Manifesto />
        <MenuTrays />
        <MenuList />
        <Bar />
        <Yard />
        <Reviews />
        <Booking />
      </main>
      <Footer />
      <MobileCta label="Забронировать стол" phone={site.phone} heroId="hero-cta" targetId="booking" />
    </>
  );
}
