"use client";
import { Suspense } from "react";
import classNames from "classnames";
import {
  useSelectSourceContext,
  useSwapSourceContext,
} from "@/app/ui/contexts/source";
import ChainItemSkeleton from "../molecules/loaders/ChainItemSkeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { filterChains } from "@/utils/helpers";
import dynamic from "next/dynamic";
import { IChainItem } from "@/utils/types/component";

const ChainItem = dynamic(
  () => import("@/app/ui/components/molecules/ChainItem"),
  { ssr: false, loading: () => <ChainItemSkeleton /> }
);

const ChainList = ({
  className,
  type,
}: {
  className?: string;
  type: "from" | "to";
}) => {
  const { availableChains } = useSelectSourceContext();
  const { actions } = useSwapSourceContext();
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const chooseToken = (token: IChainItem) => {
    const params = new URLSearchParams(searchParams);
    if (token) {
      params.set(type, token.symbol);
      actions[type](token);
    } else {
      params.delete(type);
    }
    push(`/`);
  };

  return (
    <div className={classNames([className])}>
      {filterChains(availableChains?.tokens, searchParams.get(type))?.map(
        (chain: any, index: number) => (
          <Suspense fallback={<ChainItemSkeleton />} key={index}>
            <ChainItem
              key={index}
              image={chain.logoURI}
              symbol={chain.symbol}
              address={chain.address}
              decimals={chain.decimals}
              name={chain.name}
              amount={0}
              chooseToken={chooseToken}
            />
          </Suspense>
        )
      )}
    </div>
  );
};

export default ChainList;
