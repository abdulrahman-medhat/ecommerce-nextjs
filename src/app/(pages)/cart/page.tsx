"use server"
import { getServerSession } from "next-auth";
import Cart from "../../component/Cart/cart";
import { authOption } from "../../../auth";
import { CartResponse } from './../../../../Interfaces/Cartinterfaces';


export default async function cartPage() {
  const session = await getServerSession(authOption);

  if (!session?.accessToken) {
    return <div className="p-10 text-center">Please login first</div>;
  }

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: { token: session.accessToken },
    cache: "no-store",
  });

  if (!response.ok) {
    return <div className="p-10 text-center">Failed to load cart</div>;
  }

  const data: CartResponse = await response.json();
  return <Cart cartData={data} />;
}
