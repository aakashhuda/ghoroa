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
          <NuxtLink to="/dashboard" class="flex items-center shrink-0">
            <img src="/logo.svg" alt="Ghoroa" class="h-8 md:h-9 w-auto" />
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
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { computed, onMounted, ref } from "vue";
import { signOut } from "~/lib/auth-client";

const sidebarCollapsed = ref(false);
const drawerOpen = ref(false);

const session = ref<{ user: { name: string; userType: string } | null } | null>(
  null
);

onMounted(async () => {
  try {
    const data = await $fetch("/api/auth/get-session");
    session.value = data;
  } catch {
    session.value = null;
  }
});

const userName = computed(() => session.value?.user?.name || "User");
const userRole = computed(() => {
  const type = session.value?.user?.userType;
  if (!type) return "User";
  return type
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c: string) => c.toUpperCase());
});

async function handleLogout() {
  await signOut();
  await navigateTo("/auth/login");
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
