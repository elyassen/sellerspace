import React from "react";
import Sellerguide from "./Sellerguide";
import Footer from "./Footer";
import Hero from "./Hero";
import Next from "./Next";
import { useSelector } from "react-redux";
import UserPro from "./UserPro";

function Home() {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <div>
      {!user?.email ? (
        <div>
          <Hero />
          <Next />
          <Sellerguide />
        </div>
      ) : (
        <UserPro />
      )}
      <Footer />
    </div>
  );
}

export default Home;
