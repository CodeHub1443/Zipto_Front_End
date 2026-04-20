// ─── Zipto Global Styles ───────────────────────────────────────────
// Import this once in your app root: import './styles.css'

export const globalCSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=Outfit:wght@300;400;500;600;700;800&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}

:root {
  /* Exact Colors from Reference */
  --bg-page: #F0F4FA;
  --bg-shell: #ffffff;
  --bg-card: #ffffff;
  --bg-inner: #E8EEF5; /* Matches the inner grey section in the image */
  --bg-sidebar: #ffffff;
  
  /* Soft Neumorphic Shadows */
  --shadow-neu-out: 10px 10px 20px rgba(163, 177, 198, 0.5), -10px -10px 20px rgba(255, 255, 255, 0.8);
  --shadow-neu-in: inset 6px 6px 12px rgba(163, 177, 198, 0.4), inset -6px -6px 12px rgba(255, 255, 255, 1);
  --shadow-flat: 0 4px 20px rgba(0,0,0,0.03);
  
  --t1: #2D3748; /* Darker charcoal for text */
  --t2: #718096;
  --t3: #A0AEC0;
  
  --a1: #6366F1;
  --purple: #BC51E0;
  --cyan: #37C3FF;
  --green: #4FD1C5;
  --red: #FB7185;
  
  --border: #E2E8F0;
  --font: 'Outfit', 'DM Sans', sans-serif;
  --radius-xl: 40px;
  --radius-lg: 32px;
  --radius-md: 20px;
  --radius-sm: 12px;
}

body.dark-mode {
  --bg-page: #1A202C;
  --bg-shell: #2D3748;
  --bg-card: #2D3748;
  --bg-inner: #1A202C;
  --bg-sidebar: #2D3748;
  
  --shadow-neu-out: 10px 10px 20px #0D1117, -10px -10px 20px #3A4454;
  --shadow-neu-in: inset 6px 6px 12px #0D1117, inset -6px -6px 12px #3A4454;
  
  --t1: #F7FAFC;
  --t2: #E2E8F0;
  --t3: #718096;
  --border: #3A4454;
}

body {
  font-family: var(--font);
  background: var(--bg-page);
  color: var(--t1);
  font-size: 14px;
  line-height: 1.5;
  transition: background 0.3s ease, color 0.3s ease;
}

/* ── Layout Shell ── */
.z-shell {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: var(--bg-page);
  padding: 20px;
  gap: 20px;
}

/* ── Sidebar ── */
.z-sb {
  width: 90px;
  background: var(--bg-sidebar);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  box-shadow: var(--shadow-neu-out);
  z-index: 10;
}

.z-sb-logo { 
  width: 44px; 
  height: 44px; 
  margin-bottom: 40px;
  color: var(--a1);
}

.z-sb-nav { 
  display: flex; 
  flex-direction: column; 
  gap: 15px; 
  flex: 1; 
}

.z-ni { 
  width: 50px; 
  height: 50px; 
  border-radius: 16px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  cursor: pointer; 
  color: var(--t3); 
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
}

.z-ni:hover { 
  background: var(--bg-inner);
  color: var(--a1);
  box-shadow: 4px 4px 10px rgba(163, 177, 198, 0.4), -4px -4px 10px rgba(255, 255, 255, 0.8);
}

.z-ni.active { 
  background: var(--bg-shell); 
  color: var(--a1); 
  box-shadow: var(--shadow-neu-out);
}

/* ── Content Area ── */
.z-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ── Header Card ── */
.z-hdr {
  height: 80px;
  background: var(--bg-card);
  border-radius: 24px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow-neu-out);
}

.z-hdr-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.z-hdr-av {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: var(--shadow-neu-out);
}

.z-hdr-welcome {
  display: flex;
  flex-direction: column;
}

.z-hdr-welcome b { font-size: 16px; color: var(--t1); }
.z-hdr-welcome span { font-size: 11px; color: var(--t3); }

.z-search-box {
  flex: 0 1 500px;
  height: 46px;
  background: var(--bg-inner);
  border-radius: 100px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 4px 4px 8px rgba(163, 177, 198, 0.3), -4px -4px 8px rgba(255, 255, 255, 0.8);
}

