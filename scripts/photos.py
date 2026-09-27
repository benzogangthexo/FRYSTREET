"""Обработка фото FRY: кадрирование, срез водяного знака 2ГИС, лёгкая единая цветокоррекция.

Запуск: python3 scripts/photos.py
Источник: /home/user/_photos/fry/raw (номера по контакт-листам sheets/sheet_XX.jpg).
Результат: src/assets/photos/*.jpg (до 2400 px по длинной стороне, JPEG q=88) и src/app/opengraph-image.jpg.
"""

from pathlib import Path

from PIL import Image, ImageEnhance

RAW = Path("/home/user/_photos/fry/raw")
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src/assets/photos"
MAX_SIDE = 2400

# имя -> (исходник, срез низа в долях: у фото 2ГИС знак «2GIS» в правом нижнем углу)
PHOTOS = {
    "hero-wall": ("g010", 0.065),
    "hero-tacos": ("g013", 0.065),
    "neon": ("y005", 0.0),
    "fries-loaded": ("g024", 0.065),
    "fries": ("g015", 0.065),
    "burger": ("g001", 0.065),
    "corndog": ("g025", 0.065),
    "corndog-yard": ("g017", 0.065),
    "quesadilla": ("g023", 0.065),
    "taps": ("g008", 0.065),
    "shots": ("g020", 0.065),
    "stout": ("g005", 0.065),
    "yard-crowd": ("g009", 0.065),
    "veranda": ("y038", 0.0),
    "gig": ("v004", 0.0),
    "hall": ("y009", 0.0),
    "yard-night": ("y003", 0.0),
}


def grade(im: Image.Image) -> Image.Image:
    """Единая мягкая коррекция под палитру: +контраст, +насыщенность, чуть теплее."""
    im = ImageEnhance.Contrast(im).enhance(1.04)
    im = ImageEnhance.Color(im).enhance(1.06)
    r, g, b = im.split()
    r = r.point(lambda v: min(255, round(v * 1.015)))
    b = b.point(lambda v: round(v * 0.985))
    return Image.merge("RGB", (r, g, b))


def fit(im: Image.Image) -> Image.Image:
    w, h = im.size
    scale = MAX_SIDE / max(w, h)
    if scale < 1:
        im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
    return im


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, (src, cut) in PHOTOS.items():
        im = Image.open(RAW / f"{src}.jpg").convert("RGB")
        w, h = im.size
        if cut:
            im = im.crop((0, 0, w, round(h * (1 - cut))))
        im = fit(grade(im))
        im.save(OUT / f"{name}.jpg", "JPEG", quality=88, optimize=True, progressive=True)
        print(f"{name:14} <- {src}  {im.size[0]}x{im.size[1]}")

    # Open Graph 1200x630: вывеска FRY
    og = grade(Image.open(RAW / "y005.jpg").convert("RGB"))
    w, h = og.size
    ch = round(w * 630 / 1200)
    top = round((h - ch) * 0.3)
    og = og.crop((0, top, w, top + ch)).resize((1200, 630), Image.LANCZOS)
    og.save(ROOT / "src/app/opengraph-image.jpg", "JPEG", quality=85, optimize=True, progressive=True)
    print("opengraph-image 1200x630")


if __name__ == "__main__":
    main()
