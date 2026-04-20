import { useState } from "react";

const C = {
  white:'#FFFFFF', inner:'#F3F6FB', content:'#EEF1F6',
  a1:'#6366F1', a2:'#818CF8', a3:'#38BDF8',
  t1:'#141921', t2:'#5C6678', t3:'#9BA5B7', border:'#E8ECF3',
  green:'#22C55E', coral:'#F97316', purple:'#7C3AED',
  teal:'#06B6D4', red:'#EF4444', amber:'#F59E0B',
};

function Ic({ d, s = 16, c = 'currentColor', w = 1.8 }) {
  return <svg width={s} height={s} fill="none" stroke={c} strokeWidth={w} viewBox="0 0 24 24" style={{ flexShrink: 0 }}><path d={d} /></svg>;
}
const ICON = {
  check: 'M20 6L9 17l-5-5',
  bolt:  'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  arr:   'M9 18l6-6-6-6',
};

const STEPS = ['welcome', 'goal', 'business', 'platform', 'brand', 'first_post', 'done'];

function SellixAvatar({ size = 30 }) {
  return (
    <div style={{ width: size, height: size, background: `linear-gradient(135deg,${C.a2},${C.a1})`, borderRadius: Math.round(size * .3), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 3px 8px rgba(99,102,241,.25)' }}>
      <Ic d={ICON.bolt} s={Math.round(size * .48)} c="white" w={2} />
    </div>
  );
}

function Dots() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '3px 0' }}>
      {[0, 1, 2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: C.a1, animation: `sdot 1.2s ease-in-out ${i * .15}s infinite` }} />)}
    </div>
  );
}

function SBubble({ children, typing }) {
  return (
    <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start', marginBottom: 16 }}>
      <SellixAvatar size={28} />
      <div style={{ background: C.white, borderRadius: '4px 14px 14px 14px', padding: typing ? '12px 14px' : '11px 13px', maxWidth: '88%', boxShadow: '0 1px 6px rgba(14,25,55,.07)', fontSize: 12, lineHeight: 1.65, color: C.t2 }}>
        {typing ? <Dots /> : children}
      </div>
    </div>
  );
}

function StepBar({ idx, total }) {
  return (
    <div style={{ display: 'flex', gap: 5 }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{ height: 3, flex: 1, borderRadius: 100, background: i < idx ? `linear-gradient(90deg,${C.a2},${C.a1})` : i === idx ? `${C.a1}40` : C.border, transition: 'all .3s' }} />
      ))}
    </div>
  );
}

function Choice({ emoji, label, desc, selected, onClick, color }) {
  const [h, setH] = useState(false);
  const ac = color || C.a1;
  return (
    <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ padding: '13px 14px', borderRadius: 14, cursor: 'pointer', userSelect: 'none', background: selected ? `${ac}10` : h ? C.inner : C.white, border: `2px solid ${selected ? ac : h ? `${ac}30` : C.border}`, boxShadow: selected ? `0 0 0 3px ${ac}14` : 'none', transition: 'all .15s', display: 'flex', alignItems: 'center', gap: 11, marginBottom: 8 }}>
      <div style={{ fontSize: 20, flexShrink: 0 }}>{emoji}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: selected ? 700 : 500, color: selected ? ac : C.t1, marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 11, color: selected ? ac : C.t3, opacity: selected ? 0.8 : 1, lineHeight: 1.4 }}>{desc}</div>
      </div>
      {selected && <div style={{ width: 18, height: 18, borderRadius: '50%', background: ac, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Ic d={ICON.check} s={8} c="white" w={3} /></div>}
    </div>
  );
}

