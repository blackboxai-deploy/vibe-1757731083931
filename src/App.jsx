import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FamilyProvider } from './contexts/FamilyContext';
import Header from './components/layout/Header';
import FamilyDashboard from './pages/FamilyDashboard';
import MemberDashboard from './pages/MemberDashboard';

function App() {
  return (
    <Router>
      <FamilyProvider>
        <div className="app-shell">
          <Header />
          <Routes>
            <Route path="/" element={<FamilyDashboard />} />
            <Route path="/member/:memberId" element={<MemberDashboard />} />
          </Routes>
        </div>
      </FamilyProvider>
    </Router>
  );
}

export default App;