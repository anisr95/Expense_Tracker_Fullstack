import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const navigate = useNavigate();

  const loginHandler = async () => {
    const enteredUser = {
      username,
      password,
    };

    // const user = await axios.post("/user/getUser", enteredUser);
    const user = await axios.post("/auth/login", enteredUser);
    console.log("User info: ", user);
    console.log("User data: ", user.data);
    setAccessToken(user.data.token);
    // sessionStorage.setItem("jwt", user.data.token);
    localStorage.setItem("jwt", user.data.token);
    localStorage.setItem("username", user.data.user.username);

    if (user) {
      navigate("/expenses");
    }
  };

  return (
    <>
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
    </>
  );
};

export default Login;
