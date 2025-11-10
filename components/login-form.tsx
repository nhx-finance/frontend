"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthParams, useLogin } from "@/hooks/kesy/useAuthentication";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { mutate: loginMutation, isPending } = useLogin({
    isAdminLogin: false,
  });
  const [formData, setFormData] = useState<AuthParams>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData.email === "" || formData.password === "") {
      toast.error("Please fill in all fields");
      return;
    }

    loginMutation(formData);
  };
  return (
    <form
      className={cn("flex flex-col gap-6 font-funnel-display", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>

            <div
              className="cursor-pointer text-sm text-muted-foreground underline"
              onClick={() =>
                toast.info("Please contact support to reset your password.")
              }
            >
              Forgot your password?
            </div>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
          onClick={(e) => handleSubmit(e as React.FormEvent<HTMLButtonElement>)}
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Login"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/kesy/signup" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
