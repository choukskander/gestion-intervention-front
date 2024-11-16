// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const ResetPassword = () => {
//   const { token } = useParams();
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (password !== confirmPassword) {
//       setMessage('Les mots de passe ne correspondent pas');
//       return;
//     }

//     try {
//       const response = await axios.post(`http://localhost:5000/reset-password/${token}`, { password });
//       setMessage(response.data.msg);
//       navigate('/login');
//     } catch (error) {
//       console.error(error);
//       setMessage('Erreur lors de la réinitialisation du mot de passe');
//     }
//   };

//   return (
//     <div>
//       <h2>Réinitialiser le mot de passe</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Nouveau mot de passe :</label>
//           <input 
//             type="password" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//             required 
//           />
//         </div>
//         <div>
//           <label>Confirmer le mot de passe :</label>
//           <input 
//             type="password" 
//             value={confirmPassword} 
//             onChange={(e) => setConfirmPassword(e.target.value)} 
//             required 
//           />
//         </div>
//         <button type="submit">Réinitialiser le mot de passe</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default ResetPassword;
import React from 'react'
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'


function ResetPassword() {
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const {id, token} = useParams()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:5000/reset-password/${id}/${token}`, {password})
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/login')
               
            }
        }).catch(err => console.log(err))
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h4>Reset Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>New Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Update
          </button>
          </form>
        
      </div>
    </div>
    )
}

export default ResetPassword;