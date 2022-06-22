import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Nav from "../Nav/Nav";

const EditExpense = (props) => {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState({});
  const [slicedDate, setSlicedDate] = useState("");

  const params = useParams();
  const navigate = useNavigate();
  console.log(params);

  const [expense, setExpense] = useState({});

  const getOneExpense = async (id) => {
    const oneExpense = await axios.get("/expenses/" + id);
    setExpense(oneExpense.data);
    setItem(oneExpense.data.item);
    setAmount(oneExpense.data.amount);
    setDate(oneExpense.data.date);
    setCategory(oneExpense.data.category);
    setSlicedDate(oneExpense.data.date.slice(0, 10));
    console.log("One Expense: ", oneExpense.data);
  };

  const getCategories = async () => {
    const expenses = await axios.get("/expenses");
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

  const submitHandler = () => {
    const editedProduct = {
      item,
      amount,
      date,
      category,
    };
    console.log("Edited Product: " + editedProduct);

    console.log("in submitting" + params.id);
    console.log("Editting");
    axios.put(`/expenses/${params.id}/edit`, editedProduct);

    // setItem("");
    // setAmount(0);
    // setDate("");
    // setCategory("");
    // setCategories("");
    navigate("/expenses");
  };

  useEffect(() => {
    getOneExpense(params.id);
    getCategories();
  }, []);
  console.log("Daaaaaatee: " + slicedDate);

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
            Edit Your Expense
          </Typography>
          <TextField
            variant="outlined"
            label="Item"
            onChange={(e) => setItem(e.target.value)}
            fullWidth
            value={item}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            type="number"
            variant="outlined"
            label="Amount"
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            value={amount}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Date"
            type="date"
            // defaultValue={new Date()}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            // defaultValue={slicedDate}
            // defaultValue={date.slice(0, 10)}
            value={date.slice(0, 10)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Autocomplete
            options={categories}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                onChange={(e, newCategory) => setCategory(e.target.value)}
              />
            )}
            value={String(category)}
            onChange={(e) => setCategory(e.target.innerText)}
            freeSolo
            fullWidth
          />
          <Button variant="outlined" onClick={submitHandler}>
            Edit Expense
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default EditExpense;
