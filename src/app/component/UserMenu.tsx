"use client";

import { UserIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import LogOut from "./Logout/Logout";

interface UserMenuProps {
  isLoggedIn: boolean;
}

export default function UserMenu({ isLoggedIn }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserIcon className="w-6 h-6 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          {isLoggedIn ? (
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
  );
}