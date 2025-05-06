import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './CampaignDetailPage.css'

function CampaignDetailPage() {
  const [applicants, setApplicants] = useState([]);
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/campaigns/${id}`, { withCredentials: true })
      .then((res) => setCampaign(res.data))
      .catch((err) => {
        console.error(err);
        setError('Failed to load campaign');
      });

      axios.get(`http://localhost:5000/api/campaigns/${id}/applicants`, {
        withCredentials: true
      })
      .then((res) => setApplicants(res.data))
      .catch((err) => console.error('Failed to fetch applicants:', err));
  }, [id]);

  return (
    <div className="campaign-detail-container">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!campaign ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{campaign.title}</h2>
          <p><strong>Description:</strong> {campaign.description}</p>
          <p><strong>Budget:</strong> ${campaign.budget}</p>
          <p><strong>Start Date:</strong> {new Date(campaign.startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(campaign.endDate).toLocaleDateString()}</p>
  
          <h3>Applicants</h3>
          {applicants.length === 0 ? (
            <p>No applicants yet.</p>
          ) : (
            applicants.map((a) => (
              <div key={a._id} className="applicant-card">
                <p><strong>Name:</strong> {a.name || 'N/A'}</p>
                <p><strong>Email:</strong> {a.email}</p>
                <p><strong>Date of Birth:</strong> {new Date(a.dob).toLocaleDateString()}</p>
                <p><strong>Height:</strong> {a.height}</p>
                <p><strong>Body Type:</strong> {a.bodyType}</p>
                <p><strong>Experience:</strong> {a.experience}</p>
                <p><strong>CV:</strong> <a href={a.cvLink} target="_blank" rel="noreferrer">View CV</a></p>
              </div>
            ))
          )}
  
          <button onClick={() => navigate('/company/campaigns')} className="back-btn">
            Back to Campaigns
          </button>
        </>
      )}
    </div>
  );
  
}

export default CampaignDetailPage;
