import express from "express";
import { addAppraisal, getAppraisals } from "../controllers/appraisalController.js";

const router = express.Router();

router.post("/", addAppraisal);
router.get("/", getAppraisals);

export default router;
