"use client";
import "./globals.scss";
import { inter } from "@/app/ui/fonts";
import styles from "@/app/page.module.scss";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import SwapTokenAppWrapper from "@/app/ui/components/organisms/SwapTokenAppWrapper";

const getLibrary = (provider: any) => {
  return new Web3Provider(provider);
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <SwapTokenAppWrapper>
            <main className={styles.main}>{children}</main>
          </SwapTokenAppWrapper>
        </Web3ReactProvider>
      </body>
    </html>
  );
}
