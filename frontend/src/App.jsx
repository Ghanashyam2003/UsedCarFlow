// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import AddVehicle from "./pages/AddVehicle";
import VehicleList from "./pages/VehicleList";
import AppraiseVehicle from "./pages/AppraiseVehicle";
import CreateAuction from "./pages/CreateAuction";
import AuctionPage from "./pages/AuctionPage";
import PaymentPage from "./pages/PaymentPage";
import TransferPage from "./pages/TransferPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<VehicleList />} />
          <Route path="/add-vehicle" element={<AddVehicle />} />
          <Route path="/appraise/:id" element={<AppraiseVehicle />} />
          <Route path="/create-auction/:id" element={<CreateAuction />} />
          <Route path="/auction/:id" element={<AuctionPage />} />
          <Route path="/payment/:id" element={<PaymentPage />} />
          <Route path="/transfer/:id" element={<TransferPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
