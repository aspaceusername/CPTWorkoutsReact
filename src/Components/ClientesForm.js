import React, { useState } from 'react';
import axios from 'axios';

const ClientesForm = () => {
    const [cliente, setCliente] = useState({
        NumCliente: '',
        EquipaFK: -1,
        Nome: '',
        DataNascimento: '',
        Telemovel: '',
        UserID: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://your-api-url/api/Clientes', cliente);
            console.log('New cliente created:', response.data);
            // Optionally redirect or show success message
        } catch (error) {
            console.error('Error creating cliente:', error);
            // Handle error, show message to user
        }
    };

    return (
        <div>
            <h1>Adicionar novo cliente</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="NumCliente">Número de Cliente</label>
                    <input type="text" className="form-control" id="NumCliente" name="NumCliente" value={cliente.NumCliente} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="EquipaFK">Equipa</label>
                    <select className="form-control" id="EquipaFK" name="EquipaFK" value={cliente.EquipaFK} onChange={handleChange} required>
                        <option value="-1">-- Escolha uma equipa --</option>
                        {/* Populate options dynamically */}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="Nome">Nome</label>
                    <input type="text" className="form-control" id="Nome" name="Nome" value={cliente.Nome} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="DataNascimento">Data de Nascimento</label>
                    <input type="date" className="form-control" id="DataNascimento" name="DataNascimento" value={cliente.DataNascimento} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="Telemovel">Telemóvel</label>
                    <input type="text" className="form-control" id="Telemovel" name="Telemovel" value={cliente.Telemovel} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="UserID">UserID</label>
                    <input type="text" className="form-control" id="UserID" name="UserID" value={cliente.UserID} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Adicionar</button>
            </form>
        </div>
    );
};

export default ClientesForm;
