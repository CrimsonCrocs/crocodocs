from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/guides/biobuzz-pollen-andymark.webp"
OUTPUT = ROOT / "public/guides/vision-color-blob-pipeline.png"
STAGE_SOURCE = ROOT / "public/guides/vision-stage-source.jpg"
STAGE_MASK = ROOT / "public/guides/vision-stage-mask.png"
STAGE_CLEANED = ROOT / "public/guides/vision-stage-cleaned.png"
STAGE_MEASURED = ROOT / "public/guides/vision-stage-measured.jpg"
STAGE_ZONES = ROOT / "public/guides/vision-stage-zones.jpg"


def font(size):
    for candidate in ("C:/Windows/Fonts/arial.ttf", "C:/Windows/Fonts/segoeui.ttf"):
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()

image = cv2.imread(str(SOURCE))
if image is None:
    raise SystemExit(f"Could not read {SOURCE}")

# A starting HSV range tuned for this published product photo, not universal.
blurred = cv2.GaussianBlur(image, (5, 5), 0)
hsv = cv2.cvtColor(blurred, cv2.COLOR_BGR2HSV)
mask = cv2.inRange(hsv, np.array([15, 60, 70]), np.array([40, 255, 255]))
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
cleaned = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
cleaned = cv2.morphologyEx(cleaned, cv2.MORPH_CLOSE, kernel)
contours, _ = cv2.findContours(cleaned, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
candidates = [contour for contour in contours if cv2.contourArea(contour) >= 10000]
if not candidates:
    raise SystemExit("No pollen candidate passed the example area threshold")

largest = max(candidates, key=cv2.contourArea)
filled = np.zeros_like(cleaned)
cv2.drawContours(filled, [largest], -1, 255, thickness=cv2.FILLED)
x, y, width, height = cv2.boundingRect(largest)
moments = cv2.moments(largest)
center = (round(x + width / 2), round(y + height / 2))

overlay = image.copy()
cv2.drawContours(overlay, [largest], -1, (40, 160, 70), thickness=12)
cv2.rectangle(overlay, (x, y), (x + width, y + height), (220, 135, 35), thickness=10)
cv2.drawMarker(overlay, center, (35, 60, 220), cv2.MARKER_CROSS, 70, 12)

# Save the intermediate results as separate figures as well as the summary.
# This lets each lesson step show the exact image produced by the code just
# above it, instead of asking a beginner to mentally locate a panel in a collage.
cv2.imwrite(str(STAGE_SOURCE), image, [cv2.IMWRITE_JPEG_QUALITY, 92])
cv2.imwrite(str(STAGE_MASK), mask)
cv2.imwrite(str(STAGE_CLEANED), filled)
cv2.imwrite(str(STAGE_MEASURED), overlay, [cv2.IMWRITE_JPEG_QUALITY, 92])

zones_page = Image.fromarray(cv2.cvtColor(overlay, cv2.COLOR_BGR2RGB)).convert("RGBA")
zone_overlay = Image.new("RGBA", zones_page.size, (0, 0, 0, 0))
zone_draw = ImageDraw.Draw(zone_overlay)
third_one = zones_page.width / 3
third_two = zones_page.width * 2 / 3
for x in (third_one, third_two):
    zone_draw.line((x, 0, x, zones_page.height), fill=(22, 113, 138, 205), width=8)
label_y = 24
for label, x1, x2 in (("LEFT", 0, third_one), ("CENTER", third_one, third_two), ("RIGHT", third_two, zones_page.width)):
    zone_draw.rounded_rectangle((x1 + 22, label_y, x2 - 22, label_y + 58), radius=16, fill=(255, 255, 255, 225), outline=(22, 113, 138, 220), width=3)
    zone_draw.text(((x1 + x2) / 2, label_y + 29), label, anchor="mm", fill="#173943", font=font(28))
zone_draw.rounded_rectangle((260, zones_page.height - 104, zones_page.width - 260, zones_page.height - 32), radius=18, fill=(255, 255, 255, 230), outline=(22, 113, 138, 220), width=3)
zone_draw.text((zones_page.width / 2, zones_page.height - 68), f"Measured center x = {center[0]} px → CENTER for a {zones_page.width}-px frame", anchor="mm", fill="#173943", font=font(22))
zones_page = Image.alpha_composite(zones_page, zone_overlay).convert("RGB")
zones_page.save(STAGE_ZONES, quality=92, optimize=True)


page = Image.new("RGB", (1440, 1060), "#f4f6f8")
draw = ImageDraw.Draw(page)
draw.text((48, 30), "Follow one BIOBUZZ Pollen through a color pipeline", fill="#14202b", font=font(32))
draw.text((48, 76), "OpenCV was run on AndyMark's product photo. This is a controlled example, not a camera calibration.", fill="#52616d", font=font(18))

stages = [
    ("1  Source image", image, "Start with the original color image."),
    ("2  HSV color mask", cv2.cvtColor(mask, cv2.COLOR_GRAY2BGR), "White pixels match the example yellow range."),
    ("3  Clean candidate", cv2.cvtColor(filled, cv2.COLOR_GRAY2BGR), "Blur + morphology; keep external contours over 10,000 px."),
    ("4  Measure the blob", overlay, f"Green contour · orange box · red center {center[0]}, {center[1]} px"),
]

card_w, card_h = 656, 430
for index, (title, stage, caption) in enumerate(stages):
    col, row = index % 2, index // 2
    left, top = 48 + col * 688, 130 + row * 454
    draw.rounded_rectangle((left, top, left + card_w, top + card_h), radius=18, fill="white", outline="#d5dde4", width=2)
    draw.text((left + 20, top + 16), title, fill="#152638", font=font(23))

    rgb = cv2.cvtColor(stage, cv2.COLOR_BGR2RGB)
    stage_image = Image.fromarray(rgb)
    stage_image.thumbnail((card_w - 40, 330), Image.Resampling.LANCZOS)
    stage_left = left + (card_w - stage_image.width) // 2
    stage_top = top + 55 + (330 - stage_image.height) // 2
    page.paste(stage_image, (stage_left, stage_top))
    draw.text((left + 20, top + card_h - 33), caption, fill="#52616d", font=font(16))

page.save(OUTPUT, optimize=True)
print(f"Wrote {OUTPUT}; candidate area={cv2.contourArea(largest):.0f}px; center={center}; size={width}x{height}")
print(f"Wrote progressive figures: {STAGE_SOURCE.name}, {STAGE_MASK.name}, {STAGE_CLEANED.name}, {STAGE_MEASURED.name}, {STAGE_ZONES.name}")
