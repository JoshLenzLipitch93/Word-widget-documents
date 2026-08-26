# Linguease Design System

Linguease (repo name: **Word-Widget**, marketing domain: `mywordwidget.com`) is an iOS language-learning app that makes vocabulary learning a passive, background habit instead of a deliberate study session. Two product surfaces do the heavy lifting:

1. **The iOS home-screen widget** — shows one vocabulary word at a time (translation on top, source word in italic underneath, optional phonetic), recolors itself to stay visually "loud," and updates on a spaced-repetition cycle.
2. **App interventions** — Siri Shortcuts automations that gate distracting apps (Instagram, TikTok, X, YouTube, Reddit, Facebook). When the user opens one of those apps, Linguease first makes them type out a vocabulary word or two — a friction prompt that turns an impulsive tap into 10 seconds of learning.

Supporting these is a simple SwiftUI app for adding/editing the word list, reviewing completed words, customizing widget themes + intervention behavior, and settings.

---

## Sources

- **Codebase:** `JoshLenzLipitch93/Word-Widget` on GitHub (private). Pulled via the GitHub connector — file paths in the `/Word widget/…` subtree.
  - Theme + Typography: `Word widget/Shared/Theme/*.swift`
  - Primary button: `Word widget/Shared/Components/PrimaryButton.swift`
  - Auth / Welcome: `Word widget/Features/Authentication/Views/WelcomeView.swift`
  - Onboarding: `Word widget/Features/Onboarding/Views/*`
  - Vocabulary list: `Word widget/Features/Vocabulary/Views/*`
  - Settings: `Word widget/Features/Settings/Views/SettingsView.swift`
  - Image assets: `Word widget/Assets.xcassets/*`
- **Figma:** None provided.
- **Brand:** Product name **Linguease** (used in copy, e.g. _"Touch and hold the Linguease app icon…"_). Marketing URL `https://mywordwidget.com`.

## ⚠️ Asset caveats (please read)

- The imported repo gave me the **SVG logo** (`assets/logo.svg`) but the PNG/JPG imagery (widget renders, the 3D-widget onboarding pattern, onboarding illustrations, Siri/intervention screenshots, notification image) could not be pulled through the import tool — they appear as **styled placeholders** in the preview cards and UI-kit screens. Please drop the real PNGs into `assets/` using the same filenames I reference (listed in `assets/README.md`) and they'll wire up automatically.
- **Fonts** — the real brand TTFs are now in `fonts/` (Instrument Serif regular + italic, Roboto variable + italic variable). `colors_and_type.css` wires them up via `@font-face`.

---

## Index

| Path | Purpose |
| --- | --- |
| `README.md` | This file — manifest, brand voice, visual foundations, iconography. |
| `colors_and_type.css` | All color + type tokens as CSS variables + semantic classes. Source of truth for mocks. |
| `SKILL.md` | Agent-skill entry point (for Claude Code). |
| `assets/` | Logo + imagery referenced by the system. |
| `fonts/` | _(empty — awaiting real TTFs; Google Fonts used for now.)_ |
| `preview/` | Small HTML cards that populate the Design System tab: palettes, type specimens, spacing, components, brand. |
| `ui_kits/ios_app/` | SwiftUI→HTML recreation of the core iOS app screens. |
| `ui_kits/widget/` | All 24 widget color themes + size variants (small / medium / large) as pixel-faithful HTML. |

---

## Content fundamentals

Linguease writes like **a calm, slightly dry British friend who has already done your homework for you.** No hype, no exclamation marks, no emoji. The tone is observational and procedural — it tells you what to do and what the thing is, then gets out of the way.

### Voice rules

