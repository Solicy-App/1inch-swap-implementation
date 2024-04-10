'use client'
import React from "react";
import Header from "@/app/ui/header";
import {createContext, useEffect, useState} from "react";
import SwapContainer from "@/app/ui/swapPage/swapContainer";
import { ChainId } from "@/utils/constants";

export type TokenDataType = {
    address: string;
    name: string;
    logoURI: string;
    symbol: string;
    decimals?: number
}

type SetterType<T> =  React.Dispatch<React.SetStateAction<T>>;

export type AppContextType = {
    selectedChain: ChainId;
    setSelectedChain: SetterType<ChainId | undefined>;
    tokenData: TokenDataType[];
    setTokenData: SetterType<TokenDataType[] | undefined>;
}

export type SwapPageProps = {
    initialChainId: ChainId,
    initialTokenData: TokenDataType[]
}

export const AppContext = createContext<AppContextType>({} as any);

export default function SwapPage({initialChainId, initialTokenData}: SwapPageProps) {
    const [selectedChain, setSelectedChain] = useState<ChainId>(initialChainId);
    const [tokenData, setTokenData] = useState<TokenDataType[]>(initialTokenData);
    
    useEffect(() => {
        (async () => {
            setTokenData(initialTokenData);
            setSelectedChain(initialChainId);
        })()

    },[]);
    
    return (
        <AppContext.Provider value={{
            selectedChain,
            setSelectedChain,
            tokenData,
            setTokenData,
        }}>
            <Header/>
            <SwapContainer/>
         </AppContext.Provider>
    );
}
