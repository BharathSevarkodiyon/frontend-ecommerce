import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../Provider/AuthContext";
import AuthenticateNavbar from "../navbar/AuthenticateNavbar";
import { Toaster } from "sonner";

export function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const { signup, loading } = useAuth(); // Use signup from context

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10 && /^[0-9]*$/.test(value)) {
      setPhone(value);
    }
  };

  const handleSubmit = async () => {
    const fullPhoneNumber = `${countryCode}${phone}`;
    const signupData = {
      firstName,
      lastName,
      email,
      password,
      phone: fullPhoneNumber,
    };

    await signup(signupData);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setCountryCode("+1");
  };

  return (
    <div className="grid place-items-center h-screen bg-gray-100">
      <AuthenticateNavbar/>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
        <div className="flex justify-center">
            <img 
            src="https://generated-assets.prod.myninja.ai/be20b773-b2c7-4e6e-ae7d-0dd29dde7958/cd1eb8f9-fe48-43e9-959b-3ef5da2b6fbd_2.jpeg" 
            className="w-10 h-10 rounded-full object-cover"
            alt="Logo" />
          </div>
          <CardTitle className="text-xl text-center">Sign up to BuzzBee</CardTitle>
          <CardDescription className="text-center">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
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
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="flex space-x-2">
                <select
                  id="country-code"
                  className="border border-gray-300 rounded-l-md px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  <option value="+1">+1 (US)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+91">+91 (India)</option>
                  <option value="+61">+61 (Australia)</option>
                  <option value="+81">+81 (Japan)</option>
                </select>
                <Input
                  id="phone"
                  type="number"
                  className="no-arrows rounded-r-md"
                  maxLength={10}
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="1234567890"
                  required
                />
              </div>
            </div>
            <Button type="submit" onClick={handleSubmit} className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create an account"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      <Toaster richColors position="bottom-right" duration={3000}  expand={false}/>
      </Card>
    </div>
  );
}

