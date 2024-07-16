import React, { useState, useEffect } from 'react';
import './AdminPage.css';

const ComprasList = () => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newCompra, setNewCompra] = useState({ dataCompra: '', horaCompra: '', servicoFK: '', clienteFK: '', valorCompra: '' });
  const [editMode, setEditMode] = useState(false);
  const [selectedCompra, setSelectedCompra] = useState(null);
  const [formData, setFormData] = useState({ dataCompra: '', horaCompra: '', servicoFK: '', clienteFK: '', valorCompra: '' });

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const response = await fetch('https://cptworkouts20240701174748.azurewebsites.net/api/Compras');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCompras(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompras();
  }, []);

  const handleDetailsClick = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://cptworkouts20240701174748.azurewebsites.net/api/Compras/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      alert(`Detalhes da Compra: ${data.dataCompra} ${data.horaCompra}\nServicoFK: ${data.servicoFK}\nClienteFK: ${data.clienteFK}\nValorCompra: ${data.valorCompra}`);
    } catch (error) {
      console.error('Erro ao buscar detalhes da compra', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async (id) => {
    setLoading(true);
    try {
      if (window.confirm('Quer apagar esta compra?')) {
        const response = await fetch(`https://cptworkouts20240701174748.azurewebsites.net/api/Compras/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setCompras(prevCompras => prevCompras.filter(compra => compra.clienteFK !== id));
        alert('Compra Apagada Com Sucesso');
      }
    } catch (error) {
      console.error('Erro ao apagar compra:', error);
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
    setNewCompra(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://cptworkouts20240701174748.azurewebsites.net/api/Compras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCompra),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const createdCompra = await response.json();
      setCompras(prevCompras => [...prevCompras, createdCompra]);
      setNewCompra({ dataCompra: '', horaCompra: '', servicoFK: '', clienteFK: '', valorCompra: '' });
      setIsCreating(false);
      alert('Compra criada com sucesso.');
    } catch (error) {
      console.error('Erro ao criar compra:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (compra) => {
    setEditMode(true);
    setSelectedCompra(compra);
    setFormData({ dataCompra: compra.dataCompra, horaCompra: compra.horaCompra, servicoFK: compra.servicoFK, clienteFK: compra.clienteFK, valorCompra: compra.valorCompra });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`https://cptworkouts20240701174748.azurewebsites.net/api/Compras/${selectedCompra.clienteFK}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedCompra = await response.json();
      setCompras(prevCompras => prevCompras.map(compra => (compra.clienteFK === updatedCompra.clienteFK ? updatedCompra : compra)));
      setEditMode(false);
      alert('Compra atualizada com sucesso.');
    } catch (error) {
      console.error('Erro ao atualizar compra:', error);
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
      <h1>Compras</h1>
      <button onClick={handleCreateClick} className="btn">Criar nova compra</button>
      {isCreating && (
        <form onSubmit={handleCreateSubmit} className="create-form">
          <div>
            <label>Data Compra</label>
            <input
              type="datetime-local" // Change to datetime-local to include both date and time
              name="dataCompra"
              value={newCompra.dataCompra}
              onChange={handleCreateChange}
              required
            />
          </div>
          <div>
            <label>ServicoFK</label>
            <input
              type="text"
              name="servicoFK"
              value={newCompra.servicoFK}
              onChange={handleCreateChange}
              required
            />
          </div>
          <div>
            <label>ClienteFK</label>
            <input
              type="text"
              name="clienteFK"
              value={newCompra.clienteFK}
              onChange={handleCreateChange}
              required
            />
          </div>
          <div>
            <label>Valor Compra</label>
            <input
              type="number"
              name="valorCompra"
              value={newCompra.valorCompra}
              onChange={handleCreateChange}
              required
            />
          </div>
          <button type="submit" className="btn">Guardar</button>
          <button type="button" onClick={() => setIsCreating(false)} className="btn">Cancelar</button>
        </form>
      )}
      <ul>
        {compras.map(compra => (
          <li key={compra.clienteFK}>
            <span>{compra.dataCompra} {compra.horaCompra}</span>
            <span>{compra.servicoFK}</span>
            <span>{compra.clienteFK}</span>
            <span>{compra.valorCompra}</span>
            <div className="compras-actions">
              <button onClick={() => handleDetailsClick(compra.clienteFK)} className="btn">Detalhes</button>
              <button onClick={() => handleEditClick(compra)} className="btn">Editar</button>
              <button onClick={() => handleDeleteClick(compra.clienteFK)} className="btn">Apagar</button>
            </div>
          </li>
        ))}
      </ul>

      {editMode && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setEditMode(false)}>&times;</span>
            <h2>Editar Compra</h2>
            <form onSubmit={handleEditSubmit}>
              <label htmlFor="dataCompra">Data Compra:</label>
              <input
                type="datetime-local"
                id="dataCompra"
                name="dataCompra"
                value={formData.dataCompra}
                onChange={handleInputChange}
              />
              <label htmlFor="servicoFK">ServicoFK:</label>
              <input
                type="text"
                id="servicoFK"
                name="servicoFK"
                value={formData.servicoFK}
                onChange={handleInputChange}
              />
              <label htmlFor="clienteFK">ClienteFK:</label>
              <input
                type="text"
                id="clienteFK"
                name="clienteFK"
                value={formData.clienteFK}
                onChange={handleInputChange}
              />
              <label htmlFor="valorCompra">Valor Compra:</label>
              <input
                type="number"
                id="valorCompra"
                name="valorCompra"
                value={formData.valorCompra}
                onChange={handleInputChange}
              />
              <button type="submit" className="btn">Guardar</button>
              <button type="button" onClick={() => setEditMode(false)} className="btn">Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComprasList;
