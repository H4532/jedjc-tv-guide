# Holiday Inn Jeddah Corniche Guest TV Portal

A bilingual, mobile-friendly hotel guest portal and TV channel guide for Holiday Inn Jeddah Corniche.

## Live pages

- Guest services portal: https://h4532.github.io/jedjc-tv-guide/portal/
- Current Promotions: https://h4532.github.io/jedjc-tv-guide/offers/promotions/
- Hotel Events: https://h4532.github.io/jedjc-tv-guide/offers/events/
- Sales Content Center: https://h4532.github.io/jedjc-tv-guide/sales-admin/
- TV welcome-page preview: https://h4532.github.io/jedjc-tv-guide/tv-welcome/
- TV channel guide: https://h4532.github.io/jedjc-tv-guide/
- Portal administration: https://h4532.github.io/jedjc-tv-guide/portal/admin.html
- Permanent guest QR code: https://h4532.github.io/jedjc-tv-guide/portal-qr.svg

The site deploys automatically through GitHub Pages after every update to the `main` branch.

## General portal administration

Guest-facing service links are stored in `portal/content.json`. The administrator page links directly to GitHub's protected editor. Only the repository owner or approved collaborators can commit changes.

The central content file supports:

- English and Arabic titles and descriptions
- Categories and display order
- External links and relative site links
- Featured badges
- Active or disabled services

Changing `portal/content.json` updates the website without changing the QR code.

## Sales-managed promotions and events

Sales-managed content is separated into two public pages:

- `offers/promotions/` for current promotions
- `offers/events/` for hotel events

Each page supports:

- Approved JPG, PNG and WebP photos
- English and Arabic titles and descriptions
- Start and end dates
- Automatic hiding before or after the publishing period
- Location and time information
- Featured cards
- Optional call-to-action links
- Immediate activation or deactivation

Sales management shortcuts are available at `sales-admin/`. Detailed instructions are stored in `SALES_TEAM_CONTENT_GUIDE.md`.

## Sales access limitation

GitHub Pages is static hosting and does not provide a separate Sales login or folder-only permissions. Each approved Sales team member needs an individual GitHub account and collaborator access to this repository. Collaborator access should only be granted to authorized users.

## Included areas

- Bilingual TV channel guide
- Mobile guest-services portal
- Current Promotions page
- Hotel Events page
- Sales Content Center
- TV welcome-page preview
- Permanent QR code
- GitHub Pages deployment workflow
