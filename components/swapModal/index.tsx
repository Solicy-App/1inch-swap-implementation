"use client";
import React, {useEffect, useState} from "react";
import styles from "./SwapModal.module.scss";
import {getTokens} from "@/utils/1inch/api";
import SwapSection from "@/components/swapModal/components/swapSection/ SwapSection";
import TokenList from "@/components/swapModal/components/tokenList";
import Wallets from "@/components/swapModal/components/wallets";

export interface Token {
    chainId: number;
    symbol: string;
    name: string;
    address: string;
    decimals: number;
    logoURI: string;
    provider: string;
    value: string;
}

const SwapModal = () => {
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [tokens, setTokens] = useState<Token[] | null>(null);
    const [fromToken, setFromToken] = useState<Token | null>(null);
    const [toToken, setToToken] = useState<Token | null>(null);
    const getTokensList = () => {
        setLoading(true);
        getTokens()
            .then((res) => {
                setTokens(res);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getTokensList();
    }, []);

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                {!activeTab ? (
                    <SwapSection setActiveTab={setActiveTab} fromToken={fromToken} toToken={toToken}/>
                ) : activeTab === 'from' || activeTab === 'to' ? (
                    <TokenList setActiveTab={setActiveTab} activeTab={activeTab} tokens={tokens} loading={loading}
                               setLoading={setLoading}
                               setFromToken={setFromToken} setToToken={setToToken} fromToken={fromToken}
                               toToken={toToken}/>
                ) : (
                    <Wallets setActiveTab={setActiveTab}/>
                )}
            </div>
        </div>
    );
};

export default SwapModal;
