// ForexSection.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ForexSection() {
  const [forexSymbols, setForexSymbols] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;

  useEffect(() => {
    const fetchForexSymbols = async () => {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/forex/symbol?exchange=oanda&token=${apiKey}`,
        );
        if (!response.ok) {
          throw new Error("Error fetching forex symbols");
        }
        const data = await response.json();
        setForexSymbols(data);
      } catch (error) {
        setError("Error fetching forex symbols");
        console.error("Error fetching forex symbols:", error);
      }
    };

    fetchForexSymbols();
  }, [apiKey]);

  return (
    <div className="p-8">
      <h2 className="mb-4 text-xl font-semibold">Forex Pairs</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {forexSymbols.length > 0 ? (
          forexSymbols.map((pair, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md"
            >
              <Link
                to={`/details/forex/${pair.symbol}`}
                className="block p-4 text-center hover:bg-gray-100"
              >
                <h3 className="mb-2 text-lg font-semibold">{pair.symbol}</h3>
                <p className="text-sm text-gray-500">{pair.description}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>Loading forex pairs...</p>
        )}
      </div>
    </div>
  );
}

export default ForexSection;
