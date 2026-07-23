# Holiday Inn Jeddah Corniche Guest TV Portal

A bilingual, mobile-friendly hotel guest portal and TV channel guide for Holiday Inn Jeddah Corniche.

## Live pages

- Guest services portal: https://h4532.github.io/jedjc-tv-guide/portal/
- TV welcome-page preview: https://h4532.github.io/jedjc-tv-guide/tv-welcome/
- TV channel guide: https://h4532.github.io/jedjc-tv-guide/
- Portal administration: https://h4532.github.io/jedjc-tv-guide/portal/admin.html
- Permanent guest QR code: https://h4532.github.io/jedjc-tv-guide/portal-qr.svg

The site deploys automatically through GitHub Pages after every update to the `main` branch.

## Portal content administration

Guest-facing content is stored in `portal/content.json`. The administrator page links directly to GitHub's protected editor. Only the repository owner or approved collaborators can commit changes.

The content file supports:

- English and Arabic titles and descriptions
- Categories and display order
- External links and relative site links
- Featured badges
- Active or disabled services
- Promotions and events placeholders

Changing `portal/content.json` updates the website without changing the QR code.

## Included areas

- `index.html` — bilingual TV channel guide
- `portal/` — unified mobile guest-services landing page
- `tv-welcome/` — TV-optimized welcome-page design preview
- `portal-qr.svg` — permanent QR code for the guest portal
- `TV_Channel_Guide.pdf.b64` — source for the downloadable bilingual PDF
- `.github/workflows/pages.yml` — automatic GitHub Pages deployment

## Current Phase 1 services

- TV channel guide
- Room-service menu
- Hotel pricing list
- Laundry services
- Important numbers
- Visit Saudi
- Ready sections for promotions and hotel events

## Next development phase

A server-backed administration portal can later add visual forms, individual administrator accounts, approval workflows, file uploads, scheduled publishing, analytics and broken-link monitoring. GitHub Pages itself hosts static websites and therefore cannot run the original Flask/SQLite administration backend.
