import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import InfluencerDashboard from './pages/InfluencerDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import InfluencerProfilePage from './pages/ProfilePage';
import CreateCampaignPage from './pages/CreateCampaignPage';
import CompanyCampaignsPage from './pages/CompanyCampaignsPage';
import CampaignDetailPage from './pages/CampaignDetailPage';
import InfluencerCampaignDetailPage from './pages/InfluencerCampaignDetailPage';
import InfluencerApplicationPage from './pages/InfluencerApplicationPage';
import CompanyApplicantsPage from './pages/CompanyApplicantsPage';

import Navbar from './components/Navbar';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);

const fetchUser = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/me', {
      withCredentials: true,
    });
    setUser(res.data);
  } catch {
    setUser(null);
  }
};

useEffect(() => {
  fetchUser();
}, []);

  return (
    <Router>
      <div className="App">
        <Navbar user={user} setUser={setUser} />

        <Routes>
          <Route path="/" element={<LoginPage setUser={setUser} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/campaign/create" element={<CreateCampaignPage />} />
          <Route path="/company/campaigns" element={<CompanyCampaignsPage />} />
          <Route path="/company/campaigns/:id" element={<CampaignDetailPage />} />
          <Route path="/influencer/dashboard" element={<InfluencerDashboard user={user} />} />
          <Route path="/influencer/campaigns/:id" element={<InfluencerCampaignDetailPage />} />
          <Route path="/influencer/campaigns/:id/apply" element={<InfluencerApplicationPage />} />
          <Route path="/influencer/apply/:id" element={<InfluencerApplicationPage />} />
          <Route path="/influencer/profile" element={<InfluencerProfilePage user={user} setUser={setUser} fetchUser={fetchUser}/>}/>
          <Route path="/company/campaigns/:id/applicants" element={<CompanyApplicantsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
