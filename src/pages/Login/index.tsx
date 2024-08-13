import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginPayload } from "@/types/auth";
import { login } from "@/store/slices/auth";
import { RootState } from "@/store/store";
import { User } from "@/types/auth";
import { Role } from "@/enums/Role";
import { useToast } from "@/components/ui/toast/use-toast";

export function Login() {
  const [loginPayload, setLoginPayload] = useState<LoginPayload>({
    email: "",
    password: "",
  });

  const me: User | null = useSelector((state: RootState) => state.auth.me) as User | null;
  const error: string | null = useSelector((state: RootState) => state.auth.error) as string | null;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (me?.role == Role.admin) {
      navigate("/admin/dashboard");
    }

    if (me?.role == Role.teamLeader || me?.role == Role.teamMember) {
      navigate("/case/list");
    }
  }, [me]);

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error,
      });
    }
  }, [error]);

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
