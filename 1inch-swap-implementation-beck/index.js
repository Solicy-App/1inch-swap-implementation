import express from "express";
import cors from "cors";
import tokensRouter from "./tokens/tokens.controller.js";
import swapRouter from "./swap/swap.controller.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.options("*", cors());

app.use(express.json());

app.use("/tokens", tokensRouter);
app.use("/swap", swapRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
