import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginPayload } from "@/types/LoginPayload";
import { login } from "@/store/slices/auth";

export function Login() {
  const [loginPayload, setLoginPayload] = useState<LoginPayload>({});

  const dispatch = useDispatch();

  const handleLoginPayloadChange = (key: keyof LoginPayload, event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginPayload((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: login.type, payload: loginPayload });
  };

  return (
    <div className="flex items-center justify-center min-h-full">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(event) => handleLoginPayloadChange("email", event)}
                  id="email"
                  type="email"
                  placeholder="yourname@dsar.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  onChange={(event) => handleLoginPayloadChange("password", event)}
                  id="password"
                  type="password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
