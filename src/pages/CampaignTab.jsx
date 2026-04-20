import React, { useState, useRef } from 'react';
import { PageShell } from '../components/ui';

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  white:   '#FFFFFF',
  inner:   '#F3F6FB',
  content: '#EEF1F6',
  a1:      '#6366F1',
  a2:      '#818CF8',
  a3:      '#38BDF8',
  t1:      '#141921',
  t2:      '#5C6678',
  t3:      '#9BA5B7',
  border:  '#E8ECF3',
  green:   '#22C55E',
  coral:   '#F97316',
  purple:  '#7C3AED',
  teal:    '#06B6D4',
  pink:    '#EC4899',
  red:     '#EF4444',
  amber:   '#F59E0B',
};

// ─── Constants ────────────────────────────────────────────────────────────────
const GRADS = [
  'linear-gradient(135deg,#667eea,#764ba2)',
  'linear-gradient(135deg,#f093fb,#f5576c)',
  'linear-gradient(135deg,#4facfe,#00f2fe)',
  'linear-gradient(135deg,#43e97b,#38f9d7)',
  'linear-gradient(135deg,#fa709a,#fee140)',
  'linear-gradient(135deg,#a18cd1,#fbc2eb)',
];

const ASSET_FORMATS = [
  { type: 'image',    emoji: '🖼️', label: 'Image',    desc: 'Single photo or graphic' },
  { type: 'video',    emoji: '🎬', label: 'Video',    desc: 'Short clip or ad film'   },
  { type: 'carousel', emoji: '🎞️', label: 'Carousel', desc: 'Multiple swipeable images' },
  { type: 'story',    emoji: '📱', label: 'Story',    desc: 'Vertical 9:16 format'   },
  { type: 'reel',     emoji: '🎥', label: 'Reel',     desc: 'Short-form video loop'  },
];

const CTA_OPTIONS = [
  'Book Now', 'Learn More', 'Send Message', 'Shop Now',
  'Sign Up', 'Get Quote', 'Download', 'Watch Video',
];

const AUDIENCES = [
  {
    id: 'followers',
    label: 'People like your followers',
    desc: 'Meta lookalike — best for brand awareness',
    icon: '👥',
    color: C.a1,
  },
  {
    id: 'interest',
    label: 'Travel enthusiasts nearby',
    desc: 'AI-suggested based on your brand profile',
    icon: '✈️',
    color: C.teal,
  },
  {
    id: 'custom',
    label: 'Custom audience',
    desc: 'Set your own age, gender & location',
    icon: '🎯',
    color: C.purple,
  },
];

const AI_COPIES = [
  {
    headline: 'Summer Flights from $199 — Book Today!',
    copy: '✈️ Summer is calling — save up to 30% before July 31. Limited seats, unlimited memories. 🌴 #KBAviation #TravelDeals',
  },
  {
    headline: 'New Route: Seoul ↔ Dubai Daily ✈️',
    copy: '🌍 Our brand new Seoul–Dubai route is now live. Premium comfort, competitive fares. Fly with KB Aviation!',
  },
  {
    headline: 'Your Next Adventure Awaits ✈️',
    copy: '🌟 Join 50,000+ happy travelers who chose KB Aviation. 15 global destinations, award-winning service, unbeatable prices.',
  },
];

let uid = 10;
const INITIAL_ASSETS = [
  {
    id: 1, type: 'image', name: 'Summer Sale Banner',
    grad: GRADS[0], headline: 'Save 30% on Summer Flights',
    copy: '✈️ Summer is calling — save up to 30% before July 31. Limited seats. 🌴 #KBAviation',
    cta: 'Book Now', score: 4,
  },
  {
    id: 2, type: 'video', name: 'Route Launch Reel',
    grad: GRADS[1], headline: 'New Route: Seoul to Dubai',
    copy: 'Experience luxury travel on our brand new Seoul–Dubai route. Flying daily from June 1.',
    cta: 'Learn More', score: 5,
  },
];

// ─── Primitive components ─────────────────────────────────────────────────────

function Icon({ d, size = 16, color = 'currentColor', strokeWidth = 1.8 }) {
  return (
    <svg width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path d={d} />
    </svg>
  );
}

const ICONS = {
  check: 'M20 6L9 17l-5-5',
  x:     'M18 6L6 18 M6 6l12 12',
  plus:  'M12 5v14 M5 12h14',
  play:  'M5 3l14 9-14 9V3z',
  copy:  'M9 9h13v13H9z M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1',
  bolt:  'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  send:  'M22 2L11 13 M22 2L15 22l-4-9-9-4 22-7z',
  arr:   'M9 18l6-6-6-6',
};

function Card({ children, style: sx }) {
  return (
    <div style={{
      background: C.white, borderRadius: 16, padding: 16,
      boxShadow: '0 2px 14px rgba(14,25,55,.06)', ...sx,
    }}>
      {children}
    </div>
  );
}

