import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

export default function SignIn() {
  const navigate = useNavigate();
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
      setMessage("Username and Password are required");
      return;
    }

    try {
      const foundUser = await axios.get(
        `https://json-server-backend-production.up.railway.app/users?username=${username}`,
      );
      if (!foundUser) {
        setMessage("User not found");
        return;
      }
      const hashedPassword = foundUser.data[0].password;
      const passwordMatch = bcrypt.compareSync(password, hashedPassword);
      if (passwordMatch) {
        setMessage("Login successful");
        sessionStorage.setItem("isLoggedIn", true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
        return;
      }
      setMessage("Invalid credentials");
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
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <NavLink to="/signup" className="text-blue-400">
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
