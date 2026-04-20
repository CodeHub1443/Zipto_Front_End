import React, { useState } from 'react';
import { PageShell } from '../components/ui';
import { C, gradHero, gradPrimary } from '../tokens';

// ─── Analytics-Specific Premium Styles (Local) ──────────────────────

const s = {
  card: {
    background: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    boxShadow: '0 2px 20px rgba(14,25,55,.07)',
  },
  inner: {
    background: '#F3F6FB',
    borderRadius: 12,
    padding: '12px 14px',
  },
  pgCtx: {
    fontSize: 11,
    fontWeight: 500,
    color: '#9BA5B7',
    letterSpacing: '.07em',
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  pgTitle: {
    fontSize: 25,
    fontWeight: 300,
    color: '#141921',
    lineHeight: 1.2,
  },
  sect: {
    fontSize: 14,
    fontWeight: 600,
    color: '#141921',
  },
  subl: {
    fontSize: 10,
    fontWeight: 700,
    color: '#9BA5B7',
    textTransform: 'uppercase',
    letterSpacing: '.07em',
  },
  bignum: {
    fontSize: 30,
    fontWeight: 800,
    color: '#141921',
    lineHeight: 1,
  },
  mednum: {
    fontSize: 21,
    fontWeight: 700,
    color: '#141921',
  },
  muted: {
    fontSize: 12,
    color: '#9BA5B7',
  },
  tiny: {
    fontSize: 11,
    color: '#9BA5B7',
  },
};

// ─── Local Components (V1 Design) ──────────────────────────────────

function V1IconBadge({ color = 'indigo', size = 38, children }) {
  const colors = {
    indigo: '#6366F1', teal: '#06B6D4', purple: '#7C3AED',
    coral: '#F97316', green: '#22C55E', pink: '#D946EF',
    blue: '#3B82F6', amber: '#F59E0B', red: '#EF4444',
  };
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: colors[color] || color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      {children}
    </div>
  );
}

function V1ProgressBar({ pct, variant = 'purple', height = 6 }) {
  const fills = {
    purple: 'linear-gradient(90deg, #8B5CF6, #6366F1)',
    cyan:   'linear-gradient(90deg, #22D3EE, #06B6D4)',
    green:  '#22C55E',
    orange: '#F97316',
  };
  return (
    <div style={{ height, background: '#E5EAF3', borderRadius: height / 2, overflow: 'hidden' }}>
      <div style={{
        height: '100%', width: `${pct}%`, borderRadius: height / 2,
        background: fills[variant] || fills.purple,
      }} />
    </div>
  );
}

function V1Badge({ variant = 'gray', dot, children }) {
  const variants = {
    green:  { background: '#ECFDF5', color: '#059669' },
    blue:   { background: '#EEF2FF', color: '#6366F1' },
    orange: { background: '#FFF7ED', color: '#EA580C' },
    red:    { background: '#FEF2F2', color: '#DC2626' },
    gray:   { background: '#F3F6FB', color: '#5C6678' },
  };
  const style = variants[variant] || variants.gray;
  const dotColor = { green: '#22C55E', orange: '#F97316', red: '#EF4444', blue: '#6366F1' }[dot || variant] || '#9BA5B7';
  
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 9px',
      borderRadius: 100, fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap', ...style
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: dotColor, display: 'inline-block' }} />}
      {children}
    </span>
  );
}

function V1DualBars({ label1, pct1, label2, pct2 }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={s.tiny}>{label1}</span>
        <span style={{ fontSize: 11, fontWeight: 700 }}>{pct1}%</span>
      </div>
      <V1ProgressBar pct={pct1} variant="purple" height={4} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, marginTop: 7 }}>
        <span style={s.tiny}>{label2}</span>
        <span style={{ fontSize: 11, fontWeight: 700 }}>{pct2}%</span>
      </div>
      <V1ProgressBar pct={pct2} variant="cyan" height={4} />
    </div>
  );
}

// ─── Campaign Logic Components (Preserved from Current) ─────────────

function Sparkline({ data, color, h = 28 }) {
  const w = 80, pad = 4;
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  const last = pts.split(' ').pop().split(',');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r="2.5" fill={color} />
    </svg>
  );
}

