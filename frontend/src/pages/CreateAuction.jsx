// src/pages/CreateAuction.jsx
import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import "./CreateAuction.css";

const CreateAuction = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [form, setForm] = useState({
    startPrice: "",
    reservePrice: "",
    auctionType: "timed",
    startTime: "",
    endTime: "",
  });
  const [createdAuction, setCreatedAuction] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicle();
  }, []);

  const fetchVehicle = async () => {
    try {
      const res = await API.get(`/vehicles/${id}`);
      console.log("Fetched vehicle:", res.data);

      // Sometimes API returns { vehicle: { ... } }
      const data = res.data.vehicle ? res.data.vehicle : res.data;
      setVehicle(data);
    } catch (err) {
      console.error("Error fetching vehicle:", err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        vehicle: id,
        startPrice: Number(form.startPrice),
        reservePrice: Number(form.reservePrice),
        auctionType: form.auctionType,
        startTime: form.startTime,
        endTime: form.endTime,
        status: "ongoing",
      };
      const res = await API.post("/auctions", payload);
      setCreatedAuction(res.data);
      alert("Auction created successfully! Auction ID: " + res.data._id);
      navigate(`/auction/${res.data._id}`);
    } catch (err) {
      console.error("Error creating auction:", err);
      alert("Error creating auction");
    }
  };

  console.log("Vehicle data:", vehicle);

  if (!vehicle)
    return <div className="loading-text">Loading vehicle details...</div>;

  // Handle vehicle.vin safely
  const safeVin =
    typeof vehicle.vin === "string"
      ? vehicle.vin
      : vehicle.vin && vehicle.vin._id
      ? vehicle.vin._id
      : JSON.stringify(vehicle.vin || "");

  return (
    <div className="create-auction-container">
      <h2 className="create-auction-title">
        Create Auction for <span className="vin-text">{safeVin}</span>
      </h2>

      <form onSubmit={submit} className="create-auction-form">
        <div className="form-group">
          <label>Start Price</label>
          <input
            type="number"
            name="startPrice"
            value={form.startPrice}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Reserve Price</label>
          <input
            type="number"
            name="reservePrice"
            value={form.reservePrice}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Auction Type</label>
          <select
            name="auctionType"
            value={form.auctionType}
            onChange={handleChange}
          >
            <option value="timed">Timed</option>
            <option value="live">Live</option>
          </select>
        </div>

        <div className="form-group">
          <label>Start Time (ISO Format)</label>
          <input
            type="text"
            name="startTime"
            placeholder="2025-10-29T10:00:00.000Z"
            value={form.startTime}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>End Time (ISO Format)</label>
          <input
            type="text"
            name="endTime"
            placeholder="2025-10-30T10:00:00.000Z"
            value={form.endTime}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="create-auction-btn">
          Create Auction
        </button>
      </form>

      {createdAuction && (
        <div className="created-auction-info">
          <p>
            Auction created successfully! <br />
            <strong>ID:</strong> {createdAuction._id}
          </p>
        </div>
      )}
    </div>
  );
};

export default CreateAuction;
