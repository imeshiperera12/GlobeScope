import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value); // live search
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput); // submit-based search
  };

  const searchBarStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(0, 13, 27, 0.75)',
    borderRadius: '12px',
    padding: '10px 20px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  };

  const inputStyle = {
    flex: 1,
    padding: '10px 15px',
    fontSize: '1rem',
    border: 'none',
    background: 'transparent',
    color: 'white',
    outline: 'none',
    '::placeholder': {
      color: 'gray'
    }
  };

  const buttonStyle = {
    marginLeft: '10px',
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid rgba(1, 8, 44, 0.5)',
    borderRadius: '8px',
    padding: '8px 16px',
    cursor: 'pointer',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
  };

  // custom inline CSS to target placeholder
  const placeholderStyle = `
    .custom-input::placeholder {
      color: gray !important;
      opacity: 1;
    }
  `;

  return (
    <>
      <style>{placeholderStyle}</style>
      <form onSubmit={handleSubmit}>
        <div style={searchBarStyle}>
          <input
            type="text"
            value={searchInput}
            onChange={handleChange}
            placeholder="Search for a country..."
            className="form-control text-white custom-input"
            style={inputStyle}
          />
          <button type="submit" className="btn" style={buttonStyle}>
            Search
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
