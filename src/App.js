import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Pages/Navbar';
import Landing from './Pages/Landing';
import ClientesList from './Components/ClientesList';
import UtilizadoresList from './Components/UtilizadoresList';
import EquipasList from './Components/EquipasList.js'
import ServicosList from './Components/ServicosList.js';
import TreinadoresList from './Components/TreinadoresList.js';
import ComprasList from './Components/ComprasList.js';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/clientes" element={<ClientesList />} />
          <Route path="/utilizadores" element={<UtilizadoresList />} />
          <Route path="/equipas" element={<EquipasList />} />
          <Route path="/servicos" element={<ServicosList />} />
          <Route path="/treinadores" element={<TreinadoresList />} />
          <Route path="/compras" element={<ComprasList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
