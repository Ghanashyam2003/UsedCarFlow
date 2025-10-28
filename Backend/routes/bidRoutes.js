import express from "express";
import { placeBid, getBids, getBidsByAuction } from "../controllers/bidController.js";

const router = express.Router();

// Add a new bid
router.post("/:auctionId", placeBid);

// Get all bids
router.get("/", getBids);

// Get bids for specific auction
router.get("/auction/:auctionId", getBidsByAuction);

export default router;
