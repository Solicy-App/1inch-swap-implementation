import Account from "@/components/ui/account";
import { Button } from "@/components/ui/button";
import SwapperSelect from "@/components/ui/swapper-select";
import SwitcChain from "@/components/ui/switch-chain";
import WalletConnect from "@/components/ui/wallet-connect";
import { IPageQueryParams } from "@/types/helper";
import { getSwapTokens } from "@/utils/1inch/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Home({
  params,
  searchParams,
}: IPageQueryParams<{ chain: number }>) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getTokens", searchParams.chain],
    queryFn: async () =>
      getSwapTokens(searchParams.chain).then((res) => res.data),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex h-dvh w-full justify-center items-center bg-gradient-to-r from-light-grey to-light-lavender">
        <div className="absolute top-0 right-3 flex gap-3">
          <SwitcChain />
          <Account />
        </div>
        <div className="shadow-md shadow-tale-blue max-w-md w-full min-h-24 bg-white rounded-3xl p-2 flex flex-col gap-2">
          <p className="font-medium pl-2">Swap</p>
          <SwapperSelect />
          <WalletConnect />
        </div>
      </div>
    </HydrationBoundary>
  );
}
