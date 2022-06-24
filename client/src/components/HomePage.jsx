import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const HomePage = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: "3rem",
          marginTop: "2rem",
        }}
      >
        <Typography variant="h2" color="primary" gutterBottom>
          Expense Tracker Project
        </Typography>
        <Typography variant="h6" color="secondary">
          This is a CRUD (Create, Read, Update, Delete) app, built using MERN
          stack (MondoDB, Express, React, and Node)
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
      </Box>
    </div>
  );
};

export default HomePage;
