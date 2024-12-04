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

export const default1InchRouterAddress = '0x111111125421ca6dc452d289314280a0f8842a65'

export const ROUTER_ADDRESSES_1INCH = {
  [ChainId.ARBITRUM]: default1InchRouterAddress,
  [ChainId.FANTOM]: default1InchRouterAddress,
  [ChainId.BASE]: default1InchRouterAddress,
  [ChainId.POLYGON]: default1InchRouterAddress,
  [ChainId.ETHEREUM]: default1InchRouterAddress,
  [ChainId.OPTIMISM]: default1InchRouterAddress,
  [ChainId.BSC]: default1InchRouterAddress,
}


export const NETWORKS = [
  {
    img: 'https://app.1inch.io/assets/images/network-logos/ethereum.svg',
    id: 1,
    name: 'Ethereum',
  },
  {
    img: 'https://app.1inch.io/assets/images/network-logos/bsc_2.svg',
    id: 56,
    name: 'BNB Chain',

  },
  {
    img: 'https://app.1inch.io/assets/images/network-logos/polygon_1.svg',
    id: 137,
    name: 'Polygon',

  },
  {
    img: 'https://app.1inch.io/assets/images/network-logos/gnosis.svg',
    id: 100,
    name: 'Gnosis Chain',

  },
  {
    img: 'https://app.1inch.io/assets/images/network-logos/avalanche.svg',
    id: 43114,
    name: 'Avalanche',

  },
  {
    img: 'https://app.1inch.io/assets/images/network-logos/fantom.svg',
    id: 250,
    name: 'Fantom',

  },
  {
    img: 'https://app.1inch.io/assets/images/network-logos/aurora.svg',
    id: 1313161554,
    name: 'Aurora',

  },
  {
    img: 'https://app.1inch.io/assets/images/network-logos/kaia.svg',
    id: 42161,
    name: 'Kaia',
  },
]
