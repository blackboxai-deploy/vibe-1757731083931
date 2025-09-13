import React from 'react';
import { getHealthStatus, getHealthClass } from '../../data/familyData';

const HealthIndicator = ({ member, showText = false }) => {
  const healthStatus = getHealthStatus(member);
  const healthClass = getHealthClass(healthStatus);
  
  return (
    <span className={`badge ${healthClass}`}>
      {showText && <span className="health-indicator"></span>}
      {healthStatus}
    </span>
  );
};

export default HealthIndicator;