.z-search-box input {
  background: transparent;
  border: none;
  outline: none;
  flex: 1;
  font-size: 14px;
  color: var(--t1);
}

.z-hdr-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.z-icon-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--bg-card);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--t2);
  cursor: pointer;
  box-shadow: var(--shadow-neu-out);
  border: none;
  transition: all 0.2s;
}

.z-icon-btn:active {
  box-shadow: var(--shadow-neu-in);
}

/* ── Cards Pattern (White outer, Grey inner) ── */
.z-card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: 12px; /* This creates the white border look */
  box-shadow: var(--shadow-neu-out);
  display: flex;
  flex-direction: column;
}

.z-card-inner {
  background: var(--bg-inner);
  border-radius: 20px;
  padding: 16px;
  flex: 1;
  box-shadow: var(--shadow-neu-in);
  position: relative;
}

/* ── Gauges & Charts ── */
.z-gauge-bg {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: var(--bg-card);
  box-shadow: var(--shadow-neu-out);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.z-gauge-inner {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--bg-inner);
  box-shadow: var(--shadow-neu-in);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
}

/* ── Typography Override ── */
h1 { font-size: 32px; font-weight: 400; color: var(--t1); margin-bottom: 5px; }
h1 b { font-weight: 700; }
.z-label { font-size: 12px; font-weight: 600; color: var(--t3); letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 2px; }

/* ── Grid System ── */
.z-dashboard-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto auto;
  gap: 24px;
  flex: 1;
  overflow-y: auto;
  padding-bottom: 20px;
}

.z-col-4 { grid-column: span 4; }
.z-col-8 { grid-column: span 8; }
.z-col-3 { grid-column: span 3; }
.z-col-2 { grid-column: span 2; }
.z-col-6 { grid-column: span 6; }

/* ── Utility Classes ── */
.row { display: flex; flex-direction: row; }
.col { display: flex; flex-direction: column; }
.ac { align-items: center; }
.jb { justify-content: space-between; }
.jc { justify-content: center; }
.gap4  { gap: 4px; }  .gap6  { gap: 6px; }  .gap8  { gap: 8px; }
.gap10 { gap: 10px; } .gap12 { gap: 12px; } .gap14 { gap: 14px; }
.gap16 { gap: 16px; } .gap20 { gap: 20px; } .gap24 { gap: 24px; }
.flex1 { flex: 1; }
.mb4  { margin-bottom: 4px; }  .mb6  { margin-bottom: 6px; }
.mb8  { margin-bottom: 8px; }  .mb10 { margin-bottom: 10px; }
.mb12 { margin-bottom: 12px; } .mb14 { margin-bottom: 14px; }
.mb16 { margin-bottom: 16px; } .mb20 { margin-bottom: 20px; }

/* ── Typography ── */
.z-pg-ctx  { font-size: 12px; font-weight: 500; color: var(--t3); letter-spacing: .07em; text-transform: uppercase; margin-bottom: 4px; }
.z-pg-title { font-size: 28px; font-weight: 300; color: var(--t1); line-height: 1.2; }
.z-pg-title b { font-weight: 700; }
.z-sect { font-size: 14px; font-weight: 600; color: var(--t1); }
.z-subl { font-size: 10px; font-weight: 700; color: var(--t3); text-transform: uppercase; letter-spacing: .07em; }
.z-bignum { font-size: 30px; font-weight: 800; color: var(--t1); line-height: 1; }
.z-mednum { font-size: 21px; font-weight: 700; color: var(--t1); }
.z-muted   { font-size: 12px; color: var(--t3); }
.z-tiny    { font-size: 11px; color: var(--t3); }

/* ── Status Dots ── */
.z-dot   { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; display: inline-block; }
.z-dot-g { background: var(--green); }
.z-dot-r { background: var(--red); }
.z-dot-b { background: var(--a1); }

/* ── Chips ── */
.z-chip { display: inline-flex; align-items: center; padding: 5px 13px; border-radius: 100px; font-size: 12px; font-weight: 500; background: var(--bg-inner); color: var(--t2); cursor: pointer; white-space: nowrap; transition: background .12s, color .12s; box-shadow: var(--shadow-neu-out); }
.z-chip:hover, .z-chip.active { background: var(--a1-soft); color: var(--a1); }

