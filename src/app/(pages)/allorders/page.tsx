"use client";

import React, { useEffect, useState } from "react";

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  count: number;
}

interface Order {
  _id: string;
  shippingAddress: {
    details: string;
    city: string;
    phone: string;
  };
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  cartItems: {
    _id: string;
    count: number;
    price: number;
    product: {
      _id: string;
      title: string;
      imageCover: string;
    };
  }[];
  user: {
    name: string;
    email: string;
    phone: string;
  };
  paidAt?: string;
  createdAt: string;
}

export default function AllOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return;

    async function getOrders() {
      try {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/orders/user/" + cartId
        );
        if (!response.ok) {
          console.error("Server error:", response.status);
          return;
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    }

    getOrders();
  }, []);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      {orders.length === 0 && <p>No orders found.</p>}
      {orders.map((order) => (
        <div key={order._id} className="border rounded-lg p-4 shadow">
          <div className="flex justify-between mb-2">
            <div>
              <p>
                <span className="font-semibold">User:</span> {order.user.name} ({order.user.email})
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {order.shippingAddress.phone}
              </p>
            </div>
            <div className="text-right">
              <p>
                <span className="font-semibold">Payment:</span> {order.paymentMethodType}{" "}
                {order.isPaid ? <span className="text-green-600">Paid ✅</span> : <span className="text-red-600">Not Paid ❌</span>}
              </p>
              <p>
                <span className="font-semibold">Delivery:</span>{" "}
                {order.isDelivered ? <span className="text-green-600">Delivered ✅</span> : <span className="text-red-600">Pending ❌</span>}
              </p>
            </div>
          </div>

          <p className="font-semibold mb-2">
            Shipping Address: {order.shippingAddress.details}, {order.shippingAddress.city}
          </p>

          <div className="space-y-2 mb-2">
            {order.cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 border-b pb-2">
                <img src={item.product.imageCover} alt={item.product.title} className="w-16 h-16 object-cover rounded" />
                <div>
                  <p className="font-medium">{item.product.title}</p>
                  <p>
                    {item.count} pcs × {item.price} EGP
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="font-bold text-lg">Total: {order.totalOrderPrice} EGP</p>
          <p className="text-gray-500 text-sm">Order created at: {new Date(order.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
