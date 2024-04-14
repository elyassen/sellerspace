import React, { useEffect, useState } from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../slices/userSlice";
import { UseSelector, useDispatch, useSelector } from "react-redux";

function Header() {
  const [headerBg, setHeaderBg] = useState(false);
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [loginInfo, setloginInfo] = useState({ email: "", s_password: "" });
  const [error, setError] = useState(null);
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

  const handlehome = () => {
    navigate("/");
  };
  const closeLogin = () => {
    setLogin(false);
    setError(null);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginInfo({ ...loginInfo, [name]: value });
  };
  const submitLogin = () => {
    setLoading(!loading);
    setTimeout(async () => {
      const req = await fetch("http://localhost:3001/login", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      if (req.status == 200) {
        console.log("logged in");
        const res = await req.json();
        setLoading(true);
        dispatch(addUser(res));

        setLogin(!login);
        setloginInfo({ email: "", s_password: "" });
      }
      if (req.status == 401) {
        setLoading(false);
        setError("invalid credentials");
      }
      setLoading(false);
    }, 1);
  };
  const logoutuser = () => {
    dispatch(removeUser());
  };

  return (
    <div className={`${headerBg ? "blackheader" : ""} header`}>
      <h2 onClick={handlehome} className="header-heading">
        Seller's Space
      </h2>
      {!user?.email ? (
        <div className="header-btn">
          <button onClick={handleclick} className="header-start-selling">
            Sign Up
          </button>
          <button onClick={() => setLogin(true)} className="login-header-btn">
            Login
          </button>
        </div>
      ) : (
        <div onClick={logoutuser} className="user-logged-in">
          {user?.s_name.substring(0, 1)}
        </div>
      )}
      {login && (
        <div className="login-div">
          <div className="login-input">
            <h1 onClick={closeLogin} className="close-login">
              close{" "}
            </h1>
            <h4 className="login-text">Email</h4>
            <input
              name="email"
              value={login.email}
              onChange={handleChange}
              type="text"
            />
          </div>
          <div className="login-input">
            <h4 className="login-text">Password</h4>
            <input
              value={loginInfo.password}
              name="s_password"
              onChange={handleChange}
              type="text"
            />
          </div>
          <p className="forgot">Forgot password?</p>
          {error && <p className="error">{error}</p>}
          <button onClick={submitLogin} className="login-btn">
            {loading ? <div className="loading"></div> : <p>login</p>}
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
