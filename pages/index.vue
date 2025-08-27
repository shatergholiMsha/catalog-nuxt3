<template>
  <div>
    <Loading v-if="isLoading" />
    <ProductList v-else :products="products" />
  </div>
</template>

<script setup lang="ts">
import { createError } from 'nuxt/app'
import ProductList from '../components/products/ProductList.vue'
import Loading from '../components/ui/Loading.vue'
import { useSWRFetch } from '../composables/api/useSWRFetch'

const { data: products, isLoading, error } = useSWRFetch('https://dummyjson.com/products')

if (error.value) {
  const err = error.value as { statusCode?: number; statusMessage?: string; message?: string }
  throw createError({
    statusCode: err.statusCode || 500,
    message: err.statusMessage || err.message || 'Failed to load products'
  })
}
</script>
