"use client";

import { buildTxForSwap1Inch } from "@/utils/1inch/api";
import { calculateGasMargin } from "@/utils/calculateGasMargin";
import { ROUTER_ADDRESSES_1INCH } from "@/utils/constants";
import { generate1InchSwapParmas, getSigner } from "@/utils/helpers";
import isZero from "@/utils/isZero";
import { BigNumber } from "@ethersproject/bignumber";
import { useWeb3React } from "@web3-react/core";
import { useAccount } from "wagmi";

type useSwap1InchPropsTypes = {
	from?: string;
	to?: string;
	chainId: number;
	account: string;
	typedValue: number;
};

export const useSwap1Inch = () => {
	const { isConnected } = useAccount();
	// const router1Inch = ROUTER_ADDRESSES_1INCH[chainId];

	// if (!account) return;

	const swap1Inch = async ({
		from,
		to,
		chainId,
		account,
		typedValue,
	}: useSwap1InchPropsTypes) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const swapParams = generate1InchSwapParmas(
			//@ts-ignore
			from,
			to,
			typedValue,
			account,
			1
		);

		try {
			const swapTransaction = await buildTxForSwap1Inch(
				swapParams,
				chainId
			);

			return swapTransaction.dstAmount;
		} catch (err) {
			console.error(err);
		}

		// TO DO: Remove when change DEV plan for 1Inch (1 Request per second)
		// await new Promise((resolve) => setTimeout(resolve, 1000));

		// try {
		// 	const tx = {
		// 		from: account ?? "",
		// 		to: router1Inch,
		// 		data: swapTransaction.data,
		// 		...(swapTransaction.value && !isZero(swapTransaction.value)
		// 			? { value: swapTransaction.value.toString(16) } // Convert to Hex.If not working use toHex() from @uniswap/v3-sdk
		// 			: {}),
		// 	};
		// 	const response = await getSigner(library, account)
		// 		.estimateGas(tx)
		// 		.then((estimate: BigNumber) => {
		// 			const newTxn = {
		// 				...tx,
		// 				gasLimit: calculateGasMargin(estimate),
		// 			};

		// 			return getSigner(library, account)
		// 				.sendTransaction(newTxn)
		// 				.then((response: { hash: any }) => {
		// 					if (!response.hash) {
		// 						throw new Error(
		// 							`Your swap was modified through your wallet. If this was a mistake, please cancel immediately or risk losing your funds.`
		// 						);
		// 					}
		// 					return response;
		// 				});
		// 		});

		// 	return response;
		// } catch (err) {
		// 	console.error(err);
		// 	return;
		// }
	};

	return { swap1Inch };
};
