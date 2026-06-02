<template>
  <div class="flex flex-col h-screen" style="background-color: #f4f6fb">
    <!-- Top Bar -->
    <header class="app-header flex-shrink-0">
      <div class="flex items-center gap-2 md:gap-4 w-full">
        <!-- Left: toggles + logo -->
        <div class="flex items-center gap-2 md:gap-4">
          <!-- Mobile menu toggle -->
          <BarsOutlined
            class="cursor-pointer text-xl lg:hidden"
            @click="drawerOpen = true"
          />
          <!-- Desktop collapse toggle -->
          <BarsOutlined
            class="hidden cursor-pointer text-lg lg:block"
            @click="sidebarCollapsed = !sidebarCollapsed"
          />
          <!-- Logo/Project name -->
          <NuxtLink to="/dashboard" class="flex items-center shrink-0">
            <span class="text-xl font-bold gradient-text">Ghoroa</span>
          </NuxtLink>
        </div>
        <!-- Right: search + new (pushed right on md+) -->
        <div class="flex items-center gap-2 md:gap-4 md:ml-auto">
          <!-- Search input -->
          <a-input-search
            placeholder="Search..."
            class="max-w-[280px] min-w-[80px]"
          />
          <!-- + New button (icon on mobile, text on sm+) -->
          <a-dropdown :trigger="['click']">
            <a-button type="primary" class="flex items-center">
              <template #icon><PlusOutlined /></template>
              <span class="new-btn-text">New</span>
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
          <!-- User avatar (desktop only, moved from sidebar) -->
          <div
            class="hidden lg:flex items-center gap-3 pl-4 ml-2 border-l border-gray-200"
          >
            <a-avatar
              :size="32"
              class="flex-shrink-0"
              style="background-color: #16a34a"
            >
              <UserOutlined />
            </a-avatar>
            <div class="min-w-0 leading-tight">
              <p class="truncate text-sm font-medium text-gray-800">
                Syed Mahbubul Huda
              </p>
              <p class="truncate text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
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
        :closable="false"
        :body-style="{ padding: 0, background: '#ffffff' }"
        @close="drawerOpen = false"
      >
        <DashboardSidebar :collapsed="false" @navigate="drawerOpen = false" />
      </a-drawer>

      <!-- Main Content -->
      <main class="flex-1 overflow-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BarsOutlined,
  PlusOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";

const sidebarCollapsed = ref(false);
const drawerOpen = ref(false);
</script>

<style scoped>
.new-btn-text {
  display: none !important;
}
@media (min-width: 640px) {
  .new-btn-text {
    display: inline !important;
  }
}
</style>
