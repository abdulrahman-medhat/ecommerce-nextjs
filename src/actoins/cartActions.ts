"use server"
import { getServerSession } from "next-auth";
import { authOption } from "../auth";

export async function deletproductAction(productId:string) {
  const session = await getServerSession(authOption);
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
    method: "DELETE",
    headers: {
      token: session?.accessToken
    }
  })
  if (!response.ok) return { status: "error", message: "Request failed" };
  const data  = await response.json();
  return data
}

export async function clearCartAction() {
  const session = await getServerSession(authOption);
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart/", {
    method: "DELETE",
    headers: {
      token: session?.accessToken
    }
  })
  if (!response.ok) return { status: "error", message: "Request failed" };
  const data  = await response.json();
  return data
}

export async function updateCartQuantityAction(productId: string, count: number) {
  const session = await getServerSession(authOption);
  if (!session?.accessToken) {
    return { status: "error", message: "User not authenticated" };
  }
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: session.accessToken
      },
      body: JSON.stringify({ count })
    });
    if (!response.ok) return { status: "error", message: "Request failed" };
    const data = await response.json();
    return data;
  } catch (error) {
    return { status: "error", message: (error as Error).message || "Unknown error" };
  }
}
