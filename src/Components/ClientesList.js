import React, { useState, useEffect } from 'react';

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('https://cptworkouts20240701174748.azurewebsites.net/api/Clientes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Clientes:', data); // Exemplo: Mostrar os clientes no console
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
  
    fetchClientes();
  }, []);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            {cliente.nome} - {cliente.telemovel}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientesList;
