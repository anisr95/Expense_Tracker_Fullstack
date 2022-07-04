import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Nav from "../Nav/Nav";

const NewExpense = (props) => {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState({});

  const navigate = useNavigate();

  const submitHandler = async () => {
    console.log("Userrrrr: ", localStorage.getItem("username"));
    const newProduct = {
      item,
      amount,
      date,
      category,
      username: localStorage.getItem("username"),
    };

    console.log(typeof date);

    console.log("Submiting");
    await axios.post("/expenses/new", newProduct);

    setItem("");
    setAmount(0);
    setDate("");
    setCategory("");
    setCategories("");

    navigate("/expenses");
  };

  const getCategories = async () => {
    const userExpenses = await axios.post(
      "/expenses/userExpenses",
      { username: localStorage.getItem("username") },
      {
        headers: { authorization: localStorage.getItem("jwt") },
      }
    );
    // const expenses = await axios.get("/expenses");
    console.log("Useeeeeeee", userExpenses);
    const categories = [];
    for (let i = 0; i < userExpenses.data.expenses.length; i++) {
      // console.log("Category #" + i);
      if (userExpenses.data.expenses[i].category) {
        categories.push(userExpenses.data.expenses[i].category);
      }
    }
    const uniqueCategories = [...new Set(categories)];
    console.log("Categories Type: " + typeof uniqueCategories);
    setCategories(uniqueCategories);
    // return uniqueCategories;
  };

  useEffect(() => {
    getCategories();
    console.log("in useEffect" + categories);
  }, []);
  return (
    <>
      {/* <Nav /> */}
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // border: "3px solid green",
        }}
      >
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
          <Typography
            variant="h3"
            color="primary.light"
            sx={{ letterSpacing: "4px" }}
          >
            Enter A New Expense
          </Typography>
          <TextField
            variant="outlined"
            label="Item"
            onChange={(e) => setItem(e.target.value)}
            fullWidth
            value={item}
          />
          <TextField
            type="number"
            variant="outlined"
            label="Amount"
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            value={amount}
          />
          <TextField
            label="Date"
            type="date"
            // defaultValue={new Date()}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            value={date}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {/* <TextField
            variant="outlined"
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            value={category}
          /> */}
          <Autocomplete
            options={categories}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                onChange={(e, newCategory) => setCategory(e.target.value)}
              />
            )}
            onChange={(e) => setCategory(e.target.innerText)}
            freeSolo
            fullWidth
            value={category}
          />
          <Button variant="outlined" onClick={submitHandler}>
            Add New Expense
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default NewExpense;
