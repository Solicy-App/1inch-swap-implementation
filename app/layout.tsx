import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanstackProvider from "@/components/providers/tanstack-provider";
import WagmiWrapProvider from "@/components/providers/wagmi-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "1inch clone",
  description: "1Inch clone App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiWrapProvider>
          <TanstackProvider>{children}</TanstackProvider>
        </WagmiWrapProvider>
      </body>
    </html>
  );
}
