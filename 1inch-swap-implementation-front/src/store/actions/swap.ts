import { I1InchSwapParams, fromWei } from "@/src/utils/helpers";
import { GET_SWAP } from "../reducers/swap";
import { getSwap } from "@/src/api/getSwap/getSwap";
import { DestinationAmount } from "@/src/utils/types/types";

export const getSwapAction =
  (swapParams: I1InchSwapParams) =>
  async (dispatch: (arg0: { type: string; data: any }) => void) => {
    try {
      const data: DestinationAmount = await getSwap(swapParams);

      if (data.dstAmount) {
        dispatch({ type: GET_SWAP, data: fromWei(Number(data.dstAmount)) });
      }
    } catch (error) {
      console.log(error);
    }
  };
