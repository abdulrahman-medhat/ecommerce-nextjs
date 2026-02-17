"use server";

import { getServerSession } from "next-auth";
import { authOption } from "../auth";

interface WishlistResponse {
  status: "success" | "error";
  message?: string;
  count?: number;
}

export async function removeFromWishlist(productId: string): Promise<WishlistResponse> {
  const session = await getServerSession(authOption);
  if (!session?.accessToken) return { status: "error", message: "User not authenticated" };

  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: session.accessToken,
        },
      }
    );

    if (!res.ok) return { status: "error", message: "Request failed" };
    const data = await res.json();

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("wishlistupdate", { detail: data.count }));
    }

    return data;
  } catch (error) {
    return { status: "error", message: (error as Error).message || "Unknown error" };
  }
}
