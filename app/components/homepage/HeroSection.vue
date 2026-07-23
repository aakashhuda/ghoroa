<template>
  <section class="hero-section">
    <div class="max-w-7xl mx-auto px-6">
      <div class="hero-grid">
        <!-- Left Content -->
        <div class="hero-content">
          <h1 class="hero-heading">
            Manage Your Property.
            <span class="gradient-text">Digitally.</span>
          </h1>
          <p class="hero-subtitle">
            Rent collection, expense tracking, employee management, and rooftop farm
            operations — all from one platform.
          </p>
          <div class="hero-ctas">
            <a-button
              type="primary"
              class="custom-gradient-btn hero-cta-btn"
              href="/auth/signup"
            >
              Get Started Free
            </a-button>
            <a-button class="hero-outlined-btn" @click="scrollToDemo">
              Watch Demo
            </a-button>
          </div>
          <p class="hero-trust">Trusted by 500+ property managers</p>
        </div>

        <!-- Right Mockup -->
        <div class="hero-mockup">
          <div class="mockup-frame">
            <div class="mockup-header">
              <div class="mockup-dot mockup-dot-red" />
              <div class="mockup-dot mockup-dot-yellow" />
              <div class="mockup-dot mockup-dot-green" />
            </div>
            <div class="mockup-body">
              <div class="mockup-sidebar">
                <div class="mockup-logo" />
                <div v-for="i in 4" :key="i" class="mockup-menu-item" :style="{ width: `${60 + i * 10}%` }" />
              </div>
              <div class="mockup-main">
                <div class="mockup-topbar" />
                <div class="mockup-cards">
                  <div v-for="i in 3" :key="i" class="mockup-card" />
                </div>
                <div class="mockup-chart" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
function scrollToDemo() {
  const el = document.getElementById('how-it-works')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
.hero-section {
  background: #ffffff;
  padding: 80px 0;
  overflow: hidden;
}

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

.hero-heading {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.15;
  color: #1a1d2e;
  margin-bottom: 20px;
}

@media (max-width: 640px) {
  .hero-heading {
    font-size: 32px;
  }
}

.hero-subtitle {
  font-size: 16px;
  line-height: 1.7;
  color: #5a6075;
  margin-bottom: 32px;
  max-width: 480px;
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
  height: 48px !important;
  font-size: 14px !important;
  padding: 0 28px !important;
}

.hero-outlined-btn {
  height: 48px !important;
  font-size: 14px !important;
  padding: 0 28px !important;
  border-color: #16a34a !important;
  color: #16a34a !important;
}

.hero-outlined-btn:hover {
  border-color: #15803d !important;
  color: #15803d !important;
}

.hero-trust {
  font-size: 13px;
  color: #5a6075;
}

/* ── Mockup ────────────────────────── */
.hero-mockup {
  display: flex;
  justify-content: center;
}

.mockup-frame {
  width: 100%;
  max-width: 540px;
  border-radius: 12px;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.10),
    0 12px 48px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.mockup-header {
  display: flex;
  gap: 6px;
  padding: 12px 16px;
  background: #f4f6fb;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.mockup-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.mockup-dot-red { background: #ef4444; }
.mockup-dot-yellow { background: #ea580c; }
.mockup-dot-green { background: #16a34a; }

.mockup-body {
  display: flex;
  height: 300px;
}

.mockup-sidebar {
  width: 30%;
  background: #ffffff;
  border-right: 1px solid rgba(0, 0, 0, 0.04);
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mockup-logo {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: linear-gradient(135deg, #16a34a, #0891b2);
  margin-bottom: 8px;
}

.mockup-menu-item {
  height: 8px;
  border-radius: 4px;
  background: #eef1f8;
}

.mockup-main {
  flex: 1;
  background: #f4f6fb;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mockup-topbar {
  height: 8px;
  width: 60%;
  border-radius: 4px;
  background: #e0e4ed;
}

.mockup-cards {
  display: flex;
  gap: 8px;
}

.mockup-card {
  flex: 1;
  height: 60px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.mockup-chart {
  flex: 1;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(22, 163, 74, 0.08), rgba(8, 145, 178, 0.08));
  border: 1px solid rgba(0, 0, 0, 0.04);
}
</style>
