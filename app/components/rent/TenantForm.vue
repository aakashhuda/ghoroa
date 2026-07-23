<template>
  <a-form layout="vertical" :model="formState" class="grid grid-cols-1 md:grid-cols-2 gap-x-6" @finish="handleSubmit">
    <template v-if="!isEdit">
      <a-form-item label="Name" name="name" :rules="[{ required: true, message: 'Please enter tenant name' }]">
        <a-input v-model:value="formState.name" placeholder="e.g. John Doe" />
      </a-form-item>
      <a-form-item label="Email" name="email" :rules="[{ required: true, message: 'Please enter email' }, { type: 'email', message: 'Invalid email' }]">
        <a-input v-model:value="formState.email" placeholder="e.g. tenant@email.com" />
      </a-form-item>
      <a-form-item label="Phone" name="phone">
        <a-input v-model:value="formState.phone" placeholder="e.g. +8801XXXXXXXXX" />
      </a-form-item>
      <a-form-item label="NID" name="nid">
        <a-input v-model:value="formState.nid" placeholder="Enter NID number" />
      </a-form-item>
      <a-form-item label="Image" name="image">
        <a-input v-model:value="formState.image" placeholder="Image URL (unused)" disabled />
      </a-form-item>
    </template>
    <template v-else>
      <a-form-item label="Name" name="name">
        <a-input v-model:value="formState.name" placeholder="Update tenant name" />
      </a-form-item>
      <a-form-item label="NID" name="nid">
        <a-input v-model:value="formState.nid" placeholder="Update NID number" />
      </a-form-item>
      <a-form-item label="Image" name="image">
        <a-input v-model:value="formState.image" placeholder="Image URL (unused)" disabled />
      </a-form-item>
    </template>
    <a-form-item label="Flat" name="flatId" :rules="[{ required: true, message: 'Please select a flat' }]">
      <a-select v-model:value="formState.flatId" placeholder="Select flat" show-search :filter-option="false" @search="searchFlats">
        <a-select-option v-for="f in flatOptions" :key="f.id" :value="f.id">{{ f.displayValue || f.name }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="WhatsApp Number" name="whatsappNumber">
      <a-input v-model:value="formState.whatsappNumber" placeholder="Enter WhatsApp number" />
    </a-form-item>
    <a-form-item label="Head Count" name="headCount" :rules="[{ required: true, message: 'Please enter head count' }]">
      <a-input-number v-model:value="formState.headCount" :min="1" class="w-full" />
    </a-form-item>
    <a-form-item label="Rent" name="rent" :rules="[{ required: true, message: 'Please enter rent amount' }]">
      <a-input-number v-model:value="formState.rent" :min="0" :precision="2" class="w-full" />
    </a-form-item>
    <a-form-item label="Utilities" name="utilities">
      <a-input-number v-model:value="formState.utilities" :min="0" :precision="2" class="w-full" />
    </a-form-item>
    <a-form-item label="Advance" name="advance">
      <a-input-number v-model:value="formState.advance" :min="0" :precision="2" class="w-full" />
    </a-form-item>
    <a-form-item label="Join Date" name="joinDate" :rules="[{ required: true, message: 'Please select join date' }]">
      <a-date-picker v-model:value="formState.joinDate" class="w-full" />
    </a-form-item>
    <div class="md:col-span-2 flex justify-end gap-3">
      <a-button type="primary" danger class="admin-btn" @click="emit('cancel')">Cancel</a-button>
      <a-button type="primary" html-type="submit" class="admin-btn" :loading="loading">{{ isEdit ? 'Update' : 'Save' }}</a-button>
    </div>
  </a-form>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

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
  // User fields
  name: (props.initialData?.user as Record<string, unknown>)?.name as string || '',
  email: props.initialData?.email as string || '',
  phone: props.initialData?.phone as string || '',
  nid: (props.initialData?.user as Record<string, unknown>)?.nid as string || '',
  image: (props.initialData?.user as Record<string, unknown>)?.image as string || '',
  // Tenant fields
  flatId: props.initialData?.flatId as string || '',
  whatsappNumber: props.initialData?.whatsappNumber as string || '',
  headCount: (props.initialData?.headCount as number) || 1,
  rent: (props.initialData?.rent as number) || undefined,
  utilities: (props.initialData?.utilities as number) || undefined,
  advance: (props.initialData?.advance as number) || undefined,
  joinDate: props.initialData?.joinDate
    ? dayjs(props.initialData.joinDate as string)
    : null,
})

const flatOptions = ref<{ id: string; name: string; code: string; displayValue?: string }[]>([])

async function searchFlats(query: string) {
  try {
    const api = useNuxtApp().$axios
    const res = await api.get('/flat', { params: { search: query, unassigned: true, pageSize: 20 } })
    flatOptions.value = res.data.data.map((f: { id: string; name: string; code: string; displayValue?: string }) => ({
      id: f.id,
      name: f.name,
      code: f.code,
      displayValue: f.displayValue,
    }))
  } catch {
    flatOptions.value = []
  }
}

onMounted(async () => {
  await searchFlats('')
})

function handleSubmit() {
  const data = { ...formState }
  data.joinDate = formState.joinDate ? dayjs(formState.joinDate).format('YYYY-MM-DD') : ''
  emit('submit', data as unknown as Record<string, unknown>)
}
</script>
