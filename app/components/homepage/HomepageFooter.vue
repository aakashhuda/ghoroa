<template>
  <footer class="homepage-footer">
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <!-- Brand -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <img src="/ghoroa-icon-only.svg" alt="Ghoroa" class="w-9 h-9" />
            <span class="text-lg font-bold text-white">Ghoroa</span>
          </div>
          <p class="text-sm text-gray-400 leading-relaxed mb-5 max-w-xs">
            All-in-one property management platform for building owners and landlords.
          </p>

          <!-- Newsletter -->
          <div class="newsletter-wrap">
            <p class="text-xs text-gray-300 mb-2 font-medium uppercase tracking-wider">
              Stay Updated
            </p>
            <div class="newsletter-input-wrap">
              <input
                v-model="email"
                type="email"
                placeholder="Enter your email"
                class="newsletter-input"
              />
              <button class="newsletter-btn" @click="subscribe">
                <SendOutlined />
              </button>
            </div>
            <p class="text-xs text-gray-500 mt-2">No spam. Unsubscribe anytime.</p>
          </div>

          <!-- Social Icons -->
          <div class="flex gap-3 mt-5">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.href"
              class="social-icon group"
              :aria-label="social.label"
            >
              <component :is="social.icon" />
            </a>
          </div>
        </div>

        <!-- Product -->
        <div>
          <h4 class="footer-heading">Product</h4>
          <ul class="space-y-3">
            <li v-for="link in productLinks" :key="link.label">
              <a :href="link.href" class="footer-link">{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h4 class="footer-heading">Company</h4>
          <ul class="space-y-3">
            <li v-for="link in companyLinks" :key="link.label">
              <a :href="link.href" class="footer-link">{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="footer-heading">Legal</h4>
          <ul class="space-y-3">
            <li v-for="link in legalLinks" :key="link.label">
              <a :href="link.href" class="footer-link">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
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
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  SendOutlined,
} from '@ant-design/icons-vue'

const email = ref('')

function subscribe() {
  // TODO: newsletter API integration
  if (email.value) {
    email.value = ''
  }
}

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
  background: #0f1119;
}

.footer-heading {
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.footer-link {
  color: #6b7280;
  font-size: 14px;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #16a34a;
}

/* ── Social Icons ───────────────────────── */
.social-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 16px;
  transition: all 0.25s ease;
  border: 1px solid transparent;
}

.social-icon:hover {
  background: rgba(22, 163, 74, 0.12);
  color: #16a34a;
  border-color: rgba(22, 163, 74, 0.2);
}

/* ── Newsletter ─────────────────────────── */
.newsletter-input-wrap {
  display: flex;
  max-width: 280px;
}

.newsletter-input {
  flex: 1;
  height: 42px;
  padding: 0 14px;
  font-size: 13px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-right: none;
  border-radius: 10px 0 0 10px;
  color: #e5e7eb;
  outline: none;
  transition: border-color 0.2s ease;
}

.newsletter-input:focus {
  border-color: rgba(22, 163, 74, 0.4);
}

.newsletter-input::placeholder {
  color: #4b5563;
}

.newsletter-btn {
  width: 42px;
  height: 42px;
  border-radius: 0 10px 10px 0;
  background: linear-gradient(135deg, #16a34a, #0891b2);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  cursor: pointer;
  font-size: 15px;
  transition: opacity 0.2s ease;
}

.newsletter-btn:hover {
  opacity: 0.9;
}
</style>
