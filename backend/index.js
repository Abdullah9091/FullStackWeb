require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const articleRoutes = require("./routes/Articles");
const customerRoutes = require("./routes/customers");
const salesRoutes = require("./routes/routes");

const app = express();

// ✅ Fix CORS Configuration
app.use(cors({
  origin: "https://full-stack-web-lk2e.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
}));

app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// ✅ MongoDB Connection (Fix Error Handling)
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Print Mongo URI only if it exists
if (process.env.MONGO_URI) {
  console.log("MongoDB URI:", process.env.MONGO_URI);
} else {
  console.error("❌ MONGO_URI is missing in the environment variables!");
}

// ✅ Routes
app.use("/api/articles", articleRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/sales", salesRoutes);

// ✅ Fix Root Route
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

// ✅ Export for Vercel
module.exports = app;
