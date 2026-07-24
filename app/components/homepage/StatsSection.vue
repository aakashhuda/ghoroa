<template>
  <section ref="sectionRef" class="stats-section">
    <div class="stats-pattern" />

    <div class="max-w-7xl mx-auto px-6 py-20 relative z-10">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="stat-card"
        >
          <component :is="stat.icon" class="stat-icon" />
          <div class="stat-value">
            <span v-if="stat.prefix" class="stat-prefix">{{ stat.prefix }}</span>
            <span>{{ animatedValues[stat.label] ?? stat.display }}</span>
            <span v-if="stat.suffix" class="stat-suffix">{{ stat.suffix }}</span>
          </div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  HomeOutlined,
  TeamOutlined,
  BankOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  MessageOutlined,
  ApartmentOutlined,
} from '@ant-design/icons-vue'

interface Stat {
  label: string
  display: string
  icon: any
  target: number
  suffix?: string
  prefix?: string
}

const stats: Stat[] = [
  { label: 'Property Managers', display: '500', icon: markRaw(TeamOutlined), target: 500, suffix: '+' },
  { label: 'Tenants Managed', display: '10,000', icon: markRaw(HomeOutlined), target: 10000, suffix: '+' },
  { label: 'Buildings', display: '50', icon: markRaw(BankOutlined), target: 50, suffix: '+' },
  { label: 'Uptime', display: '99.9', icon: markRaw(CheckCircleOutlined), target: 99.9, suffix: '%' },
  { label: 'Monthly Revenue', display: '2.4M', icon: markRaw(DollarOutlined), target: 2.4, prefix: '৳', suffix: 'M' },
  { label: 'Flats Managed', display: '1,200', icon: markRaw(ApartmentOutlined), target: 1200, suffix: '+' },
  { label: 'Cities Served', display: '12', icon: markRaw(EnvironmentOutlined), target: 12 },
  { label: 'Avg Response', display: '5', icon: markRaw(MessageOutlined), target: 5, suffix: 'm' },
]

const sectionRef = ref<HTMLElement | null>(null)
const animatedValues = reactive<Record<string, string>>({})
let hasAnimated = false

function formatValue(value: number, stat: Stat): string {
  if (stat.label === 'Uptime') {
    return value.toFixed(1)
  }
  if (stat.label === 'Monthly Revenue') {
    return value.toFixed(1)
  }
  if (value >= 1000) {
    return Math.floor(value).toLocaleString()
  }
  return Math.floor(value).toString()
}

function animateCount(stat: Stat) {
  const duration = 1800
  const startTime = performance.now()
  const startValue = 0
  const endValue = stat.target

  function tick(now: number) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
    const current = startValue + (endValue - startValue) * eased
    animatedValues[stat.label] = formatValue(current, stat)

    if (progress < 1) {
      requestAnimationFrame(tick)
    } else {
      animatedValues[stat.label] = formatValue(endValue, stat)
    }
  }

  requestAnimationFrame(tick)
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!sectionRef.value) return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true
        stats.forEach((stat, i) => {
          setTimeout(() => animateCount(stat), i * 100)
        })
        observer?.unobserve(entry.target)
      }
    },
    { threshold: 0.2 },
  )

  observer.observe(sectionRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.stats-section {
  position: relative;
  background: linear-gradient(135deg, #16a34a 0%, #0891b2 100%);
  overflow: hidden;
}

.stats-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}

.stat-card {
  text-align: center;
  padding: 28px 20px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.14);
  transform: translateY(-2px);
}

.stat-icon {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 12px;
}

.stat-value {
  font-size: 36px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.1;
  margin-bottom: 6px;
  font-variant-numeric: tabular-nums;
}

.stat-prefix,
.stat-suffix {
  font-size: 24px;
  font-weight: 600;
  opacity: 0.7;
}

.stat-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
</style>
