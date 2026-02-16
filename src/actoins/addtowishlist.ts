"use server";

import { getServerSession } from "next-auth";
import { authOption } from "../auth";

export async function addToWishlistAction(productId: string) {
  const session = await getServerSession(authOption);

  if (!session) return null;

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: session.accessToken as string,
      },
      body: JSON.stringify({ productId }),
    }
  );

  return response.json();
}




export async function removeFromWishlistAction(productId: string) {
  const session = await getServerSession(authOption);

  if (!session) return null;

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          token: session.accessToken as string,
        },
      }
  );

  return response.json();
}
