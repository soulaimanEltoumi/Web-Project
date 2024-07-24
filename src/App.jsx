import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Login from "./pages/Login";
import Market from "./pages/Market";
import AssetDetailsPage from "./pages/Details";
import SignUp from "./pages/SignUp";
import FavouriteList from "./pages/Favoritlist";
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/market" element={<Market />} />
        <Route path="/crypto-details/:symbol" element={<AssetDetailsPage />} />
        <Route path="/asset-details/:provider" element={<AssetDetailsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/favourite-list" element={<FavouriteList />} />
        {/* <Route path="/*" element={<NotFoundPage />} /> */}
      </Routes>
      <Footer />
    </>
  );
}
