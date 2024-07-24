import React, { useState, useEffect } from "react";

function ForexSection() {
  const [forexData, setForexData] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchForexData = async () => {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/forex/symbol?token=${apiKey}`,
        );
        if (!response.ok) throw new Error("Error fetching forex data");
        const data = await response.json();
        setForexData(data);
      } catch (error) {
        setError("Error fetching forex data");
        console.error("Error fetching forex data:", error);
      }
    };

    fetchForexData();
  }, [apiKey]);

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Forex</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {forexData.map((forex) => (
          <li key={forex.symbol} className="mb-2">
            {forex.name} ({forex.symbol})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ForexSection;
