# Assets — what's here and what's missing

## Present

- `logo.svg` — the Linguease yellow glyph logo, imported from the iOS repo's `logo.imageset/Logo.svg`. Fill colour is `#FFC66F` (same as widget theme 7).

## Missing (need the raw PNGs from the iOS Xcode project)

The imported repo tool couldn't pull binary PNGs, so the following referenced assets are **styled placeholders** in the preview cards and UI kits. Drop real PNGs with these exact filenames into this folder and the mocks will wire up.

| Expected filename | Where used |
| --- | --- |
| `3d-widgets-pattern.png` | WelcomeView full-bleed hero decoration |
| `onboarding-1.png` | Onboarding step 1 (add words) |
| `onboarding-2.png` | Onboarding step 2 (widget shows) |
| `onboarding-3.png` | Onboarding step 3 (widget colour change) |
| `notification-image.png` | Onboarding step 4 (allow notifications) |
| `phone-image.png` | Generic phone + widget illustration |
| `siri-phone-image.png` | Siri shortcuts illustration |
| `intervention-screenshot.png` | App-intervention hero |
| `widget-yellow-large.png` | Large yellow widget marketing shot |
| `widget-orange-large.png` | Large orange widget marketing shot |
| `bolt-image.png` | Paywall / upgrade hero |
| `thumbs-up-image.png` | Success state illustration |
| `app-intervention-customisation.png` | Settings entry card illustration |
| `widget-customisation.png` | Settings entry card illustration |

In the Xcode project these map to: `Assets.xcassets/3d widgets pattern.imageset/3d widgets pattern@3x.png`, `Assets.xcassets/onboarding image 1.imageset/onboarding image 1@3x.png`, etc.
