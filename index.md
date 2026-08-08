---
title: Don Berghuijs
layout_mode: plain
---

<section class="hero">
  <div>
    <p class="kicker">Publicaties en notities</p>
    <h1>Ideeen die rustig mogen landen.</h1>
    <p class="lede">Een persoonlijke plek voor artikelen, observaties en langere gedachten. Gepubliceerd als Markdown, gebouwd met GitHub Pages.</p>
    <div class="actions">
      <a class="button" href="{{ '/artikelen.html' | relative_url }}">Lees artikelen</a>
      <a class="button secondary" href="{{ '/over.html' | relative_url }}">Over deze site</a>
    </div>
  </div>
  <aside class="hero-note">
    Nieuwe stukken verschijnen hier als volledige artikelen. De site blijft licht, leesbaar en makkelijk uit te breiden vanuit SocialMediaManager.
  </aside>
</section>

<section class="section">
  <div class="section-head">
    <div>
      <p class="kicker">Recent</p>
      <h2>Laatste publicaties</h2>
    </div>
    <p>Een compact overzicht van alles wat onder <code>articles/</code> wordt gepubliceerd.</p>
  </div>

  {% assign article_pages = site.pages | where_exp: "page", "page.path contains 'articles/'" %}
  <ul class="article-list">
    {% for article in article_pages limit: 6 %}
      <li class="article-card">
        <div>
          <h3><a href="{{ article.url | relative_url }}">{{ article.title | default: article.name }}</a></h3>
          {% if article.description %}<p class="article-description">{{ article.description | strip_html | truncate: 150 }}</p>{% endif %}
        </div>
        {% if article.date %}<time datetime="{{ article.date | date_to_xmlschema }}">{{ article.date | date: "%Y-%m-%d" }}</time>{% endif %}
      </li>
    {% endfor %}
  </ul>

  {% if article_pages.size == 0 %}
    <p>Nog geen artikelen gepubliceerd.</p>
  {% endif %}
</section>
