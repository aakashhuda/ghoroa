<template>
  <section class="py-20" style="background: #f4f6fb;">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-[#1a1d2e] mb-4">
          Trusted by Property Managers
        </h2>
        <p class="text-[#5a6075] max-w-2xl mx-auto">
          Hear from the people who use Ghoroa every day to run their properties.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="card flex flex-col"
        >
          <p class="text-sm text-[#5a6075] leading-relaxed italic mb-6 flex-1">
            "{{ testimonial.text }}"
          </p>
          <div class="flex items-center gap-3">
            <a-avatar
              :style="{ background: testimonial.color, verticalAlign: 'middle' }"
              :size="40"
            >
              {{ getInitials(testimonial.name) }}
            </a-avatar>
            <div>
              <p class="text-sm font-semibold text-[#1a1d2e]">{{ testimonial.name }}</p>
              <p class="text-xs text-[#5a6075]">{{ testimonial.role }}</p>
            </div>
          </div>
          <div class="mt-3">
            <a-rate :value="5" :disabled="true" :count="5" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    name: 'Rafiq Hasan',
    role: 'Building Owner',
    text: 'Ghoroa has completely transformed how we manage our 12 buildings. Rent collection is now seamless.',
    color: '#16a34a',
  },
  {
    name: 'Fatima Begum',
    role: 'Property Manager',
    text: 'The rooftop farm module is brilliant. We turned unused space into a revenue stream.',
    color: '#0891b2',
  },
  {
    name: 'Kamal Hossain',
    role: 'Admin',
    text: 'Tenant requests and notices are now organized. No more paper slips everywhere.',
    color: '#7c3aed',
  },
]

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
}
</script>

<style scoped>
:deep(.ant-rate) {
  font-size: 14px;
  color: #faad14;
}
:deep(.ant-rate-star) {
  margin-inline-end: 4px !important;
}
</style>
