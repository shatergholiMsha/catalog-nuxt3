import { ref } from 'vue'
import type { Product } from '~/types/products/product'

export const sortKey = ref<'price' | 'rating'>('price')
export const sortOrder = ref<'asc' | 'desc'>('asc')

export function useProductSort() {
  const sortProducts = (products: Product[]) => {
    if (!products) return []
    const key = sortKey.value
    const order = sortOrder.value === 'asc' ? 1 : -1
    return [...products].sort((a, b) => {
      return (Number(a[key]) - Number(b[key])) * order
    })
  }

  return { sortKey, sortOrder, sortProducts }
}
