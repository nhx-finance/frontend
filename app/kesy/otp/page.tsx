import { OTPForm } from "@/components/otp-form";
import { fin3 } from "@/assets";
import Image from "next/image";
import Link from "next/link";

export default function OTPPage() {
  return (
    <div className="flex min-h-svh w-full">
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-xs">
          <OTPForm />
        </div>
      </div>
      <div className="relative hidden w-1/2 lg:block">
        <Image
          alt="Authentication"
          className="absolute inset-0 h-full w-full object-cover"
          height={1080}
          src={fin3}
          width={1920}
        />
      </div>
    </div>
  );
}
