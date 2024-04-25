export default interface Token {
  address: string;
  symbol: string;
  decimals: number;
  name: string;
  logoURI: string;
  tags: string[];
}