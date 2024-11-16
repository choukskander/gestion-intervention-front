// AddClientForm.js
import React, { useState } from 'react';
import './AdminInterventions.css';
const AddClientForm = ({ onAdd, onCancel, contacts }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    adresse: '',
    fax: '',
    contact: '', // Holds the selected contact ID
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="add-client-form">
      <h3>Ajouter un Nouveau Client</h3>
      <div>
        <label>Nom:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Adresse:</label>
        <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} />
      </div>
      <div>
        <label>Fax:</label>
        <input type="text" name="fax" value={formData.fax} onChange={handleChange} />
      </div>
      <div>
        <label>Contact:</label>
        <select name="contact" value={formData.contact} onChange={handleChange} required>
          <option value="">Sélectionner un contact</option>
          {contacts.map(contact => (
            <option key={contact._id} value={contact._id}>
              {contact.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Ajouter</button>
      <button type="button" onClick={onCancel}>Annuler</button>
    </form>
  );
};

export default AddClientForm;
