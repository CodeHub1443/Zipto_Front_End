import React, { useState } from 'react';
import { PageShell, NeoCard } from '../components/ui';

function AiAvatar() {
  return (
    <div style={{
      width: 32, height: 32, borderRadius: 10, flexShrink: 0,
      background: 'linear-gradient(135deg, #6366f1, #a855f7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
    }}>
      <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    </div>
  );
}

function QuoteBox({ children }) {
  return (
    <div style={{
      background: 'var(--a1-soft)', borderLeft: '3px solid var(--a1)',
      borderRadius: '0 10px 10px 0', padding: '8px 12px',
      fontSize: 12, color: 'var(--a1)', margin: '5px 0', lineHeight: 1.55,
    }}>
      {children}
    </div>
  );
}

export default function SellixPage({ alertCount, onAlertClick }) {
  const [activeTab, setActiveTab] = useState('marketing');
  const [inputVal, setInputVal]   = useState('');

  return (
    <PageShell active="sellix" alertCount={alertCount} onAlertClick={onAlertClick}>
      <div style={{ display: 'flex', height: '100%', gap: 20, overflow: 'hidden' }}>

        {/* ── Main Chat ── */}
        <NeoCard style={{ flex: 1 }} innerStyle={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', padding: '0 20px', flexShrink: 0 }}>
            {['marketing', 'sales'].map(t => (
              <div key={t} onClick={() => setActiveTab(t)} style={{
                padding: '14px 18px', fontSize: 13, cursor: 'pointer', fontWeight: activeTab === t ? 700 : 400,
                color: activeTab === t ? 'var(--a1)' : 'var(--t3)',
                borderBottom: activeTab === t ? '2px solid var(--a1)' : '2px solid transparent',
                transition: 'all 0.2s',
              }}>
                {t === 'marketing' ? 'Marketing Assistant' : 'Sales Assistant'}
              </div>
            ))}
          </div>

          {/* AI Header */}
          <div style={{
            padding: '12px 20px', borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 14, flexShrink: 0,
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 18px rgba(99,102,241,0.35)',
            }}>
              <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--t1)' }}>Sellix</div>
              <div style={{ fontSize: 11, color: 'var(--t3)' }}>Brand-aware · Context-rich</div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 100, background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>
              <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#22c55e', marginRight: 5 }} />
              AI Online
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14, background: 'var(--bg-inner)' }}>
            {/* AI Intro */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <AiAvatar />
              <div style={{
                background: 'var(--bg-card)', borderRadius: '4px 16px 16px 16px',
                padding: '12px 16px', maxWidth: '76%', fontSize: 13, lineHeight: 1.65, color: 'var(--t1)',
                boxShadow: 'var(--shadow-neu-out)',
              }}>
                <strong>Hi Tanvir! 👋</strong> I'm Sellix, your AI co-pilot. I know KB Aviation's brand and audience.<br /><br />
                What would you like to create today?
              </div>
            </div>

            {/* Suggestion Chips */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingLeft: 42 }}>
              {['📝 Content ideas', '📅 Schedule', '🎯 Targeting', '✍️ Ad copy'].map(c => (
                <div key={c} className="z-chip active">{c}</div>
              ))}
            </div>

            {/* User Message */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{
                background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff',
                padding: '11px 16px', borderRadius: '16px 4px 16px 16px',
                maxWidth: '70%', fontSize: 13, lineHeight: 1.55,
                boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
              }}>
                Write 3 Facebook posts for our summer sale. Engaging for travel audience.
              </div>
            </div>

            {/* AI Response */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <AiAvatar />
              <div style={{
                background: 'var(--bg-card)', borderRadius: '4px 16px 16px 16px',
                padding: '12px 16px', maxWidth: '84%', fontSize: 13, lineHeight: 1.65, color: 'var(--t1)',
                boxShadow: 'var(--shadow-neu-out)',
              }}>
                Here are 3 high-converting ideas:<br /><br />
                <strong>1 · Urgency + benefit</strong>
                <QuoteBox>"✈️ Summer is calling — save up to 30% before July 31. Limited seats. Unlimited memories. 🌴 #KBAviation"</QuoteBox>
                <strong>2 · Storytelling</strong>
                <QuoteBox>"Last summer, Sarah discovered Seoul. Where will your story begin? ✨ Sale ends Aug 31."</QuoteBox>
                <strong>3 · Social proof</strong>
                <QuoteBox>"4,800+ travelers chose KB Aviation this season. Now it's your turn. 🎫"</QuoteBox>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  {['Use in Campaign', 'Regenerate', 'Copy all'].map((label, i) => (
                    <button key={label} style={{
                      padding: '5px 12px', borderRadius: 8, border: 'none', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                      background: i === 0 ? 'var(--a1)' : 'var(--bg-inner)',
                      color: i === 0 ? '#fff' : 'var(--t2)',
                      boxShadow: i === 0 ? '0 4px 12px rgba(99,102,241,0.35)' : 'var(--shadow-neu-out)',
                    }}>{label}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', background: 'var(--bg-card)', flexShrink: 0 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'var(--bg-inner)', borderRadius: 16, padding: '10px 16px',
              boxShadow: 'var(--shadow-neu-in)',
            }}>
              <input
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, background: 'transparent', color: 'var(--t1)', fontFamily: 'inherit' }}
                placeholder="Ask Sellix anything about your marketing..."
              />
              <div style={{
                width: 34, height: 34, borderRadius: 10, cursor: 'pointer', flexShrink: 0,
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
              }}>
                <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </div>
            </div>
            <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--t3)', marginTop: 6 }}>
              Sellix uses your brand settings for context-aware output.
            </div>
          </div>
        </NeoCard>

        {/* ── Brand Context Panel ── */}
        <NeoCard style={{ width: 260, flexShrink: 0 }} innerStyle={{ padding: 16, overflowY: 'auto' }}>
          <div className="z-sect mb12">Brand context</div>

          {/* KB Aviation info */}
          <div style={{ background: 'var(--bg-card)', borderRadius: 14, padding: 12, marginBottom: 14, boxShadow: 'var(--shadow-neu-out)' }}>
            <div className="z-subl mb8">KB AVIATION</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['Travel service', 'Friendly voice', 'Seoul, Korea'].map(t => (
                <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 100, background: 'var(--a1-soft)', color: 'var(--a1)' }}>{t}</span>
              ))}
            </div>
          </div>

          <div className="z-subl mb8">TOP POSTS</div>
          <div className="col gap8 mb14">
            {[
              { text: '✈️ Seoul–Dubai route launch', likes: '1.2K', comments: '89', shares: '247' },
              { text: '🌴 Summer deal announcement', likes: '876', comments: '54', shares: '189' },
            ].map(({ text, likes, comments, shares }) => (
              <div key={text} style={{ background: 'var(--bg-card)', borderRadius: 12, padding: '10px 12px', boxShadow: 'var(--shadow-neu-out)' }}>
                <div style={{ fontSize: 12, color: 'var(--t1)', marginBottom: 6 }}>{text}</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <span style={{ fontSize: 11, color: 'var(--t3)' }}>👍 {likes}</span>
                  <span style={{ fontSize: 11, color: 'var(--t3)' }}>💬 {comments}</span>
                  <span style={{ fontSize: 11, color: 'var(--t3)' }}>↗ {shares}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="z-subl mb8">HISTORY</div>
          <div className="col gap6">
            {['Summer sale post ideas', 'Dubai route caption', 'Audience targeting tips'].map(h => (
              <div key={h} style={{
                fontSize: 12, color: 'var(--t2)', padding: '8px 10px', borderRadius: 10,
                background: 'var(--bg-card)', boxShadow: 'var(--shadow-neu-out)', cursor: 'pointer',
              }}>{h}</div>
            ))}
          </div>
        </NeoCard>

      </div>
    </PageShell>
  );
}
