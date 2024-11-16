// AddContactForm.js
import React, { useState } from 'react';
import './AdminInterventions.css';
const AddContactForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '', // Assuming "name" is the required field for contacts
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData); // Calls the onAdd function passed as a prop
  };

  return (
    <form onSubmit={handleSubmit} className="add-contact-form">
      <h3>Ajouter un Nouveau Contact</h3>
      <div>
        <label>Nom:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Ajouter</button>
      <button type="button" onClick={onCancel}>Annuler</button>
    </form>
  );
};

export default AddContactForm;
