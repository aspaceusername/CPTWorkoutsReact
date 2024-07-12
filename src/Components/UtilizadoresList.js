import React, { useState, useEffect } from 'react';
import './AdminPage.css'; // Import the CSS file

const UtilizadoresList = () => {
  const [utilizadores, setUtilizadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUtilizador, setSelectedUtilizador] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ nome: '', dataNascimento: '', telemovel: '', userID: '' });
  const [error, setError] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

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
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUtilizadores();
  }, []);

  const handleDetailsClick = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://cptworkouts20240701174748.azurewebsites.net/api/Utilizadores/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSelectedUtilizador(data);
      setFormData(data); // Populate form data with user details
    } catch (error) {
      console.error('Error fetching utilizador details:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (utilizador) => {
    setEditMode(true);
    setSelectedUtilizador(utilizador);
    setFormData(utilizador);
  };

  const handleRemoveClick = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://cptworkouts20240701174748.azurewebsites.net/api/Utilizadores/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Update local state after successful deletion
      setUtilizadores(prevUtilizadores =>
        prevUtilizadores.filter(utilizador => utilizador.id !== id)
      );
      setSelectedUtilizador(null);
    } catch (error) {
      console.error('Error removing utilizador:', error);
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
      const response = await fetch('https://cptworkouts20240701174748.azurewebsites.net/api/Utilizadores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newUser = await response.json();
      setUtilizadores([...utilizadores, newUser]);
      setFormData({ nome: '', dataNascimento: '', telemovel: '', userID: '' }); // Clear form data
      setShowAddUserModal(false); // Close the modal after successful submission
    } catch (error) {
      console.error('Error adding utilizador:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openAddUserModal = () => {
    setShowAddUserModal(true);
  };

  const closeAddUserModal = () => {
    setShowAddUserModal(false);
  };

  const handleHideDetails = () => {
    setSelectedUtilizador(null);
  };

  return (
    <div className="admin-page">
      <h1>Lista de Utilizadores</h1>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <ul>
            {utilizadores.map(utilizador => (
              <li key={utilizador.id}>
                {utilizador.nome} - {utilizador.telemovel}
                <button onClick={() => handleDetailsClick(utilizador.id)}>View Details</button>
                <button onClick={() => handleEditClick(utilizador)}>Edit</button>
                <button onClick={() => handleRemoveClick(utilizador.id)}>Remove</button>
              </li>
            ))}
          </ul>
          {selectedUtilizador && !editMode && (
            <div className="details">
              <h2>Utilizador Details</h2>
              <p><strong>Nome:</strong> {selectedUtilizador.nome}</p>
              <p><strong>Data de Nascimento:</strong> {selectedUtilizador.dataNascimento}</p>
              <p><strong>Telemovel:</strong> {selectedUtilizador.telemovel}</p>
              <p><strong>UserID:</strong> {selectedUtilizador.userID}</p>
              <button onClick={handleHideDetails}>Hide Details</button>
            </div>
          )}
          {editMode && (
            <div className="edit-form">
              <h2>Edit Utilizador</h2>
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
                <button type="submit">Save</button>
                <button onClick={() => setEditMode(false)}>Cancel</button>
              </form>
            </div>
          )}
          {/* Add new user form */}
          {!editMode && (
            <div className="add-user-form">
              <h2>Add New Utilizador</h2>
              <button onClick={openAddUserModal}>Add User</button>
            </div>
          )}
          {/* Modal for adding a new user */}
          {showAddUserModal && (
            <AddUserModal
              formData={formData}
              error={error}
              handleInputChange={handleInputChange}
              handleFormSubmit={handleFormSubmit}
              closeAddUserModal={closeAddUserModal}
            />
          )}
        </>
      )}
    </div>
  );
};

// AddUserModal component
const AddUserModal = ({ formData, error, handleInputChange, handleFormSubmit, closeAddUserModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeAddUserModal}>&times;</span>
        <h2>Add New Utilizador</h2>
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
          <button type="submit">Add User</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default UtilizadoresList;
