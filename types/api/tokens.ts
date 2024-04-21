export interface ITokenMeta {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI: string;
  domainVersion?: string;
  eip2612: boolean;
  isFoT: boolean;
  tags: string[];
}

interface ITokenData {
  [key: string]: ITokenMeta;
}

export interface ISwapTokenData {
  tokens: ITokenData;
}
