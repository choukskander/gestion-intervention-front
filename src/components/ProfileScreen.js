import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Image, Alert } from 'react-bootstrap';
import axios from 'axios';
import './ProfileScreen.css';
import NavBar from './NavBar';
const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [companyLocation, setCompanyLocation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); // Ajout de phoneNumber
    const [profileImage, setProfileImage] = useState(null);
    const [message, setMessage] = useState(null);
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('Aucun token trouvé, veuillez vous connecter.');
          return;
        }
  
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const { data } = await axios.get('http://localhost:5000/users/profile', config);
          setName(data.name);
          setEmail(data.email);
          setCompanyLocation(data.companyLocation);
          setPhoneNumber(data.phoneNumber); 
          setProfileImage(data.profileImage || '/placeholder-profile-image.jpg');
        } catch (error) {
          setMessage('Erreur lors du chargement du profil ou token invalide');
        }
      };
  
      fetchUserProfile();
    }, []);
      const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };
  
    const submitHandler = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('companyLocation', companyLocation);
      formData.append('phoneNumber', phoneNumber); // Ajout du téléphone
  
      if (profileImage instanceof File) {
        formData.append('profileImage', profileImage);
      }
  
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('Aucun token trouvé, veuillez vous connecter.');
          return;
        }
  
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        };
  
        await axios.put('http://localhost:5000/users/profile', formData, config);
        setMessage('Profil mis à jour avec succès');
      } catch (error) {
        setMessage('Erreur lors de la mise à jour du profil');
      }
    };
  
    return (
      <div className="profile-screen">
        <NavBar />
        <br></br><br></br><br></br><br></br><br></br><br></br>
        <h2>Mettre à jour le profil</h2>
        {message && <Alert variant="info">{message}</Alert>}
        <Form onSubmit={submitHandler}>
          <Row>
            <Col md={4}>
              <Image
                src={profileImage instanceof File ? URL.createObjectURL(profileImage) : profileImage}
                roundedCircle
                height="150"
                width="150"
                alt="Profile"
              />
              <Form.Group controlId="profileImage" className="mt-3">
                <Form.Label>Changer l'image de profil</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
              </Form.Group>
            </Col>
            <Col md={8}>
              <Form.Group controlId="name">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
  
              <Form.Group controlId="email" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
  
              <Form.Group controlId="companyLocation" className="mt-3">
                <Form.Label>Emplacement de l'entreprise</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Lieu de votre entreprise"
                  value={companyLocation}
                  onChange={(e) => setCompanyLocation(e.target.value)}
                />
              </Form.Group>
  
              <Form.Group controlId="phoneNumber" className="mt-3">
                <Form.Label>Numéro de téléphone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Votre numéro de téléphone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)} // Mise à jour du téléphone
                />
              </Form.Group>
  
              <Button type="submit" className="mt-3">
                Mettre à jour le profil
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };
  
  export default ProfileScreen;
  
