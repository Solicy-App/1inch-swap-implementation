'use client'

import {createWeb3Modal, defaultConfig} from '@web3modal/ethers/react'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID

// 2. Set chains
const networks = [
    {
        chainId: 1,
        name: 'Ethereum',
        currency: 'ETH',
        explorerUrl: 'https://etherscan.io',
        rpcUrl: 'https://cloudflare-eth.com'
    },
    {
        chainId: 42161,
        name: 'Arbitrum',
        currency: 'ETH',
        explorerUrl: 'https://arbiscan.io',
        rpcUrl: 'https://arb1.arbitrum.io/rpc'
    },
    {
        chainId: 250,
        name: 'Fantom',
        currency: 'FTM',
        explorerUrl: 'https://ftmscan.com',
        rpcUrl: 'https://rpcapi.fantom.network'
    },
    {
        chainId: 1,
        name: 'Base',
        currency: 'ETH',
        explorerUrl: 'https://etherscan.io',
        rpcUrl: 'https://cloudflare-eth.com'
    },
    {
        chainId: 137,
        name: 'Polygon',
        currency: 'MATIC',
        explorerUrl: 'https://explorer-mainnet.maticvigil.com',
        rpcUrl: 'https://polygon-rpc.com'
    },
    {
        chainId: 10,
        name: 'Optimism',
        currency: 'ETH',
        explorerUrl: 'https://optimistic.etherscan.io',
        rpcUrl: 'https://mainnet.optimism.io'
    },
    {
        chainId: 56,
        name: 'BNB Chain',
        currency: 'BNB',
        explorerUrl: 'https://bscscan.com',
        rpcUrl: 'https://bsc-dataseed.binance.org'
    }
];

// 3. Create a metadata object
const metadata = {
    name: '1inch Website',
    description: 'App for swapping tokens',
    url: 'http://localhost:3000/', // origin must match your domain & subdomain
    icons: []
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
    /*Required*/
    metadata,
    
    /*Optional*/
    enableEIP6963: true, // true by default
    enableInjected: true, // true by default
    enableCoinbase: true, // true by default
    rpcUrl: '...', // used for the Coinbase SDK
    defaultChainId: 1, // used for the Coinbase SDK
    enableEmail: false,
})

// 5. Create a Web3Modal instance
createWeb3Modal({
    ethersConfig,
    chains: networks,
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true, // Optional - false as default
})

export function Web3Modal({children}) {
    return children
}