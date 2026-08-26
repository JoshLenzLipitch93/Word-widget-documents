#!/usr/bin/env bash
# Fill in the two analytics values, verify, commit and deploy.
#
#   ./setup-analytics.sh --pt 123456 [--umami abcd-1234-...]
#
# --pt     App Store provider token. App Store Connect → Analytics → Acquisition
#          → Campaigns → (+). The generated link contains ?pt=XXXXXXX.
#          This is the one that matters: without it Apple silently discards all
#          campaign data.
# --umami  Optional. cloud.umami.is → add lingueaseapp.com → website ID.
#          Adds landing-page views and scroll depth. Not required for the test.

set -euo pipefail
cd "$(dirname "$0")"
CFG="src/analytics.js"
PT=""; UMAMI=""

while [ $# -gt 0 ]; do
  case "$1" in
    --pt)    PT="${2:-}";    shift 2 ;;
    --umami) UMAMI="${2:-}"; shift 2 ;;
    *) echo "unknown argument: $1" >&2; exit 1 ;;
  esac
done

[ -z "$PT" ] && [ -z "$UMAMI" ] && { echo "nothing to set. pass --pt and/or --umami" >&2; exit 1; }

if [ -n "$PT" ]; then
  [[ "$PT" =~ ^[0-9]+$ ]] || { echo "❌ --pt must be digits only, got: $PT" >&2; exit 1; }
  perl -0pi -e "s/appleProviderToken: '[^']*'/appleProviderToken: '$PT'/" "$CFG"
  echo "✅ appleProviderToken = $PT"
fi

if [ -n "$UMAMI" ]; then
  [[ "$UMAMI" =~ ^[A-Za-z0-9-]+$ ]] || { echo "❌ --umami looks wrong: $UMAMI" >&2; exit 1; }
  perl -0pi -e "s/umamiWebsiteId: '[^']*'/umamiWebsiteId: '$UMAMI'/" "$CFG"
  echo "✅ umamiWebsiteId = $UMAMI"
fi

node --check "$CFG" || { echo "❌ analytics.js no longer parses — reverting"; git checkout -- "$CFG"; exit 1; }
echo "✅ analytics.js parses"

git add "$CFG"
git commit -q -m "Wire up analytics configuration

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
git push -q origin main
echo "✅ pushed — Netlify is building"

printf "waiting for deploy"
for i in $(seq 1 25); do
  sleep 8; printf "."
  if curl -sSL --max-time 12 "https://lingueaseapp.com/analytics.js?cb=$RANDOM" 2>/dev/null | grep -q "appleProviderToken: '${PT:-__none__}'"; then
    echo; echo "✅ live and serving the new config"
    echo
    echo "Test the full attribution path by opening:"
    echo "  https://lingueaseapp.com/?utm_source=meta&utm_campaign=hook-test"
    echo "The App Store badge should carry ?pt=$PT&ct=meta-hook-test&mt=8"
    exit 0
  fi
done
echo; echo "⚠️  deploy not detected after ~3 min — check https://app.netlify.com/projects/lingueaseapp"
