import React, { useState } from 'react';
import { PageShell } from '../components/ui';

// ─── Local V1 Styles ──────────────────────────────────────────────────
const s = {
  card: {
    background: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    boxShadow: '0 2px 20px rgba(14,25,55,.07)',
  },
  inner: { background: '#F3F6FB', borderRadius: 10, padding: '10px 12px' },
  pgCtx: { fontSize: 11, fontWeight: 500, color: '#9BA5B7', letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: 3 },
  pgTitle: { fontSize: 25, fontWeight: 300, color: '#141921', lineHeight: 1.2 },
  sect: { fontSize: 14, fontWeight: 600, color: '#141921' },
  subl: { fontSize: 10, fontWeight: 700, color: '#9BA5B7', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 8, display: 'block' },
  tiny: { fontSize: 11, color: '#9BA5B7' },
  flbl: { fontSize: 11, fontWeight: 600, color: '#5C6678', marginBottom: 5, display: 'block' },
};

const C = {
  a1: '#6366F1', t1: '#141921', t2: '#5C6678', t3: '#9BA5B7',
  border: '#F1F5F9', inner: '#F3F6FB', white: '#FFFFFF',
};

// ─── Local Sub-components ─────────────────────────────────────────────

function V1Badge({ variant = 'gray', dot, children }) {
  const v = { green: { bg: '#ECFDF5', t: '#059669' }, blue: { bg: '#EEF2FF', t: '#6366F1' }, red: { bg: '#FEF2F2', t: '#DC2626' }, gray: { bg: '#F3F6FB', t: '#5C6678' } };
  const col = v[variant] || v.gray;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 700, ...col }}>
      {dot && <span style={{ width: 5, height: 5, borderRadius: '50%', background: col.t, display: 'inline-block' }} />}
      {children}
    </span>
  );
}

function Btn({ variant = 'secondary', size = 'sm', style: ext, children, onClick }) {
  const base = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5, cursor: 'pointer', fontSize: size === 'sm' ? 12 : 13, fontWeight: 600, borderRadius: 9, padding: size === 'sm' ? '6px 13px' : '9px 18px', border: 'none', fontFamily: 'inherit', transition: 'all .15s' };
  const variants = {
    primary:   { background: '#6366F1', color: '#fff', boxShadow: '0 4px 14px rgba(99,102,241,.3)' },
    secondary: { background: '#F3F6FB', color: '#5C6678' },
    danger:    { background: '#FEF2F2', color: '#DC2626' },
    ghost:     { background: 'transparent', color: '#6366F1', border: '1.5px solid #C7D2FE' },
  };
  return <button style={{ ...base, ...variants[variant], ...ext }} onClick={onClick}>{children}</button>;
}

function V1Input({ label, defaultValue, type = 'text' }) {
  return (
    <div>
      <label style={s.flbl}>{label}</label>
      <input defaultValue={defaultValue} type={type} style={{ width: '100%', padding: '9px 12px', borderRadius: 9, border: '1.5px solid #E2E8F0', background: '#fff', fontSize: 13, outline: 'none', color: C.t1, fontFamily: 'inherit', boxSizing: 'border-box' }} />
    </div>
  );
}

function V1Select({ label, children }) {
  return (
    <div>
      <label style={s.flbl}>{label}</label>
      <select style={{ width: '100%', padding: '9px 12px', borderRadius: 9, border: '1.5px solid #E2E8F0', background: '#fff', fontSize: 13, outline: 'none', color: C.t1, fontFamily: 'inherit', boxSizing: 'border-box' }}>
        {children}
      </select>
    </div>
  );
}

function V1Chip({ active, onClick, children }) {
  return (
    <div onClick={onClick} style={{ padding: '5px 13px', borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: active ? '1.5px solid #6366F1' : '1.5px solid #E2E8F0', background: active ? '#EEF2FF' : '#fff', color: active ? '#6366F1' : '#5C6678', transition: 'all .15s' }}>
      {children}
    </div>
  );
}

// ─── Settings Tabs ───────────────────────────────────────────────────
const SETTING_TABS = ['Platform Integration', 'Brand AI', 'Payment & Plan', 'Audience', 'Chatbot', 'Tracking'];

