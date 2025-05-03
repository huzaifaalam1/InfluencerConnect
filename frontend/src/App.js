import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import InfluencerDashboard from './pages/InfluencerDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import ProfilePage from './pages/ProfilePage';
import CreateCampaignPage from './pages/CreateCampaignPage';
import Navbar from './components/Navbar';
import './styles/App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/influencer/dashboard" element={<InfluencerDashboard />} />
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/campaign/create" element={<CreateCampaignPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
