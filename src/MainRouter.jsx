// src/MainRouter.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // SwitchをRoutesに変更
import App from './App';
import AdminDashboard from './AdminDashboard'; // 必要ならパスを調整してください

function MainRouter() {
  return (
    <Router>
      <Routes> {/* SwitchをRoutesに変更 */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  );
}

export default MainRouter;
