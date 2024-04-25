import Token from "../interfaces/Token";

export default interface MainProps {
  tokensArray: Token[] | [];
  toToken: Token | null;
  fromToken: Token | null;
  changeToken: (changedToken: Token) => void;
  amount: number;
  showTokensPanel: boolean;
  showTokens: (id?: "fromtoken" | "totoken") => void;
  changeAmount: (amount: number) => void;
  isDisconnected: boolean,
  toDollarPerToken: number,
  chainId: number,
  fromDollarPerToken: number,
  balance: number | null,
  insufficientBallance: boolean,
  swap1Inch: (chainId: number, typedValue: number, from: string, to: string) => Promise<{ hash: any }>
}