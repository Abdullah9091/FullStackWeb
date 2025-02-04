import React, { useState, useEffect } from "react";
import axios from "axios";

const SellArticle = () => {
  const [articles, setArticles] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [sellQuantity, setSellQuantity] = useState();
  const [sellPrice, setSellPrice] = useState();
  const [selectedArticle, setSelectedArticle] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [salesList, setSalesList] = useState([]);
  const [totalProfitLoss, setTotalProfitLoss] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/api/articles/submit")
      .then((response) => {
        setArticles(response.data);
        if (response.data.length > 0) {
          setSelectedArticle(response.data[0]._id);
        }
      })
      .catch((error) => console.error("Error fetching articles:", error));

    axios.get("http://localhost:3000/api/customers")
      .then((response) => {
        setCustomers(response.data);
        if (response.data.length > 0) {
          setSelectedCustomer(response.data[0]._id);
        }
      })
      .catch((error) => console.error("Error fetching customers:", error));

    axios.get("http://localhost:3000/api/sales/list")
      .then((response) => {
        setSalesList(response.data);
        setTotalProfitLoss(response.data.reduce((acc, sale) => acc + sale.totalProfitLoss, 0));
      })
      .catch((error) => console.error("Error fetching sales:", error));
  }, []);

  const handleSale = async (e) => {
    e.preventDefault();

    const article = articles.find((a) => a._id === selectedArticle);
    const customer = customers.find((c) => c._id === selectedCustomer);

    if (!article || !customer) {
      alert("Invalid article or customer selected");
      return;
    }

    if (sellQuantity <= 0 || sellPrice <= 0) {
      alert("Quantity and Sell Price must be greater than zero.");
      return;
    }

    if (sellQuantity > article.quantity) {
      alert("Not enough stock available!");
      return;
    }

    const profitLoss = (sellPrice - article.cost) * sellQuantity;

    try {
      await axios.patch(`http://localhost:3000/api/articles/update/${article._id}`, {
        quantity: article.quantity - sellQuantity,
      });

      const saleResponse = await axios.post("http://localhost:3000/api/sales/add", {
        articleId: article._id,
        customerId: customer._id,
        quantity: sellQuantity,
        sellPrice,
        totalProfitLoss: profitLoss,
      });
      console.log("Customer Info:", customer);

      setSalesList((prevSales) => [
        ...prevSales,
        {
          articleId: { name: article.name }, // Store article name
          customerId: { name: customer.name }, // Store customer name
          quantity: sellQuantity,
          totalProfitLoss: profitLoss,
        },
      ]);

      setTotalProfitLoss((prevTotal) => prevTotal + profitLoss);

      alert("Sale recorded successfully!");
      setSellQuantity(0);
      setSellPrice(0);
      setSelectedArticle(articles.length > 0 ? articles[0]._id : "");
      setSelectedCustomer(customers.length > 0 ? customers[0]._id : "");
    } catch (error) {
      console.error("Error processing sale:", error);
      alert("Failed to process sale.");
    }
  };

  return (
    <section id="sell-article">
      <h2>Sell Articles</h2>
      <form onSubmit={handleSale}>
        <label>Article:</label>
        <select value={selectedArticle} onChange={(e) => setSelectedArticle(e.target.value)} required>
          {articles.map((article) => (
            <option key={article._id} value={article._id}>
              {article.name} (Stock: {article.quantity})
            </option>
          ))}
        </select>

        <label>Quantity:</label>
        <input type="number" value={sellQuantity} onChange={(e) => setSellQuantity(Number(e.target.value))} required />

        <label>Customer:</label>
        <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)} required>
          {customers.map((customer) => (
            <option key={customer._id} value={customer._id}>
              {customer.name}
            </option>
          ))}
        </select>

        <label>Sell Price:</label>
        <input type="number" value={sellPrice} onChange={(e) => setSellPrice(Number(e.target.value))} required />

        <button type="submit">Sell Article</button>
      </form>

      <div>
        <h3>Sales List</h3>
        <ul>
          {salesList.map((sale, index) => (
            <li key={index}>
              Sold {sale.quantity} of <strong>{sale.articleId?.name || "Unknown Article"}</strong>
              <br />
              <strong>Customer:</strong> {sale.customerId?.name || "Unknown Customer"}
              <br />
              Total Profit/Loss: ₨{sale.totalProfitLoss}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SellArticle;
