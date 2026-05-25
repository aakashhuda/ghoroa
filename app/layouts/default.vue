<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top Bar -->
    <header
      class="flex items-center justify-between border-b bg-white px-6 py-3"
    >
      <div class="flex items-center gap-4">
        <h1 class="text-xl font-bold gradient-text">Ghoroa</h1>
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
    <div class="flex">
      <!-- Sidebar Placeholder -->
      <aside
        class="flex h-[calc(100vh-60px)] w-60 flex-col border-r bg-white p-4"
      >
        <h2 class="text-lg font-semibold text-gray-400">Sidebar</h2>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PlusOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
</script>
