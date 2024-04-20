"use client";

import React, { useContext, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useSwap1Inch } from "@/hooks/one-inch";
import { getTokens } from "@/utils/1inch/api";
import TokenBox from "@/components/SwapPageComponents/token-box";
import { Token } from "@/utils/types";
import { ChainContext, ChainContextType } from "@/contexts/chain-context";
import { useAccount, useConnect } from "wagmi";
import { toNum } from "@/utils/helpers";
import styles from "./swap.module.scss";

const Swap = () => {
	const [tokens, setTokens] = useState<Array<Token>>([]);
	const [firstToken, setFirstToken] = useState<Token | undefined>();
	const [secondToken, setSecondToken] = useState<Token | undefined>();
	const [firstInputValue, setFirstInputValue] = useState<number>(1);
	const [secondInputValue, setSecondInputValue] = useState<number>();
	const [loading, setLoading] = useState<boolean>(true);

	const { chain } = useContext<ChainContextType>(ChainContext);
	const { address, isConnected } = useAccount();
	const { connectors, connect } = useConnect();

	const swap1Inch = useSwap1Inch();

	useEffect(() => {
		setFirstToken(undefined);
		setSecondToken(undefined);
		fetchTokens(chain);
	}, [chain]);

	useEffect(() => {
		if (!firstToken || !secondToken || firstInputValue === 0) {
			return;
		}
		fetchSwapData();
	}, [firstToken, secondToken, firstInputValue]);

	const fetchSwapData = async () => {
		const data: number = await swap1Inch.swap1Inch({
			from: firstToken?.address,
			to: secondToken?.address,
			chainId: chain,
			typedValue: Number(firstInputValue),
			account: address || "",
		});

		setSecondInputValue(Number(toNum(data).toFixed(2)));
	};

	const fetchTokens = async (chainId: number) => {
		const { tokens } = await getTokens(chainId);

		const tokensArr: Array<Token> = [];

		Object.values(tokens).map((token: any) => {
			tokensArr.push(token);
		});

		setTokens(tokensArr);
		setFirstToken(tokensArr[0]);
		setSecondToken(tokensArr[1]);
		setLoading(false);
	};

	const selectFirstToken = (tokenData: string) => {
		const token: Token = JSON.parse(tokenData);
		setFirstToken(token);
	};

	const selectSecondToken = (tokenData: string) => {
		const token: Token = JSON.parse(tokenData);
		setSecondToken(token);
	};

	return (
		<div className={styles.container}>
			{!loading ? (
				<>
					<span>Swap</span>
					<TokenBox
						label="You pay"
						tokens={tokens}
						handleSelectChange={(val) => selectFirstToken(val)}
						handleInputChange={(val) => setFirstInputValue(val)}
						selectedToken={firstToken}
						inputValue={firstInputValue}
						styles={styles}
					/>
					<TokenBox
						label="You receive"
						tokens={tokens}
						handleSelectChange={(val) => selectSecondToken(val)}
						selectedToken={secondToken}
						inputValue={secondInputValue}
						styles={styles}
					/>

					<button
						className={styles.wallet_btn}
						onClick={() =>
							!isConnected
								? connect({ connector: connectors[0] })
								: null
						}
					>
						{isConnected ? "Swap" : "Connect wallet"}
					</button>
				</>
			) : (
				<ReactLoading
					type="spin"
					color="lightblue"
					width={40}
					height={40}
				/>
			)}
		</div>
	);
};

export default Swap;
