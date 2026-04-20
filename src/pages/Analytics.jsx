import React, { useState } from 'react';
import { PageShell } from '../components/ui';

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
  pause: 'M6 4h4v16H6z M14 4h4v16h-4z',
  play:  'M5 3l14 9-14 9V3z',
  warn:  'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01',
  check: 'M20 6L9 17l-5-5',
  trend: 'M23 6l-9.5 9.5-5-5L1 18',
  plus:  'M12 5v14 M5 12h14',
  chart: 'M18 20V10 M12 20V4 M6 20v-6',
  camp:  'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z',
};

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

const STATUS_STYLES = {
  live:     { bg: '#ECFDF5', c: '#059669', label: 'Live'     },
  paused:   { bg: '#FFFBEB', c: '#B45309', label: 'Paused'   },
  rejected: { bg: '#FEF2F2', c: '#DC2626', label: 'Rejected' },
  ended:    { bg: C.inner,   c: C.t2,      label: 'Ended'    },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.ended;
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '2px 8px', borderRadius: 100, fontSize: 10, fontWeight: 600, background: s.bg, color: s.c }}>{s.label}</span>;
}

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
    <div style={{ background: C.white, borderRadius: 16, padding: '14px 16px', boxShadow: '0 2px 14px rgba(14,25,55,.06)', border: camp.status === 'rejected' ? `1.5px solid ${C.red}30` : camp.hasWinner ? `1.5px solid ${C.green}40` : '1.5px solid transparent', marginBottom: 10 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          {camp.status === 'live' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.green, flexShrink: 0, animation: 'lp 1.8s ease-in-out infinite' }} />}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.t1, marginBottom: 3 }}>{camp.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <StatusBadge status={camp.status} />
              {camp.hasWinner && <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 100, fontSize: 10, fontWeight: 600, background: '#ECFDF5', color: '#059669' }}>🏆 Winner found</span>}
              <span style={{ fontSize: 10, color: C.t3 }}>{camp.platform}</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {camp.status === 'live'   && <div onClick={onToggle} style={{ width: 30, height: 30, background: C.inner, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Ic d={ICON.pause} s={12} c={C.t2} w={2} /></div>}
          {camp.status === 'paused' && <div onClick={onToggle} style={{ width: 30, height: 30, background: '#ECFDF5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Ic d={ICON.play} s={12} c={C.green} w={2} /></div>}
          {camp.hasWinner && <div onClick={onScale} style={{ padding: '5px 12px', background: `linear-gradient(135deg,${C.a2},${C.a1})`, borderRadius: 8, fontSize: 11, fontWeight: 600, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}><Ic d={ICON.trend} s={10} c="white" w={2} /> Scale</div>}
          {camp.status === 'rejected' && <div style={{ padding: '5px 12px', background: '#FEF2F2', border: `1px solid ${C.red}30`, borderRadius: 8, fontSize: 11, fontWeight: 600, color: C.red, cursor: 'pointer' }}>Fix with AI</div>}
        </div>
      </div>

      {/* Metric grid with sparklines */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8, marginBottom: 12 }}>
        {cols.map(({ label, val, key, inv, noTrend }) => {
          const data = camp.trends?.[key];
          const up   = data && data[data.length - 1] >= data[0];
          const good = inv ? !up : up;
          return (
            <div key={label} style={{ background: C.inner, borderRadius: 9, padding: '7px 9px', textAlign: 'center' }}>
              <div style={{ fontSize: 9, color: C.t3, textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.t1 }}>{val}</div>
              {!noTrend && data && <div style={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}><Sparkline data={data} color={good ? C.green : C.coral} h={22} /></div>}
              {noTrend && <div style={{ fontSize: 10, color: C.t3, marginTop: 2 }}>active</div>}
            </div>
          );
        })}
      </div>

      {/* Budget bar */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 11, color: C.t2 }}>Budget: <strong style={{ color: pct >= 80 ? C.amber : C.t1 }}>${camp.spent} of ${camp.budget}</strong></span>
          <span style={{ fontSize: 10, color: pct >= 80 ? C.amber : C.t3, fontWeight: pct >= 80 ? 600 : 400 }}>{pct >= 80 ? `⚠ ${100 - pct}% left` : `${100 - pct}% remaining`}</span>
        </div>
        <div style={{ height: 4, background: '#E5EAF3', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, borderRadius: 2, background: pct >= 80 ? `linear-gradient(90deg,${C.amber},${C.coral})` : `linear-gradient(90deg,${C.a1},${C.teal})`, transition: 'width .4s' }} />
        </div>
      </div>

      {/* Winner insight */}
      {camp.hasWinner && (
        <div style={{ marginTop: 10, background: '#ECFDF5', border: '1px solid #BBF7D0', borderRadius: 10, padding: '8px 11px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14 }}>🏆</span>
          <div style={{ flex: 1, fontSize: 11, color: '#065F46' }}><strong>"{camp.winnerName}"</strong> — {camp.winnerLift} better CTR. Pause others?</div>
          <div style={{ display: 'flex', gap: 5 }}>
            <span onClick={onScale} style={{ padding: '4px 10px', background: C.green, borderRadius: 6, fontSize: 10, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Scale it</span>
            <span style={{ padding: '4px 10px', background: C.inner, borderRadius: 6, fontSize: 10, color: C.t2, cursor: 'pointer' }}>Keep all</span>
          </div>
        </div>
      )}

      {/* Rejection banner */}
      {camp.status === 'rejected' && (
        <div style={{ marginTop: 10, background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '8px 11px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14 }}>⚠️</span>
          <div style={{ flex: 1, fontSize: 11, color: '#7F1D1D' }}>Meta rejected: {camp.rejectionReason}. <strong>Sellix can fix automatically.</strong></div>
          <span style={{ padding: '4px 10px', background: C.red, borderRadius: 6, fontSize: 10, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>Auto-fix</span>
        </div>
      )}
    </div>
  );
}

export default function Analytics({ alertCount, onAlertClick }) {
  const [campaigns, setCampaigns] = useState(INIT_CAMPAIGNS);

  const toggle = (id) => setCampaigns(p => p.map(c => c.id === id ? { ...c, status: c.status === 'live' ? 'paused' : 'live' } : c));
  const scale  = (id) => setCampaigns(p => p.map(c => c.id === id ? { ...c, hasWinner: false, budget: Math.round(c.budget * 1.4) } : c));

  const live   = campaigns.filter(c => c.status === 'live').length;
  const paused = campaigns.filter(c => c.status === 'paused').length;
  const issues = campaigns.filter(c => c.status === 'rejected').length;

  return (
    <PageShell active="analytics" alertCount={alertCount} onAlertClick={onAlertClick}>
    <div style={{ padding: '16px 20px', height: '100%', overflowY: 'auto' }}>
      <style>{`@keyframes lp { 0%,100%{opacity:1} 50%{opacity:.35} }`}</style>

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, color: C.t3, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 2 }}>Analytics</div>
          <div style={{ fontSize: 22, fontWeight: 300, color: C.t1 }}>Campaign <strong style={{ fontWeight: 800 }}>lifecycle</strong></div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ padding: '6px 14px', background: `linear-gradient(135deg,${C.a2},${C.a1})`, border: 'none', borderRadius: 9, fontSize: 12, fontWeight: 600, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'inherit' }}>
            <Ic d={ICON.plus} s={12} c="white" w={2.5} /> New campaign
          </button>
        </div>
      </div>

      {/* Status summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
        {[
          { label: 'Live now',         value: live,   color: C.green,  ip: ICON.chart, bg: '#ECFDF5' },
          { label: 'Paused',           value: paused, color: C.amber,  ip: ICON.pause, bg: '#FFFBEB' },
          { label: 'Need attention',   value: issues, color: C.red,    ip: ICON.warn,  bg: '#FEF2F2' },
          { label: 'Total this month', value: campaigns.length, color: C.a1, ip: ICON.camp, bg: '#EEF2FF' },
        ].map(({ label, value, color, ip, bg }) => (
          <div key={label} style={{ background: bg, borderRadius: 13, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Ic d={ip} s={14} c={color} w={2} />
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 10, color, opacity: 0.8 }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Live campaigns section label */}
      <div style={{ fontSize: 11, fontWeight: 700, color: C.t3, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.green, animation: 'lp 1.8s ease-in-out infinite' }} />
        Live campaigns — real-time
      </div>

      {campaigns.map(c => (
        <CampaignCard key={c.id} camp={c} onToggle={() => toggle(c.id)} onScale={() => scale(c.id)} />
      ))}

      {/* Brand performance */}
      <div style={{ fontSize: 11, fontWeight: 700, color: C.t3, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 10, marginTop: 6 }}>
        Brand performance · This month
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{ background: C.white, borderRadius: 14, padding: '13px 14px', boxShadow: '0 2px 12px rgba(14,25,55,.06)' }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 12 }}>Reach over time</div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', marginBottom: 6, height: 80 }}>
            {[['W1', 44, '48K'], ['W2', 62, '68K'], ['W3', 55, '59K'], ['W4', 78, '87K']].map(([w, h, r]) => (
              <div key={w} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ fontSize: 9, color: C.t3 }}>{r}</div>
                <div style={{ width: '100%', borderRadius: 4, background: `linear-gradient(180deg,${C.a1},${C.a2})`, height: h }} />
                <span style={{ fontSize: 10, color: C.t3 }}>{w}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 10, color: C.green, fontWeight: 600 }}>▲ 24% vs last month</div>
        </div>
        <div style={{ background: C.white, borderRadius: 14, padding: '13px 14px', boxShadow: '0 2px 12px rgba(14,25,55,.06)' }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10 }}>⚡ Sellix recommends</div>
          {[
            { msg: 'Scale "Route Reel" winner — 2.4× CTR',  color: C.green,  act: 'Scale'    },
            { msg: 'Fix rejected Summer Sale ad',            color: C.red,    act: 'Fix now'  },
            { msg: 'Post tonight 6–8 PM — peak window',      color: C.purple, act: 'Schedule' },
            { msg: 'Extend Seoul-Dubai budget by $30',        color: C.amber,  act: 'Extend'   },
          ].map(({ msg, color, act }) => (
            <div key={msg} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 11, color: C.t2, flex: 1, paddingRight: 8 }}>{msg}</span>
              <span style={{ padding: '3px 9px', background: `${color}14`, color, borderRadius: 6, fontSize: 10, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>{act}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </PageShell>
  );
}
