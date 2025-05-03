import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="alert alert-danger d-flex align-items-center mb-4">
      <svg className="bi bi-exclamation-circle me-2" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm.93-6.354a.5.5 0 0 0-.186-.668L7.5 6.207V5a.5.5 0 0 0-1 0v1.207L5.356 7.978a.5.5 0 0 0-.186.668l3 5A.5.5 0 0 0 8 14a.5.5 0 0 0 .446-.267l3-5z"/>
      </svg>
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
