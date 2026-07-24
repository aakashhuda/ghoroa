<template>
  <header class="homepage-navbar" :class="{ 'is-scrolled': isScrolled }">
    <div class="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <img src="/ghoroa-icon-only.svg" alt="Ghoroa" class="w-9 h-9" />
        <span class="text-xl font-bold text-[#1a1d2e] hidden sm:inline">Ghoroa</span>
      </div>

      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center gap-8">
        <a
          v-for="link in navLinks"
          :key="link.label"
          href="#"
          class="nav-link"
          :class="{ active: activeSection === link.target }"
          @click.prevent="scrollToSection(link.target)"
        >
          {{ link.label }}
        </a>
        <a
          href="/auth/login"
          class="text-sm text-[#5a6075] hover:text-[#16a34a] transition-colors font-medium"
        >
          Sign In
        </a>
      </nav>

      <!-- Desktop Buttons -->
      <div class="hidden lg:flex items-center gap-3">
        <a-button class="homepage-btn-outlined" @click="scrollToSection('how-it-works')">
          Watch Demo
        </a-button>
        <a-button type="primary" class="custom-gradient-btn homepage-btn" href="/auth/signup">
          Get Started
        </a-button>
      </div>

      <!-- Mobile -->
      <div class="lg:hidden flex items-center gap-3">
        <a-button type="primary" class="custom-gradient-btn !h-9 !text-xs !px-3" href="/auth/signup">
          Get Started
        </a-button>
        <button class="hamburger-btn" @click="drawerOpen = true">
          <BarsOutlined />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <a-drawer
      v-model:open="drawerOpen"
      placement="right"
      :width="280"
      :closable="false"
    >
      <div class="flex flex-col gap-4 mt-8">
        <a
          v-for="link in navLinks"
          :key="link.label"
          href="#"
          class="text-base text-[#1a1d2e] hover:text-[#16a34a] transition-colors font-medium py-2"
          @click="drawerOpen = false; scrollToSection(link.target)"
        >
          {{ link.label }}
        </a>
        <a
          href="/auth/login"
          class="text-base text-[#1a1d2e] hover:text-[#16a34a] transition-colors font-medium py-2"
          @click="drawerOpen = false"
        >
          Sign In
        </a>
        <a-button class="homepage-btn-outlined mt-4" block @click="drawerOpen = false; scrollToSection('how-it-works')">
          Watch Demo
        </a-button>
      </div>
    </a-drawer>
  </header>
</template>

<script setup lang="ts">
const drawerOpen = ref(false)
const isScrolled = ref(false)
const activeSection = ref('features')

const navLinks = [
  { label: 'Features', target: 'features' },
  { label: 'How It Works', target: 'how-it-works' },
  { label: 'About', target: 'about' },
]

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Track scroll state for navbar blur + active section
function onScroll() {
  isScrolled.value = window.scrollY > 16

  // Determine active section
  const sections = ['features', 'how-it-works', 'roadmap-section']
  let current = 'features'
  for (const id of sections) {
    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 120) {
        current = id
      }
    }
  }
  activeSection.value = current
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll() // initial check
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.homepage-navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  height: 64px;
  background: rgba(255, 255, 255, 0.85);
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.homepage-navbar.is-scrolled {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom-color: rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.04);
}

.homepage-btn {
  height: 40px !important;
  font-size: 13px !important;
}

.homepage-btn-outlined {
  height: 40px !important;
  font-size: 13px !important;
  border-color: #16a34a !important;
  color: #16a34a !important;
}

.homepage-btn-outlined:hover {
  border-color: #15803d !important;
  color: #15803d !important;
}

/* ── Nav Links ──────────────────────────── */
.nav-link {
  font-size: 14px;
  color: #5a6075;
  font-weight: 500;
  transition: color 0.2s ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #16a34a, #0891b2);
  border-radius: 2px;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover {
  color: #16a34a;
}

.nav-link.active {
  color: #16a34a;
}

.nav-link.active::after {
  transform: translateX(-50%) scaleX(1);
}

/* ── Hamburger ──────────────────────────── */
.hamburger-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  background: white;
  cursor: pointer;
  font-size: 18px;
  color: #1a1d2e;
  transition: all 0.2s ease;
}

.hamburger-btn:hover {
  border-color: #16a34a;
  color: #16a34a;
}
</style>
