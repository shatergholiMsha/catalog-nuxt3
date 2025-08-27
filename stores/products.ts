import { defineStore } from 'pinia'
import type { Product } from '../types/products/product'

export const useProductsStore = defineStore('products', {
  state: () => ({
    list: [] as Product[],
  }),
  actions: {
    setProducts(products: Product[]) {
      this.list = products
    },
    addProduct(product: Product) {
      this.list.unshift(product)
    },
  },
})
