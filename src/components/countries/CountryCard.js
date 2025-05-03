import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorite } from '../../context/FavoriteContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const CountryCard = ({ country }) => {
  const { favorites, toggleFavorite } = useFavorite();
  const isFavorite = (code) => favorites.some((item) => item.code === code);

  const formatPopulation = (population) => population.toLocaleString();
  const getLanguages = (languages) => {
    if (!languages) return 'None';
    return Object.values(languages).join(', ');
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '2px solid #130031',
    boxShadow: '0 0 10px #130031',
    borderRadius: '10px',
    color: 'white',
    transition: 'transform 0.3s',
    position: 'relative',
  };

  return (
    <div
      className="card h-100 shadow-sm"
      style={cardStyle}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
    >
      {/* Favorite Button */}
      <button
        onClick={() => toggleFavorite(country)} // Toggle favorite when clicked
        className="btn position-absolute top-0 end-0 m-2"
        style={{ zIndex: 10 }}
      >
        {isFavorite(country.cca3) ? <FaHeart color="red" /> : <FaRegHeart color="white" />}
      </button>

      <Link to={`/country/${country.cca3}`} className="text-decoration-none text-white">
        <div className="overflow-hidden" style={{ height: '160px' }}>
          <img
            src={country.flags.png || country.flags.svg}
            alt={`Flag of ${country.name.common}`}
            className="w-100 h-100 object-fit-cover"
          />
        </div>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold mb-2">{country.name.common}</h5>
          <div className="card-text small mb-3">
            <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'None'}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Population:</strong> {formatPopulation(country.population)}</p>
            <p className="text-truncate"><strong>Languages:</strong> {getLanguages(country.languages)}</p>
          </div>
          <div className="mt-auto text-center py-2" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
            <small className="text-info">Click for more details</small>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CountryCard;
