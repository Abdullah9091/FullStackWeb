const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  transactions: [
    {
      article: { type: mongoose.Schema.Types.ObjectId, ref: "Article", required: true },
      quantity: { type: Number, required: true },
      sellPrice: { type: Number, required: true }, // Added missing sellPrice field
      profitLoss: { type: Number, required: true },
    },
  ],
  totalProfitLoss: { type: Number, default: 0 },
});

module.exports = mongoose.model("Customer", customerSchema);
