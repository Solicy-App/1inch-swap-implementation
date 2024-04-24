import axios from 'axios';

export default async function handler(req, res) {
  const chainID = req.query.chainid ? req.query.chainid : 1;
  const url = `https://api.1inch.dev/swap/v5.2/${chainID}/tokens`;
  const APIKey = "wiLytharh8RFvelaizyX3gRJPmBpVOXG";

  try {
    const response = await axios.get(url, {
      headers: {
        "Authorization": `Bearer ${APIKey}`,
        "accept": "application/json",
        "Permissions-Policy": "interest-cohort=()"
      }
    });

    res.setHeader("Content-Type", "application/json");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    const data = response.data;

    console.log(data.tokens);
    res.status(200).json(data);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch tokens' });
  }
}