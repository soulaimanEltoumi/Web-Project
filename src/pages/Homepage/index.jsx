
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
);

function Homepage() {
  const [symbolData, setSymbolData] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchSymbolData = async () => {
      try {
        const symbolResponse = await fetch(
          `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${apiKey}`,
        );
        if (!symbolResponse.ok) {
          throw new Error("Error fetching symbols");
        }
        const symbols = await symbolResponse.json();

        const pricePromises = symbols.slice(0, 5).map(async (symbol) => {
          const priceResponse = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol.symbol}&token=${apiKey}`,
          );
          if (!priceResponse.ok) {
            return { ...symbol, price: "N/A" };
          }
          const priceData = await priceResponse.json();
          return { ...symbol, price: priceData.c || "N/A" };
        });

        const symbolDataWithPrices = await Promise.all(pricePromises);
        setSymbolData(symbolDataWithPrices);
        setSelectedSymbol(symbolDataWithPrices[0]?.symbol || null);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      }
    };

    fetchSymbolData();
  }, [apiKey]);

  useEffect(() => {
    const fetchChartData = async () => {
      if (!selectedSymbol) return;

      try {
        // Simulated Data - Replace with actual historical data fetching if available
        const simulatedDates = Array.from({ length: 30 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return date.toISOString(); // ISO format for dates
        }).reverse();

        const simulatedPrices = Array.from(
          { length: 30 },
          () => Math.random() * 100 + 100,
        );

        setChartData({
          labels: simulatedDates,
          datasets: [
            {
              label: "Price",
              data: simulatedPrices,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              pointRadius: 5,
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        setError(`Error fetching chart data: ${error.message}`);
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, [selectedSymbol]);

  const handleSymbolChange = (symbol) => {
    setSelectedSymbol(symbol);
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Finnhub Market Data</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {symbolData.map((item) => (
            <div
              key={item.symbol}
              className={`cursor-pointer rounded-lg bg-white p-6 shadow-md ${item.symbol === selectedSymbol ? "border-2 border-blue-500" : ""}`}
              onClick={() => handleSymbolChange(item.symbol)}
            >
              <h2 className="mb-2 text-lg font-semibold">{item.description}</h2>
              <p className="text-gray-600">Symbol: {item.symbol}</p>
              <p className="text-gray-600">Price: ${item.price}</p>
            </div>
          ))}
        </div>
      </div>
      {chartData ? (
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">
            Price Chart for {selectedSymbol}
          </h2>
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
                tooltip: {
                  callbacks: {
                    label: (context) => `Price: $${context.raw}`,
                  },
                },
              },
              scales: {
                x: {
                  type: "time",
                  time: {
                    unit: "day",
                    tooltipFormat: "ll", // 'll' for a more human-readable date
                  },
                  title: {
                    display: true,
                    text: "Date",
                  },
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Price",
                  },
                },
              },
            }}
          />
        </div>
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
}

export default Homepage;