/* ── Inputs ── */
.z-inp { width: 100%; height: 42px; background: var(--bg-inner); border: none; border-radius: 12px; padding: 0 14px; font-size: 13px; color: var(--t1); outline: none; box-shadow: 4px 4px 8px rgba(163, 177, 198, 0.2), -4px -4px 8px rgba(255, 255, 255, 0.7); }
.z-inp:focus { outline: 2px solid rgba(99,102,241,0.3); outline-offset: 2px; }
.z-ta  { width: 100%; background: var(--bg-inner); border: none; border-radius: 12px; padding: 12px 14px; font-size: 13px; color: var(--t1); resize: none; outline: none; box-shadow: 4px 4px 8px rgba(163, 177, 198, 0.2), -4px -4px 8px rgba(255, 255, 255, 0.7); }
.z-ta:focus { outline: 2px solid rgba(99,102,241,0.3); outline-offset: 2px; }
.z-flbl { font-size: 10px; font-weight: 700; color: var(--t3); margin-bottom: 5px; display: block; text-transform: uppercase; letter-spacing: .05em; }
.z-sel  { width: 100%; height: 42px; background: var(--bg-inner); border: none; border-radius: 12px; padding: 0 14px; font-size: 13px; color: var(--t1); outline: none; box-shadow: 4px 4px 8px rgba(163, 177, 198, 0.2), -4px -4px 8px rgba(255, 255, 255, 0.7); }

/* ── Divider ── */
.z-div { height: 1px; background: var(--border); margin: 12px 0; }

/* ── Table ── */
.z-tbl { width: 100%; border-collapse: collapse; }
.z-tbl th { text-align: left; font-size: 10px; font-weight: 700; color: var(--t3); text-transform: uppercase; letter-spacing: .06em; padding: 9px 11px; border-bottom: 1px solid var(--border); }
.z-tbl td { padding: 11px; font-size: 13px; color: var(--t1); border-bottom: 1px solid var(--border); vertical-align: middle; }
.z-tbl tr:last-child td { border-bottom: none; }

/* ── Buttons ── */
.z-btn      { display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 9px 20px; border-radius: 12px; font-size: 13px; font-weight: 600; cursor: pointer; border: none; white-space: nowrap; font-family: var(--font); transition: all 0.2s; box-shadow: var(--shadow-neu-out); }
.z-btn:active { box-shadow: var(--shadow-neu-in); transform: scale(.97); }
.z-btn-p { background: var(--a1); color: #fff; }
.z-btn-p:hover { opacity: .90; }
.z-btn-s { background: var(--bg-card); color: var(--t2); }
.z-btn-s:hover { color: var(--t1); }
.z-btn-d { background: rgba(239,68,68,0.1); color: #ef4444; }
.z-btn-sm { padding: 6px 14px; font-size: 12px; border-radius: 10px; }
.z-btn-xs { padding: 4px 10px; font-size: 11px; border-radius: 8px; }

/* ── Badge ── */
.z-badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 100px; font-size: 11px; font-weight: 600; white-space: nowrap; }

/* ── Progress Bars ── */
.z-bar   { height: 8px; border-radius: 100px; overflow: hidden; }
.z-bar-4 { height: 4px; border-radius: 100px; overflow: hidden; }

/* ── Toggle ── */
.z-tog { width: 42px; height: 24px; background: var(--bg-inner); border-radius: 12px; position: relative; cursor: pointer; flex-shrink: 0; transition: background .25s; box-shadow: var(--shadow-neu-in); }
.z-tog.on { background: var(--a1); }
.z-tog-d { width: 18px; height: 18px; background: var(--bg-card); border-radius: 50%; position: absolute; top: 3px; left: 3px; box-shadow: 0 2px 6px rgba(0,0,0,.15); transition: left .2s; }
.z-tog.on .z-tog-d { left: 21px; }

/* ── Grid helpers ── */
.g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.g3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
.g4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--t3); border-radius: 10px; }
`;
