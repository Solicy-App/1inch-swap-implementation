import express from "express";
import TokenControllers from "../controllers/TokenControllers";

const router = express.Router();

router.get("/getTokens", TokenControllers.getToken);
router.get("/swap", TokenControllers.swap);

export default router;
