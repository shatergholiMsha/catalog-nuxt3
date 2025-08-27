<template>
  <div ref="dropdownRef" class="matrix-dropdown" @click="toggle">
    <span class="selected-label">{{ selectedLabel }}</span>
    <span class="arrow">&#9663;</span>

    <transition name="fade">
      <ul v-if="open" class="dropdown-menu">
        <li
          v-for="option in options"
          :key="option.value"
          @click.stop="select(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  modelValue: string
  options: { label: string; value: string }[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const open = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const toggle = () => {
  open.value = !open.value
}

const select = (option: { label: string; value: string }) => {
  emit('update:modelValue', option.value)
  open.value = false
}

const selectedLabel = computed(() => {
  const found = props.options.find(o => o.value === props.modelValue)
  return found ? found.label : ''
})

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') open.value = false
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<style scoped>
.matrix-dropdown {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  background: rgb(25, 25, 25);
  color: #00ff00;
  border: 1px solid #00ff00;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  min-width: 150px;
  user-select: none;
}

.selected-label {
  flex: 1;
}

.arrow {
  margin-left: 0.5rem;
  font-size: 0.9rem;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: rgb(25, 25, 25);
  border: 1px solid #00ff00;
  box-shadow: 0 0 8px #00ff00;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 1000;
}

.dropdown-menu li {
  padding: 0.4rem 0.6rem;
}

.dropdown-menu li:hover {
  background: #003300;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
