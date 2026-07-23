# Sales Team Content Guide

This guide explains how approved Sales team members manage photos and content for:

- Current Promotions: `offers/promotions/`
- Hotel Events: `offers/events/`
- Sales Content Center: `sales-admin/`

## Access

The Portal Administration and Sales Content Center pages use the fixed page login supplied by the hotel administrator.

This login is a browser-side gate because GitHub Pages is static hosting. It hides the management interface from casual visitors, but it is not a replacement for server-side authentication.

Every Sales team member still needs an individual GitHub account. The repository owner must add that username as a collaborator to `H4532/jedjc-tv-guide` before the employee can upload photos or publish changes.

## Required images for every promotion or event

Upload two approved images using the same base file name:

### Desktop image

- 1600 × 900 pixels
- 16:9 landscape
- WebP preferred; JPG accepted
- Target size below 500 KB
- Example: `weekend-brunch-august-2026-desktop.webp`

### Mobile image

- 1080 × 1350 pixels
- 4:5 portrait
- WebP preferred; JPG accepted
- Target size below 400 KB
- Example: `weekend-brunch-august-2026-mobile.webp`

The website automatically selects the mobile image on phones and the desktop image on tablets, laptops, and larger screens.

## Publishing a promotion

1. Open the Sales Content Center.
2. Select **Upload both promotion photos**.
3. Upload the matching desktop and mobile files.
4. Use lowercase file names with hyphens.
5. Select **Edit promotion details**.
6. Copy the template item inside `offers/promotions/data.json`.
7. Update the English and Arabic content.
8. Set both image values:

```json
"imageDesktop": "images/weekend-brunch-august-2026-desktop.webp",
"imageMobile": "images/weekend-brunch-august-2026-mobile.webp"
```

9. Set `active` to `true`.
10. Commit the changes.
11. Test the live page on both a phone and a desktop.

## Publishing an event

Follow the same process using:

- Image folder: `offers/events/images/`
- Content file: `offers/events/data.json`

## Supported fields

```json
{
  "id": "unique-lowercase-id",
  "titleEn": "English title",
  "titleAr": "العنوان بالعربية",
  "descriptionEn": "English description",
  "descriptionAr": "الوصف بالعربية",
  "imageDesktop": "images/photo-name-desktop.webp",
  "imageMobile": "images/photo-name-mobile.webp",
  "imageAltEn": "English image description",
  "imageAltAr": "وصف الصورة بالعربية",
  "tagEn": "Promotion",
  "tagAr": "عرض",
  "startDate": "2026-08-01",
  "endDate": "2026-08-31",
  "locationEn": "Roshan Restaurant",
  "locationAr": "مطعم روشن",
  "timeEn": "Daily, 7:00 PM – 11:00 PM",
  "timeAr": "يومياً، 7:00 مساءً – 11:00 مساءً",
  "ctaLabelEn": "Learn more",
  "ctaLabelAr": "اعرف المزيد",
  "ctaUrl": "https://example.com",
  "featured": true,
  "active": true
}
```

## Automatic scheduling

- `startDate`: the card remains hidden before this date.
- `endDate`: the card is automatically hidden after this date.
- Leave either date blank when no boundary is required.
- Set `active` to `false` to hide an item immediately.

## Image content rules

- Keep important text, logos, and faces away from the outer edges.
- Do not reuse the desktop crop as the phone image when text becomes too small.
- Use approved hotel branding and content only.
- Do not upload guest personal information or images without the required approval.
- Compress files before uploading to keep the guest portal fast on mobile networks.

## Deployment

After a commit, GitHub Pages normally republishes the site within one to three minutes. The permanent guest QR code does not need to be changed.
