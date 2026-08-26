// Linguease iOS app — screens: Welcome, Onboarding, Home (learning), Settings.
// Source references comment-embedded. Import App.jsx first.

// ── Welcome / Auth (WelcomeView.swift) ──────────────────────────

function WelcomeScreen({onContinue}) {
  return (
    <div style={{height:'100%', background:LX.terracotta, display:'flex', flexDirection:'column', position:'relative', overflow:'hidden'}}>
      {/* decorative pattern placeholder — 3d widgets pattern */}
      <div style={{position:'absolute', inset:0, backgroundImage:'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 45%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1), transparent 40%)', pointerEvents:'none'}}/>
      <div style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'0 24px 12px', position:'relative'}}>
        {/* mini widget preview floating in */}
        <div style={{alignSelf:'center', marginBottom:40}}>
          <div style={{width:160, height:160, borderRadius:19, background:'#FFC66F', padding:16, boxShadow:'0 20px 40px rgba(0,0,0,0.15)', display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <div style={{fontFamily:'"Instrument Serif",serif', fontSize:30, color:'#5D4520', lineHeight:1}}>ciao</div>
            <div style={{fontFamily:'"Instrument Serif",serif', fontStyle:'italic', fontSize:18, color:'#9C7336', marginTop:6}}>hello</div>
          </div>
        </div>
        <div style={{fontFamily:'"Instrument Serif",serif', fontSize:44, lineHeight:1.1, letterSpacing:'-0.01em', color:LX.bgPage, marginBottom:24}}>Your effortless<br/>language boost</div>
      </div>
      <div style={{padding:'0 24px 40px', display:'flex', flexDirection:'column', gap:12, position:'relative'}}>
        <PrimaryButton variant="dark" onClick={onContinue} icon={<svg width="18" height="22" viewBox="0 0 16 20"><path fill="#fff" d="M13.623 17.394c-.782 1.024-1.596 2.02-2.88 2.043-1.26.023-1.664-.748-3.107-.748s-1.891.725-3.083.771c-1.24.047-2.184-1.09-2.972-2.104C-.02 15.287-1.254 11.468.425 8.86c.83-1.294 2.318-2.116 3.918-2.142 1.215-.022 2.362.817 3.106.817.741 0 2.136-1.006 3.602-.858.615.026 2.338.248 3.447 1.878-.089.055-2.058 1.2-2.036 3.585.024 2.843 2.503 3.792 2.533 3.807-.02.08-.39 1.333-1.372 2.447m-4.93-15.73C9.377.846 10.502.198 11.428.158c.114 1.082-.308 2.168-.948 2.959-.635.79-1.676 1.41-2.697 1.33-.133-1.065.39-2.173.91-2.782"/></svg>}>Continue with Apple</PrimaryButton>
        <PrimaryButton variant="white" onClick={onContinue}>Continue with Email</PrimaryButton>
        <div style={{textAlign:'center', marginTop:8, fontFamily:'"Roboto",sans-serif', fontSize:13, fontWeight:300, color:LX.peachText}}>By continuing, you agree to our Terms and Privacy</div>
      </div>
    </div>
  );
}

// ── Onboarding (OnboardingView.swift) ───────────────────────────

function OnboardingScreen({step=0, onNext, onBack}) {
  const steps = [
    {
      title: 'First, add the widget',
      subtitle: 'Touch and hold the Linguease app icon, then select one of the 3 widget sizes.',
      hero: <WidgetMock size="large" theme={{bg:'#E1F1FF', word:'#3F7FBA', trans:'#7AACDA'}} word="ciao" trans="hello"/>,
    },
    {
      title: '... and they show on the widget',
      subtitle: null,
      hero: <WidgetMock size="large" theme={{bg:'#67917C', word:'#fff', trans:'#D1DED8'}} word="arigato" trans="thank you"/>,
    },
    {
      title: 'The widget changes colour to keep your attention.',
      subtitle: null,
      hero: <WidgetMock size="large" theme={{bg:'#DC624F', word:'#fff', trans:'#F4D0CA'}} word="bonjour" trans="hello"/>,
    },
    {
      title: 'Allow notifications for the best learning experience',
      subtitle: null,
      hero: <NotificationMock/>,
    },
  ];
  const s = steps[step];
  return (
    <div style={{height:'100%', background:LX.bgPage, display:'flex', flexDirection:'column'}}>
      <div style={{padding:'12px 16px', display:'flex', alignItems:'center'}}>
        {step>0 && <button onClick={onBack} style={{width:44, height:44, background:'transparent', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}><Icon name="back" size={22} color={LX.ink}/></button>}
        <div style={{flex:1}}/>
        <div style={{display:'flex', gap:6}}>
          {steps.map((_,i)=><div key={i} style={{width: i===step?24:6, height:6, borderRadius:999, background: i<=step ? LX.ink : LX.ink3, transition:'width 250ms'}}/>)}
        </div>
      </div>
      <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'0 24px'}}>
        {s.hero}
      </div>
      <div style={{padding:'0 24px 32px', display:'flex', flexDirection:'column', gap:14}}>
        <div style={{fontFamily:'"Instrument Serif",serif', fontSize:30, lineHeight:1.15, color:LX.ink, textAlign:'center'}}>{s.title}</div>
        {s.subtitle && <div style={{fontFamily:'"Roboto",sans-serif', fontWeight:300, fontSize:16, lineHeight:1.5, color:LX.ink2, textAlign:'center'}}>{s.subtitle}</div>}
        <PrimaryButton variant="dark" onClick={onNext}>{step===0 ? "I've added the widget" : step===steps.length-1 ? 'Allow notifications' : 'Continue'}</PrimaryButton>
      </div>
    </div>
  );
}

