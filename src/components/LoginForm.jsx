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
import { useAuth } from "../contexts/AuthContext"; // Import the AuthContext

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from AuthContext
  const [message, setMessage] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      username: data.get("username"),
      password: data.get("password"),
    };
    const { username, password } = data;
    if (!username || !password) {
      setMessage("All fields are required");
      return;
    }

    try {
      const response = await axios.get(
        `https://json-server-backend-production.up.railway.app/users?username=${username}`,
      );

      if (response.data.length === 0) {
        setMessage("User not found");
        return;
      }

      const user = response.data[0];
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        setMessage("Invalid password");
        return;
      }

      setMessage("Login successful");
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userId", user.id); // Store the user ID in session storage
      login(user); // Log in the user using AuthContext
      setTimeout(() => {
        navigate("/");
      }, 1000);
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
          Sign in
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
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <NavLink
                to="/forgotpassword"
                variant="body2"
                className="text-blue-500"
              >
                Forgot password?
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to="/signup" className="text-blue-500">
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <div className="my-2 text-center">{message}</div>
    </Container>
  );
}
