<template>
  <div class="product-list">
    <div class="product-toolbar">
      <ProductSort />
      <div class="product-toolbar-right">
        <ProductSearch v-model="searchQuery" />
      </div>
    </div>

    <Loading v-if="isLoading && allProducts.length === 0" :size="20" />
    <!-- <div class="error" v-else-if="error">{{ error.message }}</div> -->

    <div class="product-grid">
      <div
        v-for="product in visibleProducts"
        :key="product.id"
        class="card"
        @click="$router.push(`/products/${product.id}`)"
      >
        <img :src="product.images[0]" loading="lazy" >
        <div class="product-header">
          <h3>{{ product.title }}</h3>
          <h5>★ {{ product.rating }}</h5>
        </div>
        <p class="price">$ {{ product.price }}</p>
      </div>
    </div>
    <div ref="loadMoreTrigger" class="load-more-trigger"/>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import ProductSort from '~/components/products/ProductSort.vue'
import ProductSearch from '~/components/products/ProductSearch.vue'
import Loading from '~/components/ui/Loading.vue'
import { useProductSort } from '~/composables/products/useProductSort'
import { useSWRFetch } from '~/composables/api/useSWRFetch'
import type { ProductListResponse, Product } from '~/types/products/product'
import { useProductsStore } from '~/stores/products'

const productsStore = useProductsStore()

const { data: apiData, isLoading } = useSWRFetch<ProductListResponse>(
  'https://dummyjson.com/products?limit=1000'
)

const allProducts = computed<Product[]>(() => {
  const apiProducts = apiData.value?.products || []
  const storeProducts = productsStore.list as Product[]
  return [...storeProducts, ...apiProducts]
})

const searchQuery = ref('')
const { sortProducts } = useProductSort()

const filteredProducts = computed(() => {
  const term = searchQuery.value.trim().toLowerCase()
  return allProducts.value.filter((p) =>
    p.title.toLowerCase().includes(term)
  )
})

const sortedProducts = computed(() => sortProducts(filteredProducts.value))

const batchSize = 20
const batchCount = ref(1)
const visibleProducts = computed(() =>
  sortedProducts.value.slice(0, batchCount.value * batchSize)
)

const loadMoreTrigger = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (
        entries[0].isIntersecting &&
        visibleProducts.value.length < sortedProducts.value.length
      ) {
        batchCount.value++
      }
    },
    { rootMargin: '200px' }
  )
  if (loadMoreTrigger.value) observer.observe(loadMoreTrigger.value)
})

onBeforeUnmount(() => {
  if (observer && loadMoreTrigger.value) {
    observer.unobserve(loadMoreTrigger.value)
  }
})
</script>

<style scoped>
.product-list {
  color: #00ff0072;
}
.product-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.error {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}
.card {
  background: #2c2c2c;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}
.card:hover {
  transform: scale(1.02);
  box-shadow: 0 0 5px #00ff00;
  transition: 0.2s ease;
  cursor: pointer;
}
.card img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  padding: 12px;
}
.product-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.price {
  color: #ffb400;
  font-weight: bold;
  padding: 10px 10px 10px 0;
}
</style>
