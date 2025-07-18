import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/api';
import Sidebar from './Sidebar';

function Layout({ children }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) return <p>Loading layout...</p>;

  return (
    <div className="layout" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar /> {/* ✅ Sidebar with Logout inside */}
      <main style={{ flex: 1, padding: '30px', background: '#ecf0f1' }}>
        {children}
      </main>
    </div>
  );
}

export default Layout;

