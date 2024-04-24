import axios from 'axios';

export default async function handler(req, res) {
  const chainID = req.query.chainid; 
  const tokenAddress = req.query.tokenaddress;
  
  const APIKey = "wiLytharh8RFvelaizyX3gRJPmBpVOXG";
  const url = `https://api.1inch.dev/price/v1.1/${chainID}`;
  
  console.log(chainID);
  console.log(tokenAddress);
  
  const tokens = [tokenAddress];
  
  const body = {
    "tokens": tokens,
    "currency": "USD"
  };

  try {
    const response = await axios.post(url, body, {
      headers: {
        "Authorization": `Bearer ${APIKey}`,
        "Content-Type": "application/json",
        "Permissions-Policy": "interest-cohort=()"
      }
    });

    const data = response.data;
    
    res.setHeader("Content-Type", "application/json");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 

    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}