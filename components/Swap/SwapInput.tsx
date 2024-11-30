"use client";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import TokenList from "../Shared/TokenList";
import { EthSwapToken } from "@/utils/helpers";
import debounce from "debounce";
import { useAppKitNetwork } from "@reown/appkit/react";

interface Props {
  selectedToken: EthSwapToken;
  setSelectedToken: (token: EthSwapToken) => void;
  amount: string;
  onAmountChange?: (amount: string) => void;
  tokens?: EthSwapToken[];
  operation: "pay" | "receive";
}
const SwapInput = ({
  selectedToken,
  setSelectedToken,
  amount,
  onAmountChange,
  tokens,
  operation,
}: Props) => {
  const [isTokenListVisible, setIsTokenListVisible] = useState(false);
  const [inputAmount, setInputAmount] = useState(amount);

  const { caipNetwork } = useAppKitNetwork();

  const isPaying = operation === "pay";

  const toggleTokenList = () => {
    setIsTokenListVisible((prev) => !prev);
  };

  const onSelectToken = (token: EthSwapToken) => {
    setSelectedToken(token);
    setIsTokenListVisible(false);
  };

  const debouncedAmountChange = useCallback(
    debounce((value: string) => {
      if (onAmountChange) {
        onAmountChange(value === "" ? "0" : value);
      }
    }, 1500),
    [onAmountChange],
  );

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Numeric values only
    if (/^\d*\.?\d*$/.test(value)) {
      setInputAmount(value);
      debouncedAmountChange(value);
    }
  };

  useEffect(() => {
    setInputAmount(amount);
  }, [amount]);

  if (!selectedToken || !tokens || tokens.length === 0) {
    return <div className="text-red-500">Token data is unavailable.</div>;
  }

  return (
    <div
      className={`flex items-center justify-between rounded-2xl px-4 py-3 ${isPaying ? "bg-foreground" : "border bg-white"}`}
    >
      <TokenList
        tokens={tokens}
        isTokenListVisible={isTokenListVisible}
        onClose={toggleTokenList}
        onSelect={onSelectToken}
      />
      <div className="flex w-full flex-col space-y-2">
        <p className="text-xs text-slate-500">You {operation}</p>
        <div className="flex items-center justify-between">
          <div
            onClick={toggleTokenList}
            className={`-ml-2 flex cursor-pointer items-center space-x-2 rounded-2xl p-2 ${isPaying ? "hover:bg-white/50" : "hover:bg-foreground/80"}`}
          >
            <Image
              src={selectedToken.logoURI ? selectedToken.logoURI : ""}
              alt={selectedToken.symbol || "Token logo"}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
            />
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="text-gray-800">{selectedToken.symbol}</span>
                <ChevronRight
                  width={18}
                  height={18}
                  className="text-gray-500"
                />
              </div>

              <span className="text-nowrap text-xs text-slate-500">
                on {caipNetwork?.name}
              </span>
            </div>
          </div>
          <input
            type="text"
            value={inputAmount}
            onChange={handleAmountChange}
            className="min-w-20 border-none bg-transparent text-right text-2xl text-gray-800 outline-none"
            disabled={!isPaying}
            maxLength={16}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="self-end text-xs text-gray-500">{selectedToken.name}</p>
          <p className="self-end text-xs text-gray-500">$0</p>
        </div>
      </div>
    </div>
  );
};

export default SwapInput;
