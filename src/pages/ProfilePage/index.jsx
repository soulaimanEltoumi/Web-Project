import React, { useState, useEffect } from "react";
import {
  Container,
  Avatar,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch user data
    fetch("https://json-server-backend-production.up.railway.app/users/1")
      .then((response) => response.json())
      .then((data) => setUser(data));

    // Fetch user's favorite symbols
    fetch(
      "https://json-server-backend-production.up.railway.app/favorites?userId=1",
    )
      .then((response) => response.json())
      .then((data) => setFavorites(data));
  }, []);

  const handleRemoveFavorite = (id) => {
    // Remove the item from the database
    fetch(
      `https://json-server-backend-production.up.railway.app/favorites/${id}`,
      {
        method: "DELETE",
      },
    ).then((response) => {
      if (response.ok) {
        // Update the favorites state to remove the item
        setFavorites(favorites.filter((fav) => fav.id !== id));
      } else {
        console.error("Failed to delete the favorite item");
      }
    });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Avatar
              alt={user.username}
              src="/static/images/avatar/1.jpg"
              sx={{ width: 128, height: 128 }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {user.username}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {user.email}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Card elevation={3} sx={{ p: 4, mt: 4 }}>
        <CardHeader title="Favorites" />
        <CardContent>
          <List>
            {favorites.map((fav) => (
              <ListItem
                key={fav.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveFavorite(fav.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={fav.symbolId} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;
