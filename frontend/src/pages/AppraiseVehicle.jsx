import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import "./AppraiseVehicle.css";

const AppraiseVehicle = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [form, setForm] = useState({
    inspectorName: "",
    conditionScore: "",
    estimatedValue: "",
    inspectionReport: "",
    vinCheckResult: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicle();
  }, []);

  const fetchVehicle = async () => {
    try {
      const res = await API.get(`/vehicles/${id}`);
      setVehicle(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const runVinCheck = async () => {
    try {
      const res = await API.post("/vin/check", { vin: vehicle.vin });
      setForm((f) => ({ ...f, vinCheckResult: res.data.status }));
    } catch (err) {
      console.error(err);
      alert("VIN check failed (mock)");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/appraisals", {
        vehicle: id,
        ...form,
        conditionScore: Number(form.conditionScore),
        estimatedValue: Number(form.estimatedValue),
      });
      await API.put(`/vehicles/${id}`, { status: "appraised" });
      alert("Appraisal saved");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error saving appraisal");
    }
  };

  if (!vehicle) return <div>Loading...</div>;

  return (
    <div className="appraise-vehicle-container">
      <div className="appraise-vehicle-card">
        <h2>
          Appraise Vehicle: {vehicle.vin} ({vehicle.make} {vehicle.model})
        </h2>

        <button className="run-check-btn" onClick={runVinCheck}>
          Run VIN Check
        </button>

        <form onSubmit={submit} className="appraise-vehicle-form">
          <div className="form-group">
            <label>Inspector Name</label>
            <input
              name="inspectorName"
              value={form.inspectorName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Condition Score</label>
            <input
              name="conditionScore"
              value={form.conditionScore}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Estimated Value</label>
            <input
              name="estimatedValue"
              value={form.estimatedValue}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Inspection Report</label>
            <textarea
              name="inspectionReport"
              value={form.inspectionReport}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>VIN Check Result</label>
            <input
              name="vinCheckResult"
              value={form.vinCheckResult}
              readOnly
            />
          </div>

          <button type="submit" className="appraise-submit-btn">
            Save Appraisal
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppraiseVehicle;
