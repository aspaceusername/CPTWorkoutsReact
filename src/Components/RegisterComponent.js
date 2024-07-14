import React, { useState } from 'react';
import './RegisterForm.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isTreinador, setIsTreinador] = useState(false);
    const [treinadorNome, setTreinadorNome] = useState('');
    const [treinadorDataNascimento, setTreinadorDataNascimento] = useState('');
    const [treinadorTelemovel, setTreinadorTelemovel] = useState('');
    const [treinadorID, setTreinadorID] = useState('');
    const [clienteNome, setClienteNome] = useState('');
    const [clienteDataNascimento, setClienteDataNascimento] = useState('');
    const [clienteTelemovel, setClienteTelemovel] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const registerData = {
            email,
            password,
            confirmPassword,
            isTreinador,
            treinador: isTreinador ? {
                nome: treinadorNome,
                dataNascimento: treinadorDataNascimento,
                telemovel: treinadorTelemovel,
                treinadorID
            } : null,
            cliente: !isTreinador ? {
                nome: clienteNome,
                dataNascimento: clienteDataNascimento,
                telemovel: clienteTelemovel
            } : null
        };

        try {
            const response = await fetch('https://cptworkouts20240701174748.azurewebsites.net/api/account/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Registration successful:', result);
                navigate(`/confirm-email/${result.userId}/${result.code}`);
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
                setError('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError('Error during registration. Please try again.');
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h1>Registar</h1>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleRegister}>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div>
                        <label>Confirmar Password:</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <div>
                        <label>
                            Registar como Treinador:
                            <input type="checkbox" checked={isTreinador} onChange={(e) => setIsTreinador(e.target.checked)} />
                        </label>
                    </div>
                    {isTreinador && (
                        <div>
                            <label>Treinador Nome:</label>
                            <input type="text" value={treinadorNome} onChange={(e) => setTreinadorNome(e.target.value)} />
                            <br/>
                            <label>Treinador Data Nascimento:</label>
                            <input type="date" value={treinadorDataNascimento} onChange={(e) => setTreinadorDataNascimento(e.target.value)} />
                            <br/>
                            <label>Treinador Telemovel:</label>
                            <input type="text" value={treinadorTelemovel} onChange={(e) => setTreinadorTelemovel(e.target.value)} />
                            <br/>
                            <label>Treinador ID:</label>
                            <input type="text" value={treinadorID} onChange={(e) => setTreinadorID(e.target.value)} />
                        </div>
                    )}
                    {!isTreinador && (
                        <div>
                            <label>Cliente Nome:</label>
                            <input type="text" value={clienteNome} onChange={(e) => setClienteNome(e.target.value)} />
                            <br/>
                            <label>Cliente Data Nascimento:</label>
                            <input type="date" value={clienteDataNascimento} onChange={(e) => setClienteDataNascimento(e.target.value)} />
                            <br/>
                            <label>Cliente Telemovel:</label>
                            <input type="text" value={clienteTelemovel} onChange={(e) => setClienteTelemovel(e.target.value)} />
                        </div>
                    )}
                    <button type="submit">Registar</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
