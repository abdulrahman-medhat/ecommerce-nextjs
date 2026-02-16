"use client";
import React, { useState } from "react";
import Link from "next/link";
import { UserIcon, X } from "lucide-react";
import Carticon from "../Carticon/CartNum";
import WishlisNum from "../WishlisNum/WishlisNum";
import { signOut } from "next-auth/react";

interface MobileMenuProps {
  session: any;
  serverCartNum: number;
  wishlistCount: number;
}

export default function MobileMenu({ session, serverCartNum, wishlistCount }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
   
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden text-2xl font-bold z-50"
      >
        ☰
      </button>

      
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

            <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <X />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-4">
          <Link href="/products" onClick={() => setIsOpen(false)}>Products</Link>
          <Link href="/brands" onClick={() => setIsOpen(false)}>Brands</Link>
          <Link href="/categories" onClick={() => setIsOpen(false)}>Categories</Link>

          <div className="flex flex-col gap-2 mt-4 border-t pt-2">
            {session ? (
              <>
                <Link href="/my-orders" onClick={() => setIsOpen(false)}>My Orders</Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-left w-full py-2 px-2 hover:bg-gray-100 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
                <Link href="/register" onClick={() => setIsOpen(false)}>Register</Link>
              </>
            )}

            {session && serverCartNum && <Carticon serverCartNUm={serverCartNum} />}
            {session && <WishlisNum serverCartNUm={wishlistCount} />}
          </div>
        </div>
      </div>
    </>
  );
}
