import { useState, useRef } from "react";

// ─── Design tokens (inlined) ──────────────────────────────────────────────────
const C = {
  white:'#FFFFFF', inner:'#F3F6FB', content:'#EEF1F6',
  a1:'#6366F1', a2:'#818CF8', a3:'#38BDF8',
  t1:'#141921', t2:'#5C6678', t3:'#9BA5B7', border:'#E8ECF3',
  green:'#22C55E', coral:'#F97316', purple:'#7C3AED',
  teal:'#06B6D4', red:'#EF4444', amber:'#F59E0B',
};

// ─── Initial alert data ───────────────────────────────────────────────────────
const INIT_ALERTS = [
  { id:1, priority:'high',   iconPath:'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01',  color:'#EF4444', bg:'#FEF2F2', title:'Campaign paused by Meta',          body:'"Summer Sale Promo" rejected — image text >20% coverage. Sellix can fix automatically.', actions:['Auto-fix now','View details'],    ts:'2m ago',  dismissed:false },
  { id:2, priority:'high',   iconPath:'M13 2L3 14h9l-1 8 10-12h-9l1-8z',                                                                             color:'#22C55E', bg:'#ECFDF5', title:'Variant winner found — 48h data',    body:'"Route Launch Reel" outperforming image by 2.4× CTR. Scale budget to winner?',        actions:['Scale winner','Keep all'],       ts:'18m ago', dismissed:false },
  { id:3, priority:'medium', iconPath:'M18 20V10 M12 20V4 M6 20v-6',                                                                                  color:'#F59E0B', bg:'#FFFBEB', title:'Budget 80% depleted',               body:'"Seoul–Dubai Campaign" spent $56 of $70. Ends tomorrow at 3pm. Extend 3 days for $30?', actions:['Extend $30','Let it finish'],    ts:'1h ago',  dismissed:false },
  { id:4, priority:'medium', iconPath:'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z',                                     color:'#06B6D4', bg:'#ECFEFF', title:'12 inbox messages unanswered',      body:'Avg response time 4.2h. Draft replies for the 3 high-intent leads now?',               actions:['Draft replies',"I'll handle it"], ts:'2h ago',  dismissed:false },
  { id:5, priority:'low',    iconPath:'M23 6l-9.5 9.5-5-5L1 18',                                                                                      color:'#7C3AED', bg:'#F5F3FF', title:'Best post window in 45 min',       body:'Tuesday 6–8 PM is your peak. "Loyalty Program" draft ready. Schedule it?',             actions:['Schedule it','Edit first'],      ts:'45m away',dismissed:false },
];

// ─── Quick prompt suggestions ─────────────────────────────────────────────────
const QUICK_PROMPTS = [
  'What should I prioritize today?',
  'Best time to post?',
  'How are my campaigns doing?',
  'Write me a post',
];

// ─── SVG icon helper ──────────────────────────────────────────────────────────
function Ic({ d, s = 16, c = 'currentColor', w = 1.8 }) {
  return (
    <svg width={s} height={s} fill="none" stroke={c} strokeWidth={w} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path d={d} />
    </svg>
  );
}

const ICON = {
  bolt:  'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  send:  'M22 2L11 13 M22 2L15 22l-4-9-9-4 22-7z',
  warn:  'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01',
  check: 'M20 6L9 17l-5-5',
  trend: 'M23 6l-9.5 9.5-5-5L1 18',
  eye:   'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z',
};

// ─── Sellix gradient avatar ───────────────────────────────────────────────────
function SellixAvatar({ size = 30 }) {
  return (
    <div style={{ width: size, height: size, background: `linear-gradient(135deg,${C.a2},${C.a1})`, borderRadius: Math.round(size * .3), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 3px 8px rgba(99,102,241,.25)' }}>
      <Ic d={ICON.bolt} s={Math.round(size * .48)} c="white" w={2} />
    </div>
  );
}

// ─── Animated typing dots ─────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '2px 0' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: C.a1, animation: `sdot 1.2s ease-in-out ${i * .15}s infinite` }} />
      ))}
    </div>
  );
}

