// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       console.log('Envoi de la requête pour l\'email:', email);
//       const response = await axios.post('http://localhost:5000/forgot-password', { email });
//       console.log('Réponse du serveur:', response);
//       toast.success('Email de réinitialisation envoyé avec succès.');
//     } catch (error) {
//       console.error('Erreur lors de l\'envoi de l\'email de réinitialisation:', error.response);
//       toast.error('Erreur lors de l\'envoi de l\'email de réinitialisation.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Mot de passe oublié</h2>
//       <form onSubmit={handleForgotPassword}>
//         <div>
//           <label>Email :</label>
//           <input 
//             type="email" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             required 
//           />
//         </div>
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? 'Envoi en cours...' : 'Envoyer'}
//         </button>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default ForgotPassword;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ajout de la journalisation pour le débogage
    console.log("Email envoyé pour réinitialisation : ", email);

    axios
      .post("http://localhost:5000/forgot-password", { email })
      .then((res) => {
        console.log("Réponse de l'API : ", res.data);
        if (res.data.Status === "Success") {
          navigate("/login");
        } else {
          // Affichez un message d'erreur si la réponse ne correspond pas à "Success"
          console.error("Erreur lors de l'envoi de l'email : ", res.data);
        }
      })
      .catch((err) => {
        console.error("Erreur dans la requête axios : ", err);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h4>Mot de passe oublié</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Entrez votre email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
