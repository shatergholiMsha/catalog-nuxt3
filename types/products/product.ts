export interface Product {
  id: number
  title: string
  price: number
  images: string[]
  rating: number
  weight: number
  category: string
  description: string
  warrantyInformation: string
  meta: {
    qrCode: string
  }
}

export interface ProductListResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}
