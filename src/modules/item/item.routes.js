import express from "express";
import { getItemPrice } from "./item.controller.js";

const router = express.Router();

router.get("/:id/price", getItemPrice);

export default router;
