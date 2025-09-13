import React, { useState } from 'react';
import { useFamilyContext } from '../contexts/FamilyContext';
import Card from '../components/common/Card';
import HealthChart from '../components/charts/HealthChart';
import HealthMetrics from '../components/member/HealthMetrics';
import ClinicalHistory from '../components/member/ClinicalHistory';
import MedicalExams from '../components/member/MedicalExams';
import Recommendations from '../components/member/Recommendations';

const MemberDashboard = () => {
  const { getSelectedMember } = useFamilyContext();
  const [activeTab, setActiveTab] = useState('overview');
  const selectedMember = getSelectedMember();

  if (!selectedMember) {
    return (
      <Card>
        <h4>Seleccione un miembro</h4>
        <p className="text-muted">Para ver su dashboard de salud</p>
      </Card>
    );
  }

  return (
    <Card>
      <h4>{selectedMember.nombre}</h4>
      <p className="text-muted">{selectedMember.rol}, {selectedMember.edad} años</p>
      
      {/* Navigation Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Resumen
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            Historial Clínico
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'exams' ? 'active' : ''}`}
            onClick={() => setActiveTab('exams')}
          >
            Exámenes Médicos
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'trends' ? 'active' : ''}`}
            onClick={() => setActiveTab('trends')}
          >
            Tendencias
          </button>
        </li>
      </ul>
      
      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="row">
            <div className="col-md-8">
              <Card title="Estado de Salud Actual">
                <HealthChart member={selectedMember} />
              </Card>
            </div>
            <HealthMetrics member={selectedMember} />
            <div className="col-md-12 mt-3">
              <Card title="Últimos Eventos Clínicos">
                <p className="text-center text-muted">No hay eventos recientes</p>
              </Card>
            </div>
          </div>
        )}
        
        {activeTab === 'history' && (
          <ClinicalHistory member={selectedMember} />
        )}
        
        {activeTab === 'exams' && (
          <MedicalExams member={selectedMember} />
        )}
        
        {activeTab === 'trends' && (
          <div className="row">
            <div className="col-md-6">
              <Card title="Evolución de Indicadores">
                <p className="text-center text-muted">Gráfico de tendencias próximamente</p>
              </Card>
            </div>
            <div className="col-md-6">
              <Recommendations member={selectedMember} />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MemberDashboard;