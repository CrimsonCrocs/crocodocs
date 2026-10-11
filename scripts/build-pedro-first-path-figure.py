from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public/guides/pedro-first-path.png"

WIDTH, HEIGHT = 1200, 720
image = Image.new("RGB", (WIDTH, HEIGHT), "#f3f7f8")
draw = ImageDraw.Draw(image)


def font(size: int, bold: bool = False):
    candidates = (
        ("C:/Windows/Fonts/arialbd.ttf", "C:/Windows/Fonts/arial.ttf")
        if bold
        else ("C:/Windows/Fonts/arial.ttf", "C:/Windows/Fonts/segoeui.ttf")
    )
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


draw.rounded_rectangle((24, 24, WIDTH - 24, HEIGHT - 24), radius=28, fill="#ffffff", outline="#d8e4e7", width=2)
draw.text((64, 54), "A first Pedro Pathing route", font=font(34, True), fill="#173943")
draw.text((64, 102), "Illustrative coordinates only — the path is a line from one pose to the next.", font=font(20), fill="#52666d")

left, top, right, bottom = 150, 168, 1040, 575
x_min, x_max, y_min, y_max = 8, 56, 8, 40


def point(x: float, y: float):
    px = left + (x - x_min) / (x_max - x_min) * (right - left)
    py = bottom - (y - y_min) / (y_max - y_min) * (bottom - top)
    return int(px), int(py)


for x in range(10, 56, 5):
    px, _ = point(x, y_min)
    draw.line((px, top, px, bottom), fill="#e5edef", width=1)
    draw.text((px - 12, bottom + 12), str(x), font=font(16), fill="#52666d")
for y in range(10, 41, 5):
    _, py = point(x_min, y)
    draw.line((left, py, right, py), fill="#e5edef", width=1)
    draw.text((left - 34, py - 10), str(y), font=font(16), fill="#52666d")

draw.line((left, top, left, bottom), fill="#38545c", width=3)
draw.line((left, bottom, right + 18, bottom), fill="#38545c", width=3)
draw.polygon([(right + 18, bottom), (right + 2, bottom - 8), (right + 2, bottom + 8)], fill="#38545c")
draw.text((right - 18, bottom + 38), "Pedro X (inches)", font=font(18, True), fill="#38545c")
draw.text((52, top - 32), "Pedro Y (inches)", font=font(18, True), fill="#38545c")

start = point(24, 24)
end = point(48, 24)
draw.line((start, end), fill="#16718a", width=8)
draw.polygon([(end[0] + 16, end[1]), (end[0] - 3, end[1] - 12), (end[0] - 3, end[1] + 12)], fill="#16718a")


def robot_marker(center, label, color):
    x, y = center
    draw.rounded_rectangle((x - 31, y - 25, x + 31, y + 25), radius=10, fill="#e8f4f6", outline=color, width=4)
    draw.polygon([(x + 20, y), (x + 4, y - 10), (x + 4, y + 10)], fill=color)
    draw.text((x - 70, y - 66), label, font=font(18, True), fill="#173943")


robot_marker(start, "Start: (24, 24, 0°)", "#16718a")
robot_marker(end, "Park: (48, 24, 0°)", "#43815a")
draw.text((left + 8, bottom + 40), "Y increases up", font=font(17), fill="#52666d")

draw.rounded_rectangle((72, 638, WIDTH - 72, 686), radius=16, fill="#eef7f8")
draw.text((WIDTH // 2, 662), "0° points along +X in Pedro's coordinate system", font=font(20, True), fill="#173943", anchor="mm")
image.save(OUTPUT, optimize=True)
print(f"Wrote {OUTPUT}")
