"use client";
import { useState } from "react";
import { WagmiProvider as WagmiP } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { wagmiConfig } from "../utils/wagmi-config";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiP config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiP>
  );
};
