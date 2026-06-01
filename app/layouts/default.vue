<template>
  <div class="flex flex-col h-screen" style="background-color: #f4f6fb">
    <!-- Top Bar -->
    <header class="app-header justify-between flex-shrink-0">
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
    <div class="flex flex-1 overflow-hidden">
      <!-- Desktop Sidebar -->
      <DashboardSidebar
        v-model:collapsed="sidebarCollapsed"
        class="max-lg:hidden flex-shrink-0"
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
