// src/Interfaces/Cartinterfaces.ts

// --------------------- Category ---------------------
export interface Category {
  _id: string;
  name: string;
  image: string;
}

export interface CategoryResponse {
  results: number;
  data: Category[];
}

// --------------------- Brand ---------------------
export interface Brand {
  _id: string;
  name: string;
  image: string;
}

export interface BrandResponse {
  results: number;
  data: Brand[];
}

// --------------------- SubCategory ---------------------
export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
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

// --------------------- Product ---------------------
export interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  ratingsAverage: number;
  brand: Brand;          // Added brand here
  category: Category;    // Added category here
}

export interface ProductResponse {
  results: number;
  data: Product[];
}

// --------------------- Cart ---------------------
export interface CartProduct {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    price: number;
    brand: { _id: string; name: string };       // added
    category: { _id: string; name: string };    // added
  };
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  totalCartPrice: number;
}

export interface CartResponse {
  status: string;
  numOfCartItems: number;
  data: CartData;
}
