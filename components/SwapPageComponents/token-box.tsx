import { Token } from "@/utils/types";
import React from "react";

type TokenBoxPropsTypes = {
	tokens: Array<Token>;
	handleSelectChange: (val: string) => void;
	handleInputChange?: (val: number) => void;
	selectedToken: Token | undefined;
	inputValue: number | undefined;
	styles: any;
	label: string;
};

const TokenBox = ({
	tokens,
	handleSelectChange,
	handleInputChange,
	selectedToken,
	inputValue,
	styles,
	label,
}: TokenBoxPropsTypes) => {
	return (
		<div className={styles.block}>
			<div className={styles.left}>
				<span className={styles.title}>{label}</span>

				<div className={styles.select_container}>
					<img
						className={styles.logo}
						src={selectedToken?.logoURI}
						alt="logo"
					/>
					<select
						className={styles.select}
						onChange={({ target }) =>
							handleSelectChange(target.value)
						}
						value={JSON.stringify(selectedToken)}
					>
						{tokens.map((token, index) => (
							<option key={index} value={JSON.stringify(token)}>
								{token.symbol}
							</option>
						))}
					</select>
				</div>

				<span className={styles.title}>{selectedToken?.name}</span>
			</div>

			<div className={styles.right}>
				<input
					type="number"
					value={inputValue?.toString()}
					onChange={({ target }) =>
						handleInputChange
							? handleInputChange(Number(target.value))
							: null
					}
				/>
			</div>
		</div>
	);
};

export default TokenBox;
