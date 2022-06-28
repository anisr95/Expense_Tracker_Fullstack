import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";

import { Button, Stack, Typography, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";
import Signup from "./Signup";
import Login from "./Login";

const Register = () => {
  const [haveAccount, setHaveAccount] = useState(true);
  return (
    <>
      <Container>
        <Stack
          spacing={2}
          sx={{
            margin: "2rem",
            display: "flex",
            flexDirection: "column",
            // border: "2px solid red",
            width: "600px",
            alignItems: "center",
            margin: "3rem auto",
            padding: "2rem",
          }}
        >
          {haveAccount ? (
            <Login setHaveAccount={setHaveAccount} />
          ) : (
            <Signup setHaveAccount={setHaveAccount} />
          )}
        </Stack>
      </Container>
    </>
  );
};

export default Register;
