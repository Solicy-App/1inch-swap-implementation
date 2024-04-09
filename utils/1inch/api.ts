import { swap } from "@/app/lib/actions/chains";
import { I1InchSwapParams } from "../helpers";

export const create1InchProxyUrl = (url: string) => `${url}`;
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
    create1InchProxyUrl(`/${chainId}/swap`),
    swapParams
  );
  try {
    const response = await swap(url);
    return response.data.tx || 0;
  } catch (err: any) {
    throw Error(err.message);
  }
}
