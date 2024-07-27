import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Line } from "react-chartjs-2";
import { useAuth } from "../../contexts/AuthContext";

function StockSection() {
  const [stockData, setStockData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;
  const { user } = useAuth();

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
        setError(error.message);
      }
    };

    const fetchFavorites = async () => {
      try {
        const response = await fetch(
          `https://json-server-backend-production.up.railway.app/favorites?userId=1`,
        );
        if (!response.ok) throw new Error("Error fetching favorites");
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchStockData();
    fetchFavorites();
  }, [apiKey]);

  const handleToggleFavorite = (symbol) => {
    const favorite = favorites.find((fav) => fav.symbolId === symbol);

    if (favorite) {
      fetch(
        `https://json-server-backend-production.up.railway.app/favorites/${favorite.id}`,
        {
          method: "DELETE",
        },
      ).then((response) => {
        if (response.ok) {
          setFavorites(favorites.filter((fav) => fav.symbolId !== symbol));
          console.log("Favorite removed successfully");
        } else {
          console.error("Failed to remove favorite");
        }
      });
    } else {
      fetch(`https://json-server-backend-production.up.railway.app/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          symbolId: symbol,
        }),
      }).then((response) => {
        if (response.ok) {
          response.json().then((newFavorite) => {
            setFavorites([...favorites, newFavorite]);
            console.log("Favorite added successfully");
          });
        } else {
          console.error("Failed to add favorite");
        }
      });
    }
  };

  const isFavorite = (symbol) =>
    favorites.some((fav) => fav.symbolId === symbol);

  const sampleChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Price",
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div>
      <h2>Stock Section</h2>
      {error && <p>{error}</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {stockData.slice(0, 10).map((stock) => (
          <Card key={stock.symbol} sx={{ maxWidth: 345 }}>
            <CardHeader
              title={
                <Link to={`/stock/${stock.symbol}`}>{stock.description}</Link>
              }
              action={
                <IconButton
                  edge="end"
                  aria-label="save"
                  onClick={() => handleToggleFavorite(stock.symbol)}
                  style={{
                    color: isFavorite(stock.symbol) ? "red" : "gray",
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {stock.symbol}
              </Typography>
              <Line data={sampleChartData} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default StockSection;
