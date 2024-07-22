import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/market" element={<Market />} />
        <Route path="/market/:id" element={<MarketDetail />} />
        <Route path="/favourite-list" element={<FavouriteList />} />

        <Route path="/*" element={<NotFoundPage />} /> */}
      </Routes>
    </>
  );
}
