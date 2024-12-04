interface Network {
  img: string;
  id: number;
  name: string;
}
export interface ComponentProps {
  openSelect: boolean,
  getTokens: (e: number) => void,
  selectedNetwork: Network,
  setSelectedNetwork: (e: Network) => void
}