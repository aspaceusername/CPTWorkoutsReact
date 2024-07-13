import React, { useState, useEffect } from 'react';
import './AdminPage.css';

const ServicosList = () => {
  const [servicos, setServicos] = useState([]);
  const [treinadores, setTreinadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newServico, setNewServico] = useState({ nome: '', preco: '', listaIdsTreinadores: [] });

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await fetch('https://cptworkouts20240701174748.azurewebsites.net/api/Servicos');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setServicos(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

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
      }
    };

    fetchServicos();
    fetchTreinadores();
  }, []);

  const handleDetailsClick = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://cptworkouts20240701174748.azurewebsites.net/api/Servicos/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const trainersDescription = data.listaTreinadores.map(treinador => treinador.nome).join(', ');
      alert(`Details for Servico: ${data.nome}\nTreinadores: ${trainersDescription}`);
    } catch (error) {
      console.error('Error fetching servico details:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async (id) => {
    setLoading(true);
    try {
      if (window.confirm('Are you sure you want to delete this servico?')) {
        const response = await fetch(`https://cptworkouts20240701174748.azurewebsites.net/api/Servicos/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setServicos(prevServicos => prevServicos.filter(servico => servico.id !== id));
        alert('Servico deleted successfully.');
      }
    } catch (error) {
      console.error('Error deleting servico:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClick = () => {
    setIsCreating(true);
  };

  const handleCreateChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const treinadorId = parseInt(value);
      setNewServico(prevState => ({
        ...prevState,
        listaIdsTreinadores: checked
          ? [...prevState.listaIdsTreinadores, treinadorId]
          : prevState.listaIdsTreinadores.filter(id => id !== treinadorId),
      }));
    } else {
      setNewServico(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://cptworkouts20240701174748.azurewebsites.net/api/Servicos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newServico),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const createdServico = await response.json();
      setServicos(prevServicos => [...prevServicos, createdServico]);
      setNewServico({ nome: '', preco: '', listaIdsTreinadores: [] });
      setIsCreating(false);
      alert('Servico created successfully.');
    } catch (error) {
      console.error('Error creating servico:', error);
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
      <h1>Servicos List</h1>
      <button onClick={handleCreateClick} className="btn">Create New Servico</button>
      {isCreating && (
        <form onSubmit={handleCreateSubmit} className="create-form">
          <div>
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              value={newServico.nome}
              onChange={handleCreateChange}
              required
            />
          </div>
          <div>
            <label>Preco</label>
            <input
              type="number"
              name="preco"
              value={newServico.preco}
              onChange={handleCreateChange}
              required
            />
          </div>
          <div>
            <label>Treinadores</label>
            <div className="treinadores-checkboxes">
              {treinadores.map(treinador => (
                <div key={treinador.id}>
                  <label>
                    <input
                      type="checkbox"
                      name="listaIdsTreinadores"
                      value={treinador.id}
                      checked={newServico.listaIdsTreinadores.includes(treinador.id)}
                      onChange={handleCreateChange}
                    />
                    {treinador.nome}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="btn">Submit</button>
          <button type="button" onClick={() => setIsCreating(false)} className="btn">Cancel</button>
        </form>
      )}
      <ul>
        {servicos.map(servico => (
          <li key={servico.id}>
            <span>{servico.nome}</span>
            <span>{servico.preco}</span>
            <div className="servicos-actions">
              <button onClick={() => handleDetailsClick(servico.id)} className="btn">Details</button>
              <button onClick={() => handleDeleteClick(servico.id)} className="btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicosList;