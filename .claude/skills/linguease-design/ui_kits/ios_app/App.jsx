// Linguease iOS app — simplified JSX recreation of the SwiftUI app.
// Core screens: Welcome, Onboarding, Learning list (home), Settings.
// Source references in comments point back to the Swift files.

const LX = {
  // Page + ink
  bgPage: '#FAF5F2', surface: '#FFFFFF', row: '#F2EBE6',
  ink: '#434446', ink2: '#918B87', ink3: '#C4BEBB',
  divider: 'rgba(0,0,0,0.05)',
  // Brand
  terracotta: '#DC624F', terracottaDeep: '#C84D3A',
  blue: '#5D94EE', bluePressed: '#DAE5F7',
  yellow: '#FFC66F',
  // Widget fg example
  wordDarkTerracotta: '#722316', peachText: '#FFC4BA',
};

// ── Primitives ─────────────────────────────────────────────────

function Icon({name, size=24, color='currentColor', stroke=1.8}) {
  const p = {stroke:color, strokeWidth:stroke, strokeLinecap:'round', strokeLinejoin:'round', fill:'none'};
  const paths = {
    plus: <path d="M12 5v14M5 12h14" {...p}/>,
    check: <path d="M20 6L9 17l-5-5" {...p} strokeWidth={2.2}/>,
    settings: <><circle cx="12" cy="12" r="3" {...p}/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h0a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v0a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" {...p}/></>,
    back: <path d="M15 18l-6-6 6-6" {...p} strokeWidth={2}/>,
    chevron: <path d="M9 6l6 6-6 6" {...p} strokeWidth={2}/>,
    close: <path d="M18 6L6 18M6 6l12 12" {...p} strokeWidth={2}/>,
    sound: <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" {...p}/>,
    redo: <path d="M1 4v6h6M23 20v-6h-6M3.51 9a9 9 0 0114.85-3.36L23 10M20.49 15a9 9 0 01-14.85 3.36L1 14" {...p}/>,
    help: <><circle cx="12" cy="12" r="9" {...p}/><path d="M9.5 9a2.5 2.5 0 015 0c0 2-2.5 2.5-2.5 4.5M12 17h.01" {...p}/></>,
    trash: <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" {...p}/>,
    tickRound: <><circle cx="12" cy="12" r="9" {...p}/><path d="M8 12l3 3 5-6" {...p}/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24">{paths[name]}</svg>;
}

// ── PrimaryButton (PrimaryButton.swift) ────────────────────────

function PrimaryButton({children, variant='dark', onClick, icon}) {
  const [pressed, setPressed] = React.useState(false);
  const styles = {
    dark:   {bg: LX.ink,    pressed: '#515356', fg:'#fff'},
    white:  {bg: '#FFFFFF', pressed: '#F2EBE6', fg: LX.ink, border: '1px solid rgba(67,68,70,0.10)'},
    yellow: {bg: LX.yellow, pressed: '#F2B55C', fg: LX.ink},
  }[variant];
  return (
    <button
      onMouseDown={()=>setPressed(true)}
      onMouseUp={()=>setPressed(false)}
      onMouseLeave={()=>setPressed(false)}
      onClick={onClick}
      style={{
        display:'flex', alignItems:'center', justifyContent:'center', gap:10,
        width:'100%', height:52, border:styles.border||'none', borderRadius:10,
        background: pressed ? styles.pressed : styles.bg,
        color: styles.fg, fontFamily:'"Roboto",sans-serif', fontSize:16, fontWeight:500,
        cursor:'pointer', transition:'background 150ms ease-out',
      }}>
      {icon}
      {children}
    </button>
  );
}

// ── WordRow (VocabularyRow) ────────────────────────────────────

function WordRow({word, translation, phonetic, indicator='none'}) {
  const barColor = indicator === 'active' ? LX.ink : indicator === 'new' ? LX.blue : 'transparent';
  return (
    <div style={{display:'flex', alignItems:'stretch', borderBottom:`1px solid ${LX.divider}`}}>
      <div style={{width:2, margin:'16px 0', marginLeft:16, background:barColor, borderRadius:20}}/>
      <div style={{flex:1, padding:'16px', marginLeft:14}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{fontFamily:'"Instrument Serif",serif', fontSize:24, color:LX.ink, lineHeight:1.1}}>{word}</div>
          <button style={{width:32, height:32, borderRadius:'50%', background:LX.row, border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}>
            <Icon name="sound" size={16} color={LX.ink}/>
          </button>
        </div>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginTop:6}}>
          <div style={{fontFamily:'"Instrument Serif",serif', fontStyle:'italic', fontSize:20, color:LX.ink3, lineHeight:1.1}}>{translation}</div>
          {phonetic && <div style={{fontFamily:'"Roboto",sans-serif', fontWeight:300, fontSize:16, color:'rgba(67,68,70,0.4)'}}>{phonetic}</div>}
        </div>
      </div>
    </div>
  );
}

// ── AddWordRow (empty prompt row) ───────────────────────────────

function AddWordRow({value, onChange, onSubmit}) {
  return (
    <div style={{padding:'16px', borderBottom:`1px solid ${LX.divider}`}}>
      <input
        placeholder="Translation"
        readOnly
        style={{
          border:'none', background:'transparent', width:'100%',
          fontFamily:'"Instrument Serif",serif', fontSize:24, color:LX.ink3, outline:'none', padding:0,
        }}/>
      <input
        placeholder="Add a word in English"
        value={value}
        onChange={e=>onChange(e.target.value)}
        onKeyDown={e=>{if(e.key==='Enter')onSubmit();}}
        style={{
          marginTop:6, border:'none', background:'transparent', width:'100%',
          fontFamily:'"Instrument Serif",serif', fontStyle:'italic', fontSize:20,
          color:LX.ink, outline:'none', padding:0,
        }}/>
    </div>
  );
}

