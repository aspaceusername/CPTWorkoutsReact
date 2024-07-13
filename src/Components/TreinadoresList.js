import React, { useState, useEffect } from 'react';
import './AdminPage.css';

const TreinadoresList = () => {
  const [treinadores, setTreinadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newTreinador, setNewTreinador] = useState({ nome: '', dataNascimento: '', telemovel: '', userID: '' });

  useEffect(() => {
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

  const handleDetailsClick = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://cptworkouts20240701174748.azurewebsites.net/api/Treinadores/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      alert(`Details for Treinador: ${data.nome}\nData de Nascimento: ${data.dataNascimento}\nTelemovel: ${data.telemovel}\nUserID: ${data.userID}`);
    } catch (error) {
      console.error('Error fetching treinador details:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async (id) => {
    setLoading(true);
    try {
      if (window.confirm('Are you sure you want to delete this treinador?')) {
        const response = await fetch(`https://cptworkouts20240701174748.azurewebsites.net/api/Treinadores/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setTreinadores(prevTreinadores => prevTreinadores.filter(treinador => treinador.id !== id));
        alert('Treinador deleted successfully.');
      }
    } catch (error) {
      console.error('Error deleting treinador:', error);
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
      alert('Treinador created successfully.');
    } catch (error) {
      console.error('Error creating treinador:', error);
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
      <h1>Treinadores List</h1>
      <button onClick={handleCreateClick} className="btn">Create New Treinador</button>
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
          <button type="submit" className="btn">Submit</button>
          <button type="button" onClick={() => setIsCreating(false)} className="btn">Cancel</button>
        </form>
      )}
      <ul>
        {treinadores.map(treinador => (
          <li key={treinador.id}>
            <span>{treinador.nome}</span>
            <span>{treinador.dataNascimento}</span>
            <span>{treinador.telemovel}</span>
            <div className="treinadores-actions">
              <button onClick={() => handleDetailsClick(treinador.id)} className="btn">Details</button>
              <button onClick={() => handleDeleteClick(treinador.id)} className="btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TreinadoresList;
