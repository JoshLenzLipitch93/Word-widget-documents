# Linguease — landing page

Static marketing site for [lingueaseapp.com](https://lingueaseapp.com).

Repositioned Portuguese-first on 2026-08-26 to match the social test and the
paid-traffic hook. The design system is unchanged — same tokens, same TTFs the
iOS app ships.

## Stack

- Plain HTML + CSS + two small scripts. No build step, no framework.
- Deploys to Netlify from `src/`.
- Brand tokens, fonts, assets and voice rules live in `.claude/skills/linguease-design/`.

## ⚠️ Two values to fill in before the paid test

Both live in the `CONFIG` block at the top of `src/analytics.js`. Until they're
set, the page works fine but measures nothing.

**1. `umamiWebsiteId`** — counts visits and, critically, App Store badge taps.
Sign in at [cloud.umami.is](https://cloud.umami.is) (free tier), add
`lingueaseapp.com`, copy the website ID. Cookieless and GDPR-clean, so no
consent banner is needed. Swap for Plausible/PostHog by changing the loader —
every event also fires as a DOM `CustomEvent`, so the markup is provider-agnostic.

**2. `appleProviderToken`** — this is the one that gives attributed installs
**with no SDK**. App Store Connect → App Analytics → Acquisition → Campaigns →
Create Campaign. The generated link contains `?pt=XXXXXXX`; that number goes in
CONFIG. `analytics.js` then stamps `pt` + `ct` + `mt=8` on every App Store link
on the page, so installs land in the ASC Campaigns report broken out by source.

> **If `pt` is missing, Apple silently discards the `ct` data.** No error, no
> warning in ASC — the campaign column is just empty. The page logs a console
> warning when it's unset.

### Campaign tokens

`analytics.js` resolves the campaign automatically, in this order:

| Arriving with | `ct` becomes |
|---|---|
| `?ct=whatever` | `whatever` |
| `?utm_source=meta&utm_campaign=hook-test` | `meta-hook-test` |
| Referrer instagram.com / tiktok.com / facebook.com | `ig-organic` / `tiktok-organic` / `fb-organic` |
| Anything else | `site-direct` |

So a Meta ad pointed at `lingueaseapp.com/?utm_source=meta&utm_campaign=hook-test`
produces installs tagged `meta-hook-test` in App Store Connect, cleanly separated
from the organic TikTok/IG traffic the 35-post test generates.

## Local preview

```bash
python3 .claude/serve.py
```

Serves `src/` on http://127.0.0.1:4173 (honours `$PORT`).

⚠️ The plain Python server does **not** apply the Netlify redirects, so
`/privacy-policy`, `/support` and `/terms` will 404 locally. Use the `.html`
paths when previewing, or install the Netlify CLI and run `netlify dev` to
exercise the real routing.

## Deploy

```bash
netlify deploy --prod
```

`netlify.toml` publishes `src/`.

### ⚠️ Read before the first deploy

`lingueaseapp.com` currently serves **a different repo** — root is a Netlify
404, but `/privacy-policy`, `/terms`, `/terms-of-use` and `/support` all return
200 from it. Those URLs are on the live App Store listing and `/privacy-policy`
is an App Review 5.1.1 dependency.

Deploying this repo over that domain replaces them. That's safe **only because**
those pages have been ported into this repo:

- `src/privacy-policy.html` — Termly text carried across **byte-for-byte**, wrapped
  in a minimal shell (doctype, charset, viewport, title). Legal wording untouched.
- `src/terms-of-use.html` — same treatment.
- `src/support.html` — rewritten on-brand, with two factual corrections (below).

Routing is declared twice on purpose — `netlify.toml` **and** `src/_redirects` —
so a change to one mechanism can't silently drop an App Review URL.

**Verify immediately after deploying:**

```bash
for p in "" privacy-policy privacy terms terms-of-use support; do printf "%-16s " "/$p"; curl -sS -o /dev/null -w "%{http_code}\n" -L "https://lingueaseapp.com/$p"; done
```

All six must return 200.

## Corrections made 2026-08-26

- **The live support page said the app uses Screen Time. It doesn't.**
  `SettingsView.swift:35` reads *"Removed Focus Gate (Family Controls) states for
  Shortcuts-only approach"*, there's no `family-controls` entitlement in the
  project, and `FocusGateManager` is written to compile without it. The shipping
  mechanism is a Siri Shortcuts personal automation. The landing page was already
  right; the support page was wrong and has been corrected.
- **Language count.** The live pages claimed 8 (landing) and 5 (support). The
  picker in `SharedModels.swift` holds **51**, with English and Brazilian
  Portuguese flagged as the primary launch pair. Both pages now say
  "Brazilian Portuguese, plus fifty more".
- **Mobile navigation didn't exist.** At 375px the nav measured 347px, collided
  with the wordmark and pushed the document to 481px — the whole page scrolled
  sideways. Section links are now hidden below 720px, leaving the wordmark and CTA.
- **The primary CTA sat below the fold** at 720px tall (badge bottom was 721px).
  Hero spacing and display size tightened; it now clears on both desktop and mobile.
- **Sample vocabulary was Spanish, French, Italian and German** — `hola`, `agua`,
  `pane`, `morgen`. Every word on the page is now Brazilian Portuguese, drawn from
  the same sets the social posts teach, so an ad and this page show identical
  vocabulary.
- Footer links pointed at `/privacy.html`, `/terms.html`, `/support.html`, none of
  which existed. Now `/privacy-policy`, `/terms-of-use`, `/support`.
- Added `og:image` (1200×630, generated from the brand fonts — regenerate with the
  snippet in git history if the hero copy changes).

## Still open

- [ ] Fill in the two CONFIG values. Once you have them:

  ```bash
  ./setup-analytics.sh --pt 123456 --umami abcd-1234
  ```

  Patches `analytics.js`, validates it parses, commits, pushes, waits for the
  Netlify build and confirms the new config is live. `--umami` is optional.
  Neither value could be fetched programmatically: the ASC API has no campaigns
  endpoint (`/v1/campaigns` 404s) and the provider token only exists once a
  campaign is created in the web UI.
- [ ] The App Store **description** still links `linguease.app/privacy` and
      `/terms`. That domain does not resolve at all (DNS failure, not a cert
      issue). Fixing it needs a version submission — it is not fixable from here.
- [ ] Decide whether `JoshLenzLipitch93/Word-widget-documents` should be
      retired once this is live. Do not leave both pointed at the domain.
- [ ] The design bundle ships without the PNG hero renders; the page uses
      live-rendered CSS widget tiles instead, which reads as intentional.
