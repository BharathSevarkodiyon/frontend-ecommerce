import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Provider/AuthContext";
import AuthenticateNavbar from "../navbar/AuthenticateNavbar";
import { Toaster } from "sonner";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get("redirect") || "/";

  const handleLogin = async () => {
      await login(email, password, redirectUrl);
      setEmail("");
      setPassword("");
  };

  return (
    <div className="grid place-items-center h-screen bg-gray-100">
      <AuthenticateNavbar/>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="flex justify-center">
            <img 
            src="https://generated-assets.prod.myninja.ai/be20b773-b2c7-4e6e-ae7d-0dd29dde7958/cd1eb8f9-fe48-43e9-959b-3ef5da2b6fbd_2.jpeg" 
            className="w-10 h-10 rounded-full object-cover"
            alt="Logo" />
          </div>
          <CardTitle className="text-2xl text-center">Sign in to BuzzBee</CardTitle>
          <CardDescription className="text-center">
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter at least 8 characters"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleLogin} disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </CardFooter>
        <div className="mb-5 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </div>
      <Toaster richColors position="bottom-right" duration={3000}  expand={false}/>
      </Card>
    </div>
  );
}
