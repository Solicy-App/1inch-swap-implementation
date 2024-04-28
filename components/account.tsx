import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {address && (
        <Box sx={{ mx: 1 }}>
          {ensName ? `${ensName} (${address})` : address}
        </Box>
      )}
      <Button variant="contained" color="error" onClick={() => disconnect()}>
        Disconnect
      </Button>
    </Box>
  );
}
