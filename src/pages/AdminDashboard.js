import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config/api";
import Layout from '../components/Layout'; // adjust path if you use Layout globally

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Admin token in localStorage:', token);

        // Fetch all users
        const usersRes = await axios.get(`${API_BASE_URL}/admin/users`, {
          headers: { Authorization: 'Bearer ' + token }
        });
        console.log('Fetched users:', usersRes.data);
        setUsers(usersRes.data);

        // Fetch all requests
        const reqRes = await axios.get(`${API_BASE_URL}/admin/requests`, {
          headers: { Authorization: 'Bearer ' + token }
        });
        setRequests(reqRes.data);

        // Fetch all sessions
        const sesRes = await axios.get(`${API_BASE_URL}/admin/sessions`, {
          headers: { Authorization: 'Bearer ' + token }
        });
        setSessions(sesRes.data);

      } catch (err) {
        console.error('Error fetching admin dashboard:', err.response ? err.response.data : err.message);
        setMessage('Failed to load dashboard');
      }
    };

    fetchDashboard();
  }, []);

  const updateRole = async (id, role) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE_URL}/admin/users/` + id + '/role', { role }, {
        headers: { Authorization: 'Bearer ' + token }
      });
      alert('Role updated');
    } catch (err) {
      console.error('Error updating role:', err.response ? err.response.data : err.message);
      alert('Failed to update role');
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: '900px', margin: '20px auto' }}>
        <h2>Admin Dashboard</h2>
        {message && <p>{message}</p>}

        <h3>All Users</h3>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map(user => (
            <div key={user._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <button onClick={() => updateRole(user._id, 'mentor')}>Make Mentor</button>
              <button onClick={() => updateRole(user._id, 'mentee')}>Make Mentee</button>
              <button onClick={() => updateRole(user._id, 'admin')}>Make Admin</button>
            </div>
          ))
        )}

        <h3>All Mentorship Requests</h3>
        {requests.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          requests.map(req => (
            <div key={req._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <p><strong>Mentee:</strong> {req.mentee.name || req.mentee.email}</p>
              <p><strong>Mentor:</strong> {req.mentor.name || req.mentor.email}</p>
              <p><strong>Status:</strong> {req.status}</p>
            </div>
          ))
        )}

        <h3>All Sessions</h3>
        {sessions.length === 0 ? (
          <p>No sessions found.</p>
        ) : (
          sessions.map(session => (
            <div key={session._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <p><strong>Mentee:</strong> {session.mentee.name || session.mentee.email}</p>
              <p><strong>Mentor:</strong> {session.mentor.name || session.mentor.email}</p>
              <p><strong>Day:</strong> {session.day}</p>
              <p><strong>Slot:</strong> {session.slot}</p>
              <p><strong>Status:</strong> {session.status}</p>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}

export default AdminDashboard;