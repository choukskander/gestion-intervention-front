import React, { useState } from 'react';


const EditClientForm = ({ client, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({ name: client.name, adresse: client.adresse, fax: client.fax });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(client._id, formData);
  };

  return (
    <div className="edit-form">
      <h3>Modifier le Client</h3>
      <form onSubmit={handleSubmit}>
        <label>Nom</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />

        <label>Adresse</label>
        <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} />

        <label>Fax</label>
        <input type="text" name="fax" value={formData.fax} onChange={handleChange} />

        <div className="buttons">
      
          <button type="submit" className="submit-button">Mettre à jour</button>
      <button type="button" className="cancel-button" onClick={onCancel}>Annuler</button>
        </div>
      </form>
    </div>
  );
};

export default EditClientForm;
