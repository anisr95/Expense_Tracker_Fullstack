import { Link, useRoutes } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NavContainer from "../../styles/Nav/Nav.styled";

const Nav = () => {
  const [userIsSignedIn, setUserIsSignedIn] = useState(false);
  const [username, setUsername] = useState("");

  const logHandler = () => {
    if (username !== null) {
      localStorage.clear();
      setUserIsSignedIn(false);
    }
  };

  const isUserSignedIn = () => {
    if (localStorage.getItem("username") !== null) {
      setUserIsSignedIn(true);
    } else {
      setUserIsSignedIn(false);
    }
  };

  useEffect(() => {
    isUserSignedIn();
    setUsername(localStorage.getItem("username"));
  }, [username]);
  return (
    <>
      <NavContainer>
        <Box>
          <AppBar position="sticky">
            <Toolbar>
              <Typography variant="h5" sx={{ flexGrow: 1 }}>
                Expense Tracker
              </Typography>
              <Button component={Link} to="/" color="inherit">
                Home
              </Button>
              <Button component={Link} to="/expenses" color="inherit">
                Expenses
              </Button>
              {/* <Link style={{ textDecoration: "none" }} to="/expenses">
                <Button sx={{ color: "white" }} color="inherit">
                  Expenses
                </Button>
              </Link> */}
              <Button
                component={Link}
                to="/auth/register"
                color="inherit"
                onClick={logHandler}
              >
                {userIsSignedIn ? "Logout" : "Login"}
              </Button>
              <Tooltip title="Profile">
                <IconButton>
                  <AccountCircleIcon sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
        </Box>
      </NavContainer>
    </>
  );
};

export default Nav;
