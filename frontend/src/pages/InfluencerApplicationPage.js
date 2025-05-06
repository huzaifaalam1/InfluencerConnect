import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function InfluencerApplicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    dob: '',
    height: '',
    bodyType: '',
    experience: '',
    cvLink: ''
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/campaigns/public/${id}`, {
        withCredentials: true
      })
      .then((res) => setCampaign(res.data))
      .catch(() => setError('Failed to load campaign'));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/api/applications/${id}`,
        form,
        { withCredentials: true }
      );
      alert('Application submitted successfully!');
      navigate('/influencer/dashboard');
    } catch (err) {
      alert('Application failed. You may have already applied.');
    }
  };

  if (error) return <p style={{ padding: '30px', color: 'red' }}>{error}</p>;
  if (!campaign) return <p style={{ padding: '30px' }}>Loading campaign...</p>;

  return (
    <div style={{
      padding: '40px',
      maxWidth: '600px',
      margin: '60px auto',
      backgroundColor: '#CCDBDC',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>
        Apply to: {campaign.title}
      </h2>
      <form onSubmit={handleSubmit}>
        {[ 
          { label: 'Name', name: 'name', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Date of Birth', name: 'dob', type: 'date' },
          { label: "Height (e.g. 5'6)", name: 'height', type: 'text' },
          { label: 'CV / Portfolio Link', name: 'cvLink', type: 'url' }
        ].map((field) => (
          <div key={field.name} style={{ marginBottom: '15px' }}>
            <label><strong>{field.label}:</strong></label><br />
            <input
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
        ))}

        <div style={{ marginBottom: '15px' }}>
          <label><strong>Body Type:</strong></label><br />
          <select
            name="bodyType"
            value={form.bodyType}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          >
            <option value="">Select</option>
            <option value="Slim">Slim</option>
            <option value="Athletic">Athletic</option>
            <option value="Curvy">Curvy</option>
            <option value="Plus Size">Plus Size</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label><strong>Experience / Past Collaborations:</strong></label><br />
          <textarea
            name="experience"
            value={form.experience}
            onChange={handleChange}
            rows="4"
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button type="submit" style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#B5BA72',
          color: '#fff',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default InfluencerApplicationPage;