- **British English spelling** throughout. `customisation` not `customization`, `colour` not `color`, `whilst` where an American would say `while`. (Observed in code: `"Widget customisation"`, `"App intervention customisation"`, `"The widget changes colour to keep your attention."`, and a "Theme — Colour" CSS variable.)
- **Lower-case sentence case** for every heading, button and setting. Title Case is never used for display copy. Examples from the product: `"Your effortless language boost"`, `"Allow notifications for the best learning experience"`, `"First, add the widget"`, `"Widget customisation"`, `"How it works"`, `"Translate from"`, `"Danger zone"`.
- **Second person, present tense.** Addresses the user as _you_, implicitly — `"Add words..."`, `"Finish setting up"`. Avoids "we" except when unavoidable in error states: `"We can't detect the widget yet."`.
- **No exclamation marks.** Anywhere. Affirmations land flat-but-warm: `"I've added the widget"` (button label) instead of `"Done!"`.
- **No emoji** in UI copy. The only emoji-adjacent glyphs are country flags used beside language names in the language picker (`🇬🇧 English`, `🇯🇵 Japanese`), which are functional, not decorative.
- **No marketing-speak.** No "unlock", "journey", "master", "level up", "seamlessly". The product describes its own mechanics plainly: _the widget changes colour_, _type the letters_, _allow notifications_.
- **Short.** Titles top out around 6–8 words. Subtitles are one sentence and frequently omitted (three of four onboarding pages have no subtitle at all).
- **Ellipses for "…and then".** Page 1 reads `"Add words..."` and page 2 completes the thought: `"... and they show on the widget."` — a micro-narrative across two screens.

### Casing specifics

- **All-caps** is used sparingly — only for section eyebrows in Settings (`LANGUAGE SETTINGS`, `GENERAL`, `DANGER ZONE`), rendered at 13px, tracked loose, and coloured mid-grey. Never for buttons or headlines.
- **Italics** are used exclusively on the Instrument Serif typeface, to mark secondary meaning — the source-language word under its translation, and the add-a-word placeholder.
- **Quoted strings** use straight double quotes (code artefact), but product copy avoids quoting anything.

### Copy examples (verbatim, for reference)

> Your effortless language boost
>
> First, add the widget
> Touch and hold the Linguease app icon, then select one of the 3 widget sizes.
>
> The widget changes colour to keep your attention.
>
> Allow notifications for the best learning experience
>
> Finish setting up
> • Swipe a word right to complete it
> • Swipe a word left to delete it
>
> Delete \[AppName\] from Linguease?
> You need to remove the Shortcuts automation as well in the Shortcuts app.

When you need to write new copy, test it against the question: _would a calm British person in their mid-30s say this out loud?_ If not, trim.

---

## Visual foundations

Linguease feels **warm, flat, analog, and low-pressure.** It is explicitly not a gamified language app — there are no progress bars flexing at you, no streak fires, no mascot. The whole system is built on a warm-neutral page colour and a single terracotta accent, with a small set of desaturated secondary colours for the widget themes.

### Palette in use

- **Page background is `#FAF5F2` (extra-light-grey)** — a warm, almost-pink off-white. Almost every screen uses this as the fill. It's the single most important colour in the system; swapping it for pure white would kill the warmth.
- **Text is never pure black.** Body copy uses `#434446` (`off-black`); secondary copy uses `#918B87` (`dark-grey`); placeholders / muted labels use `#C4BEBB` (`mid-grey`). This warm-greige ladder is how the product earns its quiet feel.
- **Terracotta `#DC624F`** is the hero accent, used _extremely sparingly_: the floating `+` button on the learning screen, the WelcomeView background, and as a destructive / destructive-state accent. Pressed state darkens to `#C84D3A`.
- **Bright blue `#5D94EE`** is a secondary accent used for the "new word" indicator bar on word rows and occasional callouts. The primary button is always **off-black `#434446`** — no blue CTAs, no terracotta CTAs (terracotta is reserved for the FAB).
- **Widget palettes (24 themes)** are a deliberate mood board of saturated/pastel pairs — coral, sage, lime, peach, lavender, sky-blue, dark-green, navy, magenta, teal, yellow-on-red, pink-on-yellow, etc. They're not meant to match each other; they rotate one-at-a-time on the widget to break visual habituation.
- **Yellow `#FFC66F`** is the logo colour and shows up in the swipe-to-complete action. It's also widget theme 7 ("Orange" in code).

### Type vibe

- **Instrument Serif** carries everything expressive: the hero display, screen titles, the word on the widget, stats numbers, user's name in settings. It has a slightly "wet-ink" quality and runs narrow, which lets the product set very large display text (44px hero) without feeling loud.
- **Roboto Light (300)** is the default body weight. Medium (500) is used only for small emphasis labels like `"Finish setting up"`. There is no heavy / bold weight anywhere in the running UI.
- **Italic serif** marks the _secondary_ word (source language) under the translation, and the placeholder text.

