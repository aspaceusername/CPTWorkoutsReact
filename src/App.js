import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Pages/Navbar';
import Landing from './Pages/Landing';
import ClientesList from './Components/ClientesList';
import UtilizadoresList from './Components/UtilizadoresList';
import EquipasList from './Components/EquipasList';
import ServicosList from './Components/ServicosList';
import TreinadoresList from './Components/TreinadoresList';
import ComprasList from './Components/ComprasList';
import LoginComponent from './Components/LoginComponent';
import RegisterComponent from './Components/RegisterComponent';
import Sobre from './Pages/Sobre';
import ConfirmationPage from './Components/ConfirmEmailPage';
import { AuthProvider } from './contexts/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/sobre" element ={<Sobre />} />
                        <Route path="/clientes" element={<ClientesList />} />
                        <Route path="/utilizadores" element={<UtilizadoresList />} />
                        <Route path="/equipas" element={<EquipasList />} />
                        <Route path="/servicos" element={<ServicosList />} />
                        <Route path="/treinadores" element={<TreinadoresList />} />
                        <Route path="/compras" element={<ComprasList />} />
                        <Route path="/login" element={<LoginComponent />} />
                        <Route path="/register" element={<RegisterComponent />} />
                        <Route path="/confirm-email/:userId/:code" element={<ConfirmationPage />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
