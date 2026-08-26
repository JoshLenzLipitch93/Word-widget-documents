---
name: linguease-design
description: Use this skill to generate well-branded interfaces and assets for Linguease (the iOS vocabulary-learning app with a home-screen widget and app-intervention Shortcuts), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

Key files:

- `README.md` — the long-form brand guide (content voice, visual foundations, iconography, palette, iOS source references).
- `colors_and_type.css` — drop-in CSS with every token (colors, fonts, spacing, radii, shadow, type classes).
- `preview/` — small card HTML files that demonstrate every token visually.
- `ui_kits/ios_app/` — SwiftUI screens recreated as JSX React components (learning list, settings, onboarding, welcome, intervention gate).
- `ui_kits/widget/` — all 24 widget color themes in small / medium / large variants.
- `assets/logo.svg` — the Linguease yellow glyph logo. (Raster imagery is placeholder-only; see `assets/README.md` for the filenames the real PNGs should live under.)

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out of `assets/` and `ui_kits/`, reference `colors_and_type.css`, and create static HTML files for the user to view. If working on production code (SwiftUI), you can read the rules here to become an expert in designing with this brand but defer to `Word widget/Shared/Theme/*.swift` as the final source of truth.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Hard rules that are easy to break:

- British spelling (`colour`, `customisation`) in all user-facing copy.
- Sentence case, never Title Case.
- No emoji, no exclamation marks. Flags beside language names are the only exception.
- Page background is `#FAF5F2`, not white.
- Text is `#434446` (off-black), never pure black.
- Terracotta `#DC624F` is the brand accent (FAB only); off-black `#434446` is the **primary button colour**. Blue is secondary/indicator only.
- Primary button copy is **Roboto 16 medium**, not light.
- Primary button corner radius is **10px** — every other radius in the system is larger.
- One shadow exists in the whole system (`0 12px 24px rgba(0,0,0,0.05)`), used on the setup banner. Default to flat.
- Instrument Serif for display + the widget word; Roboto Light (300) for body + UI chrome. No bold weights in running UI.
