import React, { useState, useEffect } from 'react';
import './AdminPage.css';

const TreinadoresList = () => {
  const [treinadores, setTreinadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newTreinador, setNewTreinador] = useState({ nome: '', dataNascimento: '', telemovel: '', userID: '' });
  const [editMode, setEditMode] = useState(false);
  const [selectedTreinador, setSelectedTreinador] = useState(null);
  const [formData, setFormData] = useState({ nome: '', dataNascimento: '', telemovel: '', userID: '' });

  useEffect(() => {
    //buscar treinadores
    const fetchTreinadores = async () => {
      try {
        const response = await fetch('https://cptworkouts20240701174748.azurewebsites.net/api/Treinadores');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTreinadores(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTreinadores();
  }, []);

  //mostrar detalhes do treinador
  const handleDetailsClick = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://cptworkouts20240701174748.azurewebsites.net/api/Treinadores/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      alert(`Detalhes do Treinador: ${data.nome}\nData de Nascimento: ${data.dataNascimento}\nTelemovel: ${data.telemovel}\nUserID: ${data.userID}`);
    } catch (error) {
      console.error('Error ao buscar detalhes do treinador:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  //apagar o treinador
  const handleDeleteClick = async (id) => {
    setLoading(true);
    try {
      if (window.confirm('Quer apagar este treinador?')) {
        const response = await fetch(`https://cptworkouts20240701174748.azurewebsites.net/api/Treinadores/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setTreinadores(prevTreinadores => prevTreinadores.filter(treinador => treinador.id !== id));
        alert('Treinador Apagado Com Sucesso');
      }
    } catch (error) {
      console.error('Erro ao apagar treinador:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClick = () => {
    setIsCreating(true);
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewTreinador(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  //criar um treinador
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://cptworkouts20240701174748.azurewebsites.net/api/Treinadores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTreinador),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const createdTreinador = await response.json();
      setTreinadores(prevTreinadores => [...prevTreinadores, createdTreinador]);
      setNewTreinador({ nome: '', dataNascimento: '', telemovel: '', userID: '' });
      setIsCreating(false);
      alert('Treinador criado com sucesso');
    } catch (error) {
      console.error('Erro ao criar o treinador:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

//editar um treinador
  const handleEditClick = (treinador) => {
    setEditMode(true);
    setSelectedTreinador(treinador);
    setFormData({ nome: treinador.nome, dataNascimento: treinador.dataNascimento, telemovel: treinador.telemovel, userID: treinador.userID });
  };
//editar um treinador
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`https://cptworkouts20240701174748.azurewebsites.net/api/Treinadores/${selectedTreinador.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedTreinador = await response.json();
      setTreinadores(prevTreinadores => prevTreinadores.map(treinador => (treinador.id === updatedTreinador.id ? updatedTreinador : treinador)));
      setEditMode(false);
      alert('Treinador atualizado com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar treinador:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
      <h1>Treinadores</h1>
      <button onClick={handleCreateClick} className="btn">Criar novo Treinador</button>
      {isCreating && (
        <form onSubmit={handleCreateSubmit} className="create-form">
          <div>
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              value={newTreinador.nome}
              onChange={handleCreateChange}
              required
            />
          </div>
          <div>
            <label>Data de Nascimento</label>
            <input
              type="date"
              name="dataNascimento"
              value={newTreinador.dataNascimento}
              onChange={handleCreateChange}
              required
            />
          </div>
          <div>
            <label>Telemovel</label>
            <input
              type="text"
              name="telemovel"
              value={newTreinador.telemovel}
              onChange={handleCreateChange}
              required
            />
          </div>
          <div>
            <label>UserID</label>
            <input
              type="text"
              name="userID"
              value={newTreinador.userID}
              onChange={handleCreateChange}
              required
            />
          </div>
          <button type="submit" className="btn">Guardar</button>
          <button type="button" onClick={() => setIsCreating(false)} className="btn">Cancelar</button>
        </form>
      )}
      <ul>
        {treinadores.map(treinador => (
          <li key={treinador.id}>
            <span>{treinador.nome}</span>
            <span>{treinador.dataNascimento}</span>
            <span>{treinador.telemovel}</span>
            <div className="treinadores-actions">
              <button onClick={() => handleDetailsClick(treinador.id)} className="btn">Detalhes</button>
              <button onClick={() => handleEditClick(treinador)} className="btn">Editar</button>
              <button onClick={() => handleDeleteClick(treinador.id)} className="btn">Apagar</button>
            </div>
          </li>
        ))}
      </ul>

      {editMode && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setEditMode(false)}>&times;</span>
            <h2>Editar Treinador</h2>
            <form onSubmit={handleEditSubmit}>
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
              />
              <label htmlFor="dataNascimento">Data de Nascimento:</label>
              <input
                type="date"
                id="dataNascimento"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleInputChange}
              />
              <label htmlFor="telemovel">Telemovel:</label>
              <input
                type="text"
                id="telemovel"
                name="telemovel"
                value={formData.telemovel}
                onChange={handleInputChange}
              />
              <label htmlFor="userID">UserID:</label>
              <input
                type="text"
                id="userID"
                name="userID"
                value={formData.userID}
                onChange={handleInputChange}
              />
              <button type="submit">Guardar</button>
              <button type="button" onClick={() => setEditMode(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreinadoresList;
