import React from 'react';
import { getHealthStatus } from '../../data/familyData';
import Card from '../common/Card';

const Recommendations = ({ member }) => {
  if (!member) return null;

  const healthStatus = getHealthStatus(member);
  
  let recommendations = '';
  
  if (healthStatus === 'Requiere atención') {
    recommendations = (
      <div className="alert alert-warning">
        <i className="fas fa-exclamation-triangle me-2"></i>
        <strong>Atención requerida</strong>
        <p>Se recomienda consultar con un especialista para evaluar su condición actual.</p>
      </div>
    );
  } else if (healthStatus === 'Moderado') {
    recommendations = (
      <div className="alert alert-info">
        <i className="fas fa-info-circle me-2"></i>
        <strong>Mejoras recomendadas</strong>
        <ul>
          <li>Mantener una dieta balanceada baja en azúcares</li>
          <li>Realizar ejercicio físico regularmente</li>
          <li>Controlar presión arterial semanalmente</li>
        </ul>
      </div>
    );
  } else {
    recommendations = (
      <div className="alert alert-success">
        <i className="fas fa-check-circle me-2"></i>
        <strong>¡Buen estado de salud!</strong>
        <p>Continue con sus hábitos saludables y controles periódicos.</p>
      </div>
    );
  }

  return (
    <Card title="Recomendaciones Personalizadas">
      {recommendations}
      
      {/* Additional specific recommendations */}
      {member.salud.presion > 130 && (
        <div className="alert alert-secondary mt-2">
          <i className="fas fa-heartbeat me-2"></i>
          <strong>Presión arterial elevada</strong>
          <p>Considere reducir el consumo de sal y realizar actividad física regular.</p>
        </div>
      )}
      
      {member.salud.glucosa > 110 && (
        <div className="alert alert-secondary mt-2">
          <i className="fas fa-tint me-2"></i>
          <strong>Glucosa elevada</strong>
          <p>Reduzca el consumo de azúcares simples y harinas refinadas.</p>
        </div>
      )}
    </Card>
  );
};

export default Recommendations;