function Btn({ children, primary, full, disabled, onClick }) {
  const [h, setH] = useState(false);
  const s = primary
    ? { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, border: 'none', borderRadius: 12, fontFamily: 'inherit', fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer', transition: 'all .14s', fontSize: 13, padding: '10px 22px', width: full ? '100%' : 'auto', background: disabled ? C.inner : `linear-gradient(135deg,${C.a2},${C.a1})`, color: disabled ? C.t3 : '#fff', boxShadow: disabled ? 'none' : '0 4px 14px rgba(99,102,241,.3)', opacity: h && !disabled ? 0.9 : 1 }
    : { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, border: 'none', borderRadius: 12, fontFamily: 'inherit', fontWeight: 600, cursor: 'pointer', transition: 'all .14s', fontSize: 13, padding: '10px 22px', background: h ? '#E5EAF3' : C.inner, color: C.t2 };
  return <button style={s} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} disabled={disabled}>{children}</button>;
}

function Shell({ children, stepIdx, noChat }) {
  return (
    <div style={{ background: '#C4D9EA', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif' }}>
      <div style={{ background: C.white, borderRadius: 20, overflow: 'hidden', boxShadow: '0 28px 90px rgba(14,25,55,.18)', width: '100%', maxWidth: 580 }}>
        <div style={{ background: C.white, padding: '16px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <svg width="32" height="32" viewBox="0 0 36 36"><circle cx="18" cy="18" r="17" fill="#EEF2FF"/><polygon points="19 7 10 20 18 20 17 29 26 16 18 16 19 7" fill="#6366F1"/></svg>
            <span style={{ fontSize: 16, fontWeight: 700 }}>Zipto</span>
          </div>
          {stepIdx > 0 && !noChat && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 200 }}><StepBar idx={stepIdx - 1} total={5} /></div>
              <span style={{ fontSize: 11, color: C.t3 }}>Setup</span>
            </div>
          )}
        </div>
        <div style={{ padding: noChat ? '28px 32px' : '20px 24px', background: '#FAFBFE', minHeight: 420 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Onboarding() {
  const [step,       setStep]       = useState('welcome');
  const [bizType,    setBizType]    = useState(null);
  const [bizName,    setBizName]    = useState('');
  const [platform,   setPlatform]   = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [connected,  setConnected]  = useState(false);
  const [typing,     setTyping]     = useState(false);
  const [genning,    setGenning]    = useState(false);
  const [post,       setPost]       = useState('');

  const idx = STEPS.indexOf(step);

  const advance = (to) => {
    setTyping(true);
    setTimeout(() => { setTyping(false); setStep(to || STEPS[idx + 1]); }, 900);
  };

  const connect = (name) => {
    setPlatform(name); setConnecting(true);
    setTimeout(() => { setConnecting(false); setConnected(true); }, 1800);
  };

  const genPost = () => {
    setGenning(true);
    setTimeout(() => {
      setPost(`✈️ Exciting news from ${bizName}! We're thrilled to welcome you to a new way to travel — premium comfort, unbeatable prices, and destinations that dreams are made of.\n\n🌍 Whether it's a weekend escape or a grand adventure, ${bizName} has a route waiting for you. Book your next journey today →\n\n#Travel #${bizName.replace(/\s+/g, '')} #ExploreTheWorld`);
      setGenning(false);
    }, 1500);
  };

  // ── Welcome ──────────────────────────────────────────────────────────────
  if (step === 'welcome') return (
    <Shell stepIdx={0} noChat>
      <style>{`@keyframes sdot{0%,100%{opacity:1}50%{opacity:.35}}`}</style>
      <div style={{ textAlign: 'center', maxWidth: 400, margin: '20px auto 0' }}>
        <div style={{ width: 64, height: 64, background: `linear-gradient(135deg,${C.a2},${C.a1})`, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 24px rgba(99,102,241,.3)' }}>
          <Ic d={ICON.bolt} s={28} c="white" w={2} />
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 300, color: C.t1, marginBottom: 8 }}>Welcome to <strong style={{ fontWeight: 800 }}>Zipto</strong></h1>
        <p style={{ fontSize: 14, color: C.t2, lineHeight: 1.7, marginBottom: 28 }}>Your AI-powered marketing co-pilot. I'm Sellix — I'll have your business set up and posting in under 3 minutes.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 28, textAlign: 'left' }}>
          {[{e:'📝',t:'Start posting',d:'Organic content today',c:'#22C55E'},{e:'⚡',t:'Boost my reach',d:'Paid ads, from $5/day',c:'#F97316'},{e:'🔍',t:'Just exploring',d:'Look around first',c:'#7C3AED'}].map(({ e, t, d, c }) => {
            const [h, setH] = useState(false);
            return <div key={t} onClick={() => advance('goal')} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ padding: '13px 12px', borderRadius: 13, background: `${c}0a`, border: `1.5px solid ${h ? c + '50' : c + '20'}`, cursor: 'pointer', userSelect: 'none', transition: 'all .15s' }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{e}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.t1, marginBottom: 2 }}>{t}</div>
              <div style={{ fontSize: 10, color: C.t3 }}>{d}</div>
            </div>;
          })}
        </div>
        <p style={{ fontSize: 11, color: C.t3 }}>Already have an account? <span style={{ color: C.a1, cursor: 'pointer', fontWeight: 500 }}>Sign in</span></p>
      </div>
    </Shell>
  );

  // ── Business type ────────────────────────────────────────────────────────
  if (step === 'goal') return (
    <Shell stepIdx={idx}>
      <style>{`@keyframes sdot{0%,100%{opacity:1}50%{opacity:.35}}`}</style>
      <SBubble><strong style={{ color: C.t1 }}>Hi! I'm Sellix 👋</strong><br /><br />I'll set up your workspace in 3 minutes. First — what kind of business are you running?</SBubble>
      {typing ? <SBubble typing /> : !bizType && (
        <div>
          {[{id:'travel',e:'✈️',l:'Travel / Tourism',d:'Flights, hotels, experiences',c:'#06B6D4'},{id:'retail',e:'🛍️',l:'Retail / E-commerce',d:'Products, shop, online store',c:'#F97316'},{id:'service',e:'🔧',l:'Service business',d:'Consulting, agency, freelance',c:'#7C3AED'},{id:'food',e:'🍽️',l:'Restaurant / Food',d:'Café, bakery, catering',c:'#F59E0B'},{id:'other',e:'🏢',l:'Other',d:'Something else entirely',c:C.a1}].map(({ id, e, l, d, c }) => (
            <Choice key={id} emoji={e} label={l} desc={d} color={c} selected={bizType === id} onClick={() => { setBizType(id); setTimeout(() => advance('business'), 300); }} />
          ))}
        </div>
      )}
    </Shell>
  );

  // ── Business name ────────────────────────────────────────────────────────
  if (step === 'business') return (
    <Shell stepIdx={idx}>
      <style>{`@keyframes sdot{0%,100%{opacity:1}50%{opacity:.35}}`}</style>
      <SBubble><strong style={{ color: C.t1 }}>Perfect!</strong> Now, what's your business name?<br /><br />I'll use this to set up your brand profile and write content that sounds exactly like you.</SBubble>
      {typing ? <SBubble typing /> : (
        <>
          <div style={{ background: C.inner, borderRadius: 12, padding: 14, marginBottom: 14 }}>
            <label style={{ fontSize: 9, fontWeight: 700, color: C.t3, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 4, display: 'block' }}>Business name</label>
            <input value={bizName} onChange={e => setBizName(e.target.value)} onKeyDown={e => e.key === 'Enter' && bizName.trim() && advance('platform')} placeholder="e.g. KB Aviation" style={{ width: '100%', height: 40, background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: '0 13px', fontSize: 13, color: C.t1, outline: 'none', fontFamily: 'inherit' }} />
          </div>
          <Btn primary full disabled={!bizName.trim()} onClick={() => advance('platform')}>Continue →</Btn>
        </>
      )}
    </Shell>
  );

  // ── Platform connection ──────────────────────────────────────────────────
  if (step === 'platform') return (
    <Shell stepIdx={idx}>
      <style>{`@keyframes sdot{0%,100%{opacity:1}50%{opacity:.35}} @keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <SBubble>
        <strong style={{ color: C.t1 }}>Nice to meet you, {bizName}!</strong><br /><br />
        Where do you want to post? Connecting once lets you publish organic posts <em>and</em> run paid ads — whenever you're ready.<br /><br />
        <span style={{ fontSize: 11, color: C.t3 }}>You can add more platforms later in Settings.</span>
      </SBubble>
      {connecting && <div style={{ textAlign: 'center', padding: '20px 0', color: C.t2, fontSize: 12 }}><div style={{ width: 28, height: 28, border: `3px solid ${C.a1}30`, borderTopColor: C.a1, borderRadius: '50%', animation: 'spin .7s linear infinite', margin: '0 auto 10px' }} />Connecting to {platform}...</div>}
      {!connecting && !connected && !typing && (
        <div>
          {[{n:'Facebook',e:'🔵',d:'Pages, posts, ads — most businesses start here',rec:true},{n:'Instagram',e:'📸',d:'Visual brand posts and stories',rec:false},{n:'LinkedIn',e:'💼',d:'B2B reach and professional brand',rec:false},{n:'WhatsApp Business',e:'💬',d:'Customer messaging and broadcasts',rec:false}].map(({ n, e, d, rec }) => (
            <div key={n} onClick={() => connect(n)} style={{ padding: '11px 13px', borderRadius: 13, background: C.inner, border: `2px solid ${C.border}`, cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, position: 'relative' }}>
              {rec && <div style={{ position: 'absolute', top: -7, left: 12, background: '#22C55E', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 100 }}>Best for most businesses</div>}
              <div style={{ fontSize: 18 }}>{e}</div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 500, color: C.t1 }}>{n}</div><div style={{ fontSize: 10, color: C.t3 }}>{d}</div></div>
              <div style={{ padding: '4px 11px', background: `linear-gradient(135deg,${C.a2},${C.a1})`, borderRadius: 7, fontSize: 11, fontWeight: 600, color: '#fff' }}>Connect</div>
            </div>
          ))}
          <div onClick={() => advance('brand')} style={{ marginTop: 8, textAlign: 'center', fontSize: 11, color: C.t3, cursor: 'pointer' }}>Skip for now — connect later →</div>
        </div>
      )}
      {connected && !typing && (
        <div>
          <div style={{ background: '#ECFDF5', border: '1.5px solid #BBF7D0', borderRadius: 13, padding: '13px 15px', display: 'flex', alignItems: 'center', gap: 11, marginBottom: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#22C55E20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic d={ICON.check} s={16} c="#22C55E" w={2.5} /></div>
            <div><div style={{ fontSize: 13, fontWeight: 600, color: '#065F46' }}>{platform} connected!</div><div style={{ fontSize: 11, color: '#059669', marginTop: 1 }}>You can now post organically and run paid ads when ready</div></div>
          </div>
          <Btn primary full onClick={() => advance('brand')}>Set up your brand →</Btn>
        </div>
      )}
    </Shell>
  );

  // ── Brand confirmation ───────────────────────────────────────────────────
  if (step === 'brand') return (
    <Shell stepIdx={idx}>
      <style>{`@keyframes sdot{0%,100%{opacity:1}50%{opacity:.35}}`}</style>
      <SBubble>I've built a starter brand profile for <strong style={{ color: C.t1 }}>{bizName}</strong> based on your answers. Does this look right?</SBubble>
      {typing ? <SBubble typing /> : (
        <>
          <div style={{ background: '#EEF2FF', border: '1.5px solid #C7D2FE', borderRadius: 13, padding: '13px 15px', marginBottom: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[['Business type', bizType ? bizType.charAt(0).toUpperCase() + bizType.slice(1) : 'Travel / Tourism'], ['Voice', 'Friendly, trustworthy'], ['Target audience', '25–55, travel enthusiasts'], ['Languages', 'English + local'], ['Tone', 'Exciting, informative'], ['Platform', platform || 'Facebook']].map(([k, v]) => (
                <div key={k}><div style={{ fontSize: 9, fontWeight: 700, color: C.a1, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 2 }}>{k}</div><div style={{ fontSize: 12, color: C.t1, fontWeight: 500 }}>{v}</div></div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn primary full onClick={() => advance('first_post')}>Looks good →</Btn>
            <Btn>Edit</Btn>
          </div>
        </>
      )}
    </Shell>
  );

  // ── First post ───────────────────────────────────────────────────────────
  if (step === 'first_post') return (
    <Shell stepIdx={idx}>
      <style>{`@keyframes sdot{0%,100%{opacity:1}50%{opacity:.35}} @keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <SBubble><strong style={{ color: C.t1 }}>You're all set up! 🎉</strong><br /><br />Let me write your first post for {bizName}. What do you want to share today?</SBubble>
      {typing ? <SBubble typing /> : (
        <>
          <div style={{ background: C.inner, borderRadius: 12, padding: 14, marginBottom: 12 }}>
            <label style={{ fontSize: 9, fontWeight: 700, color: C.t3, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 4, display: 'block' }}>Tell me in a sentence (or leave it and let me guess)</label>
            <textarea defaultValue={`Introduce ${bizName} to our new followers`} rows={2} style={{ width: '100%', background: C.white, border: `1px solid ${C.border}`, borderRadius: 9, padding: '9px 11px', fontSize: 12, color: C.t1, resize: 'none', outline: 'none', fontFamily: 'inherit', lineHeight: 1.55 }} />
          </div>
          {!post && (
            <div onClick={genPost} style={{ width: '100%', height: 44, background: `linear-gradient(135deg,${C.a2},${C.a1})`, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', gap: 7, boxShadow: `0 4px 14px ${C.a1}30`, marginBottom: 12 }}>
              {genning ? <><div style={{ width: 12, height: 12, border: '2px solid rgba(255,255,255,.35)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin .6s linear infinite' }} /> Writing...</> : <>✨ Write my first post with Sellix</>}
            </div>
          )}
          {post && (
            <>
              <div style={{ background: '#EEF2FF', border: '1.5px solid #C7D2FE', borderRadius: 12, padding: '11px 13px', marginBottom: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.a1, marginBottom: 7, letterSpacing: '.05em' }}>SELLIX WROTE THIS FOR YOU</div>
                <div style={{ fontSize: 12, color: C.t1, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{post}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Btn primary full onClick={() => advance('done')}>Post now →</Btn>
                <Btn onClick={() => advance('done')}>Schedule</Btn>
                <Btn onClick={() => setPost('')}>Rewrite</Btn>
              </div>
            </>
          )}
        </>
      )}
    </Shell>
  );

  // ── Done ─────────────────────────────────────────────────────────────────
  if (step === 'done') return (
    <Shell stepIdx={null} noChat>
      <style>{`@keyframes sdot{0%,100%{opacity:1}50%{opacity:.35}}`}</style>
      <div style={{ textAlign: 'center', maxWidth: 400, margin: '10px auto 0' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <Ic d={ICON.check} s={30} c="#22C55E" w={2.5} />
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: C.t1, marginBottom: 8 }}>You're live on {platform || 'Facebook'}!</h2>
        <p style={{ fontSize: 13, color: C.t2, lineHeight: 1.7, marginBottom: 28 }}>Your first post is published. Sellix is now monitoring your business 24/7 and will alert you when something needs attention.</p>
        <div style={{ textAlign: 'left', background: C.inner, borderRadius: 14, padding: '14px 16px', marginBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.t3, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 10 }}>What's next</div>
          {[{e:'⚡',t:'Try your first Boost',d:'$5/day to reach beyond followers'},{e:'📊',t:'Check Analytics',d:'See how your post is performing'},{e:'💬',t:'Set up auto-replies',d:'Sellix replies while you sleep'},{e:'🔗',t:'Add more platforms',d:'Instagram, LinkedIn, WhatsApp'}].map(({ e, t, d }) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 17 }}>{e}</div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 500, color: C.t1 }}>{t}</div><div style={{ fontSize: 10, color: C.t3 }}>{d}</div></div>
              <Ic d={ICON.arr} s={12} c={C.border} w={2} />
            </div>
          ))}
        </div>
        <Btn primary full onClick={() => setStep('welcome')}>Go to dashboard →</Btn>
      </div>
    </Shell>
  );

  return null;
}
