<template>
  <div ref="elRef" :class="['slide-up-reveal', { 'is-visible': isVisible }]" :style="revealStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  delay?: number
  duration?: number
  once?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0,
  duration: 600,
  once: true,
})

const elRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const revealStyle = computed(() => ({
  transitionDuration: `${props.duration}ms`,
  transitionDelay: `${props.delay}ms`,
}))

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!elRef.value) return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        if (props.once && observer) {
          observer.unobserve(entry.target)
        }
      } else if (!props.once) {
        isVisible.value = false
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  )

  observer.observe(elRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.slide-up-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
