(function () {
  'use strict';

  var GTM_ID = 'GTM-PSGTVM6H';
  var GA_ID = 'G-4B1WJZ20TX';
  var STORAGE_KEY = 'donberghuijs_cookie_consent';

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  // Standaard: alles geweigerd (geen advertenties, geen remarketing, geen analytics zonder toestemming)
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted'
  });
  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', false);

  function getSavedConsent() {
    try {
      var val = window.localStorage.getItem(STORAGE_KEY);
      if (val === 'granted' || val === 'denied') {
        return val;
      }
    } catch (e) {}
    return null;
  }

  function saveConsent(value) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {}
  }

  function clearAnalyticsCookies() {
    try {
      var cookies = document.cookie ? document.cookie.split(';') : [];
      var host = window.location.hostname;
      var domains = ['', host, '.' + host];
      var parts = host.split('.');
      if (parts.length >= 2) {
        var rootDomain = parts.slice(-2).join('.');
        domains.push(rootDomain, '.' + rootDomain);
      }
      var paths = ['/', '/tijdlijn', '/tijdlijn/', '/blog', '/blog/', '/over', '/over/', '/privacy', '/privacy/'];
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        var eqPos = cookie.indexOf('=');
        var name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie;
        if (name.indexOf('_ga') === 0 || name.indexOf('_gid') === 0 || name.indexOf('_gat') === 0) {
          for (var d = 0; d < domains.length; d++) {
            for (var p = 0; p < paths.length; p++) {
              var domPart = domains[d] ? '; domain=' + domains[d] : '';
              document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=' + paths[p] + domPart + '; SameSite=Lax';
            }
          }
        }
      }
    } catch (e) {}
  }

  function loadGTM() {
    if (window.__gtmLoaded) {
      return;
    }
    window.__gtmLoaded = true;
    window['ga-disable-' + GA_ID] = false;

    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });

    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });

    var firstScript = document.getElementsByTagName('script')[0];
    var j = document.createElement('script');
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    j.setAttribute('data-gtm-id', GTM_ID);
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(j, firstScript);
    } else if (document.head) {
      document.head.appendChild(j);
    }
  }

  function updateStatusLabels(choice) {
    var nodes = document.querySelectorAll('[data-consent-status]');
    var text = choice === 'granted'
      ? 'Huidige voorkeur: Analytische cookies geaccepteerd'
      : choice === 'denied'
        ? 'Huidige voorkeur: Analytische cookies geweigerd'
        : 'Huidige voorkeur: Nog geen keuze gemaakt';
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = text;
    }
  }

  function ensureBanner() {
    var existing = document.getElementById('cookie-consent-banner');
    if (existing) {
      return existing;
    }
    var banner = document.createElement('aside');
    banner.id = 'cookie-consent-banner';
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookievoorkeuren');
    banner.hidden = true;
    banner.innerHTML =
      '<div class="cookie-banner-inner">' +
        '<div class="cookie-banner-text">' +
          '<strong>Privacy &amp; bezoekersstatistieken</strong>' +
          '<p>Wij gebruiken uitsluitend na uw toestemming analytische cookies (Google Analytics 4 via Google Tag Manager) om het gebruik van deze website op hoofdlijnen te begrijpen. Er worden geen advertentie- of trackingcookies voor derden gebruikt. Lees meer in de <a href="/privacy/">privacy- en cookieverklaring</a>.</p>' +
        '</div>' +
        '<div class="cookie-banner-actions">' +
          '<button type="button" class="cookie-btn" data-consent-action="denied">Weigeren</button>' +
          '<button type="button" class="cookie-btn" data-consent-action="granted">Accepteren</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);

    var buttons = banner.querySelectorAll('[data-consent-action]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function (ev) {
        var action = ev.currentTarget.getAttribute('data-consent-action');
        handleUserChoice(action);
      });
    }
    return banner;
  }

  function handleUserChoice(choice) {
    var wasGtmLoaded = !!window.__gtmLoaded;
    saveConsent(choice);
    var banner = ensureBanner();
    banner.hidden = true;
    updateStatusLabels(choice);

    if (choice === 'granted') {
      loadGTM();
    } else if (choice === 'denied') {
      window['ga-disable-' + GA_ID] = true;
      gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      });
      clearAnalyticsCookies();
      if (wasGtmLoaded) {
        window.location.reload();
      }
    }
  }

  function openBanner() {
    var banner = ensureBanner();
    banner.hidden = false;
    var firstBtn = banner.querySelector('[data-consent-action]');
    if (firstBtn) {
      firstBtn.focus();
    }
  }

  // Pas opgeslagen voorkeur direct toe
  var initialConsent = getSavedConsent();
  if (initialConsent === 'granted') {
    loadGTM();
  } else {
    window['ga-disable-' + GA_ID] = true;
    if (initialConsent === 'denied') {
      clearAnalyticsCookies();
    }
  }

  function initDOM() {
    var banner = ensureBanner();
    var currentConsent = getSavedConsent();
    updateStatusLabels(currentConsent);

    if (currentConsent !== 'granted' && currentConsent !== 'denied') {
      banner.hidden = false;
    }

    document.addEventListener('click', function (ev) {
      var trigger = ev.target && ev.target.closest ? ev.target.closest('[data-open-consent]') : null;
      if (trigger) {
        ev.preventDefault();
        openBanner();
      }
      var directAction = ev.target && ev.target.closest ? ev.target.closest('[data-set-consent]') : null;
      if (directAction) {
        ev.preventDefault();
        handleUserChoice(directAction.getAttribute('data-set-consent'));
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDOM);
  } else {
    initDOM();
  }
})();
