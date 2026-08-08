---
title: Artikelen
layout_mode: plain
---

<section class="page-panel">
  <p class="kicker">Archief</p>
  <h1>Artikelen</h1>
  <p>Alle gepubliceerde Markdown-artikelen op een plek.</p>
</section>

<section class="section">
  {% assign article_pages = site.pages | where_exp: "page", "page.path contains 'articles/'" %}
  <ul class="article-list">
    {% for article in article_pages %}
      <li class="article-card">
        <div>
          <h3><a href="{{ article.url | relative_url }}">{{ article.title | default: article.name }}</a></h3>
          {% if article.description %}<p class="article-description">{{ article.description | strip_html | truncate: 180 }}</p>{% endif %}
        </div>
        {% if article.date %}<time datetime="{{ article.date | date_to_xmlschema }}">{{ article.date | date: "%Y-%m-%d" }}</time>{% endif %}
      </li>
    {% endfor %}
  </ul>

  {% if article_pages.size == 0 %}
    <p>Nog geen artikelen gepubliceerd.</p>
  {% endif %}
</section>
