<template>
  <section id="how-it-works" class="py-20" style="background: #ffffff;">
    <div class="max-w-7xl mx-auto px-6">
      <SlideUpReveal>
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-[#1a1d2e] mb-4">How It Works</h2>
          <p class="text-[#5a6075] max-w-2xl mx-auto">
            Get started with Ghoroa in three simple steps.
          </p>
        </div>
      </SlideUpReveal>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative steps-container">
        <!-- SVG connector line (desktop) -->
        <svg
          class="hidden md:block absolute top-16 left-0 w-full steps-connector"
          style="pointer-events: none;"
          viewBox="0 0 800 40"
          preserveAspectRatio="none"
        >
          <line
            x1="15%"
            y1="20"
            x2="85%"
            y2="20"
            stroke="url(#connGrad)"
            stroke-width="2"
            stroke-dasharray="6 6"
            stroke-linecap="round"
          />
          <defs>
            <linearGradient id="connGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#16a34a" stop-opacity="0.1" />
              <stop offset="50%" stop-color="#16a34a" stop-opacity="0.35" />
              <stop offset="100%" stop-color="#0891b2" stop-opacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        <SlideUpReveal
          v-for="(step, index) in steps"
          :key="step.title"
          :delay="index * 150"
        >
          <div class="step-item">
            <!-- Step Number -->
            <div class="step-circle">
              {{ index + 1 }}
            </div>
            <!-- Icon -->
            <div class="step-icon-wrap">
              <component :is="step.icon" class="step-icon" />
            </div>
            <h3 class="text-lg font-semibold text-[#1a1d2e] mt-4 mb-2">
              {{ step.title }}
            </h3>
            <p class="text-sm text-[#5a6075] leading-relaxed max-w-xs mx-auto">
              {{ step.description }}
            </p>
          </div>
        </SlideUpReveal>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { UserAddOutlined, HomeOutlined, RocketOutlined } from '@ant-design/icons-vue'

const steps = [
  {
    title: 'Create Your Account',
    description: 'Sign up and set up your property profile with building details and preferences.',
    icon: markRaw(UserAddOutlined),
  },
  {
    title: 'Add Tenants & Flats',
    description: 'Register tenants, flats, and rental agreements with all the essential details.',
    icon: markRaw(HomeOutlined),
  },
  {
    title: 'Start Managing',
    description: 'Collect rent, track expenses, manage employees, and grow your farm business.',
    icon: markRaw(RocketOutlined),
  },
]
</script>

<style scoped>
/* ── Connector SVG ─────────────────────── */
.steps-container {
  position: relative;
}

.steps-connector {
  height: 40px;
  overflow: visible;
}

/* ── Step Item ─────────────────────────── */
.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 2;
}

/* ── Step Circle ────────────────────────── */
.step-circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #16a34a, #0891b2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  flex-shrink: 0;
  box-shadow: 0 4px 16px rgba(22, 163, 74, 0.3);
  position: relative;
}

.step-circle::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid rgba(22, 163, 74, 0.15);
  animation: stepPulse 2.5s ease-in-out infinite;
  animation-delay: calc(var(--step-index, 0) * 0.5s);
}

@keyframes stepPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.15);
    opacity: 0;
  }
}

/* ── Step Icon ─────────────────────────── */
.step-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #f0fdf4;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  transition: transform 0.3s ease;
}

.step-item:hover .step-icon-wrap {
  transform: scale(1.1);
}

.step-icon {
  font-size: 22px;
  color: #16a34a;
}
</style>
