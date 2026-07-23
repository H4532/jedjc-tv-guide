from __future__ import annotations

import io
import os
from pathlib import Path

import fitz  # PyMuPDF
import qrcode
from PIL import Image, ImageDraw
from qrcode.constants import ERROR_CORRECT_H

ROOT = Path(os.environ.get("TV_GUIDE_ROOT", Path(__file__).resolve().parents[1])).resolve()
PDF_PATH = ROOT / "TV_Channel_Guide.pdf"
SITE_URL = "https://h4532.github.io/jedjc-tv-guide/"

# Page 1 QR placement in PDF points (PyMuPDF uses top-left coordinates).
QR_RECT = fitz.Rect(439, 456, 555, 572)


def make_qr_card() -> bytes:
    qr = qrcode.QRCode(
        version=None,
        error_correction=ERROR_CORRECT_H,
        box_size=16,
        border=4,
    )
    qr.add_data(SITE_URL)
    qr.make(fit=True)
    qr_image = qr.make_image(fill_color="black", back_color="white").convert("RGB")

    size = 720
    margin = 48
    card = Image.new("RGB", (size, size), "white")
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size - 1, size - 1), radius=42, fill=255)

    qr_image = qr_image.resize((size - 2 * margin, size - 2 * margin), Image.Resampling.NEAREST)
    content = Image.new("RGB", (size, size), "white")
    content.paste(qr_image, (margin, margin))
    card.paste(content, mask=mask)

    output = io.BytesIO()
    card.save(output, format="PNG", optimize=True)
    return output.getvalue()


def main() -> None:
    if not PDF_PATH.exists():
        raise FileNotFoundError(f"Missing PDF: {PDF_PATH}")

    document = fitz.open(PDF_PATH)
    if document.page_count < 1:
        raise RuntimeError("The TV guide PDF has no pages")

    page = document[0]
    qr_bytes = make_qr_card()

    # Cover the previous QR completely, then place a high-contrast QR card.
    page.draw_rect(QR_RECT, color=(1, 1, 1), fill=(1, 1, 1), overlay=True)
    page.insert_image(QR_RECT, stream=qr_bytes, keep_proportion=True, overlay=True)

    # Make the entire QR card clickable on desktop and mobile PDF viewers.
    page.insert_link({"kind": fitz.LINK_URI, "from": QR_RECT, "uri": SITE_URL})

    output_path = PDF_PATH.with_suffix(".updated.pdf")
    document.save(output_path, garbage=4, deflate=True, clean=True)
    document.close()
    output_path.replace(PDF_PATH)

    # Verify that the URL annotation was written.
    check = fitz.open(PDF_PATH)
    links = check[0].get_links()
    check.close()
    if not any(link.get("uri") == SITE_URL for link in links):
        raise RuntimeError("PDF QR hyperlink verification failed")

    print(f"Updated QR and hyperlink in {PDF_PATH}")


if __name__ == "__main__":
    main()
