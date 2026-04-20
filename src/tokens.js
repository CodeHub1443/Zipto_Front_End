// ─── Zipto Design Tokens ───────────────────────────────────────────
// Pixel-faithful to reference image

export const C = {
  pageBg:    '#C4D9EA',  // powder blue outer wrap
  white:     '#FFFFFF',
  content:   '#EEF1F6',  // pale blue-gray content area
  inner:     '#F3F6FB',  // nested section inside cards
  sbAct:     '#EAECF3',  // sidebar active item bg
  border:    '#E8ECF3',  // hairline dividers

  t1:        '#141921',  // primary text
  t2:        '#5C6678',  // secondary
  t3:        '#9BA5B7',  // muted / captions

  a1:        '#6366F1',  // indigo primary
  a2:        '#818CF8',  // indigo light
  a3:        '#38BDF8',  // sky blue

  teal:      '#06B6D4',
  pink:      '#D946EF',
  purple:    '#7C3AED',
  coral:     '#F97316',
  green:     '#22C55E',
  blue:      '#3B82F6',
  amber:     '#F59E0B',
  red:       '#EF4444',

  barP:      '#8B5CF6',  // progress bar purple
  barC:      '#22D3EE',  // progress bar cyan

  shadow:    '0 2px 20px rgba(14,25,55,.07)',
  ringCmd:   '0 28px 90px rgba(14,25,55,.18)',
};

export const gradPrimary = `linear-gradient(135deg, ${C.a2}, ${C.a1})`;
export const gradHero    = `linear-gradient(150deg, #3730A3, ${C.a1}, ${C.a3})`;
export const gradBarP    = `linear-gradient(90deg, ${C.barP}, ${C.a1})`;
export const gradBarC    = `linear-gradient(90deg, ${C.barC}, ${C.teal})`;
