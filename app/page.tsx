'use client'


import React, { useState } from 'react';
import axios from 'axios';

function Swap() {
  const [fromToken, setFromToken] = useState('');
  const [toToken,setToToken] = useState('');
  const [amount, setAmount] = useState(0);
  const [swapData, setSwapData] = useState(null);
  const [error, setError]:any = useState(null);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/swap', {
        fromToken,
        toToken,
        amount,
      });

      setSwapData(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching swap data:', error);
      setError('Failed to fetch swap data');
      setSwapData(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fromToken">From Token:</label>
        <input type="text" id="fromToken" value={fromToken} onChange={(e) => setFromToken(e.target.value)} />
        <label htmlFor="toToken">To Token:</label>
        <input type="text" id="toToken" value={toToken} onChange={(e) => setToToken(e.target.value)} />
        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        <button type="submit">Get Swap Data</button>
      </form>
      {swapData && (
        <div>
          {/* Display the fetched swap data here */}
          <pre>{JSON.stringify(swapData, null, 2)}</pre>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );



  
}

export default Swap;
