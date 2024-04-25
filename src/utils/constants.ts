export enum ChainId {
    ETHEREUM = 1,
    ARBITRUM = 42161,
    OPTIMISM = 10,
    ZKSYNC_ERA = 324,
    BASE = 8453,
    BSC = 56,
    POLYGON = 137,
    GNOSIS = 100,
    AVALANCHE = 43114,
    FANTOM = 250,
    KLAYTN = 8217,
    AURORA = 1313161554
}

export const default1InchRouterAddress = '0x111111125421ca6dc452d289314280a0f8842a65';

export const ROUTER_ADDRESSES_1INCH = {
    [ChainId.ETHEREUM]: default1InchRouterAddress,
    [ChainId.ARBITRUM]: default1InchRouterAddress,
    [ChainId.OPTIMISM]: default1InchRouterAddress,
    [ChainId.ZKSYNC_ERA]: default1InchRouterAddress,
    [ChainId.BASE]: default1InchRouterAddress,
    [ChainId.BSC]: default1InchRouterAddress,
    [ChainId.POLYGON]: default1InchRouterAddress,
    [ChainId.GNOSIS]: default1InchRouterAddress,
    [ChainId.AVALANCHE]: default1InchRouterAddress,
    [ChainId.FANTOM]: default1InchRouterAddress,
    [ChainId.KLAYTN]: default1InchRouterAddress,
    [ChainId.AURORA]: default1InchRouterAddress
};