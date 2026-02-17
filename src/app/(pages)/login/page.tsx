"use client";

import { Suspense } from "react";
import LoginForm from "../../component/LoginForm";



export default function login() {
  return (
    <Suspense>

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
    </Suspense>
  );
}
