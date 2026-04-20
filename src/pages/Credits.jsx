import React from 'react';
import { PageShell } from '../components/ui';
import { C, gradHero } from '../tokens';

// ─── Credits-Specific Premium Styles (Local) ───────────────────────

const s = {
  card: {
    background: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
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
    fontSize: 44,
    fontWeight: 800,
    color: '#141921',
    lineHeight: 1,
  },
  muted: {
    fontSize: 12,
    color: '#9BA5B7',
  },
  tbl: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: 10,
  },
};

// ─── Local Components (V1 Design) ──────────────────────────────────

function V1IconBadge({ color = 'indigo', size = 26, children }) {
  const colors = {
    indigo: '#6366F1', teal: '#06B6D4', purple: '#7C3AED',
    coral: '#F97316', green: '#22C55E', blue: '#3B82F6', red: '#EF4444',
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
  };
  return (
    <div style={{ height, background: '#F1F5F9', borderRadius: height / 2, overflow: 'hidden' }}>
      <div style={{
        height: '100%', width: `${pct}%`, borderRadius: height / 2,
        background: fills[variant] || fills.purple,
      }} />
    </div>
  );
}

function V1Badge({ variant = 'gray', children }) {
  const variants = {
    green: { background: '#ECFDF5', color: '#059669' },
    blue:  { background: '#EEF2FF', color: '#6366F1' },
    red:   { background: '#FEF2F2', color: '#DC2626' },
    gray:  { background: '#F3F6FB', color: '#5C6678' },
  };
  const style = variants[variant] || variants.gray;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '2px 9px',
      borderRadius: 100, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', ...style
    }}>
      {children}
    </span>
  );
}

// ─── Main Credits Page ─────────────────────────────────────────────

