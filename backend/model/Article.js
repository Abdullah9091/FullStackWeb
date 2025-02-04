const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  name: {
     type: String,
     required: true
     },
  cost: { 
    type: Number, 
    required: true 
  },
  quantity: { 
    type: Number,
     required: true
     },
  image: { 
    type: String,
     required: true 
    },
});

module.exports = mongoose.model("Article", articleSchema);
