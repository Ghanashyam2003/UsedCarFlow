import express from "express";
import { placeBid } from "../controllers/bidController.js";

const router = express.Router();

router.post("/:auctionId", placeBid);

export default router;
