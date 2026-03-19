"use client";
import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function WishlisNum({ serverCartNUm }: { serverCartNUm: number }) {
  const [wishlistNum, setWishlistNum] = useState(serverCartNUm);

  // fallback من localStorage
  useEffect(() => {
    const saved = localStorage.getItem("wishlistNum");
    if (saved) {
      setWishlistNum(Number(saved));
    }
  }, []);

  // listen للـ event
  useEffect(() => {
    function handler(e: Event) {
      const event = e as CustomEvent<number>;
      setWishlistNum(event.detail);
    }

    window.addEventListener("wishlistupdate", handler);
    return () => window.removeEventListener("wishlistupdate", handler);
  }, []);

  // حفظ القيمة
  useEffect(() => {
    localStorage.setItem("wishlistNum", wishlistNum.toString());
  }, [wishlistNum]);

  return (
    <Link href="/wishlist" className="relative flex items-center gap-1">
      <Heart className="size-6 text-red-500" />
      <span className="absolute -top-2 start-5/6 text-xs size-4 bg-accent-foreground text-accent flex justify-center items-center rounded-full">
        {wishlistNum}
      </span>
    </Link>
  );
}