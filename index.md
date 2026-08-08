---
title: Don Berghuijs
---

# Don Berghuijs

Laatste publicaties:

{% assign article_pages = site.pages | where_exp: "page", "page.path contains 'articles/'" %}
{% for article in article_pages %}
- [{{ article.title | default: article.name }}]({{ article.url | relative_url }}){% if article.date %} - {{ article.date | date: "%Y-%m-%d" }}{% endif %}
{% endfor %}

{% if article_pages.size == 0 %}
Nog geen artikelen gepubliceerd.
{% endif %}
