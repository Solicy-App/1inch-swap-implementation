"use client";
import { useState, useEffect } from "react";
import { Connector, useConnect } from "wagmi";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return (
    <Box sx={{ display: "flex", justifyContent: "space-evenly", my: 3 }}>
      {connectors.map((connector) => (
        <WalletOption
          key={connector.uid}
          connector={connector}
          onClick={() => connect({ connector })}
        />
      ))}
    </Box>
  );
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <Button disabled={!ready} variant="contained" onClick={onClick}>
      {connector.name}
    </Button>
  );
}
