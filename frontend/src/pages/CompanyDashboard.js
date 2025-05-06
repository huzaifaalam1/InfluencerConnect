import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CompanyDashboard.css';

function CompanyDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/me', { withCredentials: true })
      .then((res) => {
        if (res.data.role !== 'company') {
          navigate('/');
        } else {
          setUser(res.data);
        }
      })
      .catch(() => navigate('/'));
  }, [navigate]);

  return (
    <div className="company-dashboard">
  <h2>Company Dashboard</h2>
  {user && <p className="company-welcome">Welcome, {user.email.split('@')[0]}!</p>}

  <div className="dashboard-buttons">
    <button onClick={() => navigate('/campaign/create')}>Create Campaign</button>
    <button onClick={() => navigate('/company/campaigns')}>View My Campaigns</button>
  </div>
</div>

  );
}

export default CompanyDashboard;