function WidgetMock({size='large', theme, word, trans}) {
  const d = size==='large'? 260 : 170;
  return (
    <div style={{width:d, height:d, borderRadius: Math.round(d*0.1157), background:theme.bg, padding:20, display:'flex', flexDirection:'column', justifyContent:'flex-end', boxShadow:'0 30px 60px rgba(0,0,0,0.15)'}}>
      <div style={{fontFamily:'"Instrument Serif",serif', fontSize:56, color:theme.word, lineHeight:1}}>{word}</div>
      <div style={{fontFamily:'"Instrument Serif",serif', fontStyle:'italic', fontSize:28, color:theme.trans, lineHeight:1.1, marginTop:4}}>{trans}</div>
    </div>
  );
}

function NotificationMock() {
  return (
    <div style={{width:280, background:'rgba(255,255,255,0.85)', backdropFilter:'blur(20px)', borderRadius:22, padding:14, display:'flex', gap:10, boxShadow:'0 20px 50px rgba(0,0,0,0.1)'}}>
      <div style={{width:38, height:38, borderRadius:9, background:LX.yellow, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center'}}>
        <img src="../../assets/logo.svg" style={{width:26, height:26}}/>
      </div>
      <div style={{flex:1, minWidth:0}}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <div style={{fontFamily:'"Roboto",sans-serif', fontWeight:500, fontSize:14, color:LX.ink}}>Linguease</div>
          <div style={{fontFamily:'"Roboto",sans-serif', fontWeight:300, fontSize:12, color:LX.ink2}}>now</div>
        </div>
        <div style={{fontFamily:'"Roboto",sans-serif', fontWeight:400, fontSize:14, color:LX.ink, marginTop:2}}>New word for you</div>
        <div style={{fontFamily:'"Roboto",sans-serif', fontWeight:300, fontSize:14, color:LX.ink, marginTop:2}}>ciao — hello</div>
      </div>
    </div>
  );
}

// ── Home / Learning list (VocabularyListView.swift) ────────────

function HomeScreen({onSettings, onAdd}) {
  const [tab, setTab] = React.useState(0);
  const learning = [
    {word:'ciao', trans:'hello', phon:'/ˈtʃaːo/', indicator:'active'},
    {word:'arigato', trans:'thank you', phon:'/aɾiɡatoː/', indicator:'new'},
    {word:'bonjour', trans:'hello', phon:'/bɔ̃.ʒuʁ/'},
    {word:'gracias', trans:'thank you', phon:'/ˈɡɾaθjas/'},
    {word:'danke', trans:'thank you', phon:'/ˈdaŋkə/'},
  ];
  const completed = [
    {word:'hola', trans:'hello'}, {word:'merci', trans:'thank you'}, {word:'prego', trans:"you're welcome"},
  ];
  return (
    <div style={{height:'100%', background:LX.bgPage, display:'flex', flexDirection:'column', position:'relative'}}>
      <AppHeader tab={tab} onTab={setTab} onSettings={onSettings}/>
      <div style={{padding:'0 16px 16px'}}>
        <StatsPill stats={[['42','words'],['28','mastered'],['3','week streak']]}/>
      </div>
      <div style={{flex:1, overflow:'auto', padding:'0 16px 120px'}}>
        {tab===0 ? (
          <>
            <div style={{background:'#fff', borderRadius:12, margin:'0 0 16px', padding:16, boxShadow:'0 12px 24px rgba(0,0,0,0.05)'}}>
              <div style={{fontFamily:'"Roboto",sans-serif', fontSize:16, fontWeight:500, color:LX.ink}}>Finish setting up</div>
              <div style={{marginTop:10, display:'flex', flexDirection:'column', gap:8}}>
                {['Swipe a word right to complete it','Swipe a word left to delete it'].map((t,i)=>(
                  <div key={i} style={{display:'flex', alignItems:'center', gap:12}}>
                    <div style={{width:18, height:18, borderRadius:'50%', border:`2px solid ${LX.row}`}}/>
                    <div style={{fontFamily:'"Roboto",sans-serif', fontWeight:300, fontSize:14, color:LX.ink2}}>{t}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:LX.row, borderRadius:12, overflow:'hidden'}}>
              {learning.map((w,i)=><WordRow key={i} {...w}/>)}
              <AddWordRowInteractive/>
            </div>
            <div style={{padding:'12px 0 0', display:'flex', gap:8, flexWrap:'wrap', alignItems:'center'}}>
              {['bonjour','gracias','konnichiwa','danke'].map(w=><SuggestionChip key={w} label={w}/>)}
              <SuggestionChip icon={<Icon name="redo" size={16} color={LX.ink2}/>}/>
            </div>
          </>
        ) : (
          <div style={{background:LX.row, borderRadius:12, overflow:'hidden'}}>
            {completed.map((w,i)=>(
              <div key={i} style={{display:'flex', alignItems:'center', padding:'16px', borderBottom: i<completed.length-1?`1px solid ${LX.divider}`:'none', gap:12}}>
                <Icon name="tickRound" size={22} color={LX.ink2}/>
                <div style={{flex:1}}>
                  <div style={{fontFamily:'"Instrument Serif",serif', fontSize:22, color:LX.ink2}}>{w.word}</div>
                  <div style={{fontFamily:'"Instrument Serif",serif', fontStyle:'italic', fontSize:18, color:LX.ink3}}>{w.trans}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <button onClick={onAdd} style={{position:'absolute', bottom:40, left:'50%', transform:'translateX(-50%)', width:60, height:60, borderRadius:'50%', background:LX.terracotta, border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow:'0 8px 20px rgba(220,98,79,0.35)'}}>
        <Icon name="plus" size={28} color="#fff"/>
      </button>
    </div>
  );
}

function AddWordRowInteractive() {
  const [v, setV] = React.useState('');
  return <AddWordRow value={v} onChange={setV} onSubmit={()=>setV('')}/>;
}

// ── Settings (SettingsView.swift) ─────────────────────────────

function SettingsScreen({onBack}) {
  const [phonetic, setPhonetic] = React.useState(true);
  const [haptics, setHaptics] = React.useState(true);
  return (
    <div style={{height:'100%', background:LX.bgPage, overflow:'auto'}}>
      <div style={{padding:'8px 16px', display:'flex', alignItems:'center'}}>
        <button onClick={onBack} style={{width:44, height:44, background:'transparent', border:'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}><Icon name="back" size={22} color={LX.ink}/></button>
      </div>
      <div style={{padding:'0 20px 32px', display:'flex', alignItems:'center', gap:16}}>
        <div style={{width:72, height:72, borderRadius:'50%', background:LX.yellow, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'"Instrument Serif",serif', fontSize:32, color:'#5D4520'}}>JL</div>
        <div>
          <div style={{fontFamily:'"Instrument Serif",serif', fontSize:24, color:LX.ink}}>Joshua Lenzlipitch</div>
          <div style={{fontFamily:'"Roboto",sans-serif', fontWeight:300, fontSize:14, color:LX.ink2}}>joshua@mywordwidget.com</div>
        </div>
      </div>

      <SettingsGroup header="Language settings">
        <SettingsRow icon="redo" iconBg={LX.blue} title="Translate from" detail="🇬🇧 English"/>
        <SettingsRow icon="sound" iconBg={LX.terracotta} title="Translate to" detail="🇯🇵 Japanese"/>
        <SettingsRow icon="check" iconBg={LX.yellow} title="Level" detail="Beginner" isLast/>
      </SettingsGroup>

      <SettingsGroup header="General">
        <SettingsRow icon="chevron" iconBg={LX.ink} title="Phonetic spelling" toggle={phonetic} chevron={false} onClick={()=>setPhonetic(!phonetic)}/>
        <SettingsRow icon="plus" iconBg={LX.ink2} title="Haptics" toggle={haptics} chevron={false} onClick={()=>setHaptics(!haptics)}/>
        <SettingsRow icon="settings" iconBg={LX.ink3} title="Widget customisation"/>
        <SettingsRow icon="close" iconBg={LX.terracottaDeep} title="App intervention customisation" isLast/>
      </SettingsGroup>

      <SettingsGroup header="Danger zone">
        <SettingsRow title="Log out" destructive/>
        <SettingsRow title="Delete account" destructive isLast/>
      </SettingsGroup>
    </div>
  );
}

// ── App shell with navigation ────────────────────────────────────

function LingueaseApp() {
  const [screen, setScreen] = React.useState('welcome');
  const [onb, setOnb] = React.useState(0);

  let content;
  if (screen === 'welcome') content = <WelcomeScreen onContinue={()=>{setOnb(0); setScreen('onboarding');}}/>;
  else if (screen === 'onboarding') {
    content = <OnboardingScreen step={onb}
      onNext={()=> onb >= 3 ? setScreen('home') : setOnb(onb+1)}
      onBack={()=> onb === 0 ? setScreen('welcome') : setOnb(onb-1)}/>;
  }
  else if (screen === 'home') content = <HomeScreen onSettings={()=>setScreen('settings')} onAdd={()=>{}}/>;
  else if (screen === 'settings') content = <SettingsScreen onBack={()=>setScreen('home')}/>;

  return (
    <IOSDevice width={402} height={874}>
      {content}
    </IOSDevice>
  );
}

Object.assign(window, {
  WelcomeScreen, OnboardingScreen, HomeScreen, SettingsScreen, LingueaseApp, WidgetMock,
});
