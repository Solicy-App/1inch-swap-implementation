"use client";
import { useEffect } from "react";
import { useChainId, useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";

import {
  getTokensList,
  getTokensPrice,
  getQuoteDetails,
} from "@/utils/1inch/api";
import useStore from "@/utils/store";
import { WalletOptions } from "@/components/wallet-options";
import Swap from "@/components/swap";

export default function Home() {
  const { isConnected } = useAccount();
  const {
    tokens,
    fromTokenAddress,
    toTokenAddress,
    fromTokenPrice,
    toTokenPrice,
    fromTokenQty,
    toTokenQty,
    setFromTokenAddress,
    setToTokenAddress,
    setFromTokenPrice,
    setToTokenPrice,
    setFromTokenQty,
    setToTokenQty,
    setTokens,
  } = useStore();
  const chainId = useChainId();

  const { isPending, data } = useQuery({
    queryKey: ["tokens", chainId],
    queryFn: () => getTokensList(chainId),
  });

  const { data: tokensPrice } = useQuery({
    queryKey: ["prices", fromTokenAddress, toTokenAddress],
    queryFn: () => {
      if (fromTokenAddress || toTokenAddress) {
        return getTokensPrice(chainId, [fromTokenAddress, toTokenAddress]);
      }
    },
  });

  const { data: quoteDetails } = useQuery({
    queryKey: ["quote", fromTokenAddress, toTokenAddress, fromTokenQty],
    queryFn: () => {
      if (fromTokenAddress && toTokenAddress && fromTokenQty) {
        return getQuoteDetails(
          chainId,
          fromTokenAddress,
          toTokenAddress,
          fromTokenQty
        );
      }
    },
  });

  useEffect(() => {
    if (data) {
      setTokens(data);
      setFromTokenAddress(Object.keys(data)[0]);
    }
  }, [data, setTokens]);

  useEffect(() => {
    if (tokensPrice) {
      if (fromTokenAddress && tokensPrice[fromTokenAddress]) {
        setFromTokenPrice(tokensPrice[fromTokenAddress]);
      }

      if (toTokenAddress && tokensPrice[toTokenAddress]) {
        setToTokenPrice(tokensPrice[toTokenAddress]);
      }
    }
  }, [fromTokenAddress, toTokenAddress, tokensPrice]);

  useEffect(() => {
    if (quoteDetails) {
      setToTokenQty(quoteDetails.toTokenAmount);
    }
  }, [quoteDetails]);

  if (isPending) {
    return <span>Loading...</span>;
  }

  const selectOptions = Object.keys(tokens);

  return (
    <Container>
      <TokenSelectContainerFilled>
        <Box>You pay</Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Autocomplete
            options={selectOptions}
            sx={{ width: 200, my: 1 }}
            clearIcon={false}
            componentsProps={{ popper: { style: { width: "fit-content" } } }}
            getOptionLabel={(option) => tokens[option].symbol}
            value={fromTokenAddress}
            filterOptions={(_, state) => {
              const filteredOptions = Object.values(tokens).filter(
                ({ name, symbol }) =>
                  `${name.toLowerCase()} ${symbol.toLowerCase()}`.includes(
                    state.inputValue
                  )
              );

              return filteredOptions.map(({ address }) => address);
            }}
            renderOption={(props, option) => {
              const { key, ...restProps } = props;
              const tokenData = tokens[option];

              return (
                <MenuItem key={key} {...restProps}>
                  <ListItemIcon>
                    <img
                      style={{
                        width: "40px",
                        height: "40px",
                        marginRight: "5px",
                      }}
                      src={tokenData.logoURI}
                      alt={tokenData.name}
                      loading="lazy"
                    />
                  </ListItemIcon>
                  <ListItemText>{tokenData.name}</ListItemText>
                </MenuItem>
              );
            }}
            onChange={(_, val) => {
              if (val) setFromTokenAddress(val);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <TextField
            type="number"
            sx={{ flex: 1, marginLeft: "20px" }}
            inputProps={{ style: { textAlign: "right" } }}
            InputProps={{ disableUnderline: true }}
            value={fromTokenQty}
            hiddenLabel
            variant="standard"
            onChange={(event) => setFromTokenQty(Number(event.target.value))}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {fromTokenAddress && (
            <Link
              href={`https://etherscan.io/token/${fromTokenAddress}`}
              target="_blank"
              rel="noreferrer"
            >
              {tokens[fromTokenAddress].name}
            </Link>
          )}
          {fromTokenPrice && fromTokenQty > 0 && (
            <Box>~${Number(fromTokenPrice) * fromTokenQty}</Box>
          )}
        </Box>
      </TokenSelectContainerFilled>
      <TokenSelectContainerOutlined>
        <Box>You recieve</Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Autocomplete
            options={selectOptions}
            sx={{ width: 200, my: 1 }}
            clearIcon={false}
            componentsProps={{ popper: { style: { width: "fit-content" } } }}
            getOptionLabel={(option) => tokens[option].symbol}
            value={toTokenAddress}
            renderOption={(props, option) => {
              const { key, ...restProps } = props;
              const tokenData = tokens[option];

              return (
                <MenuItem key={key} {...restProps}>
                  <ListItemIcon>
                    <img
                      style={{
                        width: "40px",
                        height: "40px",
                        marginRight: "5px",
                      }}
                      src={tokenData.logoURI}
                      alt={tokenData.name}
                      loading="lazy"
                    />
                  </ListItemIcon>
                  <ListItemText>{tokenData.name}</ListItemText>
                </MenuItem>
              );
            }}
            onChange={(_, val) => {
              if (val) setToTokenAddress(val);
            }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select a token" />
            )}
          />
          <TextField
            type="number"
            sx={{ flex: 1, marginLeft: "20px" }}
            inputProps={{ style: { textAlign: "right" } }}
            InputProps={{ disableUnderline: true }}
            value={toTokenQty}
            hiddenLabel
            disabled
            variant="standard"
            onChange={(event) => setToTokenQty(Number(event.target.value))}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {toTokenAddress && (
            <Link
              href={`https://etherscan.io/token/${toTokenAddress}`}
              target="_blank"
              rel="noreferrer"
            >
              {tokens[toTokenAddress].name}
            </Link>
          )}
          {toTokenPrice && toTokenQty > 0 && (
            <Box>~${Number(toTokenPrice) * toTokenQty}</Box>
          )}
        </Box>
      </TokenSelectContainerOutlined>
      {!isConnected ? <WalletOptions /> : <Swap />}
    </Container>
  );
}

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: "0 auto",
  width: "580px",
  minHeight: "100px",
  backgroundColor: "#ffffff",
  boxShadow: "0 12px 24px #e2e9f6",
  borderRadius: "24px",
  padding: "8px",
  maxWidth: "100%",
});

const TokenSelectContainerFilled = styled(Box)({
  width: "100%",
  padding: "12px 16px",
  borderRadius: "16px",
  backgroundColor: "#f3f5fa",
  boxShadow: "none",
  marginBottom: "10px",
});

const TokenSelectContainerOutlined = styled(Box)({
  width: "100%",
  padding: "12px 16px",
  borderRadius: "16px",
  boxShadow: "inset 0 0 0 1px #e3e7ee",
});
