import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {TbReload} from "react-icons/tb";
import {VscSettings} from "react-icons/vsc";
import {PiWalletBold} from "react-icons/pi";
import styles from "../../SwapModal.module.scss";
import {InputGroup} from "@/components/swapModal/components/inputGroup/InputGroup";
import {useWeb3React} from "@web3-react/core";
import {getQuote} from "@/utils/1inch/api";
import {useSwap1Inch} from "@/hooks/one-inch";
import {Token} from "@/components/swapModal";


interface SwapSectionProps {
    setActiveTab: Dispatch<SetStateAction<string | null>>,
    fromToken: Token | null,
    toToken: Token | null,
}

const SwapSection = ({setActiveTab, fromToken, toToken}: SwapSectionProps) => {
    const {account, active} = useWeb3React();
    const [typedValue, setTypedValue] = useState(0);
    const { swap1Inch } = useSwap1Inch();

    const swap = async () => {
        if (swap1Inch && fromToken && toToken) {
            await swap1Inch(fromToken?.address, toToken?.address, typedValue);
        } else {
            console.error("swap1Inch is undefined");
        }
    };

    useEffect(() => {
        if (fromToken && toToken && typedValue) {
            getQuote({
                chainId: 1,
                amount: typedValue,
                walletAddress: account || '',
                dstTokenAddress: toToken.address,
                enableEstimate: true,
                srcTokenAddress: fromToken.address
            }).then(res => {
                console.log(8888888888, res);
            })
        }
    }, [fromToken, toToken, typedValue])
    return (
        <div>
            <header className={styles.header}>
                <div className={styles.tabs}>
                    <button className={`${styles.tab} ${styles.active}`}>Swap</button>
                    <button className={styles.tab} disabled>Limit</button>
                </div>
                <div className={styles.tabs}>
                    <button className={styles.settingsIcon} disabled>
                        <TbReload/>
                    </button>
                    <button className={styles.settingsIcon} disabled>
                        <VscSettings/>
                    </button>
                </div>
            </header>

            <div className={styles.body}>
                <InputGroup activeTab={'from'} token={fromToken} selectToken={() => setActiveTab('from')} setTypedValue={setTypedValue} value={typedValue}/>

                <InputGroup activeTab={'to'} token={toToken} selectToken={() => setActiveTab('to')} value={typedValue * 5}/>

                <footer className={styles.footer}>
                    <p className={styles.rate}>1 BNB = 653.525 USDT.e ~ $652.2</p>
                    {active && account ? (
                        <button className={styles.connectWallet} onClick={swap}>
                            <span>Swap</span>
                        </button>
                    ) : (
                        <button className={styles.connectWallet} onClick={() => setActiveTab('connect-wallet')}>
                            <PiWalletBold size={24}/>
                            <span>Connect Wallet</span>
                        </button>
                    )}
                </footer>
            </div>


        </div>
    );
};

export default SwapSection;
