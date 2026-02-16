"use client";

import Link from "next/link";

export default function HomePage() {
  return (
      <>
      


      <section className="flex flex-col items-center justify-center text-center mt-20 px-4">
        <h1 className="text-5xl font-bold mb-6">Welcome to ShopMart</h1>
        <p className="text-gray-700 text-lg max-w-xl mb-8">
          Discover the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.
        </p>

        <div className="flex gap-4">
          <Link href="/products">
            <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
              Shop Now
            </button>
          </Link>
          <Link href="/categories">
            <button className="border border-black px-6 py-3 rounded-lg hover:bg-black hover:text-white transition">
              Browse Categories
            </button>
          </Link>
        </div>
      </section>
   
      </>
  );
}
