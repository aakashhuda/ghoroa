<template>
  <section class="hero-section">
    <!-- Background glow orbs -->
    <div class="hero-bg-glow hero-glow-top" />
    <div class="hero-bg-glow hero-glow-bottom" />

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="hero-grid">
        <!-- Left Content -->
        <div class="hero-content">
          <SlideUpReveal>
            <span class="hero-badge">
              <span class="badge-dot" /> New: Rooftop Farm Module
            </span>
          </SlideUpReveal>

          <SlideUpReveal :delay="100">
            <h1 class="hero-heading">
              Manage Your Property.
              <span class="gradient-text">Digitally.</span>
            </h1>
          </SlideUpReveal>

          <SlideUpReveal :delay="200">
            <p class="hero-subtitle">
              Rent collection, expense tracking, employee management, and rooftop farm
              operations — all from one platform.
            </p>
          </SlideUpReveal>

          <SlideUpReveal :delay="300">
            <div class="hero-ctas">
              <a-button
                type="primary"
                class="custom-gradient-btn hero-cta-btn"
                href="/auth/signup"
              >
                Get Started Free
              </a-button>
              <a-button class="hero-outlined-btn" @click="scrollToDemo">
                <PlayCircleOutlined class="text-base" />
                Watch Demo
              </a-button>
            </div>
          </SlideUpReveal>

          <SlideUpReveal :delay="400">
            <p class="hero-trust">
              <CheckCircleFilled class="trust-check" />
              Trusted by 500+ property managers
            </p>
          </SlideUpReveal>
        </div>

        <!-- Right Mockup -->
          <div class="hero-mockup">
            <img
              src="/images/dashboard-mockup.svg"
              alt="Ghoroa Dashboard"
              class="mockup-img"
              width="800"
              height="500"
              style="display:block; width:100%; max-width:540px; height:auto; border-radius:14px; border:2px solid rgba(22,163,74,0.3);"
            />
          </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PlayCircleOutlined, CheckCircleFilled } from '@ant-design/icons-vue'

function scrollToDemo() {
  const el = document.getElementById('how-it-works')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
/* ── Section Base ──────────────────────── */
.hero-section {
  position: relative;
  background: #ffffff;
  padding: 80px 0 100px;
}

/* ── Background glow orbs ─────────────── */
.hero-bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
}

.hero-glow-top {
  width: 500px;
  height: 500px;
  background: rgba(22, 163, 74, 0.06);
  top: -200px;
  right: -100px;
}

.hero-glow-bottom {
  width: 400px;
  height: 400px;
  background: rgba(8, 145, 178, 0.05);
  bottom: -150px;
  left: -100px;
}

/* ── Grid ─────────────────────────────── */
.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 48px;
    text-align: center;
  }
  .hero-ctas {
    justify-content: center;
  }
}

/* ── Content ──────────────────────────── */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f0fdf4;
  color: #16a34a;
  font-size: 13px;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 20px;
  margin-bottom: 20px;
  border: 1px solid rgba(22, 163, 74, 0.15);
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #16a34a;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

.hero-heading {
  font-size: 52px;
  font-weight: 700;
  line-height: 1.12;
  color: #1a1d2e;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
}

@media (max-width: 640px) {
  .hero-heading {
    font-size: 32px;
  }
}

.hero-subtitle {
  font-size: 17px;
  line-height: 1.7;
  color: #5a6075;
  margin-bottom: 32px;
  max-width: 460px;
}

@media (max-width: 1024px) {
  .hero-subtitle {
    max-width: 100%;
  }
}

.hero-ctas {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.hero-cta-btn {
  height: 50px !important;
  font-size: 15px !important;
  padding: 0 32px !important;
}

.hero-outlined-btn {
  height: 50px !important;
  font-size: 15px !important;
  padding: 0 28px !important;
  border-color: #16a34a !important;
  color: #16a34a !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
}

.hero-outlined-btn:hover {
  border-color: #15803d !important;
  color: #15803d !important;
}

.hero-trust {
  font-size: 13px;
  color: #5a6075;
  display: flex;
  align-items: center;
  gap: 6px;
}

.trust-check {
  color: #16a34a;
  font-size: 14px;
}

/* ── Mockup ───────────────────────────── */
.hero-mockup {
  display: flex;
  justify-content: center;
}

.mockup-img {
  display: block;
  width: 100%;
  max-width: 540px;
  height: auto;
  border-radius: 14px;
  box-shadow:
    0 0 100px 60px rgba(22, 163, 74, 0.08),
    0 4px 24px rgba(0, 0, 0, 0.10),
    0 16px 56px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.06);
  animation: mockupFloat 5s ease-in-out infinite;
}

@keyframes mockupFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
</style>
