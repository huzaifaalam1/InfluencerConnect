import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import InfluencerDashboard from './pages/InfluencerDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import ProfilePage from './pages/ProfilePage';
import CreateCampaignPage from './pages/CreateCampaignPage';
import CompanyCampaignsPage from './pages/CompanyCampaignsPage';
import CampaignDetailPage from './pages/CampaignDetailPage';
import Navbar from './components/Navbar';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/me', { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar user={user} setUser={setUser} />

        <Routes>
          <Route path="/" element={<LoginPage setUser={setUser} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/influencer/dashboard" element={<InfluencerDashboard />} />
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/campaign/create" element={<CreateCampaignPage />} />
          <Route path="/company/campaigns" element={<CompanyCampaignsPage />} />
          <Route path="/company/campaigns/:id" element={<CampaignDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
