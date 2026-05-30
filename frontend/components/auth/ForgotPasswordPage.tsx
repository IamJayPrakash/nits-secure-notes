"use client";

import { Card } from "@/components/ui/card";
import CustomInputField from "@/components/common/CustomInputField";
import CommonButton from "@/components/common/CommonButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { forgotPasswordService } from "@/services/forgot-password.service";
import axios from "axios";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
});

type ForgotPasswordInput = z.infer<typeof schema>;

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setLoading(true);
    try {
      await forgotPasswordService.send(data.email);
      toast.success("If an account exists, a reset link has been sent!");
      router.push("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <Card className="p-8 w-full max-w-sm border border-slate-100 shadow-md bg-white rounded-2xl">
        <div className="prose prose-slate max-w-none text-center">
          <h1 className="mb-2 text-2xl font-semibold">
            Secure Notes
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            Enter your email and we&apos;ll send a reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <CustomInputField
            id="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            error={errors.email?.message}
            {...register("email")}
          />

          <CommonButton
            type="submit"
            loading={loading}
            className="w-full py-6 mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all shadow-xs cursor-pointer"
          >
            Send Reset Link
          </CommonButton>
        </form>

        <CommonButton
          type="button"
          variant="link"
          onClick={() => router.push("/login")}
          leftIcon={<ArrowLeft />}
          className="mt-4 w-full"
        >
          Back to Login
        </CommonButton>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
