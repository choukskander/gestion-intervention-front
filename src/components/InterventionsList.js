import React, { useState, useEffect } from "react";
import axios from "axios";
import "./table.css"; 
import NavBar from "./NavBar";

const InterventionsList = () => {
  const [interventions, setInterventions] = useState([]);
  const [message, setMessage] = useState(null); // Optional: To handle error messages

  useEffect(() => {
    const fetchInterventions = async () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      if (!token) {
        setMessage('Aucun token trouvé, veuillez vous connecter.');
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}` // Include token in headers
          },
        };
        
        const response = await axios.get("http://localhost:5000/interventions", config);
        setInterventions(response.data);
        console.log("response.data",response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des interventions:", error);
        setMessage('Erreur lors de la récupération des interventions'); // Optional: Set error message
      }
    };

    fetchInterventions();
  }, []);

  return (
    <div className="container2">
       <NavBar/>
       <div className="card">
          <div className="card-body">
             <h2>Interventions</h2>
             {message && <div className="alert alert-danger">{message}</div>} {/* Optional: Display error message */}
             <table className="table table-striped">
               <thead>
                 <tr>
                   <th>Date</th>
                   <th>Client</th>
                   <th>Contact</th>
                   <th>Détails</th>
                   <th>Priorité</th>
                   <th>Statut</th>
                 </tr>
               </thead>
               <tbody>
                 {interventions.map((intervention) => (
                   <tr key={intervention._id}>
                     <td>{new Date(intervention.date).toLocaleDateString()}</td>
                     <td>{intervention.client.name}</td>
                     <td>{intervention.contact.name}</td>
                     <td>{intervention.details}</td>
                     <td>{intervention.priority}</td>
                     <td>{intervention.status}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
       </div>
    </div>
  );
};

export default InterventionsList;