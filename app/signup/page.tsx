import { fin3, logo } from "@/assets";
import { SignupForm } from "@/components/signup-form";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
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
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={fin3}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
      </div>
    </div>
  );
}
