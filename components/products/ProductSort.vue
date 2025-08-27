<template>
  <div class="product-sort">
    <label>
      Sort by:
      <Dropdown
        v-model="sortKey"
        :options="SORT_KEY_OPTIONS"
      />
    </label>
    <label>
      Order:
      <Dropdown
        v-model="sortOrder"
        :options="SORT_ORDER_OPTIONS"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
import { useProductSort } from '~/composables/products/useProductSort'
import { SORT_KEY_OPTIONS, SORT_ORDER_OPTIONS } from '~/utils/sortOptions'
import Dropdown from '~/components/ui/DropDown.vue'

const { sortKey, sortOrder } = useProductSort()
</script>

<style scoped>
.product-sort {
  display: flex;
  gap: 10px;
}
.product-sort label {
  color: #00ff00;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
