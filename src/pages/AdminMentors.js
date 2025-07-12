import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config/api";

function AdminMentors() {
  const [mentors, setMentors] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMentors = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${API_BASE_URL}/admin/mentors`, {
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

  return (
    <div>
      <h2>All Mentors</h2>
      {message && <p>{message}</p>}
      <div>
        {mentors.length === 0 ? (
          <p>No mentors found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Bio</th>
                <th>Skills</th>
                <th>Registered At</th>
              </tr>
            </thead>
            <tbody>
              {mentors.map(mentor => (
                <tr key={mentor._id}>
                  <td>{mentor.name}</td>
                  <td>{mentor.email}</td>
                  <td>{mentor.bio}</td>
                  <td>{mentor.skills.join(', ')}</td>
                  <td>{new Date(mentor.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminMentors;
