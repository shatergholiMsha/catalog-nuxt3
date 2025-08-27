import { ref, onMounted } from 'vue'
import { createError } from '#app'
import type { Ref } from 'vue'

export function useSWRFetch<T>(url: string) {
  const swrCache = new Map<string, T>()
  const data = ref<T | null>(null) as Ref<T | null>
  const isLoading = ref(true)
  const error = ref<Error | null>(null)

  const fetchData = async () => {
    isLoading.value = true
    error.value = null

    try {
      if (swrCache.has(url)) {
        data.value = swrCache.get(url) as T
      }

      const freshData = await $fetch<T>(url)
      data.value = freshData
      swrCache.set(url, freshData)
    } 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (err: any) {
      error.value = err
      if (!data.value) {
        throw createError({
          statusCode: err?.statusCode || err?.status || 500,
          message: err?.statusMessage || err?.message || 'Failed data.',
          fatal: true,
        })
      }
      console.error(`SWR fetch error for ${url}:`, err)
    } finally {
      isLoading.value = false
    }
  }
  onMounted(fetchData)

  const refresh = async () => {
    await fetchData()
  }

  return { data, isLoading, error, refresh }
}
