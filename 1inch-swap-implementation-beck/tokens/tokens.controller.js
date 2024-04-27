import { Router } from "express";
import "dotenv/config";
import axios from "axios";

const router = Router();

const oneInchUrl = process.env.ONE_INCH_URL;
const oneInchKey = process.env.ONE_INCH_KEY;

router.get("/getTokens", async (req, res) => {
  try {
    const { data } = await axios.get(`${oneInchUrl}tokens`, {
      headers: {
        Authorization: `Bearer ${oneInchKey}`,
      },
    });
    const tokensArray = Object.values(data.tokens);
    res.json(tokensArray);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch tokens" });
  }
});

export default router;
