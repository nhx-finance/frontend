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
import { toast } from "sonner";
import { useState } from "react";
import { AuthData } from "@/hooks/use-login";
import { useRegister } from "@/hooks/use-register";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { mutate: registerMutation, isPending } = useRegister();
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState<AuthData>({
    username: "",
    password: "",
  });
  const pathname = usePathname();
  const isKesy = pathname.includes("/kesy");

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData.username === "" || formData.password === "") {
      toast.error("Please fill in all fields");
      return;
    }
    if (formData.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (isKesy) {
      toast.info("KESY registration is coming soon");
      router.push("/kesy/details");
      return;
    }
    registerMutation(formData);
  };
  return (
    <form
      className={cn("flex flex-col gap-6 font-funnel-display", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>
        <Field>
          <Button
            type="submit"
            disabled={isPending}
            onClick={(e) =>
              handleSubmit(e as React.FormEvent<HTMLButtonElement>)
            }
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Create Account"
            )}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account?{" "}
            <a href={isKesy ? "/kesy/login" : "/login"}>Sign in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
