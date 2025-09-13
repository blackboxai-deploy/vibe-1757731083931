import React from 'react';
import { useFamilyContext } from '../../contexts/FamilyContext';
import Card from '../common/Card';
import HealthIndicator from '../common/HealthIndicator';

const MemberList = () => {
  const { familyData, selectedMemberId, selectMember, updateFamilySummary } = useFamilyContext();
  const summary = updateFamilySummary();

  return (
    <>
      <Card title={<><i className="fas fa-users me-2"></i>Miembros de la familia</>}>
        <div className="member-list">
          {familyData.miembros.map(member => (
            <div 
              key={member.id}
              className={`member-item ${selectedMemberId === member.id ? 'selected' : ''}`}
              onClick={() => selectMember(member.id)}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{member.nombre}</strong><br />
                  <small>{member.rol}, {member.edad} años</small>
                </div>
                <HealthIndicator member={member} />
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      <Card title={<><i className="fas fa-info-circle me-2"></i>Información Familiar</>}>
        <div id="familySummary">
          <p className="mb-1">{summary.total} integrantes registrados</p>
          <p className="mb-1">{summary.optimal} con salud óptima</p>
          <p className="mb-1">{summary.moderate} con salud moderada</p>
          <p>{summary.attention} requiere atención</p>
        </div>
      </Card>
    </>
  );
};

export default MemberList;