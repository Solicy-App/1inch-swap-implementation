"use server";
import { ChainId } from "../constants";
import { EthSwapToken, fromWei, I1InchSwapParams, toWei } from "../helpers";
import axios1Inch from "./axiosInstance";

const oneInchBaseUrl = process.env.NEXT_PUBLIC_1INCH_BASE_URL || "";

const create1InchProxyUrl = (url: string) => `?url=${oneInchBaseUrl}${url}`;

function apiRequestUrl(path: string, queryParams: any) {
  return path + "?" + new URLSearchParams(queryParams).toString();
}

export async function buildTxForSwap1Inch(
  swapParams: I1InchSwapParams,
  chainId: string | number,
) {
  const url = apiRequestUrl(
    create1InchProxyUrl(`/swap/v6.0/${chainId}/swap`),
    swapParams,
  );
  try {
    const response = await axios1Inch.get(url);

    return response.data.tx;
  } catch (err) {
    console.error(err);
  }
}

export async function getTokens(
  chainId: ChainId,
): Promise<EthSwapToken[] | undefined> {
  try {
    const response = await axios1Inch.get(`/swap/v6.0/${chainId}/tokens`);
    const tokens = response.data?.tokens;

    if (!tokens) {
      throw new Error("No tokens data available.");
    }

    return Object.values(tokens).map((token) => {
      const { address, name, logoURI, logoUri, symbol, decimals } =
        token as EthSwapToken;
      return { address, name, logoURI, logoUri, symbol, decimals };
    });
  } catch (error) {
    console.error("Failed to fetch tokens:", error);
    return undefined;
  }
}

export async function getAllowance({
  chainId,
  tokenAddress,
  walletAddress,
}: any) {
  if (!chainId || !tokenAddress || !walletAddress) {
    throw new Error("Missing required parameters");
  }

  try {
    const url = apiRequestUrl(`/swap/v6.0/${chainId}/approve/allowance`, {
      tokenAddress,
      walletAddress,
    });
    const { data } = await axios1Inch.get(url);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getQuote({
  chainId,
  fromTokenAddress,
  toTokenAddress,
  amount,
  decimals,
  decimalsTo,
}: any) {
  if (!chainId || !fromTokenAddress || !toTokenAddress || !amount) {
    throw new Error("Missing required parameters");
  }

  try {
    const calculatedAmount = toWei(amount, decimals);
    const url = apiRequestUrl(`/swap/v6.0/${chainId}/quote`, {
      src: fromTokenAddress,
      dst: toTokenAddress,
      amount: calculatedAmount,
    });

    const { data } = await axios1Inch.get(url);
    return { data: fromWei(data.dstAmount, decimalsTo).toFixed(4) };
  } catch (e) {
    console.error(e);
  }
}
