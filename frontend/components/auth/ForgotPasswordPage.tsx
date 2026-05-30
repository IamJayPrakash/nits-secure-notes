"use client";

import { Card } from "@/components/ui/card";
import CustomInputField from "@/components/common/CustomInputField";
import CommonButton from "@/components/common/CommonButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending reset link
    console.log("Sending reset link to:", email);
    setTimeout(() => {
      setLoading(false);
      toast.success("Password reset link sent to your email!");
      router.push("/login");
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <Card className="p-8 w-full max-w-sm border border-slate-100 shadow-md bg-white rounded-2xl">
        <div className="prose prose-slate max-w-none text-center">
          <h1 className="mb-2">
            Secure Notes
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            Forgot Password
          </p>
        </div>

        {/* Forgot Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInputField
            id="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <CommonButton
            type="submit"
            loading={loading}
            className="w-full py-6 mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all shadow-xs cursor-pointer"
          >
            Send Reset Link
          </CommonButton>
        </form>

        <CommonButton
          type="button"
          variant="link"
          onClick={() => router.push("/login")}
          className="block w-full text-center mt-5 text-sm font-medium text-slate-500 hover:text-primary hover:no-underline transition-colors cursor-pointer"
        >
          Back to Login
        </CommonButton>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