### Backgrounds & texture

- **No gradients anywhere.** The only places with fills more complex than a solid are: (a) the WelcomeView which overlays a decorative **"3d widgets pattern"** PNG against the terracotta background, and (b) the widget previews themselves.
- **No photography.** All imagery is either (1) the logo glyph, (2) flat 3D-rendered widget illustrations used as onboarding and marketing hero imagery, or (3) iOS mock-device illustrations ("phone image") used to show the widget in-situ.
- **No grain, no noise, no texture layers.** Surfaces are solid colour.
- **No SVG illustration.** Imagery is raster PNG, shipped at 1x/2x/3x.

### Animation

- **Default ease is `easeOut` at 150–280 ms.** PrimaryButton press uses `easeOut(0.15)`. Segmented toggle slide uses `easeInOut(0.28)`. Modal sheet transitions use `easeInOut(0.24)`. Onboarding page transitions use `easeOut(0.35)` for the widget colour crossfade, `easeOut(0.6)` for the entry slide.
- **Haptics on interaction.** `HapticsManager.tap()` fires on button press, `.selectionChanged()` on toggles and chips, `.successNotification()` on completion. This is the real "feel" of the system — visuals stay calm because touch feedback carries the response.
- **No bouncing, no springs.** Zero `spring()` animations in the codebase. Motion is entirely ease-out.
- **No page/scroll parallax, no hero transitions.**

### Interaction states

