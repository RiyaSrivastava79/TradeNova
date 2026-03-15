require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/Authroute");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrderModel } = require("./model/OrderModel");

const { holdingsData, positionsData } = require("./data/seedData");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

const allowedOriginsFromEnv = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const defaultAllowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
];

const allowedOrigins = new Set([...defaultAllowedOrigins, ...allowedOriginsFromEnv]);
const isLocalDevOrigin = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i;

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow tools like Postman/cURL (no browser origin header).
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      if (isLocalDevOrigin.test(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);
app.use(bodyParser.json());

// 🔥 ROOT ROUTE
app.get("/", (req, res) => {
  res.json({ success: true, message: "TradeNova API running on port " + PORT });
});

// 🔥 SEED ENDPOINT - Populate database with sample data
app.post("/seed", async (req, res) => {
  try {
    // Clear existing data
    await HoldingsModel.deleteMany({});
    await PositionsModel.deleteMany({});

    // Insert sample data
    await HoldingsModel.insertMany(holdingsData);
    await PositionsModel.insertMany(positionsData);

    res.json({ success: true, message: "Database seeded successfully" });
  } catch (err) {
    console.error("Error seeding database:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔥 AUTH ROUTE REGISTERED
app.use("/auth", authRoutes);

app.get("/allHoldings", async (req, res) => {
  try {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (err) {
    console.error("Error fetching holdings:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (err) {
    console.error("Error fetching positions:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    let newOrder = new OrderModel(req.body);
    await newOrder.save();
    res.json({ success: true });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Server error" });
  }
});

mongoose.connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error(" MongoDB connection error:", err.message);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