function Btn({ children, primary, small, ghost, full, disabled, onClick, style: sx }) {
  const [hov, setHov] = useState(false);
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: 6, border: 'none', borderRadius: small ? 9 : 11,
    fontFamily: 'inherit', fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all .14s', fontSize: small ? 11 : 12,
    padding: small ? '6px 13px' : '8px 17px',
    width: full ? '100%' : 'auto', ...sx,
  };
  const variant = primary
    ? { ...base, background: disabled ? C.inner : `linear-gradient(135deg, ${C.a2}, ${C.a1})`, color: disabled ? C.t3 : '#fff', boxShadow: disabled ? 'none' : '0 4px 12px rgba(99,102,241,.28)', opacity: hov && !disabled ? 0.92 : 1 }
    : ghost
    ? { ...base, background: 'transparent', color: C.a1, border: '1.5px solid #C7D2FE', opacity: hov ? 0.8 : 1 }
    : { ...base, background: hov ? '#E8ECF0' : C.inner, color: C.t2 };
  return (
    <button style={variant} onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} disabled={disabled}>
      {children}
    </button>
  );
}

function FieldLabel({ children }) {
  return (
    <label style={{ fontSize: 9, fontWeight: 700, color: C.t3, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 4, display: 'block' }}>
      {children}
    </label>
  );
}

function Spinner() {
  return (
    <div style={{
      width: 10, height: 10,
      border: '2px solid rgba(255,255,255,.35)',
      borderTopColor: '#fff',
      borderRadius: '50%',
      animation: 'spin .6s linear infinite',
    }} />
  );
}

