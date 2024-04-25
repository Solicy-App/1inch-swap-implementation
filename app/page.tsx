'use client';

import { useEffect, useState } from "react";
import { ChainId } from "@/utils/constants";
import axios1Inch from "@/utils/1inch/axiosInstance";
import { useSwap1Inch } from "@/hooks/one-inch";
import ArrowUpDown from '@/assets/images/arrow_up_down.svg';
import {metaMask, hooks} from '@/utils/connectors/metamask';

import styles from "./page.module.css";
import { useWeb3React } from "@web3-react/core";

type TokenType = {
    address: string,
    name: string,
    symbol: string,
    logoURI: string,
    eip2612: boolean,
    decimals: number
};

type PayReceiveType = {
    token?: string,
    input: string
}



const Home = () => {
    const {swap1Inch} = useSwap1Inch();
    const {isActive} = useWeb3React();
    const [selected_chain_id, setSelectedChainId] = useState<ChainId>(ChainId.ETHEREUM);
    const [tokens, setTokens] = useState<{[key: string]: TokenType}>({});
    const [pay, setPay] = useState<PayReceiveType>({
        input: "",
        token: undefined,
    });

    const [receive, setReceive] = useState<PayReceiveType>({
        input: "",
        token: undefined,
    });

    function onChangePayReceive(){
        const pay_token = pay.token;

        setPay(prev_pay => ({
            input: prev_pay.input,
            token: receive.token
        }));

        setReceive({
            input: '',
            token: pay_token
        });
    }

    function connectWalletHandler(){
        metaMask.activate({
            chainId: selected_chain_id,
            chainName: ChainId[selected_chain_id],
            nativeCurrency: {
                name: 'dollar',
                symbol: '$',
                decimals: 18
            },
            rpcUrls: []
        });
    }

    function swapHandler(){
        if(pay.token !== undefined && pay.input !== '' && receive.token !== undefined){
            swap1Inch?.(pay.token, receive.token, +pay.input);
        }
    }

    useEffect(() => {
        (async () => {
            // const result = await axios1Inch.get(`https://api.1inch.dev/swap/v6.0/${selected_chain_id}/approve/allowance`);
            const result = await axios1Inch.get(`/api?api_path=${encodeURI(`swap/v6.0/${selected_chain_id}/tokens`)}`).catch(() => {});
            if(result){
                // console.log(Object.values(result.data.tokens), Object.values(result.data.tokens)[1])
                setTokens(result.data.tokens)
            }
            else{
                setTokens({})
            }
            
        })()
        
    }, [selected_chain_id]);

    useEffect(() => {
       (async() => {
            if(pay.token !== undefined && pay.input !== '' && receive.token !== undefined){
                const result = await axios1Inch.get(`api/?api_path=${encodeURI(`swap/v6.0/${selected_chain_id}/quote?src=${pay.token}&dst=${receive.token}&amount=${+pay.input/Math.pow(10, -tokens[pay.token].decimals)}`)}`).catch(() => {});
                if(result){
                    setReceive(prev_receive => ({
                        token: prev_receive.token,
                        input: (+result.data.dstAmount/Math.pow(10, tokens[prev_receive.token!].decimals)).toFixed(tokens[prev_receive.token!].decimals)
                    }));
                }
                else{
                    setReceive(prev_receive => ({
                        token: prev_receive.token,
                        input: ''
                    }));
                }
            }
       })()
        
    }, [pay, receive.token]);

    return (
        <div className={styles.homepage}>
            <div className="wrapper">
                <div className={styles.swap_box}>
                    <div className={styles.pay_receive_boxes}>
                        <div
                            className={styles.change_pay_receive}
                            onClick={onChangePayReceive}
                        >
                            <img src={ArrowUpDown.src} alt="arrow up down" />
                        </div>
                        <div className={`${styles.pay_receive_box} ${styles.pay_box}`}>
                            <div className={styles.token_box}>
                                <span className={styles.token_box_title}>You pay</span>
                                <select
                                    value={pay.token}
                                    onChange={event => {
                                        setPay(prev_pay => ({
                                            token: event.target.value,
                                            input: prev_pay.input
                                        }));
                                    }}
                                >
                                    <option>Select a token</option>
                                    {
                                        Object.values(tokens).map(token => {
                                            if(token.address === receive.token){
                                                return null;
                                            }
                                            
                                            return (
                                                <option key={`pay_token_${token.address}`} value={token.address}>{token.symbol}</option>
                                            );
                                        })
                                    }
                                </select>
                                <span className={styles.token_full_name}>{pay.token !== undefined ? tokens[pay.token].name : ''}</span>
                            </div>
                            <div className={styles.input_box}>
                                <input
                                    type="text"
                                    value={pay.input}
                                    onChange={(event) => {
                                        let new_input = event.currentTarget.value.replace(/[^\d\.]/g, '').replace(/\.\./g, '.').replace(/^\./, '');

                                        setPay(prev_pay => ({
                                            token: prev_pay.token,
                                            input: new_input
                                        }));
                                    }}
                                />
                            </div>
                        </div>
                        <div className={styles.pay_receive_box}>
                            <div className={styles.token_box}>
                                <span className={styles.token_box_title}>You receive</span>
                                <select
                                    value={receive.token}
                                    onChange={event => {
                                        setReceive(prev_receive => ({
                                            token: event.target.value,
                                            input: prev_receive.input
                                        }));
                                    }}
                                >
                                    <option>Select a token</option>
                                    {
                                        Object.values(tokens).map(token => {
                                            if(token.address === pay.token){
                                                return null;
                                            }
                                            
                                            return (
                                                <option key={`receive_token_${token.address}`} value={token.address}>{token.symbol}</option>
                                            );
                                        })
                                    }
                                </select>
                                <span className={styles.token_full_name}>{receive.token !== undefined ? tokens[receive.token].name : ''}</span>
                            </div>
                            <div className={styles.input_box}>
                                <span>{receive.input}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottom_actions}>
                        {
                            isActive ? (
                                <div className={styles.connect_wallet_button} onClick={() => {metaMask.deactivate?.();metaMask.resetState();}}>Disconnect wallet</div>
                            ) : (
                                <div className={styles.connect_wallet_button} onClick={connectWalletHandler}>Connect wallet</div>
                            )
                        }
                        <div className={styles.chain_selector_box}>
                            <select
                                value={selected_chain_id}
                                onChange={event => {console.log(+event.target.value);setSelectedChainId(+event.target.value)}}
                            >
                                {
                                    Object.keys(ChainId).map(chain_id => {
                                        if(ChainId[+chain_id] === undefined){
                                            return;
                                        }

                                        return <option key={`chain_${chain_id}`} value={chain_id}>{ChainId[+chain_id]}</option>
                                    })
                                }
                            </select>
                        </div>
                        {

                            isActive ? (
                                <div className={styles.connect_wallet_button} onClick={swapHandler}>Swap token</div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;