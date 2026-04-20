import React, { useState, useEffect } from 'react';
import { C } from '../tokens';

// ─── Theme Toggle Component ──────────────────────────────────────────
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(document.body.classList.contains('dark-mode'));

  const toggle = () => {
    const newVal = !isDark;
    setIsDark(newVal);
    if (newVal) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <button className="z-icon-btn" onClick={toggle} title="Toggle Dark Mode" style={{ width: 38, height: 38 }}>
      {isDark ? (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-11.314l.707.707m11.314 11.314l.707.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
        </svg>
      ) : (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  );
}

// ─── Icon Badge (Exact styles from reference) ───────────────────────
export function IconBadge({ size = 48, children, active = false }) {
  return (
    <div style={{
      width: size, height: size,
      borderRadius: 12,
      background: active ? 'var(--bg-shell)' : 'var(--bg-inner)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: active ? 'var(--a1)' : 'var(--t2)',
      boxShadow: 'var(--shadow-neu-out)',
      cursor: 'pointer',
      transition: 'all 0.2s',
    }}>
      {children}
    </div>
  );
}

// ─── Progress Bar ──────────────────────────────────────────────────
export function ProgressBar({ pct, color = 'var(--a1)', height = 8 }) {
  return (
    <div style={{
      height, borderRadius: 100, overflow: 'hidden',
      background: 'var(--bg-inner)', boxShadow: '4px 4px 10px rgba(163, 177, 198, 0.4), -4px -4px 10px rgba(255, 255, 255, 0.8)', padding: 0,
    }}>
      <div style={{
        height: '100%', width: `${pct}%`, borderRadius: 100,
        background: color, transition: 'width 0.8s ease',
      }} />
    </div>
  );
}

// ─── Badge ─────────────────────────────────────────────────────────
export function Badge({ variant = 'gray', dot, children }) {
  const colors = {
    green:  { bg: 'rgba(79, 209, 197, 0.1)',    t: '#4FD1C5' },
    blue:   { bg: 'rgba(99, 102, 241, 0.1)',   t: '#6366f1' },
    red:    { bg: 'rgba(251, 113, 133, 0.1)',    t: '#FB7185' },
    orange: { bg: 'rgba(249, 115, 22, 0.1)',   t: '#f97316' },
    teal:   { bg: 'rgba(6,182,212,0.1)',    t: '#0891b2' },
    gray:   { bg: 'var(--bg-inner)',          t: 'var(--t2)' },
  }[variant] || { bg: 'var(--bg-inner)', t: 'var(--t2)' };

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 600,
      background: colors.bg, color: colors.t, whiteSpace: 'nowrap',
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: colors.t, display: 'inline-block' }} />}
      {children}
    </span>
  );
}

