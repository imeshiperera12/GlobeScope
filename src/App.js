import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import CountryDetail from './pages/CountryDetail';
import Login from './pages/Login';
import Home from './pages/Home';
import LaunchPage from './pages/LaunchPage';
import FavoritesPage from './pages/FavoritesPage';
import { AuthProvider } from './context/AuthContext';
import { FavoriteProvider } from './context/FavoriteContext'; // Make sure path is correct
import ProtectedRoute from './components/auth/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <FavoriteProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100 bg-light">
            <Navbar />
            <main className="container py-4 flex-grow-1">
              <Routes>
                <Route path="/" element={<LaunchPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route
                  path="/country/:code"
                  element={
                    <ProtectedRoute>
                      <CountryDetail />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
            <footer className="bg-dark text-white py-3 text-center">
              <p>Country Explorer &copy; 2025 - SE3040 Assignment</p>
            </footer>
          </div>
        </Router>
      </FavoriteProvider>
    </AuthProvider>
  );
}

export default App;
