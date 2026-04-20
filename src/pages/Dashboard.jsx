import React from 'react';
import { PageShell, NeoCard, RingGauge, IconBadge, Badge, ProgressBar } from '../components/ui';

// ─── Proactive alert banner ───────────────────────────────────────────────────
function AlertBanner({ alert, onDismiss, onNavigate }) {
  if (!alert) return null;
  return (
    <div style={{
      background: alert.bg,
      border: `1px solid ${alert.color}30`,
      borderRadius: 14,
      padding: '12px 16px',
      marginBottom: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    }}>
      <div style={{ width: 30, height: 30, borderRadius: 9, background: `${alert.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg width="14" height="14" fill="none" stroke={alert.color} strokeWidth="2" viewBox="0 0 24 24">
          <path d={alert.iconPath} />
        </svg>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#141921', marginBottom: 2 }}>{alert.title}</div>
        <div style={{ fontSize: 12, color: '#5C6678', lineHeight: 1.4 }}>{alert.body}</div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        <button
          onClick={() => { onDismiss(alert.id); onNavigate && onNavigate('sellix'); }}
          style={{ padding: '6px 14px', background: `linear-gradient(135deg, #818CF8, #6366F1)`, border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#fff', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 3px 10px rgba(99,102,241,.3)' }}
        >
          {alert.actions[0]}
        </button>
        <button
          onClick={() => onDismiss(alert.id)}
          style={{ width: 28, height: 28, background: `${alert.color}14`, border: 'none', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}
        >
          <svg width="12" height="12" fill="none" stroke={alert.color} strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M18 6L6 18 M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Dashboard({ alerts = [], onDismissAlert, onNavigate, alertCount, onAlertClick }) {
  const topAlert = alerts.find(a => !a.dismissed);

  return (
    <PageShell active="dash" alertCount={alertCount} onAlertClick={onAlertClick}>
      <div style={{ padding: '0 10px', display: 'flex', flexDirection: 'column', gap: 30 }}>

        {/* Proactive alert banner — shows top undismissed alert */}
        <AlertBanner alert={topAlert} onDismiss={onDismissAlert} onNavigate={onNavigate} />

        {/* Page Titles */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--t3)', letterSpacing: 1, marginBottom: 8 }}>Overview</div>
          <div style={{ fontSize: 44, fontWeight: 700, color: 'var(--t1)', letterSpacing: -1 }}>Marketing <span style={{ fontWeight: 300 }}>Zipto Analysis</span></div>
        </div>

        {/* Top Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) 2fr 1fr', gap: 30 }}>
          {/* Card 1: Main Gauge */}
          <NeoCard>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 20 }}>
              <RingGauge size={180} pct={0.75} value="92%" label="PERFORMANCE" color="var(--purple)" />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--t2)' }}>Optimized ROI</div>
                <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 4 }}>+12.4% from last week</div>
              </div>
            </div>
          </NeoCard>

          {/* Card 2: AI Status */}
          <NeoCard>
            <div className="row jb ac mb20">
              <div style={{ maxWidth: 160 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', lineHeight: 1.4 }}>Let Zipto AI automate your Sales Park</div>
              </div>
              <div className="row gap8">
                {[1,2,3].map(i => (
                  <div key={i} style={{ width: 44, height: 44, borderRadius: 12, overflow: 'hidden', boxShadow: 'var(--shadow-neu-out)' }}>
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Bot${i}`} alt="AI" width="44" />
                  </div>
                ))}
                <IconBadge size={44}><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 16V4m0 12l-3-3m3 3l3-3M17 8v12m0-12l-3 3m3-3l3-3" /></svg></IconBadge>
              </div>
            </div>

            <div className="z-div" />

            <div className="row jb" style={{ marginTop: 20 }}>
              {[
                 { icon: 'M13 10V3L4 14h7v7l9-11h-7z', val: '4,240', lbl: 'Leads generated', color: 'var(--cyan)' },
                 { icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6', val: '+24%', lbl: 'Conversion lift', color: 'var(--purple)' },
                 { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', val: '128 times', lbl: 'AI responses', color: 'var(--a1)' },
              ].map((s, i) => (
                <div key={i} className="row ac gap12" style={{ flex: 1 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: `0 4px 12px ${s.color}44` }}>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d={s.icon} /></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--t1)' }}>{s.val}</div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--t3)', textTransform: 'uppercase' }}>{s.lbl}</div>
                  </div>
                </div>
              ))}
            </div>
          </NeoCard>

          {/* Card 3: Summary */}
          <NeoCard>
            <div className="z-sect mb16">Summary</div>
            <div className="col gap16">
              {[
                { lbl: 'Campaign Status', val: '80%', color: 'var(--cyan)' },
                { lbl: 'Engagement Rate', val: '64%', color: 'var(--purple)' },
              ].map(x => (
                <div key={x.lbl}>
                  <div className="row jb mb6">
                    <span className="z-tiny" style={{ fontWeight: 600 }}>{x.lbl}</span>
                    <span className="z-tiny" style={{ fontWeight: 800, color: 'var(--t1)' }}>{x.val}</span>
                  </div>
                  <ProgressBar pct={parseInt(x.val)} color={x.color} height={6} />
                </div>
              ))}
            </div>
          </NeoCard>
        </div>

        {/* Bottom Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 30 }}>
          <NeoCard>
             <div className="row jb ac mb20">
               <div className="z-sect" style={{ fontSize: 18 }}>Detailed Performance</div>
               <IconBadge size={32}><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" /></svg></IconBadge>
             </div>

             <div style={{ display: 'flex', gap: 30, marginBottom: 40 }}>
                <RingGauge size={140} pct={0.68} value="12.4" label="LEADS / HR" color="var(--a1)" />
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
                   {[
                     { l: 'Avg CPC', v: '$0.42' }, { l: 'Peak CTR', v: '8.4%' },
                     { l: 'Ad Spend', v: '$1,240' }, { l: 'Avg ROAS', v: '4.2x' }
                   ].map(st => (
                     <div key={st.l} className="row jb ac" style={{ padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                       <span style={{ fontSize: 12, color: 'var(--t3)' }}>{st.l}</span>
                       <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)' }}>{st.v}</span>
                     </div>
                   ))}
                </div>
             </div>

             <div className="z-sect mb16">Status</div>
             <div className="row gap20">
                <div style={{ flex: 1.5, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 15 }}>
                   {[
                     { icon: 'A', val: '47,819', lbl: 'Total Reach', color: 'var(--red)' },
                     { icon: 'B', val: '18°C', lbl: 'Optimal Temp', color: 'var(--green)' },
                     { icon: 'C', val: '64%', lbl: 'Budget used', color: 'var(--green)' },
                   ].map((it, idx) => (
                      <div key={idx} style={{ background: 'var(--bg-shell)', borderRadius: 20, padding: '16px 20px', boxShadow: 'var(--shadow-neu-out)' }}>
                         <div style={{ width: 24, height: 24, borderRadius: '50%', background: it.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 15, color: '#fff', fontSize: 10, fontWeight: 900 }}>{it.icon}</div>
                         <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--t1)' }}>{it.val}</div>
                         <div style={{ fontSize: 10, color: 'var(--t3)', fontWeight: 600, marginTop: 2 }}>{it.lbl}</div>
                      </div>
                   ))}
                </div>
                <div style={{ flex: 1, background: 'var(--bg-shell)', borderRadius: 20, padding: 16, boxShadow: 'var(--shadow-neu-out)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                   <svg width="100%" height="80" viewBox="0 0 100 40">
                      <path d="M0 35 L20 15 L40 25 L60 5 L80 15 L100 30" fill="none" stroke="var(--cyan)" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="60" cy="5" r="4" fill="var(--cyan)" stroke="var(--bg-shell)" strokeWidth="2" />
                   </svg>
                </div>
             </div>
          </NeoCard>

          <NeoCard>
            <div className="z-sect mb20">Campaign History</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 20 }}>
               <span style={{ fontSize: 32, fontWeight: 800, color: 'var(--t1)' }}>30%</span>
               <span style={{ fontSize: 12, color: 'var(--t3)' }}>Latest lift <br/> 3 Hours Ago</span>
            </div>
            <div className="z-div" />
            <div className="col gap14" style={{ marginTop: 20 }}>
               {[
                 { date: 'Sep 19', name: 'Summer Sale', lift: '+14%', color: 'var(--cyan)' },
                 { date: 'Sep 18', name: 'Brand Launch', lift: '+28%', color: 'var(--purple)' },
                 { date: 'Sep 15', name: 'Influencer Collab', lift: '+9%', color: 'var(--green)' },
               ].map((c, i) => (
                 <div key={i} className="row jb ac">
                    <div>
                       <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)' }}>{c.name}</div>
                       <div style={{ fontSize: 11, color: 'var(--t3)' }}>{c.date}</div>
                    </div>
                    <Badge variant="blue">{c.lift}</Badge>
                 </div>
               ))}
            </div>
          </NeoCard>
        </div>
      </div>
    </PageShell>
  );
}
