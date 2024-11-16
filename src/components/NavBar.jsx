import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode'; // Make sure it's imported correctly
import "./Navbar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Vérifie si le token est présent
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken); // Vérifie le contenu du token décodé
        setUserName(decodedToken.name); // Assurez-vous que 'name' correspond à la clé réelle dans votre payload de token
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
    <div className="navbar-container">
      <nav className="navbar">
        <a className="navbar-brand" href="/">
          <img src="/logo.png" height="80px" alt="Logo" />
        </a>

        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/home" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/CreateIntervention" className="nav-link">Create Intervention</Link>
          </li>
          <li className="nav-item">
            <Link to="/interventions" className="nav-link">List Interventions</Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">Profile</Link>
          </li>
          <li className="nav-item">
            <select className="nav-link" onChange={handleSelectChange}>
              <option>Bienvenue, {userName}</option>
              <option value="logout">Déconnexion</option>
            </select>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
