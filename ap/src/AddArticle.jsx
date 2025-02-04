import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddArticle = () => {
  const [articles, setArticles] = useState([]);  
  const [error, setError] = useState(null);  // State for errors

  // Fetch articles when the component loads
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/articles/submit');
        setArticles(response.data);
      } catch (err) {
        setError('Error fetching articles: ' + err.message);
      }
    };

    fetchArticles();
  }, []);

  const addArticle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", e.target["article-name"].value);
    formData.append("cost", parseFloat(e.target["article-cost"].value));
    formData.append("quantity", parseInt(e.target["article-quantity"].value));
    formData.append("image", e.target["article-image"].files[0]);

    try {
      // Make the API call to save the article
      const response = await axios.post('http://localhost:3000/api/articles/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update the articles state with the new article
      setArticles([...articles, response.data]);
      e.target.reset();  // Reset the form
    } catch (err) {
      setError('Error saving article: ' + err.message);
    }
  };

  return (
    <section id="add-article">
      <h2>Add Articles</h2>
      <form onSubmit={addArticle}>
        <label>Article Name:</label>
        <input type="text" name="article-name" required />

        <label>Article Cost:</label>
        <input type="number" name="article-cost" required />

        <label>Quantity:</label>
        <input type="number" name="article-quantity" required />

        <label>Article Image:</label>
        <input type="file" name="article-image" accept="image/*" required />

        <button type="submit">Add Article</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div id="article-list">
        <h3>Articles</h3>
        <div className="article-container">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <div key={index} className="article-item">
                <img src={`http://localhost:3000/${article.image}`} alt={article.name} />
                <h4>{article.name}</h4>
                <p>Cost: ₨{article.cost} | Quantity: {article.quantity}</p>
              </div>
            ))
          ) : (
            <p>No articles found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AddArticle;
