<template>
  <a-form layout="vertical" :model="formState" class="grid grid-cols-1 md:grid-cols-2 gap-x-6" @finish="handleSubmit">
    <a-form-item label="Name" name="name">
      <a-input v-model:value="formState.name" placeholder="e.g. Main Gas Meter" />
    </a-form-item>
    <a-form-item label="Meter No" name="meterNo" :rules="[{ required: true, message: 'Please enter meter number' }]">
      <a-input-number v-model:value="formState.meterNo" :min="0" class="w-full" />
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
  meterNo: (props.initialData?.meterNo as number) ?? undefined,
})

function handleSubmit() {
  emit('submit', { ...formState } as unknown as Record<string, unknown>)
}
</script>
