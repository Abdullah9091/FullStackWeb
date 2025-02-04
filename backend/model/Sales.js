const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article", required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  quantity: { type: Number, required: true },
  sellPrice: { type: Number, required: true },
  totalProfitLoss: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sale", saleSchema);