// ─── Proactive alert card ─────────────────────────────────────────────────────
function AlertCard({ alert, onAction, onDismiss }) {
  return (
    <div style={{ background: alert.bg, border: `1px solid ${alert.color}22`, borderRadius: 13, padding: '11px 13px', marginBottom: 8 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: `${alert.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Ic d={alert.iconPath} s={13} c={alert.color} w={2} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: C.t1 }}>{alert.title}</span>
            <span style={{ fontSize: 10, color: C.t3, flexShrink: 0, marginLeft: 6 }}>{alert.ts}</span>
          </div>
          <div style={{ fontSize: 12, color: C.t2, lineHeight: 1.55, marginBottom: 9 }}>{alert.body}</div>
          <div style={{ display: 'flex', gap: 7 }}>
            <div onClick={() => onAction(alert.id)} style={{ padding: '5px 13px', background: `linear-gradient(135deg,${C.a2},${C.a1})`, borderRadius: 7, fontSize: 11, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>{alert.actions[0]}</div>
            <div onClick={() => onAction(alert.id)} style={{ padding: '5px 13px', background: C.inner, borderRadius: 7, fontSize: 11, fontWeight: 500, color: C.t2, cursor: 'pointer' }}>{alert.actions[1]}</div>
            <div onClick={() => onDismiss(alert.id)} style={{ marginLeft: 'auto', padding: '5px 9px', fontSize: 11, color: C.t3, cursor: 'pointer' }}>Dismiss</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Chat message content renderers ──────────────────────────────────────────
function BriefingMessage() {
  return (
    <div>
      <div style={{ fontSize: 12, color: C.t2, lineHeight: 1.65, marginBottom: 10 }}>
        Good morning, <strong style={{ color: C.t1 }}>Tanvir</strong> 👋 Here's your KB Aviation briefing for today.
      </div>
      <div style={{ background: C.inner, borderRadius: 11, padding: 11, marginBottom: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[['$4,240','Revenue','▲12.4%','#22C55E'],['8','Campaigns','3 need attention','#F59E0B'],['12 new','Inbox','4 high intent','#F97316']].map(([v,l,d,clr]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.t1 }}>{v}</div>
              <div style={{ fontSize: 9, color: C.t3, marginBottom: 2 }}>{l}</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: clr }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ fontSize: 12, color: C.t2, lineHeight: 1.6, marginBottom: 8 }}>
        I've spotted <strong style={{ color: '#EF4444' }}>1 critical issue</strong>, <strong style={{ color: '#F59E0B' }}>2 opportunities</strong>, and <strong style={{ color: '#22C55E' }}>1 win</strong> since yesterday.
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{ padding: '5px 12px', background: `linear-gradient(135deg,${C.a2},${C.a1})`, borderRadius: 7, fontSize: 11, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Show me everything</div>
        <div style={{ padding: '5px 12px', background: C.inner, borderRadius: 7, fontSize: 11, fontWeight: 500, color: C.t2, cursor: 'pointer' }}>Critical only</div>
      </div>
    </div>
  );
}

function PriorityMessage() {
  const items = [
    { n: 1, c: '#EF4444', label: 'Fix rejected ad',       est: '30 sec', impact: 'Unblocks $28/day spend'  },
    { n: 2, c: '#22C55E', label: 'Scale the video winner', est: '1 tap',  impact: 'Est. +40% conversions'  },
    { n: 3, c: '#F59E0B', label: 'Extend campaign budget', est: '1 tap',  impact: 'Keeps momentum running' },
  ];
  return (
    <div>
      <div style={{ fontSize: 12, color: C.t2, lineHeight: 1.6, marginBottom: 10 }}>Here are my top 3 actions for you today, ranked by impact:</div>
      {items.map(({ n, c, label, est, impact }) => (
        <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 11px', background: `${c}0d`, borderRadius: 10, marginBottom: 6, border: `1px solid ${c}20` }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{n}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.t1 }}>{label}</div>
            <div style={{ fontSize: 10, color: C.t3 }}>{est} · {impact}</div>
          </div>
          <div style={{ padding: '4px 11px', background: c, borderRadius: 6, fontSize: 10, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Do it</div>
        </div>
      ))}
    </div>
  );
}

// ─── Insights side panel ──────────────────────────────────────────────────────
function InsightsPanel() {
  const insights = [
    { d: ICON.trend, c: '#22C55E', title: 'Video beats image 2.4×',   body: 'Route Reel CTR 8.9% vs 3.7% for banner. Scale video.', tag: 'Act now'     },
    { d: ICON.eye,   c: '#7C3AED', title: 'Tue 6–8 PM is your peak',  body: '3.2× more active. Schedule your next post now.',       tag: 'Opportunity' },
    { d: ICON.warn,  c: '#F59E0B', title: 'Budget 80% burned',         body: 'Seoul–Dubai ends tomorrow. Extend for $30?',           tag: 'Urgent'      },
  ];

  return (
    <>
      <div style={{ fontSize: 9, fontWeight: 700, color: C.t3, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 9 }}>PERFORMANCE INSIGHTS</div>
      {insights.map(({ d, c, title, body, tag }) => (
        <div key={title} style={{ background: `${c}0a`, border: `1px solid ${c}20`, borderRadius: 11, padding: '10px 12px', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
            <div style={{ width: 24, height: 24, borderRadius: 7, background: `${c}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Ic d={d} s={11} c={c} w={2} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.t1, marginBottom: 1 }}>{title}</div>
              <div style={{ fontSize: 10, color: C.t3 }}>{body}</div>
            </div>
          </div>
          <span style={{ fontSize: 9, background: `${c}20`, color: c, padding: '2px 7px', borderRadius: 100, fontWeight: 700 }}>{tag}</span>
        </div>
      ))}

      <div style={{ marginTop: 14, fontSize: 9, fontWeight: 700, color: C.t3, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 9 }}>THIS WEEK</div>
      {[['Reach', '224K', '▲ 15%'], ['CTR avg', '6.2%', '▲ 1.1%'], ['CPC', '$0.42', '▼ 12%'], ['Messages', '47', '▲ 8']].map(([l, v, d]) => (
        <div key={l} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 12, color: C.t2 }}>{l}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: C.t1 }}>{v}</span>
            <span style={{ fontSize: 10, color: '#22C55E', fontWeight: 600 }}>{d}</span>
          </div>
        </div>
      ))}
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function SellixCopilot() {
  const [activeTab,  setActiveTab]  = useState('copilot');
  const [alerts,     setAlerts]     = useState(INIT_ALERTS);
  const [messages,   setMessages]   = useState([{ id: 'init', role: 'sellix', type: 'briefing' }]);
  const [input,      setInput]      = useState('');
  const [counter,    setCounter]    = useState(10);
  const [isTyping,   setIsTyping]   = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  const unread       = alerts.filter(a => !a.dismissed).length;
  const highPriority = alerts.filter(a => a.priority === 'high' && !a.dismissed);

  const dismiss   = (id) => setAlerts(p => p.map(a => a.id === id ? { ...a, dismissed: true } : a));
  const doAction  = (id) => setAlerts(p => p.map(a => a.id === id ? { ...a, dismissed: true } : a));

  const push = (msg) => {
    const id = counter;
    setCounter(p => p + 1);
    setMessages(p => [...p, { ...msg, id }]);
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const send = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setInput('');
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
    <div style={{ display: 'flex', height: '100vh', background: C.white, overflow: 'hidden', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif' }}>

      <style>{`@keyframes sdot { 0%,100%{opacity:1} 50%{opacity:.35} }`}</style>

      {/* ── Chat column ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Tab bar */}
        <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, padding: '0 18px', flexShrink: 0 }}>
          {[['copilot', 'Co-pilot'], ['marketing', 'Marketing'], ['sales', 'Sales']].map(([id, label]) => (
            <div key={id} onClick={() => setActiveTab(id)} style={{ padding: '11px 14px', fontSize: 12, cursor: 'pointer', fontWeight: activeTab === id ? 600 : 400, color: activeTab === id ? C.a1 : C.t3, borderBottom: activeTab === id ? `2px solid ${C.a1}` : '2px solid transparent', position: 'relative' }}>
              {label}
              {id === 'copilot' && unread > 0 && (
                <span style={{ position: 'absolute', top: 8, right: 4, width: 16, height: 16, borderRadius: '50%', background: '#EF4444', fontSize: 9, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {unread}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Sellix header bar */}
        <div style={{ padding: '11px 18px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, background: '#FAFBFE' }}>
          <SellixAvatar size={36} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Sellix Co-pilot</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 1 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E' }} />
              <span style={{ fontSize: 10, color: C.t3 }}>Monitoring KB Aviation · Updated 2 min ago</span>
            </div>
          </div>
          {highPriority.length > 0 && (
            <div onClick={() => setActiveTab('alerts')} style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 100, padding: '4px 11px', cursor: 'pointer' }}>
              <Ic d={ICON.warn} s={11} c="#EF4444" w={2} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#EF4444' }}>
                {highPriority.length} alert{highPriority.length !== 1 ? 's' : ''} need attention
              </span>
            </div>
          )}
        </div>

        {/* Messages list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column', background: '#FAFBFE' }}>
          {messages.map(msg => (
            <div key={msg.id}>
              {msg.role === 'sellix' && (
                <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start', marginBottom: 14 }}>
                  <SellixAvatar size={28} />
                  <div style={{ background: C.white, borderRadius: '4px 14px 14px 14px', padding: '11px 13px', maxWidth: '84%', boxShadow: '0 1px 6px rgba(14,25,55,.06)' }}>
                    {msg.type === 'briefing' && <BriefingMessage />}
                    {msg.type === 'priority' && <PriorityMessage />}
                    {msg.type === 'text'     && <div style={{ fontSize: 12, color: C.t2, lineHeight: 1.65 }}>{msg.content}</div>}
                  </div>
                </div>
              )}
              {msg.role === 'user' && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
                  <div style={{ background: `linear-gradient(135deg,${C.a2},${C.a1})`, color: '#fff', padding: '10px 13px', borderRadius: '14px 4px 14px 14px', maxWidth: '70%', fontSize: 12, lineHeight: 1.5 }}>
                    {msg.content}
                  </div>
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start', marginBottom: 14 }}>
              <SellixAvatar size={28} />
              <div style={{ background: C.white, borderRadius: '4px 14px 14px 14px', padding: '13px 16px', boxShadow: '0 1px 6px rgba(14,25,55,.06)' }}>
                <TypingDots />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div style={{ padding: '11px 18px', borderTop: `1px solid ${C.border}`, background: C.white, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.inner, borderRadius: 12, padding: '9px 14px' }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 12, background: 'transparent', color: C.t1, fontFamily: 'inherit' }}
              placeholder="Ask Sellix or say 'what should I do today?'"
            />
            <div onClick={send} style={{ width: 28, height: 28, background: `linear-gradient(135deg,${C.a2},${C.a1})`, borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ic d={ICON.send} s={12} c="white" w={2.5} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 8, overflowX: 'auto' }}>
            {QUICK_PROMPTS.map(p => (
              <div key={p} onClick={() => { setInput(p); inputRef.current?.focus(); }} style={{ padding: '4px 11px', background: C.inner, borderRadius: 100, fontSize: 11, color: C.t2, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, border: `1px solid ${C.border}` }}>
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right insights panel ── */}
      <div style={{ width: 264, borderLeft: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, padding: '0 14px', flexShrink: 0 }}>
          {[['alerts', `Alerts (${unread})`], ['insights', 'Insights']].map(([id, label]) => (
            <div key={id} onClick={() => setActiveTab(id)} style={{ padding: '10px 10px', fontSize: 11, cursor: 'pointer', fontWeight: activeTab === id ? 600 : 400, color: activeTab === id ? C.a1 : C.t3, borderBottom: activeTab === id ? `2px solid ${C.a1}` : '2px solid transparent' }}>
              {label}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
          {(activeTab === 'alerts' || activeTab === 'copilot') && (
            <>
              {alerts.filter(a => !a.dismissed).length === 0 && (
                <div style={{ textAlign: 'center', padding: '30px 0', color: C.t3, fontSize: 12 }}>
                  <Ic d={ICON.check} s={28} c="#22C55E" w={1.5} />
                  <div style={{ marginTop: 8, fontWeight: 500, color: C.t1 }}>All clear!</div>
                  <div style={{ marginTop: 4, fontSize: 11 }}>No active alerts for KB Aviation</div>
                </div>
              )}
              {alerts.filter(a => !a.dismissed).map(a => (
                <AlertCard key={a.id} alert={a} onAction={doAction} onDismiss={dismiss} />
              ))}
            </>
          )}
          {activeTab === 'insights' && <InsightsPanel />}
        </div>
      </div>
    </div>
  );
}
