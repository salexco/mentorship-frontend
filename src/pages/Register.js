import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [name, setName] = useState(''); // added name state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('mentee'); // default role
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call your backend register API
      const res = await axios.post('http://localhost:5000/auth/register', {
        name,    // include name in request
        email,
        password,
        role
      });

      setMessage('Registration successful! Please login.');
      console.log('Registered:', res.data);
    } catch (err) {
      console.error(err);
      setMessage('Registration failed: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>

        <div>
          <label>Name:</label><br/>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label><br/>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label><br/>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Role:</label><br/>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="mentee">Mentee</option>
            <option value="mentor">Mentor</option>
          </select>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
