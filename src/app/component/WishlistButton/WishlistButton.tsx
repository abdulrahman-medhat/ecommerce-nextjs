"use client";
import { Heart, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { addToWishlistAction, removeFromWishlistAction } from "../../../actoins/addtowishlist";

interface Props {
  productId: string;
  isInitiallyInWishlist?: boolean;
}

export default function WishlistButton({
  productId,
  isInitiallyInWishlist = false,
}: Props) {
  const [isInWishlist, setIsInWishlist] = useState(isInitiallyInWishlist);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleToggle() {
    setIsInWishlist(prev => !prev);

    startTransition(async () => {
      try {
        let data;
        if (isInWishlist) {
          data = await removeFromWishlistAction(productId);
          toast.success("Removed from wishlist");
        } else {
          data = await addToWishlistAction(productId);
          toast.success("Added to wishlist");
        }

        if (!data) {
          router.push("/login");
          return;
        }

        window.dispatchEvent(new CustomEvent("wishlistupdate", { detail: data.count ?? 0 }));

      } catch (error) {
        setIsInWishlist(prev => !prev);
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <button onClick={handleToggle} disabled={isPending}>
      {isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Heart
          className={`cursor-pointer transition ${
            isInWishlist
              ? "text-red-500 fill-red-500"
              : "hover:text-red-400"
          }`}
        />
      )}
    </button>
  );
}
