import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/Logo.png'

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar__logo">
      <img src={logo} alt="D Language" className="navbar__logo-img" />
      <span className="navbar__title">Language</span>
    </div>
    <div className="navbar__links">
      <Link to="/login" className="navbar__link navbar__link--login">Login</Link>
      <Link to="/register" className="navbar__link navbar__link--signup">Sign Up</Link>
    </div>
  </nav>
);

export default Navbar;