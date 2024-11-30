import React from "react";
import { getTokens } from "@/utils/1inch/api";
import { ChainId } from "@/utils/constants";
import SwapInputs from "./SwapInputs";

const getAvailableTokens = async () => {
  const tokens = await getTokens(ChainId.ETHEREUM);
  return tokens;
};

const Swap = async () => {
  const tokens = await getAvailableTokens();
  return (
    <div className="w-[500px] rounded-3xl bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between pb-2">
        <div className="flex space-x-4 text-sm font-semibold">
          <button className="text-black">Swap</button>
          <button className="text-gray-500">Limit</button>
        </div>
      </div>
      <SwapInputs tokens={tokens} />
    </div>
  );
};

export default Swap;
