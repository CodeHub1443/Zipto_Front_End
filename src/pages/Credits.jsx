import React from 'react';
import { PageShell, NeoCard, ProgressBar } from '../components/ui';

export default function Credits({ alertCount, onAlertClick }) {
  return (
    <PageShell active="credits" alertCount={alertCount} onAlertClick={onAlertClick}>
      <div style={{ flex: 1, overflow: 'auto', padding: '0 4px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="row ac jb">
          <div>
            <div className="z-pg-ctx">Billing</div>
            <div className="z-pg-title">Credits & <b>usage</b></div>
          </div>
          <button style={{ padding: '10px 20px', borderRadius: 14, border: 'none', background: 'var(--a1)', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(99,102,241,0.35)', fontFamily: 'inherit' }}>+ Add Credits</button>
        </div>

        <div className="g3">
          {/* Balance card — gradient */}
          <div style={{ borderRadius: 28, padding: 12, background: 'linear-gradient(150deg, #3730A3, #6366f1)', boxShadow: '0 8px 24px rgba(99,102,241,0.4)' }}>
            <div style={{ borderRadius: 18, background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', padding: '20px 22px', height: '100%' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '.1em', marginBottom: 14 }}>CURRENT BALANCE</div>
              <div style={{ fontSize: 48, fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: 4 }}>1,240</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.68)', marginBottom: 20 }}>credits available</div>
              <div style={{ height: 5, background: 'rgba(255,255,255,0.18)', borderRadius: 100, marginBottom: 5 }}>
                <div style={{ width: '38%', height: '100%', background: 'rgba(255,255,255,0.75)', borderRadius: 100 }} />
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 18 }}>760 of 2,000 used this month</div>
              <button style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.18)', color: '#fff', border: '1px solid rgba(255,255,255,0.28)', borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                Top up credits
              </button>
            </div>
          </div>

          {/* Current plan */}
          <NeoCard innerStyle={{ padding: 20 }}>
            <div className="row ac jb mb12">
              <span className="z-sect">Current plan</span>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100, background: 'var(--a1-soft)', color: 'var(--a1)' }}>PRO</span>
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--t1)', marginBottom: 4 }}>
              $29 <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--t3)' }}>/ month</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--t3)', marginBottom: 16 }}>Renews May 12, 2026</div>
            <div className="col gap10 mb16">
              {['2,000 credits / month', 'Unlimited campaigns', 'AI Sales Assistant', 'Priority support'].map(f => (
                <div key={f} className="row ac gap10">
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="10" height="10" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--t1)' }}>{f}</span>
                </div>
              ))}
            </div>
            <button style={{ width: '100%', padding: '10px', borderRadius: 12, border: '2px solid var(--a1)', background: 'transparent', color: 'var(--a1)', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              Upgrade to Business →
            </button>
          </NeoCard>

          {/* Usage */}
          <NeoCard innerStyle={{ padding: 20 }}>
            <div className="z-sect mb14">This month's usage</div>
            <div className="col gap14">
              {[
                { label: 'AI Copy',         used: '340 cr', pct: 45, color: 'var(--a1)', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
                { label: 'Auto-replies',    used: '280 cr', pct: 37, color: '#06b6d4',   icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' },
                { label: 'Image analysis',  used: '140 cr', pct: 18, color: '#a855f7',   icon: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z' },
              ].map(({ label, used, pct, color, icon }) => (
                <div key={label}>
                  <div className="row ac jb mb6">
                    <div className="row ac gap8">
                      <div style={{ width: 26, height: 26, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="11" height="11" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d={icon} /></svg>
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--t2)' }}>{label}</span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--t1)' }}>{used}</span>
                  </div>
                  <ProgressBar pct={pct} variant="purple" height={6} />
                </div>
              ))}
            </div>
            <div style={{ height: 1, background: 'var(--border)', margin: '14px 0' }} />
            <div className="row ac jb">
              <span style={{ fontSize: 12, color: 'var(--t3)' }}>Total used</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--t1)' }}>760 credits</span>
            </div>
          </NeoCard>
        </div>

        {/* Transaction table */}
        <NeoCard innerStyle={{ padding: 16 }}>
          <div className="row ac jb mb14">
            <span className="z-sect">Transaction history</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <select style={{ padding: '6px 12px', borderRadius: 10, border: 'none', background: 'var(--bg-inner)', color: 'var(--t2)', fontSize: 12, fontFamily: 'inherit', boxShadow: 'var(--shadow-neu-in)', outline: 'none' }}>
                <option>All transactions</option>
              </select>
              <button style={{ padding: '6px 14px', borderRadius: 10, border: 'none', background: 'var(--bg-card)', color: 'var(--t2)', fontSize: 12, fontWeight: 600, cursor: 'pointer', boxShadow: 'var(--shadow-neu-out)', fontFamily: 'inherit' }}>Export CSV</button>
            </div>
          </div>
          <table className="z-tbl">
            <thead><tr><th>Date</th><th>Description</th><th>Type</th><th>Credits</th><th>Balance</th><th>Status</th></tr></thead>
            <tbody>
              {[
                { date: 'Apr 11', desc: 'AI Copy — Campaign #84', sub: 'Sellix Marketing', type: 'Usage', amt: '−45', red: true, bal: '1,240' },
                { date: 'Apr 10', desc: 'Monthly renewal · Pro', sub: '$29.00', type: 'Top-up', amt: '+2,000', red: false, bal: '2,000' },
                { date: 'Apr 9',  desc: 'Auto-reply batch', sub: '12 replies', type: 'Usage', amt: '−120', red: true, bal: '880' },
                { date: 'Apr 4',  desc: 'Manual top-up · 500 cr', sub: '$5.00', type: 'Top-up', amt: '+500', red: false, bal: '1,030' },
              ].map(({ date, desc, sub, type, amt, red, bal }) => (
                <tr key={date + desc}>
                  <td style={{ color: 'var(--t3)' }}>{date}</td>
                  <td><div style={{ fontSize: 13, fontWeight: 500, color: 'var(--t1)' }}>{desc}</div><div style={{ fontSize: 11, color: 'var(--t3)' }}>{sub}</div></td>
                  <td><span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, background: type === 'Usage' ? 'var(--a1-soft)' : 'rgba(34,197,94,0.1)', color: type === 'Usage' ? 'var(--a1)' : '#22c55e' }}>{type}</span></td>
                  <td style={{ color: red ? '#ef4444' : '#22c55e', fontWeight: 700 }}>{amt}</td>
                  <td style={{ fontWeight: 700, color: 'var(--t1)' }}>{bal}</td>
                  <td><span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>Done</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </NeoCard>
      </div>
    </PageShell>
  );
}
