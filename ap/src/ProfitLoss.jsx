import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfitLoss = () => {
  const [totalProfitLoss, setTotalProfitLoss] = useState(0);

  useEffect(() => {
    axios
      .get("https://full-stack-web-lk2e.vercel.app/api/sales/list")
      .then((response) => {
        const total = response.data.reduce((acc, sale) => acc + sale.totalProfitLoss, 0);
        setTotalProfitLoss(total);
      })
      .catch((error) => console.error("Error fetching sales:", error));
  }, []);

  return (
    <div>
      <div className="profit-loss-card">
        <h2>Profit/Loss</h2>
        <h3>Summary</h3>
        <p>Total Profit/Loss: ₨{totalProfitLoss}</p>
      </div>
    </div>
  );
};

export default ProfitLoss;