// ─── Reach Estimator ─────────────────────────────────────────────────────────
function ReachEstimator({ budget, days, mode }) {
  const b = parseInt(budget) || 5;
  const d = parseInt(days) || 5;
  const total = b * d;
  const lo  = Math.round(b * 320 * 0.8).toLocaleString();
  const hi  = Math.round(b * 320 * 1.6).toLocaleString();
  const tot = Math.round(total * 320 * 1.2).toLocaleString();

  return (
    <div style={{
      background: `linear-gradient(135deg, ${C.a1}08, ${C.teal}06)`,
      border: `1px solid ${C.a1}20`,
      borderRadius: 13, padding: '12px 14px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
        <div style={{ width: 22, height: 22, borderRadius: 7, background: `${C.a1}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon d="M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20 M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" size={11} color={C.a1} strokeWidth={2} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: C.a1 }}>Estimated impact</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 10 }}>
        {[
          { label: 'Daily reach',  value: `${lo}–${hi}`, unit: 'people'          },
          { label: 'Total reach',  value: `~${tot}`,     unit: 'people'          },
          { label: 'Total spend',  value: `$${total}`,   unit: `over ${d} days`  },
        ].map(({ label, value, unit }) => (
          <div key={label} style={{ background: C.white, borderRadius: 9, padding: '8px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 9, color: C.t3, textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.t1 }}>{value}</div>
            <div style={{ fontSize: 9, color: C.t3 }}>{unit}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 10, color: C.t2, display: 'flex', alignItems: 'center', gap: 5 }}>
        <Icon d={ICONS.bolt} size={10} color={C.amber} strokeWidth={2} />
        <span>
          <strong style={{ color: C.amber }}>Sellix tip:</strong> $10/day for 7 days typically yields the best ROI for travel brands.
          {mode === 'campaign' ? ' Multiple variants will further improve performance.' : ''}
        </span>
      </div>
    </div>
  );
}

// ─── Audience selector ────────────────────────────────────────────────────────
function AudienceSelector({ value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      {AUDIENCES.map(({ id, label, desc, icon, color }) => (
        <div
          key={id}
          onClick={() => onChange(id)}
          style={{
            display: 'flex', alignItems: 'center', gap: 11,
            padding: '10px 12px', borderRadius: 12, cursor: 'pointer', userSelect: 'none',
            background: value === id ? `${color}10` : C.inner,
            border: `2px solid ${value === id ? color : 'transparent'}`,
            transition: 'all .14s',
          }}
        >
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: `${color}18`, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: 16, flexShrink: 0,
          }}>
            {icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: value === id ? 700 : 500, color: value === id ? color : C.t1 }}>{label}</div>
            <div style={{ fontSize: 10, color: value === id ? color : C.t3, opacity: value === id ? 0.8 : 1 }}>{desc}</div>
          </div>
          {value === id && (
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon d={ICONS.check} size={9} color="white" strokeWidth={3} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CustomAudiencePanel() {
  return (
    <div style={{ background: C.inner, borderRadius: 11, padding: '12px 14px', marginTop: 8 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
        <div>
          <FieldLabel>Age range</FieldLabel>
          <select style={{ width: '100%', height: 34, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: '0 10px', fontSize: 12, color: C.t1, outline: 'none', fontFamily: 'inherit' }}>
            <option>18–65+</option><option>18–24</option><option>25–34</option>
            <option>35–44</option><option>45–54</option><option>55–65+</option>
          </select>
        </div>
        <div>
          <FieldLabel>Gender</FieldLabel>
          <select style={{ width: '100%', height: 34, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: '0 10px', fontSize: 12, color: C.t1, outline: 'none', fontFamily: 'inherit' }}>
            <option>All genders</option><option>Men</option><option>Women</option>
          </select>
        </div>
      </div>
      <div>
        <FieldLabel>Location</FieldLabel>
        <input
          defaultValue="United States"
          style={{ width: '100%', height: 34, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: '0 10px', fontSize: 12, color: C.t1, outline: 'none', fontFamily: 'inherit' }}
        />
      </div>
    </div>
  );
}

// ─── Asset mini card ──────────────────────────────────────────────────────────
function AssetMiniCard({ asset, active, onSelect, onClone, onRemove, total }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      id={`asset-${asset.id}`}
      onClick={onSelect}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 140, flexShrink: 0, borderRadius: 13,
        border: `2px solid ${active ? C.a1 : hov ? '#C7D2FE' : C.border}`,
        background: active ? '#EEF2FF' : C.white,
        cursor: 'pointer', overflow: 'hidden',
        boxShadow: active ? `0 0 0 3px ${C.a1}18` : 'none',
        transition: 'all .15s', userSelect: 'none',
      }}
    >
      {/* Thumbnail */}
      <div style={{ height: 80, background: asset.grad, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: 5, left: 5, background: 'rgba(0,0,0,.35)', borderRadius: 4, padding: '2px 5px', fontSize: 8, fontWeight: 700, color: '#fff', letterSpacing: '.04em' }}>
          {(asset.type || 'IMAGE').toUpperCase()}
        </div>
        {active && (
          <div style={{ position: 'absolute', top: 5, right: 5, width: 15, height: 15, borderRadius: '50%', background: C.a1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon d={ICONS.check} size={7} color="white" strokeWidth={3} />
          </div>
        )}
        {asset.type === 'video' && (
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(0,0,0,.32)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon d={ICONS.play} size={10} color="white" strokeWidth={0} />
          </div>
        )}
        {/* Hover actions */}
        {(hov || active) && (
          <div style={{ position: 'absolute', bottom: 4, right: 4, display: 'flex', gap: 3 }}>
            <div onClick={e => { e.stopPropagation(); onClone(); }} title="Clone" style={{ width: 18, height: 18, borderRadius: 4, background: 'rgba(0,0,0,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Icon d={ICONS.copy} size={8} color="white" strokeWidth={2} />
            </div>
            {total > 1 && (
              <div onClick={e => { e.stopPropagation(); onRemove(); }} title="Remove" style={{ width: 18, height: 18, borderRadius: 4, background: 'rgba(239,68,68,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Icon d={ICONS.x} size={8} color="white" strokeWidth={2.5} />
              </div>
            )}
          </div>
        )}
      </div>
      {/* Info */}
      <div style={{ padding: '7px 8px' }}>
        <div style={{ fontSize: 10, fontWeight: 500, color: active ? C.a1 : C.t1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 3 }}>
          {asset.name}
        </div>
        <div style={{ display: 'flex', gap: 2 }}>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: i < (asset.score || 0) ? C.a1 : '#E5EAF3' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Format type picker overlay */
// ─── Format row (extracted to allow useState) ────────────────────────────────
function FormatRow({ type, emoji, label, desc, onSelect }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      key={type}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onSelect(type)}
      style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 7px', borderRadius: 8, cursor: 'pointer', background: hov ? C.inner : 'transparent', transition: 'background .1s', marginBottom: 2 }}
    >
      <div style={{ fontSize: 15 }}>{emoji}</div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 500, color: C.t1 }}>{label}</div>
        <div style={{ fontSize: 10, color: C.t3 }}>{desc}</div>
      </div>
    </div>
  );
}

function FormatPicker({ onSelect, onClose }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, zIndex: 30,
      width: 200, borderRadius: 13, background: C.white,
      border: `1px solid ${C.border}`,
      boxShadow: '0 12px 28px rgba(14,25,55,.13)', padding: 9,
    }}>
      <div style={{ fontSize: 9, fontWeight: 700, color: C.t3, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 7, padding: '0 2px' }}>
        Format
      </div>
      {ASSET_FORMATS.map((fmt) => (
        <FormatRow key={fmt.type} {...fmt} onSelect={onSelect} />
      ))}
      <div onClick={onClose} style={{ textAlign: 'center', marginTop: 3, paddingTop: 7, borderTop: `1px solid ${C.border}`, fontSize: 10, color: C.t3, cursor: 'pointer' }}>
        Cancel
      </div>
    </div>
  );
}

// ─── Facebook post preview ────────────────────────────────────────────────────
function FbPreview({ asset, mode }) {
  if (!asset) return null;
  const isPaid = mode !== 'organic';

  return (
    <div style={{ borderRadius: 13, border: `1px solid ${C.border}`, overflow: 'hidden', boxShadow: '0 2px 12px rgba(14,25,55,.06)' }}>
      <div style={{ padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 7 }}>
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#1877F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 9, flexShrink: 0 }}>KB</div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600 }}>KB Aviation</div>
          <div style={{ fontSize: 9, color: C.t3 }}>{isPaid ? 'Sponsored · 🌐' : 'Just now · 🌐'}</div>
        </div>
        <div style={{ marginLeft: 'auto', color: C.t3, fontSize: 16 }}>···</div>
      </div>
      <div style={{ padding: '0 11px 9px', fontSize: 11, color: C.t1, lineHeight: 1.6, maxHeight: 44, overflow: 'hidden' }}>
        {asset.copy || 'Your post copy will appear here...'}
      </div>
      {/* Creative */}
      <div style={{ height: 120, background: asset.grad || 'linear-gradient(135deg,#667eea,#764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {asset.type === 'video' && (
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,.32)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon d={ICONS.play} size={14} color="white" strokeWidth={0} />
          </div>
        )}
      </div>
      {/* CTA bar (paid only) */}
      {isPaid && (
        <div style={{ padding: '8px 11px', background: '#F5F6F8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 8, color: C.t3, textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 1 }}>kbaviation.com</div>
            <div style={{ fontSize: 11, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{asset.headline || 'Your headline'}</div>
          </div>
          <div style={{ padding: '5px 10px', background: '#1877F2', borderRadius: 5, fontSize: 10, fontWeight: 600, color: '#fff', marginLeft: 8, flexShrink: 0, whiteSpace: 'nowrap' }}>
            {asset.cta || 'Book Now'}
          </div>
        </div>
      )}
      {/* Reactions */}
      <div style={{ padding: '6px 11px', display: 'flex' }}>
        {['👍 Like', '💬 Comment', '↗ Share'].map((action, i) => (
          <div key={action} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: C.t3, padding: '3px 0', borderRight: i < 2 ? `1px solid ${C.border}` : 'none' }}>
            {action}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Mode card (extracted to allow useState without hooks-in-map violation) ──
function ModeCard({ id, emoji, label, badge, badgeColor, desc, highlights, color, onSelect }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      onClick={() => onSelect(id)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.white, borderRadius: 18, padding: '20px 18px',
        cursor: 'pointer', userSelect: 'none', position: 'relative', overflow: 'hidden',
        border: `2px solid ${hov ? `${color}40` : C.border}`,
        boxShadow: hov ? `0 8px 28px ${color}14` : '0 2px 14px rgba(14,25,55,.06)',
        transition: 'all .18s',
      }}
    >
      {badge && (
        <div style={{
          position: 'absolute', top: 12, right: 12,
          fontSize: 9, fontWeight: 700, letterSpacing: '.04em',
          background: `${badgeColor}15`, color: badgeColor,
          padding: '2px 7px', borderRadius: 100,
        }}>
          {badge.toUpperCase()}
        </div>
      )}
      <div style={{ width: 44, height: 44, borderRadius: 13, background: `${color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 14 }}>
        {emoji}
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: C.t1, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 12, color: C.t2, lineHeight: 1.5, marginBottom: 14 }}>{desc}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {highlights.map(h => (
          <div key={h} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: C.t2 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
            {h}
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: -28, right: -28, width: 90, height: 90, borderRadius: '50%', background: `${color}08` }} />
    </div>
  );
}

// ─── Mode selector screen ─────────────────────────────────────────────────────
function ModeSelector({ onSelect }) {
  const modes = [
    {
      id: 'organic',
      emoji: '📝',
      label: 'Organic Post',
      badge: null,
      badgeColor: null,
      desc: 'Share to your page followers for free',
      highlights: ['Free — no budget needed', 'Builds organic community', 'Best for updates & announcements'],
      color: C.green,
    },
    {
      id: 'boost',
      emoji: '⚡',
      label: 'Boost Post',
      badge: 'Quick',
      badgeColor: C.amber,
      desc: 'Reach beyond your followers with a paid ad',
      highlights: ['From $5/day', 'Simple 3-tap setup', 'Reach new audiences fast'],
      color: C.coral,
    },
    {
      id: 'campaign',
      emoji: '🎯',
      label: 'Run Campaign',
      badge: 'Recommended',
      badgeColor: C.a1,
      desc: 'Goal-based campaign with multiple creative variants',
      highlights: ['Multiple creative variants', 'AI-powered audience targeting', 'Meta auto-optimizes for you'],
      color: C.a1,
    },
  ];

  return (
    <div style={{ padding: '22px 24px', maxWidth: 900, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: C.t3, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 3 }}>
          New post
        </div>
        <div style={{ fontSize: 24, fontWeight: 300, color: C.t1 }}>
          How would you like to <strong style={{ fontWeight: 800 }}>share this?</strong>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 28 }}>
        {modes.map((m) => (
          <ModeCard key={m.id} {...m} onSelect={onSelect} />
        ))}
      </div>
      <div style={{ fontSize: 12, color: C.t3, textAlign: 'center' }}>
        Not sure? <span style={{ color: C.a1, fontWeight: 600, cursor: 'pointer' }}>Ask Sellix AI →</span>
      </div>
    </div>
  );
}

