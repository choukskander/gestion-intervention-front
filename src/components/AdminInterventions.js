import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditInterventionForm from './EditInterventionForm';
import { JitsiMeeting } from '@jitsi/react-sdk';
import Sidebar from './Sidebar';
import './AdminInterventions.css';

const AdminInterventions = () => {
  const [interventions, setInterventions] = useState([]);
  const [editingIntervention, setEditingIntervention] = useState(null);
  const [isMeetingOpen, setIsMeetingOpen] = useState(false);
  const [meetingRoom, setMeetingRoom] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/interventions')
      .then(res => setInterventions(res.data))
      .catch(err => console.error('Erreur lors de la récupération des interventions:', err));
  }, []);

  const deleteIntervention = (id) => {
    axios.delete(`http://localhost:5000/interventions/${id}`)
      .then(() => {
        setInterventions(interventions.filter(intervention => intervention._id !== id));
        alert('Intervention supprimée avec succès.');
      })
      .catch(err => console.error('Erreur lors de la suppression de l\'intervention:', err));
  };

  const updateIntervention = (id, updatedIntervention) => {
    axios.put(`http://localhost:5000/interventions/${id}`, updatedIntervention)
      .then(res => {
        setInterventions(interventions.map(intervention => intervention._id === id ? res.data : intervention));
        setEditingIntervention(null);
        alert('Intervention mise à jour avec succès.');
      })
      .catch(err => console.error('Erreur lors de la mise à jour de l\'intervention:', err));
  };

  const startEditing = (intervention) => {
    setEditingIntervention(intervention);
  };

  const openMeeting = (roomName) => {
    setMeetingRoom(roomName);
    setIsMeetingOpen(true);
  };

  return (
    <div className="admin-container">
      <Sidebar />
      
      <h2>Gestion des Interventions</h2>
      
      <table className="interventions-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Contact</th>
            <th>Détails</th>
            <th>Date</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {interventions.map(intervention => (
            <tr key={intervention._id}>
              <td>{intervention.client.name}</td>
              <td>{intervention.contact.name}</td>
              <td>{intervention.details}</td>
              <td>{intervention.date}</td>
              <td>{intervention.status}</td>
              <td>
                <div className="button-container">
                  <button onClick={() => deleteIntervention(intervention._id)} className="delete-button">Supprimer</button>
                  <button onClick={() => startEditing(intervention)} className="edit-button">Modifier</button>
                  
                  {/* Only show the meeting button if status is not "Terminé" or "Annulé" */}
                  {intervention.status !== 'Terminé' && intervention.status !== 'Annulé' && (
                    <button onClick={() => openMeeting(`meeting_${intervention._id}`)} className="meeting-button">Meeting</button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingIntervention && (
        <div className="edit-form-container">
          <EditInterventionForm
            intervention={editingIntervention}
            onUpdate={updateIntervention}
            onCancel={() => setEditingIntervention(null)}
          />
        </div>
      )}

      {isMeetingOpen && (
        <div className="meeting-container">
          <JitsiMeeting
            roomName={meetingRoom}
            configOverwrite={{
              startWithAudioMuted: true,
              startWithVideoMuted: true,
            }}
            userInfo={{
              displayName: "HR Representative",
            }}
            onReadyToClose={() => setIsMeetingOpen(false)}
            getIFrameRef={(node) => { node.style.height = "500px"; node.style.width = "100%"; }}
          />
          <button onClick={() => setIsMeetingOpen(false)} className="close-meeting-button">Close Meeting</button>
        </div>
      )}
    </div>
  );
};

export default AdminInterventions;
