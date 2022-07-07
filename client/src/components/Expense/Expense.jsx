import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Link, NavLink, useNavigate } from "react-router-dom";

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
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Container } from "@mui/system";
import React from "react";
import Nav from "../Nav/Nav";

const Expense = () => {
  const [expenses, setExpenses] = useState([{}]);
  const [userExpenses, setUserExpenses] = useState([{}]);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const deleteExpense = async (id) => {
    console.log("Deletiiiing");
    await axios.delete("/expenses/" + id);
    // const filteredExpenses = expenses.filter((expense) => expense._id !== id);
    const filteredExpenses = userExpenses.filter(
      (expense) => expense._id !== id
    );
    // setExpenses(filteredExpenses);
    setUserExpenses(filteredExpenses);
    // window.location.reload();
    // navigate(0);
  };

  const getAllExpenses = async () => {
    console.log("I was ran");
    const expenses = await axios.get("/expenses", {
      headers: { authorization: localStorage.getItem("jwt") },
    });
    setExpenses(expenses.data);
    setIsLoading(false);

    console.log(expenses.data);

    // return expenses;
  };

  const getUserExpenses = async () => {
    const userExpenses = await axios.post(
      "/expenses/userExpenses",
      { username: localStorage.getItem("username") },
      {
        headers: { authorization: localStorage.getItem("jwt") },
      }
    );
    setUserExpenses(userExpenses.data.expenses);
    setIsLoading(false);
    console.log("UserExpenses: ", userExpenses);
  };

  useEffect(() => {
    setIsLoading(true);
    getAllExpenses();
    setAccessToken(localStorage.getItem("jwt"));
    console.log("This is useEffect 1");
    getUserExpenses();
    // console.log(expenses);
  }, []);

  return (
    <>
      {/* <Nav /> */}
      {accessToken ? (
        <Container>
          (
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
              // border: "1px solid green",
              maxWidth: "1100px",
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
            <TableContainer
              component={Paper}
              sx={{
                maxWidth: "1100px",
                marginTop: "0.5rem",
                marginBottom: "4rem",
              }}
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
                  {!isLoading &&
                    userExpenses.map((expense, pos) => (
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
                            {moment
                              .utc(String(expense.date))
                              .format("MM-DD-YYYY")}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="secondary.light" variant="p">
                            {expense.category}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            component={Link}
                            sx={{
                              "&:hover": {
                                color: "green",
                              },
                            }}
                            to={`./${expense._id}`}
                            // href={`expenses/${expense._id}`}
                          >
                            {/* <NavLink to={`expenses/${expense._id}`}> */}
                            {/* <Link to={`./${expense._id}`}> */}
                            <EditIcon />
                            {/* </Link> */}
                            {/* </NavLink> */}
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
              {isLoading && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "1rem 0",
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
            </TableContainer>
            {userExpenses.length === 0 && (
              <Typography
                sx={{ letterSpacing: "0.3rem" }}
                variant="h4"
                color="primary.dark"
              >
                No Expenses to display
              </Typography>
            )}

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
        </Container>
      ) : (
        <Container
          display="flex"
          justifyContent="center"
          alignItems="center"
          align="center"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15rem",
              alignItems: "center",
              flexDirection: "column",

              //   border: "2px solid blue",
            }}
          >
            <Typography
              sx={{ letterSpacing: "0.2rem" }}
              variant="h2"
              color="primary.dark"
              marginTop="3rem"
              marginBottom="2rem"
            >
              You must Login first
            </Typography>
            <Button
              component={Link}
              to="/auth/register"
              variant="contained"
              size="large"
            >
              Login
            </Button>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Expense;
