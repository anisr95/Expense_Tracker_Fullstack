import { Alert, Button, Snackbar, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import SnackbarCustom from "../Utils/SnackbarCustom";

const Signup = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [haveAccount, setHaveAccount] = useState(true);
  const [accessToken, setAccessToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async () => {
    const newUser = {
      username,
      password,
    };
    const user = await axios.post("/auth/register", newUser).catch((err) => {
      console.log("Dg this is it", err);
      setErrorMessage(err.response.data);
      console.log("This is the error message: ", errorMessage);
      setShowError(true);
      // openToast();
    });

    console.log("us us us user", user);

    setAccessToken(user.data.token);
    localStorage.setItem("jwt", user.data.token);
    localStorage.setItem("username", user.data.newUser.username);
    localStorage.setItem("loggedIn", "true");

    props.setIsUserLoggedIn(true);

    if (user) {
      console.log("did I ran?");
      navigate("/expenses");
    } else {
      console.log("This error is from Signup: ", user);
    }
    setUsername("");
    setPassword("");
  };

  const [open, setOpen] = React.useState(false);
  const openToast = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Typography
        variant="h3"
        color="primary.light"
        sx={{ letterSpacing: "4px" }}
      >
        Sign Up
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
        onClick={() => props.setHaveAccount(true)}
        sx={{ cursor: "pointer", "&:hover": { color: "blue" } }}
      >
        Already have an account? Login here
      </Typography>
      <Button variant="outlined" onClick={submitHandler}>
        Sign Up
      </Button>
      {/* <Button onClick={() => setShowError(false)}>Test</Button> */}

      <SnackbarCustom
        onClick={() => setShowError(false)}
        open={showError}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default Signup;
