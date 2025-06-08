import React, { useState } from 'react';
import './Login.css';
import Navbar from '../components/molecules/navbar';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('send to api', formData);
  };

  return (
    <>
    <Navbar />
    <div className="login-page">
      <h1 className="login-title">Welcome Back!</h1>
      <p className="login-desc">Please login first</p>

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <p className="login-forgot">
          Forgot password? <a href="/reset-password" className="login-link">Click Here</a>
        </p>
        <button type="submit" className="btn--submit">Login</button>
      </form>

      <p className="login-footer">
        Don't have account? <a href="/register" className="login-link">Sign Up Here</a>
      </p>
    </div>
    </>
  );
};

export default Login;