import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTransactions } from '../services/transactionService';

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const fetchedTransactions = await getTransactions();
        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleAddTransaction = () => {
    navigate('/add');
  };

  // Function to format date as YYYY/MM/DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  // Function to safely format balance
  const formatBalance = (balance) => {
    const parsedBalance = parseFloat(balance);
    return isNaN(parsedBalance) ? '0.00' : parsedBalance.toFixed(2);
  };

  return (
    <div className="transactions-list">
      <h2>Office Transactions</h2>
      <button className="transaction-list-button" onClick={handleAddTransaction}>
        + Add New Transaction
      </button>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr className='table-row' key={transaction.id}>
              <td>{formatDate(transaction.date)}</td>
              <td>{transaction.description}</td>
              <td>{transaction.type === 'Credit' ? formatBalance(transaction.amount) : '-'}</td>
              <td>{transaction.type === 'Debit' ? formatBalance(transaction.amount) : '-'}</td>
              <td>{formatBalance(transaction.balance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsList;
