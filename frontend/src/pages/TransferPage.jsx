import React, { useState } from "react";
import API from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import "./TransferPage.css";

const TransferPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    buyerName: "",
    state: "",
    titleStatus: "Completed",
    documents: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/transfers", {
        vehicle: id,
        ...form,
        documents: form.documents.split(",").map((s) => s.trim()),
        completedAt: new Date().toISOString(),
      });
      await API.put(`/vehicles/${id}`, { status: "transferred" });
      alert("Ownership transfer recorded successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error recording transfer. Please try again.");
    }
  };

  return (
    <div className="transfer-container">
      <h2 className="transfer-title">Transfer Ownership</h2>

      <form onSubmit={submit} className="transfer-form">
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
          <label>State</label>
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            required
            placeholder="Enter state name"
          />
        </div>

        <div className="form-group">
          <label>Title Status</label>
          <input
            type="text"
            name="titleStatus"
            value={form.titleStatus}
            onChange={handleChange}
            placeholder="Completed / Pending"
          />
        </div>

        <div className="form-group">
          <label>Documents (comma separated filenames or URLs)</label>
          <textarea
            name="documents"
            value={form.documents}
            onChange={handleChange}
            placeholder="Example: rc.pdf, insurance.jpg, noc.pdf"
          />
        </div>

        <button type="submit" className="transfer-btn">
          Complete Transfer
        </button>
      </form>
    </div>
  );
};

export default TransferPage;
