"use client";

import { useChainId, useConnect } from "wagmi";
import { Button } from "./button";
import Image from "next/image";

const Connectors = () => {
  const chainId = useChainId();
  const { connectors, connect } = useConnect();
  return (
    <div className="flex flex-col gap-2">
      <h2 className="self-center">Connect</h2>
      <div className="grid grid-cols-2 gap-3">
        {connectors.map((connector) => (
          <Button
            key={connector.uid}
            onClick={() => connect({ connector, chainId })}
            className="gap-2 bg-dodger-blue hover:bg-royal-blue text-black hover:text-white"
          >
            {connector.icon && (
              <Image
                alt={connector.name}
                src={connector.icon}
                width={22}
                height={22}
              />
            )}

            {connector.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Connectors;
