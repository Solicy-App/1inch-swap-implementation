import React from "react";
import Link from "next/link";
import Logo from "@/app/ui/logo";
import ConnectButton from "@/app/ui/w3buttons";

export default function Header() {
    return (
        <header className="h-16 w-full h-24npm bg-wall pt-4">
            <div className="max-w-[1312px] mx-auto h-full flex md:flex-row justify-between items-center">
                <div className="w-2/5 flex-none">
                    <Link href="/">
                        <Logo/>
                    </Link>
                </div>
                <div className="w-3/5 flex justify-end mt-2">
                    <ConnectButton/>
                </div>
            </div>
        </header>
    );
}