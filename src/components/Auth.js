import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import '../style.css';
import { Link } from 'react-router-dom';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setErrorMessage('');
    setErrors({});
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber.trim()) {
      return 'Le numéro de téléphone est requis';
    }
    const phoneNumberRegex = /^\d{6,14}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      return 'Format de numéro de téléphone invalide';
    }
    return null;
  };

  const validateForm = () => {
    const errors = {};

    if (!name.trim() && isSignUp) {
      errors.name = 'Le nom est requis';
    }

    if (!email.trim()) {
      errors.email = "L'email est requis";
    } else if (!validateEmail(email)) {
      errors.email = "Format d'email invalide";
    }

    if (!password.trim()) {
      errors.password = 'Le mot de passe est requis';
    }

    if (isSignUp) {
      const phoneNumberError = validatePhoneNumber(phoneNumber);
      if (phoneNumberError) {
        errors.phoneNumber = phoneNumberError;
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:5000/register', { name, email, password, phoneNumber });
      alert(response.data.msg);
      localStorage.setItem('token', response.data.token);
      navigate('/home'); // Rediriger après l'inscription
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.msg);
      } else {
        setErrorMessage("Une erreur s'est produite lors de l'inscription.");
      }
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);

      const decoded = jwtDecode(token);
      if (decoded.role === 'admin') {
        navigate('/admin'); 
      } else {
        navigate('/home'); 
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.msg);
      } else {
        setErrorMessage("Une erreur s'est produite lors de la connexion.");
      }
    }
  };

  return (
    <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
      <div className="form-container sign-up">
        <form onSubmit={handleSignUp}>
          <h1>Créer un compte</h1>
          <span>Ou utilisez votre email pour vous inscrire</span>
          <div className="input-container">
            <label htmlFor="name" className="required">Nom</label>
            <input type="text" id="name" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="input-container">
            <label htmlFor="email" className="required">Email</label>
            <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="input-container">
            <label htmlFor="password" className="required">Mot de passe</label>
            <input type="password" id="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="input-container">
            <label htmlFor="phoneNumber" className="required">Numéro de téléphone</label>
            <input type="tel" id="phoneNumber" placeholder="Numéro de téléphone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit">S'inscrire</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleSignIn}>
          <h1>Se connecter</h1>
          <span>Ou utilisez votre email pour vous connecter</span>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Link to="/forgot-password">Mot de passe oublié ?</Link>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit">Se connecter</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Bienvenue !</h1>
            <p>Pour rester connecté avec nous, veuillez vous connecter avec vos informations personnelles</p>
            <button className="hidden" onClick={toggleAuthMode}>Se connecter</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Rejoignez-nous</h1>
            <p>Créez un compte pour découvrir toutes les fonctionnalités de notre plateforme.</p>
            <button className="hidden" onClick={toggleAuthMode}>S'inscrire</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
