"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty("Current password is required."),
    password: z.string().nonempty("New password is required.").min(8),
    rePassword: z.string().nonempty("Confirm new password is required."),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords must match",
    path: ["rePassword"],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", password: "", rePassword: "" },
  });

  async function onSubmit(data: ChangePasswordFormData) {
    if (!session?.accessToken) {
      toast.error("You must be logged in to change your password");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify(data),
        }
      );

      const resData = await response.json();

      if (response.ok) {
        toast.success(resData.message || "Password changed successfully");
        form.reset();
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
          <h2 className="text-2xl font-semibold text-center mb-6">Change Password</h2>
          <form id="change-password-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="currentPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Current Password</FieldLabel>
                    <Input type="password" {...field} />
                    {fieldState.invalid && (
                      <FieldError
                        errors={
                          fieldState.error
                            ? [{ message: fieldState.error.message }]
                            : undefined
                        }
                      />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>New Password</FieldLabel>
                    <Input type="password" {...field} />
                    {fieldState.invalid && (
                      <FieldError
                        errors={
                          fieldState.error
                            ? [{ message: fieldState.error.message }]
                            : undefined
                        }
                      />
                    )}


                  </Field>
                )}
              />
              <Controller
                name="rePassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Confirm New Password</FieldLabel>
                    <Input type="password" {...field} />
                   {fieldState.invalid && (
  <FieldError
    errors={
      fieldState.error
        ? [{ message: fieldState.error.message }]
        : undefined
    }
  />
)}

                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            form="change-password-form"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading && <Loader className="animate-spin mr-2" />}
            Change Password
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
