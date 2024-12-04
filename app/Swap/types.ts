type Token = {
  address: string;
  chainId: number;
  decimals: number;
  eip2612: boolean;
  isFoT: boolean;
  logoURI: string;
  name: string;
  providers: string[];
  symbol: string;
  tags: string[];
};

export interface ComponentProps {
  setPage: (page: boolean) => void;
  handleClick: () => void;
  selectedToken: Token[];
  setActive: (page: number) => void;
  price1: number;
  price2: number;
  loading: boolean;
  ChangeDirection: () => void;
}
interface SelectedNetwork {
  img: string;
  name: string;
}
export interface TokeninputProps {
  setPage: (page: boolean) => void;
  img: string,
  name: string,
  second: boolean,
  selectedToken: any,
  Change: (e: number) => void,
  price: number,
  loading: boolean,
  inputValue: number,
  result: number,
  selectedNetwork: SelectedNetwork
}


export interface SelectProps {
  setPage: (page: boolean) => void;
  img: string,
  name: string,
  second: boolean,
  selectedNetwork: SelectedNetwork
}
