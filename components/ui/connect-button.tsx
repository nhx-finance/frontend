"use client";
import { client, hederaTestnet } from "@/lib/client";
import { AccountAddress, ConnectButton, useWalletImage } from "thirdweb/react";
import { useTheme } from "@/contexts/theme-context";
import { nhxmmf } from "@/assets";
import { shortenAddress } from "thirdweb/utils";
import { useActiveWallet } from "thirdweb/react";
import { Button } from "./button";

import Image from "next/image";

function CustomConnectButton() {
  const { theme } = useTheme();
  const wallet = useActiveWallet();
  const walletImage = useWalletImage(wallet?.id);

  return (
    <ConnectButton
      client={client}
      chain={hederaTestnet}
      connectButton={{
        label: "Connect",
        className: "rounded-full",
        style: {
          backgroundColor:
            theme === "dark" ? "var(--background)" : "var(--foreground)",
          color: theme === "dark" ? "var(--foreground)" : "var(--background)",
          borderRadius: "9999px",
          height: "34px",
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: "var(--font-funnel-display)",
        },
      }}
      connectModal={{
        title: "Connect your wallet",
        titleIcon: nhxmmf,
        size: "compact",
      }}
      detailsButton={{
        render: () => (
          <Button
            variant="ghost"
            className="flex items-center gap-2 border border-foreground/20 rounded-full py-1 px-2 cursor-pointer"
          >
            <Image
              src={walletImage?.data || ""}
              alt="wallet image"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <AccountAddress
              formatFn={shortenAddress}
              className="text-xs font-funnel-display font-semibold"
            />
          </Button>
        ),
      }}
    />
  );
}

export default CustomConnectButton;
