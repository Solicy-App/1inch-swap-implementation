"use client";

import { useState } from "react";
import SwapperContent from "./swapper-content";
import { Button } from "./button";
import { ChevronDown } from "lucide-react";

const SwapperSelect = () => {
  const [swapContent, setSwapContent] = useState(false);

  const handleSwapClick = () => {
    setSwapContent((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col gap-2 relative">
      <SwapperContent method={swapContent ? "recieve" : "pay"} />
      <Button
        onClick={handleSwapClick}
        className="relative self-center bg-white hover:bg-slate-200 rounded-full shadow-md shadow-tale-blue w-[24px] h-[24px] p-0 overflow-hidden transition-transform duration-300 transform hover:rotate-180"
      >
        <ChevronDown
          color="#2f8af5"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </Button>
      <SwapperContent method={swapContent ? "pay" : "recieve"} />
    </div>
  );
};

export default SwapperSelect;
