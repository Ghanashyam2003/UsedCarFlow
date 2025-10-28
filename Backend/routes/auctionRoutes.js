import express from "express";
import { createAuction, getAuctions } from "../controllers/auctionController.js";

const router = express.Router();

router.post("/", createAuction);
router.get("/", getAuctions);

export default router;
