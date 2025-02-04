const express = require("express");
const multer = require("multer");
const Article = require("../model/Article");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Save a new article
router.post("/save", upload.single("image"), async (req, res) => {
  const { name, cost, quantity } = req.body;
  const image = req.file.path;

  try {
    const article = new Article({ name, cost, quantity, image });
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all articles
router.get("/submit", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ PATCH route to update an article's quantity
router.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!id || quantity === undefined) {
      return res.status(400).json({ message: "Missing article ID or quantity" });
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(updatedArticle);
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
