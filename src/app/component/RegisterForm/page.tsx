"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

const registerSchema = z
  .object({
    name: z.string().nonempty("Name is required."),
    email: z.string().nonempty("Email is required.").email("Email is invalid."),
    password: z.string().nonempty("Password is required.").min(8),
    rePassword: z.string().nonempty("Confirm password is required."),
    phone: z
      .string()
      .nonempty("Phone number is required.")
      .regex(/^01[0-2,5][0-9]{8}$/, "Invalid Egyptian phone number."),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords must match",
    path: ["rePassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

interface Props {
  onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", rePassword: "", phone: "" },
  });

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true);
    try {
      const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (response.ok) {
        toast.success("Registered successfully!");
        form.reset();
        if (onSuccess) onSuccess(); // يروح للـ Login
      } else {
        toast.error(resData.message || "Registration failed");
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
      <CardContent>
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Name</FieldLabel>
                  <Input {...field} />
                  {fieldState.invalid && <FieldError message={fieldState.error?.message} />}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input {...field} />
                  {fieldState.invalid && <FieldError message={fieldState.error?.message} />}
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
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Phone</FieldLabel>
                  <Input {...field} />
                  {fieldState.invalid && <FieldError message={fieldState.error?.message} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="register-form" disabled={isLoading} className="w-full">
          {isLoading && <Loader className="animate-spin mr-2" />}
          Register
        </Button>
      </CardFooter>
    </Card>
  );
}
