import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CampaignDetailPage.css';


function CompanyApplicantsPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/applications/campaign/${id}`, {
      withCredentials: true
    })
    .then((res) => setApplicants(res.data))
    .catch(() => setError('Failed to load applicants'));
  }, [id]);

  return (
    <div className="campaign-detail-container">
      <h2>Applicants for Campaign</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
  
      {applicants.length === 0 ? (
        <p>No applications received for this campaign yet.</p>
      ) : (
        applicants.map((app) => (
          <div key={app._id} className="applicant-card">
            <p><strong>Name:</strong> {app.name || app.email}</p>
            <p><strong>Email:</strong> {app.email}</p>
            <p><strong>Date of Birth:</strong> {new Date(app.dob).toLocaleDateString()}</p>
            <p><strong>Height:</strong> {app.height}</p>
            <p><strong>Body Type:</strong> {app.bodyType}</p>
            <p><strong>Experience:</strong> {app.experience}</p>
            <p><strong>CV:</strong> <a href={app.cvLink} target="_blank" rel="noopener noreferrer">View</a></p>
          </div>
        ))
      )}
  
      <button onClick={() => navigate('/company/campaigns')} className="back-btn">
        Back to My Campaigns
      </button>
    </div>
  );  
}

export default CompanyApplicantsPage;
