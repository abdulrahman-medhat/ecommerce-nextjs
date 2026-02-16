"use server";
import { getServerSession } from "next-auth";
import { authOption } from "../auth";

export async function deletproductAction(productId: string) {
  const session = await getServerSession(authOption);
  if (!session?.accessToken) return { status: "error", message: "User not authenticated" };

  const headers: HeadersInit = {
    ...(session.accessToken && { token: session.accessToken }),
  };

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
    method: "DELETE",
    headers,
  });

  if (!response.ok) return { status: "error", message: "Request failed" };
  return await response.json();
}

export async function clearCartAction() {
  const session = await getServerSession(authOption);
  if (!session?.accessToken) return { status: "error", message: "User not authenticated" };

  const headers: HeadersInit = {
    ...(session.accessToken && { token: session.accessToken }),
  };

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart/", {
    method: "DELETE",
    headers,
  });

  if (!response.ok) return { status: "error", message: "Request failed" };
  return await response.json();
}

export async function updateCartQuantityAction(productId: string, count: number) {
  const session = await getServerSession(authOption);
  if (!session?.accessToken) {
    return { status: "error", message: "User not authenticated" };
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(session.accessToken && { token: session.accessToken }),
  };

  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ count }),
    });

    if (!response.ok) return { status: "error", message: "Request failed" };
    return await response.json();
  } catch (error) {
    return { status: "error", message: (error as Error).message || "Unknown error" };
  }
}
