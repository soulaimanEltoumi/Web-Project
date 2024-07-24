// StockSection.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function StockSection() {
  const [stockData, setStockData] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${apiKey}`,
        );
        if (!response.ok) throw new Error("Error fetching stock data");
        const data = await response.json();
        setStockData(data);
      } catch (error) {
        setError("Error fetching stock data");
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, [apiKey]);

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Stocks</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {stockData.map((stock) => (
          <li key={stock.symbol} className="mb-2">
            <Link
              to={`/asset-details/${stock.symbol}/stock`}
              className="text-blue-500 hover:underline"
            >
              {stock.description} ({stock.symbol})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StockSection;
