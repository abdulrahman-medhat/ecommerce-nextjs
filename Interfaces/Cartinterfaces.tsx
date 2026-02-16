// Cart response from API
export interface CartResponse {
  status: string
  numOfCartItems: number
  message?: string
  cartId: string
  data: CartData
}

// Cart data
export interface CartData {
  _id: string
  cartOwner: string
  products: CartProduct[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

// Product inside cart
export interface CartProduct {
  count: number
  _id: string
  product: Product
  price: number
}

// Product
export interface Product {
  subcategory: Subcategory[]
  _id: string
  title: string
  quantity: number
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  id: string
}

export interface Subcategory {
  _id: string
  name: string
  slug: string
  category: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  image: string
}

export interface Brand {
  _id: string
  name: string
  slug: string
  image: string
}
