import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  IconButton,
  Icon,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import React from "react";
import Nav from "../Nav/Nav";

const Expense = () => {
  const [expenses, setExpenses] = useState([{}]);

  const deleteExpense = async (id) => {
    console.log("Deletiiiing");
    await axios.delete("http://localhost:3001/expenses/" + id);
    window.location.reload();
  };

  const getAllExpenses = async () => {
    console.log("I was ran");
    const expenses = await axios.get("http://localhost:3001/expenses");
    setExpenses(expenses.data);
    console.log(expenses);
    console.log(expenses.data);

    // return expenses;
  };

  const editExpense = async (link, expense) => {
    console.log(link, expense);
    await axios.get("http://localhost:3001/" + link, expense);
  };

  useEffect(() => {
    getAllExpenses();
    console.log("This is useEffect");
    // console.log(expenses);
  }, []);

  return (
    <>
      <Nav />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
          alignItems: "center",
          //   border: "2px solid blue",
        }}
      >
        <Typography letterSpacing={3} variant="h2" color="secondary.light">
          All Expenses in a Glance
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          // border: "1px solid red",
          width: "1100px",
          margin: "1rem auto",
        }}
      >
        <Button
          component={Link}
          to="/expenses/new"
          variant="contained"
          sx={{ marginLeft: "2rem" }}
        >
          New Expense
        </Button>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {/* Commenting Staaart */}
        {/* {expenses.map((expense, pos) => (
          <Card
            sx={{
              width: 875,
              margin: "1rem",
              boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
            }}
            key={pos}
          >
            {console.log(expense)}
            <Stack spacing={6}>
              <CardContent
                sx={{
                  margin: "1rem",
                  textAlign: "center",
                }}
              >
    
                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography color="primary" variant="h5">
                      {expense.item}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} md={2}>
                    <Typography color="secondary" variant="h6">
                      {expense.amount}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Typography color="primary.light" variant="h6">
                      {moment.utc(String(expense.date)).format("DD-MM-YYYY")}
                      {console.log(
                        moment.utc(String(expense.date)).format("DD MM YYYY")
                      )}
                      {console.log(expense.date)}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Typography color="secondary.light" variant="h6">
                      {expense.category}
                    </Typography>
                  </Grid> */}

        {/* Commenting Eeeeend */}

        <TableContainer
          component={Paper}
          sx={{ maxWidth: "1100px", marginTop: "0.5rem", marginBottom: "4rem" }}
        >
          <Table aria-label="Expenses">
            <TableHead>
              <TableRow sx={{ bgcolor: "primary.main", color: "#fff" }}>
                <TableCell sx={{ color: "#fff" }}>Item</TableCell>
                <TableCell sx={{ color: "#fff" }} align="left">
                  Amount
                </TableCell>
                <TableCell sx={{ color: "#fff" }} align="left">
                  Date
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>Category</TableCell>
                <TableCell sx={{ color: "#fff" }}>Edit</TableCell>
                <TableCell sx={{ color: "#fff" }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense, pos) => (
                <TableRow
                  key={pos}
                  sx={{
                    "&:last-child td, &last-child th": { border: 0 },
                  }}
                >
                  <TableCell>
                    <Typography
                      color="primary"
                      variant="subtitle1"
                      sx={{ fontWeight: "400" }}
                    >
                      {expense.item}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography color="secondary" variant="subtitle2">
                      ${expense.amount}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography color="primary" variant="p">
                      {moment.utc(String(expense.date)).format("MM-DD-YYYY")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="secondary.light" variant="p">
                      {expense.category}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      sx={{
                        "&:hover": {
                          color: "green",
                        },
                      }}
                      href={`expenses/${expense._id}`}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      sx={{
                        "&:hover": { color: "#ee0000" },
                      }}
                      onClick={() => {
                        deleteExpense(expense._id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ======================== */}
        {/* <Typography color="primary" variant="h4">
                {expense.item}
              </Typography>
              <Typography color="secondary" variant="h6">
                {expense.amount}
              </Typography>
              <Typography color="primary.light" variant="h6">
                {expense.date}
              </Typography>
              <Typography color="secondary.light" variant="h6">
                {expense.category}
              </Typography> */}
        {/* ======================= */}
        {/* </Grid> */}
        {/* </div> */}
        {/* </Stack> */}
        {/* {expense.item} {expense.amount} */}
        {/* </div> */}
        {/* </CardContent> */}
        {/* </Stack> */}
        {/* </Card> */}
        {/* ))} */}
      </Box>
    </>
  );
};

export default Expense;
