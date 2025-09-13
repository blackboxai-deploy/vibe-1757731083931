import React, { createContext, useContext, useState } from 'react';
import { familia } from '../data/familyData';

const FamilyContext = createContext();

export const useFamilyContext = () => {
  const context = useContext(FamilyContext);
  if (!context) {
    throw new Error('useFamilyContext must be used within a FamilyProvider');
  }
  return context;
};

export const FamilyProvider = ({ children }) => {
  const [familyData, setFamilyData] = useState(familia);
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  const selectMember = (memberId) => {
    setSelectedMemberId(memberId);
  };

  const getSelectedMember = () => {
    if (!selectedMemberId) return null;
    return familyData.miembros.find(member => member.id === selectedMemberId);
  };

  const addHistoryRecord = (memberId, record) => {
    setFamilyData(prevData => ({
      ...prevData,
      miembros: prevData.miembros.map(member => {
        if (member.id === memberId) {
          return {
            ...member,
            historial: [...(member.historial || []), record]
          };
        }
        return member;
      })
    }));
  };

  const addExamRecord = (memberId, exam) => {
    setFamilyData(prevData => ({
      ...prevData,
      miembros: prevData.miembros.map(member => {
        if (member.id === memberId) {
          return {
            ...member,
            examenes: [...(member.examenes || []), exam]
          };
        }
        return member;
      })
    }));
  };

  const updateFamilySummary = () => {
    let optimal = 0, moderate = 0, attention = 0;
    
    familyData.miembros.forEach(m => {
      const { presion, glucosa, colesterol } = m.salud;
      let riskFactors = 0;
      
      if (presion > 130) riskFactors++;
      if (glucosa > 110) riskFactors++;
      if (colesterol > 200) riskFactors++;
      
      if (riskFactors === 0) optimal++;
      else if (riskFactors === 1) moderate++;
      else attention++;
    });
    
    return {
      total: familyData.miembros.length,
      optimal,
      moderate,
      attention
    };
  };

  const contextValue = {
    familyData,
    selectedMemberId,
    selectMember,
    getSelectedMember,
    addHistoryRecord,
    addExamRecord,
    updateFamilySummary
  };

  return (
    <FamilyContext.Provider value={contextValue}>
      {children}
    </FamilyContext.Provider>
  );
};