import React from "react";
import { List, AutoSizer, ListRowProps } from "react-virtualized";
import Image from "next/image";
import { EthSwapToken } from "@/utils/helpers";
import { ChevronLeft } from "lucide-react";

interface Props {
  tokens: EthSwapToken[];
  isTokenListVisible: boolean;
  onClose: () => void;
  onSelect: (token: EthSwapToken) => void;
}
const TokenList = ({
  tokens,
  isTokenListVisible,
  onClose,
  onSelect,
}: Props) => {
  const rowRenderer = ({ index, key, style }: ListRowProps) => {
    const token = tokens[index];

    return (
      <li
        key={key}
        style={style}
        className="flex cursor-pointer items-center justify-between p-4 hover:bg-gray-100"
        onClick={() => onSelect(token)}
      >
        <div className="flex items-center space-x-2">
          <Image
            src={token.logoURI || ""}
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{token.name}</span>
            <span className="text-xs text-gray-500">{token.symbol}</span>
          </div>
        </div>
      </li>
    );
  };

  if (!isTokenListVisible) return null;

  return (
    <div className="p4 absolute left-1/2 top-1/2 z-10 h-[600px] w-[500px] -translate-x-1/2 -translate-y-1/2 transform rounded-2xl bg-white shadow-lg">
      <div className="flex w-8/12 items-center justify-between p-4">
        <ChevronLeft onClick={onClose} className="cursor-pointer" />
        <span className="self-center">Select a Token</span>
      </div>
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={600}
            rowHeight={60}
            rowCount={tokens.length}
            rowRenderer={rowRenderer}
            className="top-0 rounded-2xl bg-white shadow-lg"
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default TokenList;
