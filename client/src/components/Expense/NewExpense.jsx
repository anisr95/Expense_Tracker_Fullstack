import { useState, useEffect } from "react";
import axios from "axios";
import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Nav from "../Nav/Nav";

const NewExpense = () => {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState({});

  const submitHandler = () => {
    const newProduct = {
      item,
      amount,
      date,
      category,
    };
    console.log(typeof date);

    console.log("Submiting");
    axios.post("http://localhost:3001/expenses/new", newProduct);

    setItem("");
    setAmount(0);
    setDate("");
    setCategory("");
    setCategories("");
  };

  const getCategories = async () => {
    const expenses = await axios.get("http://localhost:3001/expenses");
    const categories = [];
    for (let i = 0; i < expenses.data.length; i++) {
      // console.log("Category #" + i);
      if (expenses.data[i].category) {
        categories.push(expenses.data[i].category);
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
      <Nav />
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
            defaultValue={new Date()}
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
