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

## Administration access

The Portal Administration and Sales Content Center pages include a fixed browser-side login gate and a sign-out action.

Because GitHub Pages is static hosting, this gate is intended to prevent casual anonymous access to the management interface. It is not server-side authentication. Actual upload, edit and publishing actions remain protected by GitHub account and repository permissions.

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

Each promotion or event requires a responsive image pair:

- Desktop: 1600 × 900 pixels, 16:9 landscape
- Mobile: 1080 × 1350 pixels, 4:5 portrait
- WebP preferred, JPG accepted

The guest page automatically selects the correct image for the screen size.

Each page also supports:

- English and Arabic titles and descriptions
- Start and end dates
- Automatic hiding before or after the publishing period
- Location and time information
- Featured cards
- Optional call-to-action links
- Immediate activation or deactivation

Sales management shortcuts are available at `sales-admin/`. Detailed instructions are stored in `SALES_TEAM_CONTENT_GUIDE.md`.

## Sales access limitation

Each approved Sales team member needs an individual GitHub account and collaborator access to this repository. GitHub Pages does not provide folder-only collaborator permissions, so repository access should only be granted to authorized users.

## Included areas

- Bilingual TV channel guide
- Mobile guest-services portal
- Current Promotions page
- Hotel Events page
- Sales Content Center
- TV welcome-page preview
- Permanent QR code
- GitHub Pages deployment workflow
