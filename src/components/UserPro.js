import React from "react";
import "./userpro.css";
import { useSelector } from "react-redux";
function UserPro() {
  const user = useSelector((State) => State.user);

  return (
    <div className="userpro">
      <h1>{user?.name}</h1>
      <h1>{user?.phone}</h1>
    </div>
  );
}

export default UserPro;
