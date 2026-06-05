<template>
  <aside
    :class="[
      'flex flex-col md:border-r bg-white h-full',
      collapsed ? 'w-[80px]' : 'md:w-[240px] w-full',
    ]"
  >
    <!-- Sidebar Logo -->
    <div class="sidebar-logo">
      <div class="sidebar-logo-icon">
        <svg viewBox="20 20 160 160" class="w-5 h-5">
          <g fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round">
            <path d="M52 100 L100 52 L148 100" stroke-width="14" />
            <path d="M76 100 L76 136 L124 136 L124 100" stroke-width="12" />
            <path d="M96 136 L96 118 L108 118 L108 136" stroke-width="8" />
            <path d="M152 70 C168 56 180 70 172 88 C164 104 144 110 126 102" stroke-width="10" />
            <path d="M48 52 C36 42 28 56 40 66" stroke-width="8" />
          </g>
        </svg>
      </div>
      <span v-if="!collapsed" class="text-lg font-bold text-gray-900">Ghoroa</span>
    </div>

    <!-- Navigation Menu -->
    <div class="flex-1 overflow-y-auto py-2">
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        :inline-collapsed="collapsed"
        class="border-none"
      >
        <!-- Overview -->
        <a-menu-item-group key="overview">
          <template #title>
            <span v-if="!collapsed">Overview</span>
          </template>
          <a-menu-item key="/dashboard" @click="handleNavigate('/dashboard')">
            <template #icon><DashboardOutlined /></template>
            <span>Dashboard</span>
          </a-menu-item>
        </a-menu-item-group>

        <!-- Management -->
        <a-menu-item-group key="management">
          <template #title>
            <span v-if="!collapsed">Management</span>
          </template>
          <a-sub-menu key="rent-management">
            <template #icon><HomeOutlined /></template>
            <template #title><span>Rent Management</span></template>
            <a-menu-item key="/tenants" @click="handleNavigate('/tenants')"
              >Tenants</a-menu-item
            >
            <a-menu-item
              key="/rent-collection"
              @click="handleNavigate('/rent-collection')"
              >Rent Collection</a-menu-item
            >
            <a-menu-item key="/advances" @click="handleNavigate('/advances')"
              >Advances</a-menu-item
            >
            <a-menu-item key="/notices" @click="handleNavigate('/notices')"
              >Notices</a-menu-item
            >
            <a-menu-item key="/invoices" @click="handleNavigate('/invoices')"
              >Invoices</a-menu-item
            >
            <a-menu-item key="/requests" @click="handleNavigate('/requests')"
              >Requests</a-menu-item
            >
          </a-sub-menu>
          <a-menu-item key="/employees" @click="handleNavigate('/employees')">
            <template #icon><TeamOutlined /></template>
            <span>Employees</span>
          </a-menu-item>
          <a-menu-item
            key="/maintenance"
            @click="handleNavigate('/maintenance')"
          >
            <template #icon><ToolOutlined /></template>
            <span>Building Maintenance</span>
          </a-menu-item>
          <a-menu-item
            key="/rooftop-farm"
            @click="handleNavigate('/rooftop-farm')"
          >
            <template #icon><CloudOutlined /></template>
            <span>Rooftop Farm</span>
          </a-menu-item>
        </a-menu-item-group>

        <!-- Finance -->
        <a-menu-item-group key="finance">
          <template #title>
            <span v-if="!collapsed">Finance</span>
          </template>
          <a-menu-item key="/accounts" @click="handleNavigate('/accounts')">
            <template #icon><WalletOutlined /></template>
            <span>Accounts</span>
          </a-menu-item>
          <a-menu-item key="/reports" @click="handleNavigate('/reports')">
            <template #icon><BarChartOutlined /></template>
            <span>Reports</span>
          </a-menu-item>
        </a-menu-item-group>

        <!-- Settings -->
        <a-menu-item-group key="settings">
          <template #title>
            <span v-if="!collapsed">Settings</span>
          </template>
          <a-menu-item key="/settings" @click="handleNavigate('/settings')">
            <template #icon><SettingOutlined /></template>
            <span>Mustafa Kamal (Super Admin)</span>
          </a-menu-item>
        </a-menu-item-group>
      </a-menu>
    </div>

    <!-- User Avatar + Collapse Toggle (hidden on desktop) -->
    <div class="shrink-0 border-t p-3 lg:hidden">
      <div class="flex items-center gap-3">
        <a-avatar
          :size="36"
          class="flex-shrink-0"
          style="background-color: #16a34a"
        >
          <UserOutlined />
        </a-avatar>
        <div v-if="!collapsed" class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium text-gray-800">
            Mustafa Kamal
          </p>
          <p class="truncate text-xs text-gray-500">Super Admin</p>
        </div>
        <MenuOutlined
          class="cursor-pointer text-gray-400 hover:text-gray-600"
          @click="emit('update:collapsed', !collapsed)"
        />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import {
  BarChartOutlined,
  CloudOutlined,
  DashboardOutlined,
  HomeOutlined,
  MenuOutlined,
  SettingOutlined,
  TeamOutlined,
  ToolOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

defineProps<{
  collapsed: boolean;
}>();

const emit = defineEmits<{
  "update:collapsed": [value: boolean];
  navigate: [];
}>();

const route = useRoute();
const selectedKeys = ref<string[]>([route.path]);
const openKeys = ref<string[]>([]);

function handleNavigate(path: string) {
  navigateTo(path);
  emit("navigate");
}
</script>
