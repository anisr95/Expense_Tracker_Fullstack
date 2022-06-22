import { Link } from "react-router-dom";
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
              <Button href="#" color="inherit">
                Login
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
