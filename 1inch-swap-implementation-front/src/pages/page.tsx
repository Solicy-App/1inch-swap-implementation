"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { swap1Inch } from "../hooks/one-inch";
import { getTokensAction } from "../store/actions/tokens";
import { getSwapAction } from "../store/actions/swap";
import { getSwapSelector } from "../store/selectors/swap";
import { useDispatch, useSelector } from "react-redux";
import { getLoadingSelector } from "../store/selectors/loading";
import { getLoadingAction } from "../store/actions/loading";
import Loading from "../components/Loading";
import { TokenSelector } from "../components/TokenSelector/TokenSelector";
import { Token } from "../utils/types/types";
import { ConnectWallet } from "../components/ConnectWallet/ConnectWallet";

export default function Swap() {
  const dispatch = useDispatch();
  const loading = useSelector(getLoadingSelector);
  const swap: number = useSelector(getSwapSelector);
  const [token1, setToken1] = useState<Token | null>(null);
  const [token2, setToken2] = useState<Token | null>(null);
  const [count, setCount] = useState<Number>(1);
  const [connectWallet, setConnectWallet] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // @ts-ignore
        dispatch(getLoadingAction(true));
        // @ts-ignore
        dispatch(getTokensAction());
        // @ts-ignore
        dispatch(getLoadingAction(false));
      } catch (error) {
        // @ts-ignore
        dispatch(getLoadingAction(false));
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token1?.address && token2?.address) {
          // @ts-ignore
          dispatch(getLoadingAction(true));
          const swapParams = await swap1Inch(
            token1.address,
            token2.address,
            Number(count)
          );
          // @ts-ignore
          dispatch(getSwapAction(swapParams));
          // @ts-ignore
          dispatch(getLoadingAction(false));
        }
      } catch (error) {
        // @ts-ignore
        dispatch(getLoadingAction(false));
        console.error("Error fetching data:", error);
      }
    };

    if (token1?.address && token2?.address) {
      fetchData();
    }
  }, [dispatch, token1, token2, count]);

  return (
    <main className={styles.main}>
      {loading && <Loading />}
      <div className={styles.container}>
        <div className={styles.swapType}>
          <p className={styles.swapText}>Swap</p>
          <p className={styles.limitText}>Limit</p>
        </div>
        <div className={styles.inputSection}>
          <p className={styles.inputLabel}>You pay</p>
          <div className={styles.tokenInput}>
            <TokenSelector token={token1} setToken={setToken1} />
            <input
              onChange={(e) => {
                setCount(Number(e.target.value));
              }}
              defaultValue={1}
              className={styles.inputField}
            />
          </div>
          {token1 && <p>{token1.name}</p>}
        </div>
        <div className={styles.inputSection}>
          <p className={styles.inputLabel}>You receive</p>
          <div className={styles.tokenInput}>
            <TokenSelector token={token2} setToken={setToken2} />
            <input
              value={+swap * +count}
              className={styles.inputField}
              type="number"
            />
          </div>
          {token2 && <p>{token2.name}</p>}
        </div>
        {token1 && token2 && (
          <div className={styles.exchangeRate}>
            {`1 ${token1?.symbol} = ${swap} ${token2?.symbol}`}
          </div>
        )}
        <div
          onClick={() => {
            setConnectWallet(!connectWallet);
          }}
          role="button"
          className={styles.wallet}
        >
          Connect wallet
        </div>
        {connectWallet && <ConnectWallet setConnectWallet={setConnectWallet} />}
      </div>
    </main>
  );
}
