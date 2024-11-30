"use client";
import React from "react";
import Navigation from "./Navigation";
import Image from "next/image";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
} from "@reown/appkit/react";

const Header = () => {
  const { open } = useAppKit();
  const { isConnected } = useAppKitAccount();
  const { caipNetwork } = useAppKitNetwork();

  return (
    <header className="w-full">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Image
              src="https://cdn.1inch.io/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="text-2xl font-semibold">1inch</span>
          </div>
          <Navigation />
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => open()}
            className="flex items-center space-x-1 rounded-full bg-blue-100 px-3 py-2 text-sm text-blue-700"
          >
            <i className="fas fa-gem"></i>
            <span>{caipNetwork?.name}</span>
          </button>
          {isConnected ? (
            <appkit-account-button balance="hide" />
          ) : (
            <appkit-connect-button />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
