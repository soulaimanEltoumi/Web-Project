import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function CryptoDetailsPage() {
  const { symbol } = useParams(); // Obtiene el símbolo de la criptomoneda de la URL
  const [cryptoQuote, setCryptoQuote] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;

  useEffect(() => {
    const fetchCryptoQuote = async () => {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`,
        );
        if (!response.ok) {
          throw new Error("Error fetching crypto quote");
        }
        const data = await response.json();
        console.log("data....", data);
        setCryptoQuote(data);
      } catch (error) {
        setError("Error fetching crypto quote");
        console.error("Error fetching crypto quote:", error);
      }
    };

    fetchCryptoQuote();
  }, [symbol, apiKey]);

  const chartData = {
    labels: ["Open", "High", "Low", "Current"],
    datasets: [
      {
        label: "Price",
        data: [cryptoQuote?.o, cryptoQuote?.h, cryptoQuote?.l, cryptoQuote?.c], // Data points
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.raw.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Price Type",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Price ($)",
        },
      },
    },
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Crypto Details: {symbol}</h1>
      {error && <p className="text-red-500">{error}</p>}
      {cryptoQuote ? (
        <div>
          <p>Current Price: ${cryptoQuote.c}</p>
          <p>Change: ${cryptoQuote.d}</p>
          <p>Percent Change: {cryptoQuote.dp}%</p>
          <p>High Price of the Day: ${cryptoQuote.h}</p>
          <p>Low Price of the Day: ${cryptoQuote.l}</p>
          <p>Open Price of the Day: ${cryptoQuote.o}</p>
          <p>Previous Close Price: ${cryptoQuote.pc}</p>

          {/* Chart Section */}
          <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Daily Price Summary</h2>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      ) : (
        <p>Loading crypto details...</p>
      )}
    </div>
  );
}

export default CryptoDetailsPage;
