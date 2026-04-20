import React, { useState, useRef, useEffect } from 'react';
import { PageShell, NeoCard } from '../components/ui';

// ─── Design tokens (matched to SellixCopilot_1) ──────────────────────────────
const C = {
  a1: '#6366F1', a2: '#818CF8', a3: '#38BDF8',
  t1: '#141921', t2: '#5C6678', t3: '#9BA5B7', border: '#E8ECF3',
  green: '#22C55E', coral: '#F97316', purple: '#7C3AED',
  teal: '#06B6D4', red: '#EF4444', amber: '#F59E0B',
};

const ICON = {
  bolt:  'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  send:  'M22 2L11 13 M22 2L15 22l-4-9-9-4 22-7z',
  warn:  'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01',
  check: 'M20 6L9 17l-5-5',
  trend: 'M23 6l-9.5 9.5-5-5L1 18',
  eye:   'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z',
};

// ─── Shared sub-components ───────────────────────────────────────────
function Ic({ d, s = 16, c = 'currentColor', w = 1.8 }) {
  return (
    <svg width={s} height={s} fill="none" stroke={c} strokeWidth={w} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path d={d} />
    </svg>
  );
}

function AiAvatar({ size = 32 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.3, flexShrink: 0,
      background: 'linear-gradient(135deg, #6366f1, #a855f7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
    }}>
      <Ic d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" s={size * 0.5} c="white" w={2.5} />
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

// ─── Marketing Chat (Enhanced with logic from SellixCopilot_1) ──────
function MarketingChat({ alerts, setAlerts }) {
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState([{ id: 'init', role: 'sellix', type: 'briefing' }]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  const push = (msg) => {
    setMessages(prev => [...prev, { ...msg, id: Date.now() }]);
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const handleSend = () => {
    if (!inputVal.trim()) return;
    const text = inputVal.trim();
    setInputVal('');
    push({ role: 'user', content: text });
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      if (text.toLowerCase().includes('priorit')) {
        push({ role: 'sellix', type: 'priority' });
      } else {
        push({ role: 'sellix', type: 'text', content: "Based on KB Aviation's data, the travel enthusiast segment is converting at 2.3× right now. Want me to create a targeted campaign around that?" });
      }
    }, 1200);
  };

  return (
    <NeoCard style={{ flex: 1 }} innerStyle={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
      <style>{`@keyframes sdot { 0%,100%{opacity:1} 50%{opacity:.35} }`}</style>
      
      {/* AI Header */}
      <div style={{
        padding: '12px 20px', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0,
        background: 'var(--bg-card)', borderRadius: '30px 30px 0 0',
      }}>
        <AiAvatar size={44} />
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--t1)' }}>Sellix Marketing AI</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 1 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} />
            <span style={{ fontSize: 10, color: 'var(--t3)' }}>Monitoring KB Aviation · Updated 2 min ago</span>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 100, background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>
          AI Online
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14, background: 'var(--bg-inner)' }}>
        {messages.map(msg => (
          <div key={msg.id}>
            {msg.role === 'sellix' && (
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <AiAvatar size={32} />
                <div style={{ background: 'var(--bg-card)', borderRadius: '4px 16px 16px 16px', padding: '12px 16px', maxWidth: '84%', fontSize: 13, lineHeight: 1.65, color: 'var(--t1)', boxShadow: 'var(--shadow-neu-out)' }}>
                  {msg.type === 'briefing' && <BriefingContent />}
                  {msg.type === 'priority' && <PriorityContent />}
                  {msg.type === 'text'     && <div>{msg.content}</div>}
                </div>
              </div>
            )}
            {msg.role === 'user' && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff', padding: '11px 16px', borderRadius: '16px 4px 16px 16px', maxWidth: '70%', fontSize: 13, lineHeight: 1.55, boxShadow: '0 4px 16px rgba(99,102,241,0.4)' }}>
                  {msg.content}
                </div>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <AiAvatar size={32} />
            <div style={{ display: 'flex', gap: 4, padding: '10px 14px', background: 'var(--bg-card)', borderRadius: 12 }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--a1)', animation: `sdot 1.2s ease-in-out ${i * .15}s infinite` }} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', background: 'var(--bg-card)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg-inner)', borderRadius: 16, padding: '10px 16px', boxShadow: 'var(--shadow-neu-in)' }}>
          <input
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, background: 'transparent', color: 'var(--t1)', fontFamily: 'inherit' }}
            placeholder="Ask Sellix about your marketing strategy…"
          />
          <div onClick={handleSend} style={{ width: 34, height: 34, borderRadius: 10, cursor: 'pointer', flexShrink: 0, background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ic d={ICON.send} s={14} c="white" w={2.5} />
          </div>
        </div>
      </div>
    </NeoCard>
  );
}

