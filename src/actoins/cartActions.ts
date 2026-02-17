"use server";

import { getServerSession } from "next-auth";
import { authOption } from "../auth";

interface ServerResponse {
  status: "success" | "error";
  message?: string;
  numOfCartItems?: number;
}

export async function deleteCart(productId: string): Promise<ServerResponse> {
  const session = await getServerSession(authOption);
  if (!session?.accessToken) return { status: "error", message: "User not authenticated" };

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: session.accessToken,
      },
    });

    if (!res.ok) return { status: "error", message: "Request failed" };
    const data = await res.json();

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cartupdate", { detail: data.numOfCartItems }));
    }

    return data;
  } catch (error) {
    return { status: "error", message: (error as Error).message || "Unknown error" };
  }
}

export async function clearCart(): Promise<ServerResponse> {
  const session = await getServerSession(authOption);
  if (!session?.accessToken) return { status: "error", message: "User not authenticated" };

  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: session.accessToken,
      },
    });

    if (!res.ok) return { status: "error", message: "Request failed" };
    const data = await res.json();

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cartupdate", { detail: 0 }));
    }

    return data;
  } catch (error) {
    return { status: "error", message: (error as Error).message || "Unknown error" };
  }
}

export async function updateCart(productId: string, count: number): Promise<ServerResponse> {
  const session = await getServerSession(authOption);
  if (!session?.accessToken) return { status: "error", message: "User not authenticated" };

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: session.accessToken,
      },
      body: JSON.stringify({ count }),
    });

    if (!res.ok) return { status: "error", message: "Request failed" };
    const data = await res.json();

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cartupdate", { detail: data.numOfCartItems }));
    }

    return data;
  } catch (error) {
    return { status: "error", message: (error as Error).message || "Unknown error" };
  }
}
