<template>
  <a-form layout="vertical" :model="formState" class="grid grid-cols-1 md:grid-cols-2 gap-x-6" @finish="handleSubmit">
    <a-form-item label="Tenant" name="tenantId" :rules="[{ required: true, message: 'Please select a tenant' }]">
      <a-select v-model:value="formState.tenantId" placeholder="Select tenant" show-search :filter-option="false" @search="searchTenants">
        <a-select-option v-for="t in tenantOptions" :key="t.id" :value="t.id">
          {{ t.user?.name || 'Unknown' }} — {{ t.flat?.name || 'No flat' }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="Amount" name="amount" :rules="[{ required: true, message: 'Please enter amount' }]">
      <a-input-number v-model:value="formState.amount" :min="0" :precision="2" class="w-full" />
    </a-form-item>
    <a-form-item label="Received By" name="receivedById" :rules="[{ required: true, message: 'Please select receiver' }]">
      <a-select v-model:value="formState.receivedById" placeholder="Select user">
        <a-select-option v-for="u in userOptions" :key="u.id" :value="u.id">{{ u.name }} ({{ u.email }})</a-select-option>
      </a-select>
    </a-form-item>
    <div class="md:col-span-2 flex justify-end gap-3">
      <a-button @click="emit('cancel')">Cancel</a-button>
      <a-button type="primary" html-type="submit">Create</a-button>
    </div>
  </a-form>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  isEdit?: boolean
  initialData?: Record<string, unknown> | null
}>(), {
  isEdit: false,
  initialData: null,
})

const emit = defineEmits<{
  submit: [values: Record<string, unknown>]
  cancel: []
}>()

const formState = reactive({
  tenantId: '',
  amount: undefined as number | undefined,
  receivedById: '',
})

const tenantOptions = ref<{ id: string; user: { name: string } | null; flat: { name: string } | null }[]>([])
const userOptions = ref<{ id: string; name: string; email: string }[]>([])

async function searchTenants(query: string) {
  try {
    const api = useNuxtApp().$axios
    const res = await api.get('/tenant', { params: { search: query, pageSize: 20 } })
    tenantOptions.value = res.data.data
  } catch {
    tenantOptions.value = []
  }
}

async function searchUsers() {
  try {
    const api = useNuxtApp().$axios
    const res = await api.get('/user', { params: { pageSize: 50 } })
    userOptions.value = res.data.data
  } catch {
    userOptions.value = []
  }
}

onMounted(async () => {
  await Promise.all([searchTenants(''), searchUsers()])
})

function handleSubmit() {
  emit('submit', { ...formState } as unknown as Record<string, unknown>)
}
</script>
