import { Category } from "@/Interfaces/Cartinterfaces";

export async function fetchCategoryById(id: string): Promise<{ data: Category } | null> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
    if (!res.ok) {
      console.error("Failed to fetch category, status:", res.status, await res.text());
      return null;
    }
    const data = await res.json();
    return data; 
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}
