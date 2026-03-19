"use client"; 

import Link from "next/link";
import { useEffect, useState } from "react";
import { UserIcon, Menu } from "lucide-react";
import { signOut } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";
import Carticon from "./Carticon/CartNum";
import WishlisNum from "./WishlisNum/WishlisNum";
import MobileMenu from "./MobileMenu/MobileMenu";
import LogOut from "./Logout/Logout";

export default function Navbar({ session, serverCartNum, wishlistCount }: any) {
  return (
    <nav className="shadow p-4 relative bg-white/80 dark:bg-black backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto font-semibold flex flex-col md:flex-row items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-black text-white dark:bg-white dark:text-black w-8 h-8 flex items-center justify-center font-bold mr-2 transition-colors duration-300">S</div>
          <h2 className="text-2xl text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Link href="/">Shop Mart</Link>
          </h2>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          <Link href="/products" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Products</Link>
          <Link href="/brands" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Brands</Link>
          <Link href="/categories" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Categories</Link>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />

          <Carticon serverCartNUm={serverCartNum || 0} cartId={session?.cartId || ""} />
          {session && <WishlisNum serverCartNUm={wishlistCount || 0} />}

          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
              <UserIcon className="w-6 h-6" />
            </button>
            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 hidden group-hover:block">
              {session ? (
                <>
                  <Link href="/allorders" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">My Orders</Link>
                  <LogOut />
                </>
              ) : (
                <>
                  <Link href="/login" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Login</Link>
                  <Link href="/register" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <MobileMenu session={session} serverCartNum={serverCartNum || 0} wishlistCount={wishlistCount || 0} />
        </div>
      </div>
    </nav>
  );
}