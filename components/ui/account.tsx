"use client";

import { useDisconnect, useEnsName } from "wagmi";
import { useAccount } from "wagmi";
import { Button } from "./button";
import { truncateAddress } from "@/utils/helpers";
import Image from "next/image";

const Account = () => {
  const { isConnected, address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({
    address: address,
  });
  return (
    <div className="flex">
      {address && (
        <Button className="bg-dodger-blue gap-2 text-royal-blue hover:bg-royal-blue hover:text-white" onClick={() => disconnect()}>
          {connector?.icon && (
            <Image
              alt={connector.name}
              src={connector.icon}
              width={22}
              height={22}
            />
          )}
          {truncateAddress(address)}
        </Button>
      )}
    </div>
  );
};

export default Account;
