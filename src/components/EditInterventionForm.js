import React, { useState } from 'react';
import './EditInterventionForm.css';

const EditInterventionForm = ({ intervention, onUpdate, onCancel }) => {
  const [updatedDetails, setUpdatedDetails] = useState(intervention.details);
  const [updatedDate, setUpdatedDate] = useState(intervention.date);
  const [updatedStatus, setUpdatedStatus] = useState(intervention.status);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedIntervention = {
      details: updatedDetails || intervention.details,
      date: updatedDate || intervention.date,
      status: updatedStatus || intervention.status,
      client: intervention.client,    // Keep existing client if unchanged
      contact: intervention.contact,  // Keep existing contact if unchanged
    };
  
    onUpdate(intervention._id, updatedIntervention);
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h3>Modifier l'Intervention</h3>
      <div>
        <label>Détails:</label>
        <input
          type="text"
          value={updatedDetails}
          onChange={(e) => setUpdatedDetails(e.target.value)}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={updatedDate}
          onChange={(e) => setUpdatedDate(e.target.value)}
        />
      </div>
      <div>
        <label>Statut:</label>
        <select value={updatedStatus} onChange={(e) => setUpdatedStatus(e.target.value)}>
          <option value="En cours">En cours</option>
         
          <option value="Terminé">Terminé</option>
          <option value="Annulé">Annulé</option>
        </select>
      </div>
      <button type="submit" className="submit-button">Mettre à jour</button>
      <button type="button" className="cancel-button" onClick={onCancel}>Annuler</button>

    </form>
  );
};

export default EditInterventionForm;
