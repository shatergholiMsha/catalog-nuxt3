# 🟢 Renotive Frontend Assignment – Product Catalog (Nuxt 3 + Vue 3)

This is a responsive product catalog application built as part of the **Renotive Frontend Assignment**.  
It uses **Nuxt 3**, **Vue 3 (Composition API)**, and the **DummyJSON Products API** to provide search, sort, create, and product detail functionalities – all wrapped in a custom **Green-style UI theme**.

---

## 📦 Features

- **View Products**: Paginated & lazy‑loaded product list with virtual scrolling.
- **Search & Sort**: Sort by price/rating and live search filtering.
- **Product Details**: Dedicated detail page for each product with store‑first lookup, falling back to API.
- **Create Product**: Form to add new products (with image drag & drop + QR code display).
- **Global Error Handling**: Centralized `error.vue` page triggered by `useSWRFetch` on API errors.
- **Green Theme**: Custom green‑on‑black style across components, including headers, footers, buttons.

---

## ⚙️ Tech Stack

- **Framework**: Nuxt 3 + Vue 3 (Composition API + `<script setup>`)
- **Language**: TypeScript
- **State Management**: Pinia
- **Data Fetching**: SWR (stale-while-revalidate) via custom `useSWRFetch` composable
- **Styling**: custom CSS Green theme
- **Linting**: ESLint + Prettier

---

## 🚀 Getting Started

> **Note:** Please make sure you are using **Node.js v20.19.0** before proceeding.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/shatergholiMsha/catalog-nuxt3.git
cd catalog-nuxt3
```

### Install Dependencies

npm install

### Run Development Mode

npm run dev

Visit http://localhost:3000

### Build for Production

npm run build
npm run preview
