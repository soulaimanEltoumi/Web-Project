import React, { useState } from "react";
import { Link } from "react-router-dom";
import CryptoSection from "./cryptoSection";
import ForexSection from "./forexSection";
import StocksSection from "./stockSection";

export default function Market() {
  const [activeSection, setActiveSection] = useState("crypto");

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Market Overview</h1>
      <nav className="mb-4">
        <ul className="flex space-x-4">
          <li>
            <button
              className={`rounded px-4 py-2 ${activeSection === "crypto" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setActiveSection("crypto")}
            >
              Cryptos
            </button>
          </li>
          <li>
            <button
              className={`rounded px-4 py-2 ${activeSection === "forex" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setActiveSection("forex")}
            >
              Forex
            </button>
          </li>
          <li>
            <button
              className={`rounded px-4 py-2 ${activeSection === "stocks" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setActiveSection("stocks")}
            >
              Stocks
            </button>
          </li>
          {/* Añadir más botones según las secciones que necesites */}
        </ul>
      </nav>

      <div className="mt-4">
        {activeSection === "crypto" && <CryptoSection />}
        {activeSection === "forex" && <ForexSection />}
        {activeSection === "stocks" && <StocksSection />}
        {/* Añadir más condiciones para otras secciones */}
      </div>
    </div>
  );
}
