"use client";
import { useAccount } from "wagmi";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import ChainsMenu from "./chains-menu";
import Account from "./account";

export default function TopNavBar() {
  const { isConnected } = useAccount();

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "50px" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Swap
          </Typography>
          <ChainsMenu />
          {isConnected && <Account />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
