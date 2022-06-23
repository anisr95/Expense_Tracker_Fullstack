import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Nav from './components/Nav/Nav';
import Expense from './components/Expense/Expense'
import NewExpense from './components/Expense/NewExpense'
import EditExpense from './components/Expense/EditExpense'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
  
);
