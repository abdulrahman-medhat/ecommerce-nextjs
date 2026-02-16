"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const resetPasswordSchema = z
  .object({
    password: z.string().nonempty("Password is required").min(8),
    rePassword: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords must match",
    path: ["rePassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const code = searchParams.get("code") || "";
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", rePassword: "" },
  });

  async function onSubmit(data: ResetPasswordFormData) {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentPassword: code, 
            password: data.password,
            rePassword: data.rePassword,
          }),
        }
      );

      const resData = await response.json();

      if (response.ok) {
        toast.success(resData.message || "Password changed successfully");
        router.push("/login");
      } else {
        toast.error(resData.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent>
          <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>
          <form id="reset-password-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>New Password</FieldLabel>
                    <Input type="password" {...field} />
                    {fieldState.invalid && <FieldError message={fieldState.error?.message} />}
                  </Field>
                )}
              />
              <Controller
                name="rePassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Confirm Password</FieldLabel>
                    <Input type="password" {...field} />
                    {fieldState.invalid && <FieldError message={fieldState.error?.message} />}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" form="reset-password-form" disabled={isLoading} className="w-full">
            {isLoading && <Loader className="animate-spin mr-2" />}
            Reset Password
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
