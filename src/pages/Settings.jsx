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
          {activeTab === 'Payment & Plan' && <PaymentPlanSettings />}
          {activeTab === 'Audience' && <AudienceSettings />}
          {activeTab === 'Chatbot' && <ChatbotSettings />}
          {activeTab === 'Tracking' && <TrackingSettings />}
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

  // Meta state
  const [metaConnected, setMetaConnected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [draftPage, setDraftPage] = useState('kb_aviation');
  const [draftAd, setDraftAd] = useState('act_112233445566');
  const [savedPage, setSavedPage] = useState(null);
  const [savedAd, setSavedAd] = useState(null);

  const fbPages = [
    { id: 'kb_aviation',  name: 'KB Aviation',  followers: '13,497', category: 'Travel & Transportation' },
    { id: 'areum_square', name: 'Areum Square',  followers: '8,210',  category: 'Skin Care' },
    { id: 'test_page',    name: 'My Test Page',  followers: '104',    category: 'Uncategorized' },
  ];
  const adAccounts = [
    { id: 'act_112233445566', name: 'KB Aviation Ads', currency: 'USD' },
    { id: 'act_998877665544', name: 'Areum Square Promotions', currency: 'KRW' },
  ];

  const openModal = () => {
    setDraftPage(savedPage?.id || 'kb_aviation');
    setDraftAd(savedAd?.id || 'act_112233445566');
    setShowModal(true);
  };

  const handleSave = () => {
    setSavedPage(fbPages.find(p => p.id === draftPage));
    setSavedAd(adAccounts.find(a => a.id === draftAd));
    setMetaConnected(true);
    setShowModal(false);
  };

  const handleDisconnect = () => {
    setMetaConnected(false);
    setSavedPage(null);
    setSavedAd(null);
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <div style={s.pgCtx}>Step 1 of 6</div>
          <div style={s.pgTitle}>Platform <b>integration</b></div>
        </div>
        <span style={{ fontSize: 12, color: C.a1, fontWeight: 500, cursor: 'pointer' }}>Need help?</span>
      </div>

      {/* 3×3 platform grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 18 }}>

        {/* Meta / Facebook card */}
        <div style={{ ...s.card, display: 'flex', flexDirection: 'column', gap: 10, padding: '14px 16px', border: metaConnected ? '2px solid #C7D2FE' : '2px solid transparent' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: '#1877F2', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: '#fff', flexShrink: 0 }}>f</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.t1 }}>Meta / Facebook</div>
              <div style={s.tiny}>{metaConnected ? 'Connected' : 'Max 1 account'}</div>
            </div>
            {metaConnected && <V1Badge variant="green" dot></V1Badge>}
          </div>

          {/* Show selected page + ad account when connected */}
          {metaConnected && savedPage && (
            <div style={{ background: '#F8FAFD', borderRadius: 9, padding: '8px 10px', fontSize: 11 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ color: C.t3, fontWeight: 600 }}>Page</span>
                <span style={{ color: C.t1, fontWeight: 700 }}>{savedPage.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: C.t3, fontWeight: 600 }}>Ad Acc.</span>
                <span style={{ color: C.t1, fontWeight: 700 }}>{savedAd?.name}</span>
              </div>
            </div>
          )}

          {metaConnected
            ? <div style={{ display: 'flex', gap: 6 }}>
                <Btn variant="secondary" size="sm" style={{ flex: 1, justifyContent: 'center' }} onClick={openModal}>Edit</Btn>
                <Btn variant="danger" size="sm" style={{ flex: 1, justifyContent: 'center' }} onClick={handleDisconnect}>Disconnect</Btn>
              </div>
            : <Btn variant="primary" size="sm" style={{ justifyContent: 'center', width: '100%' }} onClick={openModal}>Connect</Btn>
          }
        </div>

        {/* Other platforms */}
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

      {/* ── Modal ── */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(14,25,55,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(3px)' }} onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 28, width: 560, maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(14,25,55,.18)' }}>

            {/* Modal header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, background: '#1877F2', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff' }}>f</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.t1 }}>Meta Account Setup</div>
                  <div style={s.tiny}>Select the page and ad account to use with Zipto</div>
                </div>
              </div>
              <div onClick={() => setShowModal(false)} style={{ width: 28, height: 28, borderRadius: '50%', background: '#F3F6FB', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16, color: C.t3 }}>×</div>
            </div>

            {/* Facebook Page */}
            <div style={{ fontSize: 12, fontWeight: 700, color: C.t1, marginBottom: 10 }}>Select Facebook Page</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {fbPages.map(pg => (
                <div key={pg.id} onClick={() => setDraftPage(pg.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 12, border: `2px solid ${draftPage === pg.id ? '#6366F1' : '#E2E8F0'}`, background: draftPage === pg.id ? '#EEF2FF' : '#F8FAFD', cursor: 'pointer', transition: 'all .15s' }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${draftPage === pg.id ? '#6366F1' : '#CBD5E1'}`, background: draftPage === pg.id ? '#6366F1' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {draftPage === pg.id && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: draftPage === pg.id ? C.a1 : C.t1 }}>{pg.name}</div>
                    <div style={s.tiny}>{pg.followers} followers · {pg.category}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ad Account */}
            <div style={{ fontSize: 12, fontWeight: 700, color: C.t1, marginBottom: 10 }}>Select Ad Account</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
              {adAccounts.map(acc => (
                <div key={acc.id} onClick={() => setDraftAd(acc.id)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 12, border: `2px solid ${draftAd === acc.id ? '#6366F1' : '#E2E8F0'}`, background: draftAd === acc.id ? '#EEF2FF' : '#F8FAFD', cursor: 'pointer', transition: 'all .15s' }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${draftAd === acc.id ? '#6366F1' : '#CBD5E1'}`, background: draftAd === acc.id ? '#6366F1' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {draftAd === acc.id && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: draftAd === acc.id ? C.a1 : C.t1 }}>{acc.name}</div>
                    <div style={s.tiny}>{acc.id} · {acc.currency}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#EEF2FF', borderRadius: 10, padding: '9px 12px', fontSize: 11, color: C.a1, marginBottom: 18 }}>
              💡 These will be the default page and ad account used across all Zipto campaigns.
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10 }}>
              <Btn variant="secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowModal(false)}>Cancel</Btn>
              <Btn variant="primary" style={{ flex: 2, justifyContent: 'center' }} onClick={handleSave}>Save & Connect</Btn>
            </div>
          </div>
        </div>
      )}

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

