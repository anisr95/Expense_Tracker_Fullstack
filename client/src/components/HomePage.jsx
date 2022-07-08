import React, { useState, useEffect } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import bgImage from "../assets/expenseTracker.jpeg";
import mongodbIcon from "../assets/mongodbIcon.png";
import expressIcon from "../assets/expressIcon.png";
import reactIcon from "../assets/reactIcon.png";
import nodeIcon from "../assets/nodeIcon.png";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const userLoginStatus = () => {
    if (localStorage.getItem("jwt")) {
      setIsUserLoggedIn(true);
    }
  };

  useEffect(() => {
    userLoginStatus();
  }, []);

  return (
    <div>
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: "3rem",
          marginTop: "2rem",
          maxWidth: "700px",
        }}
      >
        <Typography className="title" variant="h2" color="primary" gutterBottom>
          Expense Tracker Project
        </Typography>
        <Typography className="title" variant="h6" color="secondary">
          This is a CRUD (Create, Read, Update, Delete) app, built using MERN
          stack (MongoDB, Express, React, and Node)
        </Typography>
        <Typography gutterBottom variant="h6" color="secondary">
          Go to Expenses tab to start
        </Typography>
        <Typography variant="p" color="secondary.light">
          This project is still not finished, please come back after a few days
          to see the latest version
        </Typography>
        <Typography variant="p" color="secondary.light">
          Future updates: Expense Tracker Graph, Login/Logout and user
          Authentication, Ability to create profile, Becoming more responsive
          for Mobile and Tablet use, and many more
        </Typography>
      </Box> */}
      <Box
        className="bg"
        sx={{
          backgroundImage: `url("${bgImage}")`,
        }}
      ></Box>
      <Box className="content">
        <Container sx={{ textAlign: "left" }}>
          <Typography gutterBottom variant="h2">
            Expense Tracker
          </Typography>
          <Typography variant="h5">Stack Used:</Typography>
          <Stack marginTop="2rem" spacing={4}>
            <Stack direction="row" alignItems="center" spacing={3} width="80px">
              <img src={mongodbIcon} alt="MongoDB Icon" width="80px" />
              <Typography variant="h5"> MongoDB</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={3} width="80px">
              <img src={expressIcon} alt="express Icon" width="80px" />
              <Typography variant="h5"> Express</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={3} width="80px">
              <img src={reactIcon} alt="react Icon" width="80px" />
              <Typography variant="h5"> React</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={3} width="80px">
              <img src={nodeIcon} alt="node Icon" width="80px" />
              <Typography variant="h5"> Node</Typography>
            </Stack>
          </Stack>
          {!isUserLoggedIn && (
            <Stack sx={{ marginTop: "2rem", width: "200px" }}>
              <Typography color="primary.dark" variant="h6">
                Start by Loggin in
              </Typography>
              <Button
                component={Link}
                to="/auth/register"
                sx={{
                  marginTop: "1rem",
                  marginBottom: "2rem",
                  padding: "0.6rem 4rem",
                }}
                // large
                variant="contained"
              >
                Login
              </Button>
            </Stack>
          )}
        </Container>
      </Box>
    </div>
  );
};

export default HomePage;
