import './App.css';
//importing routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//We import the Auth component from the auth folder
import { Auth } from './pages/auth/index';
//We import the ExpenseTracker component from the expense-tracker folder
import { ExpenseTracker } from './pages/expense-tracker';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
