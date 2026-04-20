import React, { useState, useRef } from 'react';
import { PhoneFrame, MobileNav } from './MobileScreens';

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

const GRADS = [
  'linear-gradient(135deg,#667eea,#764ba2)',
  'linear-gradient(135deg,#f093fb,#f5576c)',
  'linear-gradient(135deg,#4facfe,#00f2fe)',
  'linear-gradient(135deg,#43e97b,#38f9d7)',
  'linear-gradient(135deg,#fa709a,#fee140)',
  'linear-gradient(135deg,#a18cd1,#fbc2eb)',
];

const CTA_OPTIONS = [
  'Book Now', 'Learn More', 'Send Message', 'Shop Now',
  'Sign Up', 'Get Quote', 'Download', 'Watch Video',
];

const ASSET_FORMATS = [
  { type: 'image',    emoji: '🖼️', label: 'Image',    desc: 'Single photo or graphic'      },
  { type: 'video',    emoji: '🎬', label: 'Video',    desc: 'Short clip or ad film'         },
  { type: 'carousel', emoji: '🎞️', label: 'Carousel', desc: 'Multiple swipeable images'    },
  { type: 'story',    emoji: '📱', label: 'Story',    desc: 'Full-screen vertical 9:16'     },
  { type: 'reel',     emoji: '🎥', label: 'Reel',     desc: 'Short-form video loop'         },
];

const AI_COPIES = [
  {
    headline: 'Summer Flights from $199!',
    copy: '✈️ Summer is calling — save up to 30% before July 31. Limited seats! 🌴 #KBAviation',
  },
  {
    headline: 'New Route: Seoul ↔ Dubai ✈️',
    copy: '🌍 Brand new Seoul–Dubai route now live. Premium comfort, competitive fares. Book today!',
  },
  {
    headline: 'Your Next Adventure Awaits ✈️',
    copy: '🌟 Join 50,000+ happy travelers who chose KB Aviation. 15 global destinations!',
  },
];

let uid = 10;

const INITIAL_ASSETS = [
  {
    id: 1, type: 'image', name: 'Summer Banner',
    grad: GRADS[0], headline: 'Save 30% This Summer',
    copy: '✈️ Save up to 30% — book your dream flight now! #KBAviation',
    cta: 'Book Now', score: 4,
  },
  {
    id: 2, type: 'video', name: 'Route Reel',
    grad: GRADS[1], headline: 'Seoul–Dubai Daily',
    copy: 'Experience our new Seoul–Dubai route. Premium comfort, book today!',
    cta: 'Learn More', score: 5,
  },
];

// ─── Tiny icon helper ─────────────────────────────────────────────────────────
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
  down:  'M6 9l6 6 6-6',
  globe: 'M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20',
};

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

// ─── Pill select button ───────────────────────────────────────────────────────
function Pill({ children, on, onClick, color }) {
  const ac = color || C.a1;
  return (
    <div
      onClick={onClick}
      style={{
        padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600,
        cursor: 'pointer', userSelect: 'none', flexShrink: 0,
        background: on ? `${ac}14` : C.inner,
        color: on ? ac : C.t2,
        border: `2px solid ${on ? ac : 'transparent'}`,
        transition: 'all .14s',
      }}
    >
      {children}
    </div>
  );
}

