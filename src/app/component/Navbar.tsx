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
import { CartResponse } from "../../../Interfaces/Cartinterfaces";

export default async function Navbar() {
  const session = await getServerSession(authOption);
  let data: CartResponse | null = null;
  if (session?.accessToken) {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (response.ok) {
      data = await response.json() as CartResponse;
    }
  }



  let wishlistCount = 0;
  if (session) {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (res.ok) {
      const wishlistData = await res.json();
      wishlistCount = wishlistData.count;
    }
  }

  return (
    <nav className="shadow bg-white p-4">
      <div className="container mx-auto font-semibold flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-black text-white w-8 h-8 flex items-center justify-center font-bold mr-2">S</div>
          <h2 className="text-2xl">
            <Link href="/">Shop Mart</Link>
          </h2>
        </div>

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

        <div className="hidden md:flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <UserIcon className="size-6" />
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

          {session && data && <Carticon serverCartNUm={data.numOfCartItems} cartId={data.data.cartOwner} />}
          {session && <WishlisNum serverCartNUm={wishlistCount} />}
        </div>

        <MobileMenu
          session={session}
          serverCartNum={data?.numOfCartItems || 0}
          wishlistCount={wishlistCount}
        />
      </div>
    </nav>
  );
}
