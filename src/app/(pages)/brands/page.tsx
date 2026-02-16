"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Brand } from "../../../../Interfaces/Cartinterfaces";
import { fetchBrands } from "./AllBrand";
import Image from "next/image";

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBrands() {
      const data = await fetchBrands();
      if (data) setBrands(data.data);
      setLoading(false);
    }
    getBrands();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <Loader2 className="animate-spin w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Brands</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <Link key={brand._id} href={`/brands/${brand._id}`} className="group">
            <div className="border rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition">
              <Image
                src={brand.image}
                alt={brand.name}
                width={96} 
                height={96} 
                className="object-contain mb-2"
              />

              <span className="text-center font-medium">{brand.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
