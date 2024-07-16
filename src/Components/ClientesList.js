import React, { useState, useEffect } from 'react';
import './AdminPage.css'; // Import the CSS file

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ nome: '', dataNascimento: '', telemovel: '', userID: '' });
  const [error, setError] = useState(null);
  const [showAddClienteModal, setShowAddClienteModal] = useState(false);
  const [equipas, setEquipas] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('https://cptworkouts20240701174748.azurewebsites.net/api/Clientes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchEquipas = async () => {
      try {
        const response = await fetch('https://cptworkouts20240701174748.azurewebsites.net/api/Equipas');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEquipas(data);
      } catch (error) {
        console.error('Erro ao buscar equipas:', error);
        setError(error.message);
      }
    };

    fetchClientes();
    fetchEquipas();
  }, []);

  const handleDetailsClick = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://cptworkouts20240701174748.azurewebsites.net/api/Clientes/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSelectedCliente(data);
      setFormData(data);
    } catch (error) {
      console.error('Erro ao buscar detalhes de clientes:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (cliente) => {
    setEditMode(true);
    setSelectedCliente(cliente);
    setFormData(cliente);
  };

  const handleRemoveClick = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://cptworkouts20240701174748.azurewebsites.net/api/Clientes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      setClientes(prevClientes =>
        prevClientes.filter(cliente => cliente.id !== id)
      );
      setSelectedCliente(null);
    } catch (error) {
      console.error('Erro ao apagar cliente:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiUrl = editMode
        ? `https://cptworkouts20240701174748.azurewebsites.net/api/Clientes/${formData.id}`
        : 'https://cptworkouts20240701174748.azurewebsites.net/api/Clientes';

      const method = editMode ? 'PUT' : 'POST';

      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedCliente = await response.json();

      if (editMode) {
        setClientes(clientes.map(cliente => cliente.id === updatedCliente.id ? updatedCliente : cliente));
      } else {
        setClientes([...clientes, updatedCliente]);
      }

      setFormData({ nome: '', dataNascimento: '', telemovel: '', userID: '' });

      setShowAddClienteModal(false);
    } catch (error) {
      console.error(`Error ${editMode ? 'editing' : 'adding'} cliente:`, error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openAddClienteModal = () => {
    setShowAddClienteModal(true);
  };

  const closeAddClienteModal = () => {
    setShowAddClienteModal(false);
  };

  const handleHideDetails = () => {
    setSelectedCliente(null);
  };

  return (
    <div className="admin-page">
      <h1>Clientes</h1>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <ul>
            {clientes.map(cliente => (
              <li key={cliente.id}>
                {cliente.nome} - {cliente.telemovel}
                <button onClick={() => handleDetailsClick(cliente.id)}>Detalhes</button>
                <button onClick={() => handleEditClick(cliente)}>Editar</button>
                <button onClick={() => handleRemoveClick(cliente.id)}>Apagar</button>
              </li>
            ))}
          </ul>
          {selectedCliente && !editMode && (
            <div className="details">
              <h2>Cliente Details</h2>
              <p><strong>Nome:</strong> {selectedCliente.nome}</p>
              <p><strong>Data de Nascimento:</strong> {selectedCliente.dataNascimento}</p>
              <p><strong>Telemovel:</strong> {selectedCliente.telemovel}</p>
              <p><strong>UserID:</strong> {selectedCliente.userID}</p>
              <button onClick={handleHideDetails}>Esconder Detalhes</button>
            </div>
          )}
          {editMode && (
            <div className="edit-form">
              <h2>{editMode ? 'Edit' : 'Add'} Cliente</h2>
              <form onSubmit={handleFormSubmit}>
                <label>
                  Nome:
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Data de Nascimento:
                  <input
                    type="date"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Telemovel:
                  <input
                    type="text"
                    name="telemovel"
                    value={formData.telemovel}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  UserID:
                  <input
                    type="text"
                    name="userID"
                    value={formData.userID}
                    onChange={handleInputChange}
                  />
                </label>
                <button type="submit">{editMode ? 'Save' : 'Add'}</button>
                <button onClick={() => setEditMode(false)}>Cancelar</button>
              </form>
            </div>
          )}
          {!editMode && (
            <div className="add-cliente-form">
              <h2>Add New Cliente</h2>
              <button onClick={openAddClienteModal}>Adicionar Cliente</button>
            </div>
          )}
          {showAddClienteModal && (
            <AddClienteModal
              formData={formData}
              error={error}
              handleInputChange={handleInputChange}
              handleFormSubmit={handleFormSubmit}
              closeAddClienteModal={closeAddClienteModal}
              equipas={equipas}
            />
          )}
        </>
      )}
    </div>
  );
};

const AddClienteModal = ({ formData, error, handleInputChange, handleFormSubmit, closeAddClienteModal, equipas }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeAddClienteModal}>&times;</span>
        <h2>Add New Cliente</h2>
        <form onSubmit={handleFormSubmit}>
          <label>
            Nome:
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Data de Nascimento:
            <input
              type="date"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Telemovel:
            <input
              type="text"
              name="telemovel"
              value={formData.telemovel}
              onChange={handleInputChange}
            />
          </label>
          <label>
            UserID:
            <input
              type="text"
              name="userID"
              value={formData.userID}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Equipa:
            <select
              name="equipaFK"
              value={formData.equipaFK}
              onChange={handleInputChange}
            >
              {equipas.map(equipa => (
                <option key={equipa.id} value={equipa.id}>{equipa.nome}</option>
              ))}
            </select>
          </label>
          <button type="submit">Adicionar</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default ClientesList;
