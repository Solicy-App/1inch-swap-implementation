'use client'

import React, {useState, useEffect} from "react";
import styles from "./swap.module.css";
import ArrowDownIcon from "@/app/ui/icons/arrowDown";
import Image from "next/image";
import {TokenDataType} from "@/app/ui/swapPage/index";
import {Button} from "@/app/ui/button";

export type SwapTokenProps = {
    state: 'pay' | 'receive',
    amount: string,
    token?: TokenDataType | undefined,
    onClick: (state: string) => void
    onInputChange: (amount: string) => void
}

export default function SwapToken({state, token, onClick, onInputChange, amount}: SwapTokenProps) {
    const [inputAmount, setInputAmount] = useState(amount)
    const handleClick = () => {
        onClick(state)
    }
    
    const handleInputChange = (e) => {
        setInputAmount(e.target.value);
        onInputChange(e.target.value);
    }
    
    useEffect(() => {
        setInputAmount(amount);
    }, [amount])
    
    return (
        <div className={styles.tokenItem}>
            <div className='token-header flex justify-between px-2 mb-1'>
                <span className={styles.smallText}>You {state}</span>
                <span className={styles.smallText}>Balance ${0}</span>
            </div>
            <div className='token-content flex justify-between'>
                {token ?
                    <button className='hover:bg-white p-2 w-auto h-9 rounded-2xl flex items-center justify-between'
                            onClick={handleClick}>
                        <div className='flex mr-2 items-center'>
                            <Image style={{height: '24px'}} alt={''} src={token?.logoURI || ''} width={24} height={24}/>
                            <span className='ml-2 text-xl' style={{color: "#222"}}>{token.symbol || ''}</span>
                        </div>
                        <ArrowDownIcon/>
                    </button>
                    :
                    <Button onClick={() => onClick(state)}
                            className="h-8 justify-between items-center bg-blue-btnLight text-blue-txtLight py-1.5 px-2 mt-2 pr-0">
                        <span className="mr-1">Select token</span><ArrowDownIcon fill="#0FC0FC"
                                                                                 style={{marginTop: "4px"}}/>
                    </Button>
                }
                <input type="text" onChange={handleInputChange} maxLength="16" value={inputAmount}
                       className={`${styles.input} ${state === 'receive' ? 'pointer-events-none' : ''} bg-transparent focus:outline-none text-xl text-right appearance-none`}/>
            </div>
            <div className='token-footer flex justify-between px-2 mt-1'>
                <span className={styles.smallText}>{token?.name}</span>
            </div>
        </div>
    );
}