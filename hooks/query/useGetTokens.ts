import { ISwapTokenData } from "@/types/api/tokens";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useGetTokens = () => {
  const searchParams = useSearchParams();
  const chain = searchParams.get("chain");

  return useQuery({
    queryKey: ["getTokens", chain],
    select: useCallback(
      (data: ISwapTokenData) => Object.values(data.tokens),
      []
    ),
  });
};
export default useGetTokens;
