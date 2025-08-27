<template>
  <div class="loading-container">
    <div class="matrix-loading" :style="{ fontSize: size + 'px' }">
      <span
        v-for="n in 20"
        :key="n"
        class="symbol"
        :style="{ animationDelay: n * 0.05 + 's' }"
      >
        {{ randomChar() }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const props = defineProps<{
  size?: number
}>()

const size = props.size || 24
const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const randomChar = () => chars.charAt(Math.floor(Math.random() * chars.length))

onMounted(() => {
  setInterval(() => {
    const symbols = document.querySelectorAll<HTMLElement>(
      '.matrix-loading .symbol'
    )
    symbols.forEach((el) => {
      el.textContent = randomChar()
    })
  }, 100)
})

</script>

<style scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  z-index: 9999;
}

.matrix-loading {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  font-family: 'Share Tech Mono', monospace;
  color: #00ff00;
  text-shadow: 0 0 4px #00ff00;
}

.symbol {
  animation: flicker 1.2s infinite;
}

@keyframes flicker {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
</style>