// ─── Published success screen ─────────────────────────────────────────────────
function PublishedScreen({ mode, assetCount, budget, days, onReset }) {
  const total = budget * days;
  return (
    <div style={{ padding: 60, textAlign: 'center' }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: '#ECFDF5', display: 'flex',
        alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
      }}>
        <Icon d={ICONS.check} size={28} color={C.green} strokeWidth={2.5} />
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
        {mode === 'organic' ? 'Post published!' : 'Campaign launched!'}
      </div>
      <div style={{ fontSize: 13, color: C.t2, marginBottom: 24 }}>
        {mode === 'organic'
          ? "Shared to KB Aviation's followers."
          : `${assetCount} variant${assetCount !== 1 ? 's' : ''} submitted to Meta · Total budget $${total}`}
      </div>
      <Btn primary onClick={onReset}>Create another</Btn>
    </div>
  );
}

// ─── Main CampaignTab component ───────────────────────────────────────────────
export default function CampaignTab({ onBack, alertCount, onAlertClick }) {
  // Mode: null = selector, 'organic' | 'boost' | 'campaign'
  const [mode, setMode] = useState(null);

  // Content
  const [assets,        setAssets]        = useState(INITIAL_ASSETS);
  const [selectedId,    setSelectedId]    = useState(1);
  const [showPicker,    setShowPicker]    = useState(false);
  const [isGenerating,  setIsGenerating]  = useState(false);
  const deckRef = useRef(null);

  // Ad settings
  const [audience,   setAudience]   = useState('followers');
  const [budget,     setBudget]     = useState(10);
  const [days,       setDays]       = useState(7);
  const [cta,        setCta]        = useState('Book Now');
  const [goal,       setGoal]       = useState('messages');
  const [schedule,   setSchedule]   = useState('besttime');
  const [schedDate,  setSchedDate]  = useState('2026-04-22');
  const [schedTime,  setSchedTime]  = useState('18:00');

  const [isPublished, setIsPublished] = useState(false);

  // Derived
  const selected  = assets.find(a => a.id === selectedId) || assets[0];
  const n         = assets.length;
  const total     = budget * days;
  const isPaid    = mode === 'boost' || mode === 'campaign';
  const modeLabel = mode === 'organic' ? 'Organic Post' : mode === 'boost' ? 'Boost Post' : 'Campaign';
  const modeColor = mode === 'organic' ? C.green : mode === 'boost' ? C.coral : C.a1;

  // ── Asset helpers ────────────────────────────────────────────────────────
  const updateAsset = (id, field, value) =>
    setAssets(prev => prev.map(a => a.id === id ? { ...a, [field]: value } : a));

  const addAsset = (type) => {
    const id = uid++;
    setAssets(prev => [...prev, {
      id, type,
      name:     `${type.charAt(0).toUpperCase() + type.slice(1)} ${assets.length + 1}`,
      grad:     GRADS[assets.length % GRADS.length],
      headline: '',
      copy:     '',
      cta:      'Book Now',
      score:    0,
    }]);
    setSelectedId(id);
    setShowPicker(false);
    setTimeout(() => { if (deckRef.current) deckRef.current.scrollLeft = 9999; }, 60);
  };

  const cloneAsset = (asset) => {
    const id = uid++;
    const cloned = { ...asset, id, name: `${asset.name} (copy)`, score: 0 };
    const idx = assets.findIndex(a => a.id === asset.id);
    setAssets([...assets.slice(0, idx + 1), cloned, ...assets.slice(idx + 1)]);
    setSelectedId(id);
  };

  const removeAsset = (id) => {
    if (assets.length <= 1) return;
    const remaining = assets.filter(a => a.id !== id);
    setAssets(remaining);
    if (selectedId === id) setSelectedId(remaining[0].id);
  };

  const generateCopy = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const pick = AI_COPIES[Math.floor(Math.random() * AI_COPIES.length)];
      updateAsset(selectedId, 'headline', pick.headline);
      updateAsset(selectedId, 'copy', pick.copy);
      updateAsset(selectedId, 'score', 4 + Math.floor(Math.random() * 2));
      setIsGenerating(false);
    }, 1400);
  };

  const reset = () => { setIsPublished(false); setMode(null); };

  // ── Render ────────────────────────────────────────────────────────────────
  if (isPublished) {
    return (
      <PageShell active="play" alertCount={alertCount} onAlertClick={onAlertClick}>
        <PublishedScreen mode={mode} assetCount={n} budget={budget} days={days} onReset={reset} />
      </PageShell>
    );
  }

  if (!mode) {
    return (
      <PageShell active="play" alertCount={alertCount} onAlertClick={onAlertClick}>
        <ModeSelector onSelect={setMode} />
      </PageShell>
    );
  }

  return (
    <PageShell active="play" alertCount={alertCount} onAlertClick={onAlertClick}>
    <div style={{ fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif', padding: '0 4px 20px' }}>

      {/* ─── Header ─── */}
      <div style={{ background: C.white, padding: '13px 22px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 16, marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span onClick={onBack || (() => setMode(null))} style={{ fontSize: 11, color: C.a1, fontWeight: 600, cursor: 'pointer' }}>← Back</span>
          <div style={{ width: 1, height: 16, background: C.border }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ fontSize: 9, fontWeight: 700, background: `${modeColor}14`, color: modeColor, padding: '2px 7px', borderRadius: 100 }}>
              {modeLabel.toUpperCase()}
            </span>
            <div style={{ fontSize: 16, fontWeight: 300, color: C.t1 }}>
              Set up your <strong style={{ fontWeight: 800 }}>{modeLabel.toLowerCase()}</strong>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn small>Save draft</Btn>
          <Btn primary small onClick={() => setIsPublished(true)}>
            {mode === 'organic' ? 'Post Now →' : 'Launch Campaign →'}
          </Btn>
        </div>
      </div>

      {/* ─── Body ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 310px', gap: 14, alignItems: 'start' }}>

        {/* ════ LEFT COLUMN ════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Platform */}
          <Card style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div style={{ width: 24, height: 24, background: '#1877F2', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="12" height="12" viewBox="0 0 24 24">
                  <path fill="white" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <span style={{ fontSize: 12, fontWeight: 500 }}>Facebook</span>
              <span style={{ fontSize: 10, background: '#ECFDF5', color: '#059669', padding: '2px 7px', borderRadius: 100, fontWeight: 600 }}>Connected ✓</span>
            </div>
            <span style={{ fontSize: 11, color: C.a1, cursor: 'pointer', fontWeight: 500 }}>Change platform</span>
          </Card>

          {/* ── Content section ── */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.t1 }}>
                {mode === 'campaign' ? 'Content Deck' : 'Content'}
                {mode === 'campaign' && (
                  <span style={{ fontSize: 11, fontWeight: 400, color: C.t3, marginLeft: 7 }}>{n} variant{n !== 1 ? 's' : ''}</span>
                )}
              </div>
            </div>

            {/* Optimization tip — campaign only */}
            {mode === 'campaign' && (
              <div style={{ fontSize: 11, color: n >= 3 ? C.green : C.coral, fontWeight: 500, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: n >= 3 ? C.green : C.coral }} />
                {n >= 3
                  ? `${n} variants — Meta will auto-optimize between your creatives`
                  : `Add ${3 - n} more variant${3 - n === 1 ? '' : 's'} → unlock Meta's auto-optimization`}
              </div>
            )}

            {mode !== 'campaign' && (
              <div style={{ fontSize: 11, color: C.t3, marginBottom: 10 }}>
                Single image, video, carousel or story for your {modeLabel.toLowerCase()}
              </div>
            )}

            {/* Deck strip */}
            <div ref={deckRef} style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, marginBottom: 12, scrollBehavior: 'smooth' }}>
              {assets.map(asset => (
                <AssetMiniCard
                  key={asset.id}
                  asset={asset}
                  active={asset.id === selectedId}
                  total={assets.length}
                  onSelect={() => setSelectedId(asset.id)}
                  onClone={() => cloneAsset(asset)}
                  onRemove={() => removeAsset(asset.id)}
                />
              ))}

              {/* Add card — always visible for campaign */}
              {mode === 'campaign' && (
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  {showPicker
                    ? <FormatPicker onSelect={addAsset} onClose={() => setShowPicker(false)} />
                    : (
                      <div onClick={() => setShowPicker(true)} style={{ width: 140, height: 117, borderRadius: 13, border: `2px dashed ${C.border}`, background: C.inner, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, userSelect: 'none' }}>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: `${C.border}80`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon d={ICONS.plus} size={13} color={C.t3} strokeWidth={2.5} />
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 600, color: C.t3 }}>Add variant</span>
                      </div>
                    )}
                </div>
              )}
            </div>

            {/* Selected asset editor */}
            {selected && (
              <div key={selectedId} style={{ background: C.inner, borderRadius: 12, padding: 13 }}>
                {/* Name + score */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 11 }}>
                  <input
                    value={selected.name}
                    onChange={e => updateAsset(selectedId, 'name', e.target.value)}
                    style={{ border: 'none', background: 'transparent', fontSize: 13, fontWeight: 600, color: C.t1, outline: 'none', fontFamily: 'inherit', padding: 0, flex: 1 }}
                  />
                  {selected.score >= 4 && (
                    <span style={{ fontSize: 10, background: '#ECFDF5', color: '#059669', padding: '2px 6px', borderRadius: 100, fontWeight: 600, flexShrink: 0 }}>
                      High performer
                    </span>
                  )}
                </div>

                {/* Upload zone */}
                <div style={{ border: `2px dashed ${C.border}`, borderRadius: 10, padding: 12, textAlign: 'center', background: C.white, cursor: 'pointer', marginBottom: 11, display: 'flex', alignItems: 'center', gap: 11 }}>
                  <div style={{ width: 50, height: 36, background: selected.grad, borderRadius: 7, flexShrink: 0 }} />
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: C.t1, marginBottom: 1 }}>
                      Upload creative <span style={{ fontSize: 10, color: C.green, fontWeight: 500 }}>✓ Ready</span>
                    </div>
                    <div style={{ fontSize: 10, color: C.t3 }}>
                      {selected.type === 'video' ? 'MP4 up to 4 GB' : 'JPG, PNG up to 30 MB'}
                    </div>
                  </div>
                  <Btn small>Browse</Btn>
                </div>

                {/* Headline */}
                <div style={{ marginBottom: 9 }}>
                  <FieldLabel>Headline</FieldLabel>
                  <input
                    value={selected.headline}
                    onChange={e => updateAsset(selectedId, 'headline', e.target.value)}
                    placeholder="e.g. Save 30% on Summer Flights"
                    style={{ width: '100%', height: 34, background: C.white, border: `1px solid ${C.border}`, borderRadius: 9, padding: '0 11px', fontSize: 12, color: C.t1, outline: 'none', fontFamily: 'inherit' }}
                  />
                </div>

                {/* Copy */}
                <div style={{ marginBottom: 9 }}>
                  <FieldLabel>Post caption</FieldLabel>
                  <textarea
                    value={selected.copy}
                    onChange={e => updateAsset(selectedId, 'copy', e.target.value)}
                    placeholder="Write your post caption..."
                    rows={3}
                    style={{ width: '100%', background: C.white, border: `1px solid ${C.border}`, borderRadius: 9, padding: '10px 11px', fontSize: 12, color: C.t1, outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                    <Btn small ghost onClick={generateCopy} disabled={isGenerating}>
                      {isGenerating ? <Spinner /> : <Icon d={ICONS.bolt} size={11} color={C.a1} />}
                      {isGenerating ? 'Generating...' : 'Sellix AI rewrite'}
                    </Btn>
                  </div>
                </div>

                {/* CTA */}
                {isPaid && (
                  <div>
                    <FieldLabel>Call to action</FieldLabel>
                    <select
                      value={selected.cta}
                      onChange={e => updateAsset(selectedId, 'cta', e.target.value)}
                      style={{ width: '100%', height: 34, background: C.white, border: `1px solid ${C.border}`, borderRadius: 9, padding: '0 11px', fontSize: 12, color: C.t1, outline: 'none', fontFamily: 'inherit' }}
                    >
                      {CTA_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* Ad settings */}
          {isPaid && (
            <Card>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.t1, marginBottom: 12 }}>Ad settings</div>
              <div style={{ marginBottom: 16 }}>
                <FieldLabel>Target Audience</FieldLabel>
                <AudienceSelector value={audience} onChange={setAudience} />
                {audience === 'custom' && <CustomAudiencePanel />}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div>
                  <FieldLabel>Daily budget ($)</FieldLabel>
                  <input type="number" value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', height: 34, background: C.inner, border: 'none', borderRadius: 9, padding: '0 11px', fontSize: 13, fontWeight: 600, color: C.t1, outline: 'none', fontFamily: 'inherit' }} />
                </div>
                <div>
                  <FieldLabel>Duration (days)</FieldLabel>
                  <input type="number" value={days} onChange={e => setDays(e.target.value)} style={{ width: '100%', height: 34, background: C.inner, border: 'none', borderRadius: 9, padding: '0 11px', fontSize: 13, fontWeight: 600, color: C.t1, outline: 'none', fontFamily: 'inherit' }} />
                </div>
              </div>
              <ReachEstimator budget={budget} days={days} mode={mode} />
            </Card>
          )}

          {/* Schedule */}
          <Card>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.t1, marginBottom: 12 }}>Schedule</div>
            <div style={{ display: 'flex', gap: 7, marginBottom: 14 }}>
              {[
                { id: 'now',      label: 'Post now',      desc: 'Immediate' },
                { id: 'besttime', label: 'Best time',     desc: 'AI Suggested' },
                { id: 'custom',   label: 'Custom',        desc: 'Pick date' },
              ].map(s => (
                <div
                  key={s.id}
                  onClick={() => setSchedule(s.id)}
                  style={{
                    flex: 1, padding: '9px 7px', borderRadius: 11, cursor: 'pointer', textAlign: 'center',
                    background: schedule === s.id ? `${C.a1}12` : C.inner,
                    border: `2px solid ${schedule === s.id ? C.a1 : 'transparent'}`,
                    transition: 'all .14s',
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 700, color: schedule === s.id ? C.a1 : C.t1 }}>{s.label}</div>
                  <div style={{ fontSize: 9, color: schedule === s.id ? C.a1 : C.t3, opacity: 0.8 }}>{s.desc}</div>
                </div>
              ))}
            </div>

            {schedule === 'custom' && (
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                <div style={{ flex: 1.5 }}>
                  <FieldLabel>Date</FieldLabel>
                  <input type="date" value={schedDate} onChange={e => setSchedDate(e.target.value)} style={{ width: '100%', height: 32, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: '0 9px', fontSize: 12, fontFamily: 'inherit', color: C.t1, outline: 'none' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <FieldLabel>Time</FieldLabel>
                  <input type="time" value={schedTime} onChange={e => setSchedTime(e.target.value)} style={{ width: '100%', height: 32, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: '0 9px', fontSize: 12, fontFamily: 'inherit', color: C.t1, outline: 'none' }} />
                </div>
                {isPaid && (
                  <div style={{ flex: 1 }}>
                    <FieldLabel>Repeat</FieldLabel>
                    <select style={{ width: '100%', height: 32, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: '0 9px', fontSize: 12, fontFamily: 'inherit', color: C.t1, outline: 'none' }}>
                      <option>Once</option><option>Weekly</option><option>Monthly</option>
                    </select>
                  </div>
                )}
              </div>
            )}

            {/* AI best time recommendation */}
            {schedule === 'besttime' && isPaid && (
              <div style={{ background: `${C.green}10`, border: `1px solid ${C.green}28`, borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 9 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: `${C.green}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 14 }}>✨</span>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: C.green, marginBottom: 1 }}>Tuesday 6–8 PM — Sellix recommends</div>
                  <div style={{ fontSize: 10, color: C.green, opacity: 0.8 }}>KB Aviation audience peaks weekday evenings · 3.2× avg engagement</div>
                </div>
              </div>
            )}

            {/* Post now info */}
            {schedule === 'now' && (
              <div style={{ background: `${C.a1}08`, border: `1px solid ${C.a1}18`, borderRadius: 10, padding: '9px 11px', fontSize: 11, color: C.a1 }}>
                {isPaid
                  ? 'Campaign will start immediately after review. Usually within 5–10 minutes.'
                  : 'Post goes live immediately to KB Aviation followers.'}
              </div>
            )}
          </Card>
        </div>

        {/* ════ RIGHT COLUMN ════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'sticky', top: 14 }}>

          {/* Live preview */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.t1 }}>Preview</div>
              {mode === 'campaign' && (
                <span style={{ fontSize: 10, color: C.t3 }}>
                  Variant {assets.findIndex(a => a.id === selectedId) + 1} / {n}
                </span>
              )}
            </div>
            {/* Placement tabs */}
            <div style={{ display: 'flex', gap: 5, marginBottom: 11 }}>
              {['Feed', 'Story', 'Reels'].map((t, i) => (
                <div key={t} style={{ padding: '4px 10px', borderRadius: 100, fontSize: 10, fontWeight: i === 0 ? 600 : 400, cursor: 'pointer', background: i === 0 ? '#1877F2' : C.inner, color: i === 0 ? '#fff' : C.t2 }}>
                  {t}
                </div>
              ))}
            </div>
            <FbPreview asset={selected} mode={mode} />
          </Card>

          {/* Summary card */}
          <Card>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.t1, marginBottom: 11 }}>
              {isPaid ? 'Campaign summary' : 'Post summary'}
            </div>

            {isPaid ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { label: 'Mode',        value: modeLabel,                              color: modeColor },
                  { label: 'Daily budget',value: `$${budget}/day`                                        },
                  { label: 'Duration',    value: `${days} days`                                          },
                  { label: 'Total spend', value: `$${total}`,                            bold: true       },
                  { label: 'Variants',    value: `${n} creative${n !== 1 ? 's' : ''}`,  color: n >= 3 ? C.green : C.t2 },
                  { label: 'Audience',    value: AUDIENCES.find(a => a.id === audience)?.label || ''     },
                  { label: 'Schedule',    value: schedule === 'besttime' ? 'Tue 6–8 PM (AI)' : schedule === 'now' ? 'Post now' : 'Scheduled' },
                  { label: 'CTA',         value: cta                                                     },
                ].map(({ label, value, color, bold }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: 11, color: C.t3 }}>{label}</span>
                    <span style={{ fontSize: 11, fontWeight: bold ? 800 : 600, color: color || C.t1 }}>{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {[
                  { label: 'Reaches', value: 'Your followers' },
                  { label: 'Cost',    value: 'Free'           },
                  { label: 'Schedule',value: schedule === 'now' ? 'Post now' : 'Scheduled' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: 11, color: C.t3 }}>{label}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: C.t1 }}>{value}</span>
                  </div>
                ))}
                {/* Upsell nudge */}
                <div style={{ marginTop: 11, background: `${C.green}10`, border: `1px solid ${C.green}28`, borderRadius: 9, padding: '9px 11px', fontSize: 11, color: C.green, display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span>💡</span>
                  <span>Want more reach? <strong style={{ cursor: 'pointer' }} onClick={() => setMode('boost')}>Boost this post →</strong></span>
                </div>
              </>
            )}

            <Btn primary full style={{ marginTop: 14 }} onClick={() => setIsPublished(true)}>
              {mode === 'organic' ? 'Post Now →' : 'Launch Campaign →'}
            </Btn>
          </Card>
        </div>
      </div>

      {/* Spinner keyframes */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
    </PageShell>
  );
}
