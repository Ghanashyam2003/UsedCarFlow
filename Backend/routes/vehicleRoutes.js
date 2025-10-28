import express from "express";
import {
  addVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
} from "../controllers/vehicleController.js";

const router = express.Router();

router.post("/", addVehicle);
router.get("/", getVehicles);
router.get("/:id", getVehicleById);
router.put("/:id", updateVehicle);

export default router;
