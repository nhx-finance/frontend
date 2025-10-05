"use client";
import { client } from "@/lib/client";
import { ConnectButton } from "thirdweb/react";
import { sepolia } from "thirdweb/chains";
import { useTheme } from "@/contexts/theme-context";
import { nhxmmf } from "@/assets";

function CustomConnectButton() {
  const { theme } = useTheme();
  return (
    <ConnectButton
      client={client}
      chains={[sepolia]}
      connectButton={{
        label: "Connect",
        className: "rounded-full",
        style: {
          backgroundColor:
            theme === "dark" ? "var(--background)" : "var(--foreground)",
          color: theme === "dark" ? "var(--foreground)" : "var(--background)",
          borderRadius: "9999px",
          padding: "8px 10px",
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
    />
  );
}

export default CustomConnectButton;
