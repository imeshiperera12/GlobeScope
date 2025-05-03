import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import SearchBar from '../components/search/SearchBar';
import FilterSection from '../components/filters/FilterSection';
import CountryList from '../components/countries/CountryList';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

import {
  getAllCountries,
  getCountriesByName,
  getCountriesByRegion,
  getCountriesByLanguage,
} from '../services/api';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [availableLanguages, setAvailableLanguages] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const data = await getAllCountries();
        setCountries(data);
        setFilteredCountries(data);

        const languagesMap = new Map();
        data.forEach((country) => {
          if (country.languages) {
            Object.entries(country.languages).forEach(([code, name]) => {
              languagesMap.set(code, name);
            });
          }
        });

        const languages = Array.from(languagesMap).map(([code, name]) => ({
          code,
          name,
        }));

        setAvailableLanguages(languages);
        setLoading(false);
      } catch (error) {
        setError('Failed to load countries. Please try again later.');
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const applyFilters = async () => {
      setLoading(true);
      try {
        let result = [];

        if (searchTerm) {
          result = await getCountriesByName(searchTerm);
        } else if (selectedRegion) {
          result = await getCountriesByRegion(selectedRegion);
        } else if (selectedLanguage) {
          result = await getCountriesByLanguage(selectedLanguage);
        } else {
          result = countries;
        }

        if (selectedRegion && searchTerm) {
          result = result.filter((country) => country.region === selectedRegion);
        }

        if (selectedLanguage && (searchTerm || selectedRegion)) {
          result = result.filter(
            (country) =>
              country.languages &&
              Object.keys(country.languages).includes(selectedLanguage)
          );
        }

        setFilteredCountries(result);
      } catch (error) {
        setError('Error filtering countries. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (countries.length > 0) {
      applyFilters();
    }
  }, [searchTerm, selectedRegion, selectedLanguage, countries]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term) {
      setSelectedRegion('');
      setSelectedLanguage('');
    }
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    if (region) {
      setSearchTerm('');
    }
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    if (language) {
      setSearchTerm('');
    }
  };

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
    paddingTop: '10rem', // Increased padding to move the cards down
    paddingBottom: '6rem', // Adjusted padding for better spacing
    color: 'white',
    fontFamily: "'Montserrat', sans-serif",
  };

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif" }} className="position-relative min-vh-100">
      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Open+Sans:wght@400;600&family=Playfair+Display:wght@700&display=swap"
        rel="stylesheet"
      />

      {/* Background */}
      <div style={backgroundImageStyle}></div>
      <div style={overlayStyle}></div>

      {/* Main content */}
      <div style={mainContentStyle} className="container text-white text-center">
        <h1 className="display-4 mb-4" style={{ fontFamily: "'Playfair Display', serif" }} data-aos="fade-down">
          Explore Countries Around the Globe
        </h1>

        <p className="lead mb-5" data-aos="fade-up" data-aos-delay="100">
          Search and filter countries by name, region, or language to begin your global journey.
        </p>

        {/* Search bar */}
        <div data-aos="fade-up" data-aos-delay="300">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Filters */}
        <div data-aos="fade-up" data-aos-delay="400">
          <FilterSection
            onRegionChange={handleRegionChange}
            onLanguageChange={handleLanguageChange}
            availableLanguages={availableLanguages}
          />
        </div>

        {/* Results */}
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <div data-aos="fade-up" data-aos-delay="500">
            <CountryList countries={filteredCountries} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
