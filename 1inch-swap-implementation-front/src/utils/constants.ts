export enum ChainId {
  ETHEREUM = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42,
  POLYGON = 137,
  POLYGON_TESTNET = 80001,
  FANTOM = 250,
  FANTOM_TESTNET = 4002,
  XDAI = 100,
  BSC = 56,
  BSC_TESTNET = 97,
  ARBITRUM = 42161,
  MOONBASE = 1287,
  AVALANCHE = 43114,
  FUJI = 43113,
  HECO = 128,
  HECO_TESTNET = 256,
  METIS = 1088,
  CRONOS = 25,
  OPTIMISM = 10,
  BOBA = 288,
  TOMBCHAINTESTNET = 863,
  TOMB = 6969,
  BASE = 8453,
  LIF3CHAIN_TESTNET = 1811,
}

export const default1InchRouterAddress =
  "0x111111125421ca6dc452d289314280a0f8842a65";

export const ROUTER_ADDRESSES_1INCH = {
  [ChainId.ARBITRUM]: default1InchRouterAddress,
  [ChainId.FANTOM]: default1InchRouterAddress,
  [ChainId.BASE]: default1InchRouterAddress,
  [ChainId.POLYGON]: default1InchRouterAddress,
  [ChainId.ETHEREUM]: default1InchRouterAddress,
  [ChainId.OPTIMISM]: default1InchRouterAddress,
  [ChainId.BSC]: default1InchRouterAddress,
};

export const walletOptions = [
  {
    name1: "1inch Wallet",
    icon1: "https://app.1inch.io/assets/images/wallet-logos-new/one-inch.svg",
    name2: "Browser Wallet",
    icon2: "https://app.1inch.io/assets/images/wallet-logos-new/web3.svg",
  },
  {
    name1: "Trust Wallet",
    icon1:
      "https://app.1inch.io/assets/images/wallet-logos-new/trust-wallet.svg",
    name2: "WalletConnect",
    icon2:
      "https://app.1inch.io/assets/images/wallet-logos-new/wallet-connect-v2.svg",
  },
  {
    name1: "Crypto.com Wallet",
    icon1:
      "https://app.1inch.io/assets/images/wallet-logos-new/crypto-com-wallet.svg",
    name2: "Coinbase Wallet",
    icon2:
      "https://app.1inch.io/assets/images/wallet-logos-new/wallet-link.svg",
  },
];
