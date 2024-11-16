import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./intervention.css";
import NavBar from './NavBar';

const CreateIntervention = () => {
  const navigate = useNavigate();
  
  // Set initial form state
  const [formData, setFormData] = useState({
    client: '',
    contact: '',
    details: '',
    date: '',
    priority: 'normal',
    status: 'en attente',
  });

  // State for clients, contacts, message, and error
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  // Fetch clients and contacts data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientResponse = await axios.get('http://localhost:5000/clients');
        const contactResponse = await axios.get('http://localhost:5000/contacts');
        setClients(clientResponse.data);
        setContacts(contactResponse.data);
      } catch (err) {
        console.error(err);
        setError('Erreur lors du chargement des données');
      }
    };
    fetchData();
  }, []);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Retrieve token from local storage (assuming it's stored there after login)
      const token = localStorage.getItem('token');
      
      const response = await axios.post(
        'http://localhost:5000/interventions',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}` // Attach the token in the request header
          }
        }
      );

      console.log(response.data);
      setMessage('Intervention créée avec succès.');
      setFormData({
        client: '',
        contact: '',
        details: '',
        date: '',
        priority: 'normal',
        status: 'en attente',
      });
      navigate('/interventions');
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la création de l'intervention");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container2 mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-lg">
              <div className="card-body p-4">
                <h2 className="card-title text-center mb-4">Créer une Intervention</h2>
                {message && <div className="alert alert-success">{message}</div>}
                {error && <p className="text-danger text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="client" className="form-label">Client:</label>
                    <select
                      className="form-select"
                      id="client"
                      name="client"
                      value={formData.client}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Sélectionner un client</option>
                      {clients.map(client => (
                        <option key={client._id} value={client._id}>
                          {client.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="contact" className="form-label">Contact:</label>
                    <select
                      className="form-select"
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Sélectionner un contact</option>
                      {contacts.map(contact => (
                        <option key={contact._id} value={contact._id}>
                          {contact.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="details" className="form-label">Détails:</label>
                    <textarea
                      className="form-control"
                      id="details"
                      name="details"
                      value={formData.details}
                      onChange={handleInputChange}
                      rows="3"
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="priority" className="form-label">Priorité:</label>
                    <select
                      className="form-select"
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="urgent">Urgent</option>
                      <option value="important">Important</option>
                      <option value="normal">Normal</option>
                    </select>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-warning btn-lg">
                      CRÉER L'INTERVENTION
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateIntervention;
