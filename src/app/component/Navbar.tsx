"use server";
import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOption } from "../../auth";
import LogOut from "./Logout/Logout";
import Carticon from "./Carticon/CartNum";
import WishlisNum from "./WishlisNum/WishlisNum";
import MobileMenu from "./MobileMenu/MobileMenu";
import ThemeToggle from "./ThemeToggle";
import { CartResponse } from "../../../Interfaces/Cartinterfaces";

export default async function Navbar() {
  const session = await getServerSession(authOption);

  // إعداد بيانات الكارت و الوشليست
  let cartData: CartResponse | null = null;
  let wishlistCount = 0;

  if (session?.accessToken) {
    try {
      // جلب الكارت والوشليست في نفس الوقت لتسريع الأداء
      const [cartRes, wishlistRes] = await Promise.all([
        fetch("https://ecommerce.routemisr.com/api/v1/cart", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }),
        fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }),
      ]);

      if (cartRes.ok) cartData = (await cartRes.json()) as CartResponse;
      if (wishlistRes.ok) {
        const wishlistData = await wishlistRes.json();
        wishlistCount = wishlistData?.count ?? 0;
      }
    } catch (error) {
      console.error("Error fetching cart or wishlist:", error);
    }
  }

  const cartNum = cartData?.numOfCartItems ?? 0;
  const cartOwnerId = cartData?.data?.cartOwner ?? "";

  return (
    <nav className="shadow bg-white p-4 dark:bg-black text-gray-600 dark:text-gray-300 transition-colors duration-300">
      <div className="container mx-auto font-semibold flex flex-col md:flex-row items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-black text-white w-8 h-8 flex items-center justify-center font-bold mr-2">
            S
          </div>
          <h2 className="text-2xl">
            <Link href="/">Shop Mart</Link>
          </h2>
        </div>

        {/* Desktop Menu Links */}
        <div className="hidden md:flex gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/products">Products</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/brands">Brands</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/categories">Categories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Right Icons */}
        <div className="hidden md:flex items-center gap-4">
          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <UserIcon className="w-6 h-6 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                {session ? (
                  <>
                    <Link href="/allorders">
                      <DropdownMenuItem>My Orders</DropdownMenuItem>
                    </Link>
                    <LogOut />
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <DropdownMenuItem>Login</DropdownMenuItem>
                    </Link>
                    <Link href="/register">
                      <DropdownMenuItem>Register</DropdownMenuItem>
                    </Link>
                  </>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart & Wishlist */}
          {session && <Carticon serverCartNUm={cartNum} cartId={cartOwnerId} />}
          <ThemeToggle />
          {session && <WishlisNum serverCartNUm={wishlistCount} />}
        </div>

        {/* Mobile Menu */}
        <MobileMenu session={session} serverCartNum={cartNum} wishlistCount={wishlistCount} />
      </div>
    </nav>
  );
}