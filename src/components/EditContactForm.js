import React, { useState } from 'react';

const EditContactForm = ({ contact, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(contact._id, formData);
  };

  return (
    <div className="edit-contact-form">
      <h3>Modifier le Contact</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Téléphone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div> */}
        <button type="submit" className="submit-button">Mettre à jour</button>
        <button type="button" className="cancel-button" onClick={onCancel}>Annuler</button>
      </form>
    </div>
  );
};

export default EditContactForm;
