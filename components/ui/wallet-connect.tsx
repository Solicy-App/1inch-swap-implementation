import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Connectors from "./connectors";

const WalletConnect = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-dodger-blue gap-2 hover:bg-sky-200">
          <Wallet color="#2f8af5" />
          <span className="text-royal-blue">Connect wallet</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <Connectors />
      </PopoverContent>
    </Popover>
  );
};

export default WalletConnect;