// ─── Main Page ────────────────────────────────────────────────────────
export default function Settings({ alertCount, onAlertClick }) {
  const [activeTab, setActiveTab] = useState('Platform Integration');

  return (
    <PageShell active="settings" alertCount={alertCount} onAlertClick={onAlertClick}>
      <div style={{ display: 'flex', height: '100%', gap: 16, overflow: 'hidden', padding: '0 0 8px 0' }}>

        {/* Left Sidebar Nav */}
        <div style={{ width: 210, flexShrink: 0, background: '#FFFFFF', borderRadius: 18, padding: 16, boxShadow: '0 2px 20px rgba(14,25,55,.07)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          {/* Setup Progress */}
          <div style={{ background: '#F8FAFD', borderRadius: 12, padding: '10px 12px', marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.t1 }}>Setup progress</span>
              <span style={{ fontSize: 12, fontWeight: 800, color: C.a1 }}>3 / 6</span>
            </div>
            <div style={{ height: 6, background: '#E2E8F0', borderRadius: 100, overflow: 'hidden' }}>
              <div style={{ width: '50%', height: '100%', background: 'linear-gradient(90deg,#8B5CF6,#6366F1)', borderRadius: 100 }} />
            </div>
          </div>

          <span style={s.subl}>CONFIGURATION</span>
          {SETTING_TABS.map(t => (
            <div key={t} onClick={() => setActiveTab(t)} style={{ padding: '9px 12px', borderRadius: 10, fontSize: 13, cursor: 'pointer', marginBottom: 2, background: activeTab === t ? '#EEF2FF' : 'transparent', color: activeTab === t ? C.a1 : C.t2, fontWeight: activeTab === t ? 600 : 400, transition: 'all .12s' }}>
              {t}
            </div>
          ))}

          <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
            <div style={{ padding: '9px 12px', borderRadius: 10, fontSize: 13, color: C.t2, cursor: 'pointer' }}>Profile</div>
            <div style={{ padding: '9px 12px', borderRadius: 10, fontSize: 13, color: '#DC2626', cursor: 'pointer' }}>Sign out</div>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, background: '#FFFFFF', borderRadius: 18, boxShadow: '0 2px 20px rgba(14,25,55,.07)', overflowY: 'auto', padding: '22px 26px' }}>
          {activeTab === 'Platform Integration' && <PlatformSettings />}
          {activeTab === 'Brand AI' && <BrandSettings />}
          {!['Platform Integration', 'Brand AI'].includes(activeTab) && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: C.t3, fontSize: 14 }}>
              {activeTab} settings coming soon
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}

