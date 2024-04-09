import { IChainItem } from "@/utils/types/component";
import { Dispatch, SetStateAction, createContext, useContext } from "react";

export const SelectSourceProvider = createContext<{
  availableChains: any;
}>({
  availableChains: [],
});

export const SwapSourceProvider = createContext<{
  from?: IChainItem;
  to?: IChainItem;
  actions: {
    from: Dispatch<SetStateAction<IChainItem | undefined>>;
    to: Dispatch<SetStateAction<IChainItem | undefined>>;
  };
}>({
  from: {} as IChainItem,
  to: {} as IChainItem,
  actions: {
    from: () => {},
    to: () => {},
  },
});

export function useSelectSourceContext() {
  return useContext(SelectSourceProvider);
}

export function useSwapSourceContext() {
  return useContext(SwapSourceProvider);
}
