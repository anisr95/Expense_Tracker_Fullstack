import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import './App.css'
import Nav from './components/Nav/Nav';
import Expense from './components/Expense/Expense'
import NewExpense from './components/Expense/NewExpense'
import EditExpense from './components/Expense/EditExpense'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
    <BrowserRouter>
      <App className='App' />
    </BrowserRouter>
  </React.StrictMode>,
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Router>
//     <Routes>
//       <Route path='/' element={<App />} />
//       <Route path='/navbar' element={<Nav />} />
//       <Route path='/expenses' element={<Expense />} />
//       <Route path='/expenses/:id' element={<EditExpense />} />
//       <Route path='/expenses/new' element={<NewExpense />} />

//     </Routes>

//   </Router>
  
// );
