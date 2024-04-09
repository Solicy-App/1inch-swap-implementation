import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const WalletLinkConnecttor = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/`,
  appName: "web3-react-demo",
});

export const WalletConnector = new WalletConnectConnector({
  rpc: {
    1: "https://mainnet.infura.io/v3/",
    4: "https://rinkeby.infura.io/v3/",
  },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});
