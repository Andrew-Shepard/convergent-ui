import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [partner_id, setPartnerId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://0.0.0.0:8000/register', {
        user_id: username,
        password: password,
        partner_id: partner_id,
      });
      setError(response.data.message);
      if(response.data.error === 'Username is already taken.'){
        setError('Username is already taken.');
      }
      // redirect to login or show success message
    } catch (err) {
      console.log(err.response.data.error);
      setError('Could not create user.');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Register</h2>
      <div>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <input type="partner_id" placeholder="Partner ID" value={partner_id} onChange={(e) => setPartnerId(e.target.value)} />
      </div>
      {error && <div>{error}</div>}
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleBack}>Back to Login</button> {/* added */}
    </div>
  );
};

export default Register;
