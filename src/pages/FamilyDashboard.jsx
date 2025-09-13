import React from 'react';
import { useFamilyContext } from '../contexts/FamilyContext';
import MemberList from '../components/member/MemberList';
import MemberDashboard from './MemberDashboard';
import GenogramChart from '../components/family/GenogramChart';

const FamilyDashboard = () => {
  const { selectedMemberId } = useFamilyContext();

  return (
    <div className="row">
      {/* Left Column: Member List */}
      <div className="col-md-3">
        <MemberList />
      </div>

      {/* Right Column: Member Dashboard or Welcome */}
      <div className="col-md-9">
        {selectedMemberId ? (
          <MemberDashboard />
        ) : (
          <div className="family-card">
            <h4>Seleccione un miembro</h4>
            <p className="text-muted">Para ver su dashboard de salud</p>
          </div>
        )}
      </div>

      {/* Genogram Section - Full Width */}
      <div className="col-md-12 mt-3">
        <GenogramChart />
      </div>
    </div>
  );
};

export default FamilyDashboard;