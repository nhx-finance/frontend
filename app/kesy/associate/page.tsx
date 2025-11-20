"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { associate, nhxmmf } from "@/assets";
import { ThemeToggle } from "@/components/theme-toggle";
import CustomConnectButton from "@/components/ui/connect-button";
import { Button } from "@/components/ui/button";
import { ChevronsRight, KeyRound, Loader2 } from "lucide-react";
import { prepareContractCall, getContract } from "thirdweb";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { client, hederaTestnet } from "@/lib/client";
import { KESY_CONTRACT_ADDR } from "@/lib/utils";
import { toast } from "sonner";

const kesyContract = getContract({
  client,
  chain: hederaTestnet,
  address: "0x0000000000000000000000000000000000000167",
});

function page() {
  const {
    mutate: sendTransaction,
    isPending,
    isSuccess,
    isError,
  } = useSendTransaction();
  const activeAccount = useActiveAccount();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Wallet associated successfully");
    }
    if (isError) {
      toast.error("Failed to associate wallet");
    }
  }, [isSuccess, isError]);
  const onClick = async () => {
    if (!activeAccount) {
      toast.error("Please connect your wallet to continue");
      return;
    }
    const transaction = prepareContractCall({
      contract: kesyContract,
      method:
        "function associateToken(address account, address token) external returns (int64 responseCode)",
      params: [activeAccount.address, KESY_CONTRACT_ADDR],
      value: BigInt(0),
    });
    sendTransaction(transaction);
  };

  return (
    <div className="w-full flex flex-col items-center justify-between max-w-7xl mx-auto px-4 h-screen ">
      <div className="w-full flex items-center justify-between mt-2">
        <Link href="/" className="flex items-center gap-1">
          <Image src={nhxmmf} alt="logo" width={40} height={40} />
          <h1 className="text-2xl font-medieval-sharp font-semibold text-foreground">
            KESY
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <CustomConnectButton />
        </div>
      </div>
      <div className="w-full mt-10 flex flex-col items-center justify-center md:max-w-xl">
        <h1 className="text-4xl font-funnel-display text-foreground">
          KESY Token Association
        </h1>
        <p className="text-base text-muted-foreground font-funnel-display md:text-center text-left mt-2">
          Associating your wallet with the KESY Stablecoin will allow you to
          receive KESY directly to your wallet.
        </p>
        <Image
          src={associate}
          alt="associate"
          width={100}
          height={100}
          className="w-48 h-48 object-cover mt-4"
        />
        <div className="w-full flex flex-col md:flex-row items-center gap-2 mt-12">
          <Button
            variant="default"
            className="rounded-3xl w-full md:w-1/2 bg-background hover:bg-foreground/10 ease-in transition-all duration-300 text-foreground border border-foreground/20 font-funnel-display font-semibold flex items-center justify-center"
            onClick={onClick}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Associate Wallet
                <KeyRound className="w-4 h-4" />
              </>
            )}
          </Button>
          <Link
            href={"/kesy/login"}
            className="flex gap-2 items-center w-full md:w-1/2 group cursor-pointer"
          >
            <Button
              variant="default"
              className="rounded-3xl w-[88%] md:w-[80%] bg-foreground text-background border border-foreground/20 font-funnel-display font-semibold flex items-center justify-center"
            >
              Launch App
            </Button>
            <div className="w-10 h-10 bg-foreground group-hover:bg-foreground/90 rounded-full flex items-center justify-center">
              <ChevronsRight className="w-6 h-6 text-background group-hover:rotate-[-45deg] ease-in transition-all duration-300" />
            </div>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground font-funnel-display text-center mt-4">
          To successfully associate your wallet with the KESY Stablecoin, you
          need to have some HBAR in your wallet to cover the transaction fees.{" "}
          <a
            href="https://hedera.com/hbar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/50 font-semibold underline"
          >
            Get ℏBAR
          </a>
        </p>
      </div>
      <div className="w-full mt-10 flex flex-col md:flex-row items-center justify-between md:max-w-xl mb-4 gap-4 md:gap-8">
        <div className="flex md:flex-col flex-row-reverse justify-between items-start w-full">
          <h2 className="flex flex-col font-semibold font-medieval-sharp text-foreground">
            100,000,000 KESY
            <span className="text-xs text-muted-foreground font-funnel-display">
              1,000,000 USD
            </span>
          </h2>
          <p className="text-sm text-muted-foreground font-funnel-display text-center mt-2">
            Total Supply
          </p>
        </div>
        <div className="flex md:flex-col flex-row-reverse justify-between items-start w-full">
          <h2 className="flex flex-col font-semibold font-medieval-sharp text-foreground">
            100,000,000 KES{" "}
            <span className="text-xs text-muted-foreground font-funnel-display">
              1,000,000 USD
            </span>
          </h2>
          <p className="text-sm text-muted-foreground font-funnel-display text-center mt-2">
            Reserve Amount
          </p>
        </div>
        <div className="flex md:flex-col flex-row-reverse justify-between items-start w-full">
          <h2 className="flex flex-col font-semibold font-medieval-sharp text-foreground">
            0.0.7228867
            <span className="text-xs text-muted-foreground font-funnel-display">
              0xed45...908
            </span>
          </h2>
          <p className="text-sm text-muted-foreground font-funnel-display text-center mt-2">
            Token ID
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
