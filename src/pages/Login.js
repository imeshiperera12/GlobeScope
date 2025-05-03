import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    login({ username });
    navigate('/');
  };

  // Background and overlay styles
  const backgroundImageStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: "url('/background.jpg') center/cover no-repeat",
    zIndex: 0,
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 1,
  };

  const mainContentStyle = {
    position: 'relative',
    zIndex: 2,
    fontFamily: "'Montserrat', sans-serif",
    color: 'white',
  };

  return (
    <div className="position-relative min-vh-100">
      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Playfair+Display:wght@700&display=swap"
        rel="stylesheet"
      />

      {/* Background + Overlay */}
      <div style={backgroundImageStyle}></div>
      <div style={overlayStyle}></div>

      {/* Login Card */}
      <div className="container d-flex justify-content-center align-items-center min-vh-100" style={mainContentStyle}>
        <div
          className="card p-4 shadow"
          style={{
            maxWidth: '400px',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent card
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            color: 'white',
          }}
          data-aos="zoom-in"
        >
          <div className="card-body">
            <h2 className="card-title text-center mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Login
            </h2>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>

            <div className="mt-3 text-center text-white-50">
              <small>For demo purposes, enter any username and password</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
