import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [haveAccount, setHaveAccount] = useState(true);
  const [accessToken, setAccessToken] = useState("");

  const navigate = useNavigate();

  const submitHandler = async () => {
    const newUser = {
      username,
      password,
    };
    const user = await axios.post("/auth/register", newUser);

    console.log("us us us user", user);

    setAccessToken(user.data.token);
    localStorage.setItem("jwt", user.data.token);
    localStorage.setItem("username", user.data.newUser.username);

    setUsername("");
    setPassword("");
    navigate("/expenses");
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
    </>
  );
};

export default Signup;
