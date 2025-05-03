import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'; 
import { getCountryByCode } from '../services/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

const PEXELS_API_KEY = 'o9Y2Qrc4ziXSifkaqdoL1eZQonnAdtfaBHQIafALBNuKI4LDfS8TGsN1'; 

const CountryDetail = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]); // State to store Pexels images

  useEffect(() => {
    // Fetch country details
    const fetchCountryDetails = async () => {
      try {
        setLoading(true);
        const data = await getCountryByCode(code);
        setCountry(data[0]);
        setLoading(false);
      } catch (error) {
        setError('Failed to load country details. Please try again later.');
        setLoading(false);
      }
    };

    fetchCountryDetails(); // Fetch country details
  }, [code]); // Only re-run when `code` changes

  useEffect(() => {
    // Fetch images based on the country only if country data is available
    const fetchFestivalImages = async () => {
      if (!country) return;
      try {
        const response = await axios.get('https://api.pexels.com/v1/search', {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
          params: {
            query: `${country.name.common} festivals, culture, traditions`,  
            per_page: 6,  
            orientation: 'landscape', 
          },
        });
        setImages(response.data.photos);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    if (country) {
      fetchFestivalImages(); // Fetch images when country data is available
    }
  }, [country]); 

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!country) return <ErrorMessage message="Country not found" />;

  const formatPopulation = (population) => population.toLocaleString();

  const getLanguages = (languages) => {
    if (!languages) return [];
    return Object.values(languages);
  };

  const getCurrencies = (currencies) => {
    if (!currencies) return [];
    return Object.entries(currencies).map(([code, { name, symbol }]) => ({
      code,
      name,
      symbol,
    }));
  };

  return (
    <div>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: "url('/background.jpg') center/cover no-repeat",
          zIndex: 0,
          animation: 'fadeIn 1.5s ease-out',
        }}
      ></div>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1,
        }}
      ></div>
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
            <div className="row g-0">
              <div className="col-md-6">
                <img
                  src={country.flags.svg || country.flags.png}
                  alt={`Flag of ${country.name.common}`}
                  className="img-fluid w-100 h-100 rounded-start"
                  style={{
                    maxHeight: '400px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.3s ease-in-out',
                    marginTop: '20px', 
                  }}
                />
              </div>
              <div
                className="col-md-6 p-4 text-white"
                style={{
                  borderTopRightRadius: '15px',
                  borderBottomRightRadius: '15px',
                  animation: 'fadeIn 1s ease-out',
                }}
              >
                <h2 style={{ fontWeight: 'bold', fontSize: '2rem' }}>
                  {country.name.common}
                </h2>
                <p>
                  <strong>Official Name:</strong> {country.name.official}
                </p>
                <p>
                  <strong>Capital:</strong> {country.capital?.join(', ') || 'None'}
                </p>
                <p>
                  <strong>Region:</strong> {country.region}
                </p>
                <p>
                  <strong>Subregion:</strong> {country.subregion || 'None'}
                </p>
                <p>
                  <strong>Population:</strong> {formatPopulation(country.population)}
                </p>
                <p>
                  <strong>Area:</strong> {formatPopulation(country.area)} km²
                </p>
              </div>
            </div>

            <div className="card-body text-white">
              <div className="row">
                <div className="col-md-6">
                  <h5>Languages</h5>
                  {getLanguages(country.languages).length > 0 ? (
                    <ul>
                      {getLanguages(country.languages).map((lang, i) => (
                        <li key={i}>{lang}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No languages data available</p>
                  )}
                </div>
                <div className="col-md-6">
                  <h5>Currencies</h5>
                  {getCurrencies(country.currencies).length > 0 ? (
                    <ul>
                      {getCurrencies(country.currencies).map((cur) => (
                        <li key={cur.code}>
                          {cur.name} ({cur.symbol || cur.code})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No currency data available</p>
                  )}
                </div>
              </div>
            </div>

            {country.borders && country.borders.length > 0 && (
              <div className="card-body text-white">
                <h5>Bordering Countries</h5>
                <div className="d-flex flex-wrap gap-2">
                  {country.borders.map((borderCode) => (
                    <Link
                      key={borderCode}
                      to={`/country/${borderCode}`}
                      className="btn btn-outline-light btn-sm"
                      style={{
                        borderRadius: '25px',
                        padding: '5px 10px',
                        transition: 'transform 0.3s ease-in-out',
                      }}
                    >
                      {borderCode}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {country.maps && (
              <div className="card-body text-white">
                <h5>Maps</h5>
                <div className="d-flex gap-3">
                  {country.maps.googleMaps && (
                    <a
                      href={country.maps.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary"
                      style={{
                        borderRadius: '25px',
                        padding: '10px 15px',
                        transition: 'background-color 0.3s ease-in-out',
                      }}
                    >
                      Google Maps
                    </a>
                  )}
                  {country.maps.openStreetMaps && (
                    <a
                      href={country.maps.openStreetMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-success"
                      style={{
                        borderRadius: '25px',
                        padding: '10px 15px',
                        transition: 'background-color 0.3s ease-in-out',
                      }}
                    >
                      OpenStreetMap
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 mx-4 text-white">
            <h4>Festival & Culture Highlights</h4>
            <div className="row g-3">
              {images.length > 0 ? (
                images.map((image, i) => (
                  <div
                    key={i}
                    className="col-md-4 col-sm-6"
                    style={{
                      animation: `slideUp 1s ease-out ${i * 0.2}s`, // Add sliding animation
                    }}
                  >
                    <img
                      src={image.src.medium}
                      alt={`Festival event ${i + 1}`}
                      className="img-fluid rounded"
                      style={{
                        maxHeight: '250px',
                        objectFit: 'cover',
                        borderRadius: '15px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                        transition: 'transform 0.3s ease-in-out',
                      }}
                    />
                  </div>
                ))
              ) : (
                <p>No images found for festivals.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
