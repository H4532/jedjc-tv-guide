# Sales Team Content Guide

This guide explains how approved Sales team members manage photos and content for:

- Current Promotions: `offers/promotions/`
- Hotel Events: `offers/events/`
- Sales Content Center: `sales-admin/`

## Access

Each Sales team member needs an individual GitHub account. The repository owner must add that username as a collaborator to `H4532/jedjc-tv-guide`.

GitHub Pages is a static hosting service. It does not support a separate Sales login or folder-only permissions. A collaborator with write access can edit the repository, so access should be granted only to authorized users.

## Publishing a promotion

1. Open the Sales Content Center.
2. Select **Upload promotion photos**.
3. Upload an approved JPG, PNG or WebP image.
4. Use a lowercase file name with hyphens, such as `weekend-brunch-august-2026.jpg`.
5. Select **Edit promotion details**.
6. Copy the template item inside `offers/promotions/data.json`.
7. Update the English and Arabic content.
8. Set the image value to `images/weekend-brunch-august-2026.jpg`.
9. Set `active` to `true`.
10. Commit the changes.

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
  "image": "images/photo-name.jpg",
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

## Image standard

- Recommended dimensions: 1200 × 900 pixels.
- Recommended aspect ratio: 4:3 landscape.
- Use JPG, PNG or WebP.
- Use approved hotel branding and content only.
- Do not upload guest personal information or images without the required approval.

## Deployment

After a commit, GitHub Pages normally republishes the site within one to three minutes. The permanent guest QR code does not need to be changed.
