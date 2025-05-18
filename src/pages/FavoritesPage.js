import React from 'react';
import { useFavorite } from '../context/FavoriteContext';
import CountryList from '../components/countries/CountryList';

const FavoritesPage = () => {
  const { favorites } = useFavorite();

  return (
    <div>
      {/* Background Image */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: "url('/background.jpg') center/cover no-repeat", // Background image
          zIndex: 0,
          animation: 'fadeIn 1.5s ease-out',
        }}
      ></div>

      {/* Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay to make text readable
          zIndex: 1,
        }}
      ></div>

      {/* Main Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          color: 'white',
          padding: '2rem 1rem',
          minHeight: '100vh',
          animation: 'slideIn 1.5s ease-out',
        }}
      >
        <div className="container-fluid">
          <div
            className="card mx-4"
            style={{
              backgroundColor: 'rgba(0,0,0,0.6)', 
              border: 'none',
              borderRadius: '15px',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)', 
              transition: 'all 0.3s ease-in-out',
              animation: 'cardSlide 1s ease-out',
            }}
          >
            <div className="card-body">
              <h2 style={{ fontWeight: 'bold', fontSize: '2rem' , color: 'white'}}>Your Favorite Countries</h2>
              {/* Favorites content */}
              {favorites.length > 0 ? (
                <CountryList countries={favorites} />
              ) : (
                <p>No favorites yet. Click the heart icon on any country card to add.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
