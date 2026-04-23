import type { Metadata } from "next";
import "./globals.css";
import WalletProvider from "./components/WalletProvider";

export const metadata: Metadata = {
  title: "SOL Random Number Generator",
  description: "Pay 0.1 SOL to generate a random number",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
