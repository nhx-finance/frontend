import type { Metadata } from "next";
import { MedievalSharp, Funnel_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";

const medievalSharp = MedievalSharp({
  variable: "--font-medieval-sharp",
  subsets: ["latin"],
  weight: ["400"],
});

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "NHX",
  description: "Africa's Inclusive Finance Bridge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${medievalSharp.variable} ${funnelDisplay.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
