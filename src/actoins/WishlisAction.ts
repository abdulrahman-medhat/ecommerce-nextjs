"use server";

import { getServerSession } from "next-auth";
import { authOption } from "../auth";

export async function removeFromWishlist(productId: string) {
  const session = await getServerSession(authOption);

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: session?.accessToken + "",
      },
    }
  );

  return await res.json();
}