function CampaignCard({ camp, onToggle, onScale }) {
  const pct = Math.round((camp.spent / camp.budget) * 100);
  const cols = [
    { label: 'Reach',    val: camp.reach,    key: 'reach', inv: false },
    { label: 'CTR',      val: camp.ctr,      key: 'ctr',   inv: false },
    { label: 'CPC',      val: camp.cpc,      key: 'cpc',   inv: true  },
    { label: 'Messages', val: camp.msgs,     key: 'msgs',  inv: false },
    { label: 'Variants', val: camp.variants, noTrend: true             },
  ];

  return (
    <div style={{ ...s.card, marginBottom: 10, border: camp.status === 'rejected' ? `1.5px solid #EF444430` : camp.hasWinner ? `1.5px solid #22C55E40` : '1.5px solid transparent' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          {camp.status === 'live' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#141921', marginBottom: 3 }}>{camp.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <V1Badge variant={camp.status === 'rejected' ? 'red' : camp.status === 'paused' ? 'orange' : 'green'}>{camp.status.charAt(0).toUpperCase() + camp.status.slice(1)}</V1Badge>
              {camp.hasWinner && <V1Badge variant="green" dot="green">🏆 Winner found</V1Badge>}
              <span style={s.tiny}>{camp.platform}</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
           <button onClick={onToggle} style={{ width: 30, height: 30, background: '#F3F6FB', border: 'none', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
             {camp.status === 'live' ? '⏸' : '▶'}
           </button>
           {camp.hasWinner && <button onClick={onScale} style={{ padding: '5px 12px', background: gradPrimary, border: 'none', borderRadius: 8, fontSize: 11, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Scale</button>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8, marginBottom: 12 }}>
        {cols.map(({ label, val, key, inv, noTrend }) => {
          const data = camp.trends?.[key];
          const up   = data && data[data.length - 1] >= data[0];
          const good = inv ? !up : up;
          return (
            <div key={label} style={{ ...s.inner, padding: '7px 9px', textAlign: 'center' }}>
              <div style={s.subl}>{label}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#141921' }}>{val}</div>
              {!noTrend && data && <div style={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}><Sparkline data={data} color={good ? '#22C55E' : '#F97316'} h={22} /></div>}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={s.tiny}>Budget: <strong>${camp.spent} of ${camp.budget}</strong></span>
        <span style={{ fontSize: 10, color: pct >= 80 ? '#F59E0B' : '#9BA5B7' }}>{100 - pct}% remaining</span>
      </div>
      <V1ProgressBar pct={pct} variant={pct >= 80 ? 'orange' : 'purple'} height={4} />
    </div>
  );
}

// ─── Static Data ───────────────────────────────────────────────────

const INIT_CAMPAIGNS = [
  {
    id: 1, name: 'Summer Sale Promo',       platform: 'Facebook · Instagram', status: 'rejected',
    spent: 28, budget: 70, reach: '14.2K', ctr: '3.1%', cpc: '$0.52', msgs: '23', variants: '3',
    hasWinner: false, rejectionReason: 'Image text exceeds 20% coverage',
    trends: { reach:[2.1,2.8,3.1,2.9,3.4,2.7,3.1], ctr:[2.8,3.0,3.1,2.9,3.0,3.1,3.1], cpc:[0.55,0.53,0.52,0.54,0.52,0.52,0.52], msgs:[3,4,3,4,4,3,4] },
  },
  {
    id: 2, name: 'Seoul–Dubai Route Launch', platform: 'Facebook',            status: 'live',
    spent: 56, budget: 70, reach: '38.7K', ctr: '8.9%', cpc: '$0.28', msgs: '47', variants: '3',
    hasWinner: true, winnerName: 'Route Launch Reel', winnerLift: '2.4×',
    trends: { reach:[5.1,5.8,6.2,6.8,7.1,7.4,7.9], ctr:[5.2,6.1,7.3,7.8,8.2,8.6,8.9], cpc:[0.46,0.41,0.38,0.34,0.31,0.29,0.28], msgs:[4,5,7,7,8,8,8] },
  },
  {
    id: 3, name: 'Loyalty Program',          platform: 'Facebook',            status: 'paused',
    spent: 12, budget: 35, reach: '4.1K',  ctr: '4.2%', cpc: '$0.38', msgs: '8',  variants: '1',
    hasWinner: false,
    trends: { reach:[1.0,1.1,1.3,1.2,1.4,1.3,1.3], ctr:[3.8,4.0,4.1,4.1,4.2,4.2,4.2], cpc:[0.42,0.40,0.38,0.39,0.38,0.38,0.38], msgs:[1,1,2,1,1,1,1] },
  },
];

// ─── Main Analytics Page ───────────────────────────────────────────

export default function Analytics({ alertCount, onAlertClick, onNavigate }) {
  const [campaigns, setCampaigns] = useState(INIT_CAMPAIGNS);
  const toggle = (id) => setCampaigns(p => p.map(c => c.id === id ? { ...c, status: c.status === 'live' ? 'paused' : 'live' } : c));
  const scale  = (id) => setCampaigns(p => p.map(c => c.id === id ? { ...c, hasWinner: false, budget: Math.round(c.budget * 1.4) } : c));

  return (
    <PageShell active="analytics" alertCount={alertCount} onAlertClick={onAlertClick}>
      <div style={{ padding: '18px 22px', height: '100%', overflowY: 'auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <div style={s.pgCtx}>Performance</div>
            <div style={s.pgTitle}>Analytics <b>dashboard</b></div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ padding: '7px 15px', borderRadius: 9, fontSize: 13, fontWeight: 600, background: '#F3F6FB', border: 'none', color: '#5C6678', cursor: 'pointer' }}>Export</button>
            <button style={{ padding: '7px 15px', borderRadius: 9, fontSize: 13, fontWeight: 600, background: gradPrimary, border: 'none', color: '#fff', cursor: 'pointer' }}>+ Campaign</button>
          </div>
        </div>

        {/* Hero Card */}
        <div style={{ ...s.card, background: gradHero, border: 'none', padding: '20px 24px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 54, height: 54, background: 'rgba(255,255,255,.18)', borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#fff' }}>KB</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 2 }}>KB Aviation <span style={{ fontSize: 11, background: 'rgba(255,255,255,.18)', padding: '2px 9px', borderRadius: 100, fontWeight: 500, marginLeft: 7 }}>10K Club</span></div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.7)' }}>Travel service · Seoul, South Korea</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 28 }}>
              {[['14.2K','Reach'],['8.9%','Avg CTR'],['Live','Status']].map(([v, l]) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{v}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,.65)' }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(255,255,255,.16)', color: '#fff', border: '1px solid rgba(255,255,255,.26)', borderRadius: 9, padding: '8px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
               Manage on FB →
            </div>
          </div>
        </div>

        {/* Pulse Metrics */}
        <div style={{ ...s.subl, marginBottom: 8 }}>BRAND PULSE</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Weekly Reach', value: '52,841', color: 'indigo', icon: 'M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20', badge: <V1Badge variant="green">▲ 8.2%</V1Badge> },
            { label: 'New Leads', value: '189', color: 'teal', icon: 'M12 11a4 4 0 100-8 4 4 0 000 8z M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2', badge: <V1Badge variant="green">▲ 4.1%</V1Badge> },
            { label: 'Conversations', value: '47', color: 'purple', icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z', badge: <V1Badge variant="blue">Active</V1Badge> },
            { label: 'Efficiency', value: '78%', color: 'amber', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z', isDual: true },
          ].map((m) => (
            <div key={m.label} style={s.card}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={s.muted}>{m.label}</span>
                <V1IconBadge color={m.color} size={28}>
                  <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d={m.icon} /></svg>
                </V1IconBadge>
              </div>
              <div style={s.mednum}>{m.value}</div>
              {m.isDual ? (
                <div style={{ marginTop: 8 }}><V1DualBars label1="Auto" pct1={78} label2="Man" pct2={22} /></div>
              ) : (
                <div style={{ marginTop: 8 }}>{m.badge}</div>
              )}
            </div>
          ))}
        </div>

        {/* Campaign Life Cycle Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
          <div>
            <div style={{ ...s.subl, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
               <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }} />
               CAMPAIGN LIFE CYCLE — ACTIVE
            </div>
            {campaigns.map(c => (
              <CampaignCard key={c.id} camp={c} onToggle={() => toggle(c.id)} onScale={() => scale(c.id)} />
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
             <div style={{ ...s.card, padding: 16 }}>
                <div style={{ ...s.sect, marginBottom: 12 }}>⚡ Zipto Recommendations</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                   {[
                     { msg: 'Boost Summer Sale 🔥', sub: '3× avg engagement', btn: 'Boost', clr: '#F59E0B' },
                     { msg: 'Fix rejected Ad ⚠️', sub: 'Detected in Campaign #1', btn: 'Fix', clr: '#EF4444' },
                     { msg: 'Post tonight 6–8pm 📅', sub: 'Peak audience window', btn: 'Sched', clr: '#22C55E' },
                   ].map(x => (
                     <div key={x.msg} style={{ ...s.inner, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                           <div style={{ fontSize: 13, fontWeight: 500 }}>{x.msg}</div>
                           <div style={s.tiny}>{x.sub}</div>
                        </div>
                        <button style={{ padding: '5px 12px', background: x.clr, color: '#fff', border: 'none', borderRadius: 7, fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>{x.btn}</button>
                     </div>
                   ))}
                </div>
             </div>

             <div style={{ ...s.card, padding: 16 }}>
                <div style={{ ...s.sect, marginBottom: 10 }}>Top post this week</div>
                <div style={s.inner}>
                   <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 8 }}>✈️ Seoul to Dubai route launch details...</div>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, textAlign: 'center' }}>
                      {[['1.2K','Likes'],['89','Comments'],['247','Shares']].map(([v,l]) => (
                        <div key={l}><div style={{ fontSize: 16, fontWeight: 800, color: '#6366F1' }}>{v}</div><div style={s.tiny}>{l}</div></div>
                      ))}
                   </div>
                </div>
             </div>

             <FullFunnelCard />
          </div>
        </div>

      </div>
    </PageShell>
  );
}

function FullFunnelCard() {
  const [expanded, setExpanded] = useState('Awareness');

  const sections = [
    { title: 'Awareness',     dot: '#6366F1', metrics: [['Impressions','1.2M'],['Reach','450K'],['Frequency','2.4x']] },
    { title: 'Engagement',    dot: '#818CF8', metrics: [['Eng. Rate','6.4%'],['Likes/Saves','24.1K'],['Shares','1.2K']] },
    { title: 'Consideration', dot: '#06B6D4', metrics: [['Profile Visits','15.9K'],['Link Clicks','8.2K'],['Inquiries','420']] },
    { title: 'Retention',     dot: '#22C55E', metrics: [['Repeat Cust.','38.4%'],['Churn Rate','1.2%'],['NPS Score','78']] },
  ];

  return (
    <div style={{ ...s.card, padding: 0, overflow: 'hidden', flex: 1 }}>
      <div style={{ padding: '15px 18px', borderBottom: '1px solid #F1F5F9' }}>
         <div style={s.sect}>Full Funnel Analysis</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {sections.map(sec => {
          const isFull = expanded === sec.title;
          return (
            <div key={sec.title} style={{ borderBottom: '1px solid #F1F5F9' }}>
              <div 
                onClick={() => setExpanded(isFull ? null : sec.title)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 18px', cursor: 'pointer', background: isFull ? '#F8FAFD' : 'white', transition: 'background 0.2s' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: sec.dot }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: isFull ? '#141921' : '#5C6678', letterSpacing: '.02em' }}>{sec.title.toUpperCase()}</span>
                </div>
                <div style={{ fontSize: 16, color: '#9BA5B7', fontWeight: 300, transition: 'transform 0.3s', transform: isFull ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</div>
              </div>
              
              <div style={{ 
                maxHeight: isFull ? 300 : 0, 
                overflow: 'hidden', 
                transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                background: 'white'
              }}>
                <div style={{ padding: '4px 18px 18px', opacity: isFull ? 1 : 0, transition: 'opacity 0.3s' }}>
                   {/* Month Bars from Image */}
                   <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                      {['M1','M2','M3'].map((m) => (
                        <div key={m} style={{ flex: 1 }}>
                           <div style={{ height: 3, background: sec.dot, borderRadius: 100, marginBottom: 5, opacity: 0.7 }} />
                           <div style={{ textAlign: 'center', fontSize: 9, fontWeight: 700, color: '#9BA5B7' }}>{m}</div>
                        </div>
                      ))}
                   </div>
                   {/* Metrics List */}
                   <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {sec.metrics.map(([l, v]) => (
                         <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 11, color: '#5C6678', fontWeight: 500 }}>{l}</span>
                            <span style={{ fontSize: 12, fontWeight: 700, color: '#141921' }}>{v}</span>
                         </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
