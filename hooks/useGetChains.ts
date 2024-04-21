import { ChainId } from "@/utils/constants";
import React from "react";

const useGetChains = () => {
  const chainIdArray = Object.entries(ChainId).map(([name, value]) => ({
    name,
    value,
  }));
  return chainIdArray;
};

export default useGetChains;
