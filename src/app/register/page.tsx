"use client";

import React from "react";

import { useRouter } from "next/navigation";
import RegisterForm from "../component/RegisterForm/page";

export default function RegisterPage() {
  const router = useRouter();


  function handleSuccess() {
    router.push("/login"); 
  }

  return (
    <div className="flex items-center justify-center min-h-screen  dark:bg-black text-gray-600 dark:text-gray-300 transition-colors duration-300 bg-gray-50">

      <RegisterForm onSuccess={handleSuccess} />
    </div>
  );
}
