<template>
  <div class="mb-6 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <a-button v-if="showBack" @click="handleBack">
        <template #icon><LeftOutlined /></template>
      </a-button>
      <h2 class="mb-0 text-xl font-semibold">{{ title }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LeftOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'

withDefaults(defineProps<{
  title: string
  showBack?: boolean
}>(), {
  showBack: false,
})

const router = useRouter()

function handleBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    // Fallback: navigate to parent route
    const path = router.currentRoute.value.path
    const parentPath = path.substring(0, path.lastIndexOf('/'))
    navigateTo(parentPath || '/dashboard')
  }
}
</script>
