import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function InfluencerProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/me', { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setName(res.data.name || '');
        setBio(res.data.bio || '');
        setInterests(res.data.interests || '');
        setProfilePicture(res.data.profilePicture || '');
        setImages(res.data.additionalImages || []);
      })
      .catch(() => setUser(null));
  }, []);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setProfilePicture(preview);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...previews]);
  };

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:5000/api/profile', {
        name,
        bio,
        interests,
        profilePicture
      }, { withCredentials: true });

      alert('Profile updated!');

      const refreshed = await axios.get('http://localhost:5000/api/me', {
        withCredentials: true
      });
      setUser(refreshed.data);

      setUser(prev => ({
        ...prev,
        name,
        bio,
        interests,
        profilePicture
      }));

    } catch (err) {
      alert('Error saving profile');
      console.error(err);
    }
  };

  return (
    <div style={{
      padding: '40px',
      maxWidth: '800px',
      margin: '60px auto',
      backgroundColor: '#CCDBDC',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>Profile Page</h2>
      {user ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
            <div style={{ flexGrow: 1 }}>
              <h3>{name || user.email}</h3>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100px', height: '100px', borderRadius: '50%',
                backgroundColor: '#ccc', backgroundImage: `url(${profilePicture})`,
                backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: '10px'
              }} />
              <label style={{
                display: 'block',
                cursor: 'pointer',
                backgroundColor: '#B5BA72',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '5px',
                fontSize: '14px'
              }}>
                Add a Profile Picture
                <input type="file" accept="image/*" onChange={handleProfilePictureChange} style={{ display: 'none' }} />
              </label>
            </div>
          </div>

          {[
            { label: 'Name', value: name, set: setName, type: 'text' },
            { label: 'Interests (comma-separated)', value: interests, set: setInterests, type: 'text' }
          ].map((field, idx) => (
            <div key={idx} style={{ marginBottom: '15px' }}>
              <label><strong>{field.label}:</strong></label><br />
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
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
            <label><strong>Bio:</strong></label><br />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="4"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label><strong>Upload Additional Pictures:</strong></label><br />
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} /><br />
            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
              {images.map((img, i) => (
                <img key={i} src={img} alt="extra" style={{
                  width: '100px',
                  height: '100px',
                  marginRight: '10px',
                  objectFit: 'cover',
                  borderRadius: '6px'
                }} />
              ))}
            </div>
          </div>

          <button onClick={handleSave} style={{
            padding: '10px 20px',
            backgroundColor: '#B5BA72',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Save Changes
          </button>

          <button onClick={() => navigate('/influencer/dashboard')} style={{
            marginLeft: '10px',
            padding: '10px 20px',
            backgroundColor: '#A37B73',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Back to Dashboard
          </button>
        </>
      ) : <p>Loading profile...</p>}
    </div>
  );
}

export default InfluencerProfilePage;
