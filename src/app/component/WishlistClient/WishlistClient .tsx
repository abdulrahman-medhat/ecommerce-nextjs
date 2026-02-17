"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { removeFromWishlist } from "../../../actoins/WishlisAction";


export default function WishlistClient ({ initialWishlist }: any) {

  const [wishlist, setWishlist] = useState(initialWishlist);

  async function handleRemove(id: string) {
    await removeFromWishlist(id);

    const updated = wishlist.filter((item: any) => item._id !== id);
    setWishlist(updated);

    window.dispatchEvent(
      new CustomEvent("wishlistupdate", {
        detail: updated.length,
      })
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist </h1>

      {wishlist.length === 0 ? (
        <p>No products in wishlist</p>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {wishlist.map((item: any) => (
            <div key={item._id} className="border p-4 rounded">
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={item.imageCover}
                  alt={item.title}
                  fill
                 className="object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              <h2 className="font-semibold mt-2">{item.title}</h2>
              <p>{item.price} EGP</p>

              <button
                onClick={() => handleRemove(item._id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
