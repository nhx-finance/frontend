import { LoginForm } from "@/components/login-form";
import { fin1, fin2, fin3, fin4, logo } from "@/assets";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 font-noto-sans">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between gap-2">
          <div className="w-full flex items-center justify-between px-4">
            <div className="flex items-center justify-center gap-2">
              <Image src={logo} alt="logo" width={35} height={35} />
              <h1 className="text-3xl font-medieval-sharp font-bold text-foreground">
                NHX
              </h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={fin3}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
