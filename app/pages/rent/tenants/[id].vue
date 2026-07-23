<template>
  <div>
    <PageHeader title="Tenant Details" show-back />
    <div v-if="store.loading">
      <div class="card p-6 mb-6">
        <a-skeleton active :paragraph="{ rows: 8 }" />
      </div>
    </div>
    <div v-else-if="store.currentTenant">
      <div class="card p-6 mb-6">
        <a-descriptions bordered :column="{ xs: 1, sm: 2, md: 3 }">
          <a-descriptions-item label="Name" :span="3">{{
            store.currentTenant.user?.name || "-"
          }}</a-descriptions-item>
          <a-descriptions-item label="Email" :span="3">{{
            store.currentTenant.user?.email
          }}</a-descriptions-item>
          <a-descriptions-item label="Flat">{{
            store.currentTenant.flat?.name || "-"
          }}</a-descriptions-item>
          <a-descriptions-item label="WhatsApp">{{
            store.currentTenant.whatsappNumber || "-"
          }}</a-descriptions-item>
          <a-descriptions-item label="Head Count">{{
            store.currentTenant.headCount
          }}</a-descriptions-item>
          <a-descriptions-item label="Rent"
            >৳{{ store.currentTenant.rent }}</a-descriptions-item
          >
          <a-descriptions-item label="Utilities">{{
            store.currentTenant.utilities
              ? "৳" + store.currentTenant.utilities
              : "-"
          }}</a-descriptions-item>
          <a-descriptions-item label="Advance">{{
            store.currentTenant.advance
              ? "৳" + store.currentTenant.advance
              : "-"
          }}</a-descriptions-item>
          <a-descriptions-item label="Join Date">{{
            formatToBD(store.currentTenant.joinDate)
          }}</a-descriptions-item>
        </a-descriptions>
      </div>

      <a-tabs>
        <a-tab-pane key="transactions" tab="Rent Transactions">
          <div class="card p-6">
            <p v-if="transactions.length === 0" class="text-gray-500">
              No transactions yet.
            </p>
            <a-table
              v-else
              :columns="txColumns"
              :data-source="transactions"
              :pagination="false"
              row-key="id"
            >
              <template
                #bodyCell="{
                  column,
                  record,
                }: {
                  column: { key: string };
                  record: Record<string, unknown>;
                }"
              >
                <template v-if="column.key === 'amount'"
                  >৳{{ record.amount }}</template
                >
                <template v-if="column.key === 'createdAt'">{{
                  formatToBD(record.createdAt as string)
                }}</template>
              </template>
            </a-table>
          </div>
        </a-tab-pane>
        <a-tab-pane key="flat" tab="Flat Info">
          <div class="card p-6">
            <p v-if="!store.currentTenant.flat" class="text-gray-500">
              No flat assigned.
            </p>
            <a-descriptions v-else bordered :column="2">
              <a-descriptions-item label="Name">{{
                store.currentTenant.flat.name
              }}</a-descriptions-item>
              <a-descriptions-item label="Code">{{
                store.currentTenant.flat.code
              }}</a-descriptions-item>
              <a-descriptions-item label="Floor">{{
                store.currentTenant.flat.floor
              }}</a-descriptions-item>
            </a-descriptions>
          </div>
        </a-tab-pane>
        <a-tab-pane key="meters" tab="Meters">
          <div v-if="store.currentTenant.flat" class="space-y-4">
            <div class="card p-6">
              <h4 class="mb-3 font-medium">Electric Meter</h4>
              <p
                v-if="!store.currentTenant.flat.electricMeter"
                class="text-gray-500"
              >
                Not assigned.
              </p>
              <a-descriptions v-else bordered :column="2">
                <a-descriptions-item label="Meter">{{
                  store.currentTenant.flat.electricMeter.displayValue ||
                  store.currentTenant.flat.electricMeter.meterNo
                }}</a-descriptions-item>
              </a-descriptions>
            </div>
            <div class="card p-6">
              <h4 class="mb-3 font-medium">Gas Meter</h4>
              <p
                v-if="!store.currentTenant.flat.gasMeter"
                class="text-gray-500"
              >
                Not assigned.
              </p>
              <a-descriptions v-else bordered :column="2">
                <a-descriptions-item label="Meter">{{
                  store.currentTenant.flat.gasMeter.displayValue ||
                  store.currentTenant.flat.gasMeter.meterNo
                }}</a-descriptions-item>
              </a-descriptions>
            </div>
          </div>
          <p v-else class="card p-6 text-gray-500">No flat assigned.</p>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div v-else class="card p-6 text-gray-500">Tenant not found</div>
  </div>
</template>

<script setup lang="ts">
import { formatToBD } from "~/utils/formatDate";

definePageMeta({ layout: "default" });

const route = useRoute();
const store = useTenantStore();
const id = route.params.id as string;

const transactions = computed(() => {
  const t = store.currentTenant as Record<string, unknown> | null;
  return (t?.rentTransactions as Record<string, unknown>[]) || [];
});

const txColumns = [
  { title: "Amount", dataIndex: "amount", key: "amount" },
  {
    title: "Received By",
    dataIndex: ["receivedBy", "name"],
    key: "receivedBy",
  },
  { title: "Date", dataIndex: "createdAt", key: "createdAt" },
];

onMounted(() => store.fetchById(id));
</script>
