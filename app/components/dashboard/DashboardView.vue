<template>
  <div class="dashboard">
    <!-- Page header row -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-gray-800 mb-0.5">
          Good morning, Admin 👋
        </h1>
        <p class="text-sm text-gray-400 m-0">
          Here's what's happening across your property today.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <a-button type="default" style="border-radius: 8px">
          <template #icon><ExportOutlined /></template>
          Export
        </a-button>
        <a-button class="custom-gradient-btn" style="border-radius: 8px">
          <template #icon><PlusOutlined /></template>
          Quick Add
        </a-button>
      </div>
    </div>

    <!-- Primary metric cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
      <div v-for="card in primaryCards" :key="card.key" class="card p-5 card-hover">
        <div class="flex items-start justify-between mb-3">
          <div class="icon-wrap" :style="{ background: card.iconBg }">
            <component
              :is="card.icon"
              :style="{ color: card.iconColor, fontSize: '20px' }"
            />
          </div>
          <span :class="card.trendUp ? 'trend-up' : 'trend-down'">
            <ArrowUpOutlined v-if="card.trendUp" style="font-size: 10px" />
            <ArrowDownOutlined v-else style="font-size: 10px" />
            {{ card.trend }}
          </span>
        </div>
        <div class="text-2xl font-semibold text-gray-800 leading-tight mb-1">
          {{ card.value }}
        </div>
        <div class="text-xs text-gray-400">{{ card.label }}</div>
        <!-- Mini sparkline -->
        <div class="mt-3 h-1 rounded-full overflow-hidden bg-gray-100">
          <div
            class="h-full rounded-full transition-all duration-1000"
            :style="{ width: card.progress + '%', background: card.iconColor }"
          />
        </div>
      </div>
    </div>

    <!-- Secondary stat cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
      <div
        v-for="card in secondaryCards"
        :key="card.key"
        class="card p-5 card-hover flex items-center gap-4"
      >
        <div
          class="icon-wrap flex-shrink-0"
          :style="{ background: card.iconBg }"
        >
          <component
            :is="card.icon"
            :style="{ color: card.iconColor, fontSize: '18px' }"
          />
        </div>
        <div class="min-w-0">
          <div class="text-xl font-semibold text-gray-800 leading-tight">
            {{ card.value }}
          </div>
          <div class="text-xs text-gray-400 truncate">{{ card.label }}</div>
        </div>
      </div>
    </div>

    <!-- Charts row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
      <!-- Income vs Expense chart (2/3 width) -->
      <div class="card p-6 lg:col-span-2">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h3 class="text-base font-semibold text-gray-800 mb-0.5">
              Income vs Expenses
            </h3>
            <p class="text-xs text-gray-400 m-0">Last 6 months overview</p>
          </div>
          <a-segmented
            v-model:value="chartPeriod"
            :options="['6M', '3M', '1M']"
            size="small"
          />
        </div>
        <ClientOnly>
          <div style="height: 240px; width: 100%">
            <Bar :data="incomeExpenseData" :options="barChartOptions" />
          </div>
          <template #fallback>
            <a-skeleton active :paragraph="{ rows: 6 }" />
          </template>
        </ClientOnly>
      </div>

      <!-- Expense breakdown donut (1/3 width) -->
      <div class="card p-6">
        <div class="mb-5">
          <h3 class="text-base font-semibold text-gray-800 mb-0.5">
            Expense Breakdown
          </h3>
          <p class="text-xs text-gray-400 m-0">Current month</p>
        </div>
        <ClientOnly>
          <div
            style="
              height: 200px;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <Doughnut :data="expenseBreakdownData" :options="doughnutOptions" />
          </div>
          <template #fallback>
            <a-skeleton-avatar :size="160" shape="circle" />
          </template>
        </ClientOnly>
        <div class="mt-4 space-y-2">
          <div
            v-for="item in expenseCategories"
            :key="item.label"
            class="flex items-center justify-between text-xs"
          >
            <div class="flex items-center gap-2">
              <span
                class="w-2 h-2 rounded-full flex-shrink-0"
                :style="{ background: item.color }"
              />
              <span class="text-gray-500">{{ item.label }}</span>
            </div>
            <span class="font-medium text-gray-700">{{ item.amount }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Rent trend + Farm products row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
      <!-- Rent collection trend -->
      <div class="card p-6 lg:col-span-2">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h3 class="text-base font-semibold text-gray-800 mb-0.5">
              Rent Collection Trend
            </h3>
            <p class="text-xs text-gray-400 m-0">
              Monthly collection vs target
            </p>
          </div>
          <a-tag color="success" style="border-radius: 6px"
            >98.2% collected</a-tag
          >
        </div>
        <ClientOnly>
          <div style="height: 200px; width: 100%">
            <Line :data="rentTrendData" :options="lineChartOptions" />
          </div>
          <template #fallback>
            <a-skeleton active :paragraph="{ rows: 4 }" />
          </template>
        </ClientOnly>
      </div>

      <!-- Popular farm products -->
      <div class="card p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-base font-semibold text-gray-800 mb-0.5">
              Popular Products
            </h3>
            <p class="text-xs text-gray-400 m-0">Rooftop Farm — Top items</p>
          </div>
          <a-button
            type="link"
            size="small"
            style="color: #16a34a; padding: 0; font-size: 12px"
          >
            View all
          </a-button>
        </div>
        <div class="space-y-3">
          <div
            v-for="product in popularProducts"
            :key="product.name"
            class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div
              class="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0"
              :style="{ background: product.bg }"
            >
              {{ product.emoji }}
            </div>
            <div class="flex-1 min-w-0">
              <div
                class="text-sm font-medium text-gray-700 leading-tight truncate"
              >
                {{ product.name }}
              </div>
              <div class="text-xs text-gray-400">{{ product.category }}</div>
            </div>
            <div class="text-right flex-shrink-0">
              <div class="text-sm font-semibold text-gray-800">
                {{ product.orders }}
              </div>
              <div class="text-xs text-gray-400">orders</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Orders + Tenant requests row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
      <!-- Recent orders -->
      <div class="card p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-base font-semibold text-gray-800 mb-0.5">
              Recent Orders
            </h3>
            <p class="text-xs text-gray-400 m-0">Farm shop activity</p>
          </div>
          <a-button
            type="link"
            size="small"
            style="color: #16a34a; padding: 0; font-size: 12px"
          >
            View all
          </a-button>
        </div>
        <a-table
          :data-source="recentOrders"
          :columns="orderColumns"
          :pagination="false"
          size="small"
          :row-class-name="() => 'order-row'"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'status'">
              <a-tag
                :color="
                  record.status === 'Delivered'
                    ? 'success'
                    : record.status === 'Processing'
                      ? 'processing'
                      : 'warning'
                "
                style="border-radius: 6px; font-size: 11px"
              >
                {{ record.status }}
              </a-tag>
            </template>
            <template v-if="column.key === 'total'">
              <span class="font-medium text-gray-800">৳{{ record.total }}</span>
            </template>
          </template>
        </a-table>
      </div>

      <!-- Tenant requests -->
      <div class="card p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-base font-semibold text-gray-800 mb-0.5">
              Tenant Requests
            </h3>
            <p class="text-xs text-gray-400 m-0">
              Complaints, reviews & suggestions
            </p>
          </div>
          <a-badge
            :count="tenantRequests.filter((r) => !r.resolved).length"
            style="background: #ea580c"
          />
        </div>
        <div class="space-y-2">
          <div
            v-for="req in tenantRequests"
            :key="req.id"
            class="flex items-start gap-3 p-3 rounded-xl border transition-colors hover:bg-gray-50 cursor-pointer"
            style="border-color: rgba(0, 0, 0, 0.06)"
          >
            <div
              class="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 mt-0.5"
              :style="{
                background:
                  req.type === 'Complaint'
                    ? '#fef2f2'
                    : req.type === 'Review'
                      ? '#f0fdf4'
                      : '#fff7ed',
              }"
            >
              {{
                req.type === "Complaint"
                  ? "⚠️"
                  : req.type === "Review"
                    ? "⭐"
                    : "💡"
              }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-0.5">
                <span class="text-sm font-medium text-gray-700 truncate">{{
                  req.title
                }}</span>
                <span
                  v-if="!req.resolved"
                  class="flex-shrink-0 w-1.5 h-1.5 rounded-full"
                  style="background: #ea580c"
                />
              </div>
              <div class="text-xs text-gray-400">
                {{ req.tenant }} · Flat {{ req.flat }} · {{ req.date }}
              </div>
            </div>
            <a-tag
              :color="
                req.type === 'Complaint'
                  ? 'error'
                  : req.type === 'Review'
                    ? 'success'
                    : 'warning'
              "
              style="border-radius: 6px; font-size: 10px; flex-shrink: 0"
            >
              {{ req.type }}
            </a-tag>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom row: Order metrics + Account balances + Recent activity -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Order metrics -->
      <div class="card p-6">
        <h3 class="text-base font-semibold text-gray-800 mb-4">
          Order Metrics
        </h3>
        <div class="space-y-4">
          <div v-for="metric in orderMetrics" :key="metric.label">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xs text-gray-500">{{ metric.label }}</span>
              <span class="text-xs font-medium text-gray-700">{{
                metric.value
              }}</span>
            </div>
            <a-progress
              :percent="metric.percent"
              :stroke-color="metric.color"
              :show-info="false"
              :stroke-width="6"
              style="margin: 0"
            />
          </div>
        </div>
      </div>

      <!-- Account balances -->
      <div class="card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-semibold text-gray-800 m-0">
            Account Balances
          </h3>
          <a-button
            type="link"
            size="small"
            style="color: #16a34a; padding: 0; font-size: 12px"
          >
            Manage
          </a-button>
        </div>
        <div class="space-y-3">
          <div
            v-for="account in accountBalances"
            :key="account.name"
            class="flex items-center justify-between p-3 rounded-xl"
            :style="{ background: account.bg }"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 rounded-lg flex items-center justify-center"
                :style="{ background: account.iconBg }"
              >
                <component
                  :is="accountIcons[account.code]"
                  :style="{ color: account.iconColor, fontSize: '16px' }"
                />
              </div>
              <div>
                <div class="text-sm font-medium text-gray-700">
                  {{ account.name }}
                </div>
                <div class="text-xs text-gray-400">{{ account.code }}</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm font-semibold text-gray-800">
                ৳{{ account.balance }}
              </div>
              <div class="text-xs" :style="{ color: account.changeColor }">
                {{ account.change }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent activity feed -->
      <div class="card p-6">
        <h3 class="text-base font-semibold text-gray-800 mb-4">
          Recent Activity
        </h3>
        <div class="relative">
          <!-- Timeline line -->
          <div
            class="absolute left-3.5 top-0 bottom-0 w-px"
            style="background: rgba(0, 0, 0, 0.06)"
          />
          <div class="space-y-4">
            <div
              v-for="activity in recentActivity"
              :key="activity.id"
              class="flex gap-3 relative"
            >
              <div
                class="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 z-10 border-2 border-white"
                :style="{ background: activity.bg }"
              >
                {{ activity.icon }}
              </div>
              <div class="flex-1 pt-0.5">
                <p class="text-xs text-gray-700 m-0 leading-relaxed">
                  {{ activity.text }}
                </p>
                <p class="text-xs text-gray-400 m-0 mt-0.5">
                  {{ activity.time }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  AlertOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  BankOutlined,
  ExportOutlined,
  HomeOutlined,
  PlusOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut, Line } from "vue-chartjs";
import {
  accountBalances,
  dashboardStats,
  expenseBreakdown,
  incomeVsExpenses,
  orderMetrics,
  popularProducts,
  recentActivity,
  recentOrders,
  rentCollectionTrend,
  tenantRequests,
} from "~/lib/mock-data";

definePageMeta({ layout: "default" });

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// ── Chart period toggle ─────────────────────────
const chartPeriod = ref("6M");

// ── Account icons mapping ────────────────────────
const accountIcons: Record<string, any> = {
  "RENT-001": HomeOutlined,
  "FARM-001": ShopOutlined,
  "MAINT-001": ToolOutlined,
};

// ── Primary metric cards ────────────────────────
function fmt(n: number): string {
  return "৳" + n.toLocaleString("en-IN");
}

const primaryCards = computed(() => [
  {
    key: "rent",
    label: "Total Rent Collected",
    value: fmt(dashboardStats.totalRentCollected),
    trend: "+4.2%",
    trendUp: true,
    progress: 82,
    icon: HomeOutlined,
    iconBg: "#f0fdf4",
    iconColor: "#16a34a",
  },
  {
    key: "sales",
    label: "Farm Revenue",
    value: fmt(dashboardStats.farmRevenue),
    trend: "+12.8%",
    trendUp: true,
    progress: 65,
    icon: ShopOutlined,
    iconBg: "#ecfeff",
    iconColor: "#0891b2",
  },
  {
    key: "expenses",
    label: "Total Expenses",
    value: fmt(dashboardStats.totalExpenses),
    trend: "+2.1%",
    trendUp: false,
    progress: 40,
    icon: ToolOutlined,
    iconBg: "#fff7ed",
    iconColor: "#ea580c",
  },
  {
    key: "balance",
    label: "Net Balance",
    value: fmt(dashboardStats.netBalance),
    trend: "+8.5%",
    trendUp: true,
    progress: 90,
    icon: BankOutlined,
    iconBg: "#eff6ff",
    iconColor: "#2563eb",
  },
]);

// ── Secondary stat cards ────────────────────────
const secondaryCards = computed(() => [
  {
    key: "tenants",
    label: "Active Tenants",
    value: String(dashboardStats.activeTenants),
    icon: UserOutlined,
    iconBg: "#eff6ff",
    iconColor: "#2563eb",
  },
  {
    key: "orders",
    label: "Pending Orders",
    value: String(dashboardStats.pendingOrders),
    icon: ShoppingCartOutlined,
    iconBg: "#fff7ed",
    iconColor: "#ea580c",
  },
  {
    key: "employees",
    label: "Employees",
    value: String(dashboardStats.employees),
    icon: TeamOutlined,
    iconBg: "#f5f3ff",
    iconColor: "#7c3aed",
  },
  {
    key: "requests",
    label: "Open Requests",
    value: String(dashboardStats.openRequests),
    icon: AlertOutlined,
    iconBg: "#fef2f2",
    iconColor: "#ef4444",
  },
]);

// ── Bar chart: Income vs Expense ────────────────
const incomeExpenseData = computed(() => ({
  labels: incomeVsExpenses.map((d) => d.month),
  datasets: [
    {
      label: "Income",
      data: incomeVsExpenses.map((d) => d.income),
      backgroundColor: "rgba(22, 163, 74, 0.85)",
      borderRadius: 6,
      borderSkipped: false,
    },
    {
      label: "Expenses",
      data: incomeVsExpenses.map((d) => d.expenses),
      backgroundColor: "rgba(234, 88, 12, 0.75)",
      borderRadius: 6,
      borderSkipped: false,
    },
  ],
}));

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      align: "end" as const,
      labels: {
        boxWidth: 10,
        boxHeight: 10,
        borderRadius: 4,
        useBorderRadius: true,
        font: { family: "DM Sans", size: 12 },
        color: "#5a6075",
        padding: 16,
      },
    },
    tooltip: {
      backgroundColor: "#ffffff",
      titleColor: "#1a1d2e",
      bodyColor: "#5a6075",
      borderColor: "rgba(0,0,0,0.08)",
      borderWidth: 1,
      padding: 12,
      cornerRadius: 10,
      callbacks: {
        label: (ctx: any) => ` ৳${ctx.raw.toLocaleString()}`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: { font: { family: "DM Sans", size: 11 }, color: "#9aa3be" },
    },
    y: {
      grid: { color: "rgba(0,0,0,0.04)", drawBorder: false },
      border: { display: false, dash: [4, 4] },
      ticks: {
        font: { family: "DM Sans", size: 11 },
        color: "#9aa3be",
        callback: (v: any) => `৳${(v / 1000).toFixed(0)}k`,
      },
    },
  },
};

