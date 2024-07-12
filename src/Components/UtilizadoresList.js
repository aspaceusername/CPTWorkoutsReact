import React, { useState, useEffect } from 'react';
import './UtilizadoresList.css'; // Import the CSS file

const UtilizadoresList = () => {
  const [utilizadores, setUtilizadores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUtilizadores = async () => {
      try {
        const response = await fetch('https://cptworkouts20240701174748.azurewebsites.net/api/Utilizadores');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUtilizadores(data);
      } catch (error) {
        console.error('Error fetching utilizadores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUtilizadores();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-page">
      <h1>Lista de Utilizadores</h1>
      <ul>
        {utilizadores.map((utilizador) => (
          <li key={utilizador.id}>
            {utilizador.nome} - {utilizador.telemovel}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UtilizadoresList;
