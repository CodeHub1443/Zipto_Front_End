import React, { useState, useEffect } from 'react';
import { globalCSS } from './styles';

// Web pages
import AuthPage        from './pages/Auth';
import Onboarding      from './pages/Onboarding';
import Dashboard       from './pages/Dashboard';
import CampaignsPage   from './pages/CampaignTab';
import SellixMktPage   from './pages/SellixMkt';
import SellixPage      from './pages/Sellix';
import AnalyticsPage   from './pages/Analytics';
import CreditsPage     from './pages/Credits';
import SettingsPage    from './pages/Settings';

// Mobile screens
import {
  MobileAuth, MobileDashboard,
  MobileSellix, MobileAnalytics, MobileSettings,
} from './mobile/MobileScreens';
import MobileCampaignTab from './mobile/MobileCampaignTab';

// ─── Global CSS ──────────────────────────────────────────────────────
function GlobalStyles() {
  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = globalCSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);
  return null;
}

// ─── Shared alert state ──────────────────────────────────────────────
const INITIAL_ALERTS = [
  {
    id: 1, priority: 'high',
    iconPath: 'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01',
    color: '#EF4444', bg: '#FEF2F2',
    title: 'Campaign paused by Meta',
    body: '"Summer Sale Promo" rejected — image text exceeds 20% coverage. Sellix can fix automatically.',
    actions: ['Auto-fix now', 'View details'],
    ts: '2m ago', dismissed: false,
  },
  {
    id: 2, priority: 'high',
    iconPath: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    color: '#22C55E', bg: '#ECFDF5',
    title: 'Variant winner found — 48h data',
    body: '"Route Launch Reel" outperforming image by 2.4× CTR. Scale budget to winner?',
    actions: ['Scale winner', 'Keep all'],
    ts: '18m ago', dismissed: false,
  },
  {
    id: 3, priority: 'medium',
    iconPath: 'M18 20V10 M12 20V4 M6 20v-6',
    color: '#F59E0B', bg: '#FFFBEB',
    title: 'Budget 80% depleted',
    body: '"Seoul–Dubai Campaign" spent $56 of $70. Extend 3 days for $30?',
    actions: ['Extend $30', 'Let it end'],
    ts: '1h ago', dismissed: false,
  },
  {
    id: 4, priority: 'medium',
    iconPath: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z',
    color: '#06B6D4', bg: '#ECFEFF',
    title: '12 inbox messages unanswered',
    body: 'Avg response time 4.2h. Draft replies for 3 high-intent leads?',
    actions: ['Draft replies', "I'll handle it"],
    ts: '2h ago', dismissed: false,
  },
];

// ─── App Shell ───────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState('auth');
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);

  const dismissAlert = (id) =>
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, dismissed: true } : a));

  const alertCount = alerts.filter(a => !a.dismissed).length;
  const navigateToSellix = () => setScreen('sellix');

  const SCREENS = {
    // Web
    auth:        { label: '01 Auth',         component: <AuthPage onLogin={() => setScreen('onboarding')} /> },
    onboarding:  { label: '01b Onboarding',  component: <Onboarding onComplete={() => setScreen('dashboard')} /> },
    dashboard:   { label: '02 Dashboard',    component: <Dashboard alerts={alerts} onDismissAlert={dismissAlert} onNavigate={setScreen} alertCount={alertCount} onAlertClick={navigateToSellix} /> },
    campaigns:   { label: '03 Campaigns',    component: <CampaignsPage alertCount={alertCount} onAlertClick={navigateToSellix} onBack={() => setScreen('dashboard')} /> },
    sellix:      { label: '04 Sellix Mkt',   component: <SellixMktPage alerts={alerts} onDismissAlert={dismissAlert} alertCount={alertCount} onAlertClick={navigateToSellix} /> },
    sales:       { label: '05 Sellix Sales', component: <SellixPage alertCount={alertCount} onAlertClick={navigateToSellix} /> },
    analytics:   { label: '06 Analytics',    component: <AnalyticsPage alertCount={alertCount} onAlertClick={navigateToSellix} /> },
    credits:     { label: '07 Credits',      component: <CreditsPage alertCount={alertCount} onAlertClick={navigateToSellix} /> },
    settings:    { label: '08 Settings',     component: <SettingsPage alertCount={alertCount} onAlertClick={navigateToSellix} /> },
    // Mobile
    'm-auth':      { label: 'M01 Auth',       component: <MobileAuth /> },
    'm-dash':      { label: 'M02 Dashboard',  component: <MobileDashboard /> },
    'm-camp':      { label: 'M03 Campaigns',  component: <MobileCampaignTab /> },
    'm-sellix':    { label: 'M04 Sellix',     component: <MobileSellix /> },
    'm-analytics': { label: 'M05 Analytics',  component: <MobileAnalytics /> },
    'm-settings':  { label: 'M06 Settings',   component: <MobileSettings /> },
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get('screen');
    if (s && SCREENS[s]) setScreen(s);
  }, []);

  const webKeys    = Object.keys(SCREENS).filter(k => !k.startsWith('m-'));
  const mobileKeys = Object.keys(SCREENS).filter(k =>  k.startsWith('m-'));

  return (
    <>
      <GlobalStyles />

      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
          background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(12px)',
          padding: '7px 12px', display: 'flex', gap: 4, flexWrap: 'wrap',
          borderBottom: '1px solid rgba(255,255,255,.08)',
          alignItems: 'center',
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,.35)', display: 'flex', alignItems: 'center', paddingRight: 8, borderRight: '1px solid rgba(255,255,255,.1)', marginRight: 4 }}>
            WEB
          </div>
          {webKeys.map(k => (
            <button key={k} onClick={() => setScreen(k)} style={{
              padding: '3px 9px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 10, fontWeight: 500,
              background: screen === k ? '#6366F1' : 'rgba(255,255,255,.08)',
              color: screen === k ? '#fff' : 'rgba(255,255,255,.5)',
              transition: 'all .12s',
            }}>{SCREENS[k].label}</button>
          ))}
          {alertCount > 0 && (
            <button
              onClick={() => setScreen('sellix')}
              style={{
                marginLeft: 8, fontSize: 10, fontWeight: 700,
                color: '#FCA5A5', background: 'rgba(239,68,68,.2)',
                padding: '2px 8px', borderRadius: 100, border: 'none',
                cursor: 'pointer', transition: 'transform 0.1s active',
              }}
              onMouseEnter={e => e.target.style.background = 'rgba(239,68,68,.3)'}
              onMouseLeave={e => e.target.style.background = 'rgba(239,68,68,.2)'}
            >
              {alertCount} alert{alertCount !== 1 ? 's' : ''}
            </button>
          )}
          <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,.35)', display: 'flex', alignItems: 'center', paddingLeft: 8, paddingRight: 8, borderLeft: '1px solid rgba(255,255,255,.1)', borderRight: '1px solid rgba(255,255,255,.1)', margin: '0 4px' }}>
            MOBILE
          </div>
          {mobileKeys.map(k => (
            <button key={k} onClick={() => setScreen(k)} style={{
              padding: '3px 9px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 10, fontWeight: 500,
              background: screen === k ? '#38BDF8' : 'rgba(255,255,255,.08)',
              color: screen === k ? '#fff' : 'rgba(255,255,255,.5)',
              transition: 'all .12s',
            }}>{SCREENS[k].label}</button>
          ))}
        </div>
      )}

      <div style={process.env.NODE_ENV === 'development' ? { paddingTop: 38 } : {}}>
        {SCREENS[screen]?.component}
      </div>
    </>
  );
}
