'use server'

import {fromWei, I1InchSwapParams, toWei} from "../helpers";
import axios1Inch from "./axiosInstance";
import {ChainId} from "@/utils/constants";
import {TokenDataType} from "@/app/ui/swapPage";

const oneInchBaseUrl = process.env.REACT_APP_1INCH_BASE_URL || "";

const create1InchProxyUrl = (url: string) =>
    `?url=${oneInchBaseUrl}${url}`;
const broadcastApiUrl1Inch = (chainId: string | number) =>
    create1InchProxyUrl(`/tx-gateway/v1.1/${chainId}/broadcast`);
const apiBaseUrl1Inch = (chainId: string | number) =>
    create1InchProxyUrl(`/swap/v5.2/${chainId}`);

function apiRequestUrl(path: string, queryParams: any) {
    return path + "?" + new URLSearchParams(queryParams).toString();
}

export async function buildTxForSwap1Inch(
    swapParams: I1InchSwapParams,
    chainId: string | number
) {
    const url = apiRequestUrl(
        create1InchProxyUrl(`swap/v6.0/${chainId}/swap`),
        swapParams
    );
    try {
        const response = await axios1Inch.get(url);
        
        return response.data.tx;
    } catch (err) {
        console.log(err);
    }
}

export async function getQuote(config) {
    const {chainId, fromTokenAddress, toTokenAddress, amount, wallet, decimals, decimalsTo} = config
    if (!chainId) {
        throw new Error('chainId is required')
    }
    if (!fromTokenAddress) {
        throw new Error('fromTokenAddrss is required')
    }
    if (!toTokenAddress) {
        throw new Error('toTokenAddress is required')
    }
    if (!amount) {
        throw new Error('amount is required')
    }
    try {
        
        const calculatedAmount = toWei(amount, decimals);
        
        const url = apiRequestUrl(`/swap/v6.0/${chainId}/quote`, {
            src: fromTokenAddress,
            dst: toTokenAddress,
            amount: calculatedAmount
        })
        
        const {data} = await axios1Inch.get(url)
        
        return {data: (fromWei(data.dstAmount, decimalsTo)).toFixed(4)};
    } catch (e) {
        console.log(e);
    }
}

export async function getAllowance(config) {
    const {chainId, tokenAddress, walletAddress} = config
    if (!chainId) {
        throw new Error('chainId is required')
    }
    if (!tokenAddress) {
        throw new Error('tokenAddress required')
    }
    if (!walletAddress) {
        throw new Error('walletAddress is required')
    }
    try {
        
        const url = apiRequestUrl(`/swap/v6.0/${chainId}/approve/allowance`, {
            tokenAddress,
            walletAddress
        })
        
        const {data} = await axios1Inch.get(url)
        return data;
    } catch (e) {
        console.log(e);
    }
}


export async function getTokens(chainId: ChainId) {
    try {
        const {data} = await axios1Inch.get(`/swap/v6.0/${chainId}/tokens`);
        
        return Object.values(data?.tokens).map(({address, name, logoURI, symbol, decimals}: any) => ({
            address,
            name,
            logoURI,
            symbol,
            decimals
        })) as TokenDataType[];
    } catch (e) {
        console.error(e);
    }
    
}
