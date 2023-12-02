import mongoose from "mongoose";

const { Schema } = mongoose;

const gigSchema = new Schema({
  employer: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  invoiced: {
    type: Boolean,
    default: false,
  },
  rate: String,
});

export default mongoose.model("Gig", gigSchema);
