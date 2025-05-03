import React from 'react';
import CountryCard from './CountryCard';

const CountryList = ({ countries }) => {
  return (
    <div className="row g-4">
      {countries.map((country) => (
        <div key={country.cca3} className="col-12 col-sm-6 col-md-4 col-lg-3">
          <CountryCard country={country} />
        </div>
      ))}
    </div>
  );
};

export default CountryList;
