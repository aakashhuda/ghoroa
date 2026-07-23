<template>
  <section id="how-it-works" class="py-20" style="background: #ffffff;">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-[#1a1d2e] mb-4">How It Works</h2>
        <p class="text-[#5a6075] max-w-2xl mx-auto">
          Get started with Ghoroa in three simple steps.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <div
          v-for="(step, index) in steps"
          :key="step.title"
          class="flex flex-col items-center text-center relative"
        >
          <!-- Connector line (desktop) -->
          <div
            v-if="index < steps.length - 1"
            class="hidden md:block absolute top-6 left-[60%] w-[80%] h-px border-t-2 border-dashed"
            style="border-color: rgba(22, 163, 74, 0.2);"
          />
          <!-- Step Number -->
          <div class="step-number">{{ index + 1 }}</div>
          <!-- Icon -->
          <div
            class="icon-wrap"
            style="background: #f0fdf4; color: #16a34a; margin-top: 16px;"
          >
            <component :is="step.icon" />
          </div>
          <h3 class="text-lg font-semibold text-[#1a1d2e] mt-4 mb-2">
            {{ step.title }}
          </h3>
          <p class="text-sm text-[#5a6075] leading-relaxed max-w-xs">
            {{ step.description }}
          </p>
        </div>
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
.step-number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #16a34a, #0891b2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  flex-shrink: 0;
}
</style>
