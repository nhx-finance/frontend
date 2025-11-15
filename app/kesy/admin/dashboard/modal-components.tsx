import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import Image from "next/image";
import { hederaLogo, kesy } from "@/assets";
import { TransactionItem } from "@/hooks/kesy/useTransactions";

export function formatWalletAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatAmount(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "KES",
  });
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function ModalWrapper({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 px-2 w-screen z-50 bg-black/50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-background rounded-3xl p-4 w-full max-w-2xl border border-foreground/20 relative">
        {children}
        <div className="absolute top-4 right-4">
          <Button
            variant="outline"
            className="rounded-full border border-foreground/20 shadow-none text-sm"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ModalHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-4 pr-12">
      <div className="flex-1">
        <h1 className="text-xl font-funnel-display font-bold">{title}</h1>
        {description && (
          <p className="text-sm font-funnel-display text-muted-foreground">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

export function TransactionDetails({
  transaction,
  size = "lg",
}: {
  transaction: TransactionItem;
  size?: "sm" | "lg";
}) {
  const textSize = size === "sm" ? "text-sm" : "text-lg";

  return (
    <div className="mt-4 flex items-center gap-4 md:gap-0 flex-col md:flex-row justify-between">
      <div className="w-full">
        <p className="text-sm font-funnel-display text-muted-foreground">
          Mint Request
        </p>
        <div className="flex items-center gap-1">
          <Image
            src={kesy}
            alt="KESY"
            width={24}
            height={24}
            className="rounded-full border border-foreground/20"
          />
          <h1 className={`${textSize} font-funnel-display font-semibold`}>
            {formatAmount(transaction.amountKes)}
          </h1>
        </div>
      </div>
      <div className="w-full">
        <p className="text-sm font-funnel-display text-muted-foreground">
          Destination Wallet
        </p>
        <div className="flex items-center gap-1">
          <Image
            src={hederaLogo}
            alt="Hedera"
            width={24}
            height={24}
            className="rounded-full border border-foreground/20"
          />
          <h1 className={`${textSize} font-funnel-display font-semibold`}>
            {formatWalletAddress(transaction.walletAddress)}
          </h1>
        </div>
      </div>
      <div className="w-full">
        <p className="text-sm font-funnel-display text-muted-foreground">
          Date
        </p>
        <h1 className={`${textSize} font-funnel-display font-semibold`}>
          {formatDate(transaction.createdAt)}
        </h1>
      </div>
    </div>
  );
}

export function PayloadInput({
  value,
  onChange,
  placeholder,
  error,
  isSecureEntry = false,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  isSecureEntry?: boolean;
}) {
  return (
    <div className="mt-4">
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-3xl font-funnel-display shadow-none h-[2.8rem] border ${
          error ? "border-red-500" : "border-foreground/20"
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? "payload-error" : undefined}
        type={isSecureEntry ? "password" : "text"}
      />
      {error && (
        <p
          id="payload-error"
          className="text-sm text-red-500 mt-1 font-funnel-display"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
      <p className="text-sm text-red-600 dark:text-red-400 font-funnel-display">
        {message}
      </p>
    </div>
  );
}
