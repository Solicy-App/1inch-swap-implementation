import styles from "./InputGroup.module.scss";
import React, {Dispatch} from "react";
import {MdKeyboardArrowDown} from "react-icons/md";
import {MdKeyboardArrowRight} from "react-icons/md";
import {Token} from "@/components/swapModal";

interface InputGroupProps {
    token: Token | null,
    activeTab: string | null,
    selectToken: () => void,
    setTypedValue?: Dispatch<React.SetStateAction<number>>,
    value: number,
}
export const InputGroup = ({token, selectToken, activeTab, setTypedValue, value}: InputGroupProps) => {
    const changeValue = (value: any) => {
        if (!isNaN(+value) && setTypedValue) {
            setTypedValue(value)
        }
    }
    return (
        <div className={`${styles.inputGroup} ${activeTab === 'to' && styles.toInputGroup}`}>
            {token && (<label>You pay</label>)}
            <div className={styles.inputRow}>
                {token ? (
                    <>
                        <div className={styles.currencyInfo} onClick={selectToken}>
                            <img
                                src={token.logoURI}
                                alt={token.symbol}
                                className={styles.icon}
                            />
                            <div className={styles.infoBlock}>
                                <div className={styles.symbol}>
                                    <span className={styles.symbolName}>{token.symbol}</span>
                                    <MdKeyboardArrowRight size={20}/>
                                </div>
                                <span className={styles.chainInfo}>{token.symbol}</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <button className={styles.selectToken} onClick={selectToken}>
                        <span>Select a token</span>
                        <MdKeyboardArrowDown size={18}/>
                    </button>
                )}

                <input disabled={activeTab === 'to'} value={value} onChange={(e) => changeValue(e.target.value)}/>

            </div>
            {token && (
                <div className={styles.inputRow}>
                    <label>BNB</label>
                    <p className={styles.subInfo}>~$326,098 (-1.11%)</p>
                </div>
            )}
        </div>
    )
}