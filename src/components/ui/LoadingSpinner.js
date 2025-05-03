import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <span className="ms-3 fs-5 text-muted">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
