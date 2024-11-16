import React, {  useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // État pour le message d'erreur
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Réinitialiser le message d'erreur

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const { token } = response.data;

      if (token) {
        const decodedToken = jwtDecode(token);
        localStorage.setItem('token', token);
        console.log('Token and user name stored successfully');

        navigate(decodedToken.role === 'admin' ? '/admin/interventions' : '/home');
      } else {
        console.error('Token not found in response');
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response && error.response.data && error.response.data.msg) {
        setErrorMessage(error.response.data.msg); // Afficher le message d'erreur du serveur
      } else {
        setErrorMessage("Une erreur s'est produite lors de la connexion.");
      }
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email :</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Affichage du message d'erreur */}

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};


export default Login;
