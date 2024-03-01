import React from "react";
import Sellerguide from "./Sellerguide";
import Footer from "./Footer";
import Hero from "./Hero";
import Next from "./Next";

function Home() {
  return (
    <div>
      <Hero />
      <Next />
      <Sellerguide />
      <Footer />
    </div>
  );
}

export default Home;
