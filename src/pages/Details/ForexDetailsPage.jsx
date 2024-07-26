import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ForexDetailsPage() {
  const { symbol } = useParams(); // Obtiene el símbolo del par de divisas de la URL
  const [forexQuote, setForexQuote] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;

  useEffect(() => {
    const fetchForexQuote = async () => {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`,
        );

        // Verificar si la respuesta es un HTML o JSON
        const contentType = response.headers.get("content-type");
        if (!response.ok) {
          throw new Error(
            `Error fetching forex quote: ${response.status} ${response.statusText}`,
          );
        }

        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setForexQuote(data);
        } else {
          throw new Error("Response is not JSON. Possibly an error page.");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching forex quote:", error);
      }
    };

    fetchForexQuote();
  }, [symbol, apiKey]);

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Forex Details: {symbol}</h1>
      {error && <p className="text-red-500">{error}</p>}
      {forexQuote ? (
        <div>
          <p>Current Price: ${forexQuote.c}</p>
          <p>Change: ${forexQuote.d}</p>
          <p>Percent Change: {forexQuote.dp}%</p>
          <p>High Price of the Day: ${forexQuote.h}</p>
          <p>Low Price of the Day: ${forexQuote.l}</p>
          <p>Open Price of the Day: ${forexQuote.o}</p>
          <p>Previous Close Price: ${forexQuote.pc}</p>
        </div>
      ) : (
        <p>Loading forex details...</p>
      )}
    </div>
  );
}

export default ForexDetailsPage;
