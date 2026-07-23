<template>
  <header class="homepage-navbar">
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
          class="text-sm text-[#5a6075] hover:text-[#16a34a] transition-colors font-medium"
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

      <!-- Mobile Hamburger -->
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
</script>

<style scoped>
.homepage-navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  height: 64px;
  background: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
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

.hamburger-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
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
