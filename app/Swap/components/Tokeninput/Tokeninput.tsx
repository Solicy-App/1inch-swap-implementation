"use client"
import { useEffect, useState } from 'react';
import './styles.css'
import { Select } from '../select/Select'
import { ButtonArrow } from '@/app/utils/svg';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { TokeninputProps } from '../../types';


export const Tokeninput: React.FC<TokeninputProps> = ({
  setPage,
  second,
  selectedToken,
  Change,
  price,
  loading,
  inputValue,
  result,
  selectedNetwork
}) => {
  const handleInputChange = (event: any) => {
    const rawValue = event;
    const cleanedValue = rawValue.replace(/[^0-9.]/g, '').replace(/(\..*?)\./g, '$1');
    sessionStorage.setItem("value", rawValue)
    if (!second) {
      Change(cleanedValue)
    }
  }

  useEffect(() => {
    const sessionValue = sessionStorage.getItem('value');
    if (sessionValue && !inputValue) {
      handleInputChange(sessionValue)
    }
  }, [price])

  const Price = (number: any) => {
    const formattedNumber = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
    if (number > 0) {
      return `~$${formattedNumber.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`
    }
    return
  }
  return <div id={second ? "tokeninput" : ""} className='tokeninput'>
    {selectedToken.address && <p className='font13'>{!second ? "You pay" : "You receive"}</p>}
    <div className='inputwrapper'>
      {!selectedToken.address ?
        <div className='selectTokenDiv'>
          <button onClick={(e) => setPage(true)} className='selectButton'>
            Select a token
            <ButtonArrow />
          </button>
        </div> :
        <Select selectedNetwork={selectedNetwork} second={second} name={selectedToken.symbol} img={selectedToken?.logoURI} setPage={() => setPage(false)} />
      }
      {selectedToken.address ? < div className='inputLoading'>
        {(!loading && selectedToken.address || result >= 0) ?
          <input
            disabled={second}
            maxLength={19}
            className='input'
            value={!inputValue ? "" : (second ? Number(inputValue).toFixed(3).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : inputValue?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '))}
            onChange={(e) => handleInputChange(e.target.value)}
          /> :
          <Skeleton width={"140px"} baseColor="#202020" highlightColor="#444" />
        }
      </div> :
        <input
          disabled={second}
          maxLength={19}
          className='input'
          value={0}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      }
    </div>
    {
      selectedToken.address && !second && <div className='result'>
        <p id="selectedName">{selectedToken?.name}</p>
        {result > 0 && <p>{Price(result)}</p>}
      </div>
    }
    {
      selectedToken.address && second &&
      <div className='result'>
        <p id="selectedName">{selectedToken?.name}</p>
        {!loading || result >= 0 ?
          result > 0 && <p>{Price(result)}</p> :
          <Skeleton height={10} width={"60px"} baseColor="#202020" highlightColor="#444" />
        }
      </div>
    }
  </div >
}