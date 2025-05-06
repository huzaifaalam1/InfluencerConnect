import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function CampaignDetailPage() {
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
  }, [id]);

  return (
    <div>
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

          <h3>Applicants (Placeholder)</h3>
          <ul>
            <li>influencer1@example.com</li>
            <li>influencer2@example.com</li>
            <li>influencer3@example.com</li>
          </ul>

          <button onClick={() => navigate('/company/campaigns')} style={{ marginTop: '10px' }}>
            Back to Campaigns
          </button>
        </>
      )}
    </div>
  );
}

export default CampaignDetailPage;
