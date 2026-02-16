"use client";

import React, { useEffect, useState } from "react";
import { ProductResponse, Product } from "../../../../Interfaces/productInterfaces";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Loader2, Star, StarHalf } from "lucide-react";
import { formatCurrency } from "../../../Helpers/formatCurrency";
import AddToCart from "../../component/AddToCart/AddToCart";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function fetchProducts(page: number) {
    setLoading(true);
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=33`
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data: ProductResponse = await res.json();

      setProducts(data.data || []);
      setTotalPages(data.metadata?.numberOfPages || 1);

    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <Loader2 className="animate-spin w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {products.length === 0 ? (
        <p className="text-center mt-10">No products found.</p>
      ) : (
        <>
          <div className="m-10 grid gap-5 grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden pt-0">
                <Link href={`/products/${product.id}`}>
                  <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>

                  <CardHeader>
                    <CardDescription>
                      {product.brand.name}
                    </CardDescription>
                    <CardTitle>{product.title}</CardTitle>
                    <CardDescription>
                      {product.category.name}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex gap-2 items-center">
                    <div className="flex">
                      <Star className="text-amber-400 fill-amber-500" />
                      <Star className="text-amber-400 fill-amber-500" />
                      <Star className="text-amber-400 fill-amber-500" />
                      <Star className="text-amber-400 fill-amber-500" />
                      <StarHalf className="text-amber-400 fill-amber-500" />
                    </div>
                    <p>{product.ratingsAverage}</p>
                    <p>{formatCurrency(product.price)}</p>
                  </CardContent>
                </Link>

                <AddToCart productId={product.id} />
              </Card>
            ))}
          </div>

      
          <div className="flex justify-center items-center gap-4 mt-10">

            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="font-semibold">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  prev < totalPages ? prev + 1 : prev
                )
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>

          </div>
        </>
      )}
    </div>
  );
}
