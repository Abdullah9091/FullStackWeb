import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import AddArticle from "./AddArticle";
import SellArticle from "./SellArticle";
import AddCustomer from "./AddCustomer";
import ProfitLoss from "./ProfitLoss";
import "./App.css";

const sections = [
  { id: "add-article", label: "Add Articles" },
  { id: "sell-article", label: "Sell Articles" },
  { id: "customers", label: "Customers" },
  { id: "profits", label: "Profit/Loss" },
  { id: "inventory", label: "Inventory" },
];

const App = () => {
  const [activeSection, setActiveSection] = useState("add-article");
  const [articles, setArticles] = useState([]); // ✅ Global state for articles
  const [customers, setCustomers] = useState([]);
  const [sales, setSales] = useState([]);
  const [totalProfitLoss, setTotalProfitLoss] = useState(0);

  useEffect(() => {
    gsap.fromTo(
      `#${activeSection}`,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
  }, [activeSection]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const addSale = (quantity, articleName, customerName, total) => {
    setSales([...sales, { quantity, articleName, customerName, total }]);
    setTotalProfitLoss((prev) => prev + total);
  };

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <h2>Ahmed Boutique</h2>
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              <a href="#" onClick={() => handleSectionChange(section.id)}>
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="content">
        {/* Pass global articles state to both AddArticle and SellArticle */}
        {activeSection === "add-article" && (
          <AddArticle articles={articles} setArticles={setArticles} />
        )}
        {activeSection === "sell-article" && (
          <SellArticle articles={articles} customers={customers} addSale={addSale} />
        )}
        {activeSection === "customers" && (
          <AddCustomer customers={customers} setCustomers={setCustomers} />
        )}
        {activeSection === "profits" && <ProfitLoss totalProfitLoss={totalProfitLoss} />}
      </main>
    </div>
  );
};

export default App;
