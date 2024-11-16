import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Home from './components/home';
import NotFound from './components/NotFound';
import CreateIntervention from './components/CreateIntervention';
import InterventionsList from './components/InterventionsList';
import NavBar from './components/NavBar';
import Profile from './components/ProfileScreen';
import AdminInterventions from './components/AdminInterventions';
import AdminContacts from './components/AdminContacts';
import AdminClients from './components/AdminClients';
import Sidebar from './components/Sidebar';
import Admin from './components/Admin';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/reset_password/:id/:token" element={<ResetPassword />}/>
        <Route path="/CreateIntervention" element={<CreateIntervention />} />
        <Route path="/interventions" element={<InterventionsList />} />
        <Route path="/Navbar" element={<NavBar />} />
        <Route path="/Sidebar" element={<Sidebar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/interventions" element={<AdminInterventions />} />
        <Route path="/admin/contacts" element={<AdminContacts />} />
        <Route path="/admin/clients" element={<AdminClients />} />

        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
