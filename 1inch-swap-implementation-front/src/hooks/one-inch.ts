"use client";

import { generate1InchSwapParmas } from "@/src/utils/helpers";

export const swap1Inch = async (
  from: string,
  to: string,
  typedValue: number
) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const swapParams = generate1InchSwapParmas(
    from,
    to,
    Number(typedValue),
    "",
    1
  );

  // TO DO: Remove when change DEV plan for 1Inch (1 Request per second)
  return swapParams;
};
