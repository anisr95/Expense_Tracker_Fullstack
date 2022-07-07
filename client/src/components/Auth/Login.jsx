import {
  Button,
  TextField,
  Typography,
  Box,
  Stack,
  Container,
} from "@mui/material";
import React, { useState } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import SnackbarCustom from "../Utils/SnackbarCustom";
// import { Container } from "@mui/system";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  const loginHandler = async () => {
    const enteredUser = {
      username,
      password,
    };

    // const user = await axios.post("/user/getUser", enteredUser);
    const user = await axios.post("/auth/login", enteredUser).catch((err) => {
      setErrorMessage(err.response.data);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 4000);
    });

    if (user) {
      navigate("/expenses");
    } else {
      console.log("This error is from Login: ", user);
    }
  };

  return (
    <>
      {/* <Box display="flex" flexDirection="column"> */}
      {/* <Container maxWidth="sm"> */}
      {/* <Stack
        spacing={2}
        flex
        justifyContent="center"
        alignItems="center"
        // maxWidth="600px"
      > */}
      <Typography
        variant="h3"
        color="primary.light"
        sx={{ letterSpacing: "4px" }}
      >
        Login
      </Typography>
      <TextField
        variant="outlined"
        label="Username"
        fullWidth
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <TextField
        type="password"
        variant="outlined"
        label="Password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Typography
        variant="p"
        color="primary.light"
        onClick={() => props.setHaveAccount(false)}
        sx={{ cursor: "pointer", "&:hover": { color: "blue" } }}
      >
        Don't have an account? Register Here
      </Typography>
      <Button variant="outlined" onClick={loginHandler}>
        Login
      </Button>
      {/* </Stack> */}
      {/* </Container> */}
      {/* </Box> */}

      <SnackbarCustom
        onClick={() => setShowError(false)}
        open={showError}
        type="error"
        errorMessage={errorMessage}
      />
    </>
  );
};

export default Login;
