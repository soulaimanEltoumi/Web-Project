import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useLocation } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import logo from "../assets/logo.png";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "20ch",
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();

  const isMenuOpen = Boolean(anchorEl);
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const loggingOut = () => {
    setTimeout(() => {
      handleMenuClose();
      sessionStorage.removeItem("isLoggedIn");
    }, 1000);
  };

  const goToMarket = () => {
    navigate("/market");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to="/Log In">
        Log In
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/Signup">
        Sign Up
      </MenuItem>
    </Menu>
  );
  const renderMenuItems = isLoggedIn
    ? [
        <MenuItem
          key="profile"
          onClick={handleMenuClose}
          component={Link}
          to="/profile"
        >
          Profile
        </MenuItem>,
        <MenuItem key="logout" onClick={loggingOut} component={Link} to="/">
          Log Out
        </MenuItem>,
      ]
    : [
        <MenuItem
          key="login"
          onClick={handleMenuClose}
          component={Link}
          to="/login"
        >
          Login
        </MenuItem>,
        <MenuItem
          key="signup"
          onClick={handleMenuClose}
          component={Link}
          to="/signup"
        >
          Signup
        </MenuItem>,
      ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" className="text-2xl font-bold">
            <img src={logo} alt="Logo" style={{ height: "40px" }} />
          </Link>
          {location.pathname === "/" ||
          location.pathname === "/market" ||
          location.pathname === "/favourite-list" ? (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          ) : null}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            <IconButton
              size="large"
              aria-label="show market"
              color="inherit"
              component={Link}
              to="/market"
            >
              <CandlestickChartIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {renderMenuItems}
      </Menu>
    </Box>
  );
}
