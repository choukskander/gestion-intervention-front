import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import EditClientForm from './EditClientForm';
import AddClientForm from './AddClientForm';


const AdminClients = () => {
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]); // State for contacts
  const [editingClient, setEditingClient] = useState(null);
  const [addingClient, setAddingClient] = useState(false);

  useEffect(() => {
    // Fetch clients and contacts
    const fetchData = async () => {
      try {
        const clientsRes = await axios.get('http://localhost:5000/clients');
        const contactsRes = await axios.get('http://localhost:5000/contacts');
        setClients(clientsRes.data);
        setContacts(contactsRes.data);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
      }
    };
    fetchData();
  }, []);

  const deleteClient = (id) => {
    axios.delete(`http://localhost:5000/clients/${id}`)
      .then(() => {
        setClients(clients.filter(client => client._id !== id));
        alert('Client supprimé avec succès.');
      })
      .catch(err => console.error('Erreur lors de la suppression du client:', err));
  };

  const updateClient = (id, updatedClient) => {
    axios.put(`http://localhost:5000/clients/${id}`, updatedClient)
      .then(res => {
        setClients(clients.map(client => client._id === id ? res.data : client));
        setEditingClient(null);
        alert('Client mis à jour avec succès.');
      })
      .catch(err => console.error('Erreur lors de la mise à jour du client:', err));
  };

  const addClient = (newClient) => {
    axios.post('http://localhost:5000/clients', newClient)
      .then((res) => {
        setClients([...clients, res.data]);
        setAddingClient(false);
        alert('Client ajouté avec succès.');
      })
      .catch(err => console.error('Erreur lors de l\'ajout du client:', err));
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <h2>Gestion des Clients</h2>
      
      <button onClick={() => setAddingClient(true)} className="add-client-button">Ajouter un Client</button>

      <table className="clients-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Fax</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client._id}>
              <td>{client.name}</td>
              <td>{client.adresse}</td>
              <td>{client.fax}</td>
              <td>{client.contact?.name}</td>
              <td>
                <button onClick={() => deleteClient(client._id)}>Supprimer</button>
                <button onClick={() => setEditingClient(client)}>Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingClient && (
        <EditClientForm
          client={editingClient}
          onUpdate={updateClient}
          onCancel={() => setEditingClient(null)}
        />
      )}

      {addingClient && (
        <AddClientForm
          onAdd={addClient}
          onCancel={() => setAddingClient(false)}
          contacts={contacts} // Pass contacts to AddClientForm
        />
      )}
    </div>
  );
};

export default AdminClients;
