<template>
  <div class="auth-wrapper">
    <!-- Left Hero Section -->
    <div class="auth-side hidden md:flex lg:flex-col lg:justify-between">
      <div>
        <div class="flex items-center gap-4 mb-20">
          <svg viewBox="20 20 160 160" class="w-14 h-14">
            <g
              fill="none"
              stroke="#ffffff"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M52 100 L100 52 L148 100" stroke-width="14" />
              <path d="M76 100 L76 136 L124 136 L124 100" stroke-width="12" />
              <path d="M96 136 L96 118 L108 118 L108 136" stroke-width="8" />
              <path
                d="M152 70 C168 56 180 70 172 88 C164 104 144 110 126 102"
                stroke-width="10"
              />
              <path d="M48 52 C36 42 28 56 40 66" stroke-width="8" />
            </g>
          </svg>
          <h1 class="text-3xl font-bold text-white">Ghoroa</h1>
        </div>
        <div class="space-y-8">
          <div>
            <h2 class="text-5xl font-bold text-white mb-4 leading-tight">
              {{ heroTitle }}
            </h2>
            <p class="text-lg text-gray-300 leading-relaxed">
              {{ heroDescription }}
            </p>
          </div>
          <ul class="space-y-4">
            <li
              v-for="feature in heroFeatures"
              :key="feature.title"
              class="flex items-start gap-4"
            >
              <div
                class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0"
              >
                <span :class="feature.iconClass" class="text-sm font-bold"
                  >✓</span
                >
              </div>
              <div>
                <p class="text-white font-medium mb-0.5">{{ feature.title }}</p>
                <p class="text-gray-300 text-sm">{{ feature.subtitle }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="space-y-4 border-t border-white/10 pt-8">
        <p class="text-sm text-gray-300">✓ Trusted by 500+ property managers</p>
        <p class="text-xs text-gray-400">© 2026 Ghoroa. All rights reserved.</p>
      </div>
    </div>
    <!-- Right Form Section -->
    <div class="auth-form-side">
      <div class="w-full max-w-sm">
        <!-- Mobile Logo -->
        <div class="lg:hidden mb-10">
          <img src="/logo.svg" alt="Ghoroa" class="h-9 w-auto" />
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const heroContent = computed(() => {
  if (route.path.includes("signup")) {
    return {
      title: "Start managing your property today",
      description:
        "Join hundreds of property managers who use Ghoroa to streamline their business operations.",
    };
  }
  return {
    title: "Manage your property digitally",
    description:
      "Rent collection, expense tracking, employee management, and rooftop farm operations in one platform.",
  };
});

const heroTitle = computed(() => heroContent.value.title);
const heroDescription = computed(() => heroContent.value.description);

const heroFeatures = [
  {
    title: "Smart Rent Collection",
    subtitle: "Automated tracking and invoicing",
    iconClass: "text-green-300",
  },
  {
    title: "Financial Control",
    subtitle: "Track expenses and analytics",
    iconClass: "text-cyan-300",
  },
  {
    title: "Team & Farm Operations",
    subtitle: "Employee and business management",
    iconClass: "text-green-300",
  },
];
</script>

<style>
.auth-wrapper {
  min-height: 100vh;
  display: flex;
  background: #ffffff;
}

.auth-side {
  flex: 1;
  background: linear-gradient(135deg, #16a34a 0%, #0891b2 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 64px;
}

.auth-form-side {
  flex: 1;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
}

@media (max-width: 1024px) {
  .auth-wrapper {
    flex-direction: column;
  }
  .auth-form-side {
    flex: 1;
    min-height: 100vh;
    padding: 24px;
  }
}

@media (max-width: 640px) {
  .auth-form-side {
    padding: 24px 16px;
  }
  .auth-form-side > div {
    max-width: 100%;
  }
}
</style>