// ─── Sidebar (Refined for reference image) ─────────────────────────
const NAV_ITEMS = [
  { id: 'dash', icon: <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" /> },
  { id: 'play', icon: <path d="M5 3l14 9-14 9V3z" /> },
  { id: 'bolt', icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /> },
  { id: 'music', icon: <path d="M9 18V5l12-2v13 M9 18a3 3 0 11-6 0 3 3 0 016 0z M21 16a3 3 0 11-6 0 3 3 0 016 0z" /> },
  { id: 'leaf', icon: <path d="M2 22s5-4 10-4c0 0 5 0 10 4M12 18V2" strokeWidth="2.5" /> },
  { id: 'cog',  icon: <path d="M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" /> },
];

export function Sidebar({ active = 'dash' }) {
  return (
    <div className="z-sb" style={{ width: 100, paddingTop: 40, paddingBottom: 40 }}>
      {/* Logo */}
      <div style={{ marginBottom: 60 }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--t2)' }}>
          <path d="M18 10a8 8 0 10-6 7.7V22" strokeLinecap="round" />
          <path d="M12 6a4 4 0 110 8" strokeLinecap="round" />
        </svg>
      </div>

      <div className="z-sb-nav" style={{ gap: 20 }}>
        {NAV_ITEMS.map(({ id, icon }) => (
          <IconBadge key={id} active={active === id} size={46}>
             <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
               {icon}
             </svg>
          </IconBadge>
        ))}
      </div>
    </div>
  );
}

// ─── Header ────────────────────────────────────────────────────────
export function Header({ userName = "Apon", userProfile = "Last login: 09/19/2023, 15:24 PM", alertCount = 0, onAlertClick }) {
  return (
    <div className="z-hdr" style={{ height: 90, borderRadius: 28 }}>
      <div className="z-hdr-profile">
        <div style={{
          width: 54, height: 54, borderRadius: '50%', background: '#FBD38D',
          overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Apon" alt="Avatar" width="54" />
        </div>
        <div className="z-hdr-welcome">
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--t1)', marginBottom: 2 }}>Welcome back, {userName}</div>
          <span style={{ fontSize: 11, color: 'var(--t3)' }}>{userProfile}</span>
        </div>
      </div>

      <div className="z-search-box" style={{ flex: '0 1 420px', height: 48, borderRadius: 100 }}>
        <svg width="18" height="18" fill="none" stroke="var(--t3)" strokeWidth="2.5" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input type="text" placeholder="Search something" style={{ fontSize: 13, color: 'var(--t2)' }} />
      </div>

      <div className="z-hdr-actions">
        <ThemeToggle />
        <button
          className="z-icon-btn"
          onClick={onAlertClick}
          style={{ width: 38, height: 38, background: alertCount > 0 ? 'rgba(239,68,68,.08)' : 'var(--bg-shell)', boxShadow: 'var(--shadow-neu-out)', border: alertCount > 0 ? '1px solid rgba(239,68,68,.25)' : 'none' }}
        >
          <svg width="20" height="20" fill="none" stroke={alertCount > 0 ? '#EF4444' : 'currentColor'} strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {alertCount > 0 && (
            <div style={{ position: 'absolute', top: 8, right: 8, minWidth: 16, height: 16, background: 'var(--red)', borderRadius: 8, border: '1.5px solid var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff', padding: '0 3px' }}>
              {alertCount > 9 ? '9+' : alertCount}
            </div>
          )}
          {alertCount === 0 && (
            <div style={{ position: 'absolute', top: 10, right: 10, width: 7, height: 7, background: 'var(--red)', borderRadius: '50%', border: '1.5px solid var(--bg-card)' }} />
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Page Shell ────────────────────────────────────────────────────
export function PageShell({ active, children, alertCount, onAlertClick }) {
  return (
    <div className="z-shell" style={{ padding: 30, gap: 30 }}>
      <Sidebar active={active} />
      <div className="z-main" style={{ gap: 30 }}>
        <Header alertCount={alertCount || 0} onAlertClick={onAlertClick} />
        <div style={{ flex: 1, overflow: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── NeoCard (Outer White, Inner Blueish Grey) ────────────────────────
export function NeoCard({ children, style, innerStyle, noInner = false, onClick }) {
  if (noInner) {
    return (
      <div 
        onClick={onClick}
        style={{
          background: 'var(--bg-card)',
          borderRadius: 32,
          boxShadow: 'var(--shadow-neu-out)',
          padding: 24,
          position: 'relative',
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
  return (
    <div 
      onClick={onClick}
      style={{
        background: 'var(--bg-card)',
        borderRadius: 40,
        boxShadow: 'var(--shadow-neu-out)',
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      <div style={{
        background: 'var(--bg-inner)',
        borderRadius: 30,
        boxShadow: '4px 4px 10px rgba(163, 177, 198, 0.3), -4px -4px 10px rgba(255, 255, 255, 0.8)',
        padding: 24,
        flex: 1,
        position: 'relative',
        ...innerStyle,
      }}>
        {children}
      </div>
    </div>
  );
}

// ─── Ring Gauge (Pixel Perfect for Reference) ───────────────────────
export function RingGauge({ size = 160, pct = 0.72, value = '350', label = 'VOLTAGE', color = 'var(--cyan)' }) {
  const r    = (size - 30) / 2;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;
  const cx   = size / 2;
  const cy   = size / 2;

  return (
    <div style={{ width: size, height: size, position: 'relative', flexShrink: 0 }}>
       {/* Neumorphic Base Shadow */}
       <div style={{
         position: 'absolute', inset: 15, borderRadius: '50%',
         boxShadow: 'var(--shadow-neu-out)', zIndex: 0
       }} />
       
       <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', position: 'relative', zIndex: 1 }}>
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="var(--bg-inner)"
          strokeWidth="10"
        />
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ - dash}`}
          style={{ transition: 'stroke-dasharray 1s ease' }}
        />
      </svg>
      
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        zIndex: 2
      }}>
        <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--t1)' }}>{value}</span>
        <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--t3)', letterSpacing: 1, marginTop: 4 }}>{label}</span>
      </div>
    </div>
  );
}

// ─── Dual Progress Bars ────────────────────────────────────────────
export function DualBars({ label1, pct1, label2, pct2 }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--purple)', display: 'inline-block', flexShrink: 0 }} />
        <span style={{ fontSize: 11, color: 'var(--t2)', flex: 1 }}>{label1}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--t1)' }}>{pct1}%</span>
      </div>
      <ProgressBar pct={pct1} color="var(--purple)" height={5} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5, marginTop: 10 }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--cyan)', display: 'inline-block', flexShrink: 0 }} />
        <span style={{ fontSize: 11, color: 'var(--t2)', flex: 1 }}>{label2}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--t1)' }}>{pct2}%</span>
      </div>
      <ProgressBar pct={pct2} color="var(--cyan)" height={5} />
    </div>
  );
}
