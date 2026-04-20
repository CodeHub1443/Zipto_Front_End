# Zipto UI — React JSX Components

Pixel-faithful React implementation of the Zipto SaaS redesign,
matching the reference dashboard aesthetic exactly.

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:5173 — a dev nav bar at the top lets
you switch between all 15 screens (9 web + 6 mobile).

## File map

```
src/
├── tokens.js                         # Design tokens (colors, gradients)
├── styles.js                         # Global CSS string (all shared classes)
├── App.jsx                           # Root — dev navigator + screen router
│
├── components/
│   └── ui.jsx                        # Shared primitives:
│                                     #   RingGauge, IconBadge, ProgressBar,
│                                     #   DualBars, Badge, Button,
│                                     #   Sidebar, Header, PageShell
│
├── pages/
│   ├── Auth.jsx                      # 01 Sign-in / create account
│   ├── Dashboard.jsx                 # 02 Business overview
│   ├── Campaigns.jsx                 # 03 Campaign editor + live preview
│   ├── Sellix.jsx                    # 04 AI Marketing + 05 Sales assistant
│   └── AnalyticsCreditsSettings.jsx  # 06 Analytics · 07 Credits · 08-09 Settings
│
└── mobile/
    └── MobileScreens.jsx             # M01–M06 all six mobile screens
```

## Design system tokens

| Token       | Value      | Usage                            |
|-------------|------------|----------------------------------|
| `C.pageBg`  | `#C4D9EA`  | Powder blue outer background     |
| `C.white`   | `#FFFFFF`  | App shell, cards, sidebar        |
| `C.content` | `#EEF1F6`  | Content area background          |
| `C.inner`   | `#F3F6FB`  | Nested sections inside cards     |
| `C.sbAct`   | `#EAECF3`  | Sidebar active item              |
| `C.a1`      | `#6366F1`  | Indigo — primary accent          |
| `C.a3`      | `#38BDF8`  | Sky blue — ring gauge end        |
| `C.barP`    | `#8B5CF6`  | Purple progress bar              |
| `C.barC`    | `#22D3EE`  | Cyan progress bar                |
| `C.teal`    | `#06B6D4`  | Icon badge — teal                |
| `C.coral`   | `#F97316`  | Icon badge — coral               |
| `C.purple`  | `#7C3AED`  | Icon badge — purple              |
| `C.green`   | `#22C55E`  | Icon badge — green               |

## Key components

### `<RingGauge />`
SVG donut with indigo→sky gradient, tick marks around rim.
```jsx
<RingGauge size={112} pct={0.72} value="$4K" strokeWidth={8} />
```

### `<IconBadge color="teal" size={38}>`
Solid colored circle with white SVG icon inside.

### `<DualBars label1="Sales" pct1={68} label2="Leads" pct2={45} />`
Reference-style stacked purple + cyan bars with legend dots.

### `<PageShell active="home" badgeLabel="KB Aviation">`
Full page layout: powder-blue background, floating white shell,
sidebar + header + content area with diagonal arc decorations.
