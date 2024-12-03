'use client';

import { Web3ReactProvider } from '@web3-react/core';
import {getLibrary} from "@/utils/getLibrary";
import {Swap} from "@/components/swap";

export default function SwapPage() {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Swap />
        </Web3ReactProvider>
    );
}