function BriefingContent() {
  return (
    <div>
      <div style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.65, marginBottom: 10 }}>
        Good morning, <strong style={{ color: 'var(--t1)' }}>Tanvir</strong> 👋 Here's your KB Aviation briefing for today.
      </div>
      <div style={{ background: 'var(--bg-inner)', borderRadius: 11, padding: 11, marginBottom: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[['$4,240','Revenue','▲12.4%','#22C55E'],['8','Campaigns','3 need attention','#F59E0B'],['12 new','Inbox','4 high intent','#F97316']].map(([v,l,d,clr]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--t1)' }}>{v}</div>
              <div style={{ fontSize: 9, color: 'var(--t3)', marginBottom: 2 }}>{l}</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: clr }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', gap: 6 }}>
        <button className="z-chip active" style={{ border: 'none', cursor: 'pointer' }}>Show me everything</button>
        <button className="z-chip" style={{ border: 'none', cursor: 'pointer' }}>Critical only</button>
      </div>
    </div>
  );
}

function PriorityContent() {
  const items = [
    { n: 1, c: '#EF4444', label: 'Fix rejected ad',       est: '30 sec', impact: 'Unblocks $28/day spend'  },
    { n: 2, c: '#22C55E', label: 'Scale the video winner', est: '1 tap',  impact: 'Est. +40% conversions'  },
    { n: 3, c: '#F59E0B', label: 'Extend campaign budget', est: '1 tap',  impact: 'Keeps momentum running' },
  ];
  return (
    <div>
      <div style={{ fontSize: 13, color: 'var(--t2)', lineHeight: 1.6, marginBottom: 10 }}>My top 3 actions for you today:</div>
      {items.map(({ n, c, label, est, impact }) => (
        <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 11px', background: `${c}0d`, borderRadius: 10, marginBottom: 6, border: `1px solid ${c}20` }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{n}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--t1)' }}>{label}</div>
            <div style={{ fontSize: 10, color: 'var(--t3)' }}>{est} · {impact}</div>
          </div>
          <button style={{ padding: '4px 10px', background: c, border: 'none', borderRadius: 6, fontSize: 10, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Do it</button>
        </div>
      ))}
    </div>
  );
}

