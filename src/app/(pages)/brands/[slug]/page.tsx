"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  brand: { name: string };
  category: { name: string };
}

export default function BrandProductsPage() {
  const params = useParams();
  const brandSlug = params?.slug || "";

  const [products, setProducts] = useState<Product[] | null>(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/products?brand=${brandSlug}`,
        );
        const data = await res.json();
        setProducts(data?.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); 
      } finally {
        setLoading(false);
      }
    }

    if (brandSlug) fetchProducts();
  }, [brandSlug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <Loader2 className="animate-spin w-10 h-10" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <p className="text-center mt-10">No products found for this brand.</p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product._id}`}
            className="group"
          >
            <div className="border rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition">
              <Image
                src={product.imageCover}
                alt={product.title}
                className="w-full h-48 object-cover mb-2"
                width={200} 
                height={200} 
                
              />
              <span className="text-center font-medium">{product.title}</span>
              <span className="text-green-600 font-semibold mt-1">
                ${product.price}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
