import { ClearSvg, Logo, MetaMask } from '@/app/utils/svg'
import './styles.css'
import { useAccount, useChainId, useConnect } from 'wagmi';
import { useEffect, useState } from 'react';
import { ComponentProps, ConnectorButtonProps } from './types';




export const ConnetWallet: React.FC<ComponentProps> = ({ handleClick }) => {

  const chainId = useChainId();
  const { connectors, connect } = useConnect()
  const { isConnected } = useAccount();


  useEffect(() => {
    if (isConnected) {
      handleClick(false)
    }
  }, [isConnected])



  function ConnectorButton({ connector, onClick }: ConnectorButtonProps) {
    const [ready, setReady] = useState(false);
    useEffect(() => {
      (async () => {
        const provider = await connector.getProvider();
        setReady(!!provider);
      })();
    }, [connector, setReady]);


    if (connector.name == 'MetaMask' || connector.name == 'WalletConnect')
      return (
        <button disabled={!ready} style={{ marginBottom: 10 }} onClick={() => {
          onClick()
        }} className='walletItem'>
          {connector.name == 'MetaMask' ? <MetaMask /> : <Logo />}
          <p>{connector.name}</p>
        </button>
      );

  }


  return <div className='connetWallet'>
    <div className='connetWalletHeader'>
      <p>Connect wallet</p>
      <div onClick={() => handleClick(false)} className='connetWalletClose'>
        <ClearSvg color='white' size="30px" />
      </div>
    </div>
    <div className='walletItemWrapper'>
      {connectors.map((connector) => {
        return <ConnectorButton
          key={connector.uid}
          connector={connector}
          onClick={() => connect({ connector, chainId })}
        />
      })}
    </div>

    <div className='termsofuse'>
      <p>By connecting your wallet, you agree to our</p> <span>&nbsp;</span>
      <span>Terms of Use</span>
      <span>&nbsp;</span>
      and
      <span>&nbsp;</span>
      <span>Privacy Policy</span>
    </div>
  </div>
}