"use client";
import React, { useState } from "react";
import { CardFooter } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { addToCartAction } from "../../../actoins/addtocard.action";
import WishlistButton from "../WishlistButton/WishlistButton";

interface AddToCartProps {
  productId: string;
}

export default function AddToCart({ productId }: AddToCartProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleAddToCart(productId: string) {
    setLoading(true);
    try {
      const data = await addToCartAction(productId);

      if (!data) {
        router.push("/login");
        return;
      }

      window.dispatchEvent(
        new CustomEvent("cartupdate", { detail: data.numOfCartItems ?? 0 })
      );

      toast.success(data?.message ?? "Added to cart successfully");
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setLoading(false);
    }
  }

  return (
    <CardFooter className="gap-5">
      <Button disabled={loading} onClick={() => handleAddToCart(productId)} className="flex items-center gap-2">
        {loading ? <Loader2 className="animate-spin" /> : <ShoppingCart />}
        Add to Cart
      </Button>
      <WishlistButton productId={productId} />
    </CardFooter>
  );
}