// ─── Payment & Plan ──────────────────────────────────────────────────
function PaymentPlanSettings() {
  const plans = [
    { name: 'Starter',  price: '$9',  credits: '500 cr/mo',   features: ['1 Platform', '500 credits', 'Basic AI copy', 'Email support'], current: false },
    { name: 'Pro',      price: '$29', credits: '2,000 cr/mo', features: ['3 Platforms', '2,000 credits', 'AI Sales Assistant', 'Priority support'], current: true },
    { name: 'Business', price: '$79', credits: '8,000 cr/mo', features: ['All Platforms', '8,000 credits', 'Custom AI model', 'Dedicated support'], current: false },
  ];
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div><div style={s.pgCtx}>Step 3 of 6</div><div style={s.pgTitle}>Payment & <b>plan</b></div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 18 }}>
        {plans.map(p => (
          <div key={p.name} style={{ ...s.card, border: p.current ? '2px solid #6366F1' : '2px solid transparent', position: 'relative' }}>
            {p.current && <span style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: '#6366F1', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 10px', borderRadius: 100 }}>CURRENT</span>}
            <div style={{ fontSize: 16, fontWeight: 700, color: C.t1, marginBottom: 4 }}>{p.name}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: C.a1, marginBottom: 2 }}>{p.price} <span style={{ fontSize: 13, fontWeight: 400, color: C.t3 }}>/ mo</span></div>
            <div style={{ fontSize: 12, color: C.t3, marginBottom: 14 }}>{p.credits}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {p.features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="8" height="8" fill="none" stroke="#059669" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <span style={{ fontSize: 12, color: C.t2 }}>{f}</span>
                </div>
              ))}
            </div>
            <Btn variant={p.current ? 'secondary' : 'primary'} style={{ width: '100%', justifyContent: 'center' }}>
              {p.current ? 'Current plan' : `Upgrade to ${p.name}`}
            </Btn>
          </div>
        ))}
      </div>

      <div style={s.card}>
        <div style={{ ...s.sect, marginBottom: 14 }}>Payment method</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFD', borderRadius: 12, padding: '12px 16px', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ background: '#1A1F71', color: '#fff', fontWeight: 800, fontSize: 12, padding: '6px 12px', borderRadius: 8 }}>VISA</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.t1 }}>•••• •••• •••• 4242</div>
              <div style={{ fontSize: 11, color: C.t3 }}>Expires 08 / 27</div>
            </div>
          </div>
          <V1Badge variant="green">Default</V1Badge>
        </div>
        <Btn variant="ghost">+ Add payment method</Btn>
      </div>
    </>
  );
}

