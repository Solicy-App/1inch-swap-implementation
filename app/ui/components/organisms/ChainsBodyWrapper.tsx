"use client";
import { SelectSourceProvider } from "@/app/ui/contexts/source";

const ChainsBodyWrapper = ({
  availableChains,
  children,
}: Readonly<{ availableChains: any; children: React.ReactNode }>) => {
  return (
    <SelectSourceProvider.Provider value={{ availableChains }}>
      {children}
    </SelectSourceProvider.Provider>
  );
};

export default ChainsBodyWrapper;
