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
    <button onClick={toggle} title="Toggle Dark Mode" style={{ width: 42, height: 42, borderRadius: '50%', background: '#F8FAFC', border: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748B' }}>
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
export function Header({ userName = "Tanvir", userProfile = "KB Aviation · Apr 13, 2026", alertCount = 0, onAlertClick }) {
  return (
    <div className="z-hdr" style={{ height: 80, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 6px', background: 'transparent' }}>
      
      {/* Profile Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 700, flexShrink: 0 }}>
          TB
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
            <div style={{ fontSize: 15, color: 'var(--t2)' }}>
              Welcome back, <b style={{ color: 'var(--t1)' }}>{userName}</b>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#ECFDF5', padding: '3px 8px', borderRadius: 100, fontSize: 10, fontWeight: 700, color: '#10B981' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981' }} />
              KB Aviation
            </div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--t3)' }}>{userProfile}</div>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ flex: '0 1 480px', display: 'flex', alignItems: 'center', background: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: 100, height: 44, padding: '0 20px' }}>
        <svg width="16" height="16" fill="none" stroke="#8A94A6" strokeWidth="2.5" viewBox="0 0 24 24" style={{ marginRight: 12 }}>
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input type="text" placeholder="Search anything..." style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 13, color: '#141921', fontWeight: 500 }} />
      </div>

      {/* Actions */}
      <div className="z-hdr-actions" style={{ gap: 10 }}>
        <ThemeToggle />
        
        <button
          onClick={onAlertClick}
          style={{ position: 'relative', width: 42, height: 42, borderRadius: '50%', background: '#F8FAFC', border: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748B' }}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {alertCount > 0 ? (
            <div style={{ position: 'absolute', top: -3, right: -3, minWidth: 18, height: 18, background: '#EF4444', borderRadius: 9, border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff', padding: '0 4px' }}>
              {alertCount > 9 ? '9+' : alertCount}
            </div>
          ) : (
            <div style={{ position: 'absolute', top: 11, right: 11, width: 6, height: 6, background: '#6366F1', borderRadius: '50%', border: '1.5px solid #F8FAFC' }} />
          )}
        </button>
        
        <button
          style={{ height: 42, padding: '0 14px', borderRadius: 100, background: '#F8FAFC', border: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', color: '#64748B', fontSize: 13, fontWeight: 600 }}
        >
          EN
          <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
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
