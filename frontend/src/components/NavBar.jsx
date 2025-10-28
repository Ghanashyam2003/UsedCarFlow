import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        UsedCarFlow
      </Link>

      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Vehicle List
        </Link>
        <Link to="/add-vehicle" className="nav-link">
          Add Vehicle
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
