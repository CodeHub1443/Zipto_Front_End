import React from 'react';
import { C, gradHero } from '../tokens';
import { PageShell } from '../components/ui';

// ─── Dashboard-Specific Premium Styles (Local) ──────────────────────

const s = {
  card: {
    background: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    boxShadow: '0 2px 20px rgba(14,25,55,.07)',
  },
  cardSm: {
    background: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    boxShadow: '0 2px 20px rgba(14,25,55,.07)',
  },
  inner: {
    background: '#F3F6FB',
    borderRadius: 12,
    padding: '12px 14px',
  },
  innerSm: {
    background: '#F3F6FB',
    borderRadius: 9,
    padding: '9px 11px',
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
  const gradBarP = 'linear-gradient(90deg, #8B5CF6, #6366F1)';
  const gradBarC = 'linear-gradient(90deg, #22D3EE, #06B6D4)';
  const fills = {
    purple: gradBarP,
    cyan:   gradBarC,
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

function V1RingGauge({ size = 110, pct = 0.72, value, label, strokeWidth = 9 }) {
  const cx = size / 2, cy = size / 2, r = (size - strokeWidth * 2 - 14) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * pct;
  const gap  = circ * (1 - pct);
  const id   = `rg-v1-${size}-${Math.round(pct * 100)}`;

  const ticks = Array.from({ length: 20 }, (_, i) => {
    const a = (i * 18 - 90) * (Math.PI / 180);
    const ro = r + strokeWidth + 2, ri = r + strokeWidth + 5;
    return (
      <line key={i}
        x1={cx + ro * Math.cos(a)} y1={cy + ro * Math.sin(a)}
        x2={cx + ri * Math.cos(a)} y2={cy + ri * Math.sin(a)}
        stroke="#DDE3F0" strokeWidth="1.4" strokeLinecap="round"
      />
    );
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
      </defs>
      {ticks}
      <circle cx={cx} cy={cy} r={r} fill="none"
        stroke="#E8EDF6" strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={r} fill="none"
        stroke={`url(#${id})`} strokeWidth={strokeWidth} strokeLinecap="round"
        strokeDasharray={`${dash.toFixed(1)} ${gap.toFixed(1)}`}
        transform={`rotate(-90 ${cx} ${cy})`} />
      <text x={cx} y={cy - (label ? 8 : 0)}
        textAnchor="middle" dominantBaseline="central"
        fontSize={size < 90 ? 14 : 18} fontWeight="800" fill="#141921">
        {value}
      </text>
      {label && (
        <text x={cx} y={cy + 14}
          textAnchor="middle" dominantBaseline="central"
          fontSize="11" fill="#9BA5B7">
          {label}
        </text>
      )}
    </svg>
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
  const dotColors = { green: '#22C55E', orange: '#F97316', red: '#EF4444', blue: '#6366F1' };
  
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 9px',
      borderRadius: 100, fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap', ...style
    }}>
      {dot && (
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: dotColors[dot] || dotColors[variant] || '#9BA5B7',
          display: 'inline-block', flexShrink: 0,
        }} />
      )}
      {children}
    </span>
  );
}

// ─── Local Sub-components ───────────────────────────────────────────

function MetricCard({ label, value, badge, barVariant, barPct, iconColor, iconPath }) {
  return (
    <div style={s.card}>
      <div className="row ac jb mb8" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={s.muted}>{label}</span>
        <V1IconBadge color={iconColor} size={30}>
          <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
            <path d={iconPath} />
          </svg>
        </V1IconBadge>
      </div>
      <div style={{ ...s.bignum, marginBottom: 6 }}>{value}</div>
      <div className="row ac gap6 mb8" style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>{badge}</div>
      <V1ProgressBar pct={barPct} variant={barVariant} />
    </div>
  );
}

