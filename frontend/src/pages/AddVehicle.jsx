import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import "./AddVehicle.css"; 

const AddVehicle = () => {
  const [form, setForm] = useState({
    vin: "",
    make: "",
    model: "",
    year: "",
    odometer: "",
    source: "",
    purchasePrice: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/vehicles", {
        vin: form.vin,
        make: form.make,
        model: form.model,
        year: Number(form.year),
        odometer: Number(form.odometer),
        source: form.source,
        purchasePrice: Number(form.purchasePrice),
      });
      alert(" Vehicle added successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(" Error adding vehicle");
    }
  };

  return (
    <div className="add-vehicle-container">
      <div className="add-vehicle-card">
        <h2>Add Used Car</h2>
        <form onSubmit={handleSubmit} className="add-vehicle-form">
          {[
            ["vin", "VIN"],
            ["make", "Make"],
            ["model", "Model"],
            ["year", "Year"],
            ["odometer", "Odometer (km)"],
            ["source", "Source"],
            ["purchasePrice", "Purchase Price (₹)"],
          ].map(([name, label]) => (
            <div key={name} className="form-group">
              <label htmlFor={name}>{label}</label>
              <input
                id={name}
                name={name}
                value={form[name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button type="submit" className="add-vehicle-btn">
             Save Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
