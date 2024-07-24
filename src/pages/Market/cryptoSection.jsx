import React, { useState, useEffect } from "react";

function CryptoSection() {
  const [cryptoData, setCryptoData] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/crypto/symbol?token=${apiKey}`,
        );

        if (response.status === 422) {
          throw new Error(
            "Unprocessable Entity: The server understands the content type but was unable to process the request.",
          );
        }

        if (!response.ok) {
          // Obtener el mensaje de error del servidor
          const errorData = await response.json();
          throw new Error(errorData.message || "Error fetching crypto data");
        }

        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        setError(error.message || "Error fetching crypto data");
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchCryptoData();
  }, [apiKey]);

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Cryptocurrencies</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {cryptoData.map((crypto) => (
          <li key={crypto.symbol} className="mb-2">
            {crypto.name} ({crypto.symbol})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CryptoSection;
