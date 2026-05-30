"use client";

import { Card } from "@/components/ui/card";
import CustomInputField from "@/components/common/CustomInputField";
import CommonButton from "@/components/common/CommonButton";
import CommonTab from "@/components/common/CommonTab";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AUTH_MESSAGES, AUTH_TABS } from "@/utils/constants";
import Link from "next/link";
import { Shield } from "lucide-react";

const LoginPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = pathname === "/register" ? "register" : "login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam === "unauthorized") {
      toast.error(AUTH_MESSAGES.UNAUTHORIZED);
      
      // Clean up URL query parameters so refreshing doesn't re-trigger the toast
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "login") {
      console.log("Logging in with:", { email, password });
    } else {
      console.log("Registering with:", { email, password, confirmPassword });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <Card className="p-8 w-full max-w-sm border border-slate-100 shadow-md bg-white rounded-2xl">
        <div className="prose prose-slate max-w-none">
         <h1 className="mb-2 text-2xl font-semibold text-center">
            Secure Notes
          </h1>
        </div>

        <CommonTab
          options={AUTH_TABS}
          selectedValue={activeTab}
          onChange={(value) => router.push(value === "register" ? "/register" : "/login")}
          className="mb-6"
        />

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInputField
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <CustomInputField
            id="password"
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {activeTab === "register" && (
            <CustomInputField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              wrapperClassName="animate-in fade-in slide-in-from-top-1 duration-200"
            />
          )}

          <CommonButton
            type="submit"
            variant="default"
            size="lg"
            className="w-full rounded-sm"
          >
            {activeTab === "login" ? "Login" : "Register"}
          </CommonButton>
        </form>

        {activeTab === "login" && (
          <Link
            href="/forgotpassword"
            className="text-center hover:underline hover:text-primary"
          >
            Forgot password?
          </Link>
        )}
      </Card>
    </div>
  );
};

export default LoginPage;