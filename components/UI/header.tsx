"use client";

import React, { useContext } from "react";
import { ChainId, ROUTER_ADDRESSES_1INCH } from "@/utils/constants";
import { ChainContext, ChainContextType } from "@/contexts/chain-context";

import styles from "../../styles/UI/header.module.scss";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const Header = () => {
	const chains = ROUTER_ADDRESSES_1INCH;
	const { setChain } = useContext<ChainContextType>(ChainContext);
	const { address, isConnected } = useAccount();
	const { connectors, connect } = useConnect();
	const { disconnect } = useDisconnect();

	const auth = () => {
		if (isConnected) {
			disconnect();
			return;
		}
		connect({ connector: connectors[0] });
	};

	return (
		<header className={styles.header}>
			<select
				className={styles.header_btn}
				onChange={({ target }) => setChain(Number(target.value))}
			>
				{Object.keys(chains).map((id: any, index: number) => (
					<option key={index} value={id}>
						{ChainId[id]}
					</option>
				))}
			</select>

			<button className={styles.header_btn} onClick={auth}>
				{isConnected ? "Disconnect" : "Connect wallet"}
			</button>
		</header>
	);
};

export default Header;
