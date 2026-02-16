// Category
export interface Category {
  _id: string;
  name: string;
  image: string;
}

// Brand
export interface Brand {
  _id: string;
  name: string;
  image: string;
}

// Optional: Response type
export interface BrandResponse {
  results: number;
  data: Brand[];
}

// SubCategory
export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

// Product
export interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  ratingsAverage: number;
}

// Cart
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartResponse {
  results: number;
  data: CartItem[];
}

// Responses
export interface CategoryResponse {
  results: number;
  data: Category[];
}

export interface SubCategoryResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  data: SubCategory[];
}

export interface ProductResponse {
  results: number;
  data: Product[];
}
