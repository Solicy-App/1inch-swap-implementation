"use server";

import { TokenDataType } from "@/app/page";
import axios1Inch from "@/utils/1inch/axiosInstance";
import { ChainId } from "@/utils/constants";

export async function getTokens(chainId: ChainId) {
    try {
        // const {data} = await axios1Inch.get('swap/v5.2/1/tokens');
        const {data} = await axios1Inch.get(`token/v1.2/${chainId}`);
        console.log('DATA-->', data);

        // const {tokens} = data;
        return Object.values(data).map(({address, name, logoURI, symbol}: any) => ({
            address,
            name,
            logoURI,
            symbol,
        })) as TokenDataType[];
    } catch (e) {
        console.error(e);
    }

}