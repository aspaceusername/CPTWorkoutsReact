import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Landing from './Pages/Landing.js';
import ClientesList from './Components/ClientesList';
import UtilizadoresList from './Components/UtilizadoresList.js';
import AddUser from './Components/AddUser';

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();
  
  return (
    <div>
      {location.pathname === '/' && <Landing />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/clientes" element={<ClientesList />} />
        <Route path="/utilizadores" element={<UtilizadoresList />} />
        {/* Add other routes as needed */}
      </Routes>
    </div>
  );
}

export default App;
