import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { useAuth } from "../contexts/AuthContext";

export default function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login
  const [message, setMessage] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      username: data.get("username"),
      password: data.get("password"),
      email: data.get("email"),
    };
    const { username, password, email } = data;
    if (!username || !password || !email) {
      setMessage("All fields are required");
      return;
    }

    try {
      const salt = bcrypt.genSaltSync(10);
      const hashed_password = bcrypt.hashSync(password, salt);
      const response = await axios.post(
        "https://json-server-backend-production.up.railway.app/users",
        {
          username,
          password: hashed_password,
          email,
        },
      );

      if (response.status === 201) {
        setMessage("Registration successful");
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("userId", response.data.id);
        login(response.data); // Log in using AuthContext
        setTimeout(() => {
          navigate("/");
        }, 1000);
        return;
      }
      setMessage("Registration failed");
    } catch (error) {
      console.error(error);
      setMessage("Error occurred");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            autoComplete="email"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <NavLink to="/login" variant="body2">
                {"Already have an account? Sign In"}
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <div className="my-2 text-center">{message}</div>
    </Container>
  );
}
