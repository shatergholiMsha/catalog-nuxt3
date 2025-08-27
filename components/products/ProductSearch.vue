<template>
  <div class="search-box">
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search products..."
      @input="$emit('update:modelValue', searchTerm)"
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const _emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
const searchTerm = ref('')
</script>

<style scoped>
.search-box {
  display: flex;
  justify-content: center;
  margin-top: 1.3rem;
}
.search-box input {
  padding: 0.6rem 1rem;
  border: 1px solid #00ff00;
  box-shadow: 0 0 8px #00ff00;
  background-color: transparent;
  color: #00ff00;
  border-radius: 4px;
  outline: none;
  width: 100%;
  min-width: 310px;
}
.search-box input::placeholder {
  color: #00ff00aa;
}
</style>
