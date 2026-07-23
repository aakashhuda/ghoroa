<template>
  <a-form layout="vertical" :model="formState" class="grid grid-cols-1 md:grid-cols-2 gap-x-6" @finish="handleSubmit">
    <a-form-item label="Name" name="name" :rules="[{ required: true, message: 'Please enter flat name' }]">
      <a-input v-model:value="formState.name" placeholder="e.g. Flat A1" />
    </a-form-item>
    <a-form-item label="Code" name="code" :rules="[{ required: true, message: 'Please enter flat code' }]">
      <a-input v-model:value="formState.code" placeholder="e.g. A1" />
    </a-form-item>
    <a-form-item label="Floor" name="floor" :rules="[{ required: true, message: 'Please select floor' }]">
      <a-input-number v-model:value="formState.floor" :min="0" class="w-full" />
    </a-form-item>
    <a-form-item label="Electric Meter" name="electricMeterId" :rules="[{ required: true, message: 'Please select electric meter' }]">
      <a-select v-model:value="formState.electricMeterId" placeholder="Select electric meter" show-search :filter-option="false" @search="searchElectricMeters">
        <a-select-option v-for="m in electricMeterOptions" :key="m.id" :value="m.id">{{ m.displayValue || m.name || 'Meter #' + m.meterNo }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="Gas Meter" name="gasMeterId" :rules="[{ required: true, message: 'Please select gas meter' }]" class="md:col-span-2">
      <a-select v-model:value="formState.gasMeterId" placeholder="Select gas meter" show-search :filter-option="false" @search="searchGasMeters">
        <a-select-option v-for="m in gasMeterOptions" :key="m.id" :value="m.id">{{ m.displayValue || m.name || 'Meter #' + m.meterNo }}</a-select-option>
      </a-select>
    </a-form-item>
    <div class="md:col-span-2 flex justify-end gap-3">
      <a-button type="primary" danger class="admin-btn" @click="emit('cancel')">Cancel</a-button>
      <a-button type="primary" html-type="submit" class="admin-btn" :loading="loading">{{ isEdit ? 'Update' : 'Save' }}</a-button>
    </div>
  </a-form>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  isEdit?: boolean
  initialData?: Record<string, unknown> | null
  loading?: boolean
}>(), {
  isEdit: false,
  initialData: null,
  loading: false,
})

const emit = defineEmits<{
  submit: [values: Record<string, unknown>]
  cancel: []
}>()

const formState = reactive({
  name: props.initialData?.name as string || '',
  code: props.initialData?.code as string || '',
  floor: (props.initialData?.floor as number) ?? undefined,
  electricMeterId: props.initialData?.electricMeterId as string || '',
  gasMeterId: props.initialData?.gasMeterId as string || '',
})

const electricMeterOptions = ref<{ id: string; name: string | null; meterNo: number; displayValue?: string }[]>([])
const gasMeterOptions = ref<{ id: string; name: string | null; meterNo: number; displayValue?: string }[]>([])

async function searchElectricMeters(query: string) {
  try {
    const api = useNuxtApp().$axios
    const res = await api.get('/electric-meter', { params: { search: query, pageSize: 100 } })
    electricMeterOptions.value = res.data.data
  } catch {
    electricMeterOptions.value = []
  }
}

async function searchGasMeters(query: string) {
  try {
    const api = useNuxtApp().$axios
    const res = await api.get('/gas-meter', { params: { search: query, pageSize: 100 } })
    gasMeterOptions.value = res.data.data
  } catch {
    gasMeterOptions.value = []
  }
}

onMounted(async () => {
  await Promise.all([searchElectricMeters(''), searchGasMeters('')])
})

function handleSubmit() {
  emit('submit', { ...formState } as unknown as Record<string, unknown>)
}
</script>
