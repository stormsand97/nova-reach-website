# Re-Ignite Calculator Page — Design Spec
Date: 2026-04-12

## Overview

Add a standalone Re-Ignite Revenue Calculator page (`#/calculator`) to the NovaReach website, plus a teaser section on the main page that drives traffic to it.

## Routing

The site uses hash-based routing via `window.location.hash` in the `Root` component (`src/App.jsx`). Add a new case:

```
if (hash === '#/calculator') return <CalculatorPage />;
```

No new libraries needed.

## New File: `src/CalculatorPage.jsx`

A self-contained React component that:

- Renders `Navbar` and `Footer` (imported from `App.jsx` or re-exported)
- Implements the Re-Ignite Revenue Calculator UI and logic using `useState`
- Inputs: Average Job Value, List Size, Dormant Months (range), Reactivation Rate (range), Upsell Rate (range)
- Outputs: Recoverable Revenue, Jobs Booked, Jobs with Upsell, Monthly ROI, Payback Period, VS comparison (without vs. with Re-Ignite)
- "Get Started — $297/mo →" CTA navigates to `/#booking` (sets `window.location.hash = '#booking'` then scrolls)
- Styled with inline CSS matching the black/orange/mint aesthetic from the provided calculator HTML
- Colors reconciled with NovaReach tokens: orange accent `#D97653`, dark bg `#0A0A0A`, mint `#7EC8A0`

**Component structure:**
- `CalculatorPage` (page wrapper with Navbar/Footer)
  - `CalcHeader` (badge, title, subtitle)
  - `CalcGrid` (2-col responsive grid)
    - `InputCard` (all sliders and number inputs)
    - `ResultsCard` (big number, stat boxes, verdict bar)
    - `ROICard` (progress bars, VS comparison — spans full width)
    - `CloseBar` (dynamic headline + CTA button)
  - Footnote

**State:** Single `useState` object or individual states for the 5 inputs. All output values are derived (no separate state).

## New Component: `CalculatorTeaser` (in `src/App.jsx`)

Inserted between `<RevenueCalculator />` and `<InstantBookingInfo />` in the main `App` component.

**Visual design:**
- Background: `#0A0A0A` (matches calculator page, creates contrast against surrounding white sections)
- Full-width, ~380–420px tall on desktop
- Three animated stat previews (scroll-triggered with existing GSAP ScrollTrigger):
  - "8–15%" — Industry reactivation rate
  - "$12,750" — Example recoverable revenue (static illustrative number)
  - "43x" — Example ROI multiple
- Headline: "Your past customers are worth more than you think."
- Subheadline: "See exactly how much revenue is sitting dormant in your existing list."
- Single CTA button: "Calculate My Revenue →" → navigates to `#/calculator`
- Orange accent color for stats and button, mint/green for stat labels

**Animation:** Uses existing `gsap.context` + `ScrollTrigger.create` pattern already in the codebase. Stats count up from 0 on scroll entry.

## File Changes Summary

| File | Change |
|------|--------|
| `src/CalculatorPage.jsx` | New file — full calculator page component |
| `src/App.jsx` | Import `CalculatorPage`; add `CalculatorTeaser` component; insert `<CalculatorTeaser />` in `App`; add `#/calculator` route in `Root` |

## Out of Scope

- No changes to the existing `RevenueCalculator` (missed calls) component
- No changes to legal pages
- No new npm packages
- No server-side routing — hash routing only
