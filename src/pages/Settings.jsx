import React, { useState } from 'react';
import { PageShell, NeoCard, ProgressBar } from '../components/ui';

const SETTING_TABS = ['Platform Integration', 'Brand AI', 'Payment & Plan', 'Audience', 'Chatbot', 'Tracking'];

export default function Settings({ alertCount, onAlertClick }) {
  const [activeTab, setActiveTab] = useState('Platform Integration');

  return (
    <PageShell active="settings" alertCount={alertCount} onAlertClick={onAlertClick}>
      <div style={{ display: 'flex', height: '100%', gap: 20, overflow: 'hidden' }}>
        {/* Settings sub-nav */}
        <NeoCard style={{ width: 220, flexShrink: 0 }} innerStyle={{ padding: 14, display: 'flex', flexDirection: 'column' }}>
          {/* Progress */}
          <div style={{ background: 'var(--bg-card)', borderRadius: 12, padding: '10px 12px', marginBottom: 16, boxShadow: 'var(--shadow-neu-out)' }}>
            <div className="row ac jb mb8">
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--t1)' }}>Setup progress</span>
              <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--a1)' }}>3 / 6</span>
            </div>
            <ProgressBar pct={50} variant="purple" height={6} />
          </div>

          <div className="z-subl mb8">CONFIGURATION</div>
          {SETTING_TABS.map(t => (
            <div key={t} onClick={() => setActiveTab(t)} style={{
              padding: '9px 12px', borderRadius: 10, fontSize: 13, cursor: 'pointer', marginBottom: 3,
              background: activeTab === t ? 'var(--a1-soft)' : 'transparent',
              color: activeTab === t ? 'var(--a1)' : 'var(--t2)',
              fontWeight: activeTab === t ? 700 : 400,
              transition: 'all 0.15s',
            }}>{t}</div>
          ))}

          <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
            <div style={{ padding: '9px 12px', borderRadius: 10, fontSize: 13, color: 'var(--t2)', cursor: 'pointer' }}>Profile</div>
            <div style={{ padding: '9px 12px', borderRadius: 10, fontSize: 13, color: '#ef4444', cursor: 'pointer' }}>Sign out</div>
          </div>
        </NeoCard>

        {/* Settings Content */}
        <NeoCard style={{ flex: 1 }} innerStyle={{ padding: '20px 24px', overflowY: 'auto' }}>
          {activeTab === 'Platform Integration' && <PlatformSettings />}
          {activeTab === 'Brand AI' && <BrandSettings />}
          {!['Platform Integration', 'Brand AI'].includes(activeTab) && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--t3)', fontSize: 14 }}>
              {activeTab} settings coming soon
            </div>
          )}
        </NeoCard>
      </div>
    </PageShell>
  );
}

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
      <div className="row ac jb mb16">
        <div><div className="z-pg-ctx">Step 1 of 6</div><div className="z-pg-title">Platform <b>integration</b></div></div>
        <span style={{ fontSize: 12, color: 'var(--a1)', fontWeight: 600, cursor: 'pointer' }}>Need help?</span>
      </div>

      {/* Connected FB */}
      <div style={{ background: 'var(--bg-card)', border: '2px solid var(--a1)', borderRadius: 18, padding: 16, marginBottom: 14, boxShadow: 'var(--shadow-neu-out)' }}>
        <div className="row ac jb">
          <div className="row ac gap12">
            <div style={{ width: 46, height: 46, background: '#1877F2', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, fontWeight: 700, color: '#fff' }}>f</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--t1)', marginBottom: 2 }}>Meta / Facebook</div>
              <div style={{ fontSize: 11, color: 'var(--t3)' }}>KB Aviation · 13,497 followers · Connected Apr 6, 2026</div>
            </div>
          </div>
          <div className="row ac gap8">
            <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>
              <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: '#22c55e', marginRight: 5 }} />
              Connected
            </span>
            {['Sync now', 'Disconnect'].map((label, i) => (
              <button key={label} style={{ padding: '6px 14px', borderRadius: 10, border: 'none', background: i === 1 ? 'rgba(239,68,68,0.1)' : 'var(--bg-inner)', color: i === 1 ? '#ef4444' : 'var(--t2)', fontSize: 12, fontWeight: 600, cursor: 'pointer', boxShadow: 'var(--shadow-neu-out)', fontFamily: 'inherit' }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="g3 mb16">
        {platforms.map(({ id, bg, label, name, sub, soon }) => (
          <div key={id} style={{ background: 'var(--bg-card)', borderRadius: 18, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12, boxShadow: 'var(--shadow-neu-out)' }}>
            <div className="row ac gap10">
              <div style={{ width: 36, height: 36, background: bg, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700 }}>{label}</div>
              <div><div style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)' }}>{name}</div><div style={{ fontSize: 11, color: 'var(--t3)' }}>{sub}</div></div>
            </div>
            <button style={{ width: '100%', padding: '7px', borderRadius: 10, border: 'none', background: soon ? 'var(--bg-inner)' : 'var(--a1)', color: soon ? 'var(--t3)' : '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: soon ? 'var(--shadow-neu-in)' : '0 4px 12px rgba(99,102,241,0.35)' }}>
              {soon ? 'Coming soon' : 'Connect'}
            </button>
          </div>
        ))}
        <div style={{ background: 'var(--bg-inner)', border: '2px dashed rgba(99,102,241,0.3)', borderRadius: 18, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12, boxShadow: 'var(--shadow-neu-in)' }}>
          <div className="row ac gap10">
            <div style={{ width: 36, height: 36, background: 'var(--bg-card)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--t3)', fontSize: 20, boxShadow: 'var(--shadow-neu-out)' }}>+</div>
            <div><div style={{ fontSize: 12, fontWeight: 600, color: 'var(--t2)' }}>Request connector</div><div style={{ fontSize: 11, color: 'var(--t3)' }}>Need another?</div></div>
          </div>
          <button style={{ width: '100%', padding: '7px', borderRadius: 10, border: '2px solid var(--a1)', background: 'transparent', color: 'var(--a1)', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Request →</button>
        </div>
      </div>

      <NeoCard innerStyle={{ padding: 16 }}>
        <div className="z-sect mb12">Default posting schedule</div>
        <div className="g2">
          <div>
            <label className="z-flbl">Preferred time</label>
            <select className="z-sel"><option>6:00 PM – 8:00 PM (Recommended)</option></select>
          </div>
          <div>
            <label className="z-flbl">Active days</label>
            <div style={{ display: 'flex', gap: 6, marginTop: 5 }}>
              {days.map((d, i) => (
                <div key={i} onClick={() => setActive(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])} style={{
                  width: 32, height: 32, borderRadius: 9,
                  background: active.includes(i) ? 'var(--a1)' : 'var(--bg-card)',
                  color: active.includes(i) ? '#fff' : 'var(--t3)',
                  boxShadow: active.includes(i) ? '0 4px 12px rgba(99,102,241,0.35)' : 'var(--shadow-neu-out)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: active.includes(i) ? 700 : 400, cursor: 'pointer', transition: 'all 0.2s',
                }}>{d}</div>
              ))}
            </div>
          </div>
        </div>
      </NeoCard>
    </>
  );
}

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
      <div className="row ac jb mb16">
        <div><div className="z-pg-ctx">Step 2 of 6</div><div className="z-pg-title">Brand AI <b>settings</b></div></div>
        <button style={{ padding: '9px 18px', borderRadius: 12, border: 'none', background: 'var(--a1)', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(99,102,241,0.35)', fontFamily: 'inherit' }}>Save changes</button>
      </div>

      <div className="g2 mb16">
        <NeoCard innerStyle={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--a1)', display: 'inline-block' }} /> Basic information
          </div>
          <div className="g2 mb12">
            <div><label className="z-flbl">Business type</label><input className="z-inp" defaultValue="Aviation / Travel" /></div>
            <div><label className="z-flbl">Industry</label><input className="z-inp" defaultValue="Transportation, Tourism" /></div>
          </div>
          <div className="mb12">
            <label className="z-flbl">Brand voice</label>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {voices.map(v => <div key={v} onClick={() => toggle(voice, setVoice, v)} className={`z-chip ${voice.includes(v) ? 'active' : ''}`}>{v}</div>)}
            </div>
          </div>
          <div>
            <label className="z-flbl">Tone</label>
            <div style={{ display: 'flex', gap: 6 }}>
              {tones.map(t => <div key={t} onClick={() => toggle(tone, setTone, t)} className={`z-chip ${tone.includes(t) ? 'active' : ''}`}>{t}</div>)}
            </div>
          </div>
        </NeoCard>

        <NeoCard innerStyle={{ padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f97316', display: 'inline-block' }} /> Target audience
          </div>
          <div className="g2 mb12">
            <div><label className="z-flbl">Age range</label><input className="z-inp" defaultValue="18 – 65" /></div>
            <div><label className="z-flbl">Location</label><input className="z-inp" defaultValue="Bangladesh, South Korea" /></div>
          </div>
          <div className="mb12"><label className="z-flbl">Interests</label><input className="z-inp" defaultValue="Travel, Aviation, Luxury, Tourism" /></div>
          <div>
            <label className="z-flbl">Languages</label>
            <div style={{ display: 'flex', gap: 6 }}>
              {langs.map(l => <div key={l} onClick={() => toggle(lang, setLang, l)} className={`z-chip ${lang.includes(l) ? 'active' : ''}`}>{l}</div>)}
              <div className="z-chip" style={{ border: '2px dashed rgba(99,102,241,0.3)' }}>+ Add</div>
            </div>
          </div>
        </NeoCard>
      </div>

      <NeoCard innerStyle={{ padding: 16 }} style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} /> Marketing insights
        </div>
        <div className="g3">
          {[
            { lbl: 'Unique selling points', val: 'Premium service, Competitive pricing, Frequent flyer rewards, 15 destinations' },
            { lbl: 'Products / Services',   val: 'Domestic flights, International routes, Charter, Corporate travel' },
            { lbl: 'Competitors',           val: 'Air Arabia, IndiGo, Novoair' },
          ].map(({ lbl, val }) => (
            <div key={lbl}><label className="z-flbl">{lbl}</label><textarea className="z-ta" rows={3} defaultValue={val} /></div>
          ))}
        </div>
      </NeoCard>

      <div style={{ background: 'var(--a1-soft)', border: '2px solid rgba(99,102,241,0.2)', borderRadius: 16, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--a1)' }}>Brand profile 87% complete</div>
          <div style={{ fontSize: 11, color: 'var(--a1)', opacity: 0.8, marginTop: 2 }}>Add competitor info to unlock campaign benchmarking</div>
        </div>
        <div style={{ width: 100 }}><ProgressBar pct={87} variant="purple" height={8} /></div>
      </div>
    </>
  );
}
