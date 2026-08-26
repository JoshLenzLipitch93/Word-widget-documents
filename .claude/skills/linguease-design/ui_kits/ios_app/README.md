# Linguease iOS app — UI kit

Pixel-faithful HTML recreation of the Linguease iOS app's core flow. Source references:

- `Word widget/Features/Authentication/Views/WelcomeView.swift` → `WelcomeScreen`
- `Word widget/Features/Onboarding/Views/OnboardingView.swift` → `OnboardingScreen` (4 steps)
- `Word widget/Features/Vocabulary/Views/VocabularyListView.swift` → `HomeScreen`
- `Word widget/Features/Settings/Views/SettingsView.swift` → `SettingsScreen`
- `Word widget/Shared/Components/PrimaryButton.swift` → `PrimaryButton` (variants: blue, terracotta, dark, email)

## Components (App.jsx)

`PrimaryButton`, `WordRow`, `AddWordRow`, `SuggestionChip`, `StatsPill`, `SegmentedTab`, `SettingsRow`, `SettingsGroup`, `AppHeader`, `Icon`.

## Screens (Screens.jsx)

`WelcomeScreen`, `OnboardingScreen`, `HomeScreen`, `SettingsScreen`, `LingueaseApp` (shell with routing).

## Known gaps — flagged substitutions

- **Hero decorative pattern** on WelcomeView is rendered as a soft radial-light overlay instead of the real `3d widgets pattern` PNG. Drop the real asset in `assets/` and swap the overlay for `<img src=".../3d-widgets-pattern.png" …>`.
- **Onboarding hero illustrations** (`onboarding image 1-3`, `notification image`) are replaced with inline widget mocks + a notification preview, not the real 3D renders.
- **"Continue with Apple"** uses the Apple logo SVG; production app uses the real Apple Sign-In button provided by the system.
- **App intervention screens** (Siri-Shortcuts gate experience) are not mocked here — the product screens for this surface live mostly in the Shortcuts app itself; the in-app configuration is a single `SettingsRow` linking to a deeper screen that isn't in the main flow.
- **Icons** use the in-file inline SVG icon set styled to match the stroke weight of the app's custom icons. The real product uses bundled PNG icons at 1x/2x/3x.
