import arbitrum from '@/public/nets/arbitrum.svg';
import base from '@/public/nets/base.svg';
import binance from '@/public/nets/binance-light_2.svg';
import ethereum from '@/public/nets/ethereum.svg';
import fantom from '@/public/nets/fantom.svg';
import optimism from '@/public/nets/optimism.svg';
import polygon from '@/public/nets/polygon_1.svg';

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

export const ROUTER_NET_INFO = {
    [ChainId.ARBITRUM]: {name: 'Arbitrum', img: arbitrum.src, color: '#275d83'},
    [ChainId.FANTOM]: {name: 'Fantom', img: fantom.src, color: '#1b09c0'},
    [ChainId.BASE]: {name: 'Base', img: base.src, color: '#1b09c0'},
    [ChainId.POLYGON]: {name: 'Polygon', img: polygon.src, color: '#aa0db0'},
    [ChainId.ETHEREUM]: {name: 'Ethereum', img: ethereum.src, color: '#147e9f'},
    [ChainId.OPTIMISM]: {name: 'Optimism', img: optimism.src, color: '#d02b2b'},
    [ChainId.BSC]: {name: 'BNB Chain', img: binance.src, color: 'rgba(59,59,59,0.81)'}
}
