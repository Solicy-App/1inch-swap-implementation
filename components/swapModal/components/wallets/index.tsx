import React, {Dispatch, SetStateAction} from "react";
import styles from "./Wallets.module.scss";
import {InjectedConnector} from "@web3-react/injected-connector";
import {useWeb3React} from "@web3-react/core";
const injected = new InjectedConnector({ supportedChainIds: [1] });
import { IoClose } from "react-icons/io5";
import metaMaskSvg from '../../../../public/wallets/meta-mask.svg'
import Image from "next/image";
const Wallets = ({setActiveTab } : {setActiveTab: Dispatch<SetStateAction<string | null>>}) => {
    const { activate } = useWeb3React();
    const connectWallet = async (connector: any) => {
        try {
            await activate(connector);
            setActiveTab(null);
        } catch (error) {
            console.error("Connection error:", error);
        }
    };
    return (
        <div className={styles.walletContainer}>
            <div className={styles.walletHeader}>
                <h2>Connect wallet</h2>
                <button className={styles.closeIcon} onClick={() => setActiveTab(null)}>
                    <IoClose/>
                </button>
            </div>

            <div className={styles.wallets}>
                <button className={styles.walletItem} onClick={() => connectWallet(injected)}>
                    <Image width={20} height={20} alt={'metaMask'} src={metaMaskSvg}/>
                    MetaMask
                </button>
            </div>
        </div>
    );
};

export default Wallets;
