import express from "express";
import {
  getItemAvailability,
  createItemBooking
} from "./booking.controller.js";

const router = express.Router();

router.get("/:id/availability", getItemAvailability);
router.post("/:id/book", createItemBooking);

export default router;
