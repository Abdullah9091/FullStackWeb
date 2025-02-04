const express = require("express");
const Sale = require("../model/Sales");
const Customer = require("../model/customer");

const router = express.Router();

// Add a sale and update the customer's transaction history
router.post("/add", async (req, res) => {
  try {
    const { articleId, customerId, quantity, sellPrice, totalProfitLoss } = req.body;

    // Save sale to the database
    const newSale = new Sale({ articleId, customerId, quantity, sellPrice, totalProfitLoss });
    await newSale.save();

    // Update the customer's transaction history
    await Customer.findByIdAndUpdate(customerId, {
      $push: {
        transactions: { article: articleId, quantity, sellPrice, profitLoss: totalProfitLoss },
      },
      $inc: { totalProfitLoss: totalProfitLoss },
    });

    res.status(201).json({ message: "Sale recorded and customer updated!", newSale });
  } catch (error) {
    res.status(500).json({ error: "Error processing sale", details: error.message });
  }
});

// Get all sales with article and customer details populated
router.get("/list", async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("articleId", "name price") // Populate article details
      .populate("customerId", "name"); // Populate customer details

    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: "Error fetching sales", details: error.message });
  }
});

module.exports = router;
