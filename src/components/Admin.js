import React from 'react';

import './AdminInterventions.css';
import Sidebar from './Sidebar';
import InterventionStatusChart from './InterventionStatusChart';


const Admin = () => {


  return (
    <div className="admin-container2">
      <Sidebar />
      <h2 className="interventions-table">Gestion des Interventions</h2>
      <InterventionStatusChart />

    </div>
    
  );
};

export default Admin;
