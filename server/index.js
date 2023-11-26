import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import allRoutes from "./routes/index.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // This allows the session cookie to be sent back and forth
  optionsSuccessStatus: 204,
};

// middleware
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api", allRoutes);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// db connect
const connectDB = async () => {
  try {
    await mongoose
      .set("strictQuery", true)
      .connect(
        "mongodb+srv://pjf18222:ZQ8Vqf77CTXHDdGi@cluster0.ygtkdzw.mongodb.net/gigs",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
    console.log(`Connected to the database bayyy! on port ${PORT}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
// run express server
app.listen(PORT, () => {
  connectDB();
});