// ─── Platform Integration ─────────────────────────────────────────────
function PlatformSettings() {
  const platforms = [
    { id: 'ig', bg: '#E1306C', label: 'IG', name: 'Instagram',        sub: 'Max 1 account' },
    { id: 'li', bg: '#0A66C2', label: 'in', name: 'LinkedIn',          sub: 'Max 1 account' },
    { id: 'wa', bg: '#25D366', label: 'WA', name: 'WhatsApp Business', sub: 'Unlimited' },
    { id: 'tt', bg: '#010101', label: 'TT', name: 'TikTok Ads',        sub: 'Max 1 account', soon: true },
    { id: 'g',  bg: '#4285F4', label: 'G',  name: 'Google Ads',        sub: 'Max 1 account', soon: true },
  ];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const [active, setActive] = useState([0, 1, 2, 3, 4]);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <div style={s.pgCtx}>Step 1 of 6</div>
          <div style={s.pgTitle}>Platform <b>integration</b></div>
        </div>
        <span style={{ fontSize: 12, color: C.a1, fontWeight: 500, cursor: 'pointer' }}>Need help?</span>
      </div>

      {/* Connected FB card */}
      <div style={{ background: C.white, border: '2px solid #C7D2FE', borderRadius: 16, padding: 16, marginBottom: 14, boxShadow: '0 2px 20px rgba(14,25,55,.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, background: '#1877F2', borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, fontWeight: 700, color: '#fff' }}>f</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.t1, marginBottom: 2 }}>Meta / Facebook</div>
              <div style={s.tiny}>KB Aviation · 13,497 followers · Connected Apr 6, 2026</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <V1Badge variant="green" dot>Connected</V1Badge>
            <Btn variant="secondary" size="sm">Sync now</Btn>
            <Btn variant="danger" size="sm">Disconnect</Btn>
          </div>
        </div>
      </div>

      {/* 3×3 platform grid (5 platforms + 1 request = 6 cards, 3 per row) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 18 }}>
        {platforms.map(({ id, bg, label, name, sub, soon }) => (
          <div key={id} style={{ ...s.card, display: 'flex', flexDirection: 'column', gap: 12, padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, background: bg, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{label}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.t1 }}>{name}</div>
                <div style={s.tiny}>{sub}</div>
              </div>
            </div>
            {soon
              ? <Btn variant="secondary" size="sm" style={{ justifyContent: 'center', color: C.t3, width: '100%' }}>Coming soon</Btn>
              : <Btn variant="primary" size="sm" style={{ justifyContent: 'center', width: '100%' }}>Connect</Btn>
            }
          </div>
        ))}
        {/* Request connector card */}
        <div style={{ ...s.card, display: 'flex', flexDirection: 'column', gap: 12, padding: '14px 16px', border: '2px dashed #C7D2FE', background: '#FAFBFF', boxShadow: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: C.inner, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.t3, fontSize: 17, flexShrink: 0 }}>+</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, color: C.t2 }}>Request connector</div>
              <div style={s.tiny}>Need another?</div>
            </div>
          </div>
          <Btn variant="ghost" size="sm" style={{ justifyContent: 'center', width: '100%' }}>Request →</Btn>
        </div>
      </div>

      {/* Posting schedule */}
      <div style={{ ...s.card }}>
        <div style={{ ...s.sect, marginBottom: 14 }}>Default posting schedule</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <V1Select label="Preferred time">
            <option>6:00 PM – 8:00 PM (Recommended)</option>
          </V1Select>
          <div>
            <label style={s.flbl}>Active days</label>
            <div style={{ display: 'flex', gap: 6, marginTop: 5 }}>
              {days.map((d, i) => (
                <div key={i} onClick={() => setActive(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])} style={{ width: 32, height: 32, borderRadius: 9, background: active.includes(i) ? '#EEF2FF' : C.inner, color: active.includes(i) ? C.a1 : C.t3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: active.includes(i) ? 700 : 400, cursor: 'pointer', transition: 'all .12s' }}>{d}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Brand AI Settings ────────────────────────────────────────────────
function BrandSettings() {
  const voices = ['Friendly', 'Professional', 'Exciting', 'Informative'];
  const tones  = ['Casual', 'Formal', 'Playful'];
  const langs  = ['English', 'Bengali'];
  const [voice, setVoice] = useState(['Friendly']);
  const [tone,  setTone]  = useState(['Casual']);
  const [lang,  setLang]  = useState(['English', 'Bengali']);
  const toggle = (arr, setArr, v) => setArr(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <div style={s.pgCtx}>Step 2 of 6</div>
          <div style={s.pgTitle}>Brand AI <b>settings</b></div>
        </div>
        <Btn variant="primary">Save changes</Btn>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        {/* Basic Info */}
        <div style={s.card}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.t1, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.a1, display: 'inline-block' }} /> Basic information
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            <V1Input label="Business type" defaultValue="Aviation / Travel" />
            <V1Input label="Industry" defaultValue="Transportation, Tourism" />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={s.flbl}>Brand voice</label>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {voices.map(v => <V1Chip key={v} active={voice.includes(v)} onClick={() => toggle(voice, setVoice, v)}>{v}</V1Chip>)}
            </div>
          </div>
          <div>
            <label style={s.flbl}>Tone</label>
            <div style={{ display: 'flex', gap: 6 }}>
              {tones.map(t => <V1Chip key={t} active={tone.includes(t)} onClick={() => toggle(tone, setTone, t)}>{t}</V1Chip>)}
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div style={s.card}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.t1, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F97316', display: 'inline-block' }} /> Target audience
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            <V1Input label="Age range" defaultValue="18 – 65" />
            <V1Input label="Location" defaultValue="Bangladesh, South Korea" />
          </div>
          <div style={{ marginBottom: 12 }}>
            <V1Input label="Interests" defaultValue="Travel, Aviation, Luxury, Tourism" />
          </div>
          <div>
            <label style={s.flbl}>Languages</label>
            <div style={{ display: 'flex', gap: 6 }}>
              {langs.map(l => <V1Chip key={l} active={lang.includes(l)} onClick={() => toggle(lang, setLang, l)}>{l}</V1Chip>)}
              <V1Chip active={false} onClick={() => {}}>+ Add</V1Chip>
            </div>
          </div>
        </div>
      </div>

      {/* Marketing Insights */}
      <div style={{ ...s.card, marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.t1, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} /> Marketing insights
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[
            { lbl: 'Unique selling points', val: 'Premium service, Competitive pricing, Frequent flyer rewards, 15 destinations' },
            { lbl: 'Products / Services',   val: 'Domestic flights, International routes, Charter, Corporate travel' },
            { lbl: 'Competitors',           val: 'Air Arabia, IndiGo, Novoair' },
          ].map(({ lbl, val }) => (
            <div key={lbl}>
              <label style={s.flbl}>{lbl}</label>
              <textarea defaultValue={val} rows={3} style={{ width: '100%', padding: '9px 12px', borderRadius: 9, border: '1.5px solid #E2E8F0', fontSize: 12, color: C.t1, resize: 'none', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Completion banner */}
      <div style={{ background: '#EEF2FF', border: '1.5px solid #C7D2FE', borderRadius: 13, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.a1 }}>Brand profile 87% complete</div>
          <div style={{ fontSize: 11, color: C.a1, opacity: 0.8, marginTop: 2 }}>Add competitor info to unlock campaign benchmarking</div>
        </div>
        <div style={{ width: 90 }}>
          <div style={{ height: 7, background: '#C7D2FE', borderRadius: 100, overflow: 'hidden' }}>
            <div style={{ width: '87%', height: '100%', background: 'linear-gradient(90deg,#8B5CF6,#6366F1)', borderRadius: 100 }} />
          </div>
        </div>
      </div>
    </>
  );
}
