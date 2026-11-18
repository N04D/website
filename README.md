# donberghuijs.nl — website v2

Dit is de Jekyll-website op GitHub Pages, repository `N04D/website`.

## Redactie en structuur

- **Één artikelstroom**: alle nieuwe publicaties staan in `_posts/YYYY-MM-DD-slug.md` en worden op `/blog/` en de homepage weergegeven. Gebruik de oude `articles/`-route niet meer voor nieuwe publicaties.
- **Projecten later**: een artikel kan optionele front matter `project_id` en `project_title` krijgen. Projectportalen en -navigatie worden pas in een aparte fase ontworpen. De huidige beleidstijdlijn blijft intact.
- **De website zelf is breder dan één onderzoek**: Onderzoek Neutraliteit Politie is een bestaand onderzoeksthema, geen hardcoded verplicht project voor toekomstige artikelen.
- **Machineleesbaar**: `/api/articles.json`, `/sitemap.xml`, `/robots.txt`, `/llms.txt` en `/feed.xml`. JSON-LD in gedeelde layouts.

Voorbeeld van een nieuw gepubliceerd artikel (fictieve velden; alleen echte, gecontroleerde publicaties toevoegen):

```yaml
---
layout: post
title: "Titel van het artikel"
description: "Een compacte, feitelijke samenvatting."
date: 2026-11-19
last_modified_at: 2026-11-19
author: "J.D. Berghuijs"
category: Onderzoek
project_id: neutraliteit-politie   # optioneel; geen projectpagina vereist
project_title: Onderzoek Neutraliteit Politie
---
```

## Publicatieveiligheid

**Alle publicaties vereisen menselijke bron-, juridische en privacycontrole.** Geen interne bronnen, Woo-werkdossiers of ongecontroleerde concepten in deze publieke repository. De oude `articles/`-inhoud wordt niet automatisch verwijderd of gemigreerd; controleer bestaande URLs vóór eventuele toekomstige migratie.

De huidige site gebruikt `CNAME`, `.github/workflows/jekyll-gh-pages.yml` en `main` voor GitHub Pages. De workflow publiceert na merge naar `main`; ontwikkel daarom in een branch en maak een Pull Request. Voor rollback: een herstel-PR of een gecontroleerde terugzetactie.

## AI-vindbaarheid

`sitemap.xml`, crawlbare HTML, bronverwijzingen en consistente metadata maken inhoud vindbaar en citeerbaar, maar garanderen geen AI-vermelding. `llms.txt` en een optionele latere read-only MCP-server zijn aanvullend, niet een vervanging voor gepubliceerde artikelen en reguliere indexing.