// ─── Audience Settings ───────────────────────────────────────────────
function AudienceSettings() {
  const segments = [
    { name: 'Travel Enthusiasts', size: '4,200',  tag: 'Auto',   clr: '#06B6D4' },
    { name: 'Frequent Flyers',    size: '1,850',  tag: 'Auto',   clr: '#8B5CF6' },
    { name: 'Corporate Clients',  size: '640',    tag: 'Manual', clr: '#F97316' },
    { name: 'Lookalike 1%',       size: '22,000', tag: 'Meta',   clr: '#1877F2' },
  ];
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div><div style={s.pgCtx}>Step 4 of 6</div><div style={s.pgTitle}>Audience <b>configuration</b></div></div>
        <Btn variant="primary">+ New segment</Btn>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 18 }}>
        {segments.map(seg => (
          <div key={seg.name} style={{ ...s.card, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: `${seg.clr}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: seg.clr }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.t1 }}>{seg.name}</div>
                <div style={s.tiny}>{seg.size} people · {seg.tag} segment</div>
              </div>
            </div>
            <Btn variant="secondary" size="sm">Manage</Btn>
          </div>
        ))}
      </div>

      <div style={s.card}>
        <div style={{ ...s.sect, marginBottom: 14 }}>Default targeting</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          <V1Input label="Age range" defaultValue="18 – 65" />
          <V1Input label="Locations" defaultValue="Bangladesh, South Korea" />
          <V1Input label="Interests" defaultValue="Travel, Aviation, Tourism" />
          <V1Input label="Excluded audiences" defaultValue="Existing customers" />
        </div>
        <Btn variant="primary">Save targeting</Btn>
      </div>
    </>
  );
}

// ─── Chatbot Settings ────────────────────────────────────────────────
function ChatbotSettings() {
  const [active, setActive] = useState(true);
  const [escalation, setEscalation] = useState('stop');
  const [keywords, setKeywords] = useState(['refund']);
  const [kwInput, setKwInput] = useState('');
  const addKw = () => { if (kwInput.trim()) { setKeywords(p => [...p, kwInput.trim()]); setKwInput(''); } };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div><div style={s.pgCtx}>Step 5 of 6</div><div style={s.pgTitle}>Messenger <b>Chatbot</b></div></div>
        <Btn variant="primary">Save Settings</Btn>
      </div>

      {/* Page + toggle */}
      <div style={{ ...s.card, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 42, height: 42, background: '#1877F2', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#fff' }}>f</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.t1 }}>Areum Square</div>
            <div style={s.tiny}>Facebook Page · AI auto-responder</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12, color: active ? '#059669' : C.t3, fontWeight: 600 }}>{active ? 'Chatbot Active' : 'Chatbot Off'}</span>
          <div onClick={() => setActive(v => !v)} style={{ width: 40, height: 22, borderRadius: 100, background: active ? '#6366F1' : '#E2E8F0', position: 'relative', cursor: 'pointer', transition: 'background .2s' }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: active ? 21 : 3, transition: 'left .2s', boxShadow: '0 1px 4px rgba(0,0,0,.2)' }} />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <svg width="14" height="14" fill="none" stroke="#6366F1" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
        <span style={{ fontSize: 12, color: C.a1, fontWeight: 600 }}>Auto-reply to Messenger DMs</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <div style={s.card}>
          <div style={{ ...s.sect, marginBottom: 6 }}>Bot Instructions</div>
          <div style={s.tiny}>Tell the bot who it is, what it should do, and any rules to follow.</div>
          <textarea defaultValue="you are a customer support for skin care products" rows={4} style={{ width: '100%', marginTop: 10, padding: '9px 12px', borderRadius: 9, border: '1.5px solid #E2E8F0', fontSize: 13, color: C.t1, resize: 'none', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
        </div>
        <div style={s.card}>
          <div style={{ ...s.sect, marginBottom: 14 }}>Voice & Behaviour</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <V1Select label="Voice & Tone">
              <option>Friendly & Casual</option><option>Professional</option><option>Formal</option>
            </V1Select>
            <V1Select label="Language">
              <option>English</option><option>Bengali</option><option>Arabic</option>
            </V1Select>
            <div>
              <label style={s.flbl}>Response Delay: <b>10s</b></label>
              <input type="range" min="0" max="30" defaultValue="10" style={{ width: '100%', accentColor: '#6366F1' }} />
              <div style={{ ...s.tiny, marginTop: 3 }}>Delay makes responses feel more natural</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <div style={s.card}>
          <label style={s.flbl}>Greeting Message <span style={{ color: C.t3, fontWeight: 400 }}>(optional)</span></label>
          <textarea defaultValue="Assalamualakum" rows={3} style={{ width: '100%', padding: '9px 12px', borderRadius: 9, border: '1.5px solid #E2E8F0', fontSize: 13, color: C.t1, resize: 'none', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          <div style={{ ...s.tiny, marginTop: 5 }}>Sent once at the start of a new conversation</div>
        </div>
        <div style={s.card}>
          <label style={s.flbl}>Fallback Message <span style={{ color: C.t3, fontWeight: 400 }}>(optional)</span></label>
          <textarea defaultValue="I'm not sure about that. Let me connect you with someone who can help." rows={3} style={{ width: '100%', padding: '9px 12px', borderRadius: 9, border: '1.5px solid #E2E8F0', fontSize: 13, color: C.t1, resize: 'none', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          <div style={{ ...s.tiny, marginTop: 5 }}>Used when the bot is unsure (only in "always respond" mode)</div>
        </div>
      </div>

      <div style={{ ...s.card, marginBottom: 14 }}>
        <div style={{ ...s.sect, marginBottom: 12 }}>When unsure or unable to answer</div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          {[['stop','Stop & notify me (escalate)'],['always','Always try to respond']].map(([v, l]) => (
            <div key={v} onClick={() => setEscalation(v)} style={{ flex: 1, padding: '12px 14px', borderRadius: 12, border: `2px solid ${escalation === v ? '#6366F1' : '#E2E8F0'}`, background: escalation === v ? '#EEF2FF' : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${escalation === v ? '#6366F1' : '#CBD5E1'}`, background: escalation === v ? '#6366F1' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {escalation === v && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
              </div>
              <span style={{ fontSize: 13, fontWeight: escalation === v ? 600 : 400, color: escalation === v ? C.a1 : C.t2 }}>{l}</span>
            </div>
          ))}
        </div>

        <label style={{ ...s.flbl, marginBottom: 6 }}>Escalation Keywords</label>
        <div style={{ ...s.tiny, marginBottom: 8 }}>Bot stops and notifies you when these words appear</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
          {keywords.map(k => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: 100, padding: '3px 10px' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#DC2626' }}>{k}</span>
              <span onClick={() => setKeywords(p => p.filter(x => x !== k))} style={{ color: '#DC2626', cursor: 'pointer', fontSize: 14, lineHeight: 1 }}>×</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input value={kwInput} onChange={e => setKwInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addKw()} placeholder="e.g. refund" style={{ flex: 1, padding: '8px 12px', borderRadius: 9, border: '1.5px solid #E2E8F0', fontSize: 13, outline: 'none', fontFamily: 'inherit' }} />
          <Btn variant="ghost" onClick={addKw}>Add</Btn>
        </div>
      </div>

      <div style={s.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div style={s.sect}>Knowledge Base</div>
          <Btn variant="secondary" size="sm">Upload</Btn>
        </div>
        <div style={s.tiny}>Upload .txt, .csv, or .json files for the bot to reference</div>
        <div style={{ marginTop: 14, background: '#F8FAFD', border: '2px dashed #C7D2FE', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <svg width="24" height="24" fill="none" stroke="#C7D2FE" strokeWidth="1.5" viewBox="0 0 24 24" style={{ marginBottom: 8 }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
          <div style={{ fontSize: 12, color: C.t3, fontWeight: 500 }}>No files uploaded yet.</div>
          <div style={{ ...s.tiny, marginTop: 4 }}>Upload product catalogs, FAQs, or price lists.</div>
        </div>
      </div>
    </>
  );
}

// ─── Tracking Settings ───────────────────────────────────────────────
function TrackingSettings() {
  const [pixelVerified, setPixelVerified] = useState(false);
  const eventDefs = [
    { name: 'PageView',              active: true,  desc: 'Fired on every page load' },
    { name: 'Lead',                  active: true,  desc: 'Form submission or sign-up' },
    { name: 'Purchase',              active: false, desc: 'Credit purchase completed' },
    { name: 'ViewContent',           active: true,  desc: 'Campaign or dashboard viewed' },
    { name: 'InitiateCheckout',      active: false, desc: 'Started credit top-up flow' },
    { name: 'CompleteRegistration',  active: true,  desc: 'Onboarding completed' },
  ];
  const [evtActive, setEvtActive] = useState(eventDefs.map(e => e.active));

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div><div style={s.pgCtx}>Step 6 of 6</div><div style={s.pgTitle}>Tracking & <b>pixels</b></div></div>
        <Btn variant="primary">Save Tracking</Btn>
      </div>

      {/* Meta Pixel */}
      <div style={{ ...s.card, marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: '#1877F2', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#fff' }}>f</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.t1 }}>Meta Pixel (Client-side)</div>
              <div style={s.tiny}>Tracks website visitor events for ad optimisation & retargeting</div>
            </div>
          </div>
          <V1Badge variant="green" dot>Active</V1Badge>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 10, alignItems: 'end' }}>
          <V1Input label="Pixel ID" defaultValue="1234567890123456" />
          <Btn variant={pixelVerified ? 'secondary' : 'primary'} onClick={() => setPixelVerified(v => !v)}>
            {pixelVerified ? '✓ Verified' : 'Verify Pixel'}
          </Btn>
        </div>
      </div>

      {/* Conversions API */}
      <div style={{ ...s.card, marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: '#6366F1', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.t1 }}>Conversions API (CAPI)</div>
              <div style={s.tiny}>Server-side events — works through iOS 14+ restrictions & ad blockers</div>
            </div>
          </div>
          <V1Badge variant="gray">Recommended</V1Badge>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <V1Input label="Access Token" defaultValue="EAABs..." />
          <V1Input label="Test Event Code" defaultValue="TEST12345" />
        </div>
        <div style={{ background: '#EEF2FF', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: C.a1 }}>
          💡 CAPI supplements your Pixel to recover lost events. Zipto sends server events for Lead, Purchase, and CompleteRegistration automatically.
        </div>
      </div>

      {/* Standard Events */}
      <div style={{ ...s.card, marginBottom: 14 }}>
        <div style={{ ...s.sect, marginBottom: 14 }}>Standard Events</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
          {eventDefs.map((evt, i) => (
            <div key={evt.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFD', borderRadius: 10, padding: '10px 14px' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.t1 }}>{evt.name}</div>
                <div style={s.tiny}>{evt.desc}</div>
              </div>
              <div onClick={() => setEvtActive(p => { const n = [...p]; n[i] = !n[i]; return n; })} style={{ width: 36, height: 20, borderRadius: 100, background: evtActive[i] ? '#6366F1' : '#E2E8F0', position: 'relative', cursor: 'pointer', transition: 'background .2s', flexShrink: 0 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: evtActive[i] ? 19 : 3, transition: 'left .2s' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* UTM Builder */}
      <div style={s.card}>
        <div style={{ ...s.sect, marginBottom: 4 }}>UTM Link Builder</div>
        <div style={s.tiny}>Auto-tag all links sent through Zipto for campaign attribution</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginTop: 14, marginBottom: 14 }}>
          <V1Input label="utm_source" defaultValue="facebook" />
          <V1Input label="utm_medium" defaultValue="social" />
          <V1Input label="utm_campaign" defaultValue="{campaign_name}" />
        </div>
        <div style={{ background: '#F8FAFD', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: C.t2, wordBreak: 'break-all', marginBottom: 12 }}>
          <span style={{ color: C.t3, fontSize: 10, fontWeight: 700, display: 'block', marginBottom: 4 }}>PREVIEW</span>
          https://yoursite.com?utm_source=facebook&utm_medium=social&utm_campaign=summer_2026
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn variant="primary">Apply to all campaigns</Btn>
          <Btn variant="secondary">Reset to defaults</Btn>
        </div>
      </div>
    </>
  );
}
