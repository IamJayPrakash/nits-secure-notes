"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
      toast.error("You must be logged in to access this page.");
      
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
        <h1 className="text-[28px] font-bold text-center text-slate-800 tracking-tight mb-6">
          Secure Notes
        </h1>

        {/* Tab Toggle Selector */}
        <div className="flex bg-slate-100/80 p-1 rounded-xl mb-6 border border-slate-200/50">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
              activeTab === "login"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => router.push("/register")}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
              activeTab === "register"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Register
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-50/70 border-slate-200 rounded-lg focus:bg-white transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-slate-50/70 border-slate-200 rounded-lg focus:bg-white transition-colors"
            />
          </div>

          {activeTab === "register" && (
            <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
              <Label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-700">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-slate-50/70 border-slate-200 rounded-lg focus:bg-white transition-colors"
              />
            </div>
          )}

          <Button
            type="submit"
            className="w-full py-6 mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all shadow-xs"
          >
            {activeTab === "login" ? "Login" : "Register"}
          </Button>
        </form>

        {activeTab === "login" && (
          <a
            href="/forgotpassword"
            className="block text-center mt-5 text-sm font-medium text-slate-500 hover:text-primary transition-colors"
          >
            Forgot password?
          </a>
        )}
      </Card>
    </div>
  );
};

export default LoginPage;