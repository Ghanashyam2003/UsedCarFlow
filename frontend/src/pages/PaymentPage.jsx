import React, { useState } from "react";
import API from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    buyerName: "",
    amount: "",
    method: "UPI",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/payments", {
        vehicle: id,
        buyerName: form.buyerName,
        amount: Number(form.amount),
        method: form.method,
        status: "success",
        paymentDate: new Date().toISOString(),
      });
      alert("Payment recorded successfully!");
      navigate(`/transfer/${id}`);
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Record Payment</h2>

      <form onSubmit={submit} className="payment-form">
        <div className="form-group">
          <label>Buyer Name</label>
          <input
            type="text"
            name="buyerName"
            value={form.buyerName}
            onChange={handleChange}
            required
            placeholder="Enter buyer's full name"
          />
        </div>

        <div className="form-group">
          <label>Amount (₹)</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
            placeholder="Enter payment amount"
          />
        </div>

        <div className="form-group">
          <label>Payment Method</label>
          <select
            name="method"
            value={form.method}
            onChange={handleChange}
          >
            <option value="UPI">UPI</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cash">Cash</option>
          </select>
        </div>

        <button type="submit" className="payment-btn">
          Record Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
