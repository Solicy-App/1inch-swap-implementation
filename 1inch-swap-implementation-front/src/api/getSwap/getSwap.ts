import { I1InchSwapParams } from "@/src/utils/helpers";
import { DestinationAmount } from "@/src/utils/types/types";
import axios from "axios";
import { stringify } from "qs";

export const getSwap = async (swapParams: I1InchSwapParams) => {
  try {
    const query = stringify(swapParams);
    const { data }: any = await axios.get(
      `http://localhost:3001/swap/getSwap?${query}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
