const express = require("express");
const Customer = require("../model/customer");

const router = express.Router();

router.post("/add", async (req, res) => {
  const { name } = req.body;

  try {
    const customer = new Customer({ name });
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
