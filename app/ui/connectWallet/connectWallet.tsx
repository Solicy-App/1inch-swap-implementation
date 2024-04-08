'use client'

import React, {useContext, useState} from "react";
import CloseIcon from "@/app/ui/icons/close";
import {Button} from "@/app/ui/button";
import WalletItem, {walletItemData} from "@/app/ui/connectWallet/walletItem";
import {AppContext} from "@/app/page";

export type ConnectWallet = {
    open:boolean
}


export default function ConnectWallet() {
    const { setSelectedData } = useContext(AppContext);
    const handleModalClose = () => {
        setSelectedData(false);
    };

    return (
        <div className="fixed h-full w-full top-0 bg-overlay backdrop-blur-default">
            <div style={{width: '500px'}} className="modal connectModal absolute top-1/2 left-1/2 w-500 bg-white h-300 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl p-4">
                <h3 className="text-xl text-center" style={{color: "#000000de"}}>
                    Connect wallet
                </h3>
                <div className="walletItem-container flex flex-wrap justify-between mt-4">
                    {Object.keys(walletItemData).map((walletName) => <WalletItem key={walletName} className="mb-3" title={walletName}/> )}
                </div>
                <button className="absolute top-2.5 right-2.5 p-1.5" onClick={handleModalClose}>
                    <CloseIcon/>
                </button>
            </div>
        </div>
    );
}