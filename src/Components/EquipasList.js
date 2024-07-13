import React, { useState, useEffect } from 'react';
import './AdminPage.css';

const EquipasList = () => {
  const [equipas, setEquipas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipas = async () => {
      try {
        const response = await fetch('https://cptworkouts20240701174748.azurewebsites.net/api/Equipas');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEquipas(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipas();
  }, []);

  const handleDetailsClick = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://cptworkouts20240701174748.azurewebsites.net/api/Equipas/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Accessing clients from data.listaClientes and building a description
      const clientsDescription = data.listaClientes.map(cliente => cliente.nome).join(', ');
      alert(`Details for Equipa: ${data.nome}\nClientes: ${clientsDescription}`);
    } catch (error) {
      console.error('Error fetching equipa details:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async (id) => {
    setLoading(true);
    try {
      if (window.confirm('Are you sure you want to delete this equipa?')) {
        const response = await fetch(`https://cptworkouts20240701174748.azurewebsites.net/api/Equipas/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setEquipas(prevEquipas => prevEquipas.filter(equipa => equipa.id !== id));
        alert('Equipa deleted successfully.');
      }
    } catch (error) {
      console.error('Error deleting equipa:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="admin-page">
      <h1>Equipas List</h1>
      <ul>
        {equipas.map(equipa => (
          <li key={equipa.id}>
            <span>{equipa.nome}</span>
            {equipa.logotipo && <img src={`https://cptworkouts20240701174748.azurewebsites.net/Imagens/${equipa.logotipo}`} alt={equipa.nome} />}
            <div className="equipas-actions">
              <button onClick={() => handleDetailsClick(equipa.id)} className="btn">Details</button>
              <button onClick={() => handleDeleteClick(equipa.id)} className="btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EquipasList;
