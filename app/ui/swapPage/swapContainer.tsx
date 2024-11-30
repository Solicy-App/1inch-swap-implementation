'use client'

import React, {useContext, useState, useEffect} from "react";
import {Button} from "@/app/ui/button";
import SwapToken from "@/app/ui/swapPage/swapToken";
import {useWeb3ModalAccount} from '@web3modal/ethers/react'
import ConnectButton from "@/app/ui/w3buttons";
import {AppContext, TokenDataType} from "@/app/ui/swapPage/index";
import {getQuote, getTokens} from "@/utils/1inch/api";
import VirtualizedList from "@/app/ui/virtualList";
import {useSwap1Inch} from "@/hooks/one-inch";

export default function SwapContainer() {
    const {tokenData, setTokenData} = useContext(AppContext);
    const [fromToken, setFromToken] = useState<TokenDataType>();
    const [toToken, setToToken] = useState<TokenDataType>();
    const [amountFrom, setAmountFrom] = useState('');
    const [amountTo, setAmountTo] = useState('');
    const [showListFor, setShowListFor] = useState('pay');
    let swap1Inch = () => {
    };
    const [showList, setShowList] = useState(false);
    const {address, chainId, isConnected} = useWeb3ModalAccount()
    
    const data = useSwap1Inch({
        from: fromToken?.address,
        to: toToken?.address,
        chainId,
        typedValue: amountFrom,
        account: address
    })
    
    if (data?.swap1Inch) {
        swap1Inch = data.swap1Inch;
    }
    
    const showListHandle = async (state) => {
        setShowList(true);
        setShowListFor(state);
    }
    
    const handleListClick = (token) => {
        showListFor === 'pay' ? setFromToken(token) : setToToken(token);
        setShowList(false);
    }
    
    useEffect(() => {
        setShowList(false);
    }, [tokenData]);
    
    useEffect(() => {
        (async () => {
            if (!chainId) {
                return;
            }
            const tokens = await getTokens(chainId) as TokenDataType[];
            setFromToken(tokens[0]);
            setToToken(null);
            setAmountTo('');
            setAmountFrom('');
            setTokenData(tokens);
        })()
        
    }, [chainId, setTokenData]);
    
    useEffect(() => {
        if (fromToken?.address && toToken?.address && amountFrom) {
            (async () => {
                
                const dataQuote = await getQuote({
                    chainId,
                    fromTokenAddress: fromToken.address,
                    toTokenAddress: toToken.address,
                    amount: amountFrom,
                    wallet: address,
                    decimals: fromToken.decimals,
                    decimalsTo: toToken.decimals
                });
                
                const convertion = dataQuote.data;
                setAmountTo(convertion);
            })()
        }
    }, [fromToken, toToken, amountFrom])
    
    
    return (
        <div
            className="fixed top-1/2 left-1/2 bg-white p-4 -translate-x-1/2 -translate-y-1/2 rounded-3xl shadow-lg shadow-gray-200">
            <h3 className="text-center text-base mb-2">Swap</h3>
            <SwapToken state="pay" token={fromToken} onClick={showListHandle} onInputChange={setAmountFrom}
                       amount={amountFrom}/>
            <br/>
            <SwapToken state="receive" token={toToken} onClick={showListHandle} onInputChange={setAmountTo}
                       amount={amountTo}/>
            {isConnected ? <Button disabled={!(fromToken && toToken && amountFrom)}
                                   className="h-10 justify-center bg-blue-btnLight text-blue-txtLight py-1.5 px-2 mt-2 w-full"
                                   onClick={swap1Inch}>Swap</Button> : <ConnectButton isInHeader={false}/>}
            {tokenData && showList ? (
                <VirtualizedList data={tokenData} listItemClick={handleListClick} onClose={() => setShowList(false)}/>
            ) : null}
        </div>
    );
}