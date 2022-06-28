import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Expense from './components/Expense/Expense'
import NewExpense from './components/Expense/NewExpense'
import EditExpense from './components/Expense/EditExpense'
import HomePage from './components/HomePage';
import Register from './components/Auth/Register';

function App() {
  return (
    <>     
    <Nav />
  <Routes>
    <Route path='/' element={<HomePage />}/>
    <Route path='/auth/register' element={<Register />}/>
    <Route path='/expenses/:id' element={<EditExpense />} />
    <Route path='/expenses' element={<Expense />} />
    <Route path='/expenses/new' element={<NewExpense />} />
  </Routes>
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