import Token from "./Token";

export default interface AppState {
  chain: number,
  amount: number,
  tokensArray: Token[],
  fromToken: Token | null,
  toToken: Token | null,
  fromDollarPerToken: number,
  toDollarPerToken: number,
  showTokensPanel: boolean,
  loading: boolean,
  changingTokenID: "fromtoken" | "totoken" | null,
  address: `0x${string}` | undefined,
  insufficientBallance: boolean
};