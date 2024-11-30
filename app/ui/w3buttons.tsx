'use client'
import {useWeb3Modal} from '@web3modal/ethers/react'
import {Button} from "@/app/ui/button";
import WalletIcon from "@/app/ui/icons/wallet";
import {useWeb3ModalAccount} from '@web3modal/ethers/react'
import Image from "next/image";
import {ROUTER_NET_INFO} from "@/utils/constants";

export default function ConnectButton({isInHeader = true}) {
    const {open} = useWeb3Modal()
    const {chainId: chainIdFromAccount, isConnected} = useWeb3ModalAccount()
    const chainId = chainIdFromAccount || 1;
    
    return (
        <>
            {chainId && ROUTER_NET_INFO[chainId] && isInHeader ?
                <Button className={`h-9 ${ROUTER_NET_INFO[chainId]['colorClass']} text-blue-txtLight py-1.5 px-2 mr-2`}
                        onClick={() => open({view: 'Networks'})} style={{backgroundColor: ROUTER_NET_INFO[chainId]['color']}}>
                    <Image style={{height: '24px'}} alt={ROUTER_NET_INFO[chainId]['name']}
                           src={ROUTER_NET_INFO[chainId]['img']} width={24} height={24}/>
                    <span className='ml-2 text-base text-white'>{ROUTER_NET_INFO[chainId]['name']}</span>
                </Button>
                : null
            }
            <Button className={`${isInHeader? 'h-9': 'h-10 mt-2 w-full'} bg-blue-btnLight text-blue-txtLight py-1.5 px-2`} onClick={() => open()}>
                <WalletIcon className="mr-2"/>
                {isConnected && 'Connected'}
                {!isConnected && 'Connect Wallet'}
            </Button>
        </>
    )
}