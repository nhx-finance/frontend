"use client";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import NoWallet from "./no-wallet";
import { KESYSidebar } from "@/components/kesy-sidebar";
import { useWallets, WalletResponse } from "@/hooks/kesy/useWallets";
import { CopyIcon, Loader2 } from "lucide-react";
import AddWalletModal from "./add-wallet-modal";
import { useState } from "react";
import { useKYCStatus } from "@/hooks/kesy/useKYC";
import { toast } from "sonner";
import { hederaLogo, kesy } from "@/assets";
import Image from "next/image";

function WalletCard({ wallet }: { wallet: WalletResponse }) {
  return (
    <div className="flex flex-col gap-2 border border-foreground/20 rounded-3xl p-4">
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
        <p
          onClick={() => {
            toast.success("Wallet address copied to clipboard");
            navigator.clipboard.writeText(wallet.address);
          }}
          className="text-sm cursor-pointer flex items-center gap-2 font-semibold font-funnel-display text-muted-foreground"
        >
          {wallet.address.slice(0, 14)}...{wallet.address.slice(-4)}
          <CopyIcon className="w-4 h-4" />
        </p>
      </div>
    </div>
  );
}

export default function Page() {
  const [isAddWalletModalOpen, setIsAddWalletModalOpen] = useState(false);
  const { data, isLoading, error } = useWallets();
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen px-4">
        <Loader2 className="w-6 h-6 animate-spin text-foreground" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen px-4">
        <p className="text-sm font-funnel-display text-muted-foreground">
          No wallets found
        </p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <KESYSidebar />
      <SidebarInset>
        <SidebarTrigger className="px-2" />
        <h1 className="text-2xl font-funnel-display font-bold px-4">Wallets</h1>
        <p className="text-sm font-funnel-display mb-4 text-muted-foreground px-4">
          Add a wallet to receive KESY tokens once minted.
        </p>
        <div className="px-4">
          {data.wallets.length === 0 ? (
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
            <div className="flex flex-col md:flex-row gap-4 flex-wrap">
              {data.wallets.map((wallet) => (
                <WalletCard key={wallet.walletId} wallet={wallet} />
              ))}
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
