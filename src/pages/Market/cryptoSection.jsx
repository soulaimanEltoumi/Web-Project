// CryptoSection.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

function CryptoSection() {
  const [cryptoExchanges, setCryptoExchanges] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchCryptoExchanges = async () => {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/crypto/exchange?token=${apiKey}`,
        );
        if (!response.ok) {
          throw new Error("Error fetching crypto exchanges");
        }
        const data = await response.json();
        console.log("Fetched crypto exchanges:", data); // Debugging line
        setCryptoExchanges(data);
      } catch (error) {
        setError("Error fetching crypto exchanges");
        console.error("Error fetching crypto exchanges:", error);
      }
    };

    fetchCryptoExchanges();
  }, [apiKey]);

  return (
    <div className="p-8">
      <h2 className="mb-4 text-xl font-semibold">Available Crypto Exchanges</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {cryptoExchanges.length > 0 ? (
          cryptoExchanges.map((exchange, index) => (
            <li key={index} className="mb-2">
              <Link
                to={`/crypto-details/${exchange}`}
                className="text-blue-500 hover:underline"
              >
                {exchange}
              </Link>
            </li>
          ))
        ) : (
          <p>Loading crypto exchanges...</p>
        )}
      </ul>
    </div>
  );
}

export default CryptoSection;
