import React, { useState, useEffect } from "react";
import axios from "axios";

const AddCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Fetch customers from the backend
  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setError("Failed to fetch customers.");
    } finally {
      setLoading(false);
    }
  };

  // Add a new customer
  const addCustomer = async (e) => {
    e.preventDefault();
    const name = e.target["customer-name"].value;

    try {
      const response = await axios.post("http://localhost:3000/api/customers/add", { name });
      setCustomers((prevCustomers) => [...prevCustomers, response.data]);
      e.target.reset();
    } catch (error) {
      console.error("Error adding customer:", error);
      setError("Failed to add customer.");
    }
  };

  return (
    <section id="customers">
      <h2>Customers</h2>

      <form onSubmit={addCustomer}>
        <label>Customer Name:</label>
        <input type="text" name="customer-name" required />
        <button type="submit">Add Customer</button>
      </form>

      <div id="customer-list">
        <h3>Customer List</h3>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : customers.length > 0 ? (
          <div className="customer-cards">
            {customers.map((customer) => (
              <div key={customer._id} className="customer-card">
                <h3>{customer.name}</h3>
                <p>Transactions: {customer.transactions?.length || 0}</p>
                <p>Total Profit/Loss: ₨{customer.totalProfitLoss ?? 0}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No customers available.</p>
        )}
      </div>
    </section>
  );
};

export default AddCustomer;
