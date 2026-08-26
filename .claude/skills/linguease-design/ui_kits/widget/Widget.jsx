// Widget.jsx — pixel-faithful Linguease home-screen widget, all 3 iOS sizes.
// Source: Word widget/Features/Widget/* + WidgetPreviewView.swift.
// Radius = 11.57% of the widget's shorter side, matching iOS's continuous-corner preview math.

function WidgetTile({ size = 'small', theme, word, translation, phonetic, showLarge }) {
  // iOS widget pixel sizes on iPhone 15 Pro (scaled-up slightly for readability).
  const dim = {
    small:  { w: 170, h: 170 },
    medium: { w: 364, h: 170 },
    large:  { w: 364, h: 382 },
  }[size];

  const radius = Math.round(Math.min(dim.w, dim.h) * 0.1157);

  // Type scale by widget size
  const scale = {
    small:  { word: 34, trans: 20, phon: 12, pad: 16 },
    medium: { word: 56, trans: 30, phon: 15, pad: 22 },
    large:  { word: 78, trans: 40, phon: 18, pad: 28 },
  }[size];

  return (
    <div style={{
      width: dim.w, height: dim.h, borderRadius: radius,
      background: theme.bg, position: 'relative', overflow: 'hidden',
      boxShadow: '0 14px 30px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.05)',
      padding: scale.pad, boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column', justifyContent: size === 'large' ? 'flex-end' : 'center',
      fontFamily: '"Instrument Serif", Georgia, serif',
    }}>
      {/* For medium: word centered left, phonetic top-right */}
      {size === 'medium' && phonetic && (
        <div style={{
          position: 'absolute', top: scale.pad, right: scale.pad,
          fontFamily: '"Roboto", sans-serif', fontWeight: 300,
          fontSize: scale.phon, color: theme.trans,
        }}>{phonetic}</div>
      )}
      <div style={{
        fontSize: scale.word, color: theme.word,
        lineHeight: 1.0, letterSpacing: '-0.01em',
      }}>{word}</div>
      <div style={{
        fontSize: scale.trans, color: theme.trans,
        fontStyle: 'italic', lineHeight: 1.1, marginTop: 4,
      }}>{translation}</div>
      {(size === 'small' || size === 'large') && phonetic && (
        <div style={{
          fontFamily: '"Roboto", sans-serif', fontWeight: 300,
          fontSize: scale.phon, color: theme.trans,
          marginTop: 8,
        }}>{phonetic}</div>
      )}
    </div>
  );
}

window.WidgetTile = WidgetTile;
