

# Join Momentum Inc — Homepage Build Plan

## Design System Foundation
- **Dark tactical color palette**: Black (#0a0a0a), charcoal (#0f0f0f), deep grey (#1a1a1a), operational red (#dc2626), white/grey text hierarchy
- **Typography**: Space Grotesk for headings (geometric, authoritative), IBM Plex Sans for body, JetBrains Mono for monospace accents (stats, labels)
- **Spacing system**: 8px base unit, 120px section padding (desktop), 60px (mobile), 1400px max container
- **Hexagonal motifs** used as subtle design accents throughout (corners, dividers, badges)

## Homepage Sections (Top to Bottom)

### 1. Hero Section (Full Viewport)
- Full-screen dark background with faint animated hexagonal grid pattern (CSS/SVG, subtle parallax on scroll)
- Bold headline with staggered character fade-in animation
- Subtext fades up with slight delay
- Ghost CTA button (red border) that fills red on hover
- Thin scroll-progress indicator (red line) at the very top of the page

### 2. Who We Are
- Section title slides in from left with red accent line
- Content blocks stagger in on scroll with a subtle "declassify" effect (slight blur → sharp transition)
- Clean two-column layout: text on one side, abstract hexagonal visual element on the other

### 3. Core Capability Areas
- 2×2 grid on desktop, stacked on mobile
- Dark cards with 1px border that turns red on hover
- Hexagonal corner accent that rotates on hover
- Each card shows capability title, brief description, and subtle arrow indicator

### 4. How We Work (Process Timeline)
- Horizontal timeline on desktop (vertical on mobile)
- Red connecting line that draws in on scroll
- Numbered step circles that appear sequentially
- Step descriptions fade in beneath each node

### 5. Contact CTA / Footer
- Dark terminal-style panel with "INITIATE CONTACT" messaging
- Mailto link styled as the primary CTA button
- Minimal footer with company name, copyright, and privacy note in muted monospace text

## Animations & Interactions (Refined & Practical)
- **Scroll-triggered reveals**: Sections fade up with staggered timing using Framer Motion and intersection observer
- **Hover states**: Red border reveals, subtle lifts, underline draws on links
- **Red accent lines**: Horizontal rules draw in from left when sections enter viewport
- **Stats counters**: Any numbers count up on scroll entry in monospace font
- **Scroll progress bar**: 1px red line at top of viewport tracking page scroll
- **Prefers-reduced-motion**: All animations disabled for accessibility

## Responsive Design
- Fully responsive: desktop, tablet, and mobile breakpoints
- Mobile maintains the dark, authoritative aesthetic — no generic fallbacks
- Grid layouts collapse to single column on mobile
- Timeline switches from horizontal to vertical

## Accessibility
- WCAG AA contrast compliance (white on dark backgrounds)
- Keyboard navigable throughout
- Semantic HTML structure
- Proper heading hierarchy

