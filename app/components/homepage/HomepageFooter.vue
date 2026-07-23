<template>
  <footer class="homepage-footer">
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="col-span-2 md:col-span-1">
          <div class="flex items-center gap-3 mb-4">
            <img src="/ghoroa-icon-only.svg" alt="Ghoroa" class="w-9 h-9" />
            <span class="text-lg font-bold text-white">Ghoroa</span>
          </div>
          <p class="text-sm text-gray-400 leading-relaxed mb-4">
            All-in-one property management platform for building owners and landlords.
          </p>
          <div class="flex gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.href"
              class="social-icon"
              :aria-label="social.label"
            >
              <component :is="social.icon" />
            </a>
          </div>
        </div>

        <!-- Product -->
        <div>
          <h4 class="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Product</h4>
          <ul class="space-y-3">
            <li v-for="link in productLinks" :key="link.label">
              <a :href="link.href" class="footer-link">{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h4 class="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</h4>
          <ul class="space-y-3">
            <li v-for="link in companyLinks" :key="link.label">
              <a :href="link.href" class="footer-link">{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Legal</h4>
          <ul class="space-y-3">
            <li v-for="link in legalLinks" :key="link.label">
              <a :href="link.href" class="footer-link">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-sm text-gray-400">
          &copy; 2026 Ghoroa. All rights reserved.
        </p>
        <p class="text-xs text-gray-500">
          Made with care for property managers
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { FacebookOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons-vue'

const productLinks = [
  { label: 'Features', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'How It Works', href: '#' },
  { label: 'FAQ', href: '#' },
]

const companyLinks = [
  { label: 'About', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'Careers', href: '#' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
]

const socialLinks = [
  { label: 'Facebook', icon: markRaw(FacebookOutlined), href: '#' },
  { label: 'Twitter', icon: markRaw(TwitterOutlined), href: '#' },
  { label: 'LinkedIn', icon: markRaw(LinkedinOutlined), href: '#' },
]
</script>

<style scoped>
.homepage-footer {
  background: #1a1d2e;
}

.footer-link {
  color: #9ca3af;
  font-size: 14px;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #16a34a;
}

.social-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 16px;
  transition: all 0.2s ease;
}

.social-icon:hover {
  background: rgba(22, 163, 74, 0.15);
  color: #16a34a;
}
</style>
