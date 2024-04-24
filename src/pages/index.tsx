import Head from "next/head";
import styles from "@/styles/page.module.css";
import Header from "../components/Header";
import Main from "../components/Main";
import React, { useState, useEffect } from "react";
import tokens from "../../tokens2.json";
import Token from "../interfaces/Token";
import AppState from "../interfaces/AppState";
import Image from "next/image";
import { 
  useAccount, 
  useConfig, 
  useBalance
} from 'wagmi';
import useSwap1Inch from "../hooks/one-inch.ts";

const App: React.FC = () => {
  
  const config = useConfig();
  const { address, isDisconnected } = useAccount({config});
  
  const [state, setState] = useState<AppState>({
    chain: 1,
    amount: 1,
    tokensArray: Object.values(tokens.tokens),
    fromToken: Object.values(tokens.tokens)[0],
    toToken: null,
    showTokensPanel: false,
    loading: false,
    changingTokenID: null,
    address: address ? address : undefined,
    fromDollarPerToken: 1.0007697388768408,
    toDollarPerToken: 0,
    insufficientBallance: false
  });
  
  
    
  const result = useBalance({ 
    address: address, 
    chainId: 1, 
    config,
    blockNumber: 17829139n, 
    blockTag: 'latest', 
    scopeKey: 'foo', 
    unit: 'ether'
    
  }); 
  
  useEffect(() => {
    if(result && result.data && result.data.formatted) {
    if(state.fromDollarPerToken * state.amount > Number(result.data.formatted)) {
    setState((prevState: AppState) => {
          return { 
          ...prevState, 
          insufficientBallance: true,
          address: address
          };
        });
  } else {
    setState((prevState: AppState) => {
          return { 
          ...prevState, 
          insufficientBallance: false,
          address: address
          };
        });
  }
  
    } else {
      setState((prevState: AppState) => {
          return { 
          ...prevState, 
          insufficientBallance: false,
          
          };
        });
    }

  }, [address]);
  
  
async function fetchTokens(chainID: number = 1) {
  try {
    const url = `/api/gettokens?chainid=${chainID}`;
    const response = await fetch(url, {
      headers: {
        "accept": "application/json"
      }
    });
    const data = await response.json();
    if(data && data.tokens){
    return Object.values(data.tokens);
    } else {
      return null;
    }
  } catch (error: string | unknown) {
    throw error;
  }
}
  
const swap1Inch = useSwap1Inch();
  
async function fetchPrice(address: string, chainId: number = state.chain) {
  const url = `/api/getamount?chainid=${chainId}&tokenaddress=${address}`;
    const response = await fetch(url, {
      headers: {
        "accept": "application/json"
      }
    });
    const data = await response.json();
    return Object.values(data);
}
  
async function changeChain(chainID: number) {
  setState((prevState: AppState) => ({
    ...prevState,
    chain: chainID,
    loading: true,
    
  }));

  try {
    
    const newTokensArray = await fetchTokens(chainID);
    if(newTokensArray) {
    const fromToken = newTokensArray[0] as Token;
    setState((prevState: AppState) => ({
      ...prevState,
      tokensArray: newTokensArray as Token[],
      fromToken: fromToken,
      toToken: null,
      
    }));
    
    /* 
    The 1Inch API doesn't let more than 1 request per second. This code part is
    so fast 
    and makes 2 requests per second and throws error.
    For that I set timeout. The plan of the API should be updated.
    
    */
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    const priceArray = await fetchPrice(fromToken.address, chainID);
    const fromDollarPerToken: number = Number(priceArray[0]);
    setState((prevState: AppState) => {
    return { 
      ...prevState, 
      fromDollarPerToken: fromDollarPerToken,
      toDollarPerToken: 0,
      amount: 1,
      loading: false
    };
  });
  
    }
  } catch (error: string | unknown) {
    setState((prevState: AppState) => ({
      ...prevState,
      loading: false
    }));
    throw error;
  }
  
}
function showTokens(id?: "fromtoken" | "totoken") {
  if(id) {
  setState((prevState: AppState) => {
    return { 
      ...prevState, 
      showTokensPanel: !prevState.showTokensPanel,
      changingTokenID: id
    };
  });
  } else {
    setState((prevState: AppState) => {
    return { 
      ...prevState, 
      showTokensPanel: !prevState.showTokensPanel,
      
    };
  });
  }
}
async function changeToken(changedToken: Token) {
  
  const priceArray = await fetchPrice(changedToken.address);
  const dollarPerTokens: number = Number(priceArray[0]);
  try {
    
    if(state.changingTokenID === "fromtoken") {
    setState((prevState: AppState) => {
    return { 
      ...prevState, 
      fromToken: changedToken,
      showTokensPanel: false,
      fromDollarPerToken: Number(dollarPerTokens)
      
    };
  });
  
  
  } else if(state.changingTokenID === "totoken") {
      
        setState((prevState: AppState) => {
          return { 
          ...prevState, 
          toToken: changedToken,
          showTokensPanel: false,
          toDollarPerToken: Number(dollarPerTokens)
            
          };
        });
    
  }
    
  } catch (error: string | unknown) {
    throw error;
  }
  
}
function changeAmount(amount: number) {
  
  if(result && result.data) {
  
  if(state.fromDollarPerToken * amount > Number(result.data.formatted)) {
    setState((prevState: AppState) => {
          return { 
          ...prevState, 
          insufficientBallance: true,
          amount: amount
          };
        });
  } else {
    setState((prevState: AppState) => {
          return { 
          ...prevState, 
          insufficientBallance: false,
          amount: amount
          };
        });
  }
  } else {
  setState((prevState: AppState) => {
          return { 
          ...prevState, 
          amount: amount
          };
        });
  }
}


  
  return (
    <>
      {state.loading ? ( 
        <div>Loading...</div>
      ) : (
        <>
          <Header
            changeChain={changeChain}
            chain={state.chain}
            balance={result && result.data && result.data.formatted ?
            result.data.formatted : null}
            isDisconnected={isDisconnected}
          />

          <Main
            tokensArray={state.tokensArray}
            toToken={state.toToken}
            fromToken={state.fromToken}
            changeToken={changeToken}
            amount={state.amount}
            showTokensPanel={state.showTokensPanel}
            showTokens={showTokens}
            changeAmount={changeAmount}
            isDisconnected={isDisconnected}
            fromDollarPerToken={state.fromDollarPerToken}
            toDollarPerToken={state.toDollarPerToken}
            balance={result && result.data && result.data.formatted ?
            Number(result.data.formatted) : null}
            insufficientBallance={state.insufficientBallance}
            swap1Inch={swap1Inch}
            chainId={state.chain}
          />

        </>
      )}
    </>
  );
}

export default App;