export interface Token {
  address: string;
  symbol: string;
  decimals: number;
  name: string;
  logoURI: string;
  tags: string[];
}

export interface DestinationAmount {
  dstAmount: string;
}