// ─── Copilot Panel (Advanced version) ───────────────────────────────
function CopilotPanel({ alerts, setAlerts }) {
  const unread = alerts.filter(a => !a.dismissed).length;
  const [activeTab, setActiveTab] = useState('alerts');

  return (
    <NeoCard style={{ width: 300, flexShrink: 0 }} innerStyle={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        padding: '14px 16px', background: 'linear-gradient(135deg, #3730A3, #6366f1)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Ic d={ICON.bolt} s={16} c="white" w={2} />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Sellix Copilot</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)' }}>Real-time intelligence</div>
        </div>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--bg-card)' }}>
        {[['alerts', `Alerts (${unread})`], ['insights', 'Insights']].map(([id, label]) => (
          <div key={id} onClick={() => setActiveTab(id)} style={{
            flex: 1, textAlign: 'center', padding: '10px 0', fontSize: 11, cursor: 'pointer',
            fontWeight: activeTab === id ? 700 : 400, color: activeTab === id ? 'var(--a1)' : 'var(--t3)',
            borderBottom: activeTab === id ? '2px solid var(--a1)' : '2px solid transparent'
          }}>{label}</div>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
        {activeTab === 'alerts' ? (
          <AlertsList alerts={alerts} setAlerts={setAlerts} />
        ) : (
          <InsightsList />
        )}
      </div>
    </NeoCard>
  );
}

function AlertsList({ alerts, setAlerts }) {
  const dismiss = (id) => setAlerts(prev => prev.map(a => a.id === id ? { ...a, dismissed: true } : a));
  const activeAlerts = alerts.filter(a => !a.dismissed);

  if (activeAlerts.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--t3)' }}>
        <Ic d={ICON.check} s={24} c="#22C55E" w={2} />
        <div style={{ marginTop: 8, fontSize: 12, fontWeight: 600 }}>All clear!</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {activeAlerts.map(alert => (
        <div key={alert.id} style={{ background: alert.bg, border: `1px solid ${alert.color}22`, borderRadius: 13, padding: 12 }}>
          <div style={{ display: 'flex', gap: 9 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: `${alert.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ic d={alert.iconPath} s={13} c={alert.color} w={2} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--t1)' }}>{alert.title}</span>
                <span style={{ fontSize: 10, color: 'var(--t3)' }}>{alert.ts}</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--t2)', lineHeight: 1.5, marginBottom: 8 }}>{alert.body}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button style={{ padding: '4px 10px', background: 'var(--a1)', border: 'none', borderRadius: 6, fontSize: 10, fontWeight: 600, color: '#fff' }}>{alert.actions[0]}</button>
                <button onClick={() => dismiss(alert.id)} style={{ padding: '4px 10px', background: 'transparent', border: 'none', fontSize: 10, color: 'var(--t3)' }}>Dismiss</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function InsightsList() {
  const insights = [
    { d: ICON.trend, c: '#22C55E', title: 'Video beats image 2.4×',   body: 'Route Reel CTR 8.9% vs 3.7% for banner. Scale video.', tag: 'Act now'     },
    { d: ICON.eye,   c: '#7C3AED', title: 'Tue 6–8 PM is your peak',  body: '3.2× more active. Schedule your next post now.',       tag: 'Opportunity' },
    { d: ICON.warn,  c: '#F59E0B', title: 'Budget 80% burned',         body: 'Seoul–Dubai ends tomorrow. Extend for $30?',           tag: 'Urgent'      },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {insights.map(i => (
        <div key={i.title} style={{ background: `${i.c}08`, border: `1px solid ${i.c}15`, borderRadius: 12, padding: 12 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
             <Ic d={i.d} s={14} c={i.c} w={2} />
             <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--t1)' }}>{i.title}</div>
          </div>
          <div style={{ fontSize: 11, color: 'var(--t2)', marginBottom: 8 }}>{i.body}</div>
          <span style={{ fontSize: 9, fontWeight: 700, color: i.c, background: `${i.c}15`, padding: '2px 8px', borderRadius: 100 }}>{i.tag}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main SellixMkt Page ─────────────────────────────────────────────
const INIT_ALERTS = [
  { id: 1, priority: 'high',   iconPath: ICON.warn,  color: '#EF4444', bg: '#FEF2F2', title: 'Campaign paused by Meta',          body: '"Summer Sale Promo" rejected — image text >20% coverage. Fix now?', actions: ['Auto-fix', 'View'], ts: '2m ago', dismissed: false },
  { id: 2, priority: 'high',   iconPath: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z', color: '#22C55E', bg: '#ECFDF5', title: 'Variant winner found',    body: '"Route Launch Reel" outperforming image by 2.4× CTR. Scale budget?',        actions: ['Scale', 'Keep'],       ts: '18m ago', dismissed: false },
  { id: 3, priority: 'medium', iconPath: 'M18 20V10 M12 20V4 M6 20v-6', color: '#F59E0B', bg: '#FFFBEB', title: 'Budget 80% depleted',               body: '"Seoul–Dubai" spent $56 of $70. Ends tomorrow. Extend?', actions: ['Extend', 'Let it finish'],    ts: '1h ago',  dismissed: false },
];

export default function SellixMktPage({ alerts: alertsProp, onDismissAlert, alertCount, onAlertClick }) {
  const [internalAlerts, setInternalAlerts] = useState(INIT_ALERTS);
  const alerts = alertsProp !== undefined ? alertsProp : internalAlerts;

  const setAlerts = (val) => {
    if (onDismissAlert && typeof val === 'function') {
      const currentAlerts = alerts;
      const nextAlerts = val(currentAlerts);
      const dismissed = nextAlerts.find((a, i) => a.dismissed && !currentAlerts[i].dismissed);
      if (dismissed) {
        onDismissAlert(dismissed.id);
        return;
      }
    }
    setInternalAlerts(val);
  };

  return (
    <PageShell active="sellix" alertCount={alertCount} onAlertClick={onAlertClick}>
      <div style={{ display: 'flex', height: '100%', gap: 20, overflow: 'hidden' }}>
        <MarketingChat alerts={alerts} setAlerts={setAlerts} />
        <CopilotPanel alerts={alerts} setAlerts={setAlerts} />
      </div>
    </PageShell>
  );
}
