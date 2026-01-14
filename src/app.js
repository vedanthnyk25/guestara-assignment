import express from "express";
import {pool} from "./config/db.js"
import asyncHandler from "./utils/asyncHandler.js";
import itemRoutes from "./modules/item/item.routes.js";

const app = express();

app.use(express.json());

app.get("/health", asyncHandler(async (req, res) => {
  await pool.query("SELECT 1");
  res.json({ status: "OK" }); 
}));

app.use("/items", itemRoutes);



app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

export default app;
