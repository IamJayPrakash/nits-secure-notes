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
import { useAuth } from "@/context/auth-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema, LoginInput, RegisterInput } from "@/utils/validations/auth";

const LoginPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  
  const activeTab = pathname === "/register" ? "register" : "login";
  const [loading, setLoading] = useState(false);

  // Initialize login form
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLoginForm,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  // Initialize register form
  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    reset: resetRegisterForm,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam === "unauthorized") {
      toast.error(AUTH_MESSAGES.UNAUTHORIZED);
      
      // Clean up URL query parameters so refreshing doesn't re-trigger the toast
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, [searchParams]);

  // Reset forms when switching tabs
  useEffect(() => {
    resetLoginForm();
    resetRegisterForm();
  }, [activeTab, resetLoginForm, resetRegisterForm]);

  const onLoginSubmit = async (data: LoginInput) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      toast.success("Successfully logged in!");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const onRegisterSubmit = async () => {
    setLoading(true);
    try {
      // Simulate registration
      toast.success("Registration successful! You can now log in.");
      router.push("/login");
    } catch (err) {
      console.error(err);
      toast.error("Registration failed");
    } finally {
      setLoading(false);
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

        {/* Login Form */}
        {activeTab === "login" && (
          <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-4">
            <CustomInputField
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email address"
              error={loginErrors.email?.message}
              {...registerLogin("email")}
            />

            <CustomInputField
              id="password"
              label="Password"
              type="password"
              placeholder="Password"
              error={loginErrors.password?.message}
              {...registerLogin("password")}
            />

            <CommonButton
              type="submit"
              variant="default"
              size="lg"
              loading={loading}
              className="w-full rounded-sm"
            >
              Login
            </CommonButton>
          </form>
        )}

        {/* Register Form */}
        {activeTab === "register" && (
          <form onSubmit={handleRegisterSubmit(onRegisterSubmit)} className="space-y-4">
            <CustomInputField
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email address"
              error={registerErrors.email?.message}
              {...registerRegister("email")}
            />

            <CustomInputField
              id="password"
              label="Password"
              type="password"
              placeholder="Password"
              error={registerErrors.password?.message}
              {...registerRegister("password")}
            />

            <CustomInputField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              error={registerErrors.confirmPassword?.message}
              {...registerRegister("confirmPassword")}
              wrapperClassName="animate-in fade-in slide-in-from-top-1 duration-200"
            />

            <CommonButton
              type="submit"
              variant="default"
              size="lg"
              loading={loading}
              className="w-full rounded-sm"
            >
              Register
            </CommonButton>
          </form>
        )}

        {activeTab === "login" && (
          <div className="text-center mt-5">
            <Link
              href="/forgotpassword"
              className="text-sm font-medium text-slate-500 hover:underline hover:text-primary transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
};

export default LoginPage;