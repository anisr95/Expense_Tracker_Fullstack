import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Nav from './components/Nav/Nav';
import Expense from './components/Expense/Expense'
import NewExpense from './components/Expense/NewExpense'
import EditExpense from './components/Expense/EditExpense'
import HomePage from './components/HomePage';
import Register from './components/Auth/Register';
import { colors, createTheme, rgbToHex, ThemeProvider } from '@mui/material';


const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'Gentium Book Plus',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: colors.blue[600]
    },
    secondary:{
      main: colors.purple[400],
    }
  }
});

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const userLoggedStatus = () => {
    if (localStorage.getItem('username') !== null) {
      setIsUserLoggedIn(true)
    } else {
      setIsUserLoggedIn(false);
    }
  }
  useEffect(() => {
    userLoggedStatus();
  }, [isUserLoggedIn])
  return (
    <>
    <ThemeProvider theme={theme}>   
    <Nav setIsUserLoggedIn={setIsUserLoggedIn} isUserLoggedIn={isUserLoggedIn} />
  <Routes>
    <Route path='/' element={<HomePage />}/>
    <Route path='/auth/register' element={<Register setIsUserLoggedIn={setIsUserLoggedIn}/>}/>
    <Route path='/expenses/:id' element={<EditExpense />} />
    <Route path='/expenses' element={<Expense />} />
    <Route path='/expenses/new' element={<NewExpense setIsUserLoggedIn={setIsUserLoggedIn} />} />
  </Routes>
  </ThemeProvider>  
  </>
  );
}

export default App;


//  <Routes>
  
    // {/* <div> */}
      // {/* <Nav /> */}


     

        
      {/* <Route path='/' element={<App />} /> */}
      // <Route path='/navbar' element={<Nav />} />
      // <Route path='/expenses' element={<Expense />} />
      // <Route path='/expenses/:id' element={<EditExpense />} />
      // <Route path='/expenses/new' element={<NewExpense />} />
      





    {/* </div> */}
    //  </Routes> 