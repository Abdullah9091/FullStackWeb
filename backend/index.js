require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const articleRoutes = require("./routes/Articles");
const customerRoutes = require("./routes/customers");
const salesRoutes = require("./routes/routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// MongoDB connection using environment variable
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

console.log(process.env.MONGO_URI); // This will print the Mongo URI to the console

// Routes
app.use("/api/articles", articleRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/sales", salesRoutes);

// Basic Route
app.get("/", (req, res) => {
  true,
});
 
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