// ── Doughnut: Expense breakdown ─────────────────
const expenseCategories = computed(() => [
  { label: "Maintenance", amount: "৳8,400", color: "#ea580c" },
  { label: "Salaries", amount: "৳9,200", color: "#2563eb" },
  { label: "Utilities", amount: "৳2,800", color: "#0891b2" },
  { label: "Miscellaneous", amount: "৳1,900", color: "#7c3aed" },
]);

const expenseBreakdownData = computed(() => ({
  labels: expenseCategories.value.map((e) => e.label),
  datasets: [
    {
      data: expenseBreakdown.map((e) => e.amount),
      backgroundColor: expenseCategories.value.map((e) => e.color),
      borderWidth: 3,
      borderColor: "#ffffff",
      hoverOffset: 4,
    },
  ],
}));

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "72%",
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#ffffff",
      titleColor: "#1a1d2e",
      bodyColor: "#5a6075",
      borderColor: "rgba(0,0,0,0.08)",
      borderWidth: 1,
      padding: 12,
      cornerRadius: 10,
    },
  },
};

// ── Line chart: Rent trend ──────────────────────
const rentTrendData = computed(() => ({
  labels: rentCollectionTrend.map((d) => d.month),
  datasets: [
    {
      label: "Collected",
      data: rentCollectionTrend.map((d) => d.collected),
      borderColor: "#16a34a",
      backgroundColor: "rgba(22, 163, 74, 0.08)",
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "#16a34a",
      pointRadius: 4,
      pointHoverRadius: 6,
    },
    {
      label: "Target",
      data: rentCollectionTrend.map((d) => d.target),
      borderColor: "#c8d0e0",
      backgroundColor: "transparent",
      borderDash: [4, 4],
      tension: 0.4,
      pointRadius: 0,
    },
  ],
}));

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      align: "end" as const,
      labels: {
        boxWidth: 10,
        boxHeight: 2,
        font: { family: "DM Sans", size: 12 },
        color: "#5a6075",
        padding: 16,
      },
    },
    tooltip: {
      backgroundColor: "#ffffff",
      titleColor: "#1a1d2e",
      bodyColor: "#5a6075",
      borderColor: "rgba(0,0,0,0.08)",
      borderWidth: 1,
      padding: 12,
      cornerRadius: 10,
      callbacks: {
        label: (ctx: any) => ` ৳${ctx.raw.toLocaleString()}`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: { font: { family: "DM Sans", size: 11 }, color: "#9aa3be" },
    },
    y: {
      grid: { color: "rgba(0,0,0,0.04)" },
      border: { display: false },
      ticks: {
        font: { family: "DM Sans", size: 11 },
        color: "#9aa3be",
        callback: (v: any) => `৳${(v / 1000).toFixed(0)}k`,
      },
    },
  },
};

// ── Order table columns ──────────────────────────
const orderColumns = [
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
    ellipsis: true,
  },
  { title: "Items", dataIndex: "items", key: "items" },
  { title: "Total", dataIndex: "total", key: "total" },
  { title: "Status", dataIndex: "status", key: "status" },
];
</script>

<style scoped>
/* .dashboard {
  max-width: 1400px;
} */

:deep(.order-row td) {
  font-size: 13px !important;
}

:deep(.ant-table-thead > tr > th) {
  background: #f4f6fb !important;
  font-size: 12px !important;
  font-weight: 500;
  color: #5a6075 !important;
  padding: 8px 12px !important;
}

:deep(.ant-table-tbody > tr > td) {
  padding: 8px 12px !important;
  border-bottom-color: rgba(0, 0, 0, 0.04) !important;
}

:deep(.ant-table-tbody > tr:hover > td) {
  background: #f4f6fb !important;
}

:deep(.ant-progress-inner) {
  border-radius: 4px !important;
}

:deep(.ant-progress-bg) {
  border-radius: 4px !important;
}
</style>
