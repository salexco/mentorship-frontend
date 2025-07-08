import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/admin/users', {
        headers: { Authorization: 'Bearer ' + token }
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err.response ? err.response.data : err.message);
      setMessage('Failed to load users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`http://localhost:5000/admin/users/${id}`, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setMessage('User deleted successfully');
      fetchUsers(); // Refresh list
    } catch (err) {
      console.error('Error deleting user:', err.response ? err.response.data : err.message);
      setMessage('Failed to delete user');
    }
  };

  return (
    <div className="admin-users-container">
      <h2>All Users</h2>
      {message && <p>{message}</p>}
      <table className="admin-users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => handleDelete(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;
