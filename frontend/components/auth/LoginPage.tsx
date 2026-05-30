"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-900 via-purple-900 to-pink-900">
      <Card className="p-8 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <Label>Email</Label>
        <Input type="email" placeholder="Enter your email address" />
        <Label>Password</Label>
        <Input type="password" placeholder="Password" />
        <Button type="submit">Login</Button>
      </Card>
    </div>
  );
};

export default Login;