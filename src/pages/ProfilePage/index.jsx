import React, { useState, useEffect } from "react";
import {
  Container,
  Avatar,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../../contexts/AuthContext"; // Import the AuthContext

const ProfilePage = () => {
  const { user, setUser } = useAuth(); // Get the logged-in user and setUser function from AuthContext
  const [favorites, setFavorites] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);

      // Fetch user's favorite symbols
      fetch(
        `https://json-server-backend-production.up.railway.app/favorites?userId=${user.id}`,
      )
        .then((response) => response.json())
        .then((data) => setFavorites(data));
    }
  }, [user]);

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

  const handleSaveChanges = () => {
    // Update the user data in the database
    fetch(
      `https://json-server-backend-production.up.railway.app/users/${user.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email }),
      },
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to update user data");
      })
      .then((updatedUser) => {
        setUser(updatedUser);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
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
            {isEditing ? (
              <>
                <TextField
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h4" gutterBottom>
                  {user.username}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Email: {user.email}
                </Typography>
                <Button variant="contained" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              </>
            )}
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
