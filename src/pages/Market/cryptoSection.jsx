// CryptoSection.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

function CryptoSection() {
  const [symbols, setSymbols] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        // Get all exchanges
        const exchangesResponse = await fetch(
          `https://finnhub.io/api/v1/crypto/exchange?token=${apiKey}`,
        );
        if (!exchangesResponse.ok) {
          throw new Error("Error fetching crypto exchanges");
        }
        const exchangesData = await exchangesResponse.json();

        // Fetch symbols for each exchange
        const symbolsPromises = exchangesData.map((exchange) =>
          fetch(
            `https://finnhub.io/api/v1/crypto/symbol?exchange=${exchange}&token=${apiKey}`,
          ).then((res) => res.json()),
        );

        // Wait for all symbols to be fetched
        const allSymbols = await Promise.all(symbolsPromises);
        // Flatten the array of arrays
        const flattenedSymbols = allSymbols.flat();

        setSymbols(flattenedSymbols);
      } catch (error) {
        setError("Error fetching crypto symbols");
        console.error("Error fetching crypto symbols:", error);
      }
    };

    fetchSymbols();
  }, [apiKey]);

  return (
    <div className="p-8">
      <h2 className="mb-4 text-xl font-semibold">Available Crypto Symbols</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {symbols.length > 0 ? (
          symbols.map((symbol, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md"
            >
              <Link
                to={`/crypto-details/${symbol.symbol}`}
                className="block p-4 text-center hover:bg-gray-100"
              >
                <h3 className="mb-2 text-lg font-semibold">
                  {symbol.displaySymbol}
                </h3>
                <p className="text-sm text-gray-500">{symbol.symbol}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>Loading crypto symbols...</p>
        )}
      </div>
    </div>
  );
}

export default CryptoSection;
