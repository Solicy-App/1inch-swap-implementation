'use client';

import { Web3ReactProvider } from "@web3-react/core";
import {metaMask, hooks} from '@/utils/connectors/metamask';
import { PropsWithChildren } from "react";

const RootTemplate: React.FC<PropsWithChildren> = ({children}) =>{
    return <Web3ReactProvider connectors={[[metaMask, hooks]]}>
        {children}
    </Web3ReactProvider>
}

export default RootTemplate;