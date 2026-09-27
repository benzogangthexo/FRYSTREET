import type { StaticImageData } from "next/image";

import burger from "@/assets/photos/burger.jpg";
import corndogYard from "@/assets/photos/corndog-yard.jpg";
import corndog from "@/assets/photos/corndog.jpg";
import friesLoaded from "@/assets/photos/fries-loaded.jpg";
import fries from "@/assets/photos/fries.jpg";
import gig from "@/assets/photos/gig.jpg";
import hall from "@/assets/photos/hall.jpg";
import heroTacos from "@/assets/photos/hero-tacos.jpg";
import heroWall from "@/assets/photos/hero-wall.jpg";
import neon from "@/assets/photos/neon.jpg";
import quesadilla from "@/assets/photos/quesadilla.jpg";
import shots from "@/assets/photos/shots.jpg";
import stout from "@/assets/photos/stout.jpg";
import taps from "@/assets/photos/taps.jpg";
import veranda from "@/assets/photos/veranda.jpg";
import yardCrowd from "@/assets/photos/yard-crowd.jpg";
import yardNight from "@/assets/photos/yard-night.jpg";
import type { MenuPhotoKey } from "@/content/menu";

/* Реальные фото FRY (Яндекс Карты, 2ГИС, VK): отбор и оценки в PHOTOS.md */
export const photos = {
  burger,
  corndog,
  corndogYard,
  fries,
  friesLoaded,
  gig,
  hall,
  heroTacos,
  heroWall,
  neon,
  quesadilla,
  shots,
  stout,
  taps,
  veranda,
  yardCrowd,
  yardNight,
};

export const menuPhotos: Record<MenuPhotoKey, { src: StaticImageData; alt: string }> = {
  fries: { src: fries, alt: "Две порции фри с зеленью на бумаге FRY и сырный соус" },
  friesLoaded: { src: friesLoaded, alt: "Фри с мясом, сыром и зеленью в лотке, рядом коул слоу" },
  tacos: { src: heroTacos, alt: "Три тако с рваной свининой и зеленью на бумаге FRY" },
  quesadilla: { src: quesadilla, alt: "Кесадилья треугольниками в крафтовом лотке" },
  burger: { src: burger, alt: "Фрайбургер с рваной свининой в фирменной обёртке" },
  corndog: { src: corndog, alt: "Корн-дог с кетчупом и соусом на бумаге FRY" },
};
