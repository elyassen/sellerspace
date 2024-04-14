import React, { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../slices/userSlice";

function Signup() {
  const [signupLoading, setSignupLoading] = useState(false);
  const [disablebtn, setDisable] = useState(true);
  const [count, setCount] = useState(0);
  const [verified, setVerified] = useState(false);
  const dispatch = useDispatch();
  const [passwordMatch, setPasswordmatch] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState([
    {
      s_name: null,
      email: null,
      s_phone: null,
      s_address: null,
      s_dob: null,
      s_password: null,
    },
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
  const handlepassword = (e) => {
    const { value } = e.target;
    setRepassword(value);
    if (userData.s_password === value) {
      setDisable(false);
      setPasswordmatch(true);
    } else {
      console.log("password didnt match");
      setDisable(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSignup = () => {
    setSignupLoading(true);
    // const { email, s_address, s_dob, s_name, s_password, s_phone } = userData;
    // const newUser = {
    //   email,
    //   s_address,
    //   s_dob,
    //   s_name,
    //   s_password,
    //   s_password,
    //   s_phone,
    // };
    signupUserBackend(userData);

    setTimeout(() => {
      setCount(4);
    }, 3000);
  };

  const signupUserBackend = async (user) => {
    try {
      const req = await fetch("http://localhost:3001/addseller", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (req.ok) {
        dispatch(addUser(user));
        // toProducts();
        console.log("user saved");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // console.log(userData);
  const tohome = () => {
    navigate("/");
  };
  return (
    <div className="signup">
      <div className="signupwrapper">
        <h1 className={`${count === 4 && "hide-heading"} heading-signup`}>
          Sign up
        </h1>
        {count == 0 && (
          <div className="section-1">
            <div className="input-section">
              <h4>Name</h4>
              <input
                name="s_name"
                value={userData.s_name}
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
              <p className="valid-email"> Enter valid email</p>
            </div>
            <button onClick={() => setCount(count + 1)} className="otp-btn">
              Send OTP
            </button>
            <p className="member"> Already a seller? login</p>
          </div>
        )}
        {count === 1 && (
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
        {count === 2 && (
          <div className="section-3">
            <div className="input-3">
              <h4>Phone</h4>
              <input
                name="s_phone"
                onChange={handleChange}
                value={userData.s_phone}
                className="input-1"
                type="text"
              />
            </div>
            <div className="input-3">
              <h4>Address</h4>
              <input
                name="s_address"
                onChange={handleChange}
                value={userData.s_address}
                className="input-1"
                type="text"
              />
            </div>
            <div className="input-3">
              <h4>Date of birth</h4>
              <input
                name="s_dob"
                onChange={handleChange}
                value={userData.s_dob}
                className="input-1"
                type="date"
              />
            </div>
            <button onClick={() => setCount(count + 1)} className="next-btn">
              Next
            </button>
          </div>
        )}
        {count === 3 && (
          <div className="section-3">
            <div className="input-4">
              <h4>Password</h4>
              <input
                name="s_password"
                onChange={handleChange}
                value={userData.s_password}
                type="password"
                className="input-1"
              />
            </div>
            <div className="input-4">
              <h4> confirm password</h4>
              <input
                value={repassword}
                onChange={handlepassword}
                type="password"
                className="input-1"
              />
              {passwordMatch ? (
                <p className="password-match">password matched click Sign up</p>
              ) : (
                <p className="password-match">password didnot match</p>
              )}
            </div>
            <div className="signup-btn">
              {!signupLoading ? (
                <button
                  onClick={handleSignup}
                  disabled={disablebtn}
                  className="signup-btn-inside"
                >
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
            <h2>Congratulations</h2>
            <h3 className="completed-heading">Account created!!</h3>
            <button onClick={tohome} className="list">
              List Your Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;
