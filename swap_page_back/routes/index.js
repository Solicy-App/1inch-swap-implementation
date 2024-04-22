import express from "express";
import tokens from "./tokens";

const router = express.Router();


router.get("/", (req, res, next) => {
  res.json({ title: "Swap Page" });
});

router.use("/tokens", tokens);


export default router;
