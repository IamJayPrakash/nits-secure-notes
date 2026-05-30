"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { CircleUser, LogOut, Shield } from "lucide-react";
import CommonButton from "@/components/common/CommonButton";

const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Brand Name */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-90 transition-opacity">
          <Shield className="h-6 w-6 stroke-[2.5]" />
          <span>Secure Notes</span>
        </Link>

        {/* User Info & Actions */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-colors">
              <CircleUser className="h-5 w-5 text-white/90" />
              <span className="hidden sm:inline text-sm font-medium tracking-wide">
                {user.email}
              </span>
            </div>
          )}

          <CommonButton
            variant="ghost"
            onClick={handleLogout}
            className="flex items-center gap-2 text-white hover:bg-white/15 hover:text-white px-3 py-1.5 rounded-lg border border-transparent transition-all font-medium text-sm cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </CommonButton>
        </div>
      </div>
    </header>
  );
};

export default Header;