import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FaHome, FaUser, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.name); // Ensure 'name' matches the key in your token payload
      } catch (error) {
        console.error("Token decoding failed:", error);
      }
    } else {
      console.log("No token found");
    }
  }, []);
  
  const handleSelectChange = (event) => {
    if (event.target.value === "logout") {
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <ul><li><Link to="/admin"><h3>Admin Dashboard</h3></Link></li></ul>
      <ul>
        <li>
          <Link to="/admin/interventions">
            <FaHome /> <span>Gestion des Interventions</span> </Link>
        </li>
        <li>
          <Link to="/admin/contacts">
            <FaEnvelope /> <span>Gestion des Contacts</span> </Link>
        </li>
        <li>
          <Link to="/admin/clients">
            <FaUser /> <span>Gestion des Clients</span> </Link>
        </li>
        <li className="nav-item2">
          <select className="nav-link2" onChange={handleSelectChange}>
            <option>Bienvenue, {userName || "Utilisateur"}</option>
            <option value="logout"><FaSignOutAlt />Déconnexion</option>
          </select>
        </li>
     
      </ul>
    </div>
  );
};

export default Sidebar;