// ── Suggestion chip ────────────────────────────────────────────

function SuggestionChip({label, icon, onClick}) {
  return (
    <button onClick={onClick} style={{
      background:LX.row, border:'none', borderRadius:999,
      padding: icon ? '0' : '10px 16px',
      width: icon ? 40 : 'auto', height: icon ? 40 : 'auto',
      display:'flex', alignItems:'center', justifyContent:'center',
      fontFamily:'"Roboto",sans-serif', fontWeight:300, fontSize:16, color:LX.ink2, cursor:'pointer',
    }}>
      {icon || label}
    </button>
  );
}

// ── StatsPill ──────────────────────────────────────────────────

function StatsPill({stats}) {
  return (
    <div style={{background:'#FFE6CF', borderRadius:12, padding:'8px 16px', display:'flex', gap:12, maxWidth:420, margin:'0 auto'}}>
      {stats.map(([v,l],i)=>(
        <React.Fragment key={i}>
          {i>0 && <div style={{width:1, height:24, background:'rgba(215,113,25,0.10)', alignSelf:'center'}}/>}
          <div style={{flex:1, textAlign:'center'}}>
            <div style={{fontFamily:'"Instrument Serif",serif', fontSize:20, color:'#D96A0B', lineHeight:1}}>{v}</div>
            <div style={{fontFamily:'"Roboto",sans-serif', fontWeight:300, fontSize:14, color:'#D96A0B'}}>{l}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

// ── Segmented (learning / completed) ───────────────────────────

function SegmentedTab({value, onChange}) {
  return (
    <div style={{width:128, height:48, background:LX.row, borderRadius:16, padding:4, display:'flex', position:'relative'}}>
      <div style={{
        position:'absolute', top:4, left: value === 0 ? 4 : 64,
        width:60, height:40, background:LX.ink, borderRadius:13,
        transition:'left 280ms cubic-bezier(0.4,0,0.2,1)',
      }}/>
      <button onClick={()=>onChange(0)} style={{width:60, height:40, display:'flex', alignItems:'center', justifyContent:'center', border:'none', background:'transparent', position:'relative', zIndex:1, cursor:'pointer'}}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M2 3h6l2 4h10v12a2 2 0 01-2 2H4a2 2 0 01-2-2V3z" stroke={value === 0 ? LX.bgPage : LX.ink} strokeWidth="1.8" strokeLinejoin="round"/></svg>
      </button>
      <button onClick={()=>onChange(1)} style={{width:60, height:40, display:'flex', alignItems:'center', justifyContent:'center', border:'none', background:'transparent', position:'relative', zIndex:1, cursor:'pointer'}}>
        <Icon name="check" size={20} color={value === 1 ? LX.bgPage : LX.ink}/>
      </button>
    </div>
  );
}

// ── SettingsRow / SettingsGroup ────────────────────────────────

function SettingsRow({icon, iconBg, title, detail, toggle, chevron=true, destructive=false, onClick, isLast=false}) {
  return (
    <button onClick={onClick} style={{
      width:'100%', padding:'0 16px', minHeight:56, display:'flex', alignItems:'center', gap:12,
      background:'transparent', border:'none', textAlign:'left', cursor:'pointer',
      borderBottom: isLast ? 'none' : `1px solid ${LX.bgPage}`,
    }}>
      {icon && (
        <div style={{width:32, height:32, borderRadius:8, background:iconBg||LX.ink, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Icon name={icon} size={18} color="#fff"/>
        </div>
      )}
      <div style={{flex:1, fontFamily:'"Roboto",sans-serif', fontSize:16, fontWeight:400, color: destructive ? LX.terracotta : LX.ink}}>{title}</div>
      {detail && <div style={{fontFamily:'"Roboto",sans-serif', fontSize:16, fontWeight:300, color:LX.ink2}}>{detail}</div>}
      {toggle !== undefined && (
        <div style={{width:51, height:31, background: toggle ? LX.ink : LX.ink3, borderRadius:999, position:'relative', transition:'background 200ms'}}>
          <div style={{width:27, height:27, background:'#fff', borderRadius:'50%', position:'absolute', top:2, left: toggle ? 22 : 2, boxShadow:'0 2px 4px rgba(0,0,0,0.15)', transition:'left 200ms'}}/>
        </div>
      )}
      {chevron && toggle === undefined && !destructive && (
        <svg width="8" height="14" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6" stroke={LX.ink3} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
      )}
    </button>
  );
}

function SettingsGroup({header, children}) {
  return (
    <div style={{marginBottom:24}}>
      {header && <div style={{fontFamily:'"Roboto",sans-serif', fontSize:13, textTransform:'uppercase', color:LX.ink3, letterSpacing:'0.04em', padding:'0 20px 8px'}}>{header}</div>}
      <div style={{background:LX.row, borderRadius:12, overflow:'hidden', margin:'0 16px'}}>{children}</div>
    </div>
  );
}

// ── Nav header (learning screen) ───────────────────────────────

function AppHeader({tab, onTab, onSettings}) {
  return (
    <div style={{padding:'8px 16px 16px', display:'flex', alignItems:'center', gap:16}}>
      <button onClick={onSettings} style={{width:44, height:44, background:LX.row, borderRadius:16, border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}>
        <Icon name="settings" size={22} color={LX.ink}/>
      </button>
      <div style={{flex:1}}/>
      <SegmentedTab value={tab} onChange={onTab}/>
    </div>
  );
}

Object.assign(window, {
  LX, Icon, PrimaryButton, WordRow, AddWordRow, SuggestionChip,
  StatsPill, SegmentedTab, SettingsRow, SettingsGroup, AppHeader,
});
