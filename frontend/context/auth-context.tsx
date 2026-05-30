"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Handle login logic here
    console.log("Login:", email, password);
    // For now, just set a dummy user
    setUser({ email });
    document.cookie = "auth_token=dummy_token; path=/; max-age=86400; SameSite=Lax";
  };

  const logout = async () => {
    // Handle logout logic here
    setUser(null);
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}