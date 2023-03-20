import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://0.0.0.0:8000/login', {
        user_id: username,
        password: password
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user_id', username);
        navigate('/dashboard'); // Navigate to dashboard page
      }
    } catch (err) {
      setError('Wrong login details!');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {error && <div>{error}</div>}
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => navigate('/register')}>Register</button> {/* added */}
    </div>
  );
};

export default LoginScreen;
