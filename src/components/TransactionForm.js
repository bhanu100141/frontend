import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdCancel } from 'react-icons/md';
import { addTransaction } from '../services/transactionService';

const TransactionForm = ({ initialData = {} }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: initialData.type || 'Credit',
    amount: initialData.amount || '',
    description: initialData.description || '',
    date: initialData.date || '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addTransaction(formData);
      navigate('/'); // Navigate to the TransactionsList component
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCancel = () => {
    navigate('/'); // Navigate back to TransactionsList
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Type</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="Credit">Credit</option>
          <option value="Debit">Debit</option>
        </select>
      </div>
      <div>
        <label>Amount</label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
      </div>
      <div>
        <label>Description</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Date</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      </div>
      <div className="transactionform-button">
        <button type="submit">Save</button>
        <button className="cancel" type="button" onClick={handleCancel}>
          <MdCancel /> Cancel
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
