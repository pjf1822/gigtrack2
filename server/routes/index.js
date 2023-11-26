import express from "express";
const router = express.Router();

import gigRoutes from "./gigs.js";

router.use("/gigs", gigRoutes);

export default router;
