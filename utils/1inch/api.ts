import { I1InchSwapParams } from "../helpers";
import axios1Inch from "./axiosInstance";

const oneInchBaseUrl = process.env.NEXT_PUBLIC_1INCH_BASE_URL || "";

export const create1InchProxyUrl = (url: string) =>
  `?url=${oneInchBaseUrl}${url}`;
export const broadcastApiUrl1Inch = (chainId: string | number) =>
  create1InchProxyUrl(`/tx-gateway/v1.1/${chainId}/broadcast`);
export const apiBaseUrl1Inch = (chainId: string | number) =>
  create1InchProxyUrl(`/swap/v5.2/${chainId}`);

export function apiRequestUrl(path: string, queryParams: any) {
  return path + "?" + new URLSearchParams(queryParams).toString();
}

export async function buildTxForSwap1Inch(
  swapParams: I1InchSwapParams,
  chainId: string | number
) {
  const url = apiRequestUrl(
    create1InchProxyUrl(`/1inch-api/${chainId}/swap`),
    swapParams
  );
  try {
    const response = await axios1Inch.get(url);

    return response.data.tx;
  } catch (err) {
    console.error(err);
  }
}

export async function getTokensList(chainId: string | number) {
  const url = `/token-api/${chainId}`;

  try {
    const response = await axios1Inch.get(url);

    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getTokensPrice(
  chainId: string | number,
  addresses: (string | null)[]
) {
  const adrs = addresses.filter((adr) => adr).toString();
  const url = `/price-api/${chainId}/${adrs}?currency=usd`;

  try {
    const response = await axios1Inch.get(url);

    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getQuoteDetails(
  chainId: string | number,
  fromTokenAddress: string,
  toTokenAddress: string,
  amount: number,
  walletAddress: string = "0x0000000000000000000000000000000000000000",
  enableEstimate: string = "false"
) {
  const url = apiRequestUrl(`/quoter-api/${chainId}/quote/receive`, {
    fromTokenAddress,
    toTokenAddress,
    amount: amount * 1000000000000000000,
    walletAddress,
    enableEstimate,
  });

  try {
    const response = await axios1Inch.get(url);

    return response.data;
  } catch (err) {
    console.error(err);
  }
}
