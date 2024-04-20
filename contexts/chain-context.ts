"use client";

import { createContext } from "react";

export type ChainContextType = {
	chain: number;
	setChain: (chain: number) => void;
};

export const ChainContext = createContext<ChainContextType>({
	chain: 1,
	setChain: () => {},
});
