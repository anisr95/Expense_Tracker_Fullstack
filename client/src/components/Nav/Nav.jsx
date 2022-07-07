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

const Nav = (props) => {
  // const [userIsSignedIn, setUserIsSignedIn] = useState(false);
  const [username, setUsername] = useState(null);

  const logHandler = () => {
    // props.setUserIsSignedIn(false);
    // localStorage.clear();
    if (localStorage.getItem("username") !== null) {
      localStorage.clear();
      props.setIsUserLoggedIn(false);
    }
    // if (localStorage.getItem("loggedIn") === "true") {
    //   setUserIsSignedIn(true);
    // }
  };

  // const isUserSignedIn = () => {
  //   if (localStorage.getItem("username") !== null) {
  //     props.setUserIsSignedIn(true);
  //   } else {
  //     props.setUserIsSignedIn(false);
  //   }
  // if (localStorage.getItem("loggedIn") === "true") {
  //   setUserIsSignedIn(true);
  // }
  // };

  // useEffect(() => {
  //   isUserSignedIn();

  // }, []);
  return (
    <>
      <NavContainer>
        <Box minWidth="400px">
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
                {props.isUserLoggedIn && "Logout"}
                {console.log("Servise kard: ", props.isUserLoggedIn)}
                {!props.isUserLoggedIn && "Login"}
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
