# Homepage Improvement Plan

## Status

Planning

## Goal

Enhance the current homepage with richer visuals, scroll-triggered animations, high-quality webp images, and a "Coming Soon" section for future features — while preserving the clean minimal aesthetic and the existing color palette.

## Approach: Enhance (not replace)

The current structure is solid. We keep all 8 sections but layer in visual depth, motion, and imagery. No structural redesign — just a significant visual + interactive upgrade.

---

## 1. Global: Scroll-Triggered Reveal Animations

**Goal:** Every section animates into view as the user scrolls, creating a polished, app-like feel.

- Create a reusable `SlideUpReveal.vue` wrapper component using `IntersectionObserver`
- Props: `delay` (stagger), `duration`, `once` (animate only first time)
- Child elements get `opacity: 0; transform: translateY(24px)` → animate to visible
- Use CSS `@keyframes` for GPU-accelerated transforms only (no layout thrashing)
- Apply to: hero text, feature cards (staggered), stats items, step items, testimonial cards, CTA content

**Files:**
- New: `app/components/shared/SlideUpReveal.vue`
- Modify: all homepage section components to wrap content

---

## 2. Hero Section — Visual Overhaul

**Goal:** Make the hero feel modern, dynamic, and trustworthy at first glance.

### 2a. Background
- Replace flat white with a subtle radial gradient mesh:
  - Top-right: soft green glow (`radial-gradient` rgba(22,163,74,0.06))
  - Bottom-left: soft cyan glow (`radial-gradient` rgba(8,145,178,0.04))
- Add a subtle dot-grid SVG pattern overlay (low opacity, CSS `background-image` with encoded SVG)
- Adds depth without clutter

### 2b. Left Content
- Add `SlideUpReveal` wrapper with staggered children (heading → subtitle → CTAs → trust line)
- Add a small "✨ New: Rooftop Farm Module" badge above the headline (draws attention)
- Keep the gradient-text on "Digitally." — it's already great

### 2c. Right Mockup → Real Dashboard Screenshot
- **Replace the CSS grey-box mockup** with a high-quality .webp screenshot of the actual Ghoroa dashboard
- Image specs: ~800px wide, compressed webp (~40-60KB target)
- Add a subtle floating animation (CSS `@keyframes` translateY ±6px, 4s ease-in-out infinite)
- Add a decorative glow behind the image (gradient circle, blurred, low opacity)
- Keep the frame/border styling for polish

**Files:**
- Modify: `app/components/homepage/HeroSection.vue`
- New: `public/images/hero-dashboard.webp`
- New: `public/images/hero-glow.webp` (or CSS-only glow)

---

## 3. Features Section — Icons, Cards & Hover States

**Goal:** Make feature cards feel interactive and visually distinct.

### 3a. Icon Upgrade
- Source or create 6 custom SVG illustrations (one per feature), ~24KB each, stored as `.svg` in `public/images/features/`
  - Smart Rent Collection → Building with rupee/currency symbol
  - Expense Management → Receipt/list with chart
  - Rooftop Farm → Plant/leaf with building roof
  - Employee Management → People/team icon
  - Financial Reports → Bar chart/graph
  - Tenant Portal → Chat/message bubble
- Fallback: Keep Ant Design icons but style them more prominently
- Larger icon container: 56×56px (up from 44×44) with gradient backgrounds

### 3b. Card Hover Micro-interactions
- On hover: card lifts 4px, icon container scales 1.05, subtle border-color transition to primary green
- Add a subtle top-border accent that appears on hover (gradient green-cyan, 3px, slides in from left)
- Transition all properties with `cubic-bezier(0.4, 0, 0.2, 1)`

