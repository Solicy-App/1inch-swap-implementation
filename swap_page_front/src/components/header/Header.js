import React, {useState} from 'react';
import logo from '../../assets/img/logo.webp'
import logoText from '../../assets/img/logo-text.png'
import './header.css';
import {NavLink} from "react-router-dom";
import {IoIosArrowDown} from "react-icons/io";
import {IoWalletOutline} from "react-icons/io5";
import {FaBitcoin, FaEthereum} from "react-icons/fa";
import {AiOutlineSetting} from "react-icons/ai";
import {ChainId} from "../../services/utils/defaultData";
import {SiBlockchaindotcom, SiChainlink} from "react-icons/si";
import Select from "react-select";
import {toast} from "react-toastify";

const getChainIcon = (chainName) => {
    switch (chainName) {
        case 'ETHEREUM':
            return <FaEthereum />;
        case 'BITCOIN':
            return <FaBitcoin />;
        case 'POLYGON':
            return <SiBlockchaindotcom />;
        default:
            return <SiChainlink />;
    }
};

function Header({onChainIdChange, chainid}) {

    const options = Object.keys(ChainId).map((chain) => ({
        value: ChainId[chain],
        label: chain,
        icon: getChainIcon(chain)
    }));

    const customStyles = {
        control: (provided) => ({
            ...provided,
            display: 'flex',
            alignItems: 'center',
            height: '36px',
            padding: '2px 5px 5px 2px',
            borderRadius: '12px',
            border: 'none',
            position: 'relative',
            fontSize: '16px',
            color: 'black',
            background: 'linear-gradient(73.28deg, #495bfc 6.51%, #3f85ee 88.45%)',
            marginRight: '10px',
        }),
    };

    return (
        <>
            <header>
                    <div className="header-container">
                        <nav id="navigation" className="navigation">
                            <div className="nav-header">
                                <div className="nav-brand">
                                    <img
                                        src={logo}
                                        loading="lazy"
                                        alt="Header logo"
                                        title="Header logo"
                                        className="logo"
                                    />
                                    <img
                                        src={logoText}
                                        loading="lazy"
                                        alt="Header logo"
                                        title="Header logo"
                                        className="logo-text"
                                    />
                                </div>
                            </div>
                            <div className="navbar">
                                <ul className="nav-menu">
                                    <li><NavLink to="/">Swap</NavLink></li>
                                    <li><NavLink to="/">Trade <IoIosArrowDown/></NavLink></li>
                                    <li><NavLink to="/">Dao <IoIosArrowDown/></NavLink></li>
                                    <li><NavLink to="/">More <IoIosArrowDown/></NavLink></li>
                                    <li><NavLink to="/">Bridges <IoIosArrowDown/></NavLink></li>
                                    <li><NavLink to="/">Portfolio</NavLink></li>
                                    <li><NavLink to="/">Buy Cripto</NavLink></li>
                                    <li><NavLink to="/" className="new-item">Card <button className="new-btn">New</button></NavLink></li>
                                </ul>
                                <div className="nav-buttons">
                                    <Select
                                        className="select-chain"
                                        classNamePrefix="select-chain"
                                        value={chainid}
                                        onChange={onChainIdChange}
                                        options={options}
                                        styles={customStyles}
                                        placeholder="Select a chain"
                                        isSearchable={false}
                                        getOptionLabel={(option) => (
                                            <div
                                                style={{display: 'flex', alignItems: 'center'}}>
                                                {option.icon}
                                                {option.label}
                                            </div>
                                        )}
                                    />
                                    <button className="wallet-btn" onClick={(ev) => {
                                        toast.success('Wallet Connected')}}><IoWalletOutline/> Connect Wallet</button>
                                    <AiOutlineSetting className="settings-svg" size={24} style={{cursor: 'pointer'}} />
                                </div>
                            </div>
                        </nav>
                    </div>
            </header>
        </>
    );
}

export default Header;
