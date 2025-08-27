<template>
  <label class="form-label">
    {{ label }}
    <component
      :is="textarea ? 'textarea' : 'input'"
      v-model="internalValue"
      :type="type"
      class="form-input"
      v-bind="$attrs"
    />
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string | number | null
  label: string
  type?: string
  textarea?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void
}>()

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<style scoped>
.form-label {
  display: flex;
  flex-direction: column;
  color: #00ff00;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}
.form-input {
  padding: .5rem;
  border: 1px solid #00ff00;
  border-radius: 4px;
  background: transparent;
  color: #00ff00;
}
</style>
