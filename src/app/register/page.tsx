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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">

      <RegisterForm onSuccess={handleSuccess} />
    </div>
  );
}
