<template>
  <section class="cta-section">
    <!-- Top wave curve -->
    <div class="cta-wave" />

    <!-- Floating blur orbs -->
    <div class="cta-orb cta-orb-left" />
    <div class="cta-orb cta-orb-right" />
    <div class="cta-pattern" />

    <div class="max-w-3xl mx-auto px-6 py-28 text-center relative z-10">
      <SlideUpReveal>
        <h2 class="text-3xl font-bold text-white mb-4">
          Ready to digitize your property management?
        </h2>
        <p class="text-gray-200 mb-10">
          Join 500+ property managers who trust Ghoroa.
        </p>

        <a-button class="cta-white-btn" href="/auth/signup">
          Get Started Free
        </a-button>
        <p class="text-sm text-gray-300 mt-5">
          No credit card required. Free to start.
        </p>

        <!-- Tech credibility -->
        <div class="flex items-center justify-center gap-10 mt-12 opacity-40">
          <span class="tech-label">Built with</span>
          <div class="flex items-center gap-8">
            <span class="tech-badge">Nuxt.js</span>
            <span class="tech-badge">Prisma</span>
            <span class="tech-badge">Neon DB</span>
            <span class="tech-badge">Cloudflare</span>
          </div>
        </div>
      </SlideUpReveal>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  position: relative;
  background: linear-gradient(135deg, #16a34a 0%, #0891b2 100%);
  overflow: hidden;
}

/* ── Top wave ───────────────────────────── */
.cta-wave {
  position: absolute;
  top: -2px;
  left: 0;
  right: 0;
  height: 40px;
  background: #f4f6fb;
  clip-path: ellipse(60% 100% at 50% 0%);
}

/* ── Floating orbs ──────────────────────── */
.cta-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}

.cta-orb-left {
  width: 280px;
  height: 280px;
  background: rgba(255, 255, 255, 0.06);
  bottom: -80px;
  left: -80px;
  animation: orbFloat 8s ease-in-out infinite;
}

.cta-orb-right {
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.05);
  top: -40px;
  right: -40px;
  animation: orbFloat 6s ease-in-out infinite reverse;
}

@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(10px, -10px) scale(1.05); }
  66% { transform: translate(-5px, 5px) scale(0.95); }
}

/* ── Pattern overlay ────────────────────── */
.cta-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  pointer-events: none;
}

/* ── Button ─────────────────────────────── */
.cta-white-btn {
  height: 56px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  padding: 0 40px !important;
  background: #ffffff !important;
  color: #16a34a !important;
  border: none !important;
  border-radius: 14px !important;
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.15),
    0 0 0 0 rgba(255, 255, 255, 0.4) !important;
  animation: ctaPulse 3s ease-in-out infinite;
}

.cta-white-btn:hover {
  background: #f4f6fb !important;
  color: #15803d !important;
  transform: translateY(-2px);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.2),
    0 0 0 12px rgba(255, 255, 255, 0) !important;
}

@keyframes ctaPulse {
  0%, 100% {
    box-shadow:
      0 4px 24px rgba(0, 0, 0, 0.15),
      0 0 0 0 rgba(255, 255, 255, 0.3);
  }
  50% {
    box-shadow:
      0 4px 24px rgba(0, 0, 0, 0.15),
      0 0 0 8px rgba(255, 255, 255, 0);
  }
}

/* ── Tech credibility ───────────────────── */
.tech-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.tech-badge {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}
</style>
