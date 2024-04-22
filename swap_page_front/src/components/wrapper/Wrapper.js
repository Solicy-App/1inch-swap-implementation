import React, {useState} from 'react';
import './wrapper.css';
import Header from "../header/Header";
import Footer from "../footer/Footer";
import SwapPage from "../../pages/SwapPage";

function Wrapper(props) {
    const [chainId, setChainId] = useState('');

    const handleChainIdChange = (chainId) => {
        setChainId(chainId);
    };
  return (
   <>
     <Header onChainIdChange={handleChainIdChange} chainid={chainId}/>
       <SwapPage chainId={chainId.value} />
     <Footer/>
   </>
  );
}

export default Wrapper;
