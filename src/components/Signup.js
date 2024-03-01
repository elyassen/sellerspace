import React, { useState } from "react";
import "./signup.css";

function Signup() {
  const [signupLoading, setSignupLoading] = useState(false);
  const [disablebtn, setDisable] = useState(true);
  const [count, setCount] = useState(0);
  const [verified, setVerified] = useState(false);
  const [userData, setUserData] = useState([
    { name: "", email: "", phone: "", address: "", dob: "", password: "" },
  ]);
  const [repassword, setRepassword] = useState("");
  const handleclick = () => {
    if (count == 3) {
      setDisable(true);
    }
    setCount(count + 1);
  };
  const handleOtp = () => {
    setVerified(true);
  };
  const handleSignup = () => {
    setSignupLoading(true);
    setTimeout(() => {
      setCount(4);
    }, 3000);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handlepassword = (e) => {
    const { value } = e.target;
    setRepassword(value);
    if (userData.password === value) {
      setDisable(false);
      console.log("password match");
    } else {
      console.log("password didnt match");
      setDisable(true);
    }
  };
  console.log(userData);

  return (
    <div className="signup">
      <div className="signupwrapper">
        <h1 className={`${count == 4 && "hide-heading"} heading-signup`}>
          Sign up
        </h1>
        {count == 0 && (
          <div className="section-1">
            <div className="input-section">
              <h4>Name</h4>
              <input
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="input-1"
                type="text"
              />
            </div>
            <div className="input-section">
              <h4>Email</h4>
              <input
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="input-1"
                type="text"
              />
            </div>
            <button onClick={() => setCount(count + 1)} className="otp-btn">
              Send OTP
            </button>
            <p className="member"> Already a seller? login</p>
          </div>
        )}
        {count == 1 && (
          <div className="otp-section">
            <h4 className="otp-heading">verify OTP</h4>
            <input className="otp-field" type="text" />
            <button onClick={() => setCount(count + 1)} className="verify-btn">
              Verify and continue
            </button>
            <p onClick={() => setCount(0)} className="change-email">
              Want to change email
            </p>
          </div>
        )}
        {count == 2 && (
          <div className="section-3">
            <div className="input-3">
              <h4>Phone</h4>
              <input
                name="phone"
                onChange={handleChange}
                value={userData.phone}
                className="input-1"
                type="text"
              />
            </div>
            <div className="input-3">
              <h4>Address</h4>
              <input
                name="address"
                onChange={handleChange}
                value={userData.address}
                className="input-1"
                type="text"
              />
            </div>
            <div className="input-3">
              <h4>Date of birth</h4>
              <input
                name="dob"
                onChange={handleChange}
                value={userData.dob}
                className="input-1"
                type="date"
              />
            </div>
            <button onClick={() => setCount(count + 1)} className="next-btn">
              Next
            </button>
          </div>
        )}
        {count == 3 && (
          <div className="section-3">
            <div className="input-4">
              <h4>Password</h4>
              <input
                name="password"
                onChange={handleChange}
                value={userData.password}
                type="text"
                className="input-1"
              />
            </div>
            <div className="input-4">
              <h4> confirm password</h4>
              <input
                value={repassword}
                onChange={handlepassword}
                type="text"
                className="input-1"
              />
            </div>
            <div onClick={handleSignup} className="signup-btn">
              {!signupLoading ? (
                <button disabled={disablebtn} className="signup-btn-inside">
                  Sign up
                </button>
              ) : (
                <div className="loading"></div>
              )}
            </div>
          </div>
        )}
        {count == 4 && (
          <div className="complete">
            <h3 className="completed-heading">Account created!!</h3>
            <button className="list">List Your Products</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;