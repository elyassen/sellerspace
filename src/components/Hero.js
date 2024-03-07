import React from "react";
import { useNavigate } from "react-router-dom";
import Sellerlogo from "./static/Sellerlogo.svg";

import "./hero.css";
function Hero() {
  const navigate = useNavigate();
  const handleclick = () => [navigate("/signup")];
  return (
    <div className="hero">
      <div className="left-hero">
        <h2 className="hero-main-heading">Start your Seller Journey</h2>
        <p className="hero-2-line">
          Grow Your Business with Our Comprehensive E-commerce Platform
        </p>
        <button onClick={handleclick} className="hero-btn">
          Start Selling
        </button>
        <p className="hero-3-line">
          Get started in just 15 mins and enjoy seamless access to our services
        </p>
      </div>
      <div className="right-hero">
        <img src={Sellerlogo} alt="img" />
      </div>
    </div>
  );
}

export default Hero;