// ─── Bottom Sheet overlay ────────────────────────────────────────────────────
function Sheet({ title, children, onClose }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 50, background: 'rgba(20,25,45,.45)',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }}>
      <div style={{
        background: C.white, borderRadius: '24px 24px 0 0',
        padding: '0 0 20px', maxHeight: '82%',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        animation: 'sheetin .28s cubic-bezier(.22,.68,0,1.2)',
      }}>
        {/* Drag handle */}
        <div style={{ padding: '12px 18px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: C.border }} />
        </div>
        {/* Title row */}
        <div style={{ padding: '8px 18px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: C.t1 }}>{title}</span>
          <div
            onClick={onClose}
            style={{ width: 28, height: 28, borderRadius: '50%', background: C.inner, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <Icon d={ICONS.x} size={12} color={C.t2} strokeWidth={2.5} />
          </div>
        </div>
        <div style={{ overflowY: 'auto', padding: '0 18px', flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}

// ─── Accordion section ────────────────────────────────────────────────────────
function Section({ label, badge, done, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={{ background: C.white, borderRadius: 17, overflow: 'hidden', marginBottom: 10, boxShadow: '0 2px 12px rgba(14,25,55,.06)' }}>
      {/* Header */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{ padding: '13px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', userSelect: 'none' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Done / open indicator */}
          {done ? (
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon d={ICONS.check} size={8} color="white" strokeWidth={3} />
            </div>
          ) : (
            <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${open ? C.a1 : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: open ? C.a1 : 'transparent', transition: 'background .14s' }} />
            </div>
          )}
          <span style={{ fontSize: 13, fontWeight: 600, color: C.t1 }}>{label}</span>
          {badge && (
            <span style={{ fontSize: 10, background: `${C.a1}14`, color: C.a1, padding: '2px 7px', borderRadius: 100, fontWeight: 600 }}>
              {badge}
            </span>
          )}
        </div>
        <div style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
          <Icon d={ICONS.down} size={14} color={C.t3} strokeWidth={2} />
        </div>
      </div>
      {/* Expandable content */}
      {open && (
        <div style={{ padding: '0 14px 14px', animation: 'slidein .2s ease' }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Compact reach estimator ─────────────────────────────────────────────────
function ReachEstimator({ budget, days }) {
  const b = parseInt(budget) || 5;
  const d = parseInt(days) || 5;
  const total = b * d;
  const lo  = Math.round(b * 320 * 0.8).toLocaleString();
  const hi  = Math.round(b * 320 * 1.6).toLocaleString();
  const tot = Math.round(total * 320 * 1.2).toLocaleString();

  return (
    <div style={{ background: `${C.a1}08`, border: `1px solid ${C.a1}20`, borderRadius: 13, padding: '11px 13px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
        <div style={{ width: 18, height: 18, borderRadius: 5, background: `${C.a1}14`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon d={ICONS.globe} size={9} color={C.a1} strokeWidth={2} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: C.a1 }}>Estimated impact</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 7, marginBottom: 8 }}>
        {[
          { label: 'Daily reach', value: `${lo}–${hi}`, unit: 'people'       },
          { label: 'Total reach', value: `~${tot}`,     unit: 'people'       },
          { label: 'Total spend', value: `$${total}`,   unit: `${d} days`    },
        ].map(({ label, value, unit }) => (
          <div key={label} style={{ background: C.white, borderRadius: 9, padding: '7px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: 8, color: C.t3, textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 1 }}>{label}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.t1 }}>{value}</div>
            <div style={{ fontSize: 9, color: C.t3 }}>{unit}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 10, color: C.t2, display: 'flex', alignItems: 'flex-start', gap: 4 }}>
        <Icon d={ICONS.bolt} size={9} color={C.amber} strokeWidth={2} />
        <span><strong style={{ color: C.amber }}>Sellix:</strong> $10/day for 7 days is optimal for travel brands.</span>
      </div>
    </div>
  );
}

// ─── Asset mini card ──────────────────────────────────────────────────────────
function AssetMiniCard({ asset, active, onSelect, onClone, onRemove, total }) {
  return (
    <div
      id={`mob-asset-${asset.id}`}
      onClick={onSelect}
      style={{
        width: 130, flexShrink: 0, borderRadius: 13,
        border: `2px solid ${active ? C.a1 : C.border}`,
        background: active ? '#EEF2FF' : C.white,
        cursor: 'pointer', overflow: 'hidden',
        boxShadow: active ? `0 0 0 3px ${C.a1}18` : 'none',
        transition: 'all .15s', userSelect: 'none',
      }}
    >
      <div style={{ height: 74, background: asset.grad, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: 4, left: 4, background: 'rgba(0,0,0,.35)', borderRadius: 4, padding: '2px 5px', fontSize: 8, fontWeight: 700, color: '#fff' }}>
          {(asset.type || 'IMAGE').toUpperCase()}
        </div>
        {active && (
          <div style={{ position: 'absolute', top: 4, right: 4, width: 14, height: 14, borderRadius: '50%', background: C.a1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon d={ICONS.check} size={6} color="white" strokeWidth={3} />
          </div>
        )}
        {asset.type === 'video' && (
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(0,0,0,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon d={ICONS.play} size={9} color="white" strokeWidth={0} />
          </div>
        )}
        {/* Action buttons (always visible for simplicity on mobile) */}
        <div style={{ position: 'absolute', bottom: 3, right: 3, display: 'flex', gap: 2 }}>
          <div
            onClick={e => { e.stopPropagation(); onClone(); }}
            style={{ width: 17, height: 17, borderRadius: 4, background: 'rgba(0,0,0,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <Icon d={ICONS.copy} size={7} color="white" strokeWidth={2} />
          </div>
          {total > 1 && (
            <div
              onClick={e => { e.stopPropagation(); onRemove(); }}
              style={{ width: 17, height: 17, borderRadius: 4, background: 'rgba(239,68,68,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <Icon d={ICONS.x} size={7} color="white" strokeWidth={2.5} />
            </div>
          )}
        </div>
      </div>
      <div style={{ padding: '6px 7px' }}>
        <div style={{ fontSize: 10, fontWeight: 500, color: active ? C.a1 : C.t1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 2 }}>
          {asset.name}
        </div>
        <div style={{ display: 'flex', gap: 2 }}>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: i < (asset.score || 0) ? C.a1 : '#E5EAF3' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Facebook mini preview ────────────────────────────────────────────────────
function FbPreviewMini({ asset, isPaid }) {
  if (!asset) return null;
  return (
    <div style={{ borderRadius: 11, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
      <div style={{ padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 7 }}>
        <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#1877F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 8, flexShrink: 0 }}>KB</div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600 }}>KB Aviation</div>
          <div style={{ fontSize: 9, color: C.t3 }}>{isPaid ? 'Sponsored · 🌐' : 'Just now · 🌐'}</div>
        </div>
      </div>
      <div style={{ padding: '0 10px 8px', fontSize: 11, color: C.t1, lineHeight: 1.6, maxHeight: 38, overflow: 'hidden' }}>
        {asset.copy || 'Your post copy here...'}
      </div>
      <div style={{ height: 100, background: asset.grad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {asset.type === 'video' && (
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(0,0,0,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon d={ICONS.play} size={11} color="white" strokeWidth={0} />
          </div>
        )}
      </div>
      {isPaid && (
        <div style={{ padding: '7px 10px', background: '#F5F6F8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 10, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
            {asset.headline || 'Your headline'}
          </div>
          <div style={{ padding: '4px 9px', background: '#1877F2', borderRadius: 5, fontSize: 10, fontWeight: 600, color: '#fff', marginLeft: 7, flexShrink: 0, whiteSpace: 'nowrap' }}>
            {asset.cta || 'Book Now'}
          </div>
        </div>
      )}
      <div style={{ padding: '5px 10px', display: 'flex' }}>
        {['👍', '💬', '↗'].map((a, i) => (
          <div key={a} style={{ flex: 1, textAlign: 'center', fontSize: 11, color: C.t3, padding: '2px 0', borderRight: i < 2 ? `1px solid ${C.border}` : 'none' }}>
            {a}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Mode selection screen ────────────────────────────────────────────────────
function ModeSelector({ onSelect }) {
  const modes = [
    {
      id: 'organic', emoji: '📝', label: 'Organic Post', color: C.green, badge: null,
      desc: 'Share to your followers for free',
      tags: ['Free', 'Builds community', 'Page followers only'],
    },
    {
      id: 'boost', emoji: '⚡', label: 'Boost Post', color: C.coral, badge: 'Quick',
      desc: 'Reach beyond followers with a paid ad',
      tags: ['From $5/day', 'Simple setup', 'New audiences'],
    },
    {
      id: 'campaign', emoji: '🎯', label: 'Run Campaign', color: C.a1, badge: 'Recommended',
      desc: 'Goal-based campaign, multiple creatives',
      tags: ['Multiple variants', 'AI targeting', 'Meta optimizes'],
    },
  ];

  return (
    <div style={{ overflowY: 'auto', maxHeight: 760, padding: '16px 16px 30px' }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: C.t3, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 3 }}>New post</div>
      <div style={{ fontSize: 20, fontWeight: 300, color: C.t1, marginBottom: 18 }}>
        How to <strong style={{ fontWeight: 800 }}>share this?</strong>
      </div>
      {modes.map(({ id, emoji, label, color, badge, desc, tags }) => (
        <div
          key={id}
          onClick={() => onSelect(id)}
          style={{
            background: C.white, borderRadius: 18, padding: 16, marginBottom: 10,
            cursor: 'pointer', userSelect: 'none',
            border: `2px solid ${C.border}`, position: 'relative', overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(14,25,55,.06)',
          }}
        >
          {badge && (
            <div style={{ position: 'absolute', top: 11, right: 11, fontSize: 9, fontWeight: 700, background: `${color}15`, color, padding: '2px 7px', borderRadius: 100 }}>
              {badge.toUpperCase()}
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `${color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
              {emoji}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.t1, marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 11, color: C.t2, lineHeight: 1.4 }}>{desc}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {tags.map(tag => (
              <span key={tag} style={{ fontSize: 10, background: `${color}10`, color, padding: '3px 8px', borderRadius: 100, fontWeight: 600 }}>
                {tag}
              </span>
            ))}
          </div>
          <div style={{ position: 'absolute', bottom: -20, right: -20, width: 70, height: 70, borderRadius: '50%', background: `${color}08` }} />
        </div>
      ))}
      <div style={{ fontSize: 11, color: C.t3, textAlign: 'center', marginTop: 8 }}>
        Not sure? <span style={{ color: C.a1, fontWeight: 600 }}>Ask Sellix AI →</span>
      </div>
    </div>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────
function SuccessScreen({ mode, assetCount, budget, days, onReset }) {
  const total = budget * days;
  return (
    <div style={{ padding: 48, textAlign: 'center', minHeight: 560, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
        <Icon d={ICONS.check} size={28} color={C.green} strokeWidth={2.5} />
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
        {mode === 'organic' ? 'Post published!' : 'Campaign launched!'}
      </div>
      <div style={{ fontSize: 13, color: C.t2, marginBottom: 28, lineHeight: 1.6 }}>
        {mode === 'organic'
          ? "Shared to KB Aviation's followers."
          : `${assetCount} variant${assetCount !== 1 ? 's' : ''} sent to Meta · Total $${total}`}
      </div>
      <div
        onClick={onReset}
        style={{ height: 48, background: `linear-gradient(135deg, ${C.a2}, ${C.a1})`, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: `0 5px 14px ${C.a1}40`, width: '100%' }}
      >
        Create another
      </div>
    </div>
  );
}

// ─── Mobile Campaign Tab ──────────────────────────────────────────────────────
export default function MobileCampaignTab() {
  // Mode
  const [mode, setMode] = useState(null); // null | 'organic' | 'boost' | 'campaign'

  // Assets
  const [assets,       setAssets]       = useState(INITIAL_ASSETS);
  const [selectedId,   setSelectedId]   = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const deckRef = useRef(null);

  // Ad settings
  const [audience,  setAudience]  = useState('followers');
  const [budget,    setBudget]    = useState(10);
  const [days,      setDays]      = useState(7);
  const [cta,       setCta]       = useState('Book Now');
  const [goal,      setGoal]      = useState('messages');
  const [schedule,  setSchedule]  = useState('besttime');
  const [schedDate, setSchedDate] = useState('2026-04-22');
  const [schedTime, setSchedTime] = useState('18:00');

  // UI state
  const [sheet,       setSheet]       = useState(null); // 'preview' | 'format' | 'cta'
  const [isPublished, setIsPublished] = useState(false);

  // Derived
  const selected  = assets.find(a => a.id === selectedId) || assets[0];
  const n         = assets.length;
  const total     = budget * days;
  const isPaid    = mode === 'boost' || mode === 'campaign';
  const modeLabel = mode === 'organic' ? 'Organic Post' : mode === 'boost' ? 'Boost Post' : 'Campaign';
  const modeColor = mode === 'organic' ? C.green : mode === 'boost' ? C.coral : C.a1;

  // ── Asset helpers ──────────────────────────────────────────────────────────
  const updateAsset = (id, field, value) =>
    setAssets(prev => prev.map(a => a.id === id ? { ...a, [field]: value } : a));

  const addAsset = (type) => {
    const id = uid++;
    setAssets(prev => [...prev, {
      id, type,
      name:     `${type.charAt(0).toUpperCase() + type.slice(1)} ${prev.length + 1}`,
      grad:     GRADS[prev.length % GRADS.length],
      headline: '', copy: '', cta: 'Book Now', score: 0,
    }]);
    setSelectedId(id);
    setSheet(null);
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
      <div style={{ background: C.content, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <PhoneFrame>
          <SuccessScreen mode={mode} assetCount={n} budget={budget} days={days} onReset={reset} />
        </PhoneFrame>
      </div>
    );
  }

  if (!mode) {
    return (
      <div style={{ background: C.content, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <PhoneFrame>
          <ModeSelector onSelect={setMode} />
        </PhoneFrame>
      </div>
    );
  }

  return (
    <div style={{ background: C.content, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <PhoneFrame>
        <div style={{ fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>

          {/* ─── Sub-header ─── */}
          <div style={{ background: C.white, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <span onClick={() => setMode(null)} style={{ fontSize: 12, color: C.a1, fontWeight: 600, cursor: 'pointer' }}>← Back</span>
              <span style={{ fontSize: 9, fontWeight: 700, background: `${modeColor}14`, color: modeColor, padding: '2px 7px', borderRadius: 100 }}>
                {modeLabel.toUpperCase()}
              </span>
            </div>
            {/* Preview trigger */}
            <div
              onClick={() => setSheet('preview')}
              style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: C.a1, cursor: 'pointer', background: `${C.a1}10`, padding: '5px 10px', borderRadius: 100 }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.a1} strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Preview
            </div>
          </div>

          {/* ─── Scrollable body ─── */}
          <div style={{ flex: 1, padding: '12px 14px 30px', overflowY: 'auto' }}>
            {/* ... rest of the existing scrollable content ... */}

        {/* Platform bar */}
        <div style={{ background: C.white, borderRadius: 17, padding: '10px 13px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, boxShadow: '0 2px 12px rgba(14,25,55,.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 22, height: 22, background: '#1877F2', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="11" height="11" viewBox="0 0 24 24">
                <path fill="white" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </div>
            <span style={{ fontSize: 12, fontWeight: 500 }}>Facebook</span>
            <span style={{ fontSize: 9, background: '#ECFDF5', color: '#059669', padding: '2px 6px', borderRadius: 100, fontWeight: 600 }}>Connected ✓</span>
          </div>
          <span style={{ fontSize: 11, color: C.a1, fontWeight: 500, cursor: 'pointer' }}>Change</span>
        </div>

        {/* ── Content section ── */}
        <Section
          label={mode === 'campaign' ? 'Content Deck' : 'Content'}
          badge={mode === 'campaign' ? `${n} variant${n !== 1 ? 's' : ''}` : 'Required'}
          done={!!(selected?.copy)}
          defaultOpen
        >
          {/* Optimization tip — campaign only */}
          {mode === 'campaign' && (
            <div style={{ fontSize: 11, color: n >= 3 ? C.green : C.coral, fontWeight: 500, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: n >= 3 ? C.green : C.coral, flexShrink: 0 }} />
              {n >= 3 ? `${n} variants — Meta auto-optimizes` : `Add ${3 - n} more → unlock Meta's auto-optimization`}
            </div>
          )}

          {/* Deck strip */}
          <div ref={deckRef} style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, marginBottom: 12, scrollBehavior: 'smooth' }}>
            {assets.map(asset => (
              <AssetMiniCard
                key={asset.id}
                asset={asset}
                active={asset.id === selectedId}
                total={n}
                onSelect={() => setSelectedId(asset.id)}
                onClone={() => cloneAsset(asset)}
                onRemove={() => removeAsset(asset.id)}
              />
            ))}
            {/* Add card — campaign mode only */}
            {mode === 'campaign' && (
              <div
                onClick={() => setSheet('format')}
                style={{ width: 130, height: 112, flexShrink: 0, borderRadius: 13, border: `2px dashed ${C.border}`, background: C.inner, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, userSelect: 'none' }}
              >
                <div style={{ width: 26, height: 26, borderRadius: 8, background: `${C.border}80`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon d={ICONS.plus} size={12} color={C.t3} strokeWidth={2.5} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, color: C.t3 }}>Add variant</span>
              </div>
            )}
          </div>

          {/* Asset editor */}
          {selected && (
            <div style={{ background: C.inner, borderRadius: 12, padding: '10px 12px' }}>
              {/* Name + score */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <input
                  value={selected.name}
                  onChange={e => updateAsset(selectedId, 'name', e.target.value)}
                  style={{ border: 'none', background: 'transparent', fontSize: 12, fontWeight: 600, color: C.t1, outline: 'none', fontFamily: 'inherit', flex: 1 }}
                />
                {selected.score >= 4 && (
                  <span style={{ fontSize: 9, background: '#ECFDF5', color: '#059669', padding: '2px 5px', borderRadius: 100, fontWeight: 600, flexShrink: 0 }}>High performer</span>
                )}
              </div>

              {/* Upload */}
              <div style={{ border: `2px dashed ${C.border}`, borderRadius: 10, padding: 10, display: 'flex', alignItems: 'center', gap: 10, background: C.white, cursor: 'pointer', marginBottom: 10 }}>
                <div style={{ width: 44, height: 32, background: selected.grad, borderRadius: 6, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: C.t1, marginBottom: 1 }}>
                    Upload creative <span style={{ fontSize: 9, color: C.green }}>✓ Ready</span>
                  </div>
                  <div style={{ fontSize: 10, color: C.t3 }}>
                    {selected.type === 'video' ? 'MP4 up to 4 GB' : 'JPG, PNG up to 30 MB'}
                  </div>
                </div>
                <div style={{ padding: '5px 10px', background: C.inner, borderRadius: 8, fontSize: 11, fontWeight: 500, color: C.t2, flexShrink: 0, cursor: 'pointer' }}>Browse</div>
              </div>

              {/* Headline — paid only */}
              {isPaid && (
                <div style={{ marginBottom: 9 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: C.t3, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 3 }}>Headline</div>
                  <input
                    value={selected.headline}
                    onChange={e => updateAsset(selectedId, 'headline', e.target.value)}
                    placeholder="e.g. Save 30% on Summer Flights"
                    style={{ width: '100%', height: 34, background: C.white, border: `1px solid ${C.border}`, borderRadius: 9, padding: '0 11px', fontSize: 12, color: C.t1, outline: 'none', fontFamily: 'inherit' }}
                  />
                </div>
              )}

              {/* Copy */}
              <div style={{ marginBottom: isPaid ? 9 : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: C.t3, textTransform: 'uppercase', letterSpacing: '.05em' }}>Post copy</div>
                  <span style={{ fontSize: 9, color: C.t3 }}>{(selected.copy || '').length}/500</span>
                </div>
                <textarea
                  value={selected.copy}
                  onChange={e => updateAsset(selectedId, 'copy', e.target.value)}
                  rows={2}
                  placeholder="Write copy, or let Sellix AI write it..."
                  style={{ width: '100%', background: C.white, border: `1px solid ${C.border}`, borderRadius: 9, padding: '9px 11px', fontSize: 12, color: C.t1, resize: 'none', outline: 'none', fontFamily: 'inherit', lineHeight: 1.55 }}
                />
              </div>

              {/* CTA + AI — paid only */}
              {isPaid && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div
                    onClick={() => setSheet('cta')}
                    style={{ padding: '8px 13px', background: C.white, border: `1px solid ${C.border}`, borderRadius: 9, fontSize: 12, fontWeight: 500, color: C.t1, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}
                  >
                    {cta} <Icon d={ICONS.down} size={10} color={C.t3} strokeWidth={2} />
                  </div>
                  <div
                    onClick={generateCopy}
                    style={{ flex: 1, height: 36, background: `linear-gradient(135deg, ${C.a2}, ${C.a1})`, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', gap: 5, boxShadow: `0 3px 10px ${C.a1}28` }}
                  >
                    {isGenerating ? <><Spinner /> Writing...</> : <>✨ Sellix AI</>}
                  </div>
                </div>
              )}

              {/* AI button — organic only */}
              {!isPaid && (
                <div
                  onClick={generateCopy}
                  style={{ width: '100%', height: 38, background: `linear-gradient(135deg, ${C.a2}, ${C.a1})`, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', gap: 5, boxShadow: `0 3px 10px ${C.a1}28`, marginTop: 9 }}
                >
                  {isGenerating ? <><Spinner /> Writing...</> : <>✨ Write with Sellix AI</>}
                </div>
              )}
            </div>
          )}
        </Section>

        {/* ── Ad Settings — paid only ── */}
        {isPaid && (
          <Section label="Ad Settings" badge="Required" done={!!(audience && budget && days)} defaultOpen>

            {/* Audience */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: C.t3, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>Target audience</div>
              {[
                { id: 'followers', emoji: '👥', label: 'People like followers',  desc: 'Meta lookalike',          color: C.a1     },
                { id: 'interest',  emoji: '✈️', label: 'Travel enthusiasts',     desc: 'AI-suggested from brand', color: C.teal   },
                { id: 'custom',    emoji: '🎯', label: 'Custom audience',         desc: 'Set age, gender & location', color: C.purple },
              ].map(({ id, emoji, label, desc, color }) => (
                <div
                  key={id}
                  onClick={() => setAudience(id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 11px', borderRadius: 11, cursor: 'pointer', userSelect: 'none',
                    background: audience === id ? `${color}10` : C.inner,
                    border: `2px solid ${audience === id ? color : 'transparent'}`,
                    marginBottom: 6, transition: 'all .14s',
                  }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: 9, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>{emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: audience === id ? 700 : 500, color: audience === id ? color : C.t1 }}>{label}</div>
                    <div style={{ fontSize: 10, color: audience === id ? color : C.t3, opacity: audience === id ? 0.8 : 1 }}>{desc}</div>
                  </div>
                  {audience === id && (
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon d={ICONS.check} size={7} color="white" strokeWidth={3} />
                    </div>
                  )}
                </div>
              ))}

              {/* Custom fields */}
              {audience === 'custom' && (
                <div style={{ background: C.inner, borderRadius: 10, padding: '11px 12px', marginTop: 4 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 9, fontWeight: 700, color: C.t3, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 3 }}>Age</div>
                      <select style={{ width: '100%', height: 32, background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: '0 9px', fontSize: 11, color: C.t1, outline: 'none', fontFamily: 'inherit' }}>
                        <option>18–65+</option><option>18–34</option><option>25–44</option><option>35–65+</option>
                      </select>
                    </div>
                    <div>
                      <div style={{ fontSize: 9, fontWeight: 700, color: C.t3, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 3 }}>Gender</div>
                      <select style={{ width: '100%', height: 32, background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: '0 9px', fontSize: 11, color: C.t1, outline: 'none', fontFamily: 'inherit' }}>
                        <option>All</option><option>Men</option><option>Women</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: C.t3, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 3 }}>Location</div>
                    <input defaultValue="United States" style={{ width: '100%', height: 32, background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: '0 9px', fontSize: 11, color: C.t1, outline: 'none', fontFamily: 'inherit' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Budget */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: C.t3, textTransform: 'uppercase', letterSpacing: '.05em' }}>Daily budget</div>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.t1 }}>${budget}/day</span>
              </div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                {[5, 10, 20, 50].map(v => <Pill key={v} on={budget === v} onClick={() => setBudget(v)}>${v}</Pill>)}
              </div>
              {/* Slider */}
              <div style={{ background: C.inner, borderRadius: 9, padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 9 }}>
                <span style={{ fontSize: 10, color: C.t3, flexShrink: 0 }}>Custom</span>
                <input
                  type="range" min={1} max={100} step={1} value={budget}
                  onChange={e => setBudget(parseInt(e.target.value))}
                  style={{ flex: 1, accentColor: C.a1, height: 4 }}
                />
                <span style={{ fontSize: 12, fontWeight: 700, color: C.t1, minWidth: 34, textAlign: 'right' }}>${budget}</span>
              </div>
            </div>

            {/* Duration */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: C.t3, textTransform: 'uppercase', letterSpacing: '.05em' }}>Duration</div>
                <span style={{ fontSize: 10, color: C.t3 }}>
                  Ends {new Date(Date.now() + days * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {[3, 5, 7, 14, 30].map(v => <Pill key={v} on={days === v} onClick={() => setDays(v)}>{v} days</Pill>)}
              </div>
            </div>

            {/* Live reach estimator */}
            <ReachEstimator budget={budget} days={days} />
          </Section>
        )}

        {/* ── Campaign goal — campaign mode only ── */}
        {mode === 'campaign' && (
          <Section label="Campaign goal" done={!!goal} defaultOpen>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {[
                { id: 'messages', label: 'Get messages', desc: 'Start conversations', color: C.a1     },
                { id: 'views',    label: 'Get views',    desc: 'Reach & awareness',   color: C.purple  },
                { id: 'sales',    label: 'Drive sales',  desc: 'Website traffic',     color: C.green   },
              ].map(({ id, label, desc, color }) => (
                <div
                  key={id}
                  onClick={() => setGoal(id)}
                  style={{
                    padding: '10px 12px', borderRadius: 11, cursor: 'pointer', userSelect: 'none',
                    background: goal === id ? `${color}10` : C.inner,
                    border: `2px solid ${goal === id ? color : 'transparent'}`,
                    transition: 'all .14s', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 12, fontWeight: goal === id ? 700 : 500, color: goal === id ? color : C.t1, marginBottom: 1 }}>{label}</div>
                    <div style={{ fontSize: 10, color: goal === id ? color : C.t3, opacity: goal === id ? 0.8 : 1 }}>{desc}</div>
                  </div>
                  {goal === id && (
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon d={ICONS.check} size={7} color="white" strokeWidth={3} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ── Schedule ── */}
        <Section label="Schedule" done={schedule === 'now' || schedule === 'besttime'} defaultOpen>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 10 }}>
            {(isPaid
              ? [['now','Post now','Immediately'],['schedule','Pick date & time','Choose specific time'],['besttime','AI best time','Sellix picks the peak']]
              : [['now','Post now','Immediately'],['schedule','Pick date & time','Choose specific time']]
            ).map(([value, label, desc]) => (
              <div
                key={value}
                onClick={() => setSchedule(value)}
                style={{
                  padding: '10px 12px', borderRadius: 11, cursor: 'pointer', userSelect: 'none',
                  background: schedule === value ? `${C.a1}10` : C.inner,
                  border: `2px solid ${schedule === value ? C.a1 : 'transparent'}`,
                  transition: 'all .14s', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: 12, fontWeight: schedule === value ? 700 : 500, color: schedule === value ? C.a1 : C.t1, marginBottom: 1 }}>{label}</div>
                  <div style={{ fontSize: 10, color: schedule === value ? C.a1 : C.t3, opacity: 0.85 }}>{desc}</div>
                </div>
                {schedule === value && (
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: C.a1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon d={ICONS.check} size={7} color="white" strokeWidth={3} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {schedule === 'schedule' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, background: C.inner, borderRadius: 10, padding: '10px 11px' }}>
              {[
                { label: 'Date', type: 'date', value: schedDate, onChange: setSchedDate },
                { label: 'Time', type: 'time', value: schedTime, onChange: setSchedTime },
              ].map(({ label, type, value, onChange }) => (
                <div key={label}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: C.t3, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 3 }}>{label}</div>
                  <input
                    type={type} value={value} onChange={e => onChange(e.target.value)}
                    style={{ width: '100%', height: 32, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: '0 9px', fontSize: 11, fontFamily: 'inherit', color: C.t1, outline: 'none' }}
                  />
                </div>
              ))}
            </div>
          )}

          {schedule === 'besttime' && isPaid && (
            <div style={{ background: `${C.green}10`, border: `1px solid ${C.green}28`, borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `${C.green}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 14 }}>✨</div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.green, marginBottom: 1 }}>Tuesday 6–8 PM</div>
                <div style={{ fontSize: 10, color: C.green, opacity: 0.8 }}>3.2× avg engagement for your audience</div>
              </div>
            </div>
          )}

          {schedule === 'now' && (
            <div style={{ background: `${C.a1}08`, border: `1px solid ${C.a1}18`, borderRadius: 10, padding: '9px 11px', fontSize: 11, color: C.a1 }}>
              {isPaid ? 'Campaign starts in ~5–10 minutes after review.' : 'Post goes live to KB Aviation followers immediately.'}
            </div>
          )}
        </Section>

        {/* Organic upsell nudge */}
        {mode === 'organic' && (
          <div style={{ background: C.white, borderRadius: 17, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 9, marginTop: 4, boxShadow: '0 2px 12px rgba(14,25,55,.06)' }}>
            <span style={{ fontSize: 16 }}>💡</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.t1, marginBottom: 2 }}>Want more reach?</div>
              <div style={{ fontSize: 10, color: C.t2 }}>Boost this post for as little as $5/day</div>
            </div>
            <div
              onClick={() => setMode('boost')}
              style={{ padding: '6px 12px', background: `linear-gradient(135deg, ${C.a2}, ${C.a1})`, borderRadius: 8, fontSize: 11, fontWeight: 600, color: '#fff', cursor: 'pointer', flexShrink: 0, boxShadow: `0 3px 8px ${C.a1}28` }}
            >
              Boost →
            </div>
          </div>
        )}
      </div>

      {/* ─── Sticky bottom bar ─── */}
      <div style={{
        background: C.white, borderTop: `1px solid ${C.border}`,
        padding: '12px 16px 24px', flexShrink: 0, zIndex: 10,
      }}>
        {isPaid && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: C.t2 }}>
              Total: <strong style={{ color: C.t1 }}>${total}</strong> over {days} days
            </div>
            <span style={{ fontSize: 10, color: C.t3 }}>{n} variant{n !== 1 ? 's' : ''}</span>
          </div>
        )}
        <div
          onClick={() => setIsPublished(true)}
          style={{ width: '100%', height: 50, background: `linear-gradient(135deg, ${C.a2}, ${C.a1})`, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: `0 5px 14px ${C.a1}38` }}
        >
          {mode === 'organic' ? 'Post Now →' : 'Launch Campaign →'}
        </div>
      </div>

      {/* ─── Bottom Sheets ─── */}

      {/* Preview sheet */}
      {sheet === 'preview' && (
        <Sheet title="Post preview" onClose={() => setSheet(null)}>
          <div style={{ padding: '10px 0 20px' }}>
            <div style={{ display: 'flex', gap: 5, marginBottom: 12 }}>
              {['Feed', 'Story', 'Reels'].map((t, i) => (
                <div key={t} style={{ padding: '4px 11px', borderRadius: 100, fontSize: 11, fontWeight: i === 0 ? 600 : 400, cursor: 'pointer', background: i === 0 ? '#1877F2' : C.inner, color: i === 0 ? '#fff' : C.t2 }}>
                  {t}
                </div>
              ))}
            </div>
            <FbPreviewMini asset={selected} isPaid={isPaid} />
            {/* Variant strip — campaign only */}
            {mode === 'campaign' && n > 1 && (
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.t1, marginBottom: 8 }}>All variants</div>
                <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 4 }}>
                  {assets.map(asset => (
                    <div
                      key={asset.id}
                      onClick={() => { setSelectedId(asset.id); setSheet(null); }}
                      style={{ flexShrink: 0, cursor: 'pointer' }}
                    >
                      <div style={{ width: 56, height: 40, background: asset.grad, borderRadius: 7, border: `2px solid ${asset.id === selectedId ? C.a1 : 'transparent'}`, marginBottom: 3 }} />
                      <div style={{ fontSize: 9, color: asset.id === selectedId ? C.a1 : C.t3, textAlign: 'center', fontWeight: asset.id === selectedId ? 700 : 400, width: 56, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {asset.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Sheet>
      )}

      {/* Format picker sheet */}
      {sheet === 'format' && (
        <Sheet title="Choose format" onClose={() => setSheet(null)}>
          <div style={{ padding: '8px 0 20px' }}>
            {ASSET_FORMATS.map(({ type, emoji, label, desc }) => (
              <div
                key={type}
                onClick={() => addAsset(type)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer' }}
              >
                <div style={{ fontSize: 22 }}>{emoji}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: C.t1 }}>{label}</div>
                  <div style={{ fontSize: 11, color: C.t3 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Sheet>
      )}

      {/* CTA picker sheet */}
      {sheet === 'cta' && (
        <Sheet title="CTA button" onClose={() => setSheet(null)}>
          <div style={{ padding: '8px 0 20px' }}>
            {CTA_OPTIONS.map(option => (
              <div
                key={option}
                onClick={() => { setCta(option); updateAsset(selectedId, 'cta', option); setSheet(null); }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer' }}
              >
                <span style={{ fontSize: 13, fontWeight: cta === option ? 600 : 400, color: cta === option ? C.a1 : C.t1 }}>
                  {option}
                </span>
                {cta === option && <Icon d={ICONS.check} size={14} color={C.a1} strokeWidth={2.5} />}
              </div>
            ))}
          </div>
        </Sheet>
      )}

        </div>
        <MobileNav active="campaigns" />
      </PhoneFrame>

      {/* Keyframes */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slidein { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes sheetin { from { opacity: 0; transform: translateY(100%); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