function CampaignRow({ name, sub, status }) {
  const variants = { Live: 'green', 'Sched.': 'orange', Draft: 'gray' };
  return (
    <div style={{ ...s.innerSm, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 26, height: 26, background: '#1877F2', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700 }}>f</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 500 }}>{name}</div>
          <div style={s.tiny}>{sub}</div>
        </div>
      </div>
      <V1Badge variant={variants[status]}>{status}</V1Badge>
    </div>
  );
}

function InboxItem({ name, time, message, badges }) {
  return (
    <div style={{ ...s.innerSm, cursor: 'pointer' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 13, fontWeight: 500 }}>{name}</span>
        <span style={s.tiny}>{time}</span>
      </div>
      <div style={{ fontSize: 12, color: '#5C6678', marginBottom: 5 }}>{message}</div>
      <div style={{ display: 'flex', gap: 4 }}>
        {badges.map(([v, l]) => <V1Badge key={l} variant={v}>{l}</V1Badge>)}
      </div>
    </div>
  );
}

// ─── Main Dashboard Page ─────────────────────────────────────────────

export default function Dashboard({ alerts = [], onDismissAlert, onNavigate, alertCount, onAlertClick }) {
  return (
    <PageShell active="dashboard" onNavigate={onNavigate} alertCount={alertCount} onAlertClick={onAlertClick}>
      <div style={{ padding: '20px 22px', height: '100%', overflow: 'hidden' }}>

        {/* Page header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <div style={s.pgCtx}>Overview</div>
            <div style={s.pgTitle}>Your business <b style={{ fontWeight: 800 }}>at a glance</b></div>
          </div>
          <button style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '8px 18px',
            borderRadius: 11, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', whiteSpace: 'nowrap',
            background: 'linear-gradient(135deg, #818CF8, #6366F1)', color: '#fff', boxShadow: '0 4px 14px rgba(99,102,241,.28)'
          }}>
            <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            New Campaign
          </button>
        </div>

        {/* 4 Metric cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 11, marginBottom: 12 }}>
          <MetricCard label="Sales this week" value="$4,240" barVariant="purple" barPct={68} iconColor="indigo" iconPath="M12 1v22 M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
            badge={<><V1Badge variant="green">▲ 12.4%</V1Badge><span style={s.tiny}>vs last week</span></>} />
          <MetricCard label="New leads" value="189" barVariant="cyan" barPct={54} iconColor="teal" iconPath="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z"
            badge={<><V1Badge variant="green">▲ 8.1%</V1Badge><span style={s.tiny}>vs last week</span></>} />
          <MetricCard label="Total reach" value="224K" barVariant="purple" barPct={82} iconColor="purple" iconPath="M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
            badge={<><V1Badge variant="green">▲ 15.2%</V1Badge><span style={s.tiny}>this week</span></>} />
          <MetricCard label="Active campaigns" value="8" barVariant="orange" barPct={40} iconColor="coral" iconPath="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"
            badge={<V1Badge variant="orange" dot="orange">Live now</V1Badge>} />
        </div>

        {/* 3-col layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr 0.85fr', gap: 12, height: 'calc(100% - 208px)' }}>

          {/* Col 1: Ring gauge + campaigns */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ ...s.card, display: 'flex', alignItems: 'center', gap: 14, padding: 16 }}>
              <V1RingGauge size={112} pct={0.72} value="$4K" strokeWidth={8} />
              <div style={{ flex: 1 }}>
                <div style={{ ...s.subl, marginBottom: 8 }}>WEEKLY PERFORMANCE</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#8B5CF6', display: 'inline-block' }} />
                    <span style={s.tiny}>Sales target</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#141921', marginLeft: 'auto' }}>68%</span>
                  </div>
                  <V1ProgressBar pct={68} variant="purple" height={4} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, marginTop: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22D3EE', display: 'inline-block' }} />
                    <span style={s.tiny}>Lead target</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#141921', marginLeft: 'auto' }}>45%</span>
                  </div>
                  <V1ProgressBar pct={45} variant="cyan" height={4} />
                </div>
              </div>
            </div>
            <div style={{ ...s.card, display: 'flex', flexDirection: 'column', gap: 8, flex: 1, padding: 16, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={s.sect}>Active campaigns</div>
                <V1Badge variant="green" dot="green">8 live</V1Badge>
              </div>
              <CampaignRow name="Summer Sale Promo" sub="14.2K reach" status="Live" />
              <CampaignRow name="Seoul–Dubai Route" sub="Starts in 3 days" status="Sched." />
              <CampaignRow name="Loyalty Program" sub="Draft · Pending" status="Draft" />
            </div>
          </div>

          {/* Col 2: Inbox */}
          <div style={{ ...s.card, padding: 16, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={s.sect}>Sales Inbox</div>
              <V1Badge variant="red">5 new</V1Badge>
            </div>
            <div style={{ ...s.inner, padding: '10px 12px', marginBottom: 10 }}>
              <div style={{ display: 'flex', gap: 16 }}>
                {[
                  { color: 'green', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z', value: '47', label: 'AI replies' },
                  { color: 'teal',  icon: 'M12 2a10 10 0 100 20A10 10 0 0012 2z M12 6v6l4 2', value: '3.2h', label: 'saved' },
                ].map(({ color, icon, value, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <V1IconBadge color={color} size={24}>
                      <svg width="11" height="11" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d={icon} /></svg>
                    </V1IconBadge>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800 }}>{value}</div>
                      <div style={s.tiny}>{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <InboxItem name="Sarah Johnson" time="2m" message="Is this product still available?" badges={[['orange','WARM'],['gray','New Customer']]} />
              <InboxItem name="Ahmed Rahman" time="15m" message="Delivery options?" badges={[['red','HOT'],['blue','VIP']]} />
              <InboxItem name="Fatima Ali" time="1h" message="Bulk discount?" badges={[['orange','WARM']]} />
            </div>
            <button style={{
              width: '100%', justifyContent: 'center', marginTop: 10, fontSize: 12,
              display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 18px',
              borderRadius: 11, fontWeight: 600, cursor: 'pointer', border: 'none', whiteSpace: 'nowrap',
              background: '#F3F6FB', color: '#5C6678'
            }}>View all conversations</button>
          </div>

          {/* Col 3: AI rec + credits + time */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ ...s.card, background: gradHero, border: 'none', padding: 16 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,.55)', letterSpacing: '.09em', marginBottom: 7 }}>SELLIX RECOMMENDS</div>
              <div style={{ fontSize: 13, color: '#fff', fontWeight: 500, lineHeight: 1.55, marginBottom: 12 }}>Boost "Summer Sale" — 3× avg engagement.</div>
              <div style={{ background: 'rgba(255,255,255,.18)', color: '#fff', border: '1px solid rgba(255,255,255,.25)', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'inline-block' }}>
                Boost now →
              </div>
            </div>
            <div style={{ ...s.card, padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={s.sect}>Credits</div>
                <V1Badge variant="blue">Pro</V1Badge>
              </div>
              <div style={{ ...s.mednum, marginBottom: 4 }}>1,240 <span style={{ fontSize: 12, fontWeight: 400, color: '#9BA5B7' }}>credits</span></div>
              <V1ProgressBar pct={38} variant="purple" />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
                <span style={s.tiny}>760 / 2,000 used</span>
                <span style={{ fontSize: 12, color: '#6366F1', fontWeight: 600, cursor: 'pointer' }}>Top up</span>
              </div>
            </div>
            <div style={{ ...s.card, padding: 16 }}>
              <div style={{ ...s.sect, marginBottom: 8 }}>Best post time</div>
              <div style={{ display: 'flex', gap: 7 }}>
                {[['TUE','6–8pm'],['THU','7–9pm']].map(([day, time]) => (
                  <div key={day} style={{ ...s.inner, flex: 1, textAlign: 'center', padding: 9 }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: '#6366F1', marginBottom: 2 }}>{day}</div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{time}</div>
                  </div>
                ))}
              </div>
              <div style={{ ...s.tiny, marginTop: 7 }}>Weekday evenings peak</div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
