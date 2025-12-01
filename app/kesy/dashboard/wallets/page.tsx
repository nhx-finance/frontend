"use client";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import NoWallet from "./no-wallet";
import { KESYSidebar } from "@/components/kesy-sidebar";
import {
  useWalletsWithBalances,
  WalletWithBalanceResponse,
} from "@/hooks/kesy/useWallets";
import { CopyIcon, InfoIcon, Loader2, PlusIcon } from "lucide-react";
import AddWalletModal from "./add-wallet-modal";
import { useState } from "react";
import { useKYCStatus } from "@/hooks/kesy/useKYC";
import { toast } from "sonner";
import { hederaLogo } from "@/assets";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsAssociated } from "@/hooks/kesy/useTransactions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function WalletCard({ wallet }: { wallet: WalletWithBalanceResponse }) {
  const { data: isAssociated, isLoading } = useIsAssociated(wallet.walletId);

  return (
    <div className="flex flex-col gap-2 border border-foreground/20 rounded-3xl p-4 w-full md:w-1/2">
      <div className="flex items-center gap-2">
        <Image
          src={hederaLogo}
          alt="Hedera"
          width={20}
          height={20}
          className="rounded-full border border-foreground/20 h-8 w-8"
        />
        <p className="text-sm font-funnel-display text-muted-foreground">
          Hedera
        </p>
      </div>
      <div className="my-4">
        <div className="flex items-center justify-between border-b border-dashed pb-2 border-foreground/20 mb-2">
          <p className="text-sm font-funnel-display text-foreground/80">
            Balance
          </p>
          <p className="text-xs cursor-pointer flex items-center gap-2 font-semibold font-funnel-display">
            {wallet.balance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            KESY
          </p>
        </div>
        <div className="flex items-center justify-between border-b border-dashed pb-2 border-foreground/20 mb-2">
          <p className="text-sm font-funnel-display text-foreground/80">
            Address
          </p>
          <p
            onClick={() => {
              toast.success("Wallet address copied to clipboard");
              navigator.clipboard.writeText(wallet.address);
            }}
            className="text-xs cursor-pointer flex items-center gap-2 font-semibold font-funnel-display"
          >
            {wallet.address.slice(0, 5)}...{wallet.address.slice(-4)}
            <CopyIcon className="w-4 h-4" />
          </p>
        </div>
        <div className="flex items-center justify-between border-b border-dashed pb-2 border-foreground/20 mb-2">
          <p className="text-sm font-funnel-display text-foreground/80">
            Wallet ID
          </p>
          <p
            onClick={() => {
              toast.success("Wallet ID copied to clipboard");
              navigator.clipboard.writeText(wallet.walletId);
            }}
            className="text-xs cursor-pointer flex items-center gap-2 font-semibold font-funnel-display"
          >
            {wallet.walletId.slice(0, 5)}...{wallet.walletId.slice(-4)}
            <CopyIcon className="w-4 h-4" />
          </p>
        </div>
        <div className="flex items-center justify-between border-b border-dashed pb-2 border-foreground/20 mb-2">
          <p className="text-sm font-funnel-display text-foreground/80">
            Network
          </p>
          <p
            onClick={() => {
              toast.success("Wallet ID copied to clipboard");
              navigator.clipboard.writeText(wallet.walletId);
            }}
            className="text-xs cursor-pointer flex items-center gap-2 font-semibold font-funnel-display"
          >
            <Image
              src={hederaLogo}
              alt="Hedera"
              width={20}
              height={20}
              className="rounded-full border border-foreground/20 h-6 w-6"
            />
            Hedera
          </p>
        </div>
        <div className="flex items-center justify-between border-b border-dashed pb-2 border-foreground/20 mb-2">
          <p className="text-sm font-funnel-display text-foreground/80">
            Whitelisted
          </p>
          <p
            onClick={() => {
              toast.success("Wallet ID copied to clipboard");
              navigator.clipboard.writeText(wallet.walletId);
            }}
            className="text-xs cursor-pointer flex items-center gap-2 font-semibold font-funnel-display"
          >
            Yes
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-funnel-display text-foreground/80">
            Status
          </p>
          {isLoading ? (
            <Skeleton className="w-10 h-4" />
          ) : (
            <p className="text-xs cursor-pointer flex items-center gap-2 font-semibold font-funnel-display">
              {isAssociated ? "Associated" : "Not Associated"}
              <Popover>
                <PopoverTrigger>
                  <InfoIcon className="w-4 h-4" />
                </PopoverTrigger>
                <PopoverContent>
                  <p className="text-xs font-funnel-display text-muted-foreground">
                    {isAssociated
                      ? "Token associated you can use it to receive KESY."
                      : "Token not associated the transfer will fail. Please associate the token to your wallet."}
                  </p>
                  <a
                    href="/kesy/associate"
                    className="text-xs font-funnel-display text-blue-500"
                  >
                    Associate Wallet
                  </a>
                </PopoverContent>
              </Popover>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [isAddWalletModalOpen, setIsAddWalletModalOpen] = useState(false);
  const { data, isLoading, error } = useWalletsWithBalances();
  const [loading, setLoading] = useState(false);
  const { data: kycData } = useKYCStatus();

  const handleAddWallet = () => {
    setLoading(true);
    if (kycData?.status?.toLocaleLowerCase() !== "verified") {
      console.log(kycData);
      toast.error("Please complete your KYC verification first");
      setLoading(false);
      return;
    }
    setIsAddWalletModalOpen(true);
    setLoading(false);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-sm font-funnel-display text-muted-foreground">
          Error: {error.message}
        </p>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <SidebarProvider>
        <KESYSidebar />
        <SidebarInset>
          <SidebarTrigger className="px-2" />
          <h1 className="text-2xl font-funnel-display font-bold px-4">
            Wallets
          </h1>
          <p className="text-sm font-funnel-display mb-4 text-muted-foreground px-4">
            Add a wallet to receive KESY tokens once minted.
          </p>
          <div className="px-4">
            <div className="flex flex-col md:flex-row gap-4 flex-wrap">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-full h-24 my-2 rounded-3xl"
                />
              ))}
            </div>
          </div>
        </SidebarInset>
        {isAddWalletModalOpen && (
          <AddWalletModal closeModal={() => setIsAddWalletModalOpen(false)} />
        )}
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <KESYSidebar />
      <SidebarInset>
        <SidebarTrigger className="px-2" />
        <div className="flex items-center justify-between px-2">
          <div className="">
            <h1 className="text-2xl font-funnel-display font-bold px-4">
              Wallets
            </h1>
            <p className="text-xs md:text-sm font-funnel-display mb-4 text-muted-foreground px-4">
              Add a wallet to receive KESY tokens once minted.
            </p>
          </div>
          <div className="flex items-center justify-center my-6">
            <button
              onClick={handleAddWallet}
              className="rounded-3xl flex items-center gap-2 bg-background text-foreground font-funnel-display border border-foreground/20 px-8 py-1 text-sm pt-1"
            >
              <PlusIcon className="w-4 h-4" />
              <span className="hidden md:block">Add Wallet</span>
            </button>
          </div>
        </div>
        <div className="px-4">
          {data.length === 0 ? (
            <div className="flex flex-col gap-2 border border-foreground/20 rounded-3xl p-4 items-center">
              <NoWallet />
              <p className="text-sm font-funnel-display text-muted-foreground">
                No wallets found
              </p>
              <button
                onClick={handleAddWallet}
                className="rounded-3xl bg-background text-foreground font-funnel-display border border-foreground/20 px-8 py-1 text-sm pt-1"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Add Wallet"
                )}
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-4">
              {data.map((wallet) => (
                <WalletCard key={wallet.walletId} wallet={wallet} />
              ))}
            </div>
          )}
          {data.length > 0 && (
            <div className="flex items-center justify-center my-6">
              <button
                onClick={handleAddWallet}
                className="rounded-3xl bg-background text-foreground font-funnel-display border border-foreground/20 px-8 py-1 text-sm pt-1"
              >
                Add Wallet
              </button>
            </div>
          )}
        </div>
      </SidebarInset>
      {isAddWalletModalOpen && (
        <AddWalletModal closeModal={() => setIsAddWalletModalOpen(false)} />
      )}
    </SidebarProvider>
  );
}
