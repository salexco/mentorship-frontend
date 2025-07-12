import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config/api";
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

function MenteeMentors() {
  const [mentors, setMentors] = useState([]);
  const [message, setMessage] = useState('');

  // Define default day and slot as constants for now
  const day = 'Monday'; // default day for testing
  const slot = '10AM-11AM'; // default slot for testing

  useEffect(() => {
    const fetchMentors = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${API_BASE_URL}/mentors`, {
          headers: { Authorization: 'Bearer ' + token }
        });
        setMentors(res.data);
      } catch (err) {
        console.error('Error fetching mentors:', err.response ? err.response.data : err.message);
        setMessage('Failed to load mentors');
      }
    };

    fetchMentors();
  }, []);

  const handleRequestMentorship = async (mentorId) => {
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(`${API_BASE_URL}/requests`, {
        mentorId,
        message: 'I would like to be your mentee.'
      }, {
        headers: { Authorization: 'Bearer ' + token }
      });

      alert('Mentorship request sent successfully!');
      console.log(res.data);
    } catch (err) {
      console.error('Error sending request:', err.response ? err.response.data : err.message);
      alert('Failed to send mentorship request');
    }
  };

  const handleBookSession = async (mentorId) => {
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(`${API_BASE_URL}/sessions`, {
        mentorId,
        date: day,  // using default "Monday" for now
        time: slot  // using default "10AM-11AM" for now
      }, {
        headers: { Authorization: 'Bearer ' + token }
      });

      alert('Session booked successfully!');
      console.log(res.data);
    } catch (err) {
      console.error('Error booking session:', err.response ? err.response.data : err.message);
      alert('Failed to book session');
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: '800px', margin: '20px auto' }}>
        <h2>Find Mentors</h2>
        {message && <p>{message}</p>}

        {mentors.length === 0 ? (
          <p>No mentors found.</p>
        ) : (
          mentors.map(mentor => (
            <div key={mentor._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <h3>{mentor.name}</h3>
              <p><strong>Email:</strong> {mentor.email}</p>
              <p><strong>Skills:</strong> {mentor.skills.join(', ')}</p>
              <p><strong>Bio:</strong> {mentor.bio}</p>

              <button onClick={() => handleRequestMentorship(mentor._id)} style={{ marginRight: '10px' }}>
                Request Mentorship
              </button>

              <button onClick={() => handleBookSession(mentor._id)} style={{ marginRight: '10px' }}>
                Book Session
              </button>

              <Link to={`/mentors/${mentor._id}`}>
                <button>View Profile</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}

export default MenteeMentors;

