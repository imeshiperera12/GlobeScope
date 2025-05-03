import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top shadow"
      style={{
        backgroundColor: 'rgba(0, 18, 46, 0.6)', // darker blue // #130031 with opacity
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="container">
        <Link to="/" className="navbar-brand text-white d-flex align-items-center me-4">
          <span className="me-2">🌎</span>
          Globe Scope
        </Link>

        <div className="d-flex align-items-center">
          <Link to="/" className="nav-link text-white me-3">Home</Link>
          <Link to="/home" className="nav-link text-white me-3">Countries</Link>
          <Link to="/favorites" className="nav-link text-white me-3">Favorites</Link>
        </div>

        <div className="d-flex align-items-center ms-auto">
          {user ? (
            <>
              <span className="text-white me-3">Welcome, {user.username}</span>
              <button
                onClick={handleLogout}
                className="btn btn-outline-light btn-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-outline-light btn-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
