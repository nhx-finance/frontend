"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { logo } from "@/assets";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { useLogin } from "@/hooks/kesy/useAuthentication";
import { Loader2 } from "lucide-react";

export function AdminLoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: loginMutation, isPending } = useLogin({
    isAdminLogin: true,
  });

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("Please fill in all fields");
      return;
    }
    loginMutation({ email, password });
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form className="font-funnel-display">
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <Image src={logo} alt="NHX Finance" width={40} height={40} />
              </div>
              <span className="sr-only">NHX Finance</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to NHX Finance</h1>
            <FieldDescription>
              Stablecoin infrastructure for Africa
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <Field>
            <Button
              type="submit"
              onClick={(e) =>
                handleSubmit(e as React.FormEvent<HTMLButtonElement>)
              }
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
