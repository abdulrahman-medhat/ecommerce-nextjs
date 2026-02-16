export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface BrandResponse {
  results: number;
  data: Brand[];
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
  }}