"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

interface CartNumProps {
  serverCartNUm: number;
  cartId: string;
}

export default function CartNum({ serverCartNUm, cartId }: CartNumProps) {
  const [cartNu, setCartNum] = useState(serverCartNUm);

  // حفظ cartId
  useEffect(() => {
    if (cartId) {
      localStorage.setItem("cartId", cartId);
    }
  }, [cartId]);

  // قراءة العدد من localStorage (fallback)
  useEffect(() => {
    const saved = localStorage.getItem("cartNum");
    if (saved) {
      setCartNum(Number(saved));
    }
  }, []);

  // تحديث عند event
  useEffect(() => {
    function handler(e: Event) {
      const event = e as CustomEvent<number>;
      setCartNum(event.detail);
    }

    window.addEventListener("cartupdate", handler);
    return () => window.removeEventListener("cartupdate", handler);
  }, []);

  // حفظ العدد
  useEffect(() => {
    localStorage.setItem("cartNum", cartNu.toString());
  }, [cartNu]);

  return (
    <Link href="/cart" className="relative cursor-pointer">
      <ShoppingCartIcon className="w-6 h-6" />
      <span className="absolute -top-2 right-0 text-xs w-4 h-4 bg-accent-foreground text-accent flex justify-center items-center rounded-full">
        {cartNu}
      </span>
    </Link>
  );
}