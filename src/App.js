import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionsList from './components/TransactionsList';
import AddTransaction from './components/AddTransaction';
import './styles/styles.css'; // Assuming you have styles

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<TransactionsList />} />
          <Route path="/add" element={<AddTransaction />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
