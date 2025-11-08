import { DepositForm } from "@/components/deposit-form";
import { fin1, fin3, fin4, kesy } from "@/assets";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import Link from "next/link";

export default function DepositPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 font-noto-sans">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between gap-2">
          <div className="w-full flex items-center justify-between px-4">
            <Link
              href="/kesy"
              className="flex items-center justify-center gap-2"
            >
              <Image
                src={kesy}
                alt="logo"
                width={35}
                height={35}
                className="w-10 h-10 rounded-full"
              />
              <h1 className="text-3xl font-medieval-sharp font-bold text-foreground">
                KESY
              </h1>
            </Link>
          </div>
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <DepositForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={fin1}
          alt="Image"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
