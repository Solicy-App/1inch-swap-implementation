import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import useStore from "@/utils/store";

export default function Swap() {
  const { fromTokenAddress, toTokenAddress, toTokenQty } = useStore();

  return (
    <Box sx={{ mt: 2 }}>
      <Button
        fullWidth
        variant="contained"
        color="success"
        sx={{ borderRadius: "24px" }}
        disabled={!fromTokenAddress || !toTokenAddress || !toTokenQty}
        onClick={() => {}}
      >
        Swap
      </Button>
    </Box>
  );
}
