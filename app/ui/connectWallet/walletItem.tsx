import React from 'react';
import Image from "next/image";
import styles from "./wallet.module.css";
import classNames from "classnames";
import metamask from '@/public/metamask.svg';
import cryptoCom from '@/public/crypto-com-wallet.svg';
import oneInch from '@/public/one-inch.svg';
import trustWallet from '@/public/trust-wallet.svg';
import walletConnectV2 from '@/public/wallet-connect-v2.svg';
import web3 from '@/public/web3.svg';

export const walletItemData = {
    '1inch Wallet' : oneInch.src,
    'Metamask': metamask.src,
    'Browser Wallet': web3.src,
    'Trust Wallet': trustWallet.src,
    'WalletConnect': walletConnectV2.src,
    'Crypto.com Wallet': cryptoCom.src
}

export type WalletItemProps = {
    width?: number;
    height?: number;
    title: string;
    className?: string; // Allow external className
    [key: string]: any; // Allow any other props
};

const WalletItem = ({ width = 24, height = 24, title, className, ...rest }: WalletItemProps) => {
    const walletItemClasses = classNames(styles.walletItem, className || '');
    
    return (
        <button className={walletItemClasses} {...rest}>
            <Image className="mr-1.5" width={width} height={height} src={walletItemData[title]} alt={title} />
            <span>{title}</span>
        </button>
    );
};

export default WalletItem;