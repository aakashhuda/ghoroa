<template>
  <a-config-provider :theme="lightTheme">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </a-config-provider>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'

const lightTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#16a34a',
    colorInfo: '#0891b2',
    colorSuccess: '#16a34a',
    colorWarning: '#ea580c',
    colorError: '#ef4444',
    colorBgBase: '#f4f6fb',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#eef1f8',
    colorTextBase: '#1a1d2e',
    colorTextSecondary: '#5a6075',
    colorBorder: 'rgba(0,0,0,0.08)',
    borderRadius: 12,
    fontFamily: "'DM Sans', sans-serif",
  },
}
</script>
