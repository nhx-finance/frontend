"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown, ChevronDown, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  BRIDGE_NETWORKS,
  DEFAULT_CURRENCY,
  isSupportedRoute,
  type Currency,
  type Network,
} from "./constants";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import BridgeSettings from "./bridge-settings";
import AgenticBridging from "./agentic-bridging";
import { useActiveAccount } from "thirdweb/react";
import { toast } from "sonner";
import { useBalances, useBridge } from "@/hooks/kesy/useBridge";

function NetworkSelector({
  open,
  onOpenChange,
  onSelect,
  currentNetworkId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (network: Network) => void;
  currentNetworkId?: string;
}) {
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");

  const filtered = BRIDGE_NETWORKS.filter(
    (n) =>
      n.name.toLowerCase().includes(search.toLowerCase()) ||
      n.ticker.toLowerCase().includes(search.toLowerCase()),
  );

  const networkList = (
    <div className="flex flex-col gap-1">
      <div className="relative mb-2">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search networks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <div className="max-h-75 px-2 overflow-y-auto flex flex-col gap-1">
        {filtered.map((network) => (
          <button
            key={network.id}
            onClick={() => {
              onSelect(network);
              onOpenChange(false);
              setSearch("");
            }}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted/80 cursor-pointer ${
              currentNetworkId === network.id ? "bg-muted ring-primary/30" : ""
            }`}
          >
            <Image
              src={network.image}
              alt={network.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{network.name}</span>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No networks found
          </p>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Select Network</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6">{networkList}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Select Network</DialogTitle>
        </DialogHeader>
        {networkList}
      </DialogContent>
    </Dialog>
  );
}

function NetworkButton({
  network,
  onClick,
  placeholder,
}: {
  network?: Network;
  onClick: () => void;
  placeholder: string;
}) {
  if (!network) {
    return (
      <Button
        onClick={onClick}
        variant="default"
        size="sm"
        className="flex text-purple-500 items-center gap-1.5 rounded-full bg-gray-200 hover:bg-gray-200/90 px-3 py-1.5 text-sm font-medium cursor-pointer"
      >
        {placeholder}
        <ChevronDown className="size-4" />
      </Button>
    );
  }

  return (
    <Button
      onClick={onClick}
      variant="outline"
      size="sm"
      className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 cursor-pointer"
    >
      <Image
        src={network.image}
        alt={network.name}
        width={20}
        height={20}
        className="rounded-full"
      />
      <span className="text-sm font-medium">{network.name}</span>
      <ChevronDown className="size-3.5" />
    </Button>
  );
}

export default function BridgeCard() {
  const activeAccount = useActiveAccount();
  const { approveAllowance, bridgeToken } = useBridge();
  const balances = useBalances();

  const [fromNetwork, setFromNetwork] = useState<Network | undefined>(
    BRIDGE_NETWORKS[0],
  );
  const [toNetwork, setToNetwork] = useState<Network | undefined>();
  const [fromAmount, setFromAmount] = useState("");
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [selectorTarget, setSelectorTarget] = useState<"from" | "to">("from");
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  const [isApproving, setIsApproving] = useState(false);
  const [isBridging, setIsBridging] = useState(false);
  const [isAllowanceApproved, setIsAllowanceApproved] = useState(false);

  const toAmount = fromAmount;
  const routeSupported = isSupportedRoute(fromNetwork, toNetwork);

  const getBalanceForNetwork = (network?: Network) => {
    if (!network || !balances) return null;
    if (network.id === "hedera")
      return { amount: balances.kesy, ticker: "KESY" };
    return { amount: balances.wkesy, ticker: "wKESY" };
  };

  useEffect(() => {
    setIsAllowanceApproved(false);
  }, [fromNetwork?.id, toNetwork?.id, fromAmount, activeAccount?.address]);

  const formatValue = (amount: string) => {
    if (!amount || isNaN(Number(amount))) return `${currency.symbol} 0`;
    const value = Number(amount) / currency.multiplier;
    return `${currency.symbol} ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleSwap = () => {
    setFromNetwork(toNetwork);
    setToNetwork(fromNetwork);
  };

  const openSelector = (target: "from" | "to") => {
    setSelectorTarget(target);
    setSelectorOpen(true);
  };

  const handleSelect = (network: Network) => {
    if (selectorTarget === "from") {
      if (toNetwork?.id === network.id) setToNetwork(fromNetwork);
      setFromNetwork(network);
    } else {
      if (fromNetwork?.id === network.id) setFromNetwork(toNetwork);
      setToNetwork(network);
    }
  };

  const getDirection = () => {
    if (fromNetwork?.id === "hedera" && toNetwork?.id === "sepolia") {
      return "hederaToSepolia" as const;
    }

    if (fromNetwork?.id === "sepolia" && toNetwork?.id === "hedera") {
      return "sepoliaToHedera" as const;
    }

    return null;
  };

  const getButtonLabel = () => {
    if (!fromNetwork || !toNetwork) return "Select networks";
    if (!routeSupported) return "Only Hedera ↔ Sepolia supported for now";
    if (!activeAccount) return "Connect wallet";
    if (!fromAmount) return "Enter amount";
    if (Number(fromAmount) <= 0) return "Enter valid amount";
    if (isApproving) return "Approving...";
    if (isBridging) return "Bridging...";
    if (!isAllowanceApproved) return "Approve Allowance";
    return "Bridge";
  };

  const handleBridge = async () => {
    if (!activeAccount) {
      toast.error("Connect your wallet to bridge tokens");
      return;
    }

    if (!fromNetwork || !toNetwork) {
      toast.error("Select both source and destination networks");
      return;
    }

    if (!routeSupported) {
      toast.error("Only Hedera ↔ Sepolia routes are supported");
      return;
    }

    const amountValue = Number(fromAmount);
    if (!fromAmount || Number.isNaN(amountValue) || amountValue <= 0) {
      toast.error("Enter a valid amount greater than 0");
      return;
    }

    const direction = getDirection();
    if (!direction) {
      toast.error("Unsupported bridge direction");
      return;
    }

    try {
      if (!isAllowanceApproved) {
        setIsApproving(true);
        const approval = await approveAllowance(
          fromAmount,
          direction,
          activeAccount,
        );
        setIsAllowanceApproved(true);
        toast.success(`Allowance approved: ${approval.txHash.slice(0, 10)}...`);
        return;
      }

      setIsBridging(true);
      const result = await bridgeToken(
        {
          direction,
          amount: fromAmount,
        },
        activeAccount,
      );
      toast.success(`Bridge submitted: ${result.txHash.slice(0, 10)}...`, {
        action: {
          label: "View",
          onClick: () =>
            window.open(
              result.ccipExplorerUrl,
              "_blank",
              "noopener,noreferrer",
            ),
        },
      });
      setFromAmount("");
      setIsAllowanceApproved(false);
    } catch (error) {
      toast.error(
        (error as Error).message || "Failed to process bridge action",
      );
    } finally {
      setIsApproving(false);
      setIsBridging(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-120 rounded-4xl border border-border/40 bg-background/80 backdrop-blur-md p-4">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-sm font-medium">Bridge</span>
          <BridgeSettings currency={currency} onCurrencyChange={setCurrency} />
        </div>

        <div className="rounded-3xl cursor-pointer border border-background py-6 bg-background p-4">
          <label className="text-xs text-muted-foreground mb-1 block">
            From
          </label>
          <div className="flex items-center justify-between gap-2">
            <input
              type="number"
              placeholder="0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="w-full bg-transparent text-4xl font-medium outline-none placeholder:text-muted-foreground/60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <NetworkButton
              network={fromNetwork}
              onClick={() => openSelector("from")}
              placeholder="Select network"
            />
          </div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-muted-foreground">
              {formatValue(fromAmount)}
            </p>
            {getBalanceForNetwork(fromNetwork) && (
              <p className="text-xs text-muted-foreground">
                Balance: {getBalanceForNetwork(fromNetwork)!.amount}{" "}
                {getBalanceForNetwork(fromNetwork)!.ticker}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center -my-4.5 relative z-10">
          <button
            onClick={handleSwap}
            className="rounded-xl border-5 border-background bg-muted-foreground/5 p-1.5 cursor-pointer"
          >
            <ArrowDown className="size-5" />
          </button>
        </div>

        <div className="rounded-3xl py-6 bg-muted-foreground/5 p-4">
          <label className="text-xs text-muted-foreground mb-1 block">To</label>
          <div className="flex items-center justify-between gap-2">
            <input
              type="number"
              placeholder="0"
              value={toAmount}
              readOnly
              className="w-full bg-transparent text-4xl font-medium outline-none placeholder:text-muted-foreground/60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <NetworkButton
              network={toNetwork}
              onClick={() => openSelector("to")}
              placeholder="Select network"
            />
          </div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-muted-foreground">
              {formatValue(toAmount)}
            </p>
            {getBalanceForNetwork(toNetwork) && (
              <p className="text-xs text-muted-foreground">
                Balance: {getBalanceForNetwork(toNetwork)!.amount}{" "}
                {getBalanceForNetwork(toNetwork)!.ticker}
              </p>
            )}
          </div>
        </div>

        <Button
          disabled={
            !fromNetwork ||
            !toNetwork ||
            !routeSupported ||
            !fromAmount ||
            Number(fromAmount) <= 0 ||
            !activeAccount ||
            isApproving ||
            isBridging
          }
          onClick={handleBridge}
          className="w-full mt-4 bg-purple-500 hover:bg-purple-500/80 text-white rounded-xl h-12 text-base font-semibold disabled:opacity-60"
        >
          {getButtonLabel()}
        </Button>

        <p className="text-[10px] text-muted-foreground text-center mt-2">OR</p>

        <AgenticBridging />

        <p className="text-xs text-muted-foreground text-center mt-3">
          Bridge your KESY tokens across{" "}
          <span className="text-primary font-medium">
            {BRIDGE_NETWORKS.length}+
          </span>{" "}
          supported networks with zero app fees.
        </p>
      </div>

      <NetworkSelector
        open={selectorOpen}
        onOpenChange={setSelectorOpen}
        onSelect={handleSelect}
        currentNetworkId={
          selectorTarget === "from" ? fromNetwork?.id : toNetwork?.id
        }
      />
    </>
  );
}
