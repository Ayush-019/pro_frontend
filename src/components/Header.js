import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any token or user info if you stored them
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <NavLink className="navbar-brand" to="/products">MyApp</NavLink>
      <div className="navbar-nav ms-auto">
        <button className="btn btn-outline-light" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
