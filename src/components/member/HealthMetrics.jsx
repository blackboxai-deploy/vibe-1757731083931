import React from 'react';

const HealthMetrics = ({ member }) => {
  if (!member) return null;

  const calculateBMI = () => {
    const { peso, altura } = member.salud;
    return (peso / (altura * altura)).toFixed(1);
  };

  return (
    <div className="col-md-4">
      <div className="metric-card bg-light">
        <div className="metric-value">{member.salud.presion} mmHg</div>
        <div className="metric-label">Presión Arterial</div>
      </div>
      <div className="metric-card bg-light">
        <div className="metric-value">{member.salud.glucosa} mg/dL</div>
        <div className="metric-label">Glucosa</div>
      </div>
      <div className="metric-card bg-light">
        <div className="metric-value">{member.salud.colesterol} mg/dL</div>
        <div className="metric-label">Colesterol</div>
      </div>
      <div className="metric-card bg-light">
        <div className="metric-value">{calculateBMI()}</div>
        <div className="metric-label">IMC</div>
      </div>
    </div>
  );
};

export default HealthMetrics;