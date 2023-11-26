import express from "express";
import {
  getAllGigs,
  getSingleGig,
  createGig,
  updateGig,
  deleteGig,
} from "../controllers/gigs.js";
const router = express.Router();

router.get("/getall", getAllGigs);
router.get("/:_id", getSingleGig);
router.post("/create", createGig);
router.put("/:_id", updateGig);
router.delete("/:_id", deleteGig);

export default router;
