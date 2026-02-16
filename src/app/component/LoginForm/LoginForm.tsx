"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().nonempty("Email is required.").email("Email is invalid."),
  password: z.string().nonempty("Password is required.").min(8),
});

type FormData = z.infer<typeof formSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirected = searchParams.get("url") || "/products";

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.ok) {
        toast.success("Logged in successfully");
        router.push(redirected);
      } else {
        toast.error("Login failed: " + (result?.error || "Unknown error"));
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full sm:max-w-md mx-auto mt-10">
      <h2 className="text-3xl font-semibold text-center mb-8">Welcome Back!</h2>
      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
         <Controller
  name="email"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel>Email</FieldLabel>
      <Input {...field} />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
<Controller
  name="password"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel>Password</FieldLabel>
      <Input type="password" {...field} />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>

          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="gap-6 flex-col sm:flex-row">
        <Button type="submit" form="login-form" disabled={isLoading}>
          {isLoading && <Loader className="animate-spin mr-2" />}
          Login
        </Button>
        <Link href="/forgot-password" className="text-blue-500 font-bold mt-2 sm:mt-0">
          Forgot Password
        </Link>
        <Link href="/register" className="text-blue-500 font-bold mt-2 sm:mt-0">
          Create Account
        </Link>
      </CardFooter>
    </Card>
  );
}
