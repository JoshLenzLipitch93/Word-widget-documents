/* ======================================================================
   Linguease — analytics + App Store campaign attribution
   ----------------------------------------------------------------------
   Two jobs:
     1. Count visits and, critically, App Store badge taps. Without this
        a paid traffic test measures nothing.
     2. Stamp an App Store campaign token (ct) on every outbound badge
        link so installs show up in App Store Connect → App Analytics →
        Acquisition → Campaigns. No SDK required.

   ⚠️ TWO VALUES TO FILL IN BEFORE THIS DOES ANYTHING — see README.
   ====================================================================== */

(function () {
'use strict';

const CONFIG = {
  // 1. Umami website ID. Sign in at https://cloud.umami.is (free tier),
  //    add lingueaseapp.com, copy the website ID here.
  //    Leave empty to disable analytics entirely — the page still works.
  umamiWebsiteId: '',
  umamiSrc: 'https://cloud.umami.is/script.js',

  // 2. Apple provider token. App Store Connect → App Analytics →
  //    Acquisition → Campaigns → Create Campaign. The generated link
  //    contains ?pt=XXXXXXX — that number goes here.
  //    ⚠️ Without pt, Apple silently discards the ct campaign data.
  appleProviderToken: '128102719',

  appStoreId: '6751727490',
  defaultCampaign: 'site-direct',
};

/* ---------- Umami loader (privacy-first, cookieless, no consent banner) --- */
(function loadAnalytics() {
  if (!CONFIG.umamiWebsiteId) return;
  const s = document.createElement('script');
  s.async = true;
  s.defer = true;
  s.src = CONFIG.umamiSrc;
  s.setAttribute('data-website-id', CONFIG.umamiWebsiteId);
  document.head.appendChild(s);
})();

/* ---------- Fire an event through whatever is available ------------------ */
function track(name, data) {
  try {
    if (window.umami && typeof window.umami.track === 'function') {
      window.umami.track(name, data || {});
    }
  } catch (e) { /* analytics must never break the page */ }
  // Always emit a DOM event too, so a different provider can be swapped in
  // later without touching the markup.
  document.dispatchEvent(new CustomEvent('linguease:' + name, { detail: data || {} }));
}

/* ---------- Work out which campaign this visitor arrived on -------------- */
function resolveCampaign() {
  const p = new URLSearchParams(window.location.search);
  const explicit = p.get('ct');
  if (explicit) return explicit.slice(0, 40);

  const source = (p.get('utm_source') || '').toLowerCase();
  const campaign = (p.get('utm_campaign') || '').toLowerCase();
  if (source || campaign) {
    return [source, campaign].filter(Boolean).join('-').replace(/[^a-z0-9-]/g, '').slice(0, 40);
  }

  const ref = document.referrer || '';
  if (/instagram\.com/i.test(ref)) return 'ig-organic';
  if (/tiktok\.com/i.test(ref)) return 'tiktok-organic';
  if (/facebook\.com/i.test(ref)) return 'fb-organic';
  return CONFIG.defaultCampaign;
}

/* ---------- Stamp pt/ct on every App Store link -------------------------- */
function stampAppStoreLinks(campaign) {
  // Apple's own campaign-link format. No locale segment, so it resolves to the
  // visitor's storefront rather than forcing the US one.
  const base = 'https://apps.apple.com/app/apple-store/id' + CONFIG.appStoreId;
  const links = document.querySelectorAll('a[href*="apps.apple.com"]');

  links.forEach(function (a) {
    const url = new URL(base);
    if (CONFIG.appleProviderToken) {
      url.searchParams.set('pt', CONFIG.appleProviderToken);
      url.searchParams.set('ct', campaign);
      url.searchParams.set('mt', '8');
    }
    a.href = url.toString();

    a.addEventListener('click', function () {
      track('appstore-badge', {
        campaign: campaign,
        placement: a.getAttribute('data-placement') || 'unknown',
      });
    });
  });

  return links.length;
}

/* ---------- Scroll depth: did they read, or did they bounce? ------------- */
function trackScrollDepth() {
  let fired = false;
  window.addEventListener('scroll', function () {
    if (fired) return;
    const scrolled = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
    if (scrolled >= 0.75) {
      fired = true;
      track('scrolled-75');
    }
  }, { passive: true });
}

/* ---------- Go -----------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function () {
  const campaign = resolveCampaign();
  const stamped = stampAppStoreLinks(campaign);
  trackScrollDepth();

  if (!CONFIG.appleProviderToken) {
    console.warn(
      '[Linguease] appleProviderToken is empty — App Store links carry no campaign ' +
      'attribution. Installs will not be traceable to a campaign in App Store Connect. ' +
      'See src/analytics.js CONFIG.'
    );
  }
  if (!CONFIG.umamiWebsiteId) {
    console.warn('[Linguease] umamiWebsiteId is empty — badge taps are not being counted.');
  }
  console.info('[Linguease] campaign=' + campaign + ' appstore-links=' + stamped);
});

})();
