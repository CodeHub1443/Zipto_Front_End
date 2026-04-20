// ─── Zipto Global Styles ───────────────────────────────────────────
// Import this once in your app root: import './styles.css'

export const globalCSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}

:root {
  --bg-shell:  #F3F6FA;      /* Page background */
  --bg-card:   #FFFFFF;      /* Outer card */
  --bg-inner:  #F8FAFD;      /* Inner section background */
  --t1:        #141921;      /* Bold primary text */
  --t2:        #5C6678;      /* Secondary description */
  --t3:        #9BA5B7;      /* Muted / Captions */
  --a1:        #6366F1;      /* Indigo accent */
  --a1-soft:   rgba(99, 102, 241, 0.1);
  --cyan:      #4FD1C5;
  --purple:    #805AD5;
  --red:       #FB7185;
  --green:     #48BB78;
  --border:    #E8ECF3;
  --shadow-neu-out: 10px 10px 20px rgba(163, 177, 198, 0.4), -10px -10px 20px rgba(255, 255, 255, 0.9);
  --shadow-neu-in: inset 6px 6px 12px rgba(163, 177, 198, 0.4), inset -6px -6px 12px rgba(255, 255, 255, 0.9);
  --font:      'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}

body.dark-mode {
  --bg-shell:  #0F172A;
  --bg-card:   #1E293B;
  --bg-inner:  #141E33;
  --t1:        #F8FAFC;
  --t2:        #94A3B8;
  --t3:        #475569;
  --a1:        #818CF8;
  --border:    #334155;
  --shadow-neu-out: 8px 8px 16px rgba(0, 0, 0, 0.4), -4px -4px 12px rgba(255, 255, 255, 0.03);
  --shadow-neu-in: inset 4px 4px 8px rgba(0, 0, 0, 0.5), inset -2px -2px 6px rgba(255, 255, 255, 0.05);
}

body {
  font-family: var(--font);
  background: var(--bg-shell);
  color: var(--t1);
  font-size: 14px;
  line-height: 1.5;
  overflow-x: hidden;
  transition: background 0.3s;
}

/* ── Shell ── */
.z-shell {
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: var(--bg-shell);
}

.z-sb {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--bg-card);
  border-radius: 40px;
  box-shadow: var(--shadow-neu-out);
  flex-shrink: 0;
}

.z-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* ── Header ── */
.z-hdr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: var(--bg-card);
  box-shadow: var(--shadow-neu-out);
  flex-shrink: 0;
}

.z-hdr-profile {
  display: flex;
  align-items: center;
  gap: 16px;
}

.z-hdr-welcome {
  display: flex;
  flex-direction: column;
}

.z-search-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  background: var(--bg-inner);
  box-shadow: var(--shadow-neu-in);
}

.z-search-box input {
  border: none;
  background: transparent;
  width: 100%;
  outline: none;
  font-family: var(--font);
}

.z-hdr-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.z-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: var(--bg-inner);
  box-shadow: var(--shadow-neu-out);
  border: none;
  cursor: pointer;
  color: var(--t2);
  transition: all 0.2s;
  position: relative;
}

.z-icon-btn:hover {
  transform: translateY(-2px);
  color: var(--a1);
}

.z-icon-btn:active {
  box-shadow: var(--shadow-neu-in);
  transform: translateY(0);
}

/* ── Components ── */
.z-div {
  height: 1px;
  background: var(--border);
  width: 100%;
}

.z-sect {
  font-size: 16px;
  font-weight: 800;
  color: var(--t1);
}

.z-tiny {
  font-size: 11px;
  color: var(--t3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ── Buttons ── */
.z-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  font-family: var(--font);
  transition: all 0.2s;
  box-shadow: var(--shadow-neu-out);
}

.z-btn-p {
  background: linear-gradient(135deg, #818CF8, #6366F1);
  color: #fff;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.z-btn-s {
  background: var(--bg-inner);
  color: var(--t2);
}

.z-btn-sm {
  padding: 6px 12px;
  font-size: 11px;
}

.z-btn:active {
  transform: scale(0.96);
}

/* ── Inputs ── */
.z-inp {
  width: 100%;
  height: 44px;
  background: var(--bg-inner);
  border: none;
  border-radius: 12px;
  padding: 0 16px;
  font-size: 13px;
  color: var(--t1);
  box-shadow: var(--shadow-neu-in);
  outline: none;
  font-family: var(--font);
}

.z-ta {
  width: 100%;
  background: var(--bg-inner);
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 13px;
  color: var(--t1);
  box-shadow: var(--shadow-neu-in);
  outline: none;
  font-family: var(--font);
  resize: none;
}

.z-flbl {
  font-size: 11px;
  font-weight: 700;
  color: var(--t3);
  margin-bottom: 8px;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.7px;
}

/* ── Badge ── */
.z-badge {
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
}

/* ── Chips ── */
.z-chip {
  padding: 6px 16px;
  border-radius: 100px;
  background: var(--bg-inner);
  box-shadow: var(--shadow-neu-out);
  font-size: 12px;
  font-weight: 600;
  color: var(--t2);
  cursor: pointer;
  transition: all 0.2s;
  border: 1.5px solid transparent;
}

.z-chip.active {
  background: var(--a1-soft);
  color: var(--a1);
  border-color: var(--a1);
  box-shadow: none;
}

/* ── Helpers ── */
.row { display: flex; flex-direction: row; }
.col { display: flex; flex-direction: column; }
.ac { align-items: center; }
.jc { justify-content: center; }
.jb { justify-content: space-between; }
.gap8 { gap: 8px; }
.gap12 { gap: 12px; }
.gap14 { gap: 14px; }
.gap16 { gap: 16px; }
.gap20 { gap: 20px; }
.mb6 { margin-bottom: 6px; }
.mb8 { margin-bottom: 8px; }
.mb12 { margin-bottom: 12px; }
.mb16 { margin-bottom: 16px; }
.mb20 { margin-bottom: 20px; }
.mb24 { margin-bottom: 24px; }
.flex1 { flex: 1; }
`;
