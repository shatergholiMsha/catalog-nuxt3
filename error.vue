<template>
  <div class="error-screen">
    <div class="title">{{ error.statusCode }} - {{ error.message }}</div>
    <NuxtLink to="/" class="neo-button"> &lt; Home &gt; </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{ error: { statusCode: number; message?: string } }>()
</script>

<style scoped>
.error-screen {
  background-color: black;
  color: #00ff00;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  height: auto;
  font-size: 1.8rem;
  text-shadow:
    0 0 5px #00ff00,
    0 0 10px #00ff00;
  animation: flicker 9.5s infinite alternate;
}
.title {
  font-size: 4rem;
  text-shadow:
    0 0 5px #00ff00,
    0 0 10px #00ff00;
  animation: flicker 5.5s infinite alternate;
}
@keyframes flicker {
  0%,
  18%,
  22%,
  25%,
  53%,
  57%,
  100% {
    opacity: 1;
    text-shadow:
      0 0 4px #00ff00,
      0 0 11px #00ff00,
      0 0 19px #00ff00,
      0 0 40px #00ff00;
  }
  20%,
  24%,
  55% {
    opacity: 0.8;
    text-shadow: none;
  }
}
</style>
