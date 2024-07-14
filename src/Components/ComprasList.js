import React, { useState, useEffect } from 'react';
import './AdminPage.css';

const ComprasList = () => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newCompra, setNewCompra] = useState({ dataCompra: '', servicoFK: '', clienteFK: '', valorCompra: '' });

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
      alert(`Details for Compra: ${data.dataCompra}\nServicoFK: ${data.servicoFK}\nClienteFK: ${data.clienteFK}\nValorCompra: ${data.valorCompra}`);
    } catch (error) {
      console.error('Error fetching compra detalhes:', error);
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
      console.error('Error deleting compra:', error);
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
      setNewCompra({ dataCompra: '', servicoFK: '', clienteFK: '', valorCompra: '' });
      setIsCreating(false);
      alert('Compra criada com sucesso.');
    } catch (error) {
      console.error('Error ao criar compra:', error);
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
      <h1>Compras</h1>
      <button onClick={handleCreateClick} className="btn">Criar nova compra</button>
      {isCreating && (
        <form onSubmit={handleCreateSubmit} className="create-form">
          <div>
            <label>Data Compra</label>
            <input
              type="date"
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
            <span>{compra.dataCompra}</span>
            <span>{compra.servicoFK}</span>
            <span>{compra.clienteFK}</span>
            <span>{compra.valorCompra}</span>
            <div className="compras-actions">
              <button onClick={() => handleDetailsClick(compra.clienteFK)} className="btn">Detalhes</button>
              <button onClick={() => handleDeleteClick(compra.clienteFK)} className="btn">Apagar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComprasList;
