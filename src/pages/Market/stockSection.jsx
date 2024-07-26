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
    <div className="p-8">
      <h2 className="mb-4 text-xl font-semibold">Available Stocks</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {stockData.length > 0 ? (
          stockData.map((stock) => (
            <div
              key={stock.symbol}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md"
            >
              <Link
                to={`/stocks-details/${stock.symbol}`}
                className="block p-4 text-center hover:bg-gray-100"
              >
                <h3 className="mb-2 text-lg font-semibold">
                  {stock.description}
                </h3>
                <p className="text-sm text-gray-500">{stock.symbol}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>Loading stock data...</p>
        )}
      </div>
    </div>
  );
}

export default StockSection;
