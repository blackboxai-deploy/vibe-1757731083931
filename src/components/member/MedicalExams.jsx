import React from 'react';
import { formatDate, getExamTypeName } from '../../data/familyData';
import Card from '../common/Card';

const MedicalExams = ({ member }) => {
  if (!member || !member.examenes || member.examenes.length === 0) {
    return (
      <Card title="Exámenes Médicos">
        <p className="text-center text-muted">No hay exámenes médicos registrados</p>
      </Card>
    );
  }

  const sortedExams = [...member.examenes].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  const renderExamDetails = (exam) => {
    switch(exam.tipo) {
      case 'sangre':
        return (
          <div className="row">
            <div className="col-6">
              <small className="text-muted">Glucosa</small>
              <div className="exam-value">{exam.glucosa} mg/dL</div>
            </div>
            <div className="col-6">
              <small className="text-muted">Colesterol</small>
              <div className="exam-value">{exam.colesterol} mg/dL</div>
            </div>
            <div className="col-6">
              <small className="text-muted">Triglicéridos</small>
              <div className="exam-value">{exam.trigliceridos} mg/dL</div>
            </div>
          </div>
        );
      default:
        return (
          <div>
            <div className="exam-value">{exam.resultado}</div>
            <small className="text-muted">{exam.observaciones || ''}</small>
          </div>
        );
    }
  };

  return (
    <Card title="Registro de Exámenes Médicos">
      <div className="row">
        {sortedExams.map((exam, index) => (
          <div key={index} className="col-md-6 mb-3">
            <div className="exam-card">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0">{getExamTypeName(exam.tipo)}</h6>
                <span className="exam-date">{formatDate(exam.fecha)}</span>
              </div>
              {renderExamDetails(exam)}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MedicalExams;