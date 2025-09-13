import React from 'react';

const Card = ({ title, children, className = '' }) => {
  return (
    <div className={`family-card ${className}`}>
      {title && (
        <h6>
          {title}
        </h6>
      )}
      {children}
    </div>
  );
};

export default Card;