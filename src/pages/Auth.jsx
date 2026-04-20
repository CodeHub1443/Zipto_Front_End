import React, { useState } from 'react';

export default function AuthPage({ onLogin }) {
  const [tab, setTab] = useState('signin');

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{
        display: 'flex', width: '100%', maxWidth: 1100, height: 700,
        background: 'var(--bg-page)', borderRadius: 40, overflow: 'hidden', gap: 24, padding: 12,
      }}>

        {/* ── Left: Form Card ── */}
        <div style={{
          width: '48%', background: 'var(--bg-card)', borderRadius: 32,
          boxShadow: 'var(--shadow-neu-out)', display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          {/* Logo */}
          <div style={{ padding: '28px 40px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--a1-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-neu-out)', color: 'var(--a1)' }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
              </svg>
            </div>
            <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--t1)' }}>Zipto</span>
          </div>

          <div style={{ padding: '0 40px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="z-pg-ctx mb4">Account access</div>
            <div className="z-pg-title mb20">Sign in to your <b>workspace</b></div>

            {/* Tab switcher */}
            <div style={{ display: 'flex', background: 'var(--bg-inner)', borderRadius: 14, padding: 5, marginBottom: 24, boxShadow: 'var(--shadow-neu-in)' }}>
              {['signin', 'signup'].map(t => (
                <div key={t} onClick={() => setTab(t)} style={{
                  flex: 1, textAlign: 'center', padding: '9px',
                  borderRadius: 10, fontSize: 13, cursor: 'pointer',
                  background: tab === t ? 'var(--bg-card)' : 'transparent',
                  color: tab === t ? 'var(--t1)' : 'var(--t2)',
                  fontWeight: tab === t ? 700 : 500,
                  boxShadow: tab === t ? 'var(--shadow-neu-out)' : 'none',
                  transition: 'all .2s',
                }}>
                  {t === 'signin' ? 'Sign in' : 'Create account'}
                </div>
              ))}
            </div>

            <label className="z-flbl">Email address</label>
            <input className="z-inp mb12" defaultValue="tanvir@kbaviation.com" style={{ font: 'inherit' }} />

            <label className="z-flbl">Password</label>
            <input className="z-inp mb8" type="password" defaultValue="password123" style={{ font: 'inherit' }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'var(--t2)', cursor: 'pointer' }}>
                <div style={{ width: 18, height: 18, background: 'var(--a1)', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(99,102,241,0.4)' }}>
                  <svg width="10" height="10" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                Keep me signed in
              </label>
              <span style={{ fontSize: 12, color: 'var(--a1)', fontWeight: 600, cursor: 'pointer' }}>Forgot password?</span>
            </div>

            <button 
              onClick={() => onLogin?.()}
              style={{
              width: '100%', height: 48, fontSize: 14, fontWeight: 700, borderRadius: 14,
              background: 'var(--a1)', color: '#fff', border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(99,102,241,0.4)', marginBottom: 18, fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}>
              Sign in to Zipto
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              <span style={{ fontSize: 12, color: 'var(--t3)' }}>or continue with</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { label: 'Facebook', icon: <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
                { label: 'Google',   icon: <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> },
              ].map(({ label, icon }) => (
                <button key={label} style={{
                  flex: 1, height: 46, background: 'var(--bg-card)', border: 'none', borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  fontSize: 13, fontWeight: 500, color: 'var(--t2)', cursor: 'pointer',
                  boxShadow: 'var(--shadow-neu-out)', fontFamily: 'inherit',
                }}>
                  {icon} {label}
                </button>
              ))}
            </div>

            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--t3)', marginTop: 18 }}>
              No account? <span style={{ color: 'var(--a1)', fontWeight: 600, cursor: 'pointer' }}>Sign up free →</span>
            </p>
          </div>
        </div>

        {/* ── Right: Brand Panel ── */}
        <div style={{
          flex: 1, borderRadius: 32, padding: 10, display: 'flex', flexDirection: 'column',
          background: 'linear-gradient(150deg, #3730A3, #6366f1, #38bdf8)',
          boxShadow: '0 12px 40px rgba(99,102,241,0.5)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -80, right: -80, width: 380, height: 380, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -60, left: -60, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />

          <div style={{
            flex: 1, borderRadius: 24, background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)', padding: '36px 36px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1,
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '.1em', marginBottom: 16 }}>POWERED BY AI</div>
            <h2 style={{ fontSize: 34, fontWeight: 300, color: '#fff', lineHeight: 1.28, marginBottom: 10, margin: '0 0 10px' }}>
              Your AI-powered<br /><strong style={{ fontWeight: 800 }}>marketing co-pilot</strong>
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, marginBottom: 30 }}>
              Run campaigns, manage customer conversations, and grow your business with AI.
            </p>

            {/* Stats card */}
            <div style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 18, padding: '18px 22px', marginBottom: 14 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: 12, letterSpacing: '.09em' }}>THIS WEEK · KB AVIATION</div>
              <div style={{ display: 'flex', gap: 24, marginBottom: 14 }}>
                {[['$4,240','Revenue'], ['189','Leads'], ['224K','Reach']].map(([v, l]) => (
                  <div key={l}>
                    <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{v}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2 }}>
                <div style={{ width: '68%', height: '100%', background: 'rgba(255,255,255,0.75)', borderRadius: 2 }} />
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', marginTop: 5 }}>68% of monthly target</div>
            </div>

            {/* AI replies mini */}
            <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 14, padding: '12px 16px', marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.18)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>47 <span style={{ fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,0.7)' }}>AI replies today</span></div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>Saved 3.2 hours of manual work</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 28 }}>
              {[['12K+','Businesses'], ['98%','Uptime'], ['4.9★','Rating']].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{v}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
