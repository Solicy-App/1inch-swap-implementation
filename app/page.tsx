'use client'
import React, {useContext} from "react";
import Image from "next/image";
import styles from "./page.module.css";
import ConnectWallet from "@/app/ui/connectWallet/connectWallet";
import Header from "@/app/ui/header";
import {createContext, Suspense, useEffect, useState} from "react";
import SwapContainer from "@/app/ui/swapContainer/swapContainer";
import { ChainId, ROUTER_ADDRESSES_1INCH } from "@/utils/constants";

export type TokenDataType = {
    address: string;
    name: string;
    logoURI: string;
    symbol: string;
}

type SetterType<T> =  React.Dispatch<React.SetStateAction<T>>;

export type AppContextType = {
    selectedData: boolean;
    setSelectedData: SetterType<boolean>;
    selectedToken?: ChainId;
    setSelectedToken: SetterType<ChainId | undefined>;
    tokenData?: TokenDataType[];
    setTokenData: SetterType<TokenDataType[] | undefined>;
}

// @ts-ignore
export const AppContext = createContext<AppContextType>();

export default function Home() {
    const [selectedData, setSelectedData] = useState(false);
    const [selectedToken, setSelectedToken] = useState<ChainId>();
    const [tokenData, setTokenData] = useState<TokenDataType[]>();

    return (
        <AppContext.Provider value={{
            selectedData,
            setSelectedData,
            selectedToken,
            setSelectedToken,
            tokenData,
            setTokenData,
        }}>
            <main className={styles.main}>
                <Header/>
                <SwapContainer/>
                {selectedData && <ConnectWallet/>}
            </main>
        </AppContext.Provider>
    );
}
