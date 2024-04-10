"use client";

import {buildTxForSwap1Inch, getAllowance} from "@/utils/1inch/api";
import {calculateGasMargin} from "@/utils/calculateGasMargin";
import {ROUTER_ADDRESSES_1INCH} from "@/utils/constants";
import {generate1InchSwapParmas, getSigner} from "@/utils/helpers";
import isZero from "@/utils/isZero";
import {BigNumber} from "@ethersproject/bignumber";
import {useWeb3ModalProvider} from '@web3modal/ethers/react'
import {BrowserProvider} from "ethers";


export const useSwap1Inch = ({from, to, chainId, typedValue, account}) => {
    const {walletProvider} = useWeb3ModalProvider();

    if (!walletProvider) return;

    const library = new BrowserProvider(walletProvider);
    const router1Inch = ROUTER_ADDRESSES_1INCH[chainId];

    if (!account) return;
    
    const swap1Inch = async () => {
        
        const swapParams = generate1InchSwapParmas(
            from,
            to,
            Number(typedValue),
            account,
            1
        );
        const {allowance} = await getAllowance({
            chainId,
            tokenAddress: from,
            walletAddress: account
        });
        
        if (!allowance || allowance === '0') return;
        // If allowance is less than requested amount then don't process(@TODO include also gas calculation)
        if (BigNumber.from(allowance).lt(swapParams.amount)) return;
        
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const swapTransaction = await buildTxForSwap1Inch(swapParams, chainId);
        
        // TO DO: Remove when change DEV plan for 1Inch (1 Request per second)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        try {
            const tx = {
                from: account ?? "",
                to: router1Inch,
                data: swapTransaction.data,
                ...(swapTransaction.value && !isZero(swapTransaction.value)
                    ? {value: swapTransaction.value.toString(16)} // Convert to Hex.If not working use toHex() from @uniswap/v3-sdk
                    : {}),
            };
            const response = await getSigner(library, account)
                .estimateGas(tx)
                .then((estimate: BigNumber) => {
                    const newTxn = {
                        ...tx,
                        gasLimit: calculateGasMargin(estimate),
                    };
                    
                    return getSigner(library, account)
                        .sendTransaction(newTxn)
                        .then((response: { hash: any }) => {
                            if (!response.hash) {
                                throw new Error(
                                    `Your swap was modified through your wallet. If this was a mistake, please cancel immediately or risk losing your funds.`
                                );
                            }
                            return response;
                        });
                });
            
            return response;
        } catch (err) {
            console.error(err);
            return;
        }
    }
    
    return {swap1Inch};
};
