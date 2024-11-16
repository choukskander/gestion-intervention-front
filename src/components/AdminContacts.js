import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import EditContactForm from './EditContactForm';
import AddContactForm from './AddContactForm';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [addingContact, setAddingContact] = useState(false); // State for add contact form visibility

  useEffect(() => {
    // Fetch contacts data from backend
    axios.get('http://localhost:5000/contacts')
      .then(res => setContacts(res.data))
      .catch(err => console.error('Erreur lors de la récupération des contacts:', err));
  }, []);

  const deleteContact = (id) => {
    axios.delete(`http://localhost:5000/contacts/${id}`)
      .then(() => {
        setContacts(contacts.filter(contact => contact._id !== id));
        alert('Contact supprimé avec succès.');
      })
      .catch(err => console.error('Erreur lors de la suppression du contact:', err));
  };

  const updateContact = (id, updatedContact) => {
    axios.put(`http://localhost:5000/contacts/${id}`, updatedContact)
      .then(res => {
        setContacts(contacts.map(contact => contact._id === id ? res.data : contact));
        setEditingContact(null);
        alert('Contact mis à jour avec succès.');
      })
      .catch(err => console.error('Erreur lors de la mise à jour du contact:', err));
  };

  const addContact = (newContact) => {
    axios.post('http://localhost:5000/contacts', newContact)
      .then(res => {
        setContacts([...contacts, res.data]);
        setAddingContact(false);
        alert('Contact ajouté avec succès.');
      })
      .catch(err => console.error('Erreur lors de l\'ajout du contact:', err));
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <h2>Gestion des Contacts</h2>
      <button onClick={() => setAddingContact(true)}className="add-client-button">Ajouter un Contact</button>

      <table className="clients-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact._id}>
              <td>{contact.name}</td>
              <td>
                <button onClick={() => deleteContact(contact._id)}>Supprimer</button>
                <button onClick={() => setEditingContact(contact)}>Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingContact && (
        <EditContactForm
          contact={editingContact}
          onUpdate={updateContact}
          onCancel={() => setEditingContact(null)}
        />
      )}

      {addingContact && (
        <AddContactForm
          onAdd={addContact}
          onCancel={() => setAddingContact(false)}
        />
      )}
    </div>
  );
};

export default AdminContacts;
