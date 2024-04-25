export default interface HeaderProps {
  changeChain: (chainID: number) => void,
  chain: number,
  balance: number | null,
  isDisconnected: boolean
}