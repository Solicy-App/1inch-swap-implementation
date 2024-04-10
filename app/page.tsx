'use client'

import styles from "./page.module.css";
import {useEffect, useState} from "react";
import SwapPage, {TokenDataType} from "@/app/ui/swapPage";
import {getTokens} from "@/utils/1inch/api";

export default function Home() {
    const [tokenData, setTokenData] = useState<TokenDataType[]>();
    
    useEffect(() => {
        (async () => {
            const tokens = await getTokens(1) as TokenDataType[];
            setTokenData(tokens);
        })()
        
    }, []);
    
    return (
        <main className={styles.main}>
            {tokenData && <SwapPage initialTokenData={tokenData} initialChainId={1}/>}
        </main>
    );
}
