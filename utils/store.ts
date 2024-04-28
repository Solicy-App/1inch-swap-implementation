import { create } from "zustand";

import { I1InchToken } from "@/utils/helpers";

interface I1InchStoreParams {
  tokens: Record<string, I1InchToken>;
  fromTokenAddress: string | null;
  toTokenAddress: string | null;
  fromTokenPrice: string | null;
  toTokenPrice: string | null;
  fromTokenQty: number;
  toTokenQty: number;
  setFromTokenAddress: (value: I1InchToken["address"] | null) => void;
  setToTokenAddress: (value: I1InchToken["address"] | null) => void;
  setFromTokenPrice: (value: string | null) => void;
  setToTokenPrice: (value: string | null) => void;
  setFromTokenQty: (value: number) => void;
  setToTokenQty: (value: number) => void;
  setTokens: (value: I1InchStoreParams["tokens"]) => void;
}

const useStore = create<I1InchStoreParams>((set) => ({
  selectedValue: null,
  fromTokenAddress: null,
  toTokenAddress: null,
  fromTokenPrice: null,
  toTokenPrice: null,
  fromTokenQty: 0,
  toTokenQty: 0,
  tokens: {},
  setFromTokenAddress: (address) => set({ fromTokenAddress: address }),
  setToTokenAddress: (address) => set({ toTokenAddress: address }),
  setFromTokenPrice: (price) => set({ fromTokenPrice: price }),
  setToTokenPrice: (price) => set({ toTokenPrice: price }),
  setFromTokenQty: (qty) => set({ fromTokenQty: qty }),
  setToTokenQty: (qty) => set({ toTokenQty: qty }),
  setTokens: (tokens: Record<string, I1InchToken>) => set({ tokens }),
}));

export default useStore;
