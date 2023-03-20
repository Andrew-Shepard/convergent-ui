import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPartner = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const addPartner = async () => {
    try {
      const response = await axios.patch('http://0.0.0.0:8000/add_partner',
      {
        user_id: localStorage.getItem('user_id'),
        password: '',
        partner_id: username
      }
      ,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
      );

      if (response.data.error) {
        setError(response.data.error);
      } else {
        navigate('/dashboard'); // Navigate to dashboard page
      }
    } catch (err) {
      setError('Couldn\'t add partner!');
    }
  };

  return (
    <div>
      <h2>Add a partner</h2>
      <div>
        <input type="text" placeholder="Partner Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      {error && <div>{error}</div>}
      <button onClick={() => navigate('/Dashboard')}>Back</button> {/* back */}
      <button onClick={addPartner}>Add Partner</button> {/* added */}
    </div>
  );
};

export default AddPartner;
