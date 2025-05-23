import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CompanyCampaignsPage.css';

function CompanyCampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/campaigns/mine', {
          withCredentials: true
        });
        setCampaigns(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load campaigns');
      }
    };

    fetchCampaigns();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this campaign?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/campaigns/${id}`, {
        withCredentials: true
      });
      setCampaigns(campaigns.filter(c => c._id !== id));
      setMessage('Campaign deleted successfully.');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setMessage('Failed to delete campaign.');
    }
  };

  return (
    <div className="company-campaigns-container">
      <h2>My Campaigns</h2>
      {message && <p style={{ color: message.includes('deleted') ? 'green' : 'red' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {campaigns.length === 0 ? (
        <p>No campaigns created yet.</p>
      ) : (
        campaigns.map((c) => (
          <div key={c._id} className="campaign-card">
            <h3>{c.title}</h3>
            <p><strong>Budget:</strong> ${c.budget}</p>
            <p><strong>Dates:</strong> {new Date(c.startDate).toLocaleDateString()} – {new Date(c.endDate).toLocaleDateString()}</p>
            <button onClick={() => navigate(`/company/campaigns/${c._id}`)} className="view-btn">
              View Applicants
            </button>
            <button onClick={() => handleDelete(c._id)} className="delete-btn">
              Delete Campaign
            </button>
          </div>
        ))
      )}
    </div>
  );  
}

export default CompanyCampaignsPage;
