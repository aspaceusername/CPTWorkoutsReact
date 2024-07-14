import React, { useState, useEffect } from 'react';
import './AdminPage.css';

const EquipasList = () => {
  const [equipas, setEquipas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedEquipa, setSelectedEquipa] = useState(null);
  const [formData, setFormData] = useState({ nome: '', logotipo: '' });

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
      const clientsDescription = data.listaClientes.map(cliente => cliente.nome).join(', ');
      alert(`Detalhes Equipa: ${data.nome}\nClientes: ${clientsDescription}`);
    } catch (error) {
      console.error('Erro fetching equipa detalhes:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async (id) => {
    setLoading(true);
    try {
      if (window.confirm('Quer apagar esta equipa?')) {
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
      console.error('Erro ao apagar equipa:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (equipa) => {
    setEditMode(true);
    setSelectedEquipa(equipa);
    setFormData({ nome: equipa.nome, logotipo: equipa.logotipo });
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`https://cptworkouts20240701174748.azurewebsites.net/api/Equipas/${selectedEquipa.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedEquipa = await response.json();
      setEquipas(prevEquipas => prevEquipas.map(equipa => (equipa.id === updatedEquipa.id ? updatedEquipa : equipa)));
      setEditMode(false);
      alert('Equipa updated successfully.');
    } catch (error) {
      console.error('Erro updating equipa:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="admin-page">
      <h1>Equipas</h1>
      <ul>
        {equipas.map(equipa => (
          <li key={equipa.id}>
            <span>{equipa.nome}</span>
            {equipa.logotipo && (
              <img
                src={`https://cptworkouts20240701174748.azurewebsites.net/Imagens/${equipa.logotipo}`}
                alt={equipa.nome}
              />
            )}
            <div className="equipas-actions">
              <button onClick={() => handleDetailsClick(equipa.id)} className="btn">Detalhes</button>
              <button onClick={() => handleEditClick(equipa)} className="btn">Editar</button>
              <button onClick={() => handleDeleteClick(equipa.id)} className="btn">Apagar</button>
            </div>
          </li>
        ))}
      </ul>

      {editMode && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setEditMode(false)}>&times;</span>
            <h2>Edit Equipa</h2>
            <form onSubmit={handleEditSubmit}>
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
              />
              <label htmlFor="logotipo">Logotipo:</label>
              <input
                type="text"
                id="logotipo"
                name="logotipo"
                value={formData.logotipo}
                onChange={handleInputChange}
              />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipasList;
