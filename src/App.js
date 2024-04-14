import "./App.css";
// import Footer from "./components/Footer";
import Header from "./components/Header";
// import Hero from "./components/Hero";
import Home from "./components/Home";
// import Next from "./components/Next";

import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
