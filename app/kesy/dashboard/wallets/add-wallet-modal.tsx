import { Button } from "@/components/ui/button";
import { Loader2, Plus, X } from "lucide-react";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { hederaLogo } from "@/assets";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAddWallet } from "@/hooks/kesy/useWallets";
import { useKYCStatus } from "@/hooks/kesy/useKYC";

interface AddWalletModalProps {
  closeModal: () => void;
}

function AddWalletModal({ closeModal }: AddWalletModalProps) {
  const [network, setNetwork] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const { mutate: addWalletMutation, isPending } = useAddWallet();

  const handleAddWallet = () => {
    if (network === "" || walletAddress === "") {
      toast.error("Please fill in all fields");
      return;
    }
    if (!walletAddress.startsWith("0x")) {
      toast.error("Wallet address is not valid");
      return;
    }

    addWalletMutation({ network, walletAddress });
  };
  return (
    <div className="fixed inset-0 px-2 w-screen z-50 bg-black/50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-background rounded-3xl p-4 w-full max-w-2xl border border-foreground/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-funnel-display font-bold">
              Add Wallet
            </h1>
            <p className="text-sm font-funnel-display text-muted-foreground">
              Enter wallet details below.
            </p>
          </div>

          <Button
            variant="outline"
            className="rounded-full border border-foreground/20 text-sm shadow-none"
            onClick={closeModal}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="mt-4">
          <div>
            <Label
              htmlFor="network"
              className="text-sm text-foreground/80 font-funnel-display"
            >
              Network
            </Label>
            <Select value={network} onValueChange={setNetwork}>
              <SelectTrigger className="w-full md:w-1/2 mt-2 shadow-none rounded-3xl">
                <SelectValue placeholder="Select Network" className="" />
              </SelectTrigger>
              <SelectContent className="rounded-3xl">
                <SelectItem
                  value="hedera"
                  className="text-sm rounded-3xl font-funnel-display flex items-center gap-2"
                >
                  <Image
                    src={hederaLogo}
                    alt="Hedera"
                    width={20}
                    height={20}
                    className="rounded-full border border-foreground/20"
                  />
                  Hedera
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4">
            <Label
              htmlFor="wallet-address"
              className="text-sm font-funnel-display"
            >
              Wallet Address
            </Label>
            <Input
              id="wallet-address"
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="Wallet Address"
              className="w-full md:w-1/2 mt-2 font-funnel-display shadow-none rounded-3xl"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            disabled={isPending}
            className="rounded-3xl bg-background text-sm text-foreground font-funnel-display border border-foreground/20 px-8 py-1 hover:bg-foreground/10 pt-1"
            onClick={handleAddWallet}
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                {" "}
                <Plus className="w-4 h-4" /> Add Wallet
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddWalletModal;
