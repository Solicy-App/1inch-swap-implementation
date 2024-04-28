import { http, createConfig } from "wagmi";
import {
  base,
  mainnet,
  optimism,
  arbitrum,
  aurora,
  avalanche,
  bsc,
  zkSync,
  fantom,
  gnosis,
  klaytn,
  polygon,
} from "wagmi/chains";
import { metaMask, walletConnect } from "wagmi/connectors";

const projectId = "08508b23ba34a0ac01994ed20da4d373";

export const wagmiConfig = createConfig({
  chains: [
    mainnet,
    base,
    optimism,
    arbitrum,
    aurora,
    avalanche,
    bsc,
    zkSync,
    fantom,
    gnosis,
    klaytn,
    polygon,
  ],
  ssr: true,
  connectors: [walletConnect({ projectId }), metaMask()],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [aurora.id]: http(),
    [avalanche.id]: http(),
    [bsc.id]: http(),
    [zkSync.id]: http(),
    [fantom.id]: http(),
    [gnosis.id]: http(),
    [klaytn.id]: http(),
    [polygon.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
