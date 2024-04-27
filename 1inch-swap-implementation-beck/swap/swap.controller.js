import { Router } from "express";
import "dotenv/config";
import axios from "axios";

const router = Router();

const oneInchUrl = process.env.ONE_INCH_URL;
const oneInchKey = process.env.ONE_INCH_KEY;

router.get("/getSwap", async (req, res) => {
  try {
    const { data } = await axios.get(`${oneInchUrl}quote`, {
      params: req.query,
      headers: {
        Authorization: `Bearer ${oneInchKey}`,
      },
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
