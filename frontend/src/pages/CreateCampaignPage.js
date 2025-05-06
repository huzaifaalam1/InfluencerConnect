import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateCampaign.css';

function CreateCampaignPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (budget <= 0) {
      return setMessage('Budget must be greater than 0');
    }
  
    if (new Date(startDate) > new Date(endDate)) {
      return setMessage('Start date cannot be after end date');
    }
  
    try {
      await axios.post(
        'http://localhost:5000/api/campaigns',
        { title, description, budget, startDate, endDate },
        { withCredentials: true }
      );
      setMessage('Campaign created!');
      setTimeout(() => navigate('/company/campaigns'), 1000);
    } catch (err) {
      setMessage('Error creating campaign');
    }
  };
  
  return (
    <div className="create-campaign-container">
      <h2>Create a New Campaign</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="create-campaign-form">
        <input type="text" placeholder="Campaign Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" placeholder="Budget ($)" value={budget} onChange={(e) => setBudget(e.target.value)} required />
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        <button type="submit">Create Campaign</button>
      </form>
    </div>
  );  
}

export default CreateCampaignPage;
