"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";
import { formatCurrency } from "../../../Helpers/formatCurrency";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { CartResponse } from './../../../../Interfaces/Cartinterfaces';
import CheckOutSession from "../CheckOutSession/CheckOutSession";
import { deleteCart, updateCart, clearCart } from "../../../actoins/cartActions";

export default function Cart({ cartData }: { cartData: CartResponse }) {
  const [cart, setCart] = useState<CartResponse | null>(cartData);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("cartupdate", { detail: cartData?.numOfCartItems ?? 0 }));
  }, [cartData]);

  async function deletCartProduct(productId: string) {
    setLoadingId(productId);
    const response: CartResponse = await deleteCart(productId);
    if (response.status === "success") {
      setCart(response);
      window.dispatchEvent(new CustomEvent("cartupdate", { detail: response.numOfCartItems }));
    }
    setLoadingId(null);
  }

  async function updateCartQuantity(productId: string, count: number) {
    setLoadingId(productId);
    const response: CartResponse = await updateCart(productId, count);
    if (response.status === "success") {
      setCart(response);
      window.dispatchEvent(new CustomEvent("cartupdate", { detail: response.numOfCartItems }));
    }
    setLoadingId(null);
  }

  async function clearCartt() {
    setLoadingId("clear");
    const response: CartResponse = await clearCart();
    if (response.status === "success") {
      setCart(response);
      window.dispatchEvent(new CustomEvent("cartupdate", { detail: 0 }));
    }
    setLoadingId(null);
  }

  const updateCartQuantityHandler = (productId: string, count: number) => updateCartQuantity(productId, count);
  const clearCartHandler = () => clearCartt();

  return (
    <>
      {cart && cart.data?.products?.length > 0 ? (
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
          <p className="mt-1 text-muted-foreground">{cart.numOfCartItems} item(s) in your cart</p>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start mt-6">
            <div className="lg:col-span-2 space-y-4">
              {cart.data.products.map((item) => (
                <div key={item._id} className="flex gap rounded-xl border relative p-4 shadow-sm bg-card">
                  {loadingId === item.product._id && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                      <Loader2 className="animate-spin" />
                    </div>
                  )}

                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    width={112}
                    height={112}
                    className="rounded-lg object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-base md:text-lg line-clamp-2">{item.product.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.product.brand.name} . {item.product.category.name}
                        </p>
                      </div>

                      <div className="text-right shrink-0 font-semibold">{formatCurrency(item.price)}</div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          disabled={item.count === 1}
                          className="size-8 rounded-lg border hover:bg-accent"
                          onClick={() => updateCartQuantityHandler(item.product._id, item.count - 1)}
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-medium">{item.count}</span>
                        <button
                          className="size-8 rounded-lg border hover:bg-accent"
                          onClick={() => updateCartQuantityHandler(item.product._id, item.count + 1)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="text-destructive hover:underline text-sm"
                        onClick={() => deletCartProduct(item.product._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1 sticky top-16">
              <div className="rounded-xl border p-5 shadow-sm">
                <h2 className="text-lg font-semibold">Order Summary</h2>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">{formatCurrency(cart.data.totalCartPrice)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Shipping</span>
                    <span className="text-emerald-600 font-medium">Free</span>
                  </div>
                </div>

                <div className="my-4 border-t pt-4 space-y-2">
                  <Link href="/products">
                    <button className="w-full h-11 rounded-xl border hover:bg-accent">
                      Continue Shopping
                    </button>
                  </Link>

                  <CheckOutSession cartId={cart.data._id} />

                  <Button
                    variant="outline"
                    className="text-destructive hover:text-destructive w-full"
                    onClick={clearCartHandler}
                    disabled={loadingId === "clear"}
                  >
                    {loadingId === "clear" ? <Loader2 className="animate-spin mx-auto" /> : "Clear Cart"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[60vh] flex justify-center items-center flex-col">
          <h2 className="text-2xl md-3">Your Cart Is Empty</h2>
          <Link href={"/products"}>
            <Button>Add one</Button>
          </Link>
        </div>
      )}
    </>
  );
}
