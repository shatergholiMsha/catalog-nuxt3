<template>
  <div class="create-product">
    <h1>Create New Product</h1>
    <div class="form-wrapper">
      <form class="form-section" @submit.prevent="createProduct">
        <label>
          Title:
          <input v-model="form.title" required >
        </label>
        <label>
          Price:
          <input v-model.number="form.price" type="number" min="0" required >
        </label>

        <label>
          Rating:
          <input
            v-model.number="form.rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
          >
        </label>

        <label>
          Description:
          <textarea v-model="form.description" required/>
        </label>

        <label>
          Category:
          <input v-model="form.category" required >
        </label>

        <label>
          Weight (g):
          <input v-model.number="form.weight" type="number" min="0" >
        </label>

        <label>
          Warranty Info:
          <input v-model="form.warrantyInformation" >
        </label>

        <button type="submit">Create Product</button>
      </form>

      <div class="image-uploader" @dragover.prevent @drop.prevent="handleDrop">
        <p v-if="!previewImage">Drag & Drop image here or</p>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          hidden
          @change="handleFileChange"
        >
        <label for="fileInput" class="browse-btn">Choose</label>
        <img
          v-if="previewImage"
          :src="previewImage"
          alt="Preview"
          class="preview"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '../../stores/products'

const router = useRouter()
const productsStore = useProductsStore()

const form = ref({
  title: '',
  price: 0,
  rating: 0,
  description: '',
  category: '',
  weight: undefined as number | undefined,
  warrantyInformation: '',
  imageFile: null as File | null,
})

const previewImage = ref<string | null>(null)
const success = ref(false)
const errorMsg = ref('')

function handleFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    setImageFile(target.files[0])
  }
}

function handleDrop(e: DragEvent) {
  if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
    setImageFile(e.dataTransfer.files[0])
  }
}

function setImageFile(file: File) {
  form.value.imageFile = file
  previewImage.value = URL.createObjectURL(file)
}

const createProduct = async () => {
  success.value = false
  errorMsg.value = ''

  try {
    const imageUrl = previewImage.value || ''

    const res = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.value.title,
        price: form.value.price,
        rating: form.value.rating,
        description: form.value.description,
        category: form.value.category,
        weight: form.value.weight,
        warrantyInformation: form.value.warrantyInformation,
        images: [imageUrl],
      }),
    })

    if (!res.ok) throw new Error('Failed to create product')
    const newProduct = await res.json()

    const productUrl = `${window.location.origin}/products/${newProduct.id}`
    newProduct.qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(productUrl)}&size=150x150`

    productsStore.addProduct(newProduct)

    console.log('Updated store list:', productsStore.list)

    success.value = true
    router.push('/')
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
   catch (err: any) {
    console.error('--- [CREATE PRODUCT] API error ---', err)
    errorMsg.value = err.message
  }
}
</script>

<style scoped>
.create-product {
  color: #00ff00;
  padding: 2rem;
}
h1 {
  margin-bottom: 1rem;
}
.form-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}
.form-section {
  flex: 1 1 300px;
  display: grid;
  gap: 1rem;
  max-width: 400px;
}
label {
  display: flex;
  flex-direction: column;
  color: #00ff00;
  font-size: 0.9rem;
}
input,
textarea {
  padding: 0.5rem;
  border: 1px solid #00ff00;
  border-radius: 4px;
  background: transparent;
  color: #00ff00;
}
button {
  background: transparent;
  border: 1px solid #00ff00;
  color: #00ff00;
  padding: 0.6rem 1rem;
  cursor: pointer;
}
button:hover {
  background: #00ff0020;
}
.image-uploader {
  flex: 1 1 240px;
  border: 2px dashed #00ff00;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  background: transparent;
  color: #00ff00;
}
.browse-btn {
  color: #00ff00;
  cursor: pointer;
  display: inline-block;
  margin-top: 0.5rem;
}
.preview {
  display: block;
  margin: 1rem auto 0;
  max-width: 100%;
  border-radius: 4px;
}
.success {
  margin-top: 1rem;
  color: #00ff00;
}
.error {
  margin-top: 1rem;
  color: red;
}
</style>
