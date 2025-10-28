import express from "express";
import { addTransfer, getTransfers } from "../controllers/transferController.js";

const router = express.Router();

router.post("/", addTransfer);
router.get("/", getTransfers);

export default router;
