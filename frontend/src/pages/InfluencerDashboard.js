import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function InfluencerDashboard() {
  const [user, setUser] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get user info (to reflect updated name/picture)
    axios.get('http://localhost:5000/api/me', { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));

    // Get campaigns
    axios.get('http://localhost:5000/api/campaigns/all', { withCredentials: true })
      .then((res) => setCampaigns(res.data))
      .catch(() => setError('Failed to load campaigns'));
  }, []);

  return (
    <>
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    backgroundColor: '#CCDBDC',
    borderBottom: '2px solid #B5BA72'
  }}>
    <h2 style={{ margin: 0 }}>{user ? `Hello, ${user.name || user.email}!` : 'Loading user...'}</h2>
    <div onClick={() => navigate('/influencer/profile')} style={{
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: '#ccc',
      backgroundImage: `url(${user?.profilePicture || ''})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      cursor: 'pointer',
      border: '2px solid #99907D'
    }} />
  </div>

  <div style={{ padding: '30px 40px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    {campaigns.length === 0 ? (
      <p>No campaigns available at the moment.</p>
    ) : (
      campaigns.map((c) => (
        <div key={c._id} style={{
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '10px', color: '#333' }}>{c.title}</h3>
          <p><strong>Budget:</strong> ${c.budget}</p>
          <p><strong>Dates:</strong> {new Date(c.startDate).toLocaleDateString()} – {new Date(c.endDate).toLocaleDateString()}</p>
          <div style={{ marginTop: '10px' }}>
            <button onClick={() => navigate(`/influencer/campaigns/${c._id}`)} style={{
              backgroundColor: '#B5BA72',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              marginRight: '10px',
              cursor: 'pointer'
            }}>View Details</button>

            <button onClick={() => navigate(`/influencer/apply/${c._id}`)} style={{
              backgroundColor: '#A37B73',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>Apply</button>
          </div>
        </div>
      ))
    )}
  </div>
</>
  );
}

export default InfluencerDashboard;
