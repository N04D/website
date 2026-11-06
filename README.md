# donberghuijs.nl — website v2

Dit is de nieuwe Jekyll-website (GitHub Pages). De repo is `N04D/website`.

**Behouden tijdens migratie:** `CNAME`, `.github/workflows/jekyll-gh-pages.yml`, `articles/` (door SocialMediaManager geschreven), de bestaande Git-historie. Geen interne bronnen en geen ongecontroleerde concepten in deze publieke repository plaatsen.

**Websitepagina's:** `/`, `/tijdlijn/`, `/blog/`, `/over/`.

**Gewone artikelen:** schrijf `YYYY-MM-DD-titel.md` in `_posts/` (Jekyll), of blijf publiceren met SocialMediaManager naar `articles/`. Beide soorten komen in het overzicht en krijgen dezelfde opmaak.

**Nodig bij nieuwe publicaties:** menselijke bron-, juridische en privacycontrole. De tijdlijn is een onderzoeksconcept v0.1.

## Publicatie en rollback

Gebruik het installatiepakket met `installeer.sh`. Dat maakt vooraf een backup-branch en laat `main` intact totdat een geslaagde backup is gepusht. Voor rollback: maak op basis van de backupbranch een herstel-PR of reset onder toezicht naar die branch.
