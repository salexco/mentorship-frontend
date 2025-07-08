import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MentorProfile() {
  const { id } = useParams();
  const [mentor, setMentor] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        const res = await axios.get('http://localhost:5000/mentors/' + id, {
          headers: { Authorization: 'Bearer ' + token }
        });

        console.log('Fetched mentor:', res.data);
        setMentor(res.data);
      } catch (err) {
        console.error('Error fetching mentor:', err.response ? err.response.data : err.message);
        setMessage('Failed to load mentor profile');
      }
    };

    fetchMentor();
  }, [id]);

  return (
    <div>
      <h2>Mentor Profile</h2>
      {message && <p>{message}</p>}
      {mentor ? (
        <div>
          <h3>{mentor.name || mentor.email}</h3>
          <p><strong>Bio:</strong> {mentor.bio}</p>
          <p><strong>Skills:</strong> {mentor.skills?.join(', ')}</p>
          <p><strong>Goals:</strong> {mentor.goals}</p>
        </div>
      ) : (
        <p>Loading mentor profile...</p>
      )}
    </div>
  );
}

export default MentorProfile;
