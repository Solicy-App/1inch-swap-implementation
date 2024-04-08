import React, {useContext} from "react";
import Link from "next/link";
import Logo from "@/app/ui/logo";
import {Button} from "@/app/ui/button";
import WalletIcon from "@/app/ui/icons/wallet";
import {AppContext} from "@/app/page";
import { ChainId, ROUTER_ADDRESSES_1INCH } from "@/utils/constants";
import { MenuItem, Select } from '@mui/material';

export default function Header() {
    const { selectedToken, setSelectedToken, setSelectedData } = useContext(AppContext);
    const handleModalOpen= () => {
        setSelectedData(true);
    };

    return (
        <header className="h-16 w-full h-24npm bg-wall">
            <div className="max-w-[1312px] mx-auto w-100-96px h-full flex md:flex-row justify-between items-center">
                <div className="w-2/5 flex-none">
                    <Link href="/">
                        <Logo/>
                    </Link>
                </div>
                <div className="w-3/5 flex justify-end">
                    <Select
                        value={selectedToken}
                        style={{width: '100px'}}
                        onChange={(e) => setSelectedToken(e.target.value as ChainId)}
                    >
                        {Object.keys(ROUTER_ADDRESSES_1INCH).map((token) => (
                            <MenuItem key={token} value={token}>
                                {token}
                            </MenuItem>
                        ))}
                    </Select>
                    <Button className="h-9 bg-blue-btnLight text-blue-txtLight py-1.5 px-2" onClick={handleModalOpen}>
                        <WalletIcon className="mr-2"/>
                        Connect wallet
                    </Button>
                </div>
            </div>
        </header>
    );
}