import React from "react";
import "./addproducts.css";
import { useSelector } from "react-redux";
function Addproducts() {
  const user = useSelector((state) => state.user);
  console.log(user);
  return <div className="addproducts">this is add products page</div>;
}

export default Addproducts;
