import { useState } from "react";
import { SwapSourceProvider } from "@/app/ui/contexts/source";
import { IChainItem, IComponentBaseProps } from "@/utils/types/component";

const SwapTokenAppWrapper = ({ children }: IComponentBaseProps) => {
  const [from, setFrom] = useState<IChainItem | undefined>();
  const [to, setTo] = useState<IChainItem | undefined>();

  const actions = {
    from: setFrom,
    to: setTo,
  };

  return (
    <SwapSourceProvider.Provider value={{ from, to, actions }}>
      {children}
    </SwapSourceProvider.Provider>
  );
};

export default SwapTokenAppWrapper;
