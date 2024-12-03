import { I1InchSwapParams } from "../helpers";
import axios1Inch from "./axiosInstance";

const oneInchBaseUrl = process.env.REACT_APP_1INCH_BASE_URL || "";

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
    create1InchProxyUrl(`/swap/v6.0/${chainId}/swap`),
    swapParams
  );
  try {
    const response = await axios1Inch.get(url);

    return response.data.tx;
  } catch (err) {
    console.error(err);
  }
}

export async function getTokens() {
  const url = create1InchProxyUrl('/token/v1.2/multi-chain');
  try {
    const response = await axios1Inch.get(url);

    return response.data;
  } catch (err) {
    console.error(err);
  }
}
export async function searchTokens(query: string) {
  const url = create1InchProxyUrl('/token/v1.2/search');
  try {
    const response = await axios1Inch.get(url, {
      paramsSerializer: {
        indexes: null
      },
      params: {
        query,
        only_positive_rating: true
      },
    });

    return response.data;
  } catch (err) {
    console.error(err);
  }
}

interface GetQuoteParamsT {
  srcTokenAddress: string;
  chainId: number;
  dstTokenAddress: string;
  amount: number;
  walletAddress: string;
  enableEstimate: boolean;
}
export async function getQuote(params: GetQuoteParamsT) {
  const url = create1InchProxyUrl('/fusion-plus/quoter/v1.0/quote/receive');
  try {
    const response = await axios1Inch.get(url, {
      paramsSerializer: {
        indexes: null
      },
      params,
    });

    return response.data;
  } catch (err) {
    console.error(err);
  }
}