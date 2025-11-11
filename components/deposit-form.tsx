"use client";
import { Button } from "@/components/ui/button";
import { ChevronsDown, InfoIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { kesy, kesyLogo } from "@/assets";
import Image from "next/image";
import "@/components/kesy/styles.css";
import { useDynamicFontSize } from "@/hooks/use-dynamic-font-size";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { useKESYAuth } from "@/contexts/KESYContext";
import { useWallets } from "@/hooks/kesy/useWallets";
import Link from "next/link";
import { useMint } from "@/hooks/kesy/useMint";

interface DepositFormData {
  kesAmount: string;
  destinationWallet: string;
}

const Step1 = ({
  formData,
  setFormData,
  handleNext,
}: {
  formData: DepositFormData;
  setFormData: (data: DepositFormData) => void;
  handleNext: () => void;
}) => {
  const { fontSize: sellFontSize, textRef: sellTextRef } = useDynamicFontSize({
    value: formData.kesAmount,
    maxFontSize: 48,
    minFontSize: 24,
  });
  const { isAuthenticated } = useKESYAuth();

  return (
    <div className="flex flex-col justify-between">
      <div className="relative">
        <div className="w-full h-[170px] bg-transparent border-foreground/30 border rounded-3xl p-4 cursor-pointer group flex flex-col justify-between">
          <div className="w-full flex items-center justify-between relative">
            <h1 className="text-sm font-funnel-display font-light text-muted-foreground">
              You Deposit
            </h1>
          </div>
          <div className="flex items-center justify-between">
            <input
              ref={sellTextRef}
              type="number"
              value={formData.kesAmount}
              onChange={(e) =>
                setFormData({ ...formData, kesAmount: e.target.value })
              }
              className="w-[60%] h-full bg-transparent placeholder:text-muted-foreground focus:outline-none font-funnel-display no-spinners-input"
              style={{ fontSize: `${sellFontSize}px` }}
              placeholder="0"
            />
            <div className="rounded-3xl border border-foreground/20 p-1 flex items-center gap-2">
              <Image
                src={kesyLogo}
                alt="KESY"
                width={24}
                height={24}
                className="rounded-full object-cover w-6 h-6"
              />
              <div className="flex items-center">
                <p className="text-sm font-funnel-display font-light text-muted-foreground px-1">
                  KES
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs font-funnel-display font-light text-muted-foreground mb-2">
            Amount you will have to pay in Kenyan Shillings
          </p>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="rounded-lg p-[3px] bg-background flex items-center justify-center">
            <div className="bg-foreground/5 rounded-lg h-12 w-12 flex items-center justify-center cursor-pointer transition-colors duration-200">
              <ChevronsDown className="w-6 h-6 text-foreground" />
            </div>
          </div>
        </div>
        <div className="w-full mt-1 bg-foreground/5 hover:bg-foreground/10 ease-in duration-300 transition-all h-[170px] border-foreground/30 border rounded-3xl p-4 cursor-pointer group flex flex-col justify-between">
          <div className="w-full flex items-center justify-between relative">
            <h1 className="text-sm font-funnel-display font-light text-muted-foreground">
              You Receive
            </h1>
          </div>
          <div className="flex items-center justify-between">
            <p
              className="w-[60%] h-full bg-transparent placeholder:text-muted-foreground focus:outline-none font-funnel-display no-spinners-input"
              style={{ fontSize: `${sellFontSize - 4}px` }}
            >
              {(Number(formData.kesAmount) * 0.99).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
            <div className="rounded-3xl border border-foreground/20 p-1 flex items-center gap-2">
              <Image
                src={kesy}
                alt="KES"
                width={24}
                height={24}
                className="rounded-full object-cover"
              />
              <div className="flex items-center">
                <p className="text-sm font-funnel-display font-light text-muted-foreground px-1">
                  KESY
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs font-funnel-display font-light text-muted-foreground">
            Amount of KESY tokens you will receive.
          </p>
        </div>
      </div>
      <div className="flex mt-4 flex-col gap-2">
        <div className="flex items-center justify-between px-2">
          <Popover>
            <PopoverTrigger>
              <span className="cursor-pointer text-sm font-funnel-display font-light text-muted-foreground flex items-center gap-1">
                Ratio
                <InfoIcon className="w-3 h-3 text-muted-foreground" />
              </span>
            </PopoverTrigger>
            <PopoverContent className="text-[10px] font-funnel-display leading-relaxed shadow-none border-foreground/20 border rounded-lg p-2 w-[200px]">
              The KESY token is backed by the Kenyan Shilling and is pegged to
              the Kenyan Shilling at a 1:1 ratio.
            </PopoverContent>
          </Popover>
          <p className="text-sm font-funnel-display font-light text-muted-foreground">
            1 KESY = 1 KES
          </p>
        </div>
        <div className="flex items-center justify-between px-2">
          <p className="text-sm font-funnel-display font-light text-muted-foreground">
            Minimum Deposit
          </p>
          <p className="text-sm font-funnel-display font-light text-muted-foreground">
            1,000,000 KES
          </p>
        </div>
        <div className="flex items-center justify-between px-2">
          <p className="text-sm font-funnel-display font-light text-muted-foreground">
            Processing Fee
          </p>
          <p className="text-sm font-funnel-display font-light text-muted-foreground">
            0.1%
          </p>
        </div>
      </div>
      <Button
        disabled={Number(formData.kesAmount) < 1000000 || !isAuthenticated}
        className="w-full mt-4 font-funnel-display rounded-3xl"
        onClick={handleNext}
      >
        {isAuthenticated ? "Continue" : "Login to Continue"}
      </Button>
    </div>
  );
};

const Step2 = ({
  formData,
  setFormData,
  handleSubmit,
  isPending,
}: {
  formData: DepositFormData;
  setFormData: (data: DepositFormData) => void;
  handleSubmit: () => void;
  isPending: boolean;
}) => {
  const { data: wallets } = useWallets();
  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-funnel-display font-semibold">
            Destination Wallet ID
          </h1>
        </div>
        <input
          value={formData.destinationWallet}
          onChange={(e) =>
            setFormData({ ...formData, destinationWallet: e.target.value })
          }
          className="w-full border-b mt-2 border-foreground/20 focus:outline-none text-sm focus:ring-0 focus:border-foreground/50"
          placeholder="Wallet ID"
        />
      </div>
      <div className="flex items-center justify-center my-12">
        <p className="text-lg text-muted-foreground text-center">Or</p>
      </div>
      <div className="">
        <h1 className="text-lg font-funnel-display font-semibold mb-2">
          Select from your wallets
        </h1>
        <div className="flex items-center justify-between flex-wrap gap-2">
          {wallets?.wallets.length !== 0 &&
            wallets?.wallets?.map((wallet) => (
              <div
                key={wallet.walletId}
                className="flex flex-col items-center justify-between cursor-pointer border border-foreground/20 rounded-xl p-2"
                onClick={() =>
                  setFormData({
                    ...formData,
                    destinationWallet: wallet.walletId,
                  })
                }
              >
                <p className="text-sm font-funnel-display font-light text-muted-foreground">
                  {wallet.address.slice(0, 10)}...{wallet.address.slice(-4)}
                </p>
                <p className="text-sm font-funnel-display font-light text-muted-foreground">
                  {wallet.walletId.slice(0, 10)}...{wallet.walletId.slice(-5)}
                </p>
              </div>
            ))}
          {wallets?.wallets.length === 0 && (
            <p className="text-sm font-funnel-display font-light text-muted-foreground">
              No saved wallets yet. Please{" "}
              <Link
                href="/kesy/dashboard/wallets"
                className="text-blue-500 underline"
              >
                add a wallet
              </Link>{" "}
              to continue.
            </p>
          )}
        </div>
      </div>
      <p className="text-xs font-funnel-display font-light text-muted-foreground mt-8">
        Deposit details & instructions will be shared after your mint request is
        approved.
      </p>
      <Button
        disabled={!formData.destinationWallet || isPending}
        className="w-full mt-4 font-funnel-display rounded-3xl"
        onClick={handleSubmit}
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Finish"}
      </Button>
    </div>
  );
};

export function DepositForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [formData, setFormData] = useState<DepositFormData>({
    kesAmount: "0",
    destinationWallet: "",
  });
  const [step, setStep] = useState(1);
  const { mutate: mintMutation, isPending } = useMint();

  const handleNext = () => {
    if (step === 2) {
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = () => {
    mintMutation({
      amountKes: Number(formData.kesAmount),
      walletId: formData.destinationWallet,
    });
  };

  return (
    <div className={className}>
      {step === 1 ? (
        <Step1
          formData={formData}
          setFormData={setFormData}
          handleNext={handleNext}
        />
      ) : (
        <Step2
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          isPending={isPending}
        />
      )}
    </div>
  );
}
