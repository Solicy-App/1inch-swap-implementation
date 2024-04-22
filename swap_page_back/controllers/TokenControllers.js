import axios from "axios";
import BigNumber from "bignumber.js";

const TEN = new BigNumber(10);

const toWei = (number, decimals) =>
    new BigNumber(number).times(TEN.pow(decimals));

export const fromWei = (number, decimals) =>
    new BigNumber(number).div(TEN.pow(decimals));

export class TokenControllers {
    static getToken = async (req, res, next) => {
        try {
            const {chainId} = req.query;
            const NumChain = parseFloat(chainId)

            const response = await axios.get(`https://api.1inch.dev/swap/v6.0/${NumChain}/tokens`, {
                headers: {
                    "Authorization": "Bearer u5tpoPyfxdQgR8HfPiBbb4AlDWiUmDHT", "accept": "application/json"
                },
                params: {
                    "cf-ipcountry": "None",
                    "provider": "1inch",
                    "country": "None"
                }
            })
            res.json({
                tokens: response.data
            });
        } catch (error) {
            next(error);
        }
    };
    static swap = async (req, res, next) => {
        try {
            const {chainId} = req.query;
            const NumChain = parseFloat(chainId)
            const {from, to, amount, fromDecimal,toDecimal} = req.query;
            const amounted = toWei(amount, fromDecimal).toString()

            const response = await axios.get(`https://api.1inch.dev/swap/v6.0/${NumChain}/quote`, {
                headers: {
                    "Authorization": "Bearer u5tpoPyfxdQgR8HfPiBbb4AlDWiUmDHT", "accept": "application/json"
                },
                params: {
                    src: from,
                    dst: to,
                    amount: amounted,
                    slippage: 1
                },
            });
            const data = fromWei( response.data.dstAmount, toDecimal).toFixed(4)

            res.json({
                dstAmount: data
            });
        } catch (error) {
            next(error);
        }
    };
}

export default TokenControllers;