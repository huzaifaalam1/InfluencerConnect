import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function InfluencerCampaignDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/campaigns/public/${id}`, {
          withCredentials: true
        });
        setCampaign(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load campaign');
      }
    };

    fetchCampaign();
  }, [id]);

  if (error) return <p style={{ color: 'red', padding: '30px' }}>{error}</p>;
  if (!campaign) return <p style={{ padding: '30px' }}>Loading campaign...</p>;

  return (
    <div style={{
      padding: '40px',
      maxWidth: '800px',
      margin: '60px auto',
      backgroundColor: '#CCDBDC',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ marginBottom: '20px' }}>{campaign.title}</h2>
      <p><strong>Description:</strong> {campaign.description}</p>
      <p><strong>Budget:</strong> ${campaign.budget}</p>
      <p><strong>Start Date:</strong> {new Date(campaign.startDate).toLocaleDateString()}</p>
      <p><strong>End Date:</strong> {new Date(campaign.endDate).toLocaleDateString()}</p>

      <button
        onClick={() => navigate(`/influencer/campaigns/${campaign._id}/apply`)}
        style={{
          marginTop: '25px',
          backgroundColor: '#B5BA72',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Apply Now
      </button>
    </div>
  );
}

export default InfluencerCampaignDetailPage;
