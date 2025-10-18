"use client";

import { memo, useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createClient } from "../../lib/client";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

const Page = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const supabase = createClient();

  useEffect(() => {
    if (user && !authLoading) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;
        if (data.user && !data.session) {
          setError("Please check your email for a confirmation link.");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occured.")
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleAuth}
      className="flex items-center justify-center my-50"
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            {isSignUp ? "Create Your Account" : "Login to your account"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex flex-col gap-6">
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div className="text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-700 hover:bg-cyan-900 text-white"
          >
            {loading ? "Loading..." : isSignUp ? "Sign Up" : "Login"}
          </Button>
          <Button
            variant="outline"
            className="w-full bg-black hover:bg-black/80 hover:text-white text-white"
          >
            {loading
              ? "Loading..."
              : isSignUp
                ? "Sign Up with Google"
                : "Login with Google"}
          </Button>
          <CardAction>
            <button
              className="text-pink-600 dark:text-pink-400 hover:text-pink-500 cursor-pointer"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp
                ? "Already have an account? Login"
                : "Don't have an account? Sign up"}
            </button>
          </CardAction>
        </CardFooter>
      </Card>
    </form>
  );
};

export default memo(Page);
