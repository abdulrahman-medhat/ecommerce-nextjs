"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";

import { Loader2 } from 'lucide-react';
import { Category, CategoryResponse } from "../../../../Interfaces/Cartinterfaces";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
        const data: CategoryResponse = await res.json();
        setCategories(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) return <div className="min-h-[60vh] flex justify-center items-center">
        <Loader2 className="animate-spin w-10 h-10" />
      </div>
  if (categories.length === 0) return <p className="text-center mt-10">No categories found</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link key={cat._id} href={`/categories/${cat._id}`} className="border p-4 rounded-lg hover:shadow-lg transition">
            <img src={cat.image} alt={cat.name} className="w-24 h-24 object-contain mb-2 mx-auto"/>
            <p className="text-center font-medium">{cat.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
