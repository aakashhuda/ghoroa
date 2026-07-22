<template>
  <a-form layout="vertical" :model="formState" class="grid grid-cols-1 md:grid-cols-2 gap-x-6" @finish="handleSubmit">
    <a-form-item label="User" name="userId" :rules="[{ required: true, message: 'Please select a user' }]">
      <a-select v-model:value="formState.userId" placeholder="Select tenant user" show-search :filter-option="false" @search="searchUsers">
        <a-select-option v-for="u in userOptions" :key="u.id" :value="u.id">{{ u.name }} ({{ u.email }})</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="Flat" name="flatId" :rules="[{ required: true, message: 'Please select a flat' }]">
      <a-select v-model:value="formState.flatId" placeholder="Select flat" show-search :filter-option="false" @search="searchFlats">
        <a-select-option v-for="f in flatOptions" :key="f.id" :value="f.id">{{ f.name }} ({{ f.code }})</a-select-option>
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
      <a-input v-model:value="formState.joinDate" type="date" class="w-full" />
    </a-form-item>
    <div class="md:col-span-2 flex justify-end gap-3">
      <a-button @click="emit('cancel')">Cancel</a-button>
      <a-button type="primary" html-type="submit">{{ isEdit ? 'Update' : 'Create' }}</a-button>
    </div>
  </a-form>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
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
  userId: props.initialData?.userId as string || '',
  flatId: props.initialData?.flatId as string || '',
  whatsappNumber: props.initialData?.whatsappNumber as string || '',
  headCount: (props.initialData?.headCount as number) || 1,
  rent: (props.initialData?.rent as number) || undefined,
  utilities: (props.initialData?.utilities as number) || undefined,
  advance: (props.initialData?.advance as number) || undefined,
  joinDate: props.initialData?.joinDate
    ? (props.initialData.joinDate as string).substring(0, 10)
    : '',
})

const userOptions = ref<{ id: string; name: string; email: string }[]>([])
const flatOptions = ref<{ id: string; name: string; code: string }[]>([])

async function searchUsers(query: string) {
  try {
    const api = useNuxtApp().$axios
    const res = await api.get('/user', { params: { search: query, type: 'TENANT', unassigned: true, pageSize: 20 } })
    userOptions.value = res.data.data
  } catch {
    userOptions.value = []
  }
}

async function searchFlats(query: string) {
  try {
    const api = useNuxtApp().$axios
    const res = await api.get('/flat', { params: { search: query, unassigned: true, pageSize: 20 } })
    flatOptions.value = res.data.data.map((f: { id: string; name: string; code: string }) => ({ id: f.id, name: f.name, code: f.code }))
  } catch {
    flatOptions.value = []
  }
}

onMounted(async () => {
  await Promise.all([searchUsers(''), searchFlats('')])
})

function handleSubmit() {
  emit('submit', { ...formState } as unknown as Record<string, unknown>)
}
</script>
