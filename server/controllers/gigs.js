import Gig from "../models/Gig.js";
import { body, param, validationResult } from "express-validator";

export const getAllGigs = async (req, res, next) => {
  try {
    const email = req?.query?.email;
    const filter = email ? { email } : {};
    const gigs = await Gig.find(filter);
    res.json(gigs);
  } catch (error) {
    res.status(400).json({ message: "Error fetching gigs " });
  }
};

export const getSingleGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req?.params?._id);
    res.json(gig);
  } catch (error) {
    res.status(400).json({ message: "Error fetching gig" });
  }
};
export const createGig = [
  body("employer").notEmpty().withMessage("Employer is required"),
  body("date").isISO8601().withMessage("Invalid date format"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  async (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const gig = new Gig({
      employer: req?.body?.employer,
      date: req?.body?.date,
      paid: req?.body?.paid,
      invoiced: req?.body?.invoiced,
      rate: req?.body?.rate,
      email: req?.body?.email,
    });

    try {
      await gig.save();
      return res.json({ gig, message: "Gig created successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error creating gig" });
    }
  },
];

export const updateGig = [
  param("_id").isMongoId().withMessage("Invalid MongoDB ID"),
  body("employer").notEmpty().withMessage("Employer is required"),
  body("date").isISO8601().withMessage("Invalid date format"),
  body("rate")
    .optional()
    .isString()
    .isDecimal()
    .withMessage("Rate must be a string containing a valid decimal number"),
  body("paid").optional().isBoolean().withMessage("Paid must be a boolean"),
  body("invoiced")
    .optional()
    .isBoolean()
    .withMessage("Invoiced must be a boolean"),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { _id } = req.params;
    try {
      const updatedFields = {
        ...(req?.body?.employer && { employer: req?.body?.employer }),
        ...(req?.body?.date && { date: req?.body?.date }),
        ...(typeof req?.body?.paid !== "undefined" && {
          paid: req?.body?.paid,
        }),
        ...(typeof req?.body?.invoiced !== "undefined" && {
          invoiced: req?.body?.invoiced,
        }),
        ...(req?.body?.rate && { rate: req?.body?.rate }),
      };

      const gig = await Gig.findByIdAndUpdate(_id, updatedFields, {
        new: true,
      });

      if (!gig) {
        return res.status(404).json({ message: "Gig not found" });
      }

      res.json({ gig, message: "Gig updated successfully!" });
    } catch (error) {
      res.status(400).json({ message: "Error updating gig" });
    }
  },
];

export const deleteGig = [
  param("_id").isMongoId().withMessage("Invalid MongoDB ID"),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { _id } = req.params;

    try {
      await Gig.findByIdAndRemove(_id);
      res.json({ message: "Gig deleted successfully!" });
    } catch (error) {
      res.status(400).json({ message: "Error deleting gig" });
    }
  },
];
