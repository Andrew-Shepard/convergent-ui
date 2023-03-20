import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [chapterInfo, setChapterInfo] = useState({});
  const [isAnswered, setIsAnswered] = useState(false);
  const [hasPartner, setHasPartner] = useState(false);
  const [isPartnerAnswered, setIsPartnerAnswered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchChapterInfo() {
      try {
        const response = await axios.get('http://0.0.0.0:8000/chapter', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setChapterInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchChapterInfo();
  }, []);

  useEffect(() => {
    async function checkIsAnswered() {
      try {
        const user_id = localStorage.getItem('user_id');
        const response = await axios.post(
          'http://0.0.0.0:8000/has_answered',
          {
            user_id: user_id,
            password: '',
            partner_id: '',
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (response.data.answered === 'True') {
          setIsAnswered(true);
          console.log(response.data.answered);
        }
      } catch (error) {
        console.error(error);
      }
    }
    checkIsAnswered();
  }, []);

  useEffect(() => {
    async function getPartner() {
      const user_id = localStorage.getItem('user_id');
      const response = await axios.post(
        'http://0.0.0.0:8000/get_partner',
        {
          user_id: user_id,
          password: '',
          partner_id: '',
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.partner !== null && response.data.partner.length !== 0) {
        console.log(response.data.partner)
        localStorage.setItem('partner_id', response.data.partner_id);
        setHasPartner(true);
      }
    }
    getPartner();
  }, []);

  useEffect(()=>{
    async function checkIsAnsweredPartner(){
      if (hasPartner === true){
        const has_answered_response = await axios.post(
          'http://0.0.0.0:8000/has_answered',
          {
            user_id: localStorage.getItem('partner_id'),
            password: '',
            partner_id: '',
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (has_answered_response.data.answered === 'True') {
          setIsPartnerAnswered(true);
        }
      }
    }
    checkIsAnsweredPartner();
  },[hasPartner]);

  async function markAnswered() {
    try {
      const user_id = localStorage.getItem('user_id');
      await axios.post(
        'http://0.0.0.0:8000/answer',
        {
          user_id: user_id,
          password: '',
          partner_id: '',
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setIsAnswered(true);
    } catch (error) {
      console.error(error);
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('partner_id')
    navigate('/'); // Redirect to login page
  }

  return (
    <div>
      <h1>
        {chapterInfo.book} {chapterInfo.chapter}
      </h1>
      <p>{chapterInfo.chapter_text}</p>
      {isAnswered && <p>You have read this chapter.</p>}
      {(hasPartner && isPartnerAnswered) && <p>Your partner has read this chapter</p>}
      {!isAnswered && (
        <button onClick={markAnswered}>Mark as Read</button>
      )}
      {!hasPartner && (
        <button onClick={() => navigate('/add_partner')}>Add a partner</button>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
