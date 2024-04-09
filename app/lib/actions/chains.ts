"use server";

import { ChainId } from "@/utils/constants";
import axios1Inch from "@/utils/1inch/axiosInstance";
import chainService from "@/utils/services/chain.service";
import quoteService from "@/utils/services/quote.service";
import { toWei } from "@/utils/helpers";
import { AxiosResponse } from "axios";
import { revalidatePath } from "next/cache";
import { toast } from "react-toastify";

/**
 * @description action calling chain service for list of swap available chains
 * @param {ChainId} chainId
 * @returns {array}
 */
export const getAvailableChains = async (
  chainId: ChainId = ChainId.ETHEREUM
) => {
  return chainService.get({ chain: chainId });
};

export const swap = async (url: string) => {
  revalidatePath("/");
  try {
    return await axios1Inch.get(url);
  } catch (err: any) {
    throw new Error(err.response.data.description);
  }
};

/**
 * @description get best exchange quote
 * @param {ChainId} chainId
 * @returns
 */
export const getQuote = async (
  data: any,
  chainId: ChainId = ChainId.ETHEREUM
) => {
  const quote: any = await quoteService.get({
    chain: chainId,
    src: data.from,
    dst: data.to,
    amount: toWei(Number(data.value)).toString(10),
    includeTokensInfo: true,
  });

  return quote?.data;
};
