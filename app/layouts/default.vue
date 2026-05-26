<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top Bar -->
    <header
      class="flex items-center justify-between border-b bg-white px-6 py-3"
    >
      <div class="flex items-center gap-4">
        <!-- Mobile menu toggle -->
        <MenuOutlined
          class="cursor-pointer text-lg lg:hidden"
          @click="drawerOpen = true"
        />
        <!-- Desktop collapse toggle -->
        <MenuFoldOutlined
          class="hidden cursor-pointer text-lg lg:block"
          @click="sidebarCollapsed = !sidebarCollapsed"
        />
        <a-input-search placeholder="Search..." style="width: 320px" />
      </div>

      <a-dropdown :trigger="['click']">
        <a-button type="primary" class="flex items-center">
          <template #icon>
            <PlusOutlined />
          </template>
          New
        </a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item key="customer">
              <UserOutlined class="mr-2" />
              Customer
            </a-menu-item>
            <a-menu-item key="tenant">
              <TeamOutlined class="mr-2" />
              Tenant
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </header>

    <!-- Body: Sidebar + Main -->
    <div class="flex h-[calc(100vh-64px)]">
      <!-- Desktop Sidebar -->
      <DashboardSidebar
        v-model:collapsed="sidebarCollapsed"
        class="max-lg:hidden"
      />

      <!-- Mobile Drawer -->
      <a-drawer
        v-model:open="drawerOpen"
        placement="left"
        :width="280"
        :closable="true"
        @close="drawerOpen = false"
      >
        <div class="py-4">
          <DashboardSidebar
            :collapsed="false"
            @navigate="drawerOpen = false"
          />
        </div>
      </a-drawer>

      <!-- Main Content -->
      <main class="flex-1 overflow-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  PlusOutlined,
  TeamOutlined,
  UserOutlined,
  MenuOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue'

const sidebarCollapsed = ref(false)
const drawerOpen = ref(false)
</script>
