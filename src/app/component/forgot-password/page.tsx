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
import { useRouter } from "next/navigation";

const forgotPasswordSchema = z.object({
  email: z.string().nonempty("Email is required.").email("Email is invalid."),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.email }),
        }
      );

      const resData = await response.json();

      if (response.ok) {
        toast.success(resData.message || "Reset code sent to your email");
        setEmailSent(true);
        setEmail(data.email); // save email for next step
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

  if (emailSent) {
    // Go to Step 2
    router.push(`/forgot-password/verify?email=${email}`);
    return null;
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardContent>
        <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>
        <form id="forgot-password-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
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
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="forgot-password-form" disabled={isLoading} className="w-full">
          {isLoading && <Loader className="animate-spin mr-2" />}
          Send Reset Code
        </Button>
      </CardFooter>
    </Card>
  );
}
