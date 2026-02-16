import React from "react";
import Link from "next/link";
import { fetchCategoryById } from "../fetchCategoryByid";

type Props = {
  params: { id: string };
};

export default async function CategoryPage({ params }: Props) {
  const { id } = params;

  
  const categoryData = await fetchCategoryById(id);

  if (!categoryData) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="mb-4 text-gray-700">Sorry, we could not load this category.</p>
        <Link href="/categories" className="text-blue-500 underline">
          Go back to Categories
        </Link>
      </div>
    );
  }

  const category = categoryData.data;

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">{category.name}</h1>

      <div className="border p-4 rounded-lg shadow-md inline-block">
        <img
          src={category.image || "/placeholder.png"}
          alt={category.name}
          className="w-64 h-64 object-contain mb-4 mx-auto"
        />
        <p className="font-medium mb-2">Slug: {category.name}</p>
        <p className="text-gray-500 text-sm">Created: {new Date(category.name).toLocaleDateString()}</p>
      </div>
ةةةة
      <div className="mt-6">
        <Link href="/categories" className="text-blue-500 underline">
          Back to Categories
        </Link>
      </div>
    </div>
  );
}