- **Press state on primary buttons:** the button darkens by one shade (off-black → `midOffBlack #515356`, white → `#F2EBE6`, yellow → darker yellow), with a deliberate 150 ms delay before releasing. Button ink is **Roboto 16 medium**. _No scale transform, no shadow change._
- **Press state on list rows / settings rows:** a 5%-black overlay (`Color.black.opacity(0.05)`) fades in. Again, no scale.
- **Disabled state:** `opacity(0.5)` on the whole component, no color change.
- **Focus on inputs:** no visible ring. The only indication is the caret appearing and the keyboard rising. (Browser previews should use a subtle focus ring since there's no haptic fallback on web.)

### Borders, hairlines, outlines

- **Hairline rows:** `Color.black.opacity(0.05)` at 1px between word rows and settings rows. This is the system's universal separator.
- **Outline buttons:** the "Continue with Email" button uses a 1px `extra-light-grey` (#FAF5F2) stroke over the terracotta background — a subtle tone-on-tone border.
- **Card strokes:** the widget-install video modal has a 4.6px `off-black` stroke matching iOS phone bezels. Other cards are _strokeless_.

### Shadow system

- **There is one shadow in the system:** `0 12px 24px rgba(0,0,0,0.05)` — used only on the "Finish setting up" banner card on the learning screen. Everything else is **flat.** The app relies on the warm page color + slightly-darker row color to create depth instead of shadow.

### Blur / transparency

- **Modal scrims:** `Color.black.opacity(0.20)` or `0.25` behind sheets.
- **No backdrop blur anywhere.** The system doesn't use `ultraThinMaterial`.
- **Translation colors on widgets:** most are derived from the primary-word colour at ~70% alpha, pre-composited to a solid hex so the widget itself can stay fully opaque.

### Corner radius ladder

- `10px` — primary button (exact, from `PrimaryButton.swift`).
- `12px` — cards, stats pill, settings groups, widget-install video frame is 18.
- `16px` — settings icon chip, segmented control outer.
- `18px` — modal video container.
- `38px` — bottom-sheet modal.
- `∞` (capsule) — suggestion chips, FAB.
- Widget corner is **device-supplied**; in the in-app preview, it's computed as **11.57% of the widget's side** for visual parity.

### Cards

- **Flat rounded rectangle on a tone-darker fill.** No border, no shadow (except the one banner case above). Radius 12px. Internal padding 16px.
- **Section groups in Settings** stack multiple rows inside one 12px rounded light-grey container, divided by 1px extra-light-grey (page-color) lines — so dividers appear as "cuts" rather than added strokes.

### Layout rhythm

- **16px is the dominant unit.** Screen horizontal padding, card internal padding, default vertical gap.
- **8 / 12 / 16 / 24 / 32 / 40 / 48 / 56** is the observed spacing ladder.
- **Section-to-section vertical spacing is 32px** (Settings screen).
- **Content is centred within the safe area.** No max-width constraint beyond stats bar (`maxWidth: 420`).
- **Fixed UI:** the floating `+` button is fixed-bottom-centre with 60×60 terracotta circle. The header is inline (not sticky).

### Imagery mood

Where real photographic imagery exists (it's mostly 3D-rendered product hero shots), it's **warm, cream-backgrounded, soft-shadowed**, with the widget tiles rendered at ~45° isometric. Colour temperature is warm (reads slightly pink under D65). No b&w, no grain.

---

## Iconography

Linguease ships **its own flat-line custom icon set** as named image assets in Xcode (`icon_back`, `icon_settings`, `icon_tick`, `icon_delete`, `icon_plus`, `icon_sound_small`, `icon_arrow small right`, `icon_close_small_round`, `icon_help`, `icon_skip`, `icon_redo`, `icon_active`). They are rendered as **template images** (`renderingMode(.template)`) so they inherit colour from the surrounding view — that's why you'll almost always see icons in `off-black` (`#434446`) or whatever the containing button tints them to.

### Style

- **Line icons, not filled.** Medium stroke weight (~2px optical at 28×28 native size). No duotone, no filled variants.
- **28×28 default hit box**, 18–22×18–22 visible glyph size inside. (`icon_settings` is 28×28 inside a 44×44 rounded square.)
- **Rounded joints and caps**, not sharp. Geometry is slightly softened, which matches the warm typography.
- **Square pictograms** with generous padding — the glyph doesn't fight the edge of its 28px box.

### Icons present in the codebase

| Name | Usage |
| --- | --- |
| `icon_plus` | Floating add-word button (terracotta FAB) |
| `icon_tick` | Completed tab, swipe-to-complete action, completed words |
| `icon_delete` | Swipe-to-delete trailing action (terracotta tint) |
| `icon_back` | Header back arrow |
| `icon_close_small_round` | Modal close (18×18) |
| `icon_close-1`, `icon_close` | Other close variants |
| `icon_settings` | Top-left in learning screen header |
| `icon_help` | "How it works" entry point |
| `icon_redo` | Refresh suggestions chip |
| `icon_skip` | Skip action in intervention |
| `icon_active` | Currently-learning indicator in segmented tab |
| `icon_sound_small` | Pronounce word (circular grey chip) |
| `icon_arrow small right` | Row chevrons — every single nav row uses this, not SF Symbols' chevron |
| `checkbox_active` | Round green-check for checklist items |
| `red check`, `xl_check-icon` | Large celebratory checks (completed flows) |

### System icons

The codebase uses **one SF Symbol**: `chevron.right` appears in the `dangerZoneSection` ("Log out", "Delete account") rather than the custom `icon_arrow small right`. That's the only system-icon leak. Everywhere else uses custom assets. For new designs, _do not_ reach for SF Symbols — substitute a custom line icon that matches the existing stroke weight.

### Flags

Country flags (`🇬🇧`, `🇯🇵`, …) are the **only emoji** used in product surfaces, and only in the language picker next to the language name. They are rendered as emoji unicode, not as custom art.

### Decorative illustration

Three named illustration sets support onboarding/welcome/marketing:

- `3d widgets pattern` — full-bleed hero pattern on WelcomeView (3D-rendered widget tiles repeating).
- `onboarding image 1/2/3` — phone mock with the widget animating colour/content changes.
- `notification image`, `phone image`, `siri phone image`, `intervention screenshot`, `Siri image`, `bolt image`, `thumbs up image`, `line graphic` — small 1–3 image hero illustrations used one-per-step in onboarding / paywall / how-it-works flows.

All illustrations are **raster PNGs**, warm-lit, with soft shadows and a cream background. No vector illustration in the system.

### In this design-system project

We don't have a production-ready icon CDN pre-loaded, and the app's custom line icons aren't public. For HTML mocks, **substitute [Lucide](https://lucide.dev/) icons at `stroke-width: 1.75`** — they match the rounded-joint, medium-stroke feel closest. Flag the substitution in any deliverable. Concretely: `plus`, `check`, `trash-2`, `chevron-left`, `chevron-right`, `x`, `settings`, `help-circle`, `volume-2`, `rotate-ccw`, `sparkle` cover almost every icon use in the app.
