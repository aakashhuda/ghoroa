<template>
  <section id="features" class="py-20" style="background: #f4f6fb;">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-[#1a1d2e] mb-4">
          Everything you need to run your property
        </h2>
        <p class="text-[#5a6075] max-w-2xl mx-auto">
          From rent collection to rooftop farming — Ghoroa brings all your property
          management tools into one seamless platform.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="card card-hover flex flex-col"
        >
          <div
            class="icon-wrap"
            :style="{ background: feature.bgColor, color: feature.color }"
          >
            <component :is="feature.icon" />
          </div>
          <h3 class="text-base font-semibold text-[#1a1d2e] mt-4 mb-2">
            {{ feature.title }}
          </h3>
          <p class="text-sm text-[#5a6075] leading-relaxed flex-1">
            {{ feature.description }}
          </p>
        </div>
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
    color: '#16a34a',
  },
  {
    title: 'Expense Management',
    description: 'Track every building expense with categorized logs and receipt attachments.',
    icon: markRaw(ToolOutlined),
    bgColor: '#fff7ed',
    color: '#ea580c',
  },
  {
    title: 'Rooftop Farm',
    description: 'Manage products, orders, and investments for your rooftop farming business.',
    icon: markRaw(CloudOutlined),
    bgColor: '#ecfeff',
    color: '#0891b2',
  },
  {
    title: 'Employee Management',
    description: 'Profiles, salary tracking, work distribution, and attendance for your staff.',
    icon: markRaw(TeamOutlined),
    bgColor: '#f5f3ff',
    color: '#7c3aed',
  },
  {
    title: 'Financial Reports',
    description: 'Income vs expense analytics, rent collection patterns, and downloadable reports.',
    icon: markRaw(BarChartOutlined),
    bgColor: '#eff6ff',
    color: '#2563eb',
  },
  {
    title: 'Tenant Portal',
    description: 'Tenant requests, notices, and streamlined communication in one place.',
    icon: markRaw(CommentOutlined),
    bgColor: '#fef2f2',
    color: '#ef4444',
  },
]
</script>
