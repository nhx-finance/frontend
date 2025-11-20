"use client";

import { fin1, kesy } from "@/assets";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useDepositStore } from "@/stores/depositStore";
import { IconCopy } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const bankDetails = {
  bankName: "KCB Bank Kenya",
  accountName: "NHX Finance Reserves Ltd",
  accountNumber: "1234567890",
  branch: "Upper Hill",
  swiftCode: "KCBLKENX",
  reference: "MINT-2025-11-08-001",
};

export default function DepositDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { depositAmount, kesyAmount } = useDepositStore();
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
        <div className="flex flex-col flex-1  justify-center ">
          <div className="w-full">
            <div className="">
              <h1 className="text-2xl font-funnel-display font-bold text-foreground">
                Wire Transfer Details
              </h1>
              <p className="text-sm font-funnel-display text-muted-foreground max-w-md">
                Paste the following details into your bank transfer. Include the
                reference in your memo or the transfer might be delayed.
              </p>
            </div>
          </div>
          <div className="bg-foreground/5 border border-foreground/20 rounded-3xl py-2 mt-4 w-full max-w-md">
            <div className="flex items-center justify-between py-2 px-4">
              <p className="text-sm font-funnel-display text-muted-foreground">
                Bank Name
              </p>
              <p className="text-xs font-funnel-display text-foreground">
                {bankDetails.bankName}
              </p>
            </div>
            <div className="flex items-center justify-between py-2 px-4">
              <p className="text-sm font-funnel-display text-muted-foreground">
                Wire Amount
              </p>
              <p className="text-xs font-funnel-display text-foreground">
                {depositAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                KES
              </p>
            </div>
            <div className="flex items-center justify-between py-2 px-4">
              <p className="text-sm font-funnel-display text-muted-foreground">
                KESY Tokens
              </p>
              <p className="text-xs font-funnel-display text-foreground">
                {kesyAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                KESY
              </p>
            </div>
            <div className="flex items-center justify-between py-2 px-4">
              <p className="text-sm font-funnel-display text-muted-foreground">
                Reference
              </p>
              <p className="text-xs flex cursor-pointer hover:text-foreground/80 transition-all duration-300 ease-in items-center gap-2 font-funnel-display text-foreground">
                {id}
                <IconCopy
                  className="w-4 h-4"
                  onClick={() => {
                    navigator.clipboard.writeText(id?.toString() || "");
                    toast.success("Reference copied to clipboard");
                  }}
                />
              </p>
            </div>
            <div className="flex items-center justify-between py-2 px-4">
              <p className="text-sm font-funnel-display text-muted-foreground">
                Branch
              </p>
              <p className="text-xs font-funnel-display text-foreground">
                {bankDetails.branch}
              </p>
            </div>
            <div className="flex items-center justify-between py-2 px-4">
              <p className="text-sm font-funnel-display text-muted-foreground">
                Swift Code
              </p>
              <p className="text-xs flex cursor-pointer hover:text-foreground/80 transition-all duration-300 ease-in items-center gap-2 font-funnel-display text-foreground">
                {bankDetails.swiftCode}
                <IconCopy
                  className="w-4 h-4"
                  onClick={() => {
                    navigator.clipboard.writeText(bankDetails.swiftCode);
                    toast.success("Swift code copied to clipboard");
                  }}
                />
              </p>
            </div>
            <div className="flex items-center justify-between py-2 px-4">
              <p className="text-sm font-funnel-display text-muted-foreground">
                Account Name
              </p>
              <p className="text-xs flex cursor-pointer hover:text-foreground/80 transition-all duration-300 ease-in items-center gap-2 font-funnel-display text-foreground">
                {bankDetails.accountName}
                <IconCopy
                  className="w-4 h-4"
                  onClick={() => {
                    navigator.clipboard.writeText(bankDetails.accountName);
                    toast.success("Account name copied to clipboard");
                  }}
                />
              </p>
            </div>
            <div className="flex items-center justify-between py-2 px-4">
              <p className="text-sm font-funnel-display text-muted-foreground">
                Account Number
              </p>
              <p className="text-xs flex cursor-pointer hover:text-foreground/80 transition-all duration-300 ease-in items-center gap-2 font-funnel-display text-foreground">
                {bankDetails.accountNumber}
                <IconCopy
                  className="w-4 h-4"
                  onClick={() => {
                    navigator.clipboard.writeText(bankDetails.accountNumber);
                    toast.success("Account number copied to clipboard");
                  }}
                />
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-funnel-display text-muted-foreground max-w-md">
              Please note that the wire transfer may take up to 24 hours to
              complete, and 2-3 business days for NHX Finance reserves to
              confirm the deposit.
              <br />
              <br />
              Please contact support if you have any questions.
            </p>
            <div className="flex flex-col md:flex-row gap-2 items-center justify-between max-w-md">
              <Button
                variant="outline"
                className="w-full md:w-1/2 mt-4 font-funnel-display rounded-3xl bg-background border border-foreground/20 text-foreground shadow-none text-sm"
                onClick={() => {
                  toast.error("Support is not available yet");
                }}
              >
                Contact Support
              </Button>
              <Button
                className="w-full md:w-1/2 mt-4 font-funnel-display rounded-3xl bg-foreground border border-foreground/20 text-background shadow-none text-sm"
                onClick={() => {
                  router.push("/kesy/dashboard");
                }}
              >
                Back to Home
              </Button>
            </div>
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