### 3c. "Coming Soon" Badge on 1-2 Cards
- Rooftop Farm gets a small "Coming Soon" badge (it's a future module)
- Employee Management gets "Coming Soon" badge
- Badge: small pill, green bg, white text, positioned top-right of card

**Files:**
- Modify: `app/components/homepage/FeaturesSection.vue`
- New: `public/images/features/rent-collection.svg`
- New: `public/images/features/expense-management.svg`
- New: `public/images/features/rooftop-farm.svg`
- New: `public/images/features/employee-management.svg`
- New: `public/images/features/financial-reports.svg`
- New: `public/images/features/tenant-portal.svg`

---

## 4. Stats Section — Animated Counters

**Goal:** Numbers feel alive and impressive.

### 4a. Count-Up Animation
- Use `IntersectionObserver` — when the stats section enters viewport, animate numbers from 0 to target
- Use `requestAnimationFrame` with ease-out for smooth counting
- Numbers tick up over ~1.5 seconds
- 99.9% fades in digit by digit (no count-up needed)

### 4b. Visual Enhancement
- Keep the green-cyan gradient background (it's strong)
- Add a subtle grid/dot pattern overlay (CSS, low opacity)
- Add iconography above each stat number (small, white, 50% opacity):
  - Property Managers → TeamOutlined
  - Tenants Managed → HomeOutlined
  - Buildings → BankOutlined
  - Uptime → CheckCircleOutlined
- Cards: semi-transparent white glass-morphism containers for each stat (not just raw text)

**Files:**
- Modify: `app/components/homepage/StatsSection.vue`

---

## 5. How It Works — Animated Steps

**Goal:** The three-step guide feels like a journey.

### 5a. Step Animations
- Each step reveals sequentially (staggered `SlideUpReveal`) on scroll
- Step numbers have a subtle pulse animation when they enter viewport
- Connecting dashed line animates (draws from left to right using SVG stroke-dasharray animation)

### 5b. Illustration Images
- Add a small webp illustration above each step (or below the icon):
  - Step 1 (Create Account): Sign-up form illustration
  - Step 2 (Add Tenants): Building/flat illustration
  - Step 3 (Start Managing): Dashboard/reports illustration
- Each ~30KB .webp, stored in `public/images/how-it-works/`
- OR: Use CSS-only geometric illustrations to keep it lightweight

**Files:**
- Modify: `app/components/homepage/HowItWorksSection.vue`
- New: `public/images/how-it-works/step-1-create.webp`
- New: `public/images/how-it-works/step-2-add.webp`
- New: `public/images/how-it-works/step-3-manage.webp`

---

## 6. NEW: "Coming Soon" Section

**Goal:** Build excitement for future features, show the product roadmap.

### 6a. Section Design
- Placed between How It Works and Testimonials
- Light background (#f4f6fb) with section heading: "And There's More Coming..."
- Subtitle: "We're building new features every month. Here's what's next."
- 6 feature cards in a 3×2 grid, each with:
  - Icon (Ant Design outlined)
  - Feature name
  - Short description
  - "Coming Q4 2026" or "Coming Soon" badge
  - Slightly muted/different styling to distinguish from current features

### 6b. Future Features to Showcase
| Feature | Icon | Timeline |
|---|---|---|
| WhatsApp Integration | `WhatsAppOutlined` | Coming Q4 2026 |
| CC Camera Access | `VideoCameraOutlined` | Coming Q4 2026 |
| Dark Mode | `BulbOutlined` | Coming Q3 2026 |
| PDF / XLSX Export | `FilePdfOutlined` | Coming Q3 2026 |
| Quote Generator | `CalculatorOutlined` | Coming Q1 2027 |
| Mobile App | `MobileOutlined` | Coming Q1 2027 |

### 6c. Visual Style for "Coming Soon" Cards
- Lighter card background (#fafbfd or slightly transparent)
- Dashed border instead of solid
- "Coming Soon" chip at bottom
- Icons in muted tones (grayscale-ish or low-saturation color)
- Subtle shimmer animation on hover

**Files:**
- New: `app/components/homepage/ComingSoonSection.vue`
- Modify: `app/pages/index.vue` (add `<HomepageComingSoonSection />` after HowItWorks)

---

## 7. Testimonials — Visual Polish

### 7a. Carousel on Mobile
- On mobile (< 768px), switch from 3-column grid to a horizontal swipeable carousel
- Use CSS scroll-snap for native smooth scrolling (no JS library needed)
- Show scroll dots indicator

### 7b. Avatar Images
- Replace colored `a-avatar` initials with real .webp avatar images
- Create or source 3 placeholder avatar images (~8KB each)
- Store in `public/images/testimonials/`

### 7c. Quote Styling
- Add a large decorative quote mark (") behind the text, low opacity, in primary green
- Add subtle card border-left accent (3px, gradient green-cyan)

**Files:**
- Modify: `app/components/homepage/TestimonialsSection.vue`
- New: `public/images/testimonials/avatar-1.webp`
- New: `public/images/testimonials/avatar-2.webp`
- New: `public/images/testimonials/avatar-3.webp`

---

## 8. CTA Section — Visual Energy

### 8a. Background Enhancement
- Keep gradient base, add:
  - Subtle wave/curve at the top edge (CSS clip-path or SVG)
  - Floating blur orbs (CSS pseudo-elements with animation)
  - Dot pattern overlay (same as hero, but white dots at 5% opacity)

### 8b. Content Animation
- Heading and button scale up on scroll into view
- Button has a subtle glow pulse animation (box-shadow breathing)
- Add a row of small brand/tech logos or icons below the button (Nuxt, Prisma, Neon, etc.) to show tech credibility

**Files:**
- Modify: `app/components/homepage/CtaSection.vue`

---

## 9. Footer — Subtle Polish

### 9a. Social Icons
- Add hover tooltips
- Add a subtle gradient on hover (green-cyan border)

### 9b. Newsletter Signup
- Add a small "Stay Updated" email input + button in the brand column
- Minimal design, dark input with green button
- Shows we're actively building

**Files:**
- Modify: `app/components/homepage/HomepageFooter.vue`

---

## 10. Navbar — Micro Polish

### 10a. Scroll State
- On scroll down: add subtle background blur (backdrop-filter) + slight shadow increase
- Transition: smooth, 300ms

### 10b. Active Link
- Highlight current section's nav link with primary green underline/animation

**Files:**
- Modify: `app/components/homepage/HomepageNavbar.vue`

---

## Image Asset Summary

All images below need to be created/exported as optimized .webp or .svg:

| File | Format | Target Size | Purpose |
|---|---|---|---|
| `public/images/hero-dashboard.webp` | webp | ~50KB | Hero section dashboard screenshot |
| `public/images/features/rent-collection.svg` | svg | ~3KB | Feature illustration |
| `public/images/features/expense-management.svg` | svg | ~3KB | Feature illustration |
| `public/images/features/rooftop-farm.svg` | svg | ~3KB | Feature illustration |
| `public/images/features/employee-management.svg` | svg | ~3KB | Feature illustration |
| `public/images/features/financial-reports.svg` | svg | ~3KB | Feature illustration |
| `public/images/features/tenant-portal.svg` | svg | ~3KB | Feature illustration |
| `public/images/testimonials/avatar-1.webp` | webp | ~6KB | Testimonial avatar |
| `public/images/testimonials/avatar-2.webp` | webp | ~6KB | Testimonial avatar |
| `public/images/testimonials/avatar-3.webp` | webp | ~6KB | Testimonial avatar |
| **Total** | | **~89KB** | |

---

## Animation & Motion Summary

| Animation | Trigger | Technique |
|---|---|---|
| Section reveal (fade-up) | Scroll into view | IntersectionObserver + CSS transform |
| Feature card hover | Mouse hover | CSS transition (lift, accent border) |
| Stats counter count-up | Scroll into view | requestAnimationFrame with easing |
| Hero mockup float | Always (loop) | CSS @keyframes translateY |
| CTA button glow pulse | Always (loop) | CSS @keyframes box-shadow |
| Step number pulse | Scroll into view | CSS @keyframes scale |
| Testimonial carousel (mobile) | User scroll | CSS scroll-snap |
| Navbar blur on scroll | Page scroll | JS scroll listener + CSS backdrop-filter |
| Coming Soon shimmer | Card hover | CSS @keyframes background-position |

---

## Implementation Order

1. **SlideUpReveal component** (foundation for all animations)
2. **Hero Section** (biggest visual impact, replaces CSS mockup with real image)
3. **Features Section** (icon upgrade + hover effects + coming-soon badges)
4. **Stats Section** (count-up animation)
5. **Coming Soon Section** (new section)
6. **How It Works** (step animations)
7. **Testimonials** (avatars + carousel)
8. **CTA Section** (background polish)
9. **Footer** (newsletter)
10. **Navbar** (scroll blur + active link)

---

## References

- Current homepage: `app/pages/index.vue` + 8 components in `app/components/homepage/`
- Color palette: Green `#16a34a` / Cyan `#0891b2` / Orange `#ea580c` / Blue `#2563eb` / Purple `#7c3aed`
- Theme tokens defined in `app.vue` (Ant Design ConfigProvider)
- CSS utilities in `app/assets/css/main.css`
- Project context: `@context/project-overview.md` — see Modules & Features for full feature list
