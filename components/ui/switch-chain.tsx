"use client";

import { useSwitchChain } from "wagmi";
import { useChainId } from "wagmi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Fragment, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SwitcChain = () => {
  const chainId = useChainId();
  const { chains, switchChain } = useSwitchChain();
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
 
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  return (
    <Select
      onValueChange={(id) => {
        switchChain({ chainId: +id as typeof chainId });
        router.push(pathname + '?' + createQueryString('chain', id))
      }}
      defaultValue={chains[0].id.toString()}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select chain" />
      </SelectTrigger>
      <SelectContent>
        {chains.map((chain) => {
          return (
            <Fragment key={chain.id}>
              <SelectItem value={`${chain.id}`}>{chain.name}</SelectItem>
            </Fragment>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default SwitcChain;
