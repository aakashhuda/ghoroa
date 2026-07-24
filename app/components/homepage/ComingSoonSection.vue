<template>
  <section id="roadmap-section" class="py-20" style="background: #f8fafc;">
    <div class="max-w-7xl mx-auto px-6">
      <SlideUpReveal>
        <div class="text-center mb-16">
          <span class="section-eyebrow">Roadmap</span>
          <h2 class="text-3xl font-bold text-[#1a1d2e] mb-4">
            And There's More Coming...
          </h2>
          <p class="text-[#5a6075] max-w-2xl mx-auto">
            We're building new features every month. Here's a glimpse of what's next.
          </p>
        </div>
      </SlideUpReveal>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SlideUpReveal
          v-for="(item, index) in upcomingFeatures"
          :key="item.title"
          :delay="index * 80"
        >
          <div class="upcoming-card group">
            <div class="upcoming-icon" :style="{ background: item.bgColor, color: item.color }">
              <component :is="item.icon" />
            </div>
            <h3 class="upcoming-title">{{ item.title }}</h3>
            <p class="upcoming-desc">{{ item.description }}</p>
            <span class="upcoming-chip" :style="{ background: item.chipBg, color: item.chipColor }">
              {{ item.timeline }}
            </span>
          </div>
        </SlideUpReveal>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  WhatsAppOutlined,
  VideoCameraOutlined,
  BulbOutlined,
  FilePdfOutlined,
  CalculatorOutlined,
  MobileOutlined,
} from '@ant-design/icons-vue'

const upcomingFeatures = [
  {
    title: 'WhatsApp Integration',
    description: 'Send group notices and rent reminders directly to tenants via WhatsApp.',
    icon: markRaw(WhatsAppOutlined),
    color: '#25D366',
    bgColor: '#f0fdf4',
    chipColor: '#16a34a',
    chipBg: '#f0fdf4',
    timeline: 'Q4 2026',
  },
  {
    title: 'CC Camera Access',
    description: 'Monitor your building security cameras directly from the dashboard.',
    icon: markRaw(VideoCameraOutlined),
    color: '#2563eb',
    bgColor: '#eff6ff',
    chipColor: '#2563eb',
    chipBg: '#eff6ff',
    timeline: 'Q4 2026',
  },
  {
    title: 'Dark Mode',
    description: 'Toggle between light and dark themes for comfortable viewing any time.',
    icon: markRaw(BulbOutlined),
    color: '#7c3aed',
    bgColor: '#f5f3ff',
    chipColor: '#7c3aed',
    chipBg: '#f5f3ff',
    timeline: 'Q3 2026',
  },
  {
    title: 'PDF / XLSX Export',
    description: 'Export any data table as PDF or Excel spreadsheet with one click.',
    icon: markRaw(FilePdfOutlined),
    color: '#ef4444',
    bgColor: '#fef2f2',
    chipColor: '#dc2626',
    chipBg: '#fef2f2',
    timeline: 'Q3 2026',
  },
  {
    title: 'Quote Generator',
    description: 'Generate professional quotes for maintenance work and farm products.',
    icon: markRaw(CalculatorOutlined),
    color: '#ea580c',
    bgColor: '#fff7ed',
    chipColor: '#ea580c',
    chipBg: '#fff7ed',
    timeline: 'Q1 2027',
  },
  {
    title: 'Mobile App',
    description: 'Native iOS and Android apps for managing your property on the go.',
    icon: markRaw(MobileOutlined),
    color: '#0891b2',
    bgColor: '#ecfeff',
    chipColor: '#0891b2',
    chipBg: '#ecfeff',
    timeline: 'Q1 2027',
  },
]
</script>

<style scoped>
/* ── Section Eyebrow ───────────────────── */
.section-eyebrow {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #16a34a;
  background: #f0fdf4;
  padding: 4px 12px;
  border-radius: 6px;
  margin-bottom: 12px;
}

/* ── Upcoming Card ─────────────────────── */
.upcoming-card {
  background: #ffffff;
  border-radius: 14px;
  padding: 28px;
  border: 1.5px dashed rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.upcoming-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(22, 163, 74, 0.02), rgba(8, 145, 178, 0.02));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.upcoming-card:hover {
  border-color: rgba(22, 163, 74, 0.2);
  border-style: solid;
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.06),
    0 8px 32px rgba(0, 0, 0, 0.04);
  transform: translateY(-2px);
}

.upcoming-card:hover::before {
  opacity: 1;
}

/* ── Icon ──────────────────────────────── */
.upcoming-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin-bottom: 16px;
  transition: transform 0.3s ease;
}

.upcoming-card:hover .upcoming-icon {
  transform: scale(1.08);
}

/* ── Text ──────────────────────────────── */
.upcoming-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1d2e;
  margin-bottom: 8px;
}

.upcoming-desc {
  font-size: 14px;
  color: #5a6075;
  line-height: 1.6;
  flex: 1;
  margin-bottom: 16px;
}

/* ── Timeline Chip ─────────────────────── */
.upcoming-chip {
  display: inline-flex;
  align-self: flex-start;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 4px 12px;
  border-radius: 8px;
}
</style>
