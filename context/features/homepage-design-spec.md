# Homepage Design

## Overview

Ghoroa has no public-facing homepage — the root route `/` currently 404s. This feature builds a visually appealing landing page that introduces the platform to prospective users, with its own navigation bar and footer distinct from the authenticated dashboard shell. The page is purely design-oriented with no backend functionality; it establishes Ghoroa's public web presence while maintaining full visual consistency with the existing dashboard design system.

## Requirements

- Create `layouts/guest.vue` — a minimal layout wrapping content in a white `<div>` for public pages, referenced by `definePageMeta({ layout: 'guest' })`
- Create `pages/index.vue` as the homepage root (`/`), composing all section components in order with no auth middleware
- Create `HomepageNavbar.vue` — sticky navbar with brand logo/name, anchor navigation links (Features, How It Works, About), "Sign In" link (`/auth/login`), "Watch Demo" outlined button, and "Get Started" gradient CTA button (`/auth/signup`); responsive with hamburger drawer on mobile (using Ant Design `<a-drawer>`)
- Create `HeroSection.vue` — two-column layout with gradient-styled headline, subtitle, dual CTA buttons, trust badge, and a CSS-rendered app mockup (no external image)
- Create `FeaturesSection.vue` — 6 feature cards in a responsive 3-column grid using the `.card` CSS class, each with an Ant Design icon color-matched to the dashboard's metric card palette
- Create `StatsSection.vue` — full-width gradient background (matching the auth layout's `linear-gradient(135deg, #16a34a 0%, #0891b2 100%)`) with 4 trust metrics (500+, 10,000+, 50+, 99.9%) in white text
- Create `HowItWorksSection.vue` — 3-step horizontal layout with gradient circle step numbers, icons, and descriptions
- Create `TestimonialsSection.vue` — 3 testimonial cards with quote text, avatar, name/role, and decorative star ratings
- Create `CtaSection.vue` — full-width gradient background with centered heading, subtitle, and white CTA button linking to `/auth/signup`
- Create `HomepageFooter.vue` — dark background (`#1a1d2e`), 4-column grid (Brand, Product, Company, Legal) with copyright bar
- All sections must reuse existing CSS classes: `.card`, `.gradient-text`, `.custom-gradient-btn`, and the project's color tokens (`#16a34a`, `#0891b2`, `#f4f6fb`, `#1a1d2e`, `#5a6075`)
- All Ant Design components and icons must match existing usage patterns (buttons, drawers, avatars, rates)
- No external images — hero mockup rendered with CSS

## Note

- Footer links are `href="#"` placeholders — no actual pages exist for About, Pricing, Privacy, etc.
- "Watch Demo" scrolls to the How It Works section anchor — there is no video or demo modal
- Testimonials use fictional names and quotes — no real customer data
- The guest layout is intentionally minimal (white bg, no sidebar, no header) — future public pages can also use it
- No existing files are modified — all changes are additive

## References

- [`context/docs/ideas/homepage-design-idea.md`](docs/ideas/homepage-design-idea.md) — original idea document
- [`context/docs/plans/plan-homepage-design.md`](docs/plans/plan-homepage-design.md) — implementation plan
- `app/layouts/auth.vue` — gradient and color pattern reference for homepage sections
- `app/layouts/default.vue` — responsive drawer pattern for mobile navbar
- `app/assets/css/main.css` — `.card`, `.gradient-text`, `.custom-gradient-btn`, `.icon-wrap` CSS classes
- `app/app.vue` — Ant Design theme tokens (colors, border radius, font)
- Ant Design Vue 4 docs: `<a-button>`, `<a-drawer>`, `<a-avatar>`, `<a-rate>`, icon components
