"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const verifyCodeSchema = z.object({
  resetCode: z.string().nonempty("Reset code is required."),
});

type VerifyCodeFormData = z.infer<typeof verifyCodeSchema>;

export default function VerifyResetCodePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<VerifyCodeFormData>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: { resetCode: "" },
  });

  async function onSubmit(data: VerifyCodeFormData) {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, resetCode: data.resetCode }),
        }
      );

      const resData = await response.json();

      if (response.ok && resData.statusMsg === "success") {
        toast.success(resData.message || "Code verified");
        router.push(`/forgot-password/reset?email=${email}&code=${data.resetCode}`);
      } else {
        toast.error(resData.message || "Invalid or expired code");
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
          <h2 className="text-2xl font-semibold text-center mb-6">Verify Reset Code</h2>
          <form id="verify-code-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="resetCode"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Reset Code</FieldLabel>
                    <Input {...field} />
                    {fieldState.invalid && <FieldError message={fieldState.error?.message} />}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" form="verify-code-form" disabled={isLoading} className="w-full">
            {isLoading && <Loader className="animate-spin mr-2" />}
            Verify Code
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