export default function Credits({ alertCount, onAlertClick }) {
  return (
    <PageShell active="credits" alertCount={alertCount} onAlertClick={onAlertClick}>
      <div style={{ padding: '20px 22px', height: '100%', overflowY: 'auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
          <div>
            <div style={s.pgCtx}>Billing</div>
            <div style={s.pgTitle}>Credits & <b>usage</b></div>
          </div>
          <button style={{ padding: '8px 18px', borderRadius: 9, background: '#6366F1', border: 'none', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
             + Add Credits
          </button>
        </div>

        {/* Top Section: Balance, Plan, and Usage */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 15, marginBottom: 15 }}>
          
          {/* Balance Card (Gradient) */}
          <div style={{ ...s.card, background: gradHero, border: 'none', position: 'relative', overflow: 'hidden' }}>
             <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,.05)', pointerEvents: 'none' }} />
             <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,.5)', letterSpacing: '.12em', marginBottom: 12 }}>AVAILABLE BALANCE</div>
             <div style={{ fontSize: 48, fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: 4 }}>1,240</div>
             <div style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', marginBottom: 20 }}>credits available</div>
             
             <div style={{ marginBottom: 18 }}>
                <div style={{ height: 5, background: 'rgba(255,255,255,.15)', borderRadius: 100, marginBottom: 6 }}>
                   <div style={{ width: '38%', height: '100%', background: '#fff', borderRadius: 100 }} />
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.45)' }}>760 of 2,000 used this month</div>
             </div>
             
             <button style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.2)', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Top up now
             </button>
          </div>

          {/* Plan Card */}
          <div style={s.card}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div style={s.sect}>Current plan</div>
                <V1Badge variant="blue">PRO</V1Badge>
             </div>
             <div style={{ fontSize: 32, fontWeight: 800, color: '#141921', marginBottom: 3 }}>
                $29 <span style={{ fontSize: 14, fontWeight: 400, color: '#9BA5B7' }}>/ mo</span>
             </div>
             <div style={{ fontSize: 12, color: '#9BA5B7', marginBottom: 16 }}>Renews May 12, 2026</div>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
                {['2,000 credits / month', 'Unlimited campaigns', 'AI Sales Assistant'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                     <V1IconBadge color="green" size={20}>
                        <svg width="10" height="10" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                     </V1IconBadge>
                     <span style={{ fontSize: 13, color: '#5C6678' }}>{f}</span>
                  </div>
                ))}
             </div>
             
             <button style={{ width: '100%', padding: '10px', border: '1.5px solid #6366F1', borderRadius: 10, color: '#6366F1', background: 'transparent', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                Upgrade Plan →
             </button>
          </div>

          {/* Usage Card */}
          <div style={s.card}>
             <div style={{ ...s.sect, marginBottom: 16 }}>This month's usage</div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { label: 'AI Copy',         val: '340 cr', pct: 45, clr: 'indigo', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
                  { label: 'Auto-replies',    val: '280 cr', pct: 37, clr: 'teal',   icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' },
                  { label: 'Image analysis',  val: '140 cr', pct: 18, clr: 'purple', icon: 'M12 2v20 M2 12h20' },
                ].map(u => (
                  <div key={u.label}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                           <V1IconBadge color={u.clr} size={22}>
                              <svg width="10" height="10" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path d={u.icon} /></svg>
                           </V1IconBadge>
                           <span style={{ fontSize: 12, color: '#5C6678' }}>{u.label}</span>
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#141921' }}>{u.val}</span>
                     </div>
                     <V1ProgressBar pct={u.pct} variant={u.pct > 40 ? 'purple' : 'cyan'} height={5} />
                  </div>
                ))}
             </div>
             <div style={{ height: 1, background: '#F1F5F9', margin: '14px 0' }} />
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#9BA5B7' }}>Total used</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: '#141921' }}>760 credits</span>
             </div>
          </div>
        </div>

        {/* Transaction History Section */}
        <div style={{ ...s.card, padding: '18px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
             <div style={s.sect}>Transaction history</div>
             <div style={{ display: 'flex', gap: 8 }}>
                <select style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #E2E8F0', background: '#F8FAFD', outline: 'none', fontSize: 12 }}>
                   <option>All transactions</option>
                </select>
                <button style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid #E2E8F0', background: '#fff', fontSize: 12, fontWeight: 600, color: '#5C6678', cursor: 'pointer' }}>Export</button>
             </div>
          </div>
          
          <table style={s.tbl}>
             <thead>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                   <th style={{ textAlign: 'left', padding: '10px 8px', fontSize: 10, color: '#9BA5B7', fontWeight: 700, textTransform: 'uppercase' }}>Date</th>
                   <th style={{ textAlign: 'left', padding: '10px 8px', fontSize: 10, color: '#9BA5B7', fontWeight: 700, textTransform: 'uppercase' }}>Description</th>
                   <th style={{ textAlign: 'left', padding: '10px 8px', fontSize: 10, color: '#9BA5B7', fontWeight: 700, textTransform: 'uppercase' }}>Type</th>
                   <th style={{ textAlign: 'left', padding: '10px 8px', fontSize: 10, color: '#9BA5B7', fontWeight: 700, textTransform: 'uppercase' }}>Credits</th>
                   <th style={{ textAlign: 'left', padding: '10px 8px', fontSize: 10, color: '#9BA5B7', fontWeight: 700, textTransform: 'uppercase' }}>Balance</th>
                   <th style={{ textAlign: 'left', padding: '10px 8px', fontSize: 10, color: '#9BA5B7', fontWeight: 700, textTransform: 'uppercase' }}>Status</th>
                </tr>
             </thead>
             <tbody>
                {[
                  { date: 'Apr 11', desc: 'AI Copy — Campaign #84', sub: 'Sellix Marketing', type: 'Usage',  amt: '−45', clr: '#ef4444', bal: '1,240' },
                  { date: 'Apr 10', desc: 'Monthly renewal · Pro', sub: '$29.00 billed',    type: 'Top-up', amt: '+2,000', clr: '#22c55e', bal: '2,000' },
                  { date: 'Apr 9',  desc: 'Auto-reply batch',      sub: '12 replies',       type: 'Usage',  amt: '−120', clr: '#ef4444', bal: '880' },
                  { date: 'Apr 4',  desc: 'Manual top-up · 500 cr', sub: '$5.00 billed',     type: 'Top-up', amt: '+500', clr: '#22c55e', bal: '1,030' },
                ].map((t, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #F8FAFD' }}>
                     <td style={{ padding: '14px 8px', fontSize: 12, color: '#9BA5B7' }}>{t.date}</td>
                     <td style={{ padding: '14px 8px' }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#141921' }}>{t.desc}</div>
                        <div style={{ fontSize: 11, color: '#9BA5B7' }}>{t.sub}</div>
                     </td>
                     <td style={{ padding: '14px 8px' }}>
                        <V1Badge variant={t.type === 'Usage' ? 'blue' : 'green'}>{t.type}</V1Badge>
                     </td>
                     <td style={{ padding: '14px 8px', fontSize: 13, fontWeight: 700, color: t.clr }}>{t.amt}</td>
                     <td style={{ padding: '14px 8px', fontSize: 13, fontWeight: 700, color: '#141921' }}>{t.bal}</td>
                     <td style={{ padding: '14px 8px' }}>
                        <V1Badge variant="green">Done</V1Badge>
                     </td>
                  </tr>
                ))}
             </tbody>
          </table>
        </div>

      </div>
    </PageShell>
  );
}
