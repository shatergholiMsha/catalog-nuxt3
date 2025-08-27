<template>
  <button class="back-btn" @click="goBack">← Back</button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => {
  router.back()
}
</script>

<style scoped>
.back-btn {
  background: transparent;
  border: 1px solid #00ff00;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  color: #00ff00;
  border-radius: 4px;
  transition: all 0.2s ease;
  margin-bottom: 3px;
}

.back-btn:hover {
  background-color: rgba(0, 255, 0, 0.1);
}
</style>
