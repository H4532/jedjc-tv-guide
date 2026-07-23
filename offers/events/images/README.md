# Event images

Upload **two approved images for every hotel event** to this folder.

## Required responsive image pair

1. **Desktop image**
   - 1600 × 900 pixels
   - 16:9 landscape
   - WebP preferred; JPG accepted
   - Recommended size below 500 KB
   - Example: `seafood-night-august-2026-desktop.webp`

2. **Mobile image**
   - 1080 × 1350 pixels
   - 4:5 portrait
   - WebP preferred; JPG accepted
   - Recommended size below 400 KB
   - Example: `seafood-night-august-2026-mobile.webp`

Use lowercase file names with hyphens. Avoid spaces and special characters.

After uploading both photos, update `offers/events/data.json`:

```json
"imageDesktop": "images/seafood-night-august-2026-desktop.webp",
"imageMobile": "images/seafood-night-august-2026-mobile.webp"
```

The guest page automatically displays the mobile image on phones and the desktop image on wider screens.
