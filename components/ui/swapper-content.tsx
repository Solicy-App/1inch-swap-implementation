"use client";

import useGetTokens from "@/hooks/query/useGetTokens";
import { cn } from "@/lib/utils";
import { ReadOnlyProps } from "@/types/helper";
import { useSearchParams } from "next/navigation";
import { Button } from "./button";
import { ChevronDown } from "lucide-react";
import { Input } from "./input";
import { useState } from "react";
import { ITokenMeta } from "@/types/api/tokens";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SelectToken from "./token-select";

interface ISwapperContent {
  method: "pay" | "recieve";
}

const SwapperContent: React.FC<ReadOnlyProps<ISwapperContent>> = ({
  method,
}) => {
  const { data: res } = useGetTokens();
  const [activeToken, setActiveToken] = useState<null | ITokenMeta>(null);

  const handleActiveToken = (token: ITokenMeta) => {
    setActiveToken(token);
  };

  return (
    <div
      className={cn(
        "py-3 px-4 rounded-2xl flex flex-col gap-3",
        method === "pay" ? "bg-light-grey" : "bg-white"
      )}
    >
      <p>You {method}</p>
      <div className="flex items-center justify-between">
        <SelectToken
          activeToken={activeToken}
          onActiveSelect={handleActiveToken}
        />
        <Input type="number" className="bg-transparent border-none text-base" />
      </div>
      <div className="flex justify-between items-center">
        <p>{activeToken?.name}</p>
      </div>
    </div>
  );
};

export default SwapperContent;
