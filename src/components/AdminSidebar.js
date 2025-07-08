import React from 'react';
import { Link } from 'react-router-dom';

function AdminSidebar() {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/users">All Users</Link></li>
        <li><Link to="/admin/mentors">Mentors</Link></li>
        <li><Link to="/admin/mentees">Mentees</Link></li>
        <li><Link to="/admin/sessions">Sessions</Link></li>
        <li><Link to="/admin/feedback">Feedback</Link></li>
        <li><Link to="/admin/settings">Settings</Link></li>
        <li><Link to="/admin/profile">Profile</Link></li>
        <li><Link to="/admin/matches">Matches</Link></li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
