<template>
  <section id="features" class="py-20" style="background: #f4f6fb;">
    <div class="max-w-7xl mx-auto px-6">
      <SlideUpReveal>
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-[#1a1d2e] mb-4">
            Everything you need to run your property
          </h2>
          <p class="text-[#5a6075] max-w-2xl mx-auto">
            From rent collection to rooftop farming — Ghoroa brings all your property
            management tools into one seamless platform.
          </p>
        </div>
      </SlideUpReveal>

      <div class="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SlideUpReveal
          v-for="(feature, index) in features"
          :key="feature.title"
          :delay="index * 80"
        >
          <div class="feature-card card group">
            <!-- Coming Soon badge -->
            <span v-if="feature.comingSoon" class="coming-soon-badge">Coming Soon</span>

            <!-- Icon area -->
            <div class="feature-icon-area" :style="{ background: feature.bgGradient }">
              <div class="feature-icon-inner" :style="{ background: feature.bgColor, color: feature.color }">
                <component :is="feature.icon" />
              </div>
            </div>

            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-desc">{{ feature.description }}</p>

            <!-- Hover accent line -->
            <div class="feature-accent" />
          </div>
        </SlideUpReveal>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  HomeOutlined,
  ToolOutlined,
  CloudOutlined,
  TeamOutlined,
  BarChartOutlined,
  CommentOutlined,
} from '@ant-design/icons-vue'

const features = [
  {
    title: 'Smart Rent Collection',
    description: 'Automated rent tracking, invoicing, and payment reconciliation for all your properties.',
    icon: markRaw(HomeOutlined),
    bgColor: '#f0fdf4',
    bgGradient: 'linear-gradient(135deg, rgba(22,163,74,0.08), rgba(22,163,74,0.02))',
    color: '#16a34a',
    comingSoon: false,
  },
  {
    title: 'Expense Management',
    description: 'Track every building expense with categorized logs and receipt attachments.',
    icon: markRaw(ToolOutlined),
    bgColor: '#fff7ed',
    bgGradient: 'linear-gradient(135deg, rgba(234,88,12,0.08), rgba(234,88,12,0.02))',
    color: '#ea580c',
    comingSoon: false,
  },
  {
    title: 'Rooftop Farm',
    description: 'Manage products, orders, and investments for your rooftop farming business.',
    icon: markRaw(CloudOutlined),
    bgColor: '#ecfeff',
    bgGradient: 'linear-gradient(135deg, rgba(8,145,178,0.08), rgba(8,145,178,0.02))',
    color: '#0891b2',
    comingSoon: true,
  },
  {
    title: 'Employee Management',
    description: 'Profiles, salary tracking, work distribution, and attendance for your staff.',
    icon: markRaw(TeamOutlined),
    bgColor: '#f5f3ff',
    bgGradient: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(124,58,237,0.02))',
    color: '#7c3aed',
    comingSoon: true,
  },
  {
    title: 'Financial Reports',
    description: 'Income vs expense analytics, rent collection patterns, and downloadable reports.',
    icon: markRaw(BarChartOutlined),
    bgColor: '#eff6ff',
    bgGradient: 'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(37,99,235,0.02))',
    color: '#2563eb',
    comingSoon: false,
  },
  {
    title: 'Tenant Portal',
    description: 'Tenant requests, notices, and streamlined communication in one place.',
    icon: markRaw(CommentOutlined),
    bgColor: '#fef2f2',
    bgGradient: 'linear-gradient(135deg, rgba(239,68,68,0.08), rgba(239,68,68,0.02))',
    color: '#ef4444',
    comingSoon: false,
  },
]
</script>

<style scoped>
/* ── Grid auto-stretch rows ────────────── */
:deep(.features-grid) > * {
  height: 100%;
}

/* ── Feature Card ──────────────────────── */
.feature-card {
  position: relative;
  padding: 32px 28px 28px;
  overflow: hidden;
  cursor: default;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: rgba(22, 163, 74, 0.15);
}

/* ── Coming Soon Badge ────────────────── */
.coming-soon-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 3px 10px;
  border-radius: 10px;
  background: rgba(22, 163, 74, 0.1);
  color: #16a34a;
  border: 1px solid rgba(22, 163, 74, 0.15);
}

/* ── Icon Area ────────────────────────── */
.feature-icon-area {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover .feature-icon-area {
  transform: scale(1.08);
}

.feature-icon-inner {
  width: 44px;
  height: 44px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}

/* ── Text ──────────────────────────────── */
.feature-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1d2e;
  margin-bottom: 8px;
}

.feature-desc {
  font-size: 14px;
  color: #5a6075;
  line-height: 1.65;
  flex: 1;
}

/* ── Hover Accent ──────────────────────── */
.feature-accent {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #16a34a, #0891b2);
  border-radius: 0 0 12px 12px;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(-50%);
}

.feature-card:hover .feature-accent {
  width: 100%;
}
</style>
