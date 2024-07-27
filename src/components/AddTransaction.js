import React, { Component } from 'react';
import { addTransaction } from '../services/transactionService';
import TransactionForm from './TransactionForm';
import { useNavigate } from 'react-router-dom';

class AddTransaction extends Component {
  handleSave = async (transaction) => {
    try {
      await addTransaction(transaction);
      this.props.navigate('/');
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  render() {
    return (
      <div>
        <h2>New Transaction</h2>
      <div className='add-transaction'>
        <div className='add-transaction-container'>
        <img src='https://res.cloudinary.com/dgkru5vsg/image/upload/v1722014118/pexels-fauxels-3182773_zkyfuf.jpg' alt='employee-image' className='img'/>
        <TransactionForm onSave={this.handleSave} />
        </div>
      </div>
      </div>
    );
  }
}

const AddTransactionWithNavigate = (props) => {
  const navigate = useNavigate();
  return <AddTransaction {...props} navigate={navigate} />;
};

export default AddTransactionWithNavigate;
