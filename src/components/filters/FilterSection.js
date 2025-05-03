import React from 'react';

const FilterSection = ({
  onRegionChange,
  onLanguageChange,
  selectedRegion,
  selectedLanguage,
  availableLanguages
}) => {
  const regions = [
    { value: "", label: "All Regions" },
    { value: "Africa", label: "Africa" },
    { value: "Americas", label: "Americas" },
    { value: "Asia", label: "Asia" },
    { value: "Europe", label: "Europe" },
    { value: "Oceania", label: "Oceania" }
  ];

  const filterContainerStyle = {
    width: '100%',
    background: 'rgba(0, 13, 27, 0.75)',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    marginTop: '20px'
  };

  const labelStyle = {
    color: 'white',
    fontWeight: 500
  };

  const selectStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    padding: '10px',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    width: '100%',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none'
  };

  const styleTag = `
    select option {
      background-color: #001b33;
      color: white;
    }

    select option:hover {
      background-color:rgb(102, 58, 0) !important; /* Dark blue on hover */
    }
  `;

  return (
    <>
      <style>{styleTag}</style>
      <div style={filterContainerStyle}>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label htmlFor="region-filter" className="form-label" style={labelStyle}>
              Filter by Region
            </label>
            <select
              id="region-filter"
              value={selectedRegion}
              onChange={(e) => onRegionChange(e.target.value)}
              className="form-select"
              style={selectStyle}
            >
              {regions.map((region) => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="language-filter" className="form-label" style={labelStyle}>
              Filter by Language
            </label>
            <select
              id="language-filter"
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="form-select"
              style={selectStyle}
            >
              <option value="">All Languages</option>
              {availableLanguages.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSection;
