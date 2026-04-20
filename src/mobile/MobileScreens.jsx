import React, { useState } from 'react';
import { C, gradPrimary, gradHero, gradBarP, gradBarC } from '../tokens';
import { RingGauge, IconBadge, ProgressBar, DualBars, Badge } from '../components/ui';

// ─── Mobile Phone Frame ─────────────────────────────────────────────
export function PhoneFrame({ children, bg }) {
  return (
    <div style={{
      width: 390, background: bg || C.content,
      borderRadius: 50, overflow: 'hidden',
      boxShadow: `0 32px 80px rgba(14,25,55,.22), 0 0 0 12px ${C.white}, 0 0 0 14px #DFE8F3`,
      height: 844, display: 'flex', flexDirection: 'column',
      position: 'relative'
    }}>
      {/* Status bar */}
      <div style={{ height: 46, background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 22px', fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
        <span>9:41</span>
        <svg width="32" height="11" viewBox="0 0 32 11">
          <circle cx="3" cy="5.5" r="3" fill={C.t1} />
          <circle cx="11" cy="5.5" r="3" fill={C.t1} />
          <rect x="20" y="2" width="8" height="7" rx="2" fill={C.t1} />
        </svg>
      </div>
      {children}
    </div>
  );
}

// ─── Mobile Bottom Nav ──────────────────────────────────────────────
export function MobileNav({ active }) {
  const items = [
    { id: 'home',     label: 'Home',      icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10' },
    { id: 'campaigns',label: 'Campaigns', icon: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z' },
    { id: 'sellix',   label: 'Sellix',    icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' },
    { id: 'analytics',label: 'Analytics', icon: 'M18 20V10 M12 20V4 M6 20v-6' },
    { id: 'settings', label: 'Settings',  icon: 'M12 15a3 3 0 100-6 3 3 0 000 6z' },
  ];
  return (
    <div style={{ background: C.white, borderTop: `1px solid ${C.border}`, display: 'flex', height: 76, paddingBottom: 16, flexShrink: 0 }}>
      {items.map(({ id, label, icon }) => (
        <div key={id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, cursor: 'pointer', color: active === id ? C.a1 : C.t3 }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d={icon} /></svg>
          <span style={{ fontSize: 10, fontWeight: 500 }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── M01 Auth ───────────────────────────────────────────────────────
export function MobileAuth() {
  return (
    <div style={{ background: C.pageBg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: 390, borderRadius: 50, overflow: 'hidden', background: gradHero, boxShadow: `0 32px 80px rgba(14,25,55,.22), 0 0 0 12px ${C.white}, 0 0 0 14px #DFE8F3` }}>
        <div style={{ height: 46, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 22px', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.8)' }}>
          <span>9:41</span><span>●●● 100%</span>
        </div>
        <div style={{ padding: '22px 22px 18px', textAlign: 'center' }}>
          <div style={{ width: 54, height: 54, background: 'rgba(255,255,255,.16)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 11px' }}>
            <svg width="24" height="24" viewBox="0 0 36 36"><polygon points="19 7 10 20 18 20 17 29 26 16 18 16 19 7" fill="white" /></svg>
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 4 }}>Zipto</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.7)' }}>Your AI-powered marketing co-pilot</div>
        </div>
        <div style={{ padding: '0 18px 18px' }}>
          {[
            { label: 'THIS WEEK · KB AVIATION', stats: [['$4,240','Revenue'],['189','Leads'],['224K','Reach']] },
          ].map(({ label, stats }) => (
            <div key={label} style={{ background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.2)', borderRadius: 16, padding: '14px 17px', marginBottom: 10 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,.5)', marginBottom: 8, letterSpacing: '.09em' }}>{label}</div>
              <div style={{ display: 'flex', gap: 18 }}>
                {stats.map(([v, l]) => (
                  <div key={l}><div style={{ fontSize: 17, fontWeight: 800, color: '#fff' }}>{v}</div><div style={{ fontSize: 10, color: 'rgba(255,255,255,.6)' }}>{l}</div></div>
                ))}
              </div>
            </div>
          ))}
          <div style={{ background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.16)', borderRadius: 13, padding: '11px 15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 30, height: 30, background: 'rgba(255,255,255,.18)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>47 <span style={{ fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,.7)' }}>AI replies today</span></div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,.5)' }}>Saved 3.2 hours</div>
              </div>
            </div>
          </div>
        </div>
        {/* Form panel */}
        <div style={{ background: C.white, borderRadius: '26px 26px 0 0', padding: '24px 22px 50px' }}>
          <div style={{ display: 'flex', background: C.inner, borderRadius: 11, padding: 4, marginBottom: 18 }}>
            {['Sign in','Sign up'].map((t, i) => (
              <div key={t} style={{ flex: 1, textAlign: 'center', padding: 8, borderRadius: 9, fontSize: 13, background: i === 0 ? C.white : 'transparent', fontWeight: i === 0 ? 600 : 500, color: i === 0 ? C.t1 : C.t2, boxShadow: i === 0 ? '0 1px 4px rgba(0,0,0,.08)' : 'none', cursor: 'pointer' }}>{t}</div>
            ))}
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 3 }}>Welcome back</div>
          <div style={{ fontSize: 12, color: C.t3, marginBottom: 16 }}>Sign in to manage your business</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.t3, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 4 }}>Email</div>
          <div style={{ height: 44, background: C.inner, borderRadius: 11, display: 'flex', alignItems: 'center', padding: '0 13px', fontSize: 13, color: C.t3, marginBottom: 11 }}>tanvir@kbaviation.com</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.t3, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 4 }}>Password</div>
          <div style={{ height: 44, background: C.inner, borderRadius: 11, display: 'flex', alignItems: 'center', padding: '0 13px', fontSize: 14, color: C.t3, marginBottom: 6, letterSpacing: 5 }}>········</div>
          <div style={{ textAlign: 'right', marginBottom: 18 }}><span style={{ fontSize: 12, color: C.a1, fontWeight: 500 }}>Forgot password?</span></div>
          <div style={{ height: 48, background: gradPrimary, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 5px 14px rgba(99,102,241,.3)', marginBottom: 14 }}>Sign in to Zipto</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 13 }}>
            <div style={{ flex: 1, height: 1, background: C.border }} /><span style={{ fontSize: 11, color: C.t3 }}>or</span><div style={{ flex: 1, height: 1, background: C.border }} />
          </div>
          <div style={{ display: 'flex', gap: 9 }}>
            {[['f','#1877F2','Facebook'],['G','#4285F4','Google']].map(([l, c, name]) => (
              <div key={name} style={{ flex: 1, height: 42, background: C.inner, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                <span style={{ color: c, fontWeight: 800 }}>{l}</span>{name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── M02 Dashboard ──────────────────────────────────────────────────
export function MobileDashboard() {
  const metrics = [
    { label: 'Sales', value: '$4,240', badge: '▲ 12%', badgeV: 'green', color: 'indigo', icon: 'M12 1v22 M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6', barPct: 68, barV: 'purple' },
    { label: 'Leads', value: '189',    badge: '▲ 8%',  badgeV: 'green', color: 'teal',   icon: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z', barPct: 54, barV: 'cyan' },
    { label: 'Reach', value: '224K',   badge: '▲ 15%', badgeV: 'green', color: 'purple', icon: 'M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20', barPct: 82, barV: 'purple' },
    { label: 'Campaigns', value: '8',  badge: '● Live', badgeV: 'orange',color: 'coral',  icon: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z', barPct: 40, barV: 'orange' },
  ];

  return (
    <div style={{ background: C.pageBg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <PhoneFrame>
        <div style={{ position: 'relative', paddingBottom: 76, overflowY: 'auto' }}>
          <div style={{ padding: '14px 14px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: C.t3, letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: 1 }}>Overview</div>
                <div style={{ fontSize: 18, fontWeight: 300, color: C.t1 }}>Good morning, <strong style={{ fontWeight: 800 }}>Tanvir</strong></div>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 36, height: 36, background: '#EEF2FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11, color: C.a1 }}>TB</div>
                <div style={{ position: 'absolute', top: 0, right: 0, width: 9, height: 9, background: C.red, borderRadius: '50%', border: `2px solid ${C.content}` }} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: C.white, borderRadius: 100, padding: '5px 11px', width: 'fit-content', marginBottom: 13, boxShadow: '0 1px 6px rgba(14,25,55,.06)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, display: 'inline-block' }} />
              <span style={{ fontSize: 12, fontWeight: 500 }}>KB Aviation connected</span>
            </div>

            {/* 2×2 metric grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, marginBottom: 11 }}>
              {metrics.map(({ label, value, badge, badgeV, color, icon, barPct, barV }) => (
                <div key={label} style={{ background: C.white, borderRadius: 17, padding: 12, boxShadow: '0 2px 12px rgba(14,25,55,.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
                    <span style={{ fontSize: 11, color: C.t3 }}>{label}</span>
                    <IconBadge color={color} size={26}><svg width="11" height="11" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d={icon} /></svg></IconBadge>
                  </div>
                  <div style={{ fontSize: 19, fontWeight: 800, marginBottom: 3 }}>{value}</div>
                  <Badge variant={badgeV}>{badge}</Badge>
                  <ProgressBar pct={barPct} variant={barV} height={4} />
                </div>
              ))}
            </div>

            {/* Ring gauge card */}
            <div style={{ background: C.white, borderRadius: 17, padding: '12px 13px', display: 'flex', alignItems: 'center', gap: 13, marginBottom: 11, boxShadow: '0 2px 12px rgba(14,25,55,.05)' }}>
              <RingGauge size={86} pct={0.72} value="$4K" strokeWidth={7} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: C.t3, letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: 7 }}>WEEKLY PERFORMANCE</div>
                <DualBars label1="Sales 68%" pct1={68} label2="Leads 45%" pct2={45} />
              </div>
            </div>

            {/* AI rec */}
            <div style={{ background: gradHero, borderRadius: 17, padding: 14, marginBottom: 11 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,.55)', letterSpacing: '.09em', marginBottom: 6 }}>SELLIX RECOMMENDS</div>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#fff', lineHeight: 1.55, marginBottom: 9 }}>Boost "Summer Sale" — 3× avg engagement. Best: today 6–8 PM</div>
              <div style={{ background: 'rgba(255,255,255,.18)', color: '#fff', borderRadius: 8, padding: '6px 13px', fontSize: 11, fontWeight: 600, display: 'inline-block', cursor: 'pointer' }}>Boost now →</div>
            </div>

            {/* Inbox preview */}
            <div style={{ background: C.white, borderRadius: 17, padding: 13, boxShadow: '0 2px 12px rgba(14,25,55,.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Inbox</div>
                <Badge variant="red">5 new</Badge>
              </div>
              {[
                { name: 'Sarah Johnson', time: '2m', msg: 'Is this product still available?', badge: 'WARM', badgeV: 'orange' },
                { name: 'Ahmed Rahman',  time: '15m', msg: 'Delivery options?', badge: 'HOT', badgeV: 'red' },
              ].map(({ name, time, msg, badge, badgeV }) => (
                <div key={name} style={{ background: C.inner, borderRadius: 11, padding: '9px 11px', marginBottom: 7, cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}><span style={{ fontSize: 12, fontWeight: 500 }}>{name}</span><span style={{ fontSize: 11, color: C.t3 }}>{time}</span></div>
                  <div style={{ fontSize: 12, color: C.t2, marginBottom: 5 }}>{msg}</div>
                  <Badge variant={badgeV}>{badge}</Badge>
                </div>
              ))}
              <div style={{ textAlign: 'center', marginTop: 9, fontSize: 12, color: C.a1, fontWeight: 600, cursor: 'pointer' }}>View all 6 →</div>
            </div>
          </div>
          <MobileNav active="home" />
        </div>
      </PhoneFrame>
    </div>
  );
}

// ─── M03 Campaigns ──────────────────────────────────────────────────
export function MobileCampaigns() {
  const [goal, setGoal] = useState('messages');
  const goals = [
    { id: 'views',    icon: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z', label: 'Views',    color: 'purple' },
    { id: 'messages', icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',                    label: 'Messages', color: 'indigo' },
    { id: 'sales',    icon: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z',                              label: 'Sales',    color: 'green' },
  ];

  return (
    <div style={{ background: C.pageBg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <PhoneFrame>
        <div style={{ position: 'relative', paddingBottom: 76, overflowY: 'auto' }}>
          <div style={{ padding: 14 }}>
            <div style={{ fontSize: 10, color: C.t3, textTransform: 'uppercase', letterSpacing: '.07em', fontWeight: 600, marginBottom: 2 }}>New campaign</div>
            <div style={{ fontSize: 19, fontWeight: 300, marginBottom: 14 }}>Set up your <strong style={{ fontWeight: 800 }}>campaign</strong></div>

            <div style={{ background: C.white, borderRadius: 17, padding: 13, marginBottom: 10, boxShadow: '0 2px 12px rgba(14,25,55,.05)' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.t3, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 7 }}>Platform</div>
              <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 3 }}>
                {['Facebook','Instagram','LinkedIn'].map((p, i) => (
                  <div key={p} style={{ padding: '6px 14px', background: i === 0 ? C.a1 : C.inner, color: i === 0 ? '#fff' : C.t2, borderRadius: 100, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0, cursor: 'pointer' }}>{p}</div>
                ))}
              </div>
            </div>

            <div style={{ border: '2px dashed #C7D2FE', borderRadius: 16, padding: 22, textAlign: 'center', background: '#FAFBFF', cursor: 'pointer', marginBottom: 10 }}>
              <IconBadge color="indigo" style={{ margin: '0 auto 9px' }}><svg width="15" height="15" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg></IconBadge>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>Upload creative</div>
              <div style={{ fontSize: 11, color: C.t3 }}>JPG · PNG · MP4 — max 10 MB</div>
            </div>

            <div style={{ background: C.white, borderRadius: 17, padding: 13, marginBottom: 10, boxShadow: '0 2px 12px rgba(14,25,55,.05)' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.t3, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 9 }}>Goal</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 7 }}>
                {goals.map(({ id, icon, label, color }) => (
                  <div key={id} onClick={() => setGoal(id)} style={{ background: goal === id ? '#EEF2FF' : C.inner, border: `2px solid ${goal === id ? C.a1 : 'transparent'}`, borderRadius: 11, padding: 11, textAlign: 'center', cursor: 'pointer', transition: 'all .12s' }}>
                    <IconBadge color={goal === id ? 'indigo' : color} size={28} style={{ margin: '0 auto 6px' }}><svg width="12" height="12" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d={icon} /></svg></IconBadge>
                    <div style={{ fontSize: 11, fontWeight: goal === id ? 700 : 600, color: goal === id ? C.a1 : C.t1 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI generator */}
            <div style={{ background: C.white, borderRadius: 17, padding: 13, marginBottom: 10, boxShadow: '0 2px 12px rgba(14,25,55,.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 9 }}>
                <IconBadge color="indigo" size={24}><svg width="11" height="11" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg></IconBadge>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Generate with AI</span>
              </div>
              <textarea style={{ width: '100%', height: 50, background: C.inner, border: 'none', borderRadius: 10, padding: '8px 11px', fontSize: 12, resize: 'none', outline: 'none', fontFamily: 'inherit' }} placeholder="Tone or instructions (optional)..." />
              <div style={{ height: 42, background: gradPrimary, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginTop: 7, boxShadow: '0 4px 12px rgba(99,102,241,.26)' }}>✨ Generate with AI</div>
            </div>

            {/* Generated copy preview */}
            <div style={{ background: '#EEF2FF', border: '1.5px solid #C7D2FE', borderRadius: 15, padding: 13, marginBottom: 9 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: C.a1, letterSpacing: '.07em', marginBottom: 5 }}>GENERATED COPY</div>
              <div style={{ fontSize: 12, color: C.t1, lineHeight: 1.6, marginBottom: 9 }}>✈️ Exciting news from KB Aviation! Save up to 30% on select routes. Limited seats! #KBAviation</div>
              <div style={{ display: 'flex', gap: 7 }}>
                <div style={{ flex: 1, height: 34, background: C.a1, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Use this</div>
                <div style={{ flex: 1, height: 34, background: C.white, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: C.t2, cursor: 'pointer' }}>Regenerate</div>
              </div>
            </div>

            <div style={{ height: 48, background: gradPrimary, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 5px 14px rgba(99,102,241,.28)', marginBottom: 8 }}>Publish Campaign</div>
            <div style={{ height: 42, background: C.white, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: C.t2, cursor: 'pointer' }}>Save as draft</div>
          </div>
          <MobileNav active="campaigns" />
        </div>
      </PhoneFrame>
    </div>
  );
}

// ─── M04 Sellix ─────────────────────────────────────────────────────
export function MobileSellix() {
  return (
    <div style={{ background: C.pageBg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <PhoneFrame bg={C.white}>
        <div style={{ background: C.white, minHeight: 800, paddingBottom: 76, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}` }}>
            {['Marketing','Sales'].map((t, i) => (
              <div key={t} style={{ flex: 1, padding: 12, textAlign: 'center', fontSize: 13, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? C.a1 : C.t3, borderBottom: i === 0 ? `2px solid ${C.a1}` : '2px solid transparent', cursor: 'pointer' }}>{t}</div>
            ))}
          </div>
          <div style={{ padding: '11px 14px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 38, height: 38, background: gradPrimary, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 3px 10px rgba(99,102,241,.24)' }}><svg width="17" height="17" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg></div>
            <div><div style={{ fontSize: 13, fontWeight: 600 }}>Sellix</div><div style={{ fontSize: 11, color: C.t3 }}>Brand-aware · AI powered</div></div>
            <Badge variant="green" dot="green" style={{ marginLeft: 'auto' }}>Online</Badge>
          </div>
          <div style={{ flex: 1, padding: 13, display: 'flex', flexDirection: 'column', gap: 13, background: '#FAFBFE', overflowY: 'auto' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <div style={{ width: 28, height: 28, background: gradPrimary, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="12" height="12" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg></div>
              <div style={{ background: C.white, borderRadius: '4px 13px 13px 13px', padding: 11, maxWidth: '82%', fontSize: 12, lineHeight: 1.6, boxShadow: '0 1px 6px rgba(14,25,55,.06)' }}>
                <strong>Hi Tanvir! 👋</strong> I'm Sellix. I know KB Aviation — let's create something great!
              </div>
            </div>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', paddingLeft: 36 }}>
              {['📝 Content ideas','📅 Schedule','✍️ Ad copy'].map(c => (
                <div key={c} style={{ padding: '5px 11px', background: '#EEF2FF', color: C.a1, borderRadius: 100, fontSize: 11, fontWeight: 500, cursor: 'pointer' }}>{c}</div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ background: gradPrimary, color: '#fff', padding: '9px 13px', borderRadius: '13px 4px 13px 13px', maxWidth: '76%', fontSize: 12, lineHeight: 1.5 }}>Write 3 Facebook posts for our summer sale</div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <div style={{ width: 28, height: 28, background: gradPrimary, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="12" height="12" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg></div>
              <div style={{ background: C.white, borderRadius: '4px 13px 13px 13px', padding: 11, maxWidth: '86%', fontSize: 12, lineHeight: 1.6, boxShadow: '0 1px 6px rgba(14,25,55,.06)' }}>
                Here are 3 high-converting ideas:<br /><br />
                {['"✈️ Summer is calling! Save up to 30% before July 31."', '"Where will your story begin? KB Aviation deals await. ✨"', '"4,800+ travelers chose us. Grab your seat! 🎫"'].map(q => (
                  <div key={q} style={{ background: '#EEF2FF', borderLeft: `3px solid ${C.a1}`, padding: '7px 10px', borderRadius: '0 7px 7px 0', fontSize: 11, color: '#4338CA', margin: '4px 0', lineHeight: 1.5 }}>{q}</div>
                ))}
                <div style={{ display: 'flex', gap: 6, marginTop: 9 }}>
                  <div style={{ flex: 1, height: 31, background: C.a1, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>Use in Campaign</div>
                  <div style={{ height: 31, padding: '0 10px', background: C.inner, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: C.t2, cursor: 'pointer' }}>Redo</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ padding: '9px 13px', borderTop: `1px solid ${C.border}`, background: C.white }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.inner, borderRadius: 100, padding: '8px 13px' }}>
              <input style={{ flex: 1, border: 'none', outline: 'none', fontSize: 12, background: 'transparent', color: C.t1, fontFamily: 'inherit' }} placeholder="Ask Sellix anything..." />
              <div style={{ width: 28, height: 28, background: gradPrimary, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}><svg width="12" height="12" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg></div>
            </div>
          </div>
          <MobileNav active="sellix" />
        </div>
      </PhoneFrame>
    </div>
  );
}

// ─── M05 Analytics ──────────────────────────────────────────────────
export function MobileAnalytics() {
  return (
    <div style={{ background: C.pageBg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <PhoneFrame>
        <div style={{ position: 'relative', paddingBottom: 76, overflowY: 'auto' }}>
          <div style={{ padding: 14 }}>
            <div style={{ fontSize: 10, color: C.t3, textTransform: 'uppercase', letterSpacing: '.07em', fontWeight: 600, marginBottom: 2 }}>Performance</div>
            <div style={{ fontSize: 19, fontWeight: 300, marginBottom: 13 }}>Analytics <strong style={{ fontWeight: 800 }}>dashboard</strong></div>

            <div style={{ background: gradHero, borderRadius: 17, padding: 15, marginBottom: 11 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
                <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,.18)', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#fff' }}>KB</div>
                <div><div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>KB Aviation</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,.7)' }}>Travel · Seoul, South Korea</div></div>
              </div>
              <div style={{ display: 'flex', gap: 14 }}>
                {[['13,497','Followers'],['10K Club','Status'],['Apr 6','Last active']].map(([v,l]) => (
                  <div key={l}><div style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>{v}</div><div style={{ fontSize: 10, color: 'rgba(255,255,255,.65)' }}>{l}</div></div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, marginBottom: 11 }}>
              {[
                { label: 'Total reach', value: '196K', badge: '▲ 8.2%', badgeV: 'green', color: 'indigo', icon: 'M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20' },
                { label: 'Campaigns',   value: '12',   badge: '● Live',  badgeV: 'orange',color: 'coral',  icon: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z' },
                { label: 'Resolved',    value: '1,850',badge: '87%',     badgeV: 'green', color: 'teal',   icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' },
                { label: 'Bot rate',    value: '78%',  isDual: true,                      color: 'purple', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
              ].map(({ label, value, badge, badgeV, color, icon, isDual }) => (
                <div key={label} style={{ background: C.white, borderRadius: 17, padding: 12, boxShadow: '0 2px 12px rgba(14,25,55,.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
                    <span style={{ fontSize: 11, color: C.t3 }}>{label}</span>
                    <IconBadge color={color} size={26}><svg width="11" height="11" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d={icon} /></svg></IconBadge>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800, marginBottom: isDual ? 5 : 3 }}>{value}</div>
                  {isDual ? (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 3 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: C.barP, display: 'inline-block' }} /><div style={{ flex: 1, height: 3, background: '#E5EAF3', borderRadius: 2, overflow: 'hidden' }}><div style={{ width: '78%', height: '100%', background: C.barP, borderRadius: 2 }} /></div></div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: C.barC, display: 'inline-block' }} /><div style={{ flex: 1, height: 3, background: '#E5EAF3', borderRadius: 2, overflow: 'hidden' }}><div style={{ width: '22%', height: '100%', background: C.barC, borderRadius: 2 }} /></div></div>
                    </div>
                  ) : <Badge variant={badgeV}>{badge}</Badge>}
                </div>
              ))}
            </div>

            <div style={{ background: C.white, borderRadius: 17, padding: 13, boxShadow: '0 2px 12px rgba(14,25,55,.05)' }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 9 }}>⚡ Zipto Recommends</div>
              {[
                { msg: 'Boost Summer Sale 🔥', sub: '3× avg engagement', btnLabel: 'Boost', btnColor: C.coral },
                { msg: 'Post Tue 6–8 PM 📅', sub: 'Peak audience window', btnLabel: 'Schedule', btnColor: C.green },
              ].map(({ msg, sub, btnLabel, btnColor }) => (
                <div key={msg} style={{ background: C.inner, borderRadius: 11, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
                  <div><div style={{ fontSize: 12, fontWeight: 500, marginBottom: 1 }}>{msg}</div><div style={{ fontSize: 11, color: C.t3 }}>{sub}</div></div>
                  <div style={{ height: 30, padding: '0 11px', background: btnColor, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer', flexShrink: 0, marginLeft: 7 }}>{btnLabel}</div>
                </div>
              ))}
            </div>
          </div>
          <MobileNav active="analytics" />
        </div>
      </PhoneFrame>
    </div>
  );
}

// ─── M06 Settings ───────────────────────────────────────────────────
export function MobileSettings() {
  const menuItems = ['Brand AI Settings','Payment & Plan','Audience','Chatbot Preferences','Tracking & Attribution'];

  return (
    <div style={{ background: C.pageBg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <PhoneFrame>
        <div style={{ position: 'relative', paddingBottom: 76, overflowY: 'auto' }}>
          <div style={{ padding: 14 }}>
            <div style={{ fontSize: 10, color: C.t3, textTransform: 'uppercase', letterSpacing: '.07em', fontWeight: 600, marginBottom: 2 }}>Account</div>
            <div style={{ fontSize: 19, fontWeight: 300, marginBottom: 14 }}><strong style={{ fontWeight: 800 }}>Settings</strong></div>

            {/* Profile */}
            <div style={{ background: C.white, borderRadius: 17, padding: 13, marginBottom: 10, boxShadow: '0 2px 12px rgba(14,25,55,.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <div style={{ width: 48, height: 48, background: gradPrimary, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 15, boxShadow: '0 4px 12px rgba(99,102,241,.26)' }}>TB</div>
                <div><div style={{ fontSize: 14, fontWeight: 700 }}>Tanvir Baig</div><div style={{ fontSize: 12, color: C.t3 }}>tanvir@kbaviation.com</div><Badge variant="blue" style={{ marginTop: 3 }}>Pro Plan</Badge></div>
                <div style={{ marginLeft: 'auto', fontSize: 12, color: C.a1, fontWeight: 500 }}>Edit →</div>
              </div>
            </div>

            {/* Setup progress */}
            <div style={{ background: '#EEF2FF', border: '1.5px solid #C7D2FE', borderRadius: 13, padding: 12, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.a1 }}>Account setup</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: C.a1 }}>3 / 6</span>
              </div>
              <ProgressBar pct={50} variant="purple" height={5} />
            </div>

            {/* Connected */}
            <div style={{ fontSize: 10, fontWeight: 700, color: C.t3, letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: 7 }}>Connected platforms</div>
            <div style={{ background: C.white, borderRadius: 17, padding: 12, marginBottom: 7, boxShadow: '0 2px 12px rgba(14,25,55,.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <div style={{ width: 36, height: 36, background: '#1877F2', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>f</div>
                  <div><div style={{ fontSize: 13, fontWeight: 500 }}>Meta / Facebook</div><div style={{ fontSize: 11, color: C.t3 }}>KB Aviation · Connected</div></div>
                </div>
                <Badge variant="green" dot="green">On</Badge>
              </div>
            </div>
            <div style={{ border: '2px dashed #C7D2FE', background: '#FAFBFF', borderRadius: 17, padding: 12, marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 13, color: C.t2 }}>Connect more platforms</div>
                <span style={{ fontSize: 12, color: C.a1, fontWeight: 600 }}>+ Add →</span>
              </div>
            </div>

            {/* Config menu */}
            <div style={{ fontSize: 10, fontWeight: 700, color: C.t3, letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: 7 }}>Configuration</div>
            <div style={{ background: C.white, borderRadius: 17, overflow: 'hidden', boxShadow: '0 2px 10px rgba(14,25,55,.05)', marginBottom: 12 }}>
              {menuItems.map((item, i) => (
                <div key={item} style={{ padding: '14px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i < menuItems.length - 1 ? `1px solid ${C.border}` : 'none', cursor: 'pointer' }}>
                  <span style={{ fontSize: 13 }}>{item}</span>
                  <svg width="13" height="13" fill="none" stroke={C.border} strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
                </div>
              ))}
            </div>

            {/* Preferences */}
            <div style={{ fontSize: 10, fontWeight: 700, color: C.t3, letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: 7 }}>Preferences</div>
            <div style={{ background: C.white, borderRadius: 17, overflow: 'hidden', boxShadow: '0 2px 10px rgba(14,25,55,.05)', marginBottom: 12 }}>
              {[
                { label: 'Language', right: <span style={{ fontSize: 12, color: C.a1, fontWeight: 600 }}>English ›</span> },
                { label: 'Notifications', right: <div style={{ width: 36, height: 20, background: C.a1, borderRadius: 10, position: 'relative' }}><div style={{ position: 'absolute', right: 3, top: 3, width: 14, height: 14, background: C.white, borderRadius: '50%', boxShadow: '0 1px 3px rgba(0,0,0,.18)' }} /></div> },
                { label: 'Dark mode', right: <div style={{ width: 36, height: 20, background: C.border, borderRadius: 10, position: 'relative' }}><div style={{ position: 'absolute', left: 3, top: 3, width: 14, height: 14, background: C.white, borderRadius: '50%', boxShadow: '0 1px 3px rgba(0,0,0,.15)' }} /></div> },
              ].map(({ label, right }, i) => (
                <div key={label} style={{ padding: '14px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i < 2 ? `1px solid ${C.border}` : 'none' }}>
                  <span style={{ fontSize: 13 }}>{label}</span>{right}
                </div>
              ))}
            </div>

            <div style={{ height: 44, background: '#FEF2F2', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#DC2626', fontWeight: 500, cursor: 'pointer' }}>Sign out</div>
          </div>
          <MobileNav active="settings" />
        </div>
      </PhoneFrame>
    </div>
  );
}
