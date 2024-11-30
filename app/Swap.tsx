'use client'

import { useState } from "react";
import SwapInput from "./SwapInput";

const tokens = ['ETH', 'BTC', 'DAI'];

export default function MyComponent () {
  const [amount, setAmount] = useState(0);
  const [token, setToken] = useState(tokens[0]);

  const handleAmountChange = (newAmount: number) => setAmount(newAmount);
  const handleTokenChange = (newToken: string) => setToken(newToken);

  return (
    <div>
      <SwapInput
        amount={amount}
        onAmountChange={handleAmountChange}
        token={token}
        onTokenChange={handleTokenChange}
        tokens={tokens}
      />
    </div>
  );
};

