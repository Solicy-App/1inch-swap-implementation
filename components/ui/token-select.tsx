"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSearchParams } from "next/navigation";
import useGetTokens from "@/hooks/query/useGetTokens";
import { ITokenMeta } from "@/types/api/tokens";
import { ReadOnlyProps } from "@/types/helper";
import Image from "next/image";

interface ISelectTokenProps {
  activeToken: ITokenMeta | null;
  onActiveSelect: (token: ITokenMeta) => void;
}

export const SelectToken: React.FC<ReadOnlyProps<ISelectTokenProps>> = ({
  activeToken,
  onActiveSelect,
}) => {
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const network = searchParams.get("network");
  const { data: tokens } = useGetTokens();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="max-w-72 w-full py-2 flex items-center justify-between"
        >
          {activeToken ? (
            <>
              <Image
                alt={activeToken.name}
                src={activeToken.logoURI}
                width={24}
                height={24}
              />
              <span>{activeToken.symbol}</span>
            </>
          ) : (
            "Select framework..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[640px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>Token not found on {network}</CommandEmpty>
          <CommandGroup className="h-36 overflow-auto">
            {tokens?.map((token) => (
              <CommandItem
                key={token.address}
                value={token.name}
                onSelect={() => {
                  onActiveSelect(token);
                  setOpen(false);
                }}
                className="flex justify-between items-center"
              >
                <div className="flex gap-2 items-center">
                  <Image
                    alt={token.name}
                    src={token.logoURI}
                    width={40}
                    height={40}
                  />
                  <div className="flex flex-col">
                    <p>{token.name}</p>
                    <p>{token.symbol}</p>
                  </div>
                </div>
                <p>$0</p>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectToken;
