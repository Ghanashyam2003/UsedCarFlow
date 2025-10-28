import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
import "./VehicleList.css";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await API.get("/vehicles");
      setVehicles(res.data);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    }
  };

  return (
    <div className="vehicle-list-container">
      <h2 className="vehicle-list-title">Vehicle Inventory</h2>

      {vehicles.length === 0 ? (
        <p className="empty-text">No vehicles available. Please add one.</p>
      ) : (
        <table className="vehicle-table">
          <thead>
            <tr>
              <th>VIN</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v._id}>
                <td>{v.vin}</td>
                <td>{v.make}</td>
                <td>{v.model}</td>
                <td>{v.year}</td>
                <td className="status-cell">{v.status}</td>
                <td>
                  <div className="action-buttons">
                    <Link to={`/appraise/${v._id}`} className="action-link">
                      Appraise
                    </Link>
                    <Link
                      to={`/create-auction/${v._id}`}
                      className="action-link"
                    >
                      Create Auction
                    </Link>
                    <Link to={`/auction/${v._id}`} className="action-link">
                      View Auction
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VehicleList;
