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
          <!-- Logo -->
          <NuxtLink to="/dashboard" class="flex items-center gap-4 shrink-0">
            <!-- <img src="/logo.svg" alt="Ghoroa" class="h-8 md:h-9 w-auto" /> -->
            <!-- Logo -->
            <div class="sidebar-logo">
              <div class="sidebar-logo-icon">
                <svg viewBox="20 20 160 160" class="w-5 h-5">
                  <g
                    fill="none"
                    stroke="#ffffff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M52 100 L100 52 L148 100" stroke-width="14" />
                    <path
                      d="M76 100 L76 136 L124 136 L124 100"
                      stroke-width="12"
                    />
                    <path
                      d="M96 136 L96 118 L108 118 L108 136"
                      stroke-width="8"
                    />
                    <path
                      d="M152 70 C168 56 180 70 172 88 C164 104 144 110 126 102"
                      stroke-width="10"
                    />
                    <path d="M48 52 C36 42 28 56 40 66" stroke-width="8" />
                  </g>
                </svg>
              </div>
              <span v-if="!collapsed" class="text-lg font-bold text-gray-900"
                >Ghoroa</span
              >
            </div>
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
          <!-- User avatar with logout dropdown (desktop only) -->
          <a-dropdown :trigger="['click']">
            <!-- Avatar trigger -->
            <div
              class="hidden lg:flex items-center gap-3 pl-4 ml-2 border-l border-gray-200 cursor-pointer"
            >
              <a-avatar :size="32" class="flex-shrink-0 bg-green-600">
                <UserOutlined />
              </a-avatar>
              <div class="min-w-0 leading-tight">
                <p class="truncate text-sm font-medium text-gray-800">
                  {{ userName }}
                </p>
                <p class="truncate text-xs text-gray-500">{{ userRole }}</p>
              </div>
            </div>
            <!-- Dropdown menu -->
            <template #overlay>
              <a-menu>
                <a-menu-item key="reset-password">
                  <NuxtLink to="/auth/reset-password" class="flex items-center">
                    <ReloadOutlined class="mr-2" />
                    Reset Password
                  </NuxtLink>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="logout" @click="handleLogout">
                  <LogoutOutlined class="mr-2" />
                  Logout
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
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
  LogoutOutlined,
  PlusOutlined,
  ReloadOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import { useAuth } from "~/composables/useAuth";

const sidebarCollapsed = ref(false);
const drawerOpen = ref(false);

const { userName, userRole, fetchSession, logout } = useAuth();

onMounted(() => {
  fetchSession();
});

async function handleLogout() {
  await logout();
}
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
