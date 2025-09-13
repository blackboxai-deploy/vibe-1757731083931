import React from 'react';
import { formatDate } from '../../data/familyData';
import Card from '../common/Card';

const ClinicalHistory = ({ member }) => {
  if (!member || !member.historial || member.historial.length === 0) {
    return (
      <Card title="Historial Clínico">
        <p className="text-center text-muted">No hay registros en el historial clínico</p>
      </Card>
    );
  }

  const sortedHistory = [...member.historial].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return (
    <Card title="Historial de Consultas y Tratamientos">
      <div className="timeline">
        {sortedHistory.map((event, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-content">
              <div className="d-flex justify-content-between">
                <h6 className="mb-1">{event.motivo}</h6>
                <span className="text-muted">{formatDate(event.fecha)}</span>
              </div>
              <p className="mb-1"><strong>Diagnóstico:</strong> {event.diagnostico}</p>
              <p className="mb-0"><strong>Tratamiento:</strong> {event.tratamiento}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ClinicalHistory;