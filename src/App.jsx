import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Market from "./pages/Market";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/market" element={<Market />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/market/:id" element={<MarketDetail />} />
        {/* <Route path="/market" element={<Market />} />
        <Route path="/market/:id" element={<MarketDetail />} />
        <Route path="/favourite-list" element={<FavouriteList />} />

        <Route path="/*" element={<NotFoundPage />} /> */}
      </Routes>

      <Footer />
    </>
  );
}
