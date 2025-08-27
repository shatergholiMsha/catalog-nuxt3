<template>
  <div>
    <Loading v-if="isLoading" :size="24" />

    <div v-else-if="product" class="product-details">
      <BackButton />

      <div class="details-content">
        <div class="image-gallery">
          <img class="main-image" :src="selectedImage" alt="Product image" >
        </div>

        <div class="info">
          <h1>{{ product.title }}</h1>
          <p class="price">$ {{ product.price }}</p>
          <p class="rating">★ {{ product.rating }}</p>
          <p class="category">Category: {{ product.category }}</p>
          <p class="category">warranty: {{ product.warrantyInformation }}</p>
          <p class="category">weight: {{ product.weight }}</p>
          <p class="description">{{ product.description }}</p>
          <div v-if="QrCode" class="qr-code">
            <img :src="QrCode" alt="QR Code" >
            <p>Scan to view product</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { createError } from '#app'
import Loading from '../../components/ui/Loading.vue'
import { useSWRFetch } from '../../composables/api/useSWRFetch'
import { useProductsStore } from '../../stores/products'
import type { Product } from '../../types/products/product'
import BackButton from '../../components/ui/buttons/BackButton.vue'


const route = useRoute()
const id = Number(route.params.id)
const productsStore = useProductsStore()

const localProduct = productsStore.list.find((p) => p.id === id)

let data: Ref<Product | null> | undefined
let error: Ref<Error | null> | undefined
let isLoading: Ref<boolean> | undefined
  
if (!localProduct) {
  ({ data, error, isLoading } = useSWRFetch<Product>(
    `https://dummyjson.com/products/${id}`
  ))
}

const product = computed<Product | null>(() => {
  return localProduct || data?.value || null
})

const selectedImage = computed<string>(() => {
  if (product.value?.images?.length) return product.value.images[0]
  return 'https://via.placeholder.com/150/00ff00/000000?text=No+Image'
})

const QrCode = computed<string | null>(() => {
  return (product.value as Product & { qrCode?: string })?.qrCode || product.value?.meta?.qrCode || null
})

if (!localProduct && error?.value) {
  const err = error.value as {
    statusCode?: number
    statusMessage?: string
    message?: string
  }
  throw createError({
    statusCode: err.statusCode || 404,
    message: err.statusMessage || err.message || 'Product not found'
  })
}
</script>


<style scoped>
.product-details {
  color: #00ff00;
  padding: 2rem;
}
.details-content {
  display: grid;
  gap: 2rem;
}
@media (min-width: 768px) {
  .details-content {
    grid-template-columns: 1fr 1fr;
  }
}
.main-image {
  width: 100%;
  border: 1px solid #00ff00;
  border-radius: 4px;
}
.qr-code {
  margin-top: 1rem;
  text-align: left;
}
.qr-code img {
  border: 1px solid #00ff00;
  padding: 4px;
  background: white;
}
.qr-code p {
  font-size: 0.8rem;
  color: #00ff00aa;
}
.info h1 {
  margin: 0;
  color: #00ff00;
}
.price {
  color: #ffb400;
  font-weight: bold;
  font-size: 1.2rem;
}
.rating {
  margin: 0.5rem 0;
  color: #ffb400;
}
.category {
  font-size: 0.9rem;
  color: #00ff00aa;
}
.description {
  margin-top: 1rem;
}
.error {
  text-align: center;
  padding: 2rem;
}
</style>
