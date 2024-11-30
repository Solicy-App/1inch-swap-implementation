"use client";
import { EthSwapToken } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import SwapInput from "./SwapInput";
import { useAppKitAccount } from "@reown/appkit/react";
import { useSwap1Inch } from "@/hooks/one-inch";
import { ChainId } from "@/utils/constants";
import { getQuote } from "@/utils/1inch/api";

const EMPTY_TOKEN: EthSwapToken = {
  logoURI: "",
  name: "",
  symbol: "",
  address: "eip155:${string}:${string}",
  decimals: 0,
  logoUri: "",
};

interface Props {
  tokens?: EthSwapToken[];
}
const SwapInputs = ({ tokens }: Props) => {
  const { address, status, isConnected } = useAppKitAccount();
  const [swapData, setSwapData] = useState({
    from: tokens ? tokens[0] : EMPTY_TOKEN,
    to: tokens ? tokens[1] : EMPTY_TOKEN,
    account: address || "",
    amountFrom: "0",
    amountTo: "0",
  });

  const data = useSwap1Inch(swapData);
  const swap1Inch = data?.swap1Inch;

  const onAmountChange = (amount: string) => {
    setSwapData((prevState) => ({ ...prevState, amountFrom: amount }));
  };

  const onSwap = async () => {
    try {
      await swap1Inch?.();
    } catch (error) {
      console.error("Swap failed:", error);
    }
  };

  const getConvertion = async () => {
    const { from, to, amountFrom } = swapData;

    if (from.address && to.address && amountFrom) {
      try {
        const response = await getQuote({
          chainId: ChainId.ETHEREUM,
          fromTokenAddress: from.address,
          toTokenAddress: to.address,
          amount: amountFrom,
          wallet: address,
          decimals: from.decimals,
          decimalsTo: to.decimals,
        });
        if (response) {
          const amountTo = response.data;
          setSwapData((prevState) => ({ ...prevState, amountTo }));
        } else {
          setSwapData((prevState) => ({ ...prevState, amountTo: "0" }));
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    }
  };

  useEffect(() => {
    setSwapData({ ...swapData, account: address || "" });
  }, [status]);

  useEffect(() => {
    getConvertion();
  }, [
    swapData.from.address,
    swapData.to.address,
    swapData.amountFrom,
    swapData.amountTo,
  ]);

  if (!tokens || tokens.length < 2) {
    return <span>No tokens available for swapping.</span>;
  }

  return (
    <div className="mt-4 space-y-1">
      <SwapInput
        selectedToken={swapData.from}
        setSelectedToken={(token) => setSwapData({ ...swapData, from: token })}
        amount={swapData.amountFrom}
        onAmountChange={onAmountChange}
        tokens={tokens}
        operation="pay"
      />
      <SwapInput
        selectedToken={swapData.to}
        setSelectedToken={(token) => setSwapData({ ...swapData, to: token })}
        amount={swapData.amountTo}
        tokens={tokens}
        operation="receive"
      />

      <div className="!mt-4 flex justify-center">
        {isConnected ? (
          <button
            onClick={onSwap}
            className="flex w-full items-center justify-center space-x-1 rounded-full bg-blue-100 px-3 py-2 text-center text-sm text-blue-700"
          >
            Swap
          </button>
        ) : (
          <appkit-connect-button />
        )}
      </div>
    </div>
  );
};

export default SwapInputs;
