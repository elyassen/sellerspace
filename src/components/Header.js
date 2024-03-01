import React, { useEffect, useState } from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const [headerBg, setHeaderBg] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 532) {
        setHeaderBg(true);
      } else {
        setHeaderBg(false);
      }
    });
  });
  const handleclick = () => {
    navigate("/signup");
  };
  return (
    <div className={`${headerBg ? "blackheader" : ""} header`}>
      <h2 className="header-heading">Seller's Space</h2>
      <div className="header-btn">
        <button onClick={handleclick} className="header-start-selling">
          Start Selling
        </button>
        <button className="login-header-btn">Login</button>
      </div>
    </div>
  );
}

export default Header;
