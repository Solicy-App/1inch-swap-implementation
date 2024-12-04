"use client"
import Swap from './Swap'
import SelectDestinationToken from './SelectDestinationToken/index'
import { useEffect, useState } from 'react';
import { ConnetWallet } from './Components/ConnectWallet/index'
import { config } from '@/config/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';


type Token = {
  address: string;
  chainId: number;
  decimals: number;
  eip2612: boolean;
  isFoT: boolean;
  logoURI: string;
  name: string;
  providers: string[];
  symbol: string;
  tags: string[];
};

export default function Home() {

  const [selectedToken, setSelectedToken] = useState<Token[]>([
    {
      address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      chainId: 1,
      decimals: 18,
      eip2612: false,
      isFoT: false,
      logoURI: "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
      name: "Ether",
      providers: [
        "1inch",
        "Curve Token List"
      ],
      symbol: "ETH",
      tags: [
        "GROUP:ETH",
        "native",
        "PEG:ETH"
      ]
    },
    {
      address: "",
      chainId: 0,
      decimals: 0,
      eip2612: false,
      isFoT: false,
      logoURI: "",
      name: "",
      providers: [
      ],
      symbol: "",
      tags: [
      ]
    },
  ])
  const [active, setActive] = useState(0)
  const [page, setPage] = useState(true)
  const [price1, setPrice1] = useState<number>(0)
  const [price2, setPrice2] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false);
  const handleClick = (type: boolean) => {
    setIsVisible(type)
  };

  const Select = (e: any) => {
    let item = [...selectedToken]
    item[active] = e
    GetPrice(item[active]?.chainId, e.address, active)
    setSelectedToken(item)
  }



  const GetPrice = async (network: number, token: string, type: number) => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/price/v1.1/${network}/${token}?currency=USD`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer oYtJS37LUR9zy6jylTaeVKlpGZrRffE9',
        },
      });
      const result = await response.json();
      const values = Object.values(result);
      setLoading(false)
      if (type == 0) {
        if (typeof Number(values[0]) === 'number') {
          setPrice1(Number(values[0]))
          // setPrice1(Object.values(result)[0])
        }
      }
      else {
        if (typeof Number(values[0]) === 'number') {
          setPrice2(Number(values[0]))
        }
      }
    } catch (err) {
    }
  };


  useEffect(() => {
    const timeout = setTimeout(() => {
      GetPrice(selectedToken[0]?.chainId, selectedToken[0]?.address, 0)
    }, 1000);
    const timeout2 = setTimeout(() => {
      if (selectedToken[1]?.address) {
        GetPrice(selectedToken[1]?.chainId, selectedToken[1]?.address, 1)
      }
    }, 3000);
    return () => {
      clearTimeout(timeout)
      clearTimeout(timeout2)
    };
  }, []);



  const ChangeDirection = () => {
    let item = [selectedToken[1], selectedToken[0]]
    setPrice1(price2)
    setPrice2(price1)
    setSelectedToken(item)
  }


  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className='connetWalletWrapper' id={isVisible ? "connetWallet" : ''}>
          <ConnetWallet handleClick={(e: boolean) => handleClick(e)} />
        </div>
        <div className='page'>
          {page ?
            <Swap
              loading={loading}
              price1={price1}
              price2={price2 ? price2 : 0}
              setActive={(e: number) => setActive(e)}
              selectedToken={selectedToken}
              handleClick={() => handleClick(!isVisible)}
              setPage={(e: boolean) => setPage(e)}
              ChangeDirection={() => ChangeDirection()}
            /> :
            <SelectDestinationToken
              setSelectedToken={(e: object) => {
                Select(e)
                setPage(true)
              }}
              setPage={(e: boolean) => setPage(e)}
            />
          }
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}