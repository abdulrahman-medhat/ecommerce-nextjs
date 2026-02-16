import { BrandResponse } from "../../../../Interfaces/BrandInterfaces";


export async function fetchBrands(): Promise<BrandResponse | null> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
    if (!res.ok) throw new Error("Failed to fetch brands");
    const data: BrandResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return null;
  }
}
