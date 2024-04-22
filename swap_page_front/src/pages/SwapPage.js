import React, {useEffect, useState} from 'react';
import Wrapper from "../components/wrapper/Wrapper";
import {IoWalletOutline} from "react-icons/io5";
import {MdOutlineRefresh} from "react-icons/md";
import {AiOutlinePlus, AiOutlineSwap} from "react-icons/ai";
import {RiListSettingsFill} from "react-icons/ri";
import axios from "axios";
import Select from 'react-select';
import {toast} from "react-toastify";

const {REACT_APP_1INCH_BASE_URL} = process.env;

function SwapPage(props) {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [dstValue, setDstValue] = useState(0);
    const [fromDecimal, setFromDecimal] = useState(0);
    const [toDecimal, setToDecimal] = useState(0);
    const [tokens, setTokens] = useState([]);
    const [fromName, setFromName] = useState('');
    const [toName, setToName] = useState('');
    const [chain, setChain] = useState();

    useEffect(() => {
        if (props?.chainId) {
            getData(props?.chainId)
            setChain(props?.chainId);
        }
    }, [props?.chainId]);
    const getData = async (chainId) => {
        try {
            if (chainId) {
                const response = await axios.get(`${REACT_APP_1INCH_BASE_URL}/tokens/getTokens`, {
                    params: {
                        chainId
                    }
                });
                if (response?.data && response?.data?.tokens) {
                    setTokens(response?.data?.tokens?.tokens);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const options = tokens
        ? Object.keys(tokens).map((tokenAddress) => ({
            value: tokenAddress,
            decimal: tokens[tokenAddress].decimals,
            label: tokens[tokenAddress].symbol,
            name: tokens[tokenAddress].name,
            imageUrl: tokens[tokenAddress].logoURI,
        }))
        : [];

    const swapFunction = async (value) => {
        try {
            if (value && from && to && chain) {
                const response = await axios.get(`${REACT_APP_1INCH_BASE_URL}/tokens/swap`, {
                    params: {
                        from,
                        to,
                        amount: value,
                        fromDecimal,
                        toDecimal,
                        chainId: chain
                    }
                });
                if (response?.data?.dstAmount) {
                    setDstValue(response?.data?.dstAmount)
                }
            } else {
                if (!chain) {
                    toast.error('Please select a chain')
                } else {
                    toast.error('Please select all fields')
                }
            }
        } catch (e) {
            console.error('Error fetching swap function');
        }
    }

    const handleSwap = async (value) => {
        try {
            if (value) {
                swapFunction(value);
            } else {
                setDstValue(0);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="swap-container">
            <div className="swap-header">
                <div>
                    <strong>Swap</strong>
                    <strong className="color-label">Limit</strong>
                </div>
                <div>
                    <strong><MdOutlineRefresh size={22}/></strong>
                    <strong><AiOutlinePlus size={22}/></strong>
                    <strong><RiListSettingsFill size={22}/></strong>
                </div>
            </div>

            <div className="input-group-you">
                <label htmlFor="amount-in">You pay</label>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Select
                        className="select-token"
                        classNamePrefix="select-token"
                        options={options}
                        onChange={(selectedOption) => {
                            setFrom(selectedOption.value)
                            setFromName(selectedOption.name)
                            setFromDecimal(selectedOption.decimal)
                        }}
                        getOptionLabel={(option) => (
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <img
                                    src={option.imageUrl}
                                    alt={option.label}
                                    style={{width: '30px', marginRight: '10px'}}
                                />
                                {option.label}
                            </div>
                        )}
                        getOptionValue={i => i.value}
                    />
                    <input type="text" id="amount-in" placeholder="0"
                           onChange={(ev) => {
                               handleSwap(ev.target.value)
                           }}/>
                </div>
                <label>{fromName}</label>
            </div>
            <div className="input-group-amount">
                <label htmlFor="amount-out">You receive</label>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Select
                        className="select-token"
                        classNamePrefix="select-token"
                        options={options}
                        onChange={(selectedOption) => {
                            setTo(selectedOption.value)
                            setToName(selectedOption.name)
                            setToDecimal(selectedOption.decimal)
                        }}
                        getOptionLabel={(option) => (
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <img
                                    src={option.imageUrl}
                                    alt={option.label}
                                    style={{width: '30px', marginRight: '10px'}}
                                />
                                {option.label}
                            </div>
                        )}
                        getOptionValue={i => i.value}
                    />
                    <input type="text" id="amount-out" placeholder="0" readOnly value={dstValue ? dstValue : ''}/>
                </div>
                <label>{toName}</label>
            </div>
            <div className="action-buttons">
                {/*<button className="swap-button"*/}
                {/*        onClick={handleSwap}>*/}
                {/*    <AiOutlineSwap/>*/}
                {/*    Swap*/}
                {/*</button>*/}
                <button className="connect-wallet" onClick={(ev) => {
                    toast.success('Wallet Connected')
                }}><IoWalletOutline/> Connect Wallet
                </button>
            </div>
        </div>
    );
}

export default SwapPage;