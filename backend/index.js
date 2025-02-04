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
// Mongodb connection
mongoose
  .connect("mongodb://localhost:27017/AbdullahDb", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
//fetch data For All routes
app.use("/api/articles", articleRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/sales", salesRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
