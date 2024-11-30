'use server'


import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// Next.js API route (replace with your actual API route name)
export  async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { fromToken, toToken, amount }: SwapRequest = req.body; // Type assertion for request body
  // let fromToken = 'DAI'
  // let toToken = 'USDC'
  // let amount = '1' 

  // Construct the API request URL (avoid including your actual API key here)
  const url = `https://api.1inch.io/v4/swap/estimate?fromToken=${fromToken}&toToken=${toToken}&amount=${amount}`;
  // const url = `https://api.1inch.io/v4/swap/estimate?fromToken='DAI'&toToken='USDC'&amount=1`;

  try {
    const headers = {
      'Authorization': `Bearer xa6p4HOiqgDvGmU7WG50Xmnv6svtyNnH`, 
    };

    const response = await axios.get(url, { headers });

    if (response.status === 200) {
      // res.status(200).json(response.data); // Send the response data to the frontend
      // res.json(response.data)
      return new Response( response.data , {status: response.status,})

    } else {
      // console.error('Error fetching swap data:', res);
      // res.status(response.status).json({ error: 'Failed to fetch swap data' });
      return new Response( 'Failed to fetch swap data', {status: response.status,})

    }


  } catch (error) {
    // console.error('Error:', error);
    // res.status(500).json({ error: 'Internal server error' });
    return new Response( 'Internal server error', {status: 500,})
  
  }
}

// Interface for Swap Request data
interface SwapRequest {
  fromToken: string;
  toToken: string;
  amount: number;
}

// NextApiRequest and NextApiResponse are already defined in Next.js types









