import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Login from "./pages/Login";
import Market from "./pages/Market";
import UserSignUp from "./components/SignUp";
import CryptoDetailsPage from "./pages/Details/CryptoDetailsPage";
import ForexDetailsPage from "./pages/Details/ForexDetailsPage";
import StocksDetailsPage from "./pages/Details/StockDetailsPage";
import Notfoundpage from "./pages/Notfoundpage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/market" element={<Market />} />
        <Route path="/crypto/:symbol" element={<CryptoDetailsPage />} />
        <Route path="/forex/:symbol" element={<ForexDetailsPage />} />
        <Route path="/stocks/:symbol" element={<StocksDetailsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="*" element={<Notfoundpage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </>
  );
}
