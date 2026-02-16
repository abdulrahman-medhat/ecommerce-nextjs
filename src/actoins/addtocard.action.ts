"use server"
import { getServerSession } from 'next-auth';
import { authOption } from '../auth';

export interface ShippingAddress {
  city: string
  details: string
  phone: string
}

export async function checkOutAction(cartId: string, shippingAddress: ShippingAddress) {
  const session = await getServerSession(authOption);
  if (session) {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: session.accessToken,
        },
        body: JSON.stringify({ shippingAddress }),
      }
    );

    if (!response.ok) return { status: "error", message: "Request failed" };
    const data = await response.json();
    return data;
  } else {
    return null;
  }
}
export async function addToCartAction(productId: string) {
  const session = await getServerSession(authOption);
  if(session){
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: session.accessToken,
      },
      body: JSON.stringify({ productId })
    })
    if (!response.ok) return { status: "error", message: "Request failed" };
    const data = await response.json()
    return data
  } else {
    return null
  } 
}
