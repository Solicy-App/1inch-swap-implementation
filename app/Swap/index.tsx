"use client"
import './styles.css'
import { Tokeninput } from './components/Tokeninput/Tokeninput'
import { Header } from './components/Heade/Hearder'
import { useEffect, useState } from 'react'
import { DownSvg, WalletSvg } from '../utils/svg'
import { useAccount } from 'wagmi'
import { useSwap1Inch } from '@/hooks/one-inch'
import { NETWORKS } from '@/utils/constants'
import { ComponentProps } from './types'


const Swap: React.FC<ComponentProps> = ({
  setPage,
  handleClick,
  selectedToken,
  setActive,
  price1,
  price2,
  loading,
  ChangeDirection,
}) => {

  const { swap1Inch } = useSwap1Inch() || {};
  const [value1, setValue1] = useState<number>(1)
  const [value2, setValue2] = useState<number>(0)
  const [kayf, setKayf] = useState(2)

  const [isRotated, setIsRotated] = useState(false);

  useEffect(() => {
    let kayficent = price1 / price2
    setKayf(kayficent)
    setValue2(value1 * kayficent)
  }, [price1, price2])

  const { isConnected } = useAccount();



  const Change = (e: number) => {
    setValue1(e)
    setValue2(e * kayf)
  }

  return <div className='main'>
    <Header />
    <div className='TokeninputWrapper'>
      <Tokeninput
        inputValue={value1}
        price={price1}
        result={value1 * price1}
        Change={(e: number) => Change(e)}
        selectedNetwork={NETWORKS.find(item => item.id === selectedToken[0].chainId)}
        selectedToken={selectedToken[0]}
        setPage={() => {
          setPage(false)
          setActive(0)
        }} />
      <div
        style={{
          display: "inline-block",
          cursor: "pointer",
          transform: isRotated ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.3s ease",
        }}
        onClick={() => {
          if (Object.keys(selectedToken[1]).length) {
            setKayf(1 / kayf)
            ChangeDirection()
            setValue1(value2)
            setValue2(value1)
            setIsRotated(!isRotated)
          }
        }}
        className='swapDirectionArrow'
      >
        <DownSvg />
      </div>
      <Tokeninput
        inputValue={value2 || 0}
        selectedToken={selectedToken[1]}
        loading={loading}
        selectedNetwork={NETWORKS.find(item => item.id === selectedToken[1].chainId)}
        result={value2 * price2}
        Change={(e: number) => Change(e)}
        second={true}
        setPage={() => {
          setPage(false)
          setActive(1)
        }} />
    </div>
    <div>

      {isConnected === null ? (
        // Default content for SSR (same on client & server)
        <button className="button">Connecting...</button>
      ) : isConnected ? (
        <button onClick={() => swap1Inch(selectedToken[0].address, selectedToken[1].address, value1)} className="button">
          Swap
        </button>
      ) : (
        <button onClick={() => handleClick()} className="button">
          <WalletSvg /> Connect wallet
        </button>
      )}
    </div>
  </div>
}

export default Swap