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
    <div>
      <h2 className="mb-4 text-xl font-semibold">Forex Pairs</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {forexSymbols.length > 0 ? (
          forexSymbols.map((pair, index) => (
            <li key={index} className="mb-2">
              <Link
                to={`/asset-details/${pair.symbol}/forex`}
                className="text-blue-500 hover:underline"
              >
                {pair.symbol} - {pair.description}
              </Link>
            </li>
          ))
        ) : (
          <p>Loading forex pairs...</p>
        )}
      </ul>
    </div>
  );
}

export default ForexSection